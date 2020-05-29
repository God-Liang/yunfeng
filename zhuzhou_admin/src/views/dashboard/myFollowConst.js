import rules from '@/utils/rules'
export { theadList1, theadList2, statusArr, operationButtons1, operationButtons2, PAEType, PAEContent, dialogLeftTop1_1_data_rules, treatmentInfo_rules }
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
    label: 'phone',
    text: '联系电话'
  },
  {
    label: 'operationName',
    text: '手术名称'
  },
  {
    label: 'planTime',
    text: '计划随访日期'
  },
  {
    label: 'followupForm',
    text: '随访表单'
  },
  {
    label: 'followupStatusShow',
    text: '随访状态'
  }
]
const theadList2 = JSON.parse(JSON.stringify(theadList1))
theadList2.push({
  label: 'status',
  text: '状态'
})
const operationButtons1 = [
  [{
    name: 'add',
    text: '随访',
    id: 0,
    type: 'primary'
  },
  {
    name: 'cancel',
    text: '取消',
    id: 1,
    type: 'danger'
  }],
  [{
    name: 'look',
    text: '查看',
    id: 2,
    type: 'primary'
  }],
  [{
    name: 'add',
    text: '随访',
    id: 0,
    type: 'primary'
  },
  {
    name: 'cancel',
    text: '取消',
    id: 1,
    type: 'danger'
  }],
  []
]
const statusArr = ['已取消', '已确认']
const operationButtons2 = [
  {
    name: 'add',
    text: '重新预约',
    id: 0,
    type: 'primary'
  }
]
const PAEContent = [
  {
    'label': '宣教内容1',
    'value': '1'
  },
  {
    'label': '宣教内容1',
    'value': '2'
  },
  {
    'label': '宣教内容1',
    'value': '3'
  }
]
const PAEType = [
  {
    'label': '宣教类型1',
    'value': '1'
  },
  {
    'label': '宣教类型2',
    'value': '2'
  },
  {
    'label': '宣教类型3',
    'value': '3'
  }
]
const dialogLeftTop1_1_data_rules = {
  /*
  anesthetistType: [
    { required: true, message: '请选择拟行麻醉', trigger: 'change' }
  ],
  doctorName: [
    { required: true, message: '请选择主刀医生', trigger: 'change' }
  ],
  doctorTel: [
    { required: true, message: '请输入联系电话', trigger: 'change' },
    rules.phone
  ],
  operationName: [
    { required: true, message: '请输入手术名称', trigger: 'change' }
  ],
  operationSide: [
    { required: true, message: '请输入侧别', trigger: 'change' }
  ],
  beforeDiagnosis: [
    { required: true, message: '请输入术前诊断', trigger: 'change' }
  ]
  */
}
const treatmentInfo_rules = {
  patientName: [
    { required: true, message: '请输入患者姓名', trigger: 'change' }
  ],
  phone: [
    { required: true, message: '请输入手机号码', trigger: 'change' },
    rules.phone
  ],
  idCard: [
    { required: true, message: '请输入身份证号', trigger: 'change' },
    rules.idCard
  ],
  visitDoctor: [
    { required: true, message: '请输入就诊医生', trigger: 'change' }
  ],
  diagnosis: [
    { required: true, message: '请输入诊断', trigger: 'change' }
  ]
}
