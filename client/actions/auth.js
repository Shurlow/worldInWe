import {LOGIN_USER} from '../constants.js';
import RouterContainer from '../RouterContainer.js'

export function loginUser() {    
  return {
    actionType: LOGIN_USER,
    jwt: jwt
  }
}