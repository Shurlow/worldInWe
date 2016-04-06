import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from '../reducers'
import { browserHistory } from 'react-router'
import { routerMiddleware, push } from 'react-router-redux'

const middleware = routerMiddleware(browserHistory)

export default function configureStore(initialState) {
  const store = createStore(
    rootReducer,
    initialState,
    applyMiddleware(thunk, middleware)
  )
  return store
}