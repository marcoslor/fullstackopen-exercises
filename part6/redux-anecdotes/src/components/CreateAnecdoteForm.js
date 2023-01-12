import { connect } from "react-redux";
import { createAnecdote } from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/notificationReducer";

const CreateAnecdoteForm = ( {createAnecdote, setNotification} ) => {
  const submitForm = async (event) => {
    const anecdote = event.target.anecdote.value;
    event.preventDefault();
    await createAnecdote(anecdote);
    setNotification(`You created "${anecdote}"`);
    event.target.reset();
  };

  return (
    <form onSubmit={submitForm}>
      <div>
        <input name="anecdote"/>
      </div>
      <button type="submit">create</button>
    </form>
  );
};

const mapDispatchToProps = {
  createAnecdote,
  setNotification,
}

export default connect(null, mapDispatchToProps)(CreateAnecdoteForm);
