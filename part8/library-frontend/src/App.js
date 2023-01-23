import { useQuery, useSubscription } from '@apollo/client'
import { useEffect, useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import Login from './components/Login'
import NewBook from './components/NewBook'
import Recommend from './components/Recommend'
import { ALL_BOOKS, BOOK_ADDED, ME } from './queries'

const App = () => {
  const [page, setPage] = useState('authors')

  const me = useQuery(ME);

  useEffect(() => {
    const token = localStorage.getItem("library-user-token");
    if (token) {
      me.refetch();
    }
  }, [setPage, me]);

  useSubscription(BOOK_ADDED, {
    onData: ({ client, data }) => {
      const { bookAdded } = data.data;
      client.cache.updateQuery({ query: ALL_BOOKS, broadcast: true, overwrite: true }, ({ allBooks }) => {
         if (allBooks.map((b) => b.id).includes(bookAdded.id)) {
           return { allBooks };
         }
         return {
           allBooks: allBooks.concat(bookAdded),
         };
       });
    }
  });

  const logout = () => {
    localStorage.removeItem('library-user-token')
    me.refetch();
  }

  if (me.loading) {
    return <div>loading...</div>;
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        <button onClick={() => setPage("add")}>add book</button>
        {me.data?.me ? (
          <>
            <button onClick={() => setPage("recommend")}>recommend</button>
            <button onClick={logout}>logout</button>
          </>
        ) : (
          <button onClick={() => setPage("login")}>login</button>
        )}
      </div>

      <Authors show={page === "authors"} />

      <Books show={page === "books"} />

      <NewBook show={page === "add"} />

      <Recommend show={page === "recommend"} />

      <Login show={page === "login"} setPage={setPage} />
    </div>
  );
}

export default App
