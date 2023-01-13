import { useField } from "../hooks";

const CreateNew = ({ addNew }) => {
  const [resetContent, content] = useField("text");
  const [resetAuthor, author] = useField("text");
  const [resetInfo, info] = useField("text");

  const handleSubmit = (e) => {
    e.preventDefault();
    
    addNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0,
    });
  };

  const handleReset = (e) => {
    e.preventDefault();

    resetContent();
    resetAuthor();
    resetInfo();
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input name="content" {...content} />
        </div>
        <div>
          author
          <input name="content" {...author} />
        </div>
        <div>
          url for more info
          <input name="content" {...info} />
        </div>
        <button>create</button>
        <button onClick={handleReset}>reset</button>
      </form>
    </div>
  );
};

export default CreateNew;