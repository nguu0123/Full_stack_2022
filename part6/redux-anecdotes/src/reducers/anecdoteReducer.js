import { createSlice } from "@reduxjs/toolkit"
import anecdoteSerice from '../services/anecdotes'
const getId = () => (100000 * Math.random()).toFixed(0)

const AnecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    addVote(state, action) {
      const id = action.payload
      return state.map(note => note.id !== id ? note : { ...note, votes: note.votes + 1 })
    },
    addAnecdote(state, action) {
      const content = action.payload
      const newAnecdote = {
        content: content,
        id: getId(),
        votes: 0
      }
      state.push(newAnecdote)
      anecdoteSerice.createNewAnecdote(newAnecdote)
    },
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  }
})

export const { addVote, addAnecdote, appendAnecdote, setAnecdotes } = AnecdoteSlice.actions
export default AnecdoteSlice.reducer