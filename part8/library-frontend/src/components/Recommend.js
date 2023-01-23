const { useQuery } = require("@apollo/client");
const { ME, ALL_BOOKS } = require("../queries");

const Recommend = ({show}) => {
  const me = useQuery(ME);
  const books = useQuery(ALL_BOOKS);

  if (!show) {
    return null;
  }

  if (me.loading) {
    return <div>loading...</div>;
  }

  if (!me.data.me) {
    return null;
  }

  if (me.data.me.favouriteGenre === null) {
    return (
      <>
        <h2>recommendations</h2>
        <p>no favorite genre set.</p>
      </>
    );
  }

  const filteredBooks = books.data.allBooks.filter((book) =>
    book.genres.includes(me.data.me.favouriteGenre)
  );

  return (
    <>
      <h2>recommendations</h2>
      <p>
        books in your favorite genre <b>{me.data.me.favouriteGenre}</b>
      </p>
      <table>
        <tbody>
          <tr>
            <th>title</th>
            <th>author</th>
            <th>published</th>
          </tr>
          {filteredBooks.map((a) => (
            <tr key={a.id}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default Recommend;