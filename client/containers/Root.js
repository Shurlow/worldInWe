import React from 'react';
import { Provider } from 'react-redux'
import routes from '../routes'
import { Router, Route } from 'react-router'
import home from '../views/home'
import Home from '../components/Storyboard.jsx'
import login from '../views/login'

export default class Root extends React.Component {

  render() {
    const { store, history } = this.props
    console.log('Yoo', store, history)
    return (
      <Provider store={store}>
        <Router>
          <Route path='/' component={Home}>
            <Route path="login" component={login}/>
          </Route>
        </Router>
      </Provider>
    )
  }
  // render() {
  //   const { store, history } = this.props
  //   console.log('Yoo', store, history)
  //   return (
  //     <Provider store={store}>
  //       <h2>ROOT</h2>
  //     </Provider>
  //   )
  // }
}

Root.propTypes = {
  store: React.PropTypes.object.isRequired
}