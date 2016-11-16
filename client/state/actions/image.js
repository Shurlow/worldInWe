import { CALL_API, getJSON } from 'redux-api-middleware'
import { browserHistory } from 'react-router'



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



// const imageSuccess = (img_data) => {
//   return {
//     type: UPLOAD_IMAGE_SUCCESS,
//     payload: (action, state, res) => {
//       console.log('catch img success', action, state, res)
//       return getJSON(res).then( (json) => {
//         return { src: img_data, url: json.url }
//       })
//     }
//   }
// }