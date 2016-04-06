import { checkHttpStatus, parseJSON, guid} from '../util.js';
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
  UPLOAD_STORY_REQ,
  UPLOAD_STORY_SUCCESS,
  UPLOAD_IMAGE_SUCCESS,
  UPLOAD_IMAGE_FAILURE,
  UPLOAD_IMAGE_REQ,
  DESELECT_STORY
} from '../constants.js';
import { browserHistory } from 'react-router'
import { push } from 'react-router-redux'
import jwtDecode from 'jwt-decode';

import fetch from 'isomorphic-fetch'
// import RouterContainer from '../RouterContainer.js'

export function deselectStory() {
  return {
    type: DESELECT_STORY
  }
}

export function loginUserSuccess(token) {
  localStorage.setItem('token', token);
  var user = jwtDecode(token)
  console.log('User from token:', user)
  return {
    type: LOGIN_USER_SUCCESS,
    payload: {
      token: token,
      id: user.id,
      name: user.name
    }
  }
  // return dispatch => {
  //   // dispatch(deselectStory());

  // }
}

export function loginUserFailure(error) {
  localStorage.removeItem('token');
  return {
    type: LOGIN_USER_FAILURE,
    payload: {
      error: error
    }
  }
}

export function loginUserRequest() {
  return {
    type: LOGIN_USER
  }
}

export function loginUser(email, password, redirect='/') {    

  return function(dispatch) {
    dispatch(loginUserRequest())
    return fetch(BASE_URL + 'auth/login', {
      method: 'post',
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
        body: JSON.stringify({
          email: email,
          password: password
        })
      })
      .then(checkHttpStatus)
      .then(parseJSON)
      .then(response => {
        console.log(response)
        dispatch(loginUserSuccess(response.token))
        dispatch(push(redirect))
      })
      .catch(error => {
        console.log('Error login', error)
        dispatch(loginUserFailure(error))
      })
  }
}

export function logoutUser() {
  localStorage.removeItem('token');
  return {
    type: LOGOUT_USER
  }
}

export function signUpUser(name, email, password, redirect) {    

  return function(dispatch) {
    dispatch(signUpUserRequest())
    return fetch(BASE_URL + 'auth/createUser', {
      method: 'post',
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
        body: JSON.stringify({
          id: guid(),
          name: name,
          email: email,
          password: password
        })
      })
      .then(checkHttpStatus)
      .then(parseJSON)
      .then(response => {
        console.log('response', response)
        dispatch(loginUserSuccess(response.token))
      })
      .catch(error => {
        console.log('Error sign up', error)
        dispatch(signUpUserFailure(error))
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
  deselectStory
  browserHistory.push('/')
  return {
    type: LOGIN_USER_SUCCESS,
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
      statusText: error
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
        console.log('Fetch Error:', error)
      }
    })
  }
}

export function uploadStoryRequest() {
  return {
    type: UPLOAD_STORY_REQ
  }
}

export function uploadStorySuccess() {
  browserHistory.push('/')
  return {
    type: UPLOAD_STORY_SUCCESS
  }
}

export function uploadStory(id, title, img_url, content, rawState) {
  return (dispatch, state) => {
    dispatch(uploadStoryRequest());
    return fetch(BASE_URL + 'api/story', {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: id,
        img: img_url,
        title: title,
        auth_id: 'empty',
        content: content,
        backup: rawState
      })
    })
    .then(checkHttpStatus)
    .then(response => {
      console.log('New Story Successful')
      dispatch(uploadStorySuccess());
    })
    .catch(error => {
      console.log('Story Upload Error:', error)
    })
  }
}

export function uploadImageRequest() {
  return {
    type: UPLOAD_IMAGE_REQ
  }
}

export function updateStory(id, title, content, rawState) {
  return (dispatch, state) => {
    dispatch(uploadStoryRequest());
    return fetch(BASE_URL + 'api/update/' + id, {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title: title,
        content: content,
        backup: rawState
      })
    })
    .then(checkHttpStatus)
    // .then(parseJSON)
    .then(response => {
      console.log('Update Successful')
      dispatch(uploadStorySuccess());
    })
    .catch(error => {
      console.log('Story Upload Error:', error)
    })
  }
}

export function uploadImageSuccess(id) {
  return {
    type: UPLOAD_IMAGE_SUCCESS,
    payload: "https://s3-us-west-2.amazonaws.com/worldinme-full/"+ id + ".jpg?" + Date.now()
  }
}

export function uploadImageFailure() {
  return {
    type: UPLOAD_IMAGE_FAILURE
  }
}

export function uploadImage(id, img_data) {
  return (dispatch, state) => {
    dispatch(uploadImageRequest())
    return fetch(BASE_URL + 'api/image/' + id, {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Credentials': true
      },
      body: JSON.stringify({
        img: img_data
      })
    })
    .then(checkHttpStatus)
    .then(response => {
      console.log('Image Upload Successful')
      dispatch(uploadImageSuccess(id))
    })
    .catch(error => {
      console.log('Image Upload Error:', error)
      dispatch(uploadImageFailure())
    })
  }
}

// export function navigateTo(location) {
//   return
// }