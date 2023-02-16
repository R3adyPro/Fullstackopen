import { createSlice } from "@reduxjs/toolkit"
import AnecdoteService from '../services/anecdotes'

const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

export const initialState = anecdotesAtStart.map(asObject)

const anecdoteReducerSlice = createSlice({
  name: 'anecdote',
  initialState: [],
  reducers: {
    anecdoteReducer(state, action) {
      const id = action.payload.id
      const voteAddChange = state.find(n => n.id === id)
        const voteAdd = {
        ...voteAddChange,
        votes: voteAddChange.votes + 1
      }
      return state.map(anec => 
        anec.id !== id ? anec : voteAdd
      )
    },
    addVote(state, action) {
      const anecVote = action.payload
      const { id } = action.payload
      return state.map(vote => 
        vote.id !== id ? vote : anecVote
      )
    },
    appendAnecdotes(state, action) {
      state.push(action.payload)
    },
    anecSet(state, action) {
      return action.payload
    }
  }
})

export const { anecdoteReducer, newAnecdote, addVote,  appendAnecdotes, anecSet } = anecdoteReducerSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecs = await AnecdoteService.getAll()
    dispatch(anecSet(anecs))
  }
}

export const createAnectode = content => {
  return async dispatch => {
    const newAnec = await AnecdoteService.createNew(content)
    dispatch(appendAnecdotes(newAnec))
  }
}

export const anecVote = content => {
  return async dispatch => {
    const voted = await AnecdoteService.update(content)
    dispatch(addVote(voted))
  }
}

export default anecdoteReducerSlice.reducer