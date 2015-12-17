//big thanks: https://github.com/rackt/react-router/blob/master/examples/auth-flow/auth.js

module.exports = {
  
  login(email, pass, cb) {
    // cb = arguments[arguments.length - 1]

    if (localStorage.loggedIn) {
      if (cb) cb(true)
      this.onChange(true)
      return
    }

    pretendRequest(email, pass, (res) => {
      if (res.authenticated) {
        localStorage.loggedIn = res.token
        if (cb) cb(true)
        this.onChange(true)
      } else {
        if (cb) cb(false)
        this.onChange(false)
      }
    })

  },

  getToken() {
    return localStorage.loggedIn
  },

  logout(cb) {
    delete localStorage.loggedIn
    if (cb) cb()
    this.onChange(false)
  },

  loggedIn() {
    return !!localStorage.loggedIn
  },

  onChange() {}
}

function pretendRequest(email, pass, cb) {
  setTimeout(() => {
    if (email === 'admin' && pass === 'pass1') {
      cb({
        authenticated: true,
        token: Math.random().toString(36).substring(7)
      })
    } else {
      cb({ authenticated: false })
    }
  }, 0)
}