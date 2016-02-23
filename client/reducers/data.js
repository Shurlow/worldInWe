
const initialState = {
  data: null
}

export default data(state = initialState, action) {
  switch (action.type) {
    case "DATA":
      return Object.assign({}, state, {
        data: true
      })
    default:
      return state
  }
}