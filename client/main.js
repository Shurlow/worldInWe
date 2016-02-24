// import 'babel-polyfill'
import React from 'react'
import ReactDOM from 'react-dom'
// import { browserHistory } from 'react-router'
import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
// import { syncHistory, routeReducer } from 'react-router-redux'
import rootReducer from './reducers'
import Root from './containers/Root'
import configureStore from './store/configureStore'

// const historyMiddleware = syncHistory(browserHistory)

// const finalCreateStore = compose(
//   applyMiddleware(historyMiddleware)
// )(createStore)
// const store = createStore(rootReducer)
const store = configureStore()
// historyMiddleware.listenForReplays(store)

ReactDOM.render(
  <Root store={store} />,
  document.getElementById('mount')
)