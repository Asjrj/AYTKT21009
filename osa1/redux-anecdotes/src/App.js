import React from 'react';


class App extends React.Component {
  
  voteThisOne = (id) => () => {
    console.log('*** ID:', id)
    this.props.store.dispatch({ type: 'VOTE', id: id })
  }

  render() {
    const anecdotes = this.props.store.getState()
    return (
      <div>
        <h2>Anecdotes</h2>
        {anecdotes.map(anecdote =>
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}&nbsp;
              <button onClick={this.voteThisOne(anecdote.id)}>vote</button>
            </div>
          </div>
        )}
        <h2>create new</h2>
        <form>
          <div><input /></div>
          <button>create</button>
        </form>
      </div>
    )
  }
}

export default App