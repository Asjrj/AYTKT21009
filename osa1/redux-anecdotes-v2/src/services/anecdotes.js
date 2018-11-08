import axios from 'axios'

const getAll = async () => {
  const response = await axios.get('http://localhost:3001/anecdotes')
  return response.data
}

const saveAnecdote = async (anecdote) => {
  const response = await axios.post('http://localhost:3001/anecdotes', anecdote)
  return response.data
}

const updateAnecdote = async (anecdote) => {
  const response = axios.put(`http://localhost:3001/anecdotes/${anecdote.id}`, anecdote)
  return response.data
}

export default { getAll, saveAnecdote, updateAnecdote }