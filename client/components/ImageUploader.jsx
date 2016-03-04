import React from 'react'
import ReactDom from 'react-dom'
import classnames from 'classnames'
import LeadImage from './LeadImage'

class ImageUploader extends React.Component {

  constructor(props) {
    super(props)
  }

  triggerUpload() {
    this.inputref.click()
  }

  handleImg(e) {
    var self = this;
    var findImgType = new RegExp("\:(.*?)\;")
    var findImgExtension = new RegExp("\.([0-9a-z]+)(?:[\?#]|$)")
    var reader = new FileReader()
    var file = e.target.files[0]
    reader.onload = function(data) {
      let image = data.target.result
      let imgtype = findImgType.exec(image)[1]
      self.props.pushImageUpload(self.props.id, image)
    }
    reader.readAsDataURL(file);
  }

  render() {
    return (
      <div className={'image-uploader'}>
        <div className={'image'} onClick={this.triggerUpload.bind(this)}>
          <img src={this.props.src}></img>
        </div>
        <input
          type="file"
          accept="image/*"
          onChange={this.handleImg.bind(this)}
          ref={(c) => this.inputref = c}
          disabled={this.props.isFetching}
        />
      </div>
    )
  }
}

ImageUploader.propTypes = {
  pushImageUpload: React.PropTypes.func.isRequired,
}

export default ImageUploader