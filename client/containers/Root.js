import React from 'react';
import { Provider } from 'react-redux'
// import routes from '../routes'
import { Router, Route } from 'react-router'
import Home from '../views/Home'
import About from '../views/About'
import Login from '../views/Login'
import Story from '../views/Story'
import SignUp from '../views/SignUp'
import EditStory from '../views/EditStory'
import NewStory from '../views/NewStory'
import Logout from '../components/Logout'
import { wrapAuth } from './wrapAuth.js';
import { wrapUserAuth } from './wrapUserAuth.js';

export default class Root extends React.Component {

  render() {
    const { store, history } = this.props
    return (
      <Provider store={store}>
        <Router history={history}>
          <Route path="/" component={Home}>
            <Route path="login" component={Login}/>
            <Route path="logout" component={Logout}/>
            <Route path="signup" component={SignUp}/>
            <Route path="about" component={About}/>
            <Route path="stories/:id" component={Story}/>
            <Route path="new" component={wrapAuth(NewStory)}/>
            <Route path="edit/:id" component={wrapUserAuth(EditStory)}/>
            <Route path="topics/housing" component={About}/>
          </Route>
        </Router>
      </Provider>
    )
  }
}

Root.propTypes = {
  store: React.PropTypes.object.isRequired
}