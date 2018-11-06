import React from 'react'
import { filterCreation } from '../reducers/filterReducer'


class AnecdoteFilter extends React.Component {
  handleChange = (event) => {
    this.props.store.dispatch(filterCreation(event.target.value))
  }

  render() {
    const style = {
      marginBottom: 10
    }
    return (
      <div style={style}>
        filter <input onChange={this.handleChange} />
      </div>
    )
  }
}

export default AnecdoteFilter