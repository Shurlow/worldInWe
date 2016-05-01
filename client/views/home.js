import React, {PropTypes} from 'react'
import Nav from '../components/Nav.jsx'
import StoryBoard from '../components/StoryBoard.js'
import { fetchStories } from "../actions"
import { Link } from 'react-router'
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin()

export default class Home extends React.Component {

  render() {
    return (
      <div className="app">
        <Nav/>
        {this.props.children || <StoryBoard/>}
        <footer className="pv4 pv6-l ph3 ph5-m ph6-l mid-gray">
          <small className="f6 db tc">© 2016 <b className="ttu">World In Me</b>., All Rights Reserved</small>
          <a href="http://scotthurlow.com/" target="_blank" title="Who" className="f6 tc mt2 db ph2 link mid-gray dim">site designed by Scott Hurlow</a>
          <div className="tc mt2">
            <a href="#" title="About" className="f6 dib ph2 link mid-gray dim">About Us</a>
            <a href="mailto:worldinmemn@gmail.com" title="Contact" className="f6 dib ph2 link mid-gray dim">Contact</a>
          </div>
        </footer>
      </div>
    )
  }
}