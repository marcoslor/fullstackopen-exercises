const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } =  require("@apollo/server/standalone");
const { GraphQLError } = require("graphql");
const { gql } = require("graphql-tag");
const { v1: uuid } = require("uuid");
const mongoose = require("mongoose");
const Author = require("./models/Author");
const Book = require("./models/Book");
const User = require("./models/User");
const jwt = require("jsonwebtoken");

mongoose.set("strictQuery", true);

const MONGODB_URI = process.env.MONGODB_URI;
const JWT_SECRET = process.env.SECRET || "SECRET TOKEN"; 

const typeDefs = gql`
  type Book {
    title: String!
    published: Int!
    author: Author!
    genres: [String!]!
    id: ID!
  }
  type Author {
    name: String!
    born: Int
    bookCount: Int!
    id: ID!
  }
  type User {
    username: String!
    favouriteGenre: String!
    id: ID!
  }
  type Token {
    value: String!
  }
  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
    me: User
  }
  type Mutation {
    addBook(
      title: String!
      published: Int!
      authorName: String!
      genres: [String!]!
    ): Book
    editAuthor(name: String!, born: Int!): Author
    createUser(username: String!, favouriteGenre: String!): User
    login(username: String!, password: String!): Token
  }
`;

const resolvers = {
  Query: {
    bookCount: () => Book.find({}).then((books) => books.length),
    authorCount: () => Author.find({}).then((authors) => authors.length),
    allBooks: async (root, args) => {
      const { author, genre } = args;
      const query = Book.find({});

      if (author) {
        const authorID = (await Author.findOne({ name: author }))._id;
        if (authorID) {
          query.find({ author: authorID });
        }
      }
      if (genre) {
        query.find({ genres: { $in: [genre] } });
      }
      return await query.populate("author");
    },
    allAuthors: async () => await Author.find({}).populate("books"),
    me: (root, args, context) => console.log(context) || context.currentUser,
  },
  Author: {
    bookCount: (root) =>
      books.filter((book) => book.author === root.name).length,
  },
  Mutation: {
    addBook: async (root, args, context) => {
      if (!context.currentUser) {
        throw new GraphQLError("Not authenticated");
      }
      const { title, published, authorName, genres } = args;
      if (title.length < 2) {
        throw new GraphQLError("Title must be at least 2 characters long");
      }
      if (published > new Date().getFullYear()) {
        throw new GraphQLError("Published year must be less than current year");
      }
      const author = await (async () => {
        const authorExists = await Author.findOne({ name: authorName });
        if (authorExists) {
          return authorExists;
        }
        const newAuthor = new Author({ name: authorName });
        await newAuthor.save();
        return newAuthor;
      })();

      const book = new Book({ title, published, genres, author: author._id });
      await book.save();
      await book.populate("author");
      return book;
    },
    editAuthor: async (root, args, context) => {
      if (!context.currentUser) {
        throw new GraphQLError("Not authenticated");
      }

      const { name, born } = args;
      const author = await Author.findOneAndUpdate(
        {
          name,
        },
        {
          born,
        }
      );

      if (!author) {
        throw new GraphQLError("Author not found");
      }

      return author;
    },
    createUser: (root, args) => {
      const user = new User({ ...args });
      return user.save().catch((error) => {
        throw new GraphQLError(error.message);
      });
    },
    login: async (root, args) => {
      const { username, password } = args;
      const user = await User.findOne({ username });
      if (!user || password !== "secret") {
        throw new GraphQLError("Invalid username or password");
      }
      const userForToken = {
        username: user.username,
        id: user._id,
      };
      return { value: jwt.sign(userForToken, JWT_SECRET) };
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

(async () => {
  await mongoose.connect(MONGODB_URI);
  console.log("Connected to MongoDB");
  const { url } = await startStandaloneServer(server, {
    context: async ({ req }) => {
      const auth = req ? req.headers.authorization : null;
      if (auth && auth.toLowerCase().startsWith("bearer ")) {
        try {
          const decodedToken = jwt.verify(auth.substring(7), JWT_SECRET);
          if (!decodedToken.id) {
            return { currentUser: null };
          }
          const currentUser = await User.findById(decodedToken.id);
          return { currentUser };
        } catch (error) {
          return { currentUser: null };
        }
      }
    },
    listen: { port: 4000 },
  });
  console.log(`🚀  Server ready at ${url}`);
})();
