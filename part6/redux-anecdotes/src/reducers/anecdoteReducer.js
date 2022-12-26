// Constant functions and objects
const updateObject = (oldObject, newValues) => {
  return Object.assign({}, oldObject, newValues);
};

const updateListWithItem = (array, itemId, newItem) => {
  return array.map((item) => (item.id !== itemId ? item : newItem));
};

const getId = () => {
    return (100000 * Math.random()).toFixed(0);
};

const anecdoteAsObject = anecdote => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0,
  };
};

const createReducer = (initialState, handlers) => {
  return function reducer(state = initialState, action) {
    if (handlers.hasOwnProperty(action.type)) {
      return handlers[action.type](state, action);
    } else {
      return state;
    }
  };
};

// Initial state

const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const initialState = anecdotesAtStart.map(anecdoteAsObject);

// Reducer

const voteAnecdote = (state, action) => {
  const id = action.data.id;

  const anecdoteToVote = state.find((a) => a.id === id);
  const votedAnecdote = updateObject(anecdoteToVote, {
    votes: anecdoteToVote.votes + 1,
  });

  return updateListWithItem(state, id, votedAnecdote);
};

const addAnecdote = (state, action) => {
  const anecdote = action.data;
  return state.concat(anecdote);
};

const anecdoteReducer = createReducer(initialState, {
  VOTE: voteAnecdote,
  ADD: addAnecdote,
});

const voteAction = id => {
  return {
    type: 'VOTE',
    data: { id }
  };
};

const addAction = anecdoteTitle => {
  return {
    type: 'ADD',
    data: anecdoteAsObject(anecdoteTitle)
  };
};

export { anecdoteReducer, voteAction, addAction };