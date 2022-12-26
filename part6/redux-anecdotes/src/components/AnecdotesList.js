import { useDispatch, useSelector } from "react-redux";
import { voteAction } from "../reducers/anecdoteReducer";

const AnecdotesList = () => {
  const anecdotes = useSelector((state) => state);
  const dispatch = useDispatch();

  const vote = (id) => {
    dispatch(voteAction(id));
  };
  return (
    <ul>
      {anecdotes.map((anecdote) => (
        <li key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default AnecdotesList;