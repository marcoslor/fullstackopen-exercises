import { useDispatch, useSelector } from "react-redux";
import { voteAnecdote } from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/notificationReducer";
import Filter from "./Filter";
import anecdotesService from "../services/anecdotes";
import { useMemo } from "react";

const AnecdotesList = () => {
  const anecdotesStore = useSelector((state) => state.anecdotes);
  const filterStore = useSelector((state) => state.filter);
  
  const visibleAnecdotes = useMemo(() => {
    return anecdotesStore.filter((anecdote) =>
      anecdote.content.toLowerCase().includes(filterStore.toLowerCase())
    );
  }, [anecdotesStore, filterStore]);
  
  const dispatch = useDispatch();

  const vote = async (anecdote) => {
    const updatedAnecdote = await anecdotesService.update(anecdote.id, {
      ...anecdote,
      votes: anecdote.votes + 1,
    });
    dispatch(voteAnecdote(updatedAnecdote));
    dispatch(
      setNotification(`You voted for "${anecdote.content}"`)
    );
  };

  return (
    <>
      <Filter />
      <ul>
        {visibleAnecdotes.map((anecdote) => (
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