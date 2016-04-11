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
    console.log('scrollin...')
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
        <nav className={navStyle}>
          <div className="image-container">
            <img src="/res/logo.svg" onClick={() => {browserHistory.push('/')}}></img>
          </div>
          <ul>
            <FlatButton label="NEW" onClick={() => {browserHistory.push('/new')}}/>
            <FlatButton label="ABOUT" onClick={() => {browserHistory.push('/about')}}/>
            {this.makeLoginButton()}
          </ul>

          <IconButton
            className="menu"
            style={iconStyle}
            iconStyle={iconStyle}
            onTouchEnd={this.handleToggle.bind(this)}
          >
            <MoreIcon/>
          </IconButton>

          <LeftNav
            docked={false}
            width={200}
            open={this.state.open}
            onRequestChange={open => this.setState({open})}
            openRight={true}
          >
            <MenuItem onTouchTap={this.handleClose}>Menu Item</MenuItem>
            <MenuItem onTouchTap={this.handleClose}>Menu Item 2</MenuItem>
          </LeftNav>

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
  logoutUser,
  deselectStory
})(Nav)