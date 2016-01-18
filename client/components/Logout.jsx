var React = require('react')
var request = require('superagent')
var auth = require('../auth')

var Logout = React.createClass({

  componentDidMount: function() {
    auth.logout()
  },

  render: function() {
    return (
      <div className="login content">
        <h2>Logged out</h2>
      </div>
    )
  }

})

module.exports = Logout
