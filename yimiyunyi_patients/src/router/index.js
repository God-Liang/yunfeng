import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [{
  path: '/',
  name: 'Home',
  component: () => import('@/views/index.vue'),
  meta: {
    title: '请输入您的身份信息'
  }
},
{
  path: '/perfectInfo',
  name: 'PerfectInfo',
  component: () => import('@/views/perfectInfo.vue'),
  meta: {
    title: '完善信息'
  }
},
{
  path: '/myInfoStatus',
  name: 'myInfoStatus',
  component: () => import('@/views/myInfoStatus.vue'),
  meta: {
    title: '信息已提交'
  }
},
{
  path: '/aboutUs',
  name: 'aboutUs',
  component: () => import('@/views/aboutUs.vue'),
  meta: {
    title: '关于我们'
  }
},
{
  path: '/team',
  name: 'team',
  component: () => import('@/views/team.vue'),
  meta: {
    title: '团队主页'
  }
},
{
  path: '/teamDetails',
  name: 'teamDetails',
  component: () => import('@/views/teamDetails.vue'),
  meta: {
    title: '团队主页'
  }
},
{
  path: '/doctorDetails',
  name: 'doctorDetails',
  component: () => import('@/views/doctorDetails.vue'),
  meta: {
    title: '医生主页'
  }
},
{
  path: '/caseHistory',
  name: 'caseHistory',
  component: () => import('@/views/caseHistory.vue'),
  meta: {
    title: '病历'
  }
},
{
  path: '/homePage',
  name: 'homePage',
  component: () => import('@/views/homePage.vue'),
  meta: {
    title: '个人主页'
  }
},
{
  path: '/healthRecords',
  name: 'healthRecords',
  component: () => import('@/views/healthRecords.vue'),
  meta: {
    title: '健康档案'
  }
},
{
  path: '/myDoctor',
  name: 'myDoctor',
  component: () => import('@/views/myDoctor.vue'),
  meta: {
    title: '我的医生'
  }
},
{
  path: '/doctorList',
  name: 'doctorList',
  component: () => import('@/views/doctorList.vue'),
  meta: {
    title: '申请加入医疗团队'
  }
},
{
  path: '/joinTeam',
  name: 'joinTeam',
  component: () => import('@/views/joinTeam.vue'),
  meta: {
    title: '加入医疗团队'
  }
},
{
  path: '/followupRecord',
  name: 'followupRecord',
  component: () => import('@/views/followupRecord.vue'),
  meta: {
    title: '随访记录'
  }
},
{
  path: '/userForm',
  name: 'userForm',
  component: () => import('@/views/userForm.vue'),
  meta: {
    title: '表单详情'
  }
},
{
  path: '/lookForm',
  name: 'lookForm',
  component: () => import('@/views/lookForm.vue'),
  meta: {
    title: '表单详情'
  }
}
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
