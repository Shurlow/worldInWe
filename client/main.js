// import 'babel-polyfill'
import React from 'react'
import ReactDOM from 'react-dom'
import { syncHistoryWithStore } from 'react-router-redux'
import { browserHistory } from 'react-router'
import Root from './containers/Root'
import configureStore from './state/store/configureStore'
import { loginUser } from './state/actions/auth'
import { loadStories } from './state/actions/stories'
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin()
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