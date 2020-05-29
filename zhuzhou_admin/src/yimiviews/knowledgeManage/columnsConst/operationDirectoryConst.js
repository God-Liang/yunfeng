export { theadList1, theadList2, operationButtons1, operationButtons2, statusArr, surgeryType, dialogLeftTop1_1_data_rules }
const theadList1 = [
  {
    label: 'name',
    text: '手术名称'
  },
  {
    label: 'updateName',
    text: '编辑人'
  },
  {
    label: 'updateTime',
    text: '编辑时间'
  },
  {
    label: 'status',
    text: '状态'
  }
]
const theadList2 = [
  {
    label: 'name',
    text: '表单名称'
  },
  {
    label: 'typeShow',
    text: '表单类型'
  },
  {
    label: 'functionTypeShow',
    text: '表单功能'
  }
]
const operationButtons1 = [[{
  name: 'add',
  text: '编辑',
  id: 0,
  type: 'primary'
},
{
  name: 'edit',
  text: '预览',
  id: 1,
  type: 'success'
},
{
  name: 'delete',
  text: '删除',
  id: 2,
  type: 'danger'
},
{
  name: 'startUs',
  text: '启用',
  id: 3,
  type: 'success'
}],
[{
  name: 'add',
  text: '编辑',
  id: 0,
  type: 'primary'
},
{
  name: 'edit',
  text: '预览',
  id: 1,
  type: 'success'
},
{
  name: 'delete',
  text: '删除',
  id: 2,
  type: 'danger'
},
{
  name: 'forbidden',
  text: '禁用',
  id: 4,
  type: 'warning'
}],
[],
[]]
const operationButtons2 = [{
  name: 'delete',
  text: '删除',
  id: 0,
  type: 'danger'
}]
const statusArr = ['停用', '启用']
const surgeryType = [
  {
    label: '外科手术',
    value: 'wai'
  },
  {
    label: '外科手术1',
    value: 'wai1'
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
