var React = require('react')
var request = require('superagent')
import { connect } from 'react-redux'
import {logoutUser} from '../actions'

class Logout extends React.Component {

  componentDidMount() {
    this.props.logoutUser()
  }

  render() {
    return (
      <div className="login content">
        <h2>Logged out</h2>
      </div>
    )
  }

}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, {
  logoutUser
})(Logout)
