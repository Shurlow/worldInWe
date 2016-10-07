import * as ActionTypes from '../actions/auth'
import { createReducer } from '../util.js';
import jwtDecode from 'jwt-decode'

const token = localStorage.getItem('id_token')
const initialState = {
  isAuthenticating: false,
  isAuthenticated: token ? true : false,
  isError: false,
  username: token ? jwtDecode(token).username : null,
  id: null
}

export default createReducer(initialState, {
  [ActionTypes.LOGIN_REQUEST]: (state, payload) => {
    return Object.assign({}, state, {
      isAuthenticating: true,
      isError: false
    })
  },
  [ActionTypes.LOGIN_SUCCESS]: (state, payload) => {
    var user = jwtDecode(payload.token)
    return Object.assign({}, state, {
      isAuthenticating: false,
      isAuthenticated: true,
      id: user.id,
      username: user.username,
    });
  },
  [ActionTypes.LOGOUT_USER]: (state, payload) => {
    return Object.assign({}, state, {
      isAuthenticating: false,
      isAuthenticated: false,
      id: null,
      username: null,
    });
  },
  [ActionTypes.SIGNUP_REQUEST]: (state, payload) => {
    return Object.assign({}, state, {
      'isAuthenticating': true,
      isError: false
    })
  },
  [ActionTypes.SIGNUP_SUCCESS]: (state, payload) => {
    return Object.assign({}, state, {
      isAuthenticating: false,
      isAuthenticated: true,
      userId: payload.id,
      username: payload.username
    });
  },
  [ActionTypes.SIGNUP_FAILURE]: (state, payload) => {
    return Object.assign({}, state, {
      isAuthenticating: false,
      isAuthenticated: false,
      isError: true
    });
  }
})

// export default function auth(initialState, action) {
//   if (action.type === ActionTypes.LOGIN_SUCCESS || action.type === ActionTypes.SIGNUP_SUCCESS) {
//     // localStorage.setItem('token', token);
//     console.log('auth', action.payload)
//     var user = jwtDecode(action.payload.token)
//     return merge({}, state, {isAuthenticated: true, username: user.username})
//   }
//   if (action.type === ActionTypes.LOGOUT_USER) {
//     localStorage
//     return merge({}, state, {isAuthenticated: false, username: null})
//   }
//   return state
// }