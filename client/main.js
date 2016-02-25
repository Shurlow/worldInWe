// import 'babel-polyfill'
import React from 'react'
import ReactDOM from 'react-dom'
import { syncHistoryWithStore } from 'react-router-redux'
import { browserHistory } from 'react-router'
import Root from './containers/Root'
import configureStore from './store/configureStore'

// console.log('browhist:', browserHistory)
const store = configureStore()
const history = syncHistoryWithStore(browserHistory, store)

ReactDOM.render(
  <Root store={store} history={history}/>,
  document.getElementById('mount')
)