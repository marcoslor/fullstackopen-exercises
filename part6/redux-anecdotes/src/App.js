import CreateAnecdoteForm from './components/CreateAnecdoteForm'
import AnecdotesList from './components/AnecdotesList'
import Notification from './components/Notification'
import { initializeAnecdotes } from "./reducers/anecdoteReducer";
import store from "./store";

store.dispatch(initializeAnecdotes());

const App = () => {
  return (
    <div>
      <Notification/>
      <h2>Anecdotes</h2>
      <AnecdotesList/>
      <h2>create new</h2>
      <CreateAnecdoteForm/>
    </div>
  );
}

export default App