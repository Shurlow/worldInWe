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
          featured: res.body
        })
      })
  },

  makeFeaturedStory: function(item) {
    return (
      <li>
        <h2>Video Title</h2>
        {Video({title: item.title, video: item.video})}
      </li>
      )
  },

  render: function() {
    return (
    	<div>
        <div className="biglead">
          
        </div>
        <ul>
          {this.state.featured.map(this.makeFeaturedStory)}
        </ul>
      </div>
    )
  }

})

module.exports = Home
