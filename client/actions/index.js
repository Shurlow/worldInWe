import { CALL_API, getJSON } from 'redux-api-middleware'
import { browserHistory } from 'react-router'
import { Schema, arrayOf, normalize } from 'normalizr';

const storySchema = new Schema('stories', {
  idAttribute: 'id'
});





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