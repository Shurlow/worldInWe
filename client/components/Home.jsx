var React = require('react')
var request = require('superagent')
var Video = React.createFactory(require('./Video.jsx'))

var Home = React.createClass({

  getInitialState: function() {
    return { featured: [] }
  },

  componentDidMount: function() {
    var self = this
    request
      .get('http://localhost:3000/api/featured')
      .set('Content-Type', 'application/json')
      .end(function(err, res) {
        self.setState({
          stories: res.body
        })
      })
  },

  makeFeaturedStory: function(item) {
    return Video({
      title: item.title,
      video: item.video,
    })
  },

  render: function() {
    console.log(this.state)
    return (
    	<div>
        <div className="biglead red">
          <h2>Featured Stories</h2>
        </div>
        <ul>
          {this.state.featured.map(this.makeFeaturedStory)}
        </ul>

      </div>
    )
  }

})

module.exports = Home
