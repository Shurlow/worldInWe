import { CALL_API, getJSON } from 'redux-api-middleware'
import { browserHistory } from 'react-router'
import jwtDecode from 'jwt-decode'
import root from 'window-or-global'

export const LOGIN_REQUEST = 'LOGIN_REQUEST'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_FAILURE = 'LOGIN_FAILURE'
export const LOGOUT_USER = 'LOGOUT_USER'
export const SIGNUP_REQUEST = 'SIGNUP_REQUEST'
export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS'
export const SIGNUP_FAILURE = 'SIGNUP_FAILURE'

export function loginUser(token, userObject, redirect='/', cb) {
  return (dispatch, getState) => {
    if (token) {
      var user = jwtDecode(token)
      return dispatch({
        type: LOGIN_SUCCESS,
        payload: {
          token: token
        }
      })
    }
    return dispatch(fetchUser('login', userObject))
      .then(function(res) {
        if (res.error) {
          console.log(res.error)
          cb(res.error, null)
        } else {
          console.log('login success')
          root.localStorage.setItem('id_token', res.payload.token)
          browserHistory.push(redirect)
        }
      })
  }
}

export function logoutUser() {
  return (dispatch, getState) => {
    return dispatch({ type: LOGOUT_USER})
      .then( res => {
        root.localStorage.removeItem('id_token')
        browserHistory.push('/')
      })
  }
}

export function signUpUser(userObject, redirect='/') {
  return (dispatch, getState) => {
    return dispatch(fetchUser('create', userObject))
      .then(function(res) {
        if (!res.error) {
          root.localStorage.setItem('id_token', res.payload.token)
          browserHistory.push(redirect)
        }
      })
  }
}

// function createUser(userObject) {
//   console.log('create:', userObject)
//   return {
//     [CALL_API]: {
//       endpoint: "/auth/createUser",
//       method: "POST",
//       headers: {
//         "Accept": "application/json",
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(userObject),
//       types: [SIGNUP_REQUEST, SIGNUP_SUCCESS, SIGNUP_FAILURE]
//     }
//   }
// }

function fetchUser(endpoint, userObject) {
  return {
    [CALL_API]: {
      endpoint: `/auth/${endpoint}`,
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userObject),
      types: [LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE]
    }
  }
}