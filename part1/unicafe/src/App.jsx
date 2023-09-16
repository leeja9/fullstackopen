import { useState } from 'react'

const Button = ({clickHandler, name}) => {
  return (
    <button onClick={clickHandler}>{name}</button>
  )
}

const StatisticsLine = ({name, value}) => {
  return (
    <tr>
      <td>{name}</td>
      <td>{value}</td>
    </tr>
  )
}

const Statistics = ({good, neutral, bad}) => {
  if (good === 0 && neutral === 0 && bad === 0) {
    return (
      <>
        <h1>statistics</h1>
        <p>No feedback given</p>
      </>
    )
  }
  const all = good + neutral + bad
  const avg = (good - bad) / all
  const pos = String((good / all) * 100).concat(" %")
  return (
    <div>
      <h1>statistics</h1>
      <table>
        <tbody>
          <StatisticsLine name="good" value={good} />
          <StatisticsLine name="neutral" value={neutral} />
          <StatisticsLine name="bad" value={bad} />
          <StatisticsLine name="all" value={all} />
          <StatisticsLine name="average" value={avg} />
          <StatisticsLine name="positive" value={pos} />
        </tbody>
      </table>
    </div>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const clickHandler = (state, setStateFunction) => {
    return () => setStateFunction(state + 1)
  }
  return (
    <div>
      <h1>give feedback</h1>
      <Button clickHandler={clickHandler(good, setGood)} name="good" />
      <Button clickHandler={clickHandler(neutral, setNeutral)} name="neutral" />
      <Button clickHandler={clickHandler(bad, setBad)} name="bad" />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App
