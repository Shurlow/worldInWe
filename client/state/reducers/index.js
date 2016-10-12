import {combineReducers} from 'redux';
import {createReducer} from '../util';
import { routerReducer as routing } from 'react-router-redux'
import jwtDecode from 'jwt-decode';
import merge from 'lodash/merge'
import union from 'lodash/union'
import * as ActionTypes from '../actions'

import { default as auth } from './auth'
import { default as stories } from './stories'
import { default as story } from './story'
import { default as responses } from './responses'
import { default as image } from './image'

export default combineReducers({
 auth,
 stories,
 story,
 image,
 responses,
 routing
});