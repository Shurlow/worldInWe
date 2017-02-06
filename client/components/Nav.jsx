import React from 'react'
import classnames from 'classnames'
import { browserHistory } from 'react-router'
import { Link } from 'react-router'
import Sidebar from './Sidebar'

export default class Nav extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      showStickyNav: false,
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
        showStickyNav: true,
        scroll: newScroll
      })
    } else {
      this.setState({
        showStickyNav: false,
        scroll: newScroll
      })
    }
  }

  makeNav(style) {
    const navContent = (
      <div>
        <Link className='nav-link' to='/rumee' activeClassName='active'>rumee</Link>
        <Link className='nav-link' to='/explore' activeClassName='active'>explore</Link>
        <Link className='nav-link' to='/about' activeClassName='active'>about</Link>
        {this.makeCreateButton()}
        {this.makeLoginButton()}
      </div>
    )

    return (
      <nav className={style}>
        <div className="nav-left">
          <img
            src="/res/logo-dark.svg"
            onClick={() => {browserHistory.push('/')}}>
          </img>
        </div>
        <div className='nav-right'>
          <div className='h-nav'>
            {navContent}
          </div>
          <Sidebar>
            {navContent}
          </Sidebar>
        </div>
      </nav>
    )
  }

  makeCreateButton() {
    if (this.props.privileges === 'admin') {
      return <Link className='nav-link' to='/create' activeClassName='active'>create</Link>
    }
  }

  makeLoginButton() {
    if (this.props.isAuthenticated) {
      return (
        <Link className='name nav-link' to='/logout' activeClassName='active'>
          {this.props.username}
        </Link>
      )
    } else {
      return <Link className='nav-link' to='/login' activeClassName='active'>login</Link>
    }
  }

  render() {
    const { showStickyNav } = this.state
    const stickyStyle = classnames({
      'nav-sticky': true,
      'hide': !showStickyNav
    })

    return (
      <div>
        {this.makeNav('')}
        {this.makeNav(stickyStyle)}
      </div>
    )
  }
}
