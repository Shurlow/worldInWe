import { LOGIN_USER, LOGOUT_USER } from '../constants.js'
import {createReducer} from '../util.js';

const initialState = {
  isAuthenticated: false
}

export default createReducer(initialState, {
  [LOGIN_USER]: (state, payload) => {
    return Object.assign({}, state, {
      'isAuthenticated': true
    })
  },
  [LOGOUT_USER]: (state, payload) => {
    return Object.assign({}, state, {
      'isAuthenticated': false
    })
  }
})

// export default auth(state, action) {
//   switch (action.type) {
//     case LOGIN_USER:
//       return Object.assign({}, state, {
//         logged_in_user: true
//       })
//     case LOGOUT_USER:
//       return Object.assign({}, state, {
//         logged_in_user: false
//       })
//     default:
//       return state
//   }
// }