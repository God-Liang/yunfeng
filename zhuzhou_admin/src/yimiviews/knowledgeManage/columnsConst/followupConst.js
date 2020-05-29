export { theadList1, operationButtons1, operationButtons2, statusArr, statusSelectArr, dialogLeftTop1_1_data_rules }
const theadList1 = [
  {
    label: 'name',
    text: '表单名称'
  },
  // {
  //   label: 'code',
  //   text: '版本号'
  // },
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
const operationButtons1 = [[{
  name: 'edit',
  text: '编辑',
  id: 0,
  type: 'primary'
},
{
  name: 'delete',
  text: '删除',
  id: 1,
  type: 'danger'
},
// {
//   name: 'record',
//   text: '历史',
//   id: 2,
//   router: '/followupForm/followupFormHistory',
//   type: 'info'
// }
{
  name: 'startUs',
  text: '启用',
  id: 3,
  type: 'success'
}],
[{
  name: 'edit',
  text: '编辑',
  id: 0,
  type: 'primary'
},
{
  name: 'delete',
  text: '删除',
  id: 1,
  type: 'danger'
},
// {
//   name: 'record',
//   text: '历史',
//   id: 2,
//   router: '/followupForm/followupFormHistory',
//   type: 'info'
// }
{
  name: 'forbidden',
  text: '禁用',
  id: 4,
  type: 'warning'
}],
[],
[]]
const operationButtons2 = [{
  name: 'add',
  text: '编辑',
  id: 0,
  type: 'primary'
},
{
  name: 'add',
  text: '删除',
  id: 1,
  type: 'danger'
}]
const statusArr = ['停用', '启用']
const statusSelectArr = [
  {
    label: '停用',
    value: 0
  },
  {
    label: '启用',
    value: 1
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
