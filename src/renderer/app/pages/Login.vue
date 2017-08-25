<template>
  <div class="container" id="base-wrapper">
  <header-component/>
    <div class="row" id="outer-wrapper">
      <div id="wrapper">
        <span class="title">
          Login Information
        </span>
        <form class="register">
          <div class="container" id="login-box">
            <div v-if="errorMsg === true" class="panel panel-danger">
              <div class="panel-heading">
                <i><span class="glyphicon glyphicon-exclamation-sign" style="color: red"/> {{ errorStr }}</i>
              </div>
            </div>
            <label>
              <b>Username</b>
            </label>
            <input type="text" placeholder="Enter Username" v-model="credentials.email">
            <br>
            <br>
            <label>
              <b>Password</b>
            </label>
            <input type="password" placeholder="Enter Password" v-model="credentials.password">
            <br>
            <input type="checkbox" checked="checked">Remember me
            <br>
            <br>
            <button class="btn btn-outline-primary" id="login-button" @click="authLogin()">Login</button>
            <br>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
  import auth from '../../../auth' // import the auth library for the authentication process
  import HeaderComponent from '../../lib/tools/HeaderComponent.vue'
  export default{
    name: 'Login',
    components: {
      HeaderComponent
    },
    data () {
      return {
        credentials: {
          email: '',
          password: ''
        },
        errorStr: '',
        errorMsg: false
      }
    },
    methods: {
      authLogin: function () {
        var credentials = {
          email: this.credentials.email,
          password: this.credentials.password,
          errorMsg: false
        }
        auth.login(this, credentials, true)
      }
    }
  }
</script>
