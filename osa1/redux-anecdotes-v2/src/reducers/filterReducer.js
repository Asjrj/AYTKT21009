const filter = ''

const filterReducer = (state = filter, action) => {
  if (action.type === 'FILTER') {
    return action.filter
  }
  else {
    return state
  }
}

export const filterCreation = (text) => {
  return {
    type: 'FILTER',
    filter: text
  }
}

export default filterReducer