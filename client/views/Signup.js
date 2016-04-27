import React from 'react'
// import { browserHistory } from 'react-router'
// import auth from '../auth.js'
// import FacebookButton from "./FacebookButton.jsx"
import TextField from 'material-ui/lib/text-field';
import RaisedButton from 'material-ui/lib/raised-button';
// import FlatButton from 'material-ui/lib/flat-button';
import LeadImage from '../components/LeadImage.jsx'
import Paper from 'material-ui/lib/paper';
import ThemeManager from 'material-ui/lib/styles/theme-manager';
import colors from 'material-ui/lib/styles/colors';
import myTheme from '../uiStyle.js';
import { signUpUser } from '../actions'
import { connect } from 'react-redux'
import classnames from 'classnames'

const pstyle = {
  backgroundColor: "rgba(255,255,255,0.8)"
}

const textstyle = {
  // color: colors.grey400
}

    // const bstyle = {
    //   margin: '1em 0 0 0'
    // }

// console.log(TextField.getStyle())
// @ThemeDecorator(ThemeManager.getMuiTheme(myTheme))
class SignUp extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      password: '',
      redirectTo: '/',
      emailError: '',
    };
  }

  getChildContext() {
    return {
      muiTheme: ThemeManager.getMuiTheme(myTheme),
    };
  }

  emailChange(e) {
    const input = e.target.value
    this.setState({
      email: input,
      emailError: ''
    })
  }

  passwordChange(e) {
    this.setState({
      password: e.target.value
    })
  }

  nameChange(e) {
    this.setState({
      name: e.target.value
    })
  }

  signUp() {

    // console.log('Signing up:', this.state)
    if (this.validateEmail(this.state.email)) {
      this.props.signUpUser(this.state.name, this.state.email, this.state.password, this.state.redirectTo);      
    } else {
      this.setState({
        emailError: "Email input is invalid!"
      })
    }

  }

  validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  render() {
    console.log(this.props.location)
    const bcolor = this.props.error ? "white" : "#CF3934"
    const tcolor = this.props.error ? "black" : "white"
    console.log('HI', this.props.error, bclass)
    return (
      <div className="content">
        <LeadImage img={'/res/greenkid.jpeg'} withLink={false}>
          <div className="login">
            <Paper zDepth={2} style={pstyle} className="card">
              <h2>Sign Up</h2>
              <TextField
                hintText="name"
                style={textstyle}
                onChange={this.nameChange.bind(this)}
              />
              <TextField 
                hintText="email"
                errorText={this.state.emailError}
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
              <RaisedButton
                label="Sign Up"
                backgroundColor={bclass}
                onMouseDown={this.signUp.bind(this)}
                disabled={this.props.isAuthenticating}
              />
              {this.props.error ? <span>Email is already taken</span> : ''}
            </Paper>
          </div>
        </LeadImage>
      </div>
    )
  }

}

SignUp.childContextTypes = {muiTheme: React.PropTypes.object};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  isAuthenticating: state.auth.isAuthenticating,
  error: state.auth.error
});

export default connect(mapStateToProps, {
  signUpUser
})(SignUp)


