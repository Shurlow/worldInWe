import React from 'react'
import ImageLoader from 'react-imageloader'
// import ReactDom from 'react-dom'
import classnames from 'classnames'
// import LeadImage from './LeadImage'

export default class ImageUploader extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      showVidInput: false,
      vidurl: null
    }
    this.renderUploadButtons = this.renderUploadButtons.bind(this)
    this.renderVideoInput = this.renderVideoInput.bind(this)
    this.triggerImg = this.triggerImg.bind(this)
    this.triggerVid = this.triggerVid.bind(this)
    this.changeVidUrl = this.changeVidUrl.bind(this)
    this.toggleVidInput = this.toggleVidInput.bind(this)
  }

  triggerImg() {
    if (this.props.disabled === true) {
      return
    } else {
      this.inputref.click()
    }
  }

  triggerVid() {
    const url = this.state.vidurl
    if (url != null) {
      this.props.saveVidUrl(url)
    }
  }

  changeVidUrl(e) {
    this.setState({
      vidurl: e.target.value
    })
  }

  toggleVidInput(e) {
    this.setState({
      showVidInput: !this.state.showVidInput
    })
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
    // this.imgref.src = "res/uploadimg.png"
  }

  renderVideoPreview(url) {
    return (
      <iframe
        type="text/html"
        width="100%"
        height="100%"
        src={url}
        frameBorder="0"
        allowFullScreen="allowfullscreen"
      >
      </iframe>
    )
  }

  renderVideoInput() {
    const { vidurl, showVidInput } = this.state
    return (
      <div className='video-input'>
        <input
          placeholder='youtube url'
          type='text'
          value={this.state.vidurl}
          onChange={this.changeVidUrl}
          onClick={(e) => e.stopPropagation()}
        />
        <button className='primary small' onClick={this.triggerVid}>&#x2713;</button>
      </div>
    )
  }

  renderUploadButtons() {
    const { vidurl, showVidInput } = this.state    
    return (
      <div>
        <div onClick={() => this.triggerImg()}>
          <figure>
            <img src={'/res/upimg.svg'}/>
            <figcaption>upload image</figcaption>
          </figure>
        </div>
        <div onClick={this.toggleVidInput}>
          <figure>
            <img src={'/res/upvid.svg'}/>
            {showVidInput ? this.renderVideoInput() : null}
            <figcaption>upload video</figcaption>
          </figure>
        </div>
      </div>
    )
  }

  renderView(isFetching, imgurl, vidurl) {
    if (isFetching) {
      return <img className='loader' src='/res/loader.gif'/>
    } else if (imgurl != null) {
      return (
        <ImageLoader
          src={imgurl}
          preloader={()=> <img className='loader' src='/res/loader.gif'/>}
          imgProps={{onClick: () => this.triggerImg()}}
        />
      )
    } else if (vidurl != null) {
      return this.renderVideoPreview(vidurl)
    } else {
      return this.renderUploadButtons.bind(this).call()
    }
  }

  render() {
    const { src, imgurl, vidurl, imgError, isFetching, errorMessage } = this.props
    const bgstyle = classnames({
      dark: imgurl || vidurl || isFetching,
      'lead-image': true
    })
    return (
      <div className='image-upload'>
        <div className={bgstyle}>
          {this.renderView(isFetching, imgurl, vidurl)}
        </div>
        <input
          type="file"
          className='hide-input'
          accept="image/*"
          onChange={this.handleImg.bind(this)}
          ref={(c) => this.inputref = c}
          disabled={isFetching}
        />
      </div>
    )
  }
}

// ImageUploader.defaultProps = {
//   src: '/res/uploadimg.png'
// }

// ImageUploader.propTypes = {
//   uploadImage: React.PropTypes.func.isRequired,
//   src: React.PropTypes.string.isRequired
// }