const notification = 'render here notification...'

const notificationReducer = (state = notification, action) => {
  console.log('*** notificationReducer:', action.type)
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

export default notificationReducer