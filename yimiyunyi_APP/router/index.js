import modules from './modules'
import Vue from 'vue'
import store from '../store'
import Router from 'uni-simple-router';
Vue.use(Router)
//初始化
const router = new Router({
	routes: [...modules] //路由表
});
//全局路由前置守卫
router.beforeEach((to, from, next) => {
	if (uni.getStorageSync('lg-token')) {
		if (to.path === '/pages/login/index') {
			next({name: 'message', NAVTYPE: 'pushTab'})
		} else {
			try {
				if (to.path !== '/pages/components/notNetwork') {
					uni.setStorageSync('errNum', 0)
					// 获取用户信息
					store.dispatch('getUserInfo').then(() => {});
					// 获取医生信息
					store.dispatch('getMyInfo').then(() => {})
				}
				next()
			} catch (error) {
				uni.setStorageSync('errNum', 0)
				uni.showToast({
					title: error || 'error',
					duration: 2000,
					icon: "none",
					mask: true
				});
				next({name: 'login', NAVTYPE: 'replace'})
			}
		}
	} else {
		const whiteList = ['/pages/login/index', '/pages/register/index', '/pages/forgotPassword/index'];
		if (whiteList.indexOf(to.path) >= 0) {
			next()
		} else {
			next({name: 'login', NAVTYPE: 'replace'})
		}
	}
})
// 全局路由后置守卫
router.afterEach((to, from) => {})
export default router;
