// import 'babel-polyfill'
import React from 'react'
import ReactDOM from 'react-dom'
import { syncHistoryWithStore } from 'react-router-redux'
import { browserHistory } from 'react-router'
import Root from './containers/Root'
import configureStore from './store/configureStore'
import {loginUserSuccess} from './actions'
// import { persistStore } from 'redux-persist'

const store = configureStore()
// persistStore(store)
const history = syncHistoryWithStore(browserHistory, store)

let token = localStorage.getItem('token');
if (token !== null) {
  store.dispatch(loginUserSuccess(token));
}

ReactDOM.render(
  <Root store={store} history={history}/>,
  document.getElementById('mount')
)