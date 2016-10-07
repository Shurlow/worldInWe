// import 'babel-polyfill'
import React from 'react'
import ReactDOM from 'react-dom'
import { syncHistoryWithStore } from 'react-router-redux'
import { browserHistory } from 'react-router'
import Root from './containers/Root'
import configureStore from './store/configureStore'
import { loginUser } from './actions/auth'
import { loadStories } from './actions/stories'
// import { persistStore } from 'redux-persist'

const store = configureStore()
const history = syncHistoryWithStore(browserHistory, store)

let token = localStorage.getItem('id_token');
if (token !== null) {
  console.log('token?', token)
  store.dispatch(loginUser(token));
}
store.dispatch(loadStories())

ReactDOM.render(
  <Root store={store} history={history}/>,
  document.getElementById('mount')
)