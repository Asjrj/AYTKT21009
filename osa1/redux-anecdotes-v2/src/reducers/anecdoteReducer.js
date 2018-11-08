const getId = () => (100000 * Math.random()).toFixed(0)

const anecdoteReducer = (store = [], action) => {
  if (action.type === 'VOTE') {
    const old = store.filter(a => a.id !== action.id)
    const voted = store.find(a => a.id === action.id)
    const anecdotes = [...old, { ...voted, votes: voted.votes + 1 }]
    return anecdotes.sort((a, b) => a.votes > b.votes ? -1 : (a.votes < b.votes ? 1 : 0))
  }
  if (action.type === 'CREATE') {
    return [...store, { content: action.content, id: getId(), votes: 0 }]
  }
  if (action.type === 'INITIALIZE') {
    return action.data
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
export const anecdoteInitialization = (data) => {
  return {
    type: 'INITIALIZE',
    data: data
  }
}

export default anecdoteReducer