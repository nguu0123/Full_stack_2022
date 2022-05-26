import { useState } from 'react'

const FindMostVoted = ({ anecdotes, votes }) => {
  const zip = (a, b) => a.map((k, i) => [k, b[i]]);
  const mostVoted = zip([0, 1, 2, 3, 4, 5, 6], votes).reduce(
    function (a, b) {
      if (a[1] >= b[1]) return a
      else return b
    }
  )
  return (
    <div>
      <p> {anecdotes[mostVoted[0]]}</p>
      <p> has {mostVoted[1]} votes </p>
    </div>
  )
}
const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
  ]

  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState([0, 0, 0, 0, 0, 0, 0])
  const handleVotes = () => {
    const newVotes = [
      ...votes.slice(0, selected),
      votes[selected] + 1,
      ...votes.slice(selected + 1),
    ]
    setVotes(newVotes)
  }

  return (
    <div>
      <h1> Anecdote of the day</h1>
      <div>
        {anecdotes[selected]}
      </div>
      <div>
        has {votes[selected]} votes
        {console.log(votes)}
      </div>
      <div>
        <button onClick={handleVotes}>
          vote
        </button>
        <button onClick={() => setSelected(Math.floor(Math.random() * 6))}>
          next anecdote
        </button>
      </div>
      <div>
        <h1>Anecdote with most votes</h1>
        <FindMostVoted votes={votes} anecdotes={anecdotes} />
      </div>
    </div>

  )
}

export default App