import Vue from 'vue'
import axios from 'axios'
import App from './App'
import router from './router'
import store from './store'
import auth from '../auth'
import VueResource from 'vue-resource'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import './assets/css/_login.css'
import './assets/css/_landing.css'
import './assets/css/_progress.css'
import './assets/css/_filelist.css'
import './assets/css/_projectlist.css'
import './assets/css/_dashboard.css'
import './assets/css/_header.css'

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false
window.jQuery = window.$ = require('jquery/dist/jquery.min')

auth.checkAuth()
Vue.use(router)
Vue.use(VueResource)

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>'
}).$mount('#app')
