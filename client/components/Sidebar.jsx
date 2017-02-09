import React from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import classnames from 'classnames'

export default class CustomSidebar extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isOpen: false
    }

    this.toggleSidebar = this.toggleSidebar.bind(this)
  }

  toggleSidebar() {
    this.setState({ isOpen: !this.state.isOpen })
  }

  renderSidebar() {
    // console.log(this.props);
    return (
      <div key='sidebar' className='sidebar'>
        <div
          className='sidebar-overlay'
          onClick={this.toggleSidebar}>
        </div>
        <div className='sidebar-content'>
          {this.props.children}
        </div>
      </div>
    )
  }

  render() {

    return (
      <div className='sidebar-wrap'>
        <ReactCSSTransitionGroup
          transitionName="sidebar"
          transitionEnterTimeout={200}
          transitionLeaveTimeout={200}
        >
          { this.state.isOpen
            ? this.renderSidebar()
            : <button onClick={this.toggleSidebar}>&#9776;</button>
          }

        </ReactCSSTransitionGroup>
      </div>
    )
  }
}

module.exports = CustomSidebar;
