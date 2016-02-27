// import 'babel-polyfill'
import React from 'react'
import ReactDOM from 'react-dom'
import { syncHistoryWithStore } from 'react-router-redux'
import { browserHistory } from 'react-router'
import Root from './containers/Root'
import configureStore from './store/configureStore'
import {loginUserSuccess} from './actions';

// console.log('browhist:', browserHistory)
const store = configureStore()
const history = syncHistoryWithStore(browserHistory, store)

let token = localStorage.getItem('token');
if (token !== null) {
  store.dispatch(loginUserSuccess(token));
}

ReactDOM.render(
  <Root store={store} history={history}/>,
  document.getElementById('mount')
)