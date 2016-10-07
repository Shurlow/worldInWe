import React from 'react';
import { Provider } from 'react-redux'
// import routes from '../routes'
import { Router, Route } from 'react-router'
import Home from '../views/Home'
import About from '../views/About'
// import Story from '../views/Story'
import Login from '../views/Login'
import SignUp from '../views/SignUp'
// import EditStory from '../views/EditStory'
import LoadStory from './LoadStory'
import Story from '../components/Story'
import Create from '../views/Create'
import Explore from '../views/Explore'
import Logout from '../views/Logout'
import { wrapAuth } from './wrapAuth.js';
import { wrapUserAuth } from './wrapUserAuth.js';

export default class Root extends React.Component {

  render() {
    const { store, history } = this.props
    return (
      <Provider store={store}>
        <Router history={history}>
          <Route path="/" component={Home}>
            <Route path="about" component={About}/>
            <Route path="story/:id" component={LoadStory(Story)}/>
            <Route path="explore" component={Explore}/>
            <Route path="login" component={Login}/>
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