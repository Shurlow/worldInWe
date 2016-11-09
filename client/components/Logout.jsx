import React from 'react'
import { browserHistory } from 'react-router'
import ArticleWithBg from './ArticleWithBg'

export default class Logout extends React.Component {

  componentWillMount() {
    const redirectRoute = this.props.location.query.next || '/';
    if(!this.props.isAuthenticated) {
      browserHistory.push(redirectRoute)
    }
  }

  logout() {
    this.props.logoutUser()
  }

  render() {
    return (
      <div className='page login'>
        <ArticleWithBg>
          <div className='small-card center'>
            <h2>Logout</h2>
            <p>Are you sure you want to logout?</p>
            <div className='button-group'>
              <button className='primary' onClick={this.logout.bind(this)}>Logout</button>
            </div>
          </div>
        </ArticleWithBg>
      </div>
    )
  }
}