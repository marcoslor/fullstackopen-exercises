import { useState } from 'react'
import { useMutation } from "@apollo/client";
import { CREATE_BOOK, BOOK_DETAILS_FRAGMENT } from "../queries";

const NewBook = (props) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [published, setPublished] = useState('')
  const [genre, setGenre] = useState('')
  const [genres, setGenres] = useState([])

  const addBookUpdate = (cache, response) =>
    cache.modify({
      fields: {
        allBooks(existingBooks = []) {
          const newBookRef = cache.writeFragment({
            data: response.data.addBook,
            fragment: BOOK_DETAILS_FRAGMENT,
          });

          // If the new book is already in the cache, don't add it again.
          if (existingBooks.some((book) => book.__ref === newBookRef.__ref)) {
            return existingBooks;
          }

          return [...existingBooks, newBookRef];
        },
      },
    });

  const [createBook] = useMutation(CREATE_BOOK, {
    update: addBookUpdate,
  });
  
  if (!props.show) {
    return null
  }

  const submit = async (event) => {
    event.preventDefault()

    createBook({ variables: { title, authorName: author, published: Number(published), genres } })
    
    setTitle('')
    setPublished('')
    setAuthor('')
    setGenres([])
    setGenre('')
  }

  const addGenre = () => {
    setGenres(genres.concat(genre))
    setGenre('')
  }

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          title
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          published
          <input
            type="number"
            value={published}
            onChange={({ target }) => setPublished(target.value)}
          />
        </div>
        <div>
          <input
            value={genre}
            onChange={({ target }) => setGenre(target.value)}
          />
          <button onClick={addGenre} type="button">
            add genre
          </button>
        </div>
        <div>genres: {genres.join(' ')}</div>
        <button type="submit">create book</button>
      </form>
    </div>
  )
}

export default NewBook
