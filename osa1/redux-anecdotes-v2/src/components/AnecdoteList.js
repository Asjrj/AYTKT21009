import React from 'react'
import { connect } from 'react-redux'
import { anecdoteVote } from '../reducers/anecdoteReducer'
import { notificationCreation, notificationClear } from '../reducers/notificationReducer'


class AnecdoteList extends React.Component {
  vote = (id, content) => () => {
    this.props.anecdoteVote(id)
    this.props.notificationCreation('you voted: "' + content + '"')
    setTimeout(() => {
      this.props.notificationClear()
    }, 5000)
  }

  render() {
    const anecdotes = this.props.anecdotes
    const filter = this.props.filter
    let filtered = anecdotes
    if (filter !== '') {
      filtered = anecdotes.filter(anecdote => anecdote.content.includes(filter))
    }
    return (
      <div>
        <h2>Anecdotes</h2>
        {filtered.sort((a, b) => b.votes - a.votes).map(anecdote =>
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

const mapStateToProps = (state) => {
  return {
    anecdotes: state.anecdotes,
    filter: state.filter
  }
}
const mapDispatchToProps = {
  anecdoteVote,
  notificationCreation,
  notificationClear
}
const ConnectedAnecdoteList = connect(mapStateToProps, mapDispatchToProps)(AnecdoteList)
export default ConnectedAnecdoteList
