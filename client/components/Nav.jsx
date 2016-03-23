import React from 'react'
import { Link, Redirect } from 'react-router'
import { connect } from 'react-redux'
import { logoutUser } from "../actions"
import classnames from 'classnames'
import { browserHistory } from 'react-router'
import FlatButton from 'material-ui/lib/flat-button';

class Nav extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      showStickyNav: false
    }
    this.handleScroll = this.handleScroll.bind(this)
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll(e) {
    var top = window.pageYOffset
    // var isSticky = this.state.showStickyNav

    if (top >= 160) {
      this.setState({
        showStickyNav: true
      })
    } else {
      this.setState({
        showStickyNav: false
      })
    }
  }

  navigateToNew() {
    
  }

  navigateToAbout() {
    browserHistory.push('/about')
  }
  navigateToNew() {
    browserHistory.push('/new')
  }

  makeNav(sticky) {
    console
    var navStyle;
    if (sticky) {
      navStyle = classnames({
        'hidden': !this.state.showStickyNav,
        'sticky-nav': true
      })
    } else {
      navStyle = "big-nav"
    }

    return (
        <nav className={navStyle}>
          <div className="image-container">
            <img src="/res/logo.png" onClick={() => {browserHistory.push('/')}}></img>
          </div>
          <ul>
            <FlatButton label="NEW" onClick={() => {browserHistory.push('/new')}}/>
            <FlatButton label="ABOUT" onClick={() => {browserHistory.push('/about')}}/>
            {this.makeLoginButton()}
          </ul>
        </nav>
      )
 }

  makeLoginButton() {
    if (this.props.isAuthenticated) {
      return (
        <FlatButton label={this.props.username} onClick={this.logout.bind(this)}/>
      )
    } else {
      return (
        <FlatButton label="LOGIN" onClick={() => {browserHistory.push('/login')}}/>
      )
    }
  }

  logout() {
    this.props.logoutUser()
  }

  render() {
    return (
      <div>
        {this.makeNav()}
        {this.makeNav(true)}
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  username: state.auth.name
});

export default connect(mapStateToProps, {
  logoutUser
})(Nav)