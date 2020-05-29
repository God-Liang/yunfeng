import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// 配合postcss-pxtorem实现自适应
import './libs/rem.js'

// 公共样式
import './styles/index.scss'

// 挂载到全局
import * as utils from './utils'
import * as filters from './filters'
// title
import VueWechatTitle from 'vue-wechat-title'
// 自定义表单
import lgForm from 'lg-form'

// 自定义全局组件
import lgPicker from '@/components/lgPicker' // 选择器
import lgDatetimePicker from '@/components/lgDatetimePicker' // 时间选择器

// 注册到vue原型上
import validate from '@/utils/validate'

Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})
Object.keys(utils).forEach(key => {
  Vue.prototype[key] = utils[key]
})

Vue.component('lg-picker', lgPicker)
Vue.component('lg-datetime-picker', lgDatetimePicker)

Vue.prototype.$validate = validate

Vue.use(VueWechatTitle)
Vue.use(lgForm)
Vue.use(Element, {
  size: 'small' // set element-ui default size
})
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
