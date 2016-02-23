// import 'babel-polyfill'
import React from 'react'
import ReactDOM from 'react-dom'
// import { browserHistory } from 'react-router'
import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
// import { syncHistory, routeReducer } from 'react-router-redux'
import rootReducer from './reducers'
import Root from './containers/Root'
import configureStore from './store/configureStore'

console.log('Main')
// 
// const historyMiddleware = syncHistory(browserHistory)

console.log('Make dat store')
// const finalCreateStore = compose(
//   applyMiddleware(historyMiddleware)
// )(createStore)
// const store = createStore(rootReducer)
const store = configureStore()
// historyMiddleware.listenForReplays(store)
// console.log('made it')

// ReactDOM.render(
//   <h1>FUCKKKK</h1>,
//   document.getElementById('mount')
// )

ReactDOM.render(
  <Root store={store} />,
  document.getElementById('mount')
)