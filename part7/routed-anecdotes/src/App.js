import { useEffect, useState } from 'react'
import { Routes, Route, useMatch, useNavigate } from 'react-router-dom'
import Anecdote from './components/Anecdote'
import AnecdoteList from './components/AnecdoteList'
import Menu from './components/Menu'
import About from './components/About'
import Footer from './components/Footer'
import CreateNew from './components/CreateNew'

const startingAnecdotes = [
  {
    content: "If it hurts, do it more often",
    author: "Jez Humble",
    info: "https://martinfowler.com/bliki/FrequencyReducesDifficulty.html",
    votes: 0,
    id: 1,
  },
  {
    content: "Premature optimization is the root of all evil",
    author: "Donald Knuth",
    info: "http://wiki.c2.com/?PrematureOptimization",
    votes: 0,
    id: 2,
  },
];

const App = () => {
  const [anecdotes, setAnecdotes] = useState(startingAnecdotes);
  const [notification, setNotification] = useState('');

  const anecdoteMatch = useMatch("/anecdotes/:id");
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setNotification('');
    }, 5000);
    return () => clearTimeout(timer);
  }, [notification])

  const addNew = (anecdote) => {
    anecdote.id = Math.round(Math.random() * 10000)
    setAnecdotes(anecdotes.concat(anecdote));
    setNotification(`a new anecdote ${anecdote.content} created!`);
    navigate('/');
  }

  const anecdoteById = (id) =>
    anecdotes.find(a => a.id === id)

  const vote = (id) => {
    const anecdote = anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
  }

  const idParam = anecdoteMatch && Number(anecdoteMatch.params.id);
  const selectedAnecdote = anecdoteMatch && anecdoteById(idParam);

  return (
    <div>
      <div>{notification}</div>
      <h1>Software anecdotes</h1>
      <Menu />
      <Routes>
        <Route path="/" element={<AnecdoteList anecdotes={anecdotes} />} />
        <Route
          path="/anecdotes/:id"
          element={<Anecdote anecdote={selectedAnecdote} />}
        />
        <Route
          path="/anecdotes/create"
          element={<CreateNew addNew={addNew} />}
        />
        <Route path="/about" element={<About />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App
