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
    // this.renderUploadButtons = this.renderUploadButtons.bind(this)
    this.renderVideoInput = this.renderVideoInput.bind(this)
    this.renderVideoButton = this.renderVideoButton.bind(this)
    // this.renderImageButton = this.renderImageButton.bind(this)
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
      this.setState({
        showVidInput: false
      })
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
    const { video, isFetching } = this.props
    const completed = classnames({
      completed: video || !isFetching
    })
    let buttonState = null

    if (video) {
      buttonState = <h1>&#x2713;</h1>
    }
    if (isFetching) {
      buttonState = <img className='loader' src='/res/loader.gif'/>
    }

    const { vidurl } = this.state
    return (
      <div className='side-buttons'>
          {this.renderImageButton()}
        {
          <div className='left' className={completed}>
            {buttonState}
            <figure onClick={this.toggleVidInput}>
              <img src={'/res/upvid.svg'}/>
              <figcaption>upload video</figcaption>
            </figure>
          </div>
        }
      </div>
    )
  }

  renderImageButton() {
    const { isFetching } = this.props

    return (
      <div onClick={this.triggerImg}>
        { isFetching
          ? <img className='loader' src='/res/loader.gif'/>
          : <figure>
              <img src={'/res/upimg.svg'}/>
              <figcaption>upload image</figcaption>
            </figure>
        }
      </div>
    )
  }

  renderVideoButton() {
    const { image, isFetching } = this.props
    const completed = classnames({
      completed: this.props.video || isFetching
    })

    return (
      <div className='video-button' onClick={this.toggleVidInput}>
        <div className={completed}>
          <figure>
            <img src={'/res/upvid.svg'}/>
            <figcaption>upload video</figcaption>
          </figure>
        </div>
      </div>
    )
  }

  render() {
    const { image, video, isFetching } = this.props
    const { showVidInput } = this.state
    const bgstyle = classnames({
      light: !image && !video && !isFetching,
      'center-content': image || isFetching,
      'lead-image': true
    })

    let imageComponent;
    let videoComponent;
    const imgOnClick = showVidInput ? this.toggleVidInput : null
    // User inputs image first, then video url
    if (image) {
      imageComponent = <img src={image} onClick={imgOnClick}></img>
      if (video) {
        videoComponent = this.renderVideoPreview()
      } else if (!isFetching) {
        videoComponent = showVidInput ? this.renderVideoInput() : this.renderVideoButton()
      }
    } else {
      imageComponent = this.renderImageButton()
    }

    return (
      <div className='image-upload'>
        <div className={bgstyle}>
          {imageComponent}
          {videoComponent}
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
