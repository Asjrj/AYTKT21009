import { createStore, combineReducers } from 'redux'
import filterReducer from './reducers/filterReducer'
import anecdoteReducer from './reducers/anecdoteReducer'
import notificationReducer from './reducers/notificationReducer'
import anecdoteService from './services/anecdotes'

const reducer = combineReducers({
  filter: filterReducer,
  anecdotes: anecdoteReducer,
  notification: notificationReducer
})

const store = createStore(reducer)

anecdoteService.getAll().then(anecdotes =>
  anecdotes.forEach(anecdote => {
    store.dispatch({ type: 'NEW_ANECDOTE', data: anecdote })
  })
)

export default store