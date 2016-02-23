import React, {PropTypes} from 'react'
import Nav from '../components/Nav.jsx'
import StoryBoard from '../components/Storyboard.jsx'
import { fetchStories } from "../actions"
import { connect } from 'react-redux'

export default class Home extends React.Component {

 componentWillMount() {
    console.log('App Will Mount')
    const dispatch = this.props.dispatch
    console.log(this.props.fetchStories)
    this.props.fetchStories()
 }

  render() {
    return (
      <div>
       <Nav/>
        {this.props.children || <StoryBoard stories={this.props.stories}/>}
        <div className="footer"><hr/><h4>contact</h4></div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
    stories: state.stories,
});

export default connect(mapStateToProps, {
  fetchStories
})(Home)