import React from 'react'
import { browserHistory } from 'react-router'
import { loginUser } from '../actions'
import { connect } from 'react-redux'

// const pstyle = {
//   backgroundColor: "rgba(255,255,255,0.8)"
// }

// const bstyle = {
//   margin: '1em 0 0 0',
// }

// const textstyle = {
//   // color: colors.grey400
// }

class Login extends React.Component {

  constructor(props) {
    super(props);
    // const redirectRoute = this.props.location.query.next || '/';
    this.state = {
      username: '',
      password: '',
      errorText: ''
    };
  }

  componentWillMount() {
    const redirectRoute = this.props.location.query.next || '/';
    if(this.props.isAuthenticated) {
      browserHistory.push(redirectRoute)
    }
  }

  usernameChange(e) {
    const input = e.target.value
    this.setState({
      username: input,
      errorText: ''
    })
  }

  passwordChange(e) {
    this.setState({
      password: e.target.value
    })
  }

  login() {
    console.log('logging in:', this.state)
    this.props.loginUser(this.state.username, this.state.password, this.props.location.query.next);

    // if (this.validateEmail(this.state.email)) {
    // } else {
    //   this.setState({
    //     errorText: "Email input is invalid!"
    //   })
    // }
  }

  // navToSignUp() {
  //   browserHistory.push('signup')
  // }

  // validateEmail(email) {
  //   var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  //   return re.test(email);
  // }

  render() {
    return (
      <div className="mw5 pa4 center bg-white active_shadow">
        <h2 className="f3 mt0">Admin</h2>
        <input className="custom-input mv2 pa1" placeholder="username" onChange={this.usernameChange.bind(this)}/>
        <input className="custom-input mv2 pa1" placeholder="password" onChange={this.passwordChange.bind(this)}/>
        <button className="custom-button pa2 mt2" onClick={this.login.bind(this)}>Login</button>
        <button className="custom-button pa2 mt2" onClick={() => { browserHistory.push('/signup') }}>Sign Up</button>
      </div>
    )
  }

}


const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, {
  loginUser
})(Login)


