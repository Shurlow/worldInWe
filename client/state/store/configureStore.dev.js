import { createStore, applyMiddleware, compose } from 'redux'
import { apiMiddleware } from 'redux-api-middleware'
import thunk from 'redux-thunk'
import createLogger from 'redux-logger'
import rootReducer from '../reducers'
import { browserHistory } from 'react-router'
import { routerMiddleware, push } from 'react-router-redux'
// import { autoRehydrate } from 'redux-persist'

const middleware = [
  routerMiddleware(browserHistory),
  thunk,
  apiMiddleware,
  // createLogger()
]

export default function configureStore(initialState) {
  const store = createStore(
    rootReducer,
    initialState,
    applyMiddleware(...middleware)
  )
  return store
}
