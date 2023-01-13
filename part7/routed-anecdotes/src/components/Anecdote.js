const Anecdote = ({ anecdote }) => {
  return (
    <>
      <h2>
        {anecdote.content} by {anecdote.author}
      </h2>
      <p>has {anecdote.votes} votes</p>
    </>
  );
};

export default Anecdote;