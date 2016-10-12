import React from 'react'
import ImageUploader from './ImageUploader'
import CustomEditor from './Editor'
import { guid } from '../util'

export default class Create extends React.Component {

  // pushImageUpload(imgData) {
  //   this.props.uploadImage(this.props.id, imgData)
  // }

  // saveStory(storyObj) {
  //   this.props.uploadStory(storyObj)
  // }

  // addImage() {
  //   if (this.props.imageSuccess) {
  //     return "https://s3-us-west-2.amazonaws.com/worldinme-full/" + this.props.id + ".jpg?t=" + new Date().getTime()
  //   } else {
  //     return 'res/uploadimg.png'
  //   }
  // }

  // addVideo() {
    
  // }

  componentWillUnmount() {
    this.props.resetImage()
  }

  render() {
    // const { id, user_id, uploadStory, bgimg } = this.props
    // console.log(this.props)
    return (
      <div className='story editor'>
        <ImageUploader {...this.props}/>
        <div className='story-content' style={{backgroundImage: `url(${this.props.bgimg})`}}>
          <CustomEditor {...this.props}/>
        </div>
      </div>
    )
  }
}

Create.defaultProps = {
  content: [""],
  author: "anonymous",
  title: "No title",
  img: "/res/placeholder.png",
  bgimg: "img/adventure.jpeg",
  id: guid()
}