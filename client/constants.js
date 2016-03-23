var testurl = ''
if (process.env.NODE_ENV === 'production') {
   testurl = 'http://worldinme.xyz/'
} else {
  testurl = 'http://localhost:3000/'
}

export const BASE_URL = testurl
export const LOGIN_USER = 'LOGIN_USER'
export const LOGOUT_USER = 'LOGOUT_USER'
export const LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS'
export const LOGIN_USER_FAILURE = 'LOGIN_USER_FAILURE'
export const FETCH_STORIES = 'FETCH_STORIES';
export const RECEIVE_STORIES = 'RECEIVE_STORIES';
export const STORY_UPLOAD_START = 'STORY_UPLOAD_START';
export const STORY_UPLOAD_SUCCESS = 'STORY_UPLOAD_SUCCESS';
export const STORY_UPLOAD_ERROR  = 'STORY_UPLOAD_ERROR';
export const RECEIVE_STORY  = 'RECEIVE_STORY';
export const FETCH_STORY_REQ  = 'FETCH_STORY_REQ';
export const UPLOAD_IMAGE_SUCCESS  = 'UPLOAD_IMAGE_SUCCESS';
export const UPLOAD_IMAGE_REQ  = 'UPLOAD_IMAGE_REQ';
export const UPLOAD_IMAGE_FAILURE  = 'UPLOAD_IMAGE_FAILURE';
export const UPLOAD_STORY_REQ  = 'UPLOAD_STORY_REQ';
export const UPLOAD_STORY_SUCCESS  = 'UPLOAD_STORY_SUCCESS';
export const SIGNUP_USER  = 'SIGNUP_USER';
export const SIGNUP_USER_SUCCESS  = 'SIGNUP_USER_SUCCESS';
export const SIGNUP_USER_FAILURE  = 'SIGNUP_USER_FAILURE';
export const DESELECT_STORY  = 'DESELECT_STORY';