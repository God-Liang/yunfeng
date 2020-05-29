import Vue from 'vue'

import 'normalize.css/normalize.css'// A modern alternative to CSS resets

import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import '@/styles/index.scss' // global css

import App from './App'
import router from './router'
import store from './store'

// import i18n from './lang' // Internationalization
import './icons' // icon
import './errorLog'// error log
import './permission' // permission control
import './mock' // simulation data

import custom_form from '@/formCreater/components/custom_form'
import * as filters from './filters' // global filters

Vue.use(Element, {
  size: 'medium' // set element-ui default size
  // i18n: (key, value) => i18n.t(key, value)
})

Vue.use(custom_form)

// register global utility filters.
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  // i18n,
  template: '<App/>',
  components: { App },
  methods: {
    closeTag() {
      const view = {
        name: this.$route.name,
        path: this.$route.path,
        title: this.$route.meta.title || 'no-title'
      }
      this.$store.dispatch('delVisitedViews', view).then((views) => {
        const latestView = views.slice(-1)[0]
        if (latestView) {
          this.$router.push(latestView.path)
        } else {
          this.$router.push('/')
        }
      })
    }
  }
})
