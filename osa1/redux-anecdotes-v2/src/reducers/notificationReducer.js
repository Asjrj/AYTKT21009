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

export const notificationCreation = (text) => {
  return {
    type: 'NOTIFY',
    message: text
  }
}
export const notificationClear = () => {
  return {
    type: 'CLEAR',
    message: ''
  }
}
export default notificationReducer