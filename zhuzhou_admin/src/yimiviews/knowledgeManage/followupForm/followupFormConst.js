export { theadList1, operationButtons1, dialogLeftTop1_1_data_rules, dialogLeftTopChild1_1_data_rules }
const theadList1 = [
  {
    label: 'formType',
    text: '表单类型'
  },
  {
    label: 'formFacility',
    text: '表单功能'
  },
  {
    label: 'opending',
    text: '表单开头语'
  },
  {
    label: 'ending',
    text: '表单结束语'
  },
  {
    label: 'code',
    text: '编码'
  },
  {
    label: 'name',
    text: '名称'
  },
  {
    label: 'description',
    text: '简介'
  },
  {
    label: 'createTime',
    text: '创建时间'
  }
]
const operationButtons1 = [
  {
    name: 'delete',
    text: '作废表单',
    id: 1,
    type: 'danger'
  }
]
const dialogLeftTop1_1_data_rules = {
  formType: [
    { required: true, message: '请选择表单分类', trigger: ['blur', 'change'] }
  ],
  formFacility: [
    { required: true, message: '请选择表单功能', trigger: ['blur', 'change'] }
  ],
  name: [
    { required: true, message: '请输入表单名称', trigger: ['blur', 'change'] }
  ],
  opending: [
    { required: true, message: '请输入表单开头语', trigger: 'change' }
  ],
  ending: [
    { required: true, message: '请输入表单结束语', trigger: 'change' }
  ],
  expectTime: [
    { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
  ],
  creater: [
    { type: 'date', required: true, message: '请选择创建人', trigger: 'change' }
  ],
  launchStatus: [
    { required: true, message: '请选择启用状态', trigger: ['blur', 'change'] }
  ]
}
const dialogLeftTopChild1_1_data_rules = {
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
