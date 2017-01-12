import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux'

import { default as auth } from './auth'
import { default as stories } from './stories'
import { default as newstory } from './newstory'
import { default as responses } from './responses'

export default combineReducers({
 auth,
 stories,
 newstory,
 responses,
 routing
});
