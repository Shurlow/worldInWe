import {
  LOGIN_USER,
  LOGOUT_USER,
  SIGNUP_USER,
  SIGNUP_USER_SUCCESS,
  SIGNUP_USER_FAILURE,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAILURE, 
} from '../constants';
import {createReducer} from '../util.js';
import jwtDecode from 'jwt-decode'

const initialState = {
    isAuthenticated: false,
    isAuthenticating: false,
    statusText: null,
    token: null,
    username: null,
    email: null,
    userId: null,
    error: false
};
export default createReducer(initialState, {
  [SIGNUP_USER]: (state, payload) => {
    return Object.assign({}, state, {
      'isAuthenticating': true,
      error: false
    })
  },
  [SIGNUP_SUCCESS]: (state, payload) => {
    return Object.assign({}, state, {
      'isAuthenticating': false,
      'isAuthenticated': true,
      'token': payload.token,
      'userId': payload.user.id,
      'email': payload.user.email,
      'username': payload.user.username
      },
      'statusText': 'You have been successfully signed up.'
    });
  },
  [SIGNUP_FAILURE]: (state, payload) => {
    return Object.assign({}, state, {
      'isAuthenticating': false,
      'isAuthenticated': false,
      'user': null,
      'error': true
    });
  },
  [LOGIN_USER]: (state, payload) => {
    return Object.assign({}, state, {
      'isAuthenticating': true
    })
  },
  [LOGOUT_USER]: (state, payload) => {
    return Object.assign({}, state, {
      'isAuthenticating': false,
      'isAuthenticated': false,
      'name': null,
      'token': null,
      'email': null,
      'id': null
    })
  },
  [LOGIN_USER_SUCCESS]: (state, payload) => {
    console.log('Success', payload)
    return Object.assign({}, state, {
      'isAuthenticating': false,
      'isAuthenticated': true,
      'token': payload.token,
      'id': payload.id,
      'name': payload.name,
      'statusText': 'You have been successfully logged in.'
    });
  },
  [LOGIN_USER_FAILURE]: (state, payload) => {
    return Object.assign({}, state, {
      'isAuthenticating': false,
      'isAuthenticated': false,
    });
  },
  [LOGOUT_USER]: (state, payload) => {
    return Object.assign({}, state, {
      'isAuthenticated': false,
      'statusText': 'You have been successfully logged out.'
    });
  }
})