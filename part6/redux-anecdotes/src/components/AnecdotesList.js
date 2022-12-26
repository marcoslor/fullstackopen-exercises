import { useDispatch, useSelector } from "react-redux";
import { voteAnecdote } from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/notificationReducer";
import Filter from "./Filter";

const AnecdotesList = () => {
  const anecdotesStore = useSelector((state) => state.anecdotes);
  const filterStore = useSelector((state) => state.filter);

  const dispatch = useDispatch();

  const vote = (id) => {
    dispatch(voteAnecdote(id));
    dispatch(
      setNotification(
        `You voted for "${
          anecdotesStore.find((anecdote) => anecdote.id === id).content
        }"`
      )
    );
  };

  const anecdotesToShow = anecdotesStore.filter((anecdote) => anecdote.content.includes(filterStore));

  return (
    <>
      <Filter />
      <ul>
        {anecdotesToShow.map((anecdote) => (
          <li key={anecdote.id}>
            <div>{anecdote.content}</div>
            <div>
              has {anecdote.votes}
              <button onClick={() => vote(anecdote.id)}>vote</button>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}

export default AnecdotesList;