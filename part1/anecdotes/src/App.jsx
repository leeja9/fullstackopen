import { useState } from 'react'

const Button = ({clickHandler, name}) => {
  return (
    <button onClick={clickHandler}>{name}</button>
  )
}

const Anecdote = ({anecdote, votes}) => {
  return (
    <div>
      <p>{anecdote}</p>
      <p>has {votes} votes</p>
    </div>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0))

  const selectHandler = () => setSelected(Math.floor(Math.random() * anecdotes.length))
  const voteHandler = () => {
    const copyVotes = [...votes]
    copyVotes[selected] += 1
    console.log(votes)
    console.log(copyVotes)
    setVotes(copyVotes)
  }

  const maxIndex = votes.indexOf(Math.max(...votes))

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <Anecdote anecdote={anecdotes[selected]} votes={votes[selected]} />
      <Button clickHandler={selectHandler} name="next anecdote" />
      <Button clickHandler={voteHandler} name="vote" />
      <h1>Anecdote of the day</h1>
      <Anecdote anecdote={anecdotes[maxIndex]} votes={votes[maxIndex]} />
    </div>
  )
}

export default App