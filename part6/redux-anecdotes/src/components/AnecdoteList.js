import { useDispatch, useSelector } from 'react-redux'
import { addVote } from '../reducers/anecdoteReducer'
const AnecdoteList = () => {
    const dispatch = useDispatch()
    const anecdotes = useSelector(state => state.anecdotes)
    const vote = (id) => {
        console.log('vote', id)
        dispatch({ type: 'anecdotes/addVote', payload: id })
    }
    return (
        <div>

            {anecdotes.slice().sort(function (a, b) {
                return b.votes - a.votes
            }).map(anecdote =>
                <div key={anecdote.id}>
                    <div>
                        {anecdote.content}
                    </div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => vote(anecdote.id)}>vote</button>
                    </div>
                </div>)
            }
        </div>
    )
}
export default AnecdoteList