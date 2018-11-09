const notification = ''

const notificationReducer = (state = notification, action) => {
  switch (action.type) {
    case 'NOTIFY':
      return action.message
    case 'CLEAR':
      return ''
    default:
      return state
  }
}

export const notify = (message, sec) => {
  return async (dispatch) => {
    dispatch({
      type: 'NOTIFY',
      message: message
    })
    await setTimeout(() => {
      dispatch({
        type: 'CLEAR',
        message: ''
      })
    }, sec * 1000)
  }
}

export default notificationReducer