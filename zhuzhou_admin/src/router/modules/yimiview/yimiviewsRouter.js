import Layout from '@/views/layout/doctorLayout'

export const asyncRouterMap =
  [
    {
      path: '',
      component: Layout,
      redirect: 'home',
      name: 'controlBoard',
      meta: {
        title: '我的控制台',
        icon: 'component'
      },
      children: [
        {
          path: 'home',
          component: () => import('@/views/dashboard/index'),
          name: 'index',
          meta: { title: '我的首页', icon: 'dashboard' }
        },
        {
          path: 'myFollow',
          component: () => import('@/views/dashboard/myFollow'),
          name: 'myFollow',
          meta: { title: '我的随访', icon: 'dashboard' }
        }
      ]
    },
    {
      path: '/appointmentManage',
      component: Layout,
      redirect: 'noredirect',
      name: 'appointmentManage',
      meta: {
        title: '预约管理',
        icon: 'component'
      },
      children: [
        {
          path: 'doorRegister',
          component: () => import('@/yimiviews/components/doorRegister'),
          name: 'doorRegister',
          meta: { title: '门诊登记' }
        },
        {
          path: 'appointmentConfirm',
          component: () => import('@/yimiviews/appointmentManage/appointmentConfirm'),
          name: 'appointmentConfirm',
          meta: { title: '预约确认' }
        },
        {
          path: 'anesthesia',
          component: () => import('@/yimiviews/optReady/anesthesia'),
          name: 'anesthesia',
          meta: { title: '麻醉评估' }
        },
        {
          path: 'check',
          component: () => import('@/yimiviews/optReady/check'),
          name: 'check',
          meta: { title: '中心核对' }
        },
        {
          path: 'PAE',
          component: () => import('@/yimiviews/appointmentManage/PAE'),
          name: 'PAE',
          meta: { title: '入院前宣教' }
        },
        {
          path: 'surgeryConfirm',
          component: () => import('@/yimiviews/appointmentManage/surgeryConfirm'),
          name: 'surgeryConfirm',
          meta: { title: '术前确认' }
        },
        {
          path: 'platform',
          component: () => import('@/yimiviews/appointmentManage/platform'),
          name: 'platform',
          meta: { title: '平台预约' }
        }
      ]
    },
    {
      path: '/patientManage',
      component: Layout,
      redirect: 'noredirect',
      name: 'patientManagement',
      meta: {
        title: '患者管理',
        icon: 'component'
      },
      children: [{
        path: 'patientManage',
        component: () => import('@/yimiviews/patientManage/patientManage'),
        name: 'patientManage',
        meta: { title: '患者管理', icon: 'tab' }
      },
      {
        path: 'hospitalAssessment',
        component: () => import('@/yimiviews/patientManage/hospitalAssessment'),
        name: 'hospitalAssessment',
        meta: { title: '出院评估', icon: 'tab' }
      }]
    },
    {
      path: '/followupManage',
      component: Layout,
      redirect: 'noredirect',
      name: 'followupManage',
      meta: {
        title: '随访管理',
        icon: 'component'
      },
      children: [{
        path: 'followup',
        component: () => import('@/yimiviews/followupManage/followup'),
        name: 'followup',
        meta: { title: '术后随访', icon: 'tab' }
      }]
    },
    {
      path: '/knowledgeManage',
      component: Layout,
      redirect: 'noredirect',
      name: 'knowledgeManage',
      meta: {
        title: '基础数据',
        icon: 'component'
      },
      children: [
        {
          path: 'followupForm',
          component: () => import('@/yimiviews/knowledgeManage/followupForm'),
          name: 'followupForm',
          meta: { title: '随访表单库' }
        },
        {
          path: 'healthPropaganda',
          component: () => import('@/yimiviews/knowledgeManage/healthPropaganda'),
          name: 'healthPropaganda',
          meta: { title: '健康宣教库' }
        },
        {
          path: 'operationDirectory',
          component: () => import('@/yimiviews/knowledgeManage/operationDirectory'),
          name: 'operationDirectory',
          meta: { title: '手术目录库' }
        },
        {
          path: 'doctorScheduling',
          component: () => import('@/yimiviews/knowledgeManage/doctorScheduling'),
          name: 'doctorScheduling',
          meta: { title: '医生排班信息' }
        },
        {
          path: 'doctorInfomation',
          component: () => import('@/yimiviews/knowledgeManage/doctorInfomation'),
          name: 'doctorInfomation',
          meta: { title: '医生信息' }
        },
        {
          path: 'message',
          component: () => import('@/yimiviews/knowledgeManage/message'),
          name: 'message',
          meta: { title: '提醒短语库' }
        },
        {
          path: 'operationRoom',
          component: () => import('@/yimiviews/knowledgeManage/operationRoom'),
          name: 'operationRoom',
          meta: { title: '手术间信息' }
        },
        { path: 'bed', component: () => import('@/yimiviews/knowledgeManage/bed'), name: 'bed', meta: { title: '床位信息' }}
      ]
    },
    {
      path: '/systemManage',
      component: Layout,
      redirect: 'noredirect',
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
          path: 'medicalGroup',
          component: () => import('@/yimiviews/systemManage/medicalGroup'),
          name: 'medicalGroup',
          meta: { title: '医疗组管理' }
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
          path: 'dictionary',
          component: () => import('@/yimiviews/knowledgeManage/dictionary'),
          name: 'dictionary',
          meta: { title: '公用字典库' }
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
