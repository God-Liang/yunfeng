import Vue from 'vue'
import App from './App'
import store from './store'
// 路由
import router from './router'
import Router, {RouterMount} from 'uni-simple-router';
Vue.use(Router)
// 表单校验
import validate from '@/static/common/validate.js'
// 常用API二级封装
import helper from './helper/helper.js';

// 环信即时通讯
let WebIM = require("utils/WebIM")["default"];
let conn = {
	closed: false,
	curOpenOpt: {},
	open(opt) {
		this.curOpenOpt = opt;
		WebIM.conn.open(opt);
		this.closed = false;
	},
	reopen() {
		if (this.closed) {
			//this.open(this.curOpenOpt);
			WebIM.conn.open(this.curOpenOpt);
			this.closed = false;
		}
	}
};


// 注册全局filters
import * as filters from './filters'
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

// 注册全局组件
import MescrollBody from "@/components/mescroll-uni/mescroll-body.vue"
import MescrollUni from "@/components/mescroll-uni/mescroll-uni.vue"
Vue.component('mescroll-body', MescrollBody)
Vue.component('mescroll-uni', MescrollUni)

Vue.prototype.$store = store;
Vue.prototype.$validate = validate
Vue.prototype.$helper = helper
Vue.prototype.$im = WebIM;
Vue.prototype.$conn = conn;
Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
	...App,
		store,
		router
})
// app.$mount()
// #ifdef H5
	RouterMount(app,'#app');
// #endif

// #ifndef H5
	app.$mount(); //为了兼容小程序及app端必须这样写才有效果
// #endif
