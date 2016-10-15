import React from 'react';
import { Provider } from 'react-redux'
// import routes from '../routes'
import { Router, Route } from 'react-router'
import Home from '../components/Home'
import About from '../components/About'
import Story from '../components/Story'
import Explore from '../components/Explore'
import Login from '../components/Login'
import Logout from '../components/Logout'
import SignUp from '../components/SignUp'
import Create from '../components/Create'
import CreateTopic from '../components/CreateTopic'
import CreateStory from '../components/CreateStory'
//

// import authContainer from './authContainer'
import wrapAuth from './wrapAuth'
import wrapStory from './wrapStory'
import wrapCreate from './wrapCreate'
import requireUserAuth from './requireUserAuth'
import requireAdminAuth from './requireAdminAuth'

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
            <Route path="logout" component={wrapAuth(Logout)}/>
            <Route path="signup" component={wrapAuth(SignUp)}/>
            <Route path="create" component={requireAdminAuth(Create)}>
              <Route path="topic" component={CreateTopic}/>
              <Route path="story" component={wrapCreate(CreateStory)}/>
            </Route>
            <Route path="edit/:id" component={requireUserAuth(Story)}/>
          </Route>
        </Router>
      </Provider>
    )
  }
}

// <Route path="logout" component={Logout}/>
// <Route path="signup" component={SignUp}/>
// <Route path="new" component={wrapAuth(NewStory)}/>


Root.propTypes = {
  store: React.PropTypes.object.isRequired
}