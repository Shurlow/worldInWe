import { checkHttpStatus, parseJSON } from '../util.js';
import {LOGIN_USER,
  LOGOUT_USER, API_URL,
  RECEIVE_STORIES,
  FETCH_STORY_REQ,
  RECEIVE_STORY,
  UPLOAD_IMAGE_SUCCESS
} from '../constants.js';

import fetch from 'isomorphic-fetch'
// import RouterContainer from '../RouterContainer.js'

export function loginUser() {    
  return {
    actionType: LOGIN_USER,
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

export function fetchStory(id) {
  return (dispatch, state) => {
    dispatch(fetchStoryReq());
    return fetch(API_URL + id)
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
    return fetch(API_URL + 'story', {
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
    return fetch(API_URL + 'image/' + id, {
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