import { useDispatch, useSelector } from "react-redux";
import { voteAnecdote } from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/notificationReducer";
import Filter from "./Filter";
import anecdotesService from "../services/anecdotes";

const AnecdotesList = () => {
  const anecdotesStore = useSelector((state) => state.anecdotes);
  const filterStore = useSelector((state) => state.filter);

  const dispatch = useDispatch();

  const vote = (anecdote) => {
    anecdotesService
      .update(anecdote.id, { ...anecdote, votes: anecdote.votes + 1 })
      .then((anecdote) => {
        dispatch(voteAnecdote(anecdote));
        dispatch(
          setNotification(
            `You voted for "${anecdote.content}"`
          )
        );
      });
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
              <button onClick={() => vote(anecdote)}>vote</button>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}

export default AnecdotesList;