import 'babel-polyfill'
import React from 'react'
import ReactDOM from 'react-dom'
import { syncHistoryWithStore } from 'react-router-redux'
import rr from 'react-router'
import Root from './containers/Root'
import configureStore from './store/configureStore'

console.log('browhist:', rr)
const store = configureStore()
// const history = syncHistoryWithStore(History, store)

ReactDOM.render(
  <Root store={store} history={history}/>,
  document.getElementById('mount')
)