import rules from '@/utils/rules'
export { theadList1, theadList2, operationButtons1, statusList, keyWordList, dialogLeftTop1_1_data_rules, doorRegisterInfo_rules, treatmentInfo_rules, baseInfo_rules, operationInfo_rules, anesthesiaEvaluation_rules }
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
    label: 'visitId',
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
    label: 'phone',
    text: '联系电话'
  },
  {
    label: 'updateTime',
    text: '更新时间'
  }
]
const theadList2 = JSON.parse(JSON.stringify(theadList1))
const operationButtons1 = [
  [],
  [],
  [],
  [{
    name: 'add',
    text: '预约处理',
    id: 0,
    type: 'primary'
  }],
  [{
    name: 'audit',
    text: '处理审核',
    id: 1,
    type: 'success'
  }]
]
const statusList = [
  {
    label: '预约处理',
    value: 3
  },
  {
    label: '处理审核',
    value: 4
  }
]
const keyWordList = [
  {
    label: '患者姓名',
    value: 0
  },
  {
    label: '手机后四位',
    value: 1
  },
  {
    label: '就诊卡号',
    value: 2
  }
]
// 预约登记信息校验
const dialogLeftTop1_1_data_rules = {
  anesthetistType: [
    { required: true, message: '请选择拟行麻醉', trigger: 'change' }
  ],
  doctorId: [
    { required: true, message: '请选择主刀医生', trigger: 'change' }
  ],
  doctorTel: [
    { required: true, message: '请输入联系电话', trigger: 'blur' },
    rules.phone
  ],
  operationId: [
    { required: true, message: '请输入手术名称', trigger: 'change' }
  ],
  operationNo: [
    { required: true, message: '请输入手术名称', trigger: 'change' }
  ],
  operationSide: [
    { required: true, message: '请输入侧别', trigger: 'change' }
  ],
  beforeDiagnosis: [
    { required: true, message: '请选择术前诊断', trigger: 'change' }
  ],
  operationRoomId: [
    { required: true, message: '请选择手术室', trigger: 'change' }
  ],
  operationOrder: [
    { required: true, message: '请选择手术室台次', trigger: 'change' }
  ]
}
// 门诊信息校验
const doorRegisterInfo_rules = {
  birthday: [
    { required: true, message: '请选择出生日期', trigger: ['change'] }
  ],
  visitId: [
    { required: true, message: '请输入就诊卡号', trigger: ['blur'] }
  ],
  patientName: [
    { required: true, message: '请输入患者姓名', trigger: ['blur'] }
  ],
  phone: [
    { required: true, message: '请输入手机号码', trigger: ['blur'] },
    rules.phone
  ],
  idCard: [
    { required: true, message: '请输入身份证号', trigger: ['blur'] },
    rules.idCard
  ],
  visitDoctor: [
    { required: true, message: '请选择就诊医生', trigger: ['change'] }
  ],
  visitDiagnosis: [
    { required: true, message: '请选择诊断', trigger: ['change'] }
  ],
  sex: [
    { required: true, message: '请选择性别', trigger: ['change'] }
  ]
}
// 就诊信息校验
const treatmentInfo_rules = {
  birthday: [
    { required: true, message: '请选择出生日期', trigger: ['change'] }
  ],
  visitId: [
    { required: true, message: '请输入就诊卡号', trigger: ['blur'] }
  ],
  patientName: [
    { required: true, message: '请输入患者姓名', trigger: ['blur'] }
  ],
  phone: [
    { required: true, message: '请输入手机号码', trigger: ['blur'] },
    rules.phone
  ],
  idCard: [
    { required: true, message: '请输入身份证号', trigger: ['blur'] },
    rules.idCard
  ],
  visitDoctorId: [
    { required: true, message: '请选择就诊医生', trigger: ['change'] }
  ],
  beforeDiagnosisCode: [
    { required: true, message: '请选择诊断', trigger: ['change'] }
  ],
  sex: [
    { required: true, message: '请选择性别', trigger: ['change'] }
  ]
}

const baseInfo_rules = {
  patientName: [
    { required: true, message: '此项不能为空', trigger: 'blur' }
  ],
  phone: [
    { required: true, message: '此项不能为空', trigger: 'blur' },
    rules.phone
  ],
  sex: [
    { required: true, message: '此项不能为空', trigger: 'change' }
  ],
  idCard: [
    { required: true, message: '此项不能为空', trigger: 'blur' },
    rules.idCard
  ],
  birthday: [
    { required: true, message: '此项不能为空', trigger: 'change' }
  ],
  liveAreaId: [
    { required: true, message: '此项不能为空', trigger: ['blur'] }
  ]
}
const operationInfo_rules = {
  anesthetistName: [
    { required: true, message: '此项不能为空', trigger: 'change' }
  ],
  anesthetistTel: [
    { required: true, message: '此项不能为空', trigger: 'blur' }
  ],
  schedule: [
    { required: true, message: '此项不能为空', trigger: 'change' }
  ],
  doctorName: [
    { required: true, message: '此项不能为空', trigger: 'change' }
  ],
  operationRoomId: [
    { required: true, message: '此项不能为空', trigger: 'change' }
  ],
  operationOrder: [
    { required: true, message: '此项不能为空', trigger: 'change' }
  ]
}
const anesthesiaEvaluation_rules = {
  anaesthesiaType: [
    { required: true, message: '必填项不能为空', trigger: 'change' }
  ],
  subAnaesthesia: [
    { required: true, message: '必填项不能为空', trigger: 'change' }
  ],
  anesthetistName: [
    { required: true, message: '必填项不能为空', trigger: 'change' }
  ],
  analgesiaType: [
    { required: true, message: '必填项不能为空', trigger: 'change' }
  ]
}
