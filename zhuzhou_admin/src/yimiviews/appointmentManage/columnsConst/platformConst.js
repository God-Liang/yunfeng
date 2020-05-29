export { theadList1, operationButtons1, operationButtons2, dialogLeftTop1_1_data_rules }
const theadList1 = [
  {
    label: 'patientName',
    text: '患者姓名'
  },
  {
    label: 'sexShow',
    text: '性别'
  },
  {
    label: 'age',
    text: '年龄'
  },
  {
    label: 'medicare',
    text: '就诊卡号'
  },
  {
    label: 'idCard',
    text: '身份证号'
  },
  {
    label: 'doctorName',
    text: '预约医生'
  },
  {
    label: 'operationName',
    text: '预约手术'
  },
  {
    label: 'schedule',
    text: '预约手术时间'
  },
  {
    label: 'phone',
    text: '联系电话'
  }
]
const operationButtons1 = [
  {
    name: 'add',
    text: '预约处理',
    id: 0,
    router: '/platform/fromPlatform',
    type: 'primary'
  },
  {
    name: 'add2',
    text: '取消预约',
    id: 1,
    type: 'danger'
  }
]
const operationButtons2 = [
  {
    name: 'detail',
    text: '处理详情',
    id: 2,
    router: '/platform/fromPlatform',
    type: 'primary'
  }
]
const dialogLeftTop1_1_data_rules = {
  card: [
    { required: true, message: '请输入就诊卡号', trigger: ['blur', 'change'] }
  ],
  ID: [
    { required: true, message: '请输入身份证号', trigger: ['blur', 'change'] }
  ],
  name: [
    { required: true, message: '请输入姓名', trigger: ['blur', 'change'] }
  ],
  doctor: [
    { required: true, message: '请选择主刀医生', trigger: 'change' }
  ],
  surgery: [
    { required: true, message: '请选择手术', trigger: 'change' }
  ],
  expectTime: [
    { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
  ],
  telephone: [
    { required: true, message: '请输入手机号', trigger: ['blur', 'change'] }
  ]
}
