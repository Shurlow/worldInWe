import { CALL_API, getJSON } from 'redux-api-middleware'
import { browserHistory } from 'react-router'

export const UPLOAD_STORY_REQUEST = 'UPLOAD_STORY_REQUEST'
export const UPLOAD_STORY_SUCCESS = 'UPLOAD_STORY_SUCCESS'
export const UPLOAD_STORY_FAILURE = 'UPLOAD_STORY_FAILURE'
export const UPLOAD_IMAGE_REQUEST = 'UPLOAD_IMAGE_REQUEST'
export const UPLOAD_IMAGE_SUCCESS = 'UPLOAD_IMAGE_SUCCESS'
export const UPLOAD_IMAGE_FAILURE = 'UPLOAD_IMAGE_FAILURE'
export const SAVE_VID_SUCCESS = 'SAVE_VID_SUCCESS'
export const RESET_NEW_STORY = 'RESET_NEW_STORY'
export const UPDATE_NEW_STORY = 'UPDATE_NEW_STORY'

export function updateNewStory(obj) {
  return {
    type: UPDATE_NEW_STORY,
    payload: obj
  }
}

export function resetNewStory() {
  return {
    type: RESET_NEW_STORY
  }
}

export function uploadStory() {
  return (dispatch, getState) => {
    const state = getState().newstory
    hasRequiredFields(state, function(err, msg) {
      if (err) {return dispatch(updateNewStory({ isError: msg }))}
      let {isError, isFetching, form, theme1, theme2, location, ...obj} = state
      obj.tags = {
        form: state.form,
        theme: [state.theme1, state.theme2],
        location: state.location,
        length: countWords(state.content) + ' words'
      }
      dispatch(uploadStoryReq(obj))
        .then(function(res) {
          if (res.error) {return dispatch(updateNewStory({isError: 'Error uploading story'}))}
          browserHistory.push('/')
        })
    })
  }
}

function uploadStoryReq(storyObj) {
  return {
    [CALL_API]: {
      endpoint: "/api/stories",
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

export function uploadImage(id, img_data) {
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

function hasRequiredFields(storyObj, cb) {
  const keys = Object.keys(storyObj)
  const values = Object.values(storyObj)
  console.log('checking obj', keys, values)
  for (var i = 0; i <= values.length - 1; i++) {
    if (keys[i].match(/^(isError|isFetching|backup|video)$/)) {i++}
    else if (values[i] == null) {
      return cb(true, `You're story is missing something: ${keys[i]}`)
    }
  }
  cb(false)
}

function countWords(content) {
  let count = 0
  content.forEach( line => {
    count += line.split(' ').length
  })
  return count
}
