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
      <div>
        <Nav/>
        {this.props.children || <StoryBoard/>}
        <div className="footer">
          <a href="mailto:worldinmemn@gmail.com">
            <h4 href>contact</h4>
          </a>
        </div>
      </div>
    )
  }
}