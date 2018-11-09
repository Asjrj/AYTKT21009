import React from 'react'
import { connect } from 'react-redux'
import { anecdoteVote } from '../reducers/anecdoteReducer'
import { notify } from '../reducers/notificationReducer'


class AnecdoteList extends React.Component {
  vote = (anecdote) => () => {
    this.props.anecdoteVote(anecdote)
    this.props.notify(`you voted '${anecdote.content}'`, 3)
  }

  render() {
    return (
      <div>
        <h2>Anecdotes</h2>
        {this.props.anecdotes.map(anecdote =>
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={this.vote(anecdote)}>
                vote
              </button>
            </div>
          </div>
        )}
      </div>
    )
  }
}

const anecdotesToShow = (anecdotes, filter) => {
  let filtered = anecdotes
  if (filter !== '') {
    filtered = anecdotes.filter(anecdote => anecdote.content.includes(filter))
  }
  return filtered
}
const mapStateToProps = (state) => {
  return {
    anecdotes: anecdotesToShow(state.anecdotes, state.filter)
  }
}
const mapDispatchToProps = {
  anecdoteVote,
  notify
}
const ConnectedAnecdoteList = connect(mapStateToProps, mapDispatchToProps)(AnecdoteList)
export default ConnectedAnecdoteList
