import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import createLogger from 'redux-logger'
import rootReducer from '../reducers'
import { browserHistory } from 'react-router'
import { routerMiddleware, push } from 'react-router-redux'

const middleware = routerMiddleware(browserHistory)

export default function configureStore(initialState) {
  const store = createStore(
    rootReducer,
    initialState,
    applyMiddleware(thunk, createLogger(), middleware),
  )

  // if (module.hot) {
  //   // Enable Webpack hot module replacement for reducers
  //   module.hot.accept('../reducers', () => {
  //     const nextRootReducer = require('../reducers').default
  //     store.replaceReducer(nextRootReducer)
  //   })
  // }

  return store
}