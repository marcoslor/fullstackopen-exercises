import { useDispatch } from "react-redux";
import { addAnecdote } from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/notificationReducer";
import { useRef } from "react";

const CreateAnecdoteForm = () => {
  const dispatch = useDispatch();
  const anecdoteRef = useRef("");

  const submitForm = (event) => {
    event.preventDefault();

    dispatch(addAnecdote(anecdoteRef.current.value));
    dispatch(setNotification(`You created "${anecdoteRef.current.value}"`));
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
