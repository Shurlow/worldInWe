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