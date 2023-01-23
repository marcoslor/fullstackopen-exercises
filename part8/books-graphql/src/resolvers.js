const { GraphQLError } = require("graphql");
const { PubSub } = require("graphql-subscriptions");
const jwt = require("jsonwebtoken");

const Author = require("./models/Author");
const Book = require("./models/Book");
const User = require("./models/User");

const { JWT_SECRET } = require("../config");

const pubsub = new PubSub();

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
    me: (root, args, context) => context.currentUser,
    allGenres: async () => {
      const books = await Book.find({});
      // Get all genres from all books. May contain duplicates
      const allGenres = books.reduce((acc, book) => {
        return [...acc, ...book.genres];
      }, []);
      // Remove duplicate genres
      const genres = allGenres.filter((genre, index) => {
        return allGenres.indexOf(genre) === index;
      });
      return genres;
    },
  },
  Author: {
    bookCount: (root) => root.books.length,
  },
  Mutation: {
    addBook: async (root, args, context) => {
      if (!context.currentUser) {
        throw new GraphQLError("Not authenticated");
      }

      const { title, published, authorName, genres } = args;

      if (genres.length < 1) {
        throw new GraphQLError("Book must have at least one genre");
      }

      const hasInvalidGenre = genres.some((genre) => genre.length < 2);

      if (hasInvalidGenre) {
        throw new GraphQLError("Genres must be at least 2 characters long");
      }

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

      pubsub.publish("BOOK_ADDED", { bookAdded: book });

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
        id: user.id,
      };
      return { value: jwt.sign(userForToken, JWT_SECRET) };
    },
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator("BOOK_ADDED"),
    },
  },
};

module.exports = resolvers;
