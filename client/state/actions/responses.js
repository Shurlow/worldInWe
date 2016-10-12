import { CALL_API, getJSON } from 'redux-api-middleware'
import { browserHistory } from 'react-router'

export const RESPONSES_REQUEST = 'RESPONSES_REQUEST'
export const RESPONSES_SUCCESS = 'RESPONSES_SUCCESS'
export const RESPONSES_FAILURE = 'RESPONSES_FAILURE'
export const UPLOAD_RESPONSE_REQUEST = 'UPLOAD_RESPONSE_REQUEST'
export const UPLOAD_RESPONSE_SUCCESS = 'UPLOAD_RESPONSE_SUCCESS'
export const UPLOAD_RESPONSE_FAILURE = 'UPLOAD_RESPONSE_FAILURE'

//orders responses array by most recent
const normalizeSuccess = {
  type: RESPONSES_SUCCESS,
  payload: (action, state, res) => {
    return getJSON(res).then(function(responses){
      return responses.reverse()
    })
  }
}

export function loadResponses(story_id) {
  return {
    [CALL_API]: {
      endpoint: `/api/responses/${story_id}`,
      method: "GET",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
      types: [RESPONSES_REQUEST, normalizeSuccess, RESPONSES_FAILURE]
    }
  }
}

export function uploadResponse(story_id, responseObj) {
  return (dispatch, getState) => {
    return dispatch(uploadResponseRequest(story_id, responseObj))
      .then(function(res) {
        console.log('fetch post done')
        if (!res.error) {
          dispatch(loadResponses(story_id))
          // browserHistory.reload()
          // location.reload()
          // browserHistory.push(`/story/${story_id}`)
        }
      })
  }
}

export function uploadResponseRequest(story_id, responseObj) {
  return {
    [CALL_API]: {
      endpoint: `/api/responses/${story_id}`,
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(responseObj),
      types: [UPLOAD_RESPONSE_REQUEST, UPLOAD_RESPONSE_SUCCESS, UPLOAD_RESPONSE_FAILURE]
    }
  }
}

export function deleteResponse(response_id, token, story_id) {
  return (dispatch, getState) => {
    return dispatch(deleteResponseRequest(response_id, token))
      .then(function(res) {
        console.log('delete done')
        if (!res.error) {
          dispatch(loadResponses(story_id))
        }
      })
  }
}

export function deleteResponseRequest(response_id, token) {
  return {
    [CALL_API]: {
      endpoint: `/api/responses/delete/${response_id}`,
      method: "DELETE",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({token: token}),
      types: [UPLOAD_RESPONSE_REQUEST, UPLOAD_RESPONSE_SUCCESS, UPLOAD_RESPONSE_FAILURE]
    }
  }
}