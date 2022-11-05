import { useState } from 'react'

const FeedbackButton = ({ setter, value, children }) => (
  <button onClick={() => setter(value+1)}>
    {children}
  </button>
)
const StatisticRow = ({ text, value }) => (
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
)

const Statistics = ({ good, neutral, bad }) => {
  const all = good + neutral + bad
  const average = ((good - bad) / all).toFixed(2)
  const positive = (good / all * 100).toFixed(2)

  return (
    <>
      <h1>statistics 📊</h1>
      {(all !== 0 && (
        <table>
          <tbody>
            <StatisticRow text="😀 good" value={good} />
            <StatisticRow text="😐 neutral" value={neutral} />
            <StatisticRow text="🙁 bad" value={bad} />
            <StatisticRow text="all" value={all} />
            <StatisticRow text="average" value={average} />
            <StatisticRow text="positive" value={positive + '%'} />
          </tbody>
        </table>
      )) || (<p>No feedback given</p>)}
    </>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>give feedback 🗒</h1>
      <FeedbackButton setter={setGood} value={good}>😀 good</FeedbackButton>
      <FeedbackButton setter={setNeutral} value={neutral}>😐 neutral</FeedbackButton>
      <FeedbackButton setter={setBad} value={bad}>🙁 bad</FeedbackButton>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App