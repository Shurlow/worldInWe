import React from 'react'
// import { browserHistory } from 'react-router'
// import auth from '../auth.js'
// import FacebookButton from "./FacebookButton.jsx"
import TextField from 'material-ui/lib/text-field';
import RaisedButton from 'material-ui/lib/raised-button';
import FlatButton from 'material-ui/lib/flat-button';
import Paper from 'material-ui/lib/paper';
import ThemeManager from 'material-ui/lib/styles/theme-manager';
import colors from 'material-ui/lib/styles/colors';
import myTheme from '../uiStyle.js';
import { loginUser } from '../actions'
import { connect } from 'react-redux'



const pstyle = {
  backgroundColor: "rgba(255,255,255,0.8)"
}

const bstyle = {
  margin: '1em 0 0 0',
}

const textstyle = {
  // color: colors.grey400
}

// console.log(TextField.getStyle())
// @ThemeDecorator(ThemeManager.getMuiTheme(myTheme))
class Login extends React.Component {

  constructor(props) {
    super(props);
    const redirectRoute = this.props.location.query.next || '/login';
    this.state = {
      email: '',
      password: '',
      redirectTo: redirectRoute
    };
  }


  getChildContext() {
    return {
      muiTheme: ThemeManager.getMuiTheme(myTheme),
    };
  }

  emailChange(e) {
    this.setState({
      email: e.target.value
    })
  }

  passwordChange(e) {
    this.setState({
      password: e.target.value
    })
  }

  login() {
    // e.preventDefault();
    console.log('logging in:', this.state.email)
    loginUser(this.state.email, this.state.password, this.state.redirectTo);
  }

  render() {

    return (
      <div className="login">
        <Paper zDepth={2} style={pstyle} className="card">
          <h2>Login</h2>
          <TextField hintText="email" hintStyle={textstyle} style={textstyle} onChange={this.emailChange.bind(this)}/>
          <TextField hintText="password"  style={textstyle} onChange={this.passwordChange.bind(this)}/>
          <RaisedButton label="Login" primary={true} style={bstyle} onMouseDown={this.login.bind(this)}/>
          <FlatButton label="Sign Up" style={bstyle} />
        </Paper>
      </div>
    )
  }

}

Login.childContextTypes = {muiTheme: React.PropTypes.object};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, {
  loginUser
})(Login)
