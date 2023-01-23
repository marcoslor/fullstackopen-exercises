import { useQuery, useMutation } from "@apollo/client";
import { ALL_AUTHORS, EDIT_AUTHOR } from "../queries";

const Authors = (props) => {
  const result = useQuery(ALL_AUTHORS);
  const [editAuthor] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
  });

  const authors = result.data?.allAuthors;

  if (!props.show || result.loading || !authors) {
    return null;
  }

  const submit = async (event) => { 
    event.preventDefault();
    const name = event.target.name.value;
    const born = Number(event.target.born.value);
    editAuthor({ variables: { name, born } });
  };

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.id}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3>Set birthyear</h3>
      <form onSubmit={submit}>
        <div>
          <label htmlFor="name">name</label>
          <select name="name" id="name">
            {authors.map((a) => (
              <option key={a.id} value={a.name}>
                {a.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="name">born</label>
          <input name="born" id="born" required />
        </div>
        <button type="submit">update author</button>
      </form>
    </div>
  );
};

export default Authors;
