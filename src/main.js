import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'

import '!script-loader!jquery/dist/jquery.min.js'
import '!script-loader!semantic-ui/dist/semantic.min.js'
import '!script-loader!lodash/lodash.min.js'
import '!style-loader!css-loader!semantic-ui/dist/semantic.min.css'
import '!style-loader!css-loader!sass-loader!./assets/scss/default.scss'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
