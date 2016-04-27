import React from 'react'
import { Link, Redirect } from 'react-router'
import { connect } from 'react-redux'
import { logoutUser, deselectStory } from "../actions"
import classnames from 'classnames'
import { browserHistory } from 'react-router'
import FlatButton from 'material-ui/lib/flat-button';
import LeftNav from 'material-ui/lib/left-nav';
import AppBar from 'material-ui/lib/app-bar';
import MoreIcon from 'material-ui/lib/svg-icons/navigation/more-horiz';
import MenuItem from 'material-ui/lib/menus/menu-item';
import IconButton from 'material-ui/lib/icon-button';
// import RaisedButton from 'material-ui/lib/raised-button';

class Nav extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      showStickyNav: false,
      open: false
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

  navigateToAbout() {
    browserHistory.push('/about')
  }
  navigateToNew() {
    this.props.deselectStory()
    browserHistory.push('/new')
  }

  handleToggle() {
    this.setState({
      open: !this.state.open
    });
  }

  makeNav(sticky) {
    var navStyle;
    if (sticky) {
      navStyle = classnames({
        'hidden': !this.state.showStickyNav,
        'sticky-nav': true
      })
    } else {
      navStyle = "big-nav"
    }
    const iconStyle = {
      width: '100px',
      height: '100px',
      padding: '0px',
    };

    return (
        <nav className="pa4 pa6-l tc big-nav">
          <img className="mw5 mw6-l center" src="/res/logo.svg" onClick={() => {browserHistory.push('/')}}></img>
          <div className="tc pv3">
            <a className="link dim gray f6 f5-ns dib mr3" href="#" title="Home" onClick={this.navigateToAbout}>About</a>
            <a className="link dim gray f6 f5-ns dib mr3" href="#" title="Store">Store</a>
            <a className="link dim gray f6 f5-ns dib" href="#" title="Contact">Signup</a>
          </div>
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
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  username: state.auth.name
});

export default connect(mapStateToProps, {
  logoutUser,
  deselectStory
})(Nav)