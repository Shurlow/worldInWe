import React from 'react';
import { Provider } from 'react-redux'
import routes from '../routes'
import { Router, Route } from 'react-router'
import Home from '../views/Home'
import About from '../views/About'
import Login from '../views/Login'

export default class Root extends React.Component {

  render() {
    const { store, history } = this.props
    console.log('Yoo', store, history)
    return (
      <Provider store={store}>
        <Router>
          <Route path="/" component={Home}/>
            <Route path="login" component={Login}/>
            <Route path="about" component={About}/>
        </Router>
      </Provider>
    )
  }
}

Root.propTypes = {
  store: React.PropTypes.object.isRequired
}