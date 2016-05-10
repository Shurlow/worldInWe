import React from 'react'
import ReactDom from 'react-dom'
import classnames from 'classnames'
// import LeadImage from './LeadImage'

class ImageUploader extends React.Component {

  constructor(props) {
    super(props)
  }

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
      self.props.pushImageUpload(image)
    }
    reader.readAsDataURL(file);
  }

  imgError() {
    console.log('img error')
    this.imgref.src = "res/uploadimg.png"
  }
// <object className="img-object" data={this.props.src} type="image/jpg"></object>
  render() {
    return (
      <div className='image-uploader'>
        <div className='image mw6 center mb3 bg-gray' onClick={this.triggerUpload.bind(this)}>
          <img
            className='w-100'
            src={this.props.src}
            alt=''
            onError={this.imgError.bind(this)}
            ref={(c) => this.imgref = c}
          >
          </img>
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
  src: React.PropTypes.string.isRequired
}

export default ImageUploader