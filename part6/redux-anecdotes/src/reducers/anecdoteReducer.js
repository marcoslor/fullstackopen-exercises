import { createSlice } from "@reduxjs/toolkit";
import anecdotesService from "../services/anecdotes";

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

export const { voteAnecdote, addAnecdote, setAnecdotes } = anecdotesSlice.actions;

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const notes = await anecdotesService.getAll();
    dispatch(setAnecdotes(notes));
  };
};

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdotesService.createNew(content);
    dispatch(addAnecdote(newAnecdote));
  };
};

export default anecdotesSlice.reducer;
