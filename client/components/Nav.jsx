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

    if (top >= 280) {
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

    return null
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
    const {showStickyNav} = this.state
    const navStyle = classnames({
      'pa4': true,
      'pa6-l': !showStickyNav,
      'tc': !showStickyNav,
    })
    const stickyStyle = classnames({
      'w-100': true,
      'fixed': true,
      // 'bb': true,
      'dn-ns': !showStickyNav,
      'sticky': true
    })
    
    return (
      <div>
        <nav className={stickyStyle}>
          <div className="mw8 center">
           <div className="w-50 fl pa2 pl3">
              <img className="mw5 logo" src="/res/logo.svg" onClick={() => {browserHistory.push('/')}}></img>
            </div>
            <div className="w-50 h-100 fl pa3">
              <div className="h-100 pv3 fr">
                <a className="link tracked dim gray f6 f5-ns dib mr3" href="#" title="About" onClick={this.navigateToAbout}>ABOUT</a>
                <a className="link tracked gray f6 f5-ns dib mr3 disabled" href="#" title="WRITE">WRITE</a>
                <a className="link gray f6 f5-ns dib disabled" href="#" title="Login">LOGIN</a>
              </div>
            </div> 
          </div>
        </nav>
        <nav className="pa4 pa6-l tc center mw6">
          <img className="mw5 mw6-l center logo" src="/res/logo.svg" onClick={() => {browserHistory.push('/')}}></img>
          <div className="tc pv3">
            <a className="link tracked dim gray f6 f5-ns dib mr3" href="#" title="About" onClick={this.navigateToAbout}>ABOUT</a>
            <a className="link tracked gray f6 f5-ns dib mr3 disabled" href="#"title="WRITE">WRITE</a>
            <a className="link tracked gray f6 f5-ns dib disabled" href="#" title="Login">LOGIN</a>
          </div>
        </nav>
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