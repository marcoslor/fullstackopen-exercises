import { gql } from "@apollo/client";

export const BOOK_DETAILS_FRAGMENT = gql`
  fragment BookDetails on Book {
    title
    author {
      id
      name
    }
    published
    id
    genres
  }
`;

export const AUTHOR_DETAILS_FRAGMENT = gql`
  fragment AuthorDetails on Author {
    name
    born
    bookCount
    id
  }
`;

export const CREATE_BOOK = gql`
  mutation createBook(
    $title: String!
    $authorName: String!
    $published: Int!
    $genres: [String!]!
  ) {
    addBook(
      title: $title
      authorName: $authorName
      published: $published
      genres: $genres
    ) {
      ...BookDetails
    }
  }

  ${BOOK_DETAILS_FRAGMENT}
`;

export const ALL_BOOKS = gql`
  query getAllBooks($author: String, $genre: String) {
    allBooks(author: $author, genre: $genre) {
      ...BookDetails
    }
  }

  ${BOOK_DETAILS_FRAGMENT}
`;

export const ALL_GENRES = gql`
  query getAllGenres {
    allGenres
  }
`

export const ALL_AUTHORS = gql`
  query getAllAuthors{
    allAuthors {
      ...AuthorDetails
    }
  }

  ${AUTHOR_DETAILS_FRAGMENT}
`;

export const EDIT_AUTHOR = gql`
  mutation editAuthor($name: String!, $born: Int!) {
    editAuthor(name: $name, born: $born) {
      ...AuthorDetails
    }
  }

  ${AUTHOR_DETAILS_FRAGMENT}
`;

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      value
    }
  }
`;

export const ME = gql`
  query me {
    me {
      username
      favouriteGenre
    }
  }
`;

export const BOOK_ADDED = gql`
  subscription {
    bookAdded {
      ...BookDetails
    }
  }

  ${BOOK_DETAILS_FRAGMENT}
`;