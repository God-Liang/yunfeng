import Layout from '@/views/layout/doctorLayout'

export const constantRouterMap = [
  { path: '/login', component: () => import('@/views/login/index2'), name: 'login', hidden: true },
  { path: '/signUp', component: () => import('@/views/signUp/index2'), name: 'signUp', hidden: true },
  { path: '/retrieve', component: () => import('@/views/retrieve/index'), name: 'retrieve', hidden: true },
  { path: '/authredirect', component: () => import('@/views/login/authredirect'), name: 'authredirect', hidden: true },
  { path: '/404', component: () => import('@/views/errorPage/404'), name: '404', hidden: true },
  { path: '/401', component: () => import('@/views/errorPage/401'), name: '401', hidden: true },
  { path: '/educationPage', component: () => import('@/yimiviews/components/educationPage'), name: 'EducationPage', hidden: true },
  {
    path: '/case',
    component: Layout,
    hidden: true,
    redirect: '/case/case',
    name: 'Case',
    children: [
      { path: 'case/:id', component: () => import('@/yimiviews/case/case'), name: 'case', meta: { title: '病例档案' }}
    ]
  },
  {
    path: '/follow',
    component: Layout,
    hidden: true,
    redirect: '/follow/follow',
    name: 'Follow',
    meta: {
      title: '我的随访',
      icon: 'component'
    },
    children: [
      { path: 'follow/:id', component: () => import('@/views/dashboard/follow/index'), name: 'follow', meta: { title: '随访' }},
      { path: 'followDetails/:id', component: () => import('@/views/dashboard/follow/detail'), name: 'followDetails', meta: { title: '随访详情' }}
    ]
  },
  {
    path: '/appointmentConfirm',
    component: Layout,
    hidden: true,
    redirect: '/appointmentManage/appointmentConfirm',
    name: 'AppointmentConfirm',
    meta: {
      title: '预约确认',
      icon: 'component'
    },
    children: [
      { path: 'registerAppointment/:id', component: () => import('@/yimiviews/components/registerAppointment'), name: 'registerAppointment', meta: { title: '登记预约' }},
      { path: 'againAppointment/:id', component: () => import('@/yimiviews/components/againAppointment'), name: 'againAppointment', meta: { title: '重新预约' }},
      { path: 'appointmentDeal/:id', component: () => import('@/yimiviews/components/appointmentDeal'), name: 'appointmentDeal', meta: { title: '预约处理' }}
    ]
  },
  {
    path: '/anesthesia',
    component: Layout,
    hidden: true,
    redirect: '/appointmentManage/anesthesia',
    name: 'Anesthesia',
    meta: {
      title: '麻醉评估',
      icon: 'component'
    },
    children: [
      { path: 'anesthesiaEvaluation/:id', component: () => import('@/yimiviews/components/anesthesiaEvaluation'), name: 'anesthesiaEvaluation', meta: { title: '麻醉评估' }},
      { path: 'evaluateDetail/:id', component: () => import('@/yimiviews/components/evaluateDetail'), name: 'evaluateDetail', meta: { title: '评估详情' }}
    ]
  },
  {
    path: '/check',
    component: Layout,
    hidden: true,
    redirect: '/appointmentManage/check',
    name: 'Check',
    meta: {
      title: '中心核对',
      icon: 'component'
    },
    children: [
      { path: 'infomationCheck/:id', component: () => import('@/yimiviews/components/infomationCheck'), name: 'infomationCheck', meta: { title: '信息核对' }},
      { path: 'checkDetail/:id', component: () => import('@/yimiviews/components/checkDetail'), name: 'checkDetail', meta: { title: '核对详情' }}
    ]
  },
  {
    path: '/PAE',
    component: Layout,
    hidden: true,
    redirect: '/appointmentManage/PAE',
    name: 'Pae',
    meta: {
      title: '入院前宣教',
      icon: 'component'
    },
    children: [
      { path: 'startPAE/:id', component: () => import('@/yimiviews/components/startPAE'), name: 'startPAE', meta: { title: '开始宣教' }},
      { path: 'editPAE/:id', component: () => import('@/yimiviews/components/editPAE'), name: 'editPAE', meta: { title: '设置宣教' }},
      { path: 'PAEDeal/:id', component: () => import('@/yimiviews/components/PAEDeal'), name: 'PAEDeal', meta: { title: '宣教详情' }}
    ]
  },
  {
    path: '/surgeryConfirm',
    component: Layout,
    hidden: true,
    redirect: '/appointmentManage/surgeryConfirm',
    name: 'SurgeryConfirm',
    meta: {
      title: '术前确认',
      icon: 'component'
    },
    children: [
      { path: 'preoperationCheck/:id', component: () => import('@/yimiviews/components/preoperationCheck'), name: 'preoperationCheck', meta: { title: '术前确认' }},
      { path: 'preoperationDetail/:id', component: () => import('@/yimiviews/components/preoperationDetail'), name: 'preoperationDetail', meta: { title: '确认详情' }}
    ]
  },
  {
    path: '/platform',
    component: Layout,
    hidden: true,
    redirect: '/appointmentManage/platform',
    name: 'FromPlatform',
    meta: {
      title: '平台预约',
      icon: 'component'
    },
    children: [
      { path: 'fromPlatform/:id', component: () => import('@/yimiviews/components/fromPlatform'), name: 'fromPlatform', meta: { title: '来自平台' }}
    ]
  },
  {
    path: '/surgerySendOn',
    component: Layout,
    hidden: true,
    redirect: '/appointmentManage/surgerySendOn',
    name: 'SurgerySendOn',
    meta: {
      title: '手术预送',
      icon: 'component'
    },
    children: [
      { path: 'operationSequencing', component: () => import('@/yimiviews/components/operationSequencing'), name: 'operationSequencing', meta: { title: '手术排序' }}
    ]
  },
  {
    path: '/hospitalAssessment',
    component: Layout,
    hidden: true,
    redirect: '/patientManage/hospitalAssessment',
    name: 'HospitalAssessment',
    meta: {
      title: '出院评估',
      icon: 'component'
    },
    children: [
      { path: 'leaveEvaluation/:id', component: () => import('@/yimiviews/components/leaveEvaluation'), name: 'leaveEvaluation', meta: { title: '出院评估单' }},
      { path: 'assessDetail/:id', component: () => import('@/yimiviews/components/assessDetail'), name: 'assessDetail', meta: { title: '评估详情' }}
    ]
  },
  {
    path: '/followup',
    component: Layout,
    hidden: true,
    redirect: '/followup/followupDetail',
    name: 'Followup',
    meta: {
      title: '术后随访',
      icon: 'component'
    },
    children: [
      { path: 'followupDetail/:id', component: () => import('@/yimiviews/components/followup'), name: 'followupDetail', meta: { title: '随访列表' }}
    ]
  },
  {
    path: '/followupForm',
    component: Layout,
    hidden: true,
    redirect: '/knowledgeManage/followupForm',
    name: 'FollowupForm',
    meta: {
      title: '随访表单库',
      icon: 'component'
    },
    children: [
      { path: 'followupFormEdit/:id', component: () => import('@/yimiviews/case/formCreater'), name: 'followupFormEdit', meta: { title: '表单控件' }}
      // { path: '/:id', component: () => import('@/yimiviews/components/followupFormHistory'), name: 'followupFormHistory', meta: { title: '随访表单历史' }}
    ]
  },
  {
    path: '/personCenter',
    component: Layout,
    hidden: true,
    name: 'personCenter',
    meta: {
      title: '个人中心'
    },
    children: [
      { path: 'personDetail', component: () => import('@/yimiviews/personcenter/index'), name: 'personDetail', meta: { title: '个人中心' }}
    ]
  },
  {
    path: '/roleTpos',
    component: Layout,
    hidden: true,
    redirect: '/roleManage/roleTposManage',
    name: 'roleTpos',
    meta: {
      title: '角色管理'
    },
    children: [
      { path: 'roleDetails/:id', component: () => import('@/yimiviews/components/roleDetails'), name: 'roleDetails', meta: { title: '角色详情' }}
    ]
  },
  {
    path: '/personnerTpos',
    component: Layout,
    hidden: true,
    redirect: '/personnelManage/personnerTposManage',
    name: 'personnerTpos',
    meta: {
      title: '人员管理'
    },
    children: [
      { path: 'personnelDetails/:id', component: () => import('@/yimiviews/components/personnelDetails'), name: 'personnelDetails', meta: { title: '人员详情' }}
    ]
  },
  {
    path: '/handoverPatient',
    component: Layout,
    hidden: true,
    name: 'handoverPatient',
    meta: {
      title: '患者交接'
    },
    children: [
      { path: 'patientConnect/:id', component: () => import('@/yimiviews/components/patientConnect'), name: 'patientConnect', meta: { title: '患者交接' }},
      { path: 'completeConnect/:id', component: () => import('@/yimiviews/components/completeConnect'), name: 'completeConnect', meta: { title: '交接完成' }}
    ]
  }
]
