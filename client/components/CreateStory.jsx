import React from 'react'
import ImageUploader from './ImageUploader'
import CustomEditor from './Editor'
import CtrlBar from './CtrlBar'
import { guid } from '../util'

export default class CreateStory extends React.Component {

  componentWillMount() {
    console.log(this.props)
    const { id, user_id } = this.props
    this.props.updateNewStory({id: id, author_id: user_id })
  }

  componentWillUnmount() {
    this.props.resetNewStory()
  }

  render() {
    return (
      <div className='page'>
        <ImageUploader {...this.props}/>
        <div className='content' style={{backgroundImage: `url(${this.props.bgimg})`}}>
          <CustomEditor {...this.props}/>
        </div>
        <CtrlBar {...this.props}/>
      </div>
    )
  }
}

CreateStory.defaultProps = {
  id: guid()
}