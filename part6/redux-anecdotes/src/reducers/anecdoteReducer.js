import { createSlice } from "@reduxjs/toolkit";

/* Helpers */

const getId = () => (100000 * Math.random()).toFixed(0);

const anecdoteAsObject = (anecdote) => ({
  content: anecdote,
  id: getId(),
  votes: 0,
});

/* Initial state */

const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const initialState = anecdotesAtStart.map(anecdoteAsObject);

/* Reducer */

// State inside reducers is managed by Immer, so we can either mutate it, or return a new value
const anecdotesSlice = createSlice({
  name: "anecdotes",
  initialState: [],
  reducers: {
    voteAnecdote(state, action) {
      const id = action.payload.id;
      const anecdoteToVote = state.find((anecdote) => {
        return anecdote.id === id;
      });
      anecdoteToVote.votes += 1;
    },
    addAnecdote(state, action) {
      const anecdote = action.payload;
      state.push(anecdote);
    },
    setAnecdotes(state, action) {
      const anecdotes = action.payload;
      return anecdotes;
    }
  },
}); 

export default anecdotesSlice.reducer;
export const { voteAnecdote, addAnecdote, setAnecdotes } = anecdotesSlice.actions;