// URL and endpoint constants
const API_URL = 'http://localhost:3001/'
const LOGIN_URL = API_URL + 'sessions/create/'

export default {

  // User object will let us check authentication status
  user: {
    authenticated: false
  },

  // Send a request to the login URL and save the returned JWT
  login (context, creds, redirect) {
    context.$http.post(LOGIN_URL, creds)
      .then(response => {
        console.log(response)
        localStorage.setItem('id_token', creds.id_token)
        localStorage.setItem('access_token', creds.access_token)

        this.user.authenticated = true
        console.log('I am in success')
        context.errorMsg = false
        // Redirect to a specified route
        if (redirect) {
          // router.go(redirect)
          context.$router.push({name: 'landing'})
        }
        // this.$router.push({name: 'landing'})
      }, error => {
        console.log(error)
        context.errorStr = error.body
        console.log('I am in error')
        context.errorMsg = true
      })
  },

  checkAuth () {
    var jwt = localStorage.getItem('id_token')
    if (jwt) {
      this.user.authenticated = true
    } else {
      this.user.authenticated = false
    }
  },

  // The object to be passed as a header for authenticated requests
  getAuthHeader () {
    return {
      'Authorization': 'Bearer ' + localStorage.getItem('access_token')
    }
  }
}
