import Layout from '@/views/layout/doctorLayout'

export const authorityManageRouter = [
  {
    path: '',
    component: Layout,
    redirect: 'user',
    name: 'systemManage',
    meta: {
      title: '系统管理',
      icon: 'component'
    },
    children: [
      {
        path: 'user',
        component: () => import('@/yimiviews/systemManage/user'),
        name: 'user',
        meta: { title: '人员管理' }
      },
      {
        path: 'role',
        component: () => import('@/yimiviews/systemManage/role'),
        name: 'role',
        meta: { title: '角色管理' }
      },
      {
        path: 'permission',
        component: () => import('@/yimiviews/systemManage/permission'),
        name: 'permission',
        meta: { title: '资源管理' }
      },
      {
        path: 'system',
        component: () => import('@/yimiviews/systemManage/system'),
        name: 'system',
        meta: { title: '系统管理' }
      },
      {
        path: 'org',
        component: () => import('@/yimiviews/systemManage/org'),
        name: 'org',
        meta: { title: '组织机构管理' }
      },
      {
        path: 'dic',
        component: () => import('@/yimiviews/systemManage/dic'),
        name: 'dic',
        meta: { title: '字典管理' }
      },
      {
        path: 'config',
        component: () => import('@/yimiviews/systemManage/config'),
        name: 'config',
        meta: { title: '系统配置管理' }
      }
    ]
  }
]

