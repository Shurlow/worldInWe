import {combineReducers} from 'redux';
import { routerReducer as routing } from 'react-router-redux'
import merge from 'lodash/merge'
import union from 'lodash/union'
import * as ActionTypes from '../actions'
import paginate from './pagination.js'

function data(state = { stories: [] }, action) {
  if (action.payload && action.payload.entities) {
    console.log('API RES:', action.payload)
    return merge({}, state, action.payload.entities)
  }
  return state
}

function result(state = { stories: [] }, action) {
  if (action.type === 'SUCCESS') {
    console.log('Results', action.payload.result)
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