import anecdoteService from '../services/anecdotes'

const getId = () => (100000 * Math.random()).toFixed(0)

const anecdoteReducer = (store = [], action) => {
  if (action.type === 'VOTE') {
    const old = store.filter(a => a.id !== action.id)
    const voted = store.find(a => a.id === action.id)
    const newVoted = { ...voted, votes: voted.votes + 1 }
    const anecdotes = [...old, newVoted]
    return anecdotes.sort((a, b) => a.votes > b.votes ? -1 : (a.votes < b.votes ? 1 : 0))
  }
  if (action.type === 'CREATE') {
    return [...store, action.data]
  }
  if (action.type === 'INITIALIZE') {
    return action.data.sort((a, b) => a.votes > b.votes ? -1 : (a.votes < b.votes ? 1 : 0))
  }

  return store
}

export const anecdoteVote = (anecdote) => {
  return async (dispatch) => {
    const voted = { ...anecdote, votes: anecdote.votes + 1 }
    await anecdoteService.updateAnecdote(voted)
    dispatch({
      type: 'VOTE',
      id: anecdote.id
    })
  }
}
export const createAnecdote = (text) => {
  return async (dispatch) => {
    const anecdote = { content: text, id: getId(), votes: 0 }
    await anecdoteService.saveAnecdote(anecdote)
    dispatch({
      type: 'CREATE',
      data: anecdote
    })
  }
}
export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INITIALIZE',
      data: anecdotes
    })
  }
}

export default anecdoteReducer