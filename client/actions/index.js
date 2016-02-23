import { checkHttpStatus, parseJSON } from '../util.js';
import {LOGIN_USER, LOGOUT_USER, API_URL, RECEIVE_STORIES } from '../constants.js';
import fetch from 'isomorphic-fetch'
// import RouterContainer from '../RouterContainer.js'

export function loginUser() {    
  return {
    actionType: LOGIN_USER,
    jwt: jwt
  }
}

export function receiveStories(data) {
  return {
    type: RECEIVE_STORIES,
    payload: {
      data: data
    }
  }
}


export function fetchStories(token) {
  return (dispatch, state) => {
    // dispatch(fetchProtectedDataRequest());
    return fetch(API_URL)
    .then(checkHttpStatus)
    .then(parseJSON)
    .then(response => {
      dispatch(receiveStories(response))
    })
    .catch(error => {
      if(error.response.status === 401) {
        console.log(401)
      }
    })
  }
}