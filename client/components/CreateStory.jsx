import React from 'react'
import ImageUploader from './ImageUploader'
import CustomEditor from './Editor'
import { guid } from '../util'

export default class CreateStory extends React.Component {

  componentWillUnmount() {
    // this.props.resetImage()
  }

  render() {
    console.log('Create Story', this.props)
    return (
      <div className='page editor'>
        <ImageUploader {...this.props}/>
        <div className='content' style={{backgroundImage: `url(${this.props.bgimg})`}}>
          <CustomEditor {...this.props}/>
        </div>
      </div>
    )
  }
}

CreateStory.defaultProps = {
  content: [""],
  author: "anonymous",
  title: "No title",
  img: "/res/placeholder.png",
  bgimg: "/img/adventure.jpeg",
  id: guid()
}