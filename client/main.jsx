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

const store = configureStore()
const history = syncHistoryWithStore(browserHistory, store)

let token = localStorage.getItem('id_token');
if (token !== null) {
  store.dispatch(loginUser(token));
}
store.dispatch(loadStories())

require('./style/main.scss'); // tell webpack to lead css in development

ReactDOM.render(
  <Root store={store} history={history}/>,
  document.getElementById('mount')
)
