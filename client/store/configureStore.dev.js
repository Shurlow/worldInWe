import { createStore, applyMiddleware, compose } from 'redux'
// import api from '../middleware/api'
import { apiMiddleware } from 'redux-api-middleware'
import thunk from 'redux-thunk'
import createLogger from 'redux-logger'
import rootReducer from '../reducers'
import { browserHistory } from 'react-router'
import { routerMiddleware, push } from 'react-router-redux'

const middleware = [ routerMiddleware(browserHistory), thunk, apiMiddleware, createLogger() ]
// const createStoreWithMiddleware = applyMiddleware(apiMiddleware)(createStore);

export default function configureStore(initialState) {
  const store = createStore(
    rootReducer,
    initialState,
    applyMiddleware(...middleware)
  )
  return store
}