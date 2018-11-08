import anecdoteService from '../services/anecdotes'

const getId = () => (100000 * Math.random()).toFixed(0)

const anecdoteReducer = (store = [], action) => {
  if (action.type === 'VOTE') {
    const old = store.filter(a => a.id !== action.id)
    const voted = store.find(a => a.id === action.id)
    const newVoted = { ...voted, votes: voted.votes + 1 }
    const anecdotes = [...old, newVoted]
    anecdoteService.updateAnecdote(newVoted)
    return anecdotes.sort((a, b) => a.votes > b.votes ? -1 : (a.votes < b.votes ? 1 : 0))
  }
  if (action.type === 'CREATE') {
    const newAnecdote = { content: action.content, id: getId(), votes: 0 }
    anecdoteService.saveAnecdote(newAnecdote)
    return [...store, newAnecdote]
  }
  if (action.type === 'INITIALIZE') {
    return action.data.sort((a, b) => a.votes > b.votes ? -1 : (a.votes < b.votes ? 1 : 0))
  }

  return store
}

export const anecdoteVote = (id) => {
  return {
    type: 'VOTE',
    id: id
  }
}
export const anecdoteCreation = (text) => {
  return {
    type: 'CREATE',
    content: text
  }
}
export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const notes = await anecdoteService.getAll()
    dispatch({
      type: 'INITIALIZE',
      data: notes
    })
  }
}

export default anecdoteReducer