import {combineReducers} from 'redux';
// import { routerReducer as routing } from 'react-router-redux'
// import auth from './auth';
// import data from './data';

import { LOGIN_USER, LOGOUT_USER } from '../constants.js'

const initialState = {
  logged_in_user: false,
}

function auth(state = initialState, action) {
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

// const rootReducer = combineReducers({
//  auth,
//  routing
// });

export default auth