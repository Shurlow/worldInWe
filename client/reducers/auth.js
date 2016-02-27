import {LOGIN_USER,
  SIGNUP_USER,
  SIGNUP_USER_SUCCESS,
  SIGNUP_USER_FAILURE,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAILURE, 
  LOGOUT_USER} from '../constants';
import {createReducer} from '../util.js';
import jwtDecode from 'jwt-decode'

const initialState = {
    token: null,
    email: null,
    isAuthenticated: false,
    isAuthenticating: false,
    statusText: null
};
export default createReducer(initialState, {
  [SIGNUP_USER]: (state, payload) => {
    return Object.assign({}, state, {
      'isAuthenticating': true,
      'statusText': null
    })
  },
  [SIGNUP_USER_SUCCESS]: (state, payload) => {
    return Object.assign({}, state, {
      'isAuthenticating': false,
      'isAuthenticated': true,
      'token': payload.user.token,
      'email': payload.user.email,
      'statusText': 'You have been successfully signed up.'
    });
  },
  [SIGNUP_USER_FAILURE]: (state, payload) => {
    return Object.assign({}, state, {
      'isAuthenticating': false,
      'isAuthenticated': false,
      'token': null,
      'email': null,
      'statusText': `Authentication Error: ${payload.status} ${payload.statusText}`
    });
  },
  [LOGIN_USER]: (state, payload) => {
    return Object.assign({}, state, {
      'isAuthenticating': true,
      'statusText': null
    })
  },
  [LOGIN_USER_SUCCESS]: (state, payload) => {
    return Object.assign({}, state, {
      'isAuthenticating': false,
      'isAuthenticated': true,
      'token': payload.token,
      'email': 'user email here',
      'statusText': 'You have been successfully logged in.'
    });
  },
  [LOGIN_USER_FAILURE]: (state, payload) => {
    return Object.assign({}, state, {
      'isAuthenticating': false,
      'isAuthenticated': false,
      'token': null,
      'email': null,
      'statusText': `Authentication Error: ${payload.status} ${payload.statusText}`
    });
  },
  [LOGOUT_USER]: (state, payload) => {
    return Object.assign({}, state, {
      'isAuthenticated': false,
      'token': null,
      'email': null,
      'statusText': 'You have been successfully logged out.'
    });
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