import React from 'react'
import { connect } from 'react-redux'

class Notification extends React.Component {
  render() {
    const style = {
      border: 'solid',
      padding: 10,
      borderWidth: 1
    }
    const message = this.props.notification
    if (message === '') {
      return (
        <div></div>
      )
    }
    else {
      return (
        <div style={style}>
          {message}
        </div>
      )
    }
  }
}

const mapStateToProps = (state) => {
  return {
    notification: state.notification
  }
}
const ConnectedNotification = connect(mapStateToProps)(Notification)
export default ConnectedNotification
