import Layout from '@/views/layout/doctorLayout'

export const doctorSystemRouter = [
  {
    path: '',
    component: Layout,
    redirect: 'home',
    name: 'controlBoard',
    meta: {
      title: '我的工作台',
      icon: 'myWorkbench'
    },
    children: [
      {
        path: 'home',
        component: () => import('@/views/dashboard/doctorIndex'),
        name: 'doctorIndex',
        meta: { title: '我的首页' }
      }
    ]
  },
  {
    path: '/roleManage',
    component: Layout,
    alwaysShow: true,
    children: [{
      path: 'roleTposManage',
      component: () => import('@/yimiviews/systemManage/role'),
      name: 'roleTposManage',
      meta: { title: '角色管理', icon: 'roleManage' }
    }]
  },
  {
    path: '/personnelManage',
    component: Layout,
    alwaysShow: true,
    children: [{
      path: 'personnerTposManage',
      component: () => import('@/yimiviews/systemManage/user'),
      name: 'personnerTposManage',
      meta: { title: '人员管理', icon: 'personnelManage' }
    }]
  },
  {
    path: '/informationManage',
    component: Layout,
    redirect: 'noredirect',
    name: 'informationManage',
    meta: {
      title: '消息管理',
      icon: 'messageManage'
    },
    children: [{
      path: 'informationList',
      component: () => import('@/yimiviews/informationManage/informationList'),
      name: 'informationList',
      meta: { title: '消息列表' }
    },
    {
      path: 'informationConfig',
      component: () => import('@/yimiviews/informationManage/informationConfig'),
      name: 'informationConfig',
      meta: { title: '消息配置' }
    }]
  }
]

