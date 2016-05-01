import {combineReducers} from 'redux';
import { routerReducer as routing } from 'react-router-redux'
import merge from 'lodash/merge'
import union from 'lodash/union'
import * as ActionTypes from '../actions'

function data(state = { stories: [] }, action) {
  if (action.payload && action.payload.entities) {
    return merge({}, state, action.payload.entities)
  }
  return state
}

function result(state = { stories: [] }, action) {
  if (action.type === 'STORIES_SUCCESS') {
    return merge({}, state, action.payload.result)
  }
  return state
}

function auth(state = { isAuthenticated: false }, action) {
  if (action.response && action.response.auth) {
    return merge({}, state, action.response.auth)
  }
  return state
}

export default combineReducers({
 auth,
 data,
 result,
 routing
});