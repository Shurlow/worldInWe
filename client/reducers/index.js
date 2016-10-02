import {combineReducers} from 'redux';
import {createReducer} from '../util';
import { routerReducer as routing } from 'react-router-redux'
import jwtDecode from 'jwt-decode';
import merge from 'lodash/merge'
import union from 'lodash/union'
import * as ActionTypes from '../actions'

function data(state = { stories: [], imageSuccess: false }, action) {
  if (action.payload && action.payload.entities) {
    return merge({}, state, action.payload.entities)
  }
  if (action.type === ActionTypes.UPLOAD_IMAGE_SUCCESS) {
    return merge({}, state, {imageSuccess: true})
  }
  return state
}

function result(state = { stories: [] }, action) {
  if (action.type === 'STORIES_SUCCESS') {
    return merge({}, state, action.payload.result)
  }
  return state
}

const token = localStorage.getItem('id_token')

function auth(state = {
  isAuthenticated: token ? true : false,
  username: token ? jwtDecode(token).username : null
}, action) {
  if (action.type === ActionTypes.LOGIN_SUCCESS || action.type === ActionTypes.SIGNUP_SUCCESS) {
    // localStorage.setItem('token', token);
    console.log('auth', action.payload)
    var user = jwtDecode(action.payload.token)
    return merge({}, state, {isAuthenticated: true, username: user.username})
  }
  if (action.type === ActionTypes.LOGOUT_USER) {
    return merge({}, state, {isAuthenticated: false, username: null})
  }
  return state
}

// function auth(state = { isAuthenticated: false }, action) {
//   if (action.response && action.response.auth) {
//     return merge({}, state, action.response.auth)
//   }
//   return state
// }



export default combineReducers({
 auth,
 data,
 result,
 routing
});