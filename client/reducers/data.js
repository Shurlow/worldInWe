import {RECEIVE_STORIES} from '../constants.js'
import {createReducer} from '../util.js';

const initialState = {
  stories: ['cool', 'fun']
}

export default createReducer(initialState, {
  [RECEIVE_STORIES]: (state, payload) => {
    console.log('payload', payload)
    return Object.assign({}, state, {
      'stories': payload.data
    })
  }
})