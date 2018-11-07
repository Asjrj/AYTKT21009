import React from 'react'
import { connect } from 'react-redux'
import { filterCreation } from '../reducers/filterReducer'


class AnecdoteFilter extends React.Component {
  handleChange = (event) => {
    this.props.filterCreation(event.target.value)
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

const mapDispatchToProps = {
  filterCreation
}
const ConnectedAnecdoteFilter = connect(null, mapDispatchToProps )(AnecdoteFilter)
export default ConnectedAnecdoteFilter