var React = require('react')

var Video = React.createClass({
  
  loadVideo: function() {
    
    function onPlayerReady(event) {
      console.log('rdy')
      // event.target.playVideo();
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
      videoId: 'bkhLzHuUYmo',
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
    return (
      <li>
        <h2>{this.props.title}</h2>
        <div id="player"></div>
      </li>
    )
  }

})

module.exports = Video