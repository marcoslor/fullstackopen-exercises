import { useDispatch } from "react-redux";
import { addAction } from "../reducers/anecdoteReducer";
import { useRef } from "react";

const CreateAnecdoteForm = () => {
  const dispatch = useDispatch();
  const anecdoteRef = useRef("");

  const addAnecdote = (event) => {
    event.preventDefault();

    dispatch(addAction(anecdoteRef.current.value));
    anecdoteRef.current.value = "";
  };

  return (
    <form onSubmit={addAnecdote}>
      <div>
        <input ref={anecdoteRef}/>
      </div>
      <button>create</button>
    </form>
  );
};

export default CreateAnecdoteForm;
