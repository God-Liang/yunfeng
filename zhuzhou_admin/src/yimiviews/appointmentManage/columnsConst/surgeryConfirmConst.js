export { theadList1, theadList2, statusList, dialogLeftTop1_1_data_rules, operationButtons }
const theadList1 = [
  {
    label: 'operationOrder',
    text: '手术序号'
  },
  {
    label: 'patientName',
    text: '姓名'
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
    label: 'operationRoomName',
    text: '手术室'
  },
  {
    label: 'beforeDiagnosis',
    text: '术前诊断'
  },
  {
    label: 'operationName',
    text: '拟行手术'
  },
  {
    label: 'anesthetistTypeShow',
    text: '麻醉方式'
  },
  {
    label: 'schedule',
    text: '手术日期'
  },
  {
    label: 'doctorName',
    text: '主刀医生'
  },
  {
    label: 'updateTime',
    text: '更新时间'
  }
]
const theadList2 = [
  {
    label: 'operationOrder',
    text: '手术序号'
  },
  {
    label: 'patientName',
    text: '姓名'
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
    label: 'operationRoomName',
    text: '手术室'
  },
  {
    label: 'beforeDiagnosis',
    text: '术前诊断'
  },
  {
    label: 'operationName',
    text: '拟行手术'
  },
  {
    label: 'anesthetistTypeShow',
    text: '麻醉方式'
  },
  {
    label: 'schedule',
    text: '手术日期'
  },
  {
    label: 'doctorName',
    text: '主刀医生'
  },
  {
    label: 'updateTime',
    text: '更新时间'
  }
]
const statusList = [
  {
    label: '未确认',
    value: 6
  },
  {
    label: '已确认',
    value: 7
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
const operationButtons = [
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  [{
    name: 'submit',
    text: '手术确认',
    id: 0,
    type: 'primary'
  }]
]
for (let i = 0; i < 6; i++) {
  operationButtons.push([{
    name: 'audit',
    text: '已确认',
    id: 2,
    type: 'text',
    color: '#ccc'
  }])
}
