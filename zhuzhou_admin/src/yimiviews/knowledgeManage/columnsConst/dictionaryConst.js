export { theadList1, theadList2, operationButtons1, operationButtons2, statusArr, surgeryType, dialogLeftTop1_1_data_rules }
const theadList1 = [
  {
    label: 'keyCnName',
    text: '名称'
  },
  {
    label: 'extDesc',
    text: '说明'
  },
  {
    label: 'value',
    text: '代码'
  },
  {
    label: 'updateName',
    text: '编辑人'
  },
  {
    label: 'updateTime',
    text: '编辑时间'
  }
]
const theadList2 = [
  {
    label: 'name',
    text: '姓名'
  },
  {
    label: 'gender',
    text: '性别'
  },
  {
    label: 'age',
    text: '年龄'
  },
  {
    label: 'card',
    text: '就诊卡号'
  },
  {
    label: 'operateDoctor',
    text: '主刀医生'
  },
  {
    label: 'operateSurgery',
    text: '预约手术'
  },
  {
    label: 'expectTime',
    text: '预约时间'
  },
  {
    label: 'telephone',
    text: '联系电话'
  },
  {
    label: 'anesthesia',
    text: '麻醉'
  },
  {
    label: 'anesthesiaDoctor',
    text: '麻醉医生'
  }
]
const operationButtons1 = [{
  name: 'add',
  text: '编辑',
  id: 0,
  type: 'primary'
},
{
  name: 'delete',
  text: '删除',
  id: 1,
  type: 'danger'
}]
const operationButtons2 = [{
  name: 'add',
  text: '核对详情',
  id: 0,
  type: 'primary'
}]
const statusArr = ['停用', '启用']
const surgeryType = [
  {
    label: '性别',
    value: 'xb'
  },
  {
    label: '提醒类别',
    value: 'txlb'
  },
  {
    label: '外科手术2',
    value: 'wai2'
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
