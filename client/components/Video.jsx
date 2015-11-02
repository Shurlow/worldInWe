var React = require('react')
var request = require('superagent')

var Post = React.createClass({

  loadVideo: function() {
    
    function onPlayerReady(event) {
      console.log('rdy')
      event.target.playVideo();
    }

    var done = false;
    function onPlayerStateChange(event) {
      if (event.data == YT.PlayerState.PLAYING && !done) {
        setTimeout(stopVideo, 6000);
        done = true;
      }
    }
    function stopVideo() {
      player.stopVideo();
    }

    var player = new YT.Player('player', {
      height: '390',
      width: '640',
      videoId: 'M7lc1UVf-VE',
      events: {
        'onReady': onPlayerReady,
        'onStateChange': onPlayerStateChange
      }
    })
  },

  componentDidMount: function() {
    this.loadVideo()
  },

  render: function() {
    console.log(this.state)
    return (
    	<div className="content flex-center">
    		<h1>Here, a video for you</h1>
          <div id="player"></div>
      </div>
    )
  }

})

module.exports = Post
