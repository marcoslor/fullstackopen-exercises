import { useState } from 'react'

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>give feedback 🗒</h1>
      <button onClick={() => setGood(good + 1)}>😀 good</button>
      <button onClick={() => setNeutral(neutral + 1)}>😐 neutral</button>
      <button onClick={() => setBad(bad + 1)}>☹️ bad</button>
      <ul>
        <li>good {good}</li>
        <li>neutral {neutral}</li>
        <li>bad {bad}</li>
      </ul>
    </div>
  )
}

export default App