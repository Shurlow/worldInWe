import React from 'react';
import { Provider } from 'react-redux'
// import routes from '../routes'
import { Router, Route } from 'react-router'
import Home from '../components/Home'
import About from '../components/About'
import Story from '../components/Story'
import Explore from '../components/Explore'
import Login from '../components/Login'
import SignUp from '../components/SignUp'
import Create from '../components/Create'
import Logout from '../components/Logout'
//

// import authContainer from './authContainer'
import wrapAuth from './wrapAuth'
import wrapStory from './wrapStory'
import { wrapUserAuth } from './wrapUserAuth.js'

export default class Root extends React.Component {

  render() {
    const { store, history } = this.props
    return (
      <Provider store={store}>
        <Router history={history}>
          <Route path="/" component={Home}>
            <Route path="about" component={About}/>
            <Route path="story/:id" component={wrapStory(Story)}/>
            <Route path="explore" component={Explore}/>
            <Route path="login" component={wrapAuth(Login)}/>
            <Route path="logout" component={Logout}/>
            <Route path="signup" component={SignUp}/>
            <Route path="create" component={wrapAuth(Create)}/>
          </Route>
        </Router>
      </Provider>
    )
  }
}

// <Route path="logout" component={Logout}/>
// <Route path="signup" component={SignUp}/>
// <Route path="new" component={wrapAuth(NewStory)}/>
// <Route path="edit/:id" component={wrapUserAuth(EditStory)}/>

Root.propTypes = {
  store: React.PropTypes.object.isRequired
}