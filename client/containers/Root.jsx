import React from 'react';
import { Provider } from 'react-redux'
import { Router, Route } from 'react-router'
import Home from '../components/Home'
import About from '../components/About'
import Topic from '../components/Topic'
import Story from '../components/Story'
import Explore from '../components/Explore'
import Stories from '../components/Stories'
import StoriesList from '../components/StoriesList'
import Login from '../components/Login'
import Logout from '../components/Logout'
import SignUp from '../components/SignUp'
import Create from '../components/Create'
import CreateTopic from '../components/CreateTopic'
import CreateStory from '../components/CreateStory'
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
            <Route path="rumee" component={Topic}/>
            <Route path="about" component={About}/>
            <Route path="story/:id" component={wrapStory(Story)}/>
            <Route path="explore" component={Explore}/>
            <Route path="stories" component={Stories}>
              <Route path="theme/:tag" component={StoriesList}/>
              <Route path="form/:tag" component={StoriesList}/>
              <Route path="location/:tag" component={StoriesList}/>
            </Route>
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

Root.propTypes = {
  store: React.PropTypes.object.isRequired
}
