import 'babel-polyfill'
import Vue from 'vue'
import App from './App.vue'
import store from './store/index'
import router from './router'
// import fastclick from 'fastclick'
import vueLazyload from 'vue-lazyload'
import ElementUi from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'assets/style/app.styl'
import 'assets/style/global.scss'

// fastclick.attach(document.html)
Vue.use(vueLazyload, {
  loading: require('@/assets/img/loading.gif')
})
Vue.use(ElementUi)
Vue.config.productionTip = false

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
