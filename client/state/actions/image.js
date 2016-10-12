import { CALL_API, getJSON } from 'redux-api-middleware'
import { browserHistory } from 'react-router'

export const UPLOAD_IMAGE_REQUEST = 'UPLOAD_IMAGE_REQUEST'
export const UPLOAD_IMAGE_SUCCESS = 'UPLOAD_IMAGE_SUCCESS'
export const UPLOAD_IMAGE_FAILURE = 'UPLOAD_IMAGE_FAILURE'
export const RESET_IMAGE = 'RESET_IMAGE'

// export function uploadImage(id, img_data) {
//   return (dispatch, state) => {
//     return dispatch(uploadImageReq(id, img_data))
//       .then(function(res) {
//         if (!res.error) {
//           console.log('image upload successful')
//         }
//       })
//   }
// }

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
      types: [UPLOAD_IMAGE_REQUEST, imageSuccess(img_data), UPLOAD_IMAGE_FAILURE]
    }
  }
}

export function resetImage() {
  return {
    type: RESET_IMAGE
  }
}

const imageSuccess = (img_data) => {
  return {
    type: UPLOAD_IMAGE_SUCCESS,
    payload: (action, state, res) => {
      return getJSON(res).then( (json) => {
        return { src: img_data, url: json.url }
      })
    }
  }
}