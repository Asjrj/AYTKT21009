import React from 'react'
import { anecdoteVote } from '../reducers/anecdoteReducer'
import { notificationCreation, notificationClear } from '../reducers/notificationReducer'


class AnecdoteList extends React.Component {
  vote = (id, content) => () => {
    this.props.store.dispatch(anecdoteVote(id))
    this.props.store.dispatch(notificationCreation('you voted: "' + content + '"'))
    setTimeout(() => {
      this.props.store.dispatch(notificationClear())
    }, 5000)
  }

  render() {
    const anecdotes = this.props.store.getState().anecdotes
    return (
      <div>
        <h2>Anecdotes</h2>
        {anecdotes.sort((a, b) => b.votes - a.votes).map(anecdote =>
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={this.vote(anecdote.id, anecdote.content)}>
                vote
              </button>
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default AnecdoteList
