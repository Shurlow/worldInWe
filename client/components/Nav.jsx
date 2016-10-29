import React from 'react'
import classnames from 'classnames'
import { browserHistory } from 'react-router'

export default class Nav extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      showNav: true,
      scroll: 0
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
    var newScroll = window.pageYOffset
    if (newScroll > 200 && newScroll < this.state.scroll) {
      this.setState({
        showNav: false,
        scroll: newScroll
      })
    } else {
      this.setState({
        showNav: true,
        scroll: newScroll
      })
    }
  }

  makeNav(style) {
    return (
      <nav className={style}>
         <div className="nav-left">
            <img src="/res/logo-white.svg" onClick={() => {browserHistory.push('/')}}></img>
          </div>
          <div className='nav-right'>
            <a className='nav-link' href="#" title="Topic" onClick={() => {browserHistory.push('/')}}>rumee</a>
            <a className='nav-link' href="#" title="Explore" onClick={() => {browserHistory.push('/explore')}}>explore</a>
            <a className='nav-link' href="#" title="About" onClick={() => {browserHistory.push('/about')}}>about</a>
            <a className='nav-link' href="#" title="Create" onClick={() => {browserHistory.push('/create')}}>create</a>
            {this.makeLoginButton()}
          </div> 
      </nav>
    )
 }

  makeLoginButton() {
    if (this.props.isAuthenticated) {
      return (
        <a className='nav-link' href="#" title="Login"
          onClick={() => {browserHistory.push('/logout')}}>
          {this.props.username}
        </a>
      )
    } else {
      return (
        <a className='nav-link' href="#" title="Login"
          onClick={() => {browserHistory.push('/login')}}>
          login
        </a>
      )
    }
  }

  render() {
    const { showNav } = this.state
    const stickyStyle = classnames({
      'dn fixed': showNav
    })
    
    return (
      <div>
        {this.makeNav('')}
        {this.makeNav(stickyStyle)}
      </div>
    )
  }
}