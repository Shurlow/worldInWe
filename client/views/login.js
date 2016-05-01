import React from 'react'
import { browserHistory } from 'react-router'
// import auth from '../auth.js'
// import FacebookButton from "./FacebookButton.jsx"
import TextField from 'material-ui/lib/text-field';
import RaisedButton from 'material-ui/lib/raised-button';
import FlatButton from 'material-ui/lib/flat-button';
import LeadImage from '../components/LeadImage.jsx'
import Paper from 'material-ui/lib/paper';
import ThemeManager from 'material-ui/lib/styles/theme-manager';
import colors from 'material-ui/lib/styles/colors';
import { loginUser, signUpUser } from '../actions'
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

class Login extends React.Component {

  constructor(props) {
    super(props);
    const redirectRoute = this.props.location.query.next || '/';
    this.state = {
      email: '',
      password: '',
      errorText: ''
    };
  }

  emailChange(e) {
    const input = e.target.value
    this.setState({
      email: input,
      errorText: ''
    })
  }

  passwordChange(e) {
    this.setState({
      password: e.target.value
    })
  }

  login() {
    // console.log('logging in:', this.state)
    if (this.validateEmail(this.state.email)) {
      this.props.loginUser(this.state.email, this.state.password, this.props.location.query.next);
    } else {
      this.setState({
        errorText: "Email input is invalid!"
      })
    }
  }

  navToSignUp() {
    browserHistory.push('signup')
  }

  validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  render() {
    return (
      <div className="content">
        <LeadImage img={'/res/greenkid.jpeg'}>
          <div className="login">
            <Paper zDepth={2} style={pstyle} className="card">
              <h2>Login</h2>
              <TextField 
                hintText="email"
                errorText={this.state.errorText}
                hintStyle={textstyle}
                style={textstyle}
                onChange={this.emailChange.bind(this)}
              />
              <TextField
                hintText="password"
                type="password"
                style={textstyle}
                onChange={this.passwordChange.bind(this)}
              />
              <RaisedButton label="Login" primary={true} style={bstyle} onMouseDown={this.login.bind(this)}/>
              <FlatButton label="Sign Up" style={bstyle} onMouseDown={this.navToSignUp.bind(this)}/>
            </Paper>
          </div>
        </LeadImage>
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


