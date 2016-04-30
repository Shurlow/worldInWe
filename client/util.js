export function createReducer(initialState, reducerMap) {
  return (state = initialState, action) => {
    const reducer = reducerMap[action.type];
    
    return reducer
      ? reducer(state, action.payload)
      : state;
      
    };
}

export function checkHttpStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    console.log('HTTP OK', response)
    return response
  } else {
    var error = new Error(response.statusText)
    console.log('HTTP ERR', response)
    error.response = response
    throw error
  }
}

export function parseJSON(response) {
  return response.json()
}

export function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4();
}

import 'isomorphic-fetch'

function callApi(endpoint) {
  const fullUrl = endpoint

  return fetch(fullUrl)
    .then(response =>
      response.json().then(json => ({ json, response }))
    ).then(({ json, response }) => {
      if (!response.ok) return Promise.reject(json)
      return json
    })
}