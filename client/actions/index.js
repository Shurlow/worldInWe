import { CALL_API, getJSON } from 'redux-api-middleware'
import { browserHistory } from 'react-router'
import { Schema, arrayOf, normalize } from 'normalizr';

const storySchema = new Schema('stories', {
  idAttribute: 'id'
});

export const STORIES_REQUEST = 'STORIES_REQUEST'
export const STORIES_SUCCESS = 'STORIES_SUCCESS'
export const STORIES_FAILURE = 'STORIES_FAILURE'

const normalizeSuccess = {
  type: STORIES_SUCCESS,
  payload: (action, state, res) => {
    return getJSON(res).then((json) => normalize(json, { stories: arrayOf(storySchema) }))
  }
}

export const STORY_REQUEST = 'STORY_REQUEST'
export const STORY_SUCCESS = 'STORY_SUCCESS'
export const STORY_FAILURE = 'STORY_FAILURE'

const normalizeSuccessStory = {
  type: STORY_SUCCESS,
  payload: (action, state, res) => {
    return getJSON(res).then(function(json){
      const prepareJson = {'stories': [json.stories]} //json array becomes 'stories' array after normalizing
      return normalize(prepareJson, { stories: arrayOf(storySchema) })
    })
  }
}

export function loadStories() {
  return {
    [CALL_API]: {
      endpoint: "/api",
      method: "GET",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
      types: [STORIES_REQUEST, normalizeSuccess, STORIES_FAILURE]
    }
  }
}

export function fetchStory(id) {
  return {
    [CALL_API]: {
      endpoint: "/api/" + id,
      method: "GET",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
      types: [STORY_REQUEST, normalizeSuccessStory, STORY_FAILURE]
    }
  }
}

export function loadStory(id) {
  return (dispatch, getState) => {
    const story = getState().data.stories[id]
    if (story) {
      return null
    }
    return dispatch(fetchStory(id))
  }
}

export const LOGIN_REQUEST = 'LOGIN_REQUEST'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_FAILURE = 'LOGIN_FAILURE'
export const LOGOUT_USER = 'LOGOUT_USER'
export const SIGNUP_REQUEST = 'SIGNUP_REQUEST'
export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS'
export const SIGNUP_FAILURE = 'SIGNUP_FAILURE'

export function loginUser(username, password, isAdmin, redirect='/', cb) {
  return (dispatch, getState) => {
    return dispatch(fetchUser(username, password, isAdmin))
      .then(function(res) {
        if (res.error) {
          // browserHistory.push('error')
          console.log(res, res.error)
          cb(res.error, null)
        } else {
          // console.log('login success', res.body, res.payload)
          window.localStorage.setItem('id_token', res.payload.token)
          browserHistory.push(redirect)
        }
      })
  }
}

export function logoutUser() {
  window.localStorage.removeItem('id_token')
  return (dispatch, getState) => {
    return dispatch({ type: LOGOUT_USER})
      .then( res => {
        browserHistory.push('/')
      })
  }
}

export function signUpUser(userObject, redirect='/') {
  return (dispatch, getState) => {
    return dispatch(createUser(userObject))
      .then(function(res) {
        if (!res.error) {
          window.localStorage.setItem('id_token', res.payload.token)
          browserHistory.push(redirect)
        }
      })
  }
}

function createUser(userObject) {
  console.log('create:', userObject)
  return {
    [CALL_API]: {
      endpoint: "/auth/createUser",
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userObject),
      types: [SIGNUP_REQUEST, SIGNUP_SUCCESS, SIGNUP_FAILURE]
    }
  }
}

function fetchUser(username, password, isAdmin) {
  return {
    [CALL_API]: {
      endpoint: "/auth/login",
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
        isAdmin: isAdmin
      }),
      types: [LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE]
    }
  }
}

export const UPLOAD_STORY_REQUEST = 'UPLOAD_STORY_REQUEST'
export const UPLOAD_STORY_SUCCESS = 'UPLOAD_STORY_SUCCESS'
export const UPLOAD_STORY_FAILURE = 'UPLOAD_STORY_FAILURE'

export function uploadStory(storyObj) {
  return (dispatch, getState) => {
    return dispatch(uploadStoryReq(storyObj))
      .then(function(res) {
        if (!res.error) {
          browserHistory.push('/')
        }
      })
  }
}

function uploadStoryReq(storyObj) {
  return {
    [CALL_API]: {
      endpoint: "/api/story",
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(storyObj),
      types: [UPLOAD_STORY_REQUEST, UPLOAD_STORY_SUCCESS, UPLOAD_STORY_FAILURE]
    }
  }
}

export const UPLOAD_IMAGE_REQUEST = 'UPLOAD_IMAGE_REQUEST'
export const UPLOAD_IMAGE_SUCCESS = 'UPLOAD_IMAGE_SUCCESS'
export const UPLOAD_IMAGE_FAILURE = 'UPLOAD_IMAGE_FAILURE'

export function uploadImage(id, img_data) {
  return (dispatch, state) => {
    return dispatch(uploadImageReq(id, img_data))
      .then(function(res) {
        if (!res.error) {
          console.log('image upload successful')
        }
      })
  }
}

function uploadImageReq(id, img_data) {
  return {
    [CALL_API]: {
      endpoint: "/api/image/" + id,
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({img: img_data}),
      types: [UPLOAD_IMAGE_REQUEST, UPLOAD_IMAGE_SUCCESS, UPLOAD_IMAGE_FAILURE]
    }
  }
}