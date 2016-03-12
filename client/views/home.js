import React, {PropTypes} from 'react'
import Nav from '../components/Nav.jsx'
import StoryBoard from '../components/StoryBoard.js'
import { fetchStories } from "../actions"
import { Link } from 'react-router'
import { connect } from 'react-redux'
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin()

export default class Home extends React.Component {

  componentWillMount() {
    // console.log('App Will Mount')
    const dispatch = this.props.dispatch
    this.props.fetchStories()
  }

  render() {
    return (
      <div>
        <Nav/>
        {this.props.children || <StoryBoard stories={this.props.stories}/>}
        <div className="footer">
          <a href="mailto:worldinmemn@gmail.com">
            <h4 href>contact</h4>
          </a>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  stories: state.data.stories,
});

export default connect(mapStateToProps, {
  fetchStories
})(Home)