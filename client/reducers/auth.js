import { LOGIN_USER, LOGOUT_USER } from '../constants.js'

const initialState = {
  logged_in_user: false,
}

export default auth(state = initialState, action) {
  switch (action.type) {
    case LOGIN_USER:
      return Object.assign({}, state, {
        logged_in_user: true
      })
    case LOGOUT_USER:
      return Object.assign({}, state, {
        logged_in_user: false
      })
    default:
      return state
  }
}