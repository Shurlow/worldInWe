import React, { Component, PropTypes } from 'react';
import { transition } from 'moveit';
import classnames from 'classnames'

export default class ImageBlurLoader extends Component {

  constructor(props) {
    super(props)
    this.handleLoad = this.handleLoad.bind(this)
    this.state = {
      loaded: false
    }
  }

  shouldComponentUpdate(nextProps) {
    return this.props.src !== nextProps.src ||
      this.props.preview !== nextProps.preview;
  }

  componentWillUpdate() {
    this.refs.preview.style.opacity = 1;
  }

  handleLoad() {
    // src loaded, transition the blur
    // transition(this.refs.preview, this.props.animation);
    this.setState({
      loaded: true
    })
    if (this.props.onLoad) {
      this.props.onLoad();
    }
  }

  render() {

    const imageStyle = {
      'hidden': !this.state.loaded,
      'image': true
    };

    return (
        <img  className={imageStyle} src={ this.props.src } onLoad={ this.handleLoad }/>
    );
  }

}



ImageBlurLoader.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  src: PropTypes.string.isRequired,
  preview: PropTypes.string.isRequired,
  blur: PropTypes.number,
  style: PropTypes.object,
  animation: PropTypes.object,
  onLoad: PropTypes.func
}
ImageBlurLoader.defaultProps = {
  blur: 30,
  animation: {
    keyframes: {
      from: {
        opacity: 1
      },
      to: {
        opacity: 0
      }
    },
    duration: '.5s'
  }
}
