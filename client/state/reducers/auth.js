import * as ActionTypes from '../actions/auth'
import { createReducer } from '../util.js';
import jwtDecode from 'jwt-decode'

const token = localStorage.getItem('id_token')
const initialState = {
  isAuthenticating: false,
  isAuthenticated: token ? true : false,
  username: token ? jwtDecode(token).username : null,
  privileges: 'read_only',
  id: null,
  token: null,
  isError: false
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
      privileges: user.privileges,
      token: payload.token
    });
  },
    [ActionTypes.LOGIN_FAILURE]: (state, payload) => {
    return Object.assign({}, state, {
      isAuthenticating: false,
      isAuthenticated: false,
      isError: true
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
  // [ActionTypes.SIGNUP_REQUEST]: (state, payload) => {
  //   return Object.assign({}, state, {
  //     isAuthenticating: true,
  //     isError: false
  //   })
  // },
  // [ActionTypes.SIGNUP_SUCCESS]: (state, payload) => {
  //   console.log('signup done right', payload)
  //   return Object.assign({}, state, {
  //     isAuthenticating: false,
  //     isAuthenticated: true,
  //     id: payload.id,
  //     username: payload.username
  //   });
  // },
  // [ActionTypes.SIGNUP_FAILURE]: (state, payload) => {
  //   return Object.assign({}, state, {
  //     isAuthenticating: false,
  //     isAuthenticated: false,
  //     isError: true
  //   });
  // }
})