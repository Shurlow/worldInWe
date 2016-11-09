import React from 'react'
import Nav from './Nav'
import StoryBoard from './StoryBoard'
import wrapAuth from '../containers/wrapAuth'
import wrapStories from '../containers/wrapStories'

export default class Home extends React.Component {
  render() {
    let NavWrap = wrapAuth(Nav)
    let StoryBoardWrap = wrapStories(StoryBoard)
    return (
      <div className='stretch'>
        <NavWrap/>
        {this.props.children || <StoryBoardWrap/>}
        <footer className='footer'>
          <h4>© 2016 tayo consulting group, llc. all rights reserved </h4>
        </footer>
      </div>
    )
  }
}