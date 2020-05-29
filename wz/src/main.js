import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 全局引入Vant
import Vant from 'vant'
import 'vant/lib/index.css'

// 公共样式
import './styles/index.scss'
// rem
import './libs/rem.js'

// 登陆、申领车数据
// eslint-disable-next-line import/first
import './permission'

Vue.use(Vant)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
