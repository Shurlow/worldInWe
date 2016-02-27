import { checkHttpStatus, parseJSON } from '../util.js';
import {LOGIN_USER,
  LOGOUT_USER,
  LOGIN_USER_FAILURE,
  LOGIN_USER_SUCCESS,
  SIGNUP_USER,
  SIGNUP_USER_SUCCESS,
  SIGNUP_USER_FAILURE,
  BASE_URL,
  RECEIVE_STORIES,
  FETCH_STORY_REQ,
  RECEIVE_STORY,
  UPLOAD_IMAGE_SUCCESS
} from '../constants.js';
import { browserHistory } from 'react-router'

// import jwtDecode from 'jwt-decode';
// import { pushState } from 'redux-router';

import fetch from 'isomorphic-fetch'
// import RouterContainer from '../RouterContainer.js'

export function loginUserSuccess(token) {
  localStorage.setItem('token', token);
  return {
    type: LOGIN_USER_SUCCESS,
    payload: {
      token: token
    }
  }
}

export function loginUserFailure(error) {
  localStorage.removeItem('token');
  return {
    type: LOGIN_USER_FAILURE,
    payload: {
      status: error.status,
      statusText: error.statusText
    }
  }
}

export function loginUserRequest() {
  return {
    type: LOGIN_USER
  }
}

export function logoutUser() {
  localStorage.removeItem('token');
  return {
    type: LOGOUT_USER
  }
}

export function loginUser(email, password, redirect) {    

  return function(dispatch) {
    dispatch(loginUserRequest())
    return fetch(BASE_URL + 'auth/getToken', {
      method: 'post',
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
        body: JSON.stringify({email: email, password: password})
      })
      .then(checkHttpStatus)
      .then(parseJSON)
      .then(response => {
        console.log(response)
        dispatch(loginUserSuccess(response.token))
      })
      .catch(error => {
        console.log('Error login', error)
        dispatch(loginUserFailure(error.response))
      })
  }
}

export function signUpUser(email, password, redirect) {    

  return function(dispatch) {
    dispatch(signUpUserRequest())
    return fetch(BASE_URL + 'auth/newUser', {
      method: 'post',
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
        body: JSON.stringify({email: email, password: password})
      })
      .then(checkHttpStatus)
      .then(parseJSON)
      .then(response => {
        console.log('response', response)
        dispatch(signUpUserSuccess(response))
      })
      .catch(error => {
        console.log('errrr',error)
        dispatch(signUpUserFailure(error.response))
      })
  }
}

export function signUpUserRequest(token) {
  localStorage.setItem('token', token);
  return {
    type: SIGNUP_USER,
  }
}

export function signUpUserSuccess(user) {
  localStorage.setItem('token', user.token);
  browserHistory.push('/')
  return {
    type: SIGNUP_USER_SUCCESS,
    payload: {
      user: user
    }
  }
}

export function signUpUserFailure(error) {
  localStorage.removeItem('token');
  return {
    type: SIGNUP_USER_FAILURE,
    payload: {
      status: error.status,
      statusText: error.statusText
    }
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

export function fetchStoryReq() {
  return {
    type: FETCH_STORY_REQ
  }
}

export function receiveStory(story) {
  return {
    type: RECEIVE_STORY,
    payload: {
      data: story
    }
  }
}

export function fetchStories(token) {
  return (dispatch, state) => {
    // dispatch(fetchProtectedDataRequest());
    return fetch(BASE_URL + 'api')
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

export function fetchStory(id) {
  return (dispatch, state) => {
    dispatch(fetchStoryReq());
    return fetch(BASE_URL + 'api/' + id)
    .then(checkHttpStatus)
    .then(parseJSON)
    .then(response => {
      dispatch(receiveStory(response))
    })
    .catch(error => {
      if(error.response.status === 401) {
        console.log(401)
      }
    })
  }
}



export function uploadStory(story) {
  return (dispatch, state) => {
    // dispatch(fetchProtectedDataRequest());
    return fetch(BASE_URL + 'api/story', {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(story)
    })
    .then(checkHttpStatus)
    .then(parseJSON)
    .then(response => {
      console.log(response.status)
    })
    .catch(error => {
      if(error.response.status === 401) {
        console.log(401)
      }
    })
  }
}

export function uploadImageSuccess() {
  return {
    type: UPLOAD_IMAGE_SUCCESS
  }
}

export function uploadImage(img_data, id) {
  return (dispatch, state) => {
    return fetch(BASE_URL + 'image/' + id, {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        img: img_data
      })
    })
    .then(checkHttpStatus)
    .then(response => {
      console.log('Resp',response)
    })
    .catch(error => {
      console.log('err', error)
      if(error.response === 401) {
        console.log(401)
      }
    })
  }
}