import { useDispatch } from "react-redux";
import { addAnecdote } from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/notificationReducer";
import { useRef } from "react";

import anecdotesService from "../services/anecdotes";

const CreateAnecdoteForm = () => {
  const dispatch = useDispatch();
  const anecdoteRef = useRef("");

  const submitForm = (event) => {
    event.preventDefault();
    anecdotesService
      .createNew(anecdoteRef.current.value)
      .then((anecdote) => {
        dispatch(addAnecdote(anecdote));
        dispatch(setNotification(`You created "${anecdote.content}"`));
      });
    anecdoteRef.current.value = "";
  };

  return (
    <form onSubmit={submitForm}>
      <div>
        <input ref={anecdoteRef} />
      </div>
      <button>create</button>
    </form>
  );
};

export default CreateAnecdoteForm;
