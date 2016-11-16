import React from 'react'
import ImageLoader from 'react-imageloader'
import classnames from 'classnames'

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
    const embedUrl = url.replace('watch?v=', 'embed/')
    if (url != null) {
      this.props.updateNewStory({video: embedUrl})
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
          value={this.props.vidurl}
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

  renderView(isFetching, image, video) {
    if (isFetching) {
      return <img className='loader' src='/res/loader.gif'/>
    } else if (image != null && video != null) {
      return this.renderVideoPreview(video)
    } else if (image != null) {
      return (
        <ImageLoader
          src={image}
          preloader={()=> <img className='loader' src='/res/loader.gif'/>}
          imgProps={{onClick: () => this.triggerImg()}}
        />
      )
    } else if (video != null) {
      return this.renderVideoPreview(video)
    } else {
      return this.renderUploadButtons.bind(this).call()
    }
  }

  render() {
    const { image, video, isFetching, } = this.props
    const bgstyle = classnames({
      light: !image && !video && !isFetching,
      'center-content': image || isFetching,
      'lead-image': true
    })
    return (
      <div className='image-upload'>
        <div className={bgstyle}>
          {this.renderView(isFetching, image, video)}
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
          // { (vidurl && imgurl == null)
          //   ? <button
          //       className='corner-button secondary'
          //       onClick={this.triggerImg}
          //     >Upload Image
          //     </button>
          //   : null
          // }
// ImageUploader.defaultProps = {
//   src: '/res/uploadimg.png'
// }

// ImageUploader.propTypes = {
//   uploadImage: React.PropTypes.func.isRequired,
//   src: React.PropTypes.string.isRequired
// }