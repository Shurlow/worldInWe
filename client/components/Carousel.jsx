import React, { Component } from 'react';
import Slider from 'react-slick'
// var React = require('react');
// var Slider = require('react-slick');

export default class Carousel extends Component {
  
  render() {
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      className: 'myslide'
    }
    return (
      <Slider {...settings}>
        <img src={this.props.img}/>
        <div className='video'>
          <iframe
            type="text/html"
            width="100%"
            height="100%"
            src={"https://www.youtube.com/embed/JPUcy9L6zDA"}
            frameborder="0">
          </iframe>
        </div>
      </Slider>
    );
  }

}