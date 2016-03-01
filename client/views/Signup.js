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
class SignUp extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      password: '',
      redirectTo: '/',
      errorText: ''
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
      errorText: ''
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
        errorText: "Email input is invalid!"
      })
    }

  }

  validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  render() {
    console.log(this.props.location)
    return (
      <div className="content">
        <LeadImage img={'/img/morehouses.jpeg'} withLink={false}>
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
              <RaisedButton
                label="Sign Up"
                style={bstyle}
                onMouseDown={this.signUp.bind(this)}
                disabled={this.props.isAuthenticating}
              />
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
  isAuthenticating: state.auth.isAuthenticating
});

export default connect(mapStateToProps, {
  signUpUser
})(SignUp)


