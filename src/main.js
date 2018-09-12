import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import '@/common/stylus/index.styl'
import fastclick from 'fastclick'
import Vuelazyload from 'vue-lazyload'

Vue.use(Vuelazyload, {
  loading: require('common/image/default.png')
})

fastclick.attach(document.body)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App),
  router,
  store
})
