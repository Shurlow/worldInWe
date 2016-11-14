import { CALL_API, getJSON } from 'redux-api-middleware'
import { browserHistory } from 'react-router'
import { resetImage } from './image'
// import { Schema, arrayOf, normalize } from 'normalizr';

// export const STORY_REQUEST = 'STORY_REQUEST'
// export const STORY_SUCCESS = 'STORY_SUCCESS'
// export const STORY_FAILURE = 'STORY_FAILURE'

// const normalizeSuccessStory = {
//   type: STORY_SUCCESS,
//   payload: (action, state, res) => {
//     return getJSON(res).then(function(json){
//       const prepareJson = {'stories': [json.stories]} //json array becomes 'stories' array after normalizing
//       return normalize(prepareJson, { stories: arrayOf(storySchema) })
//     })
//   }
// }

// function fetchStory(id) {
//   return {
//     [CALL_API]: {
//       endpoint: "/api/" + id,
//       method: "GET",
//       headers: {
//         "Accept": "application/json",
//         "Content-Type": "application/json",
//       },
//       types: [STORY_REQUEST, STORY_SUCCESS, STORY_FAILURE]
//     }
//   }
// }

// export function loadStory(id) {
//   return (dispatch, getState) => {
//     const story = getState().stories.stories[id]
//     console.log(getState())
//     if (story) {
//       return null
//     }
//     return dispatch(loadStories())
//   }
// }

export const UPLOAD_STORY_REQUEST = 'UPLOAD_STORY_REQUEST'
export const UPLOAD_STORY_SUCCESS = 'UPLOAD_STORY_SUCCESS'
export const UPLOAD_STORY_FAILURE = 'UPLOAD_STORY_FAILURE'

export function uploadStory(storyObj) {
  return (dispatch, getState) => {
    return dispatch(uploadStoryReq(storyObj))
      .then(function(res) {
        if (!res.error) {
          dispatch(resetImage())
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

// function uploadSuccess() {
//   return {
//     type: UPLOAD_STORY_SUCCESS,

//   }
// }