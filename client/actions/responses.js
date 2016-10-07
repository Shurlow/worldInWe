import { CALL_API, getJSON } from 'redux-api-middleware'
// import { browserHistory } from 'react-router'
// import { Schema, arrayOf, normalize } from 'normalizr';

export const RESPONSES_REQUEST = 'RESPONSES_REQUEST'
export const RESPONSES_SUCCESS = 'RESPONSES_SUCCESS'
export const RESPONSES_FAILURE = 'RESPONSES_FAILURE'

// const responseSchema = new Schema('responses', {
//   idAttribute: 'story_id'
// });

// const normalizeSuccess = {
//   type: RESPONSES_SUCCESS,
//   payload: (action, state, res) => {
//     return getJSON(res).then((json) => normalize(json, { responses: arrayOf(responseSchema) }))
//   }
// }

export function loadResponses(story_id) {
  return {
    [CALL_API]: {
      endpoint: `/api/responses/${story_id}`,
      method: "GET",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
      types: [RESPONSES_REQUEST, RESPONSES_SUCCESS, RESPONSES_FAILURE]
    }
  }
}