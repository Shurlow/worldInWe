import React from 'react'
// import ReactDom from 'react-dom'
// import classnames from 'classnames'
// import LeadImage from './LeadImage'

export default class ImageUploader extends React.Component {

  triggerUpload() {
    if (this.props.disabled === true) {
      return
    } else {
      this.inputref.click()
    }
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
      self.props.uploadImage(self.props.id, image)
    }
    reader.readAsDataURL(file);
  }

  handleImageError() {
    console.log('img error')
    this.imgref.src = "res/uploadimg.png"
  }

  render() {
    const { src, url, imgError, isFetching, errorMessage } = this.props
    const imagesrc = isFetching ? 'img/loader.gif' : ( src || 'res/uploadimg.png')
    return (
      <div className='story-image image-upload'>
        <div onClick={this.triggerUpload.bind(this)}>
          <img
            src={imagesrc}
            alt=''
            onError={this.handleImageError.bind(this)}
            ref={(c) => this.imgref = c}
          ></img>
        </div>
        <input
          type="file"
          accept="image/*"
          onChange={this.handleImg.bind(this)}
          ref={(c) => this.inputref = c}
          disabled={isFetching}
        />
        <h3>{errorMessage}</h3>
      </div>
    )
  }
}

ImageUploader.defaultProps = {
  src: 'res/uploadimg.png'
}

ImageUploader.propTypes = {
  uploadImage: React.PropTypes.func.isRequired,
  src: React.PropTypes.string.isRequired
}