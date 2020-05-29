export {
  theadList1,
  operationButtons1,
  statusArr,
  statusSelectArr
}
const theadList1 = [{
  label: 'name',
  text: '用户名'
},
{
  label: 'nick',
  text: '真实姓名'
},
{
  label: 'sexShow',
  text: '性别'
},
{
  label: 'phone',
  text: '联系电话'
},
{
  label: 'departName',
  text: '科室'
},
{
  label: 'createTime',
  text: '创建时间'
},
{
  label: 'status',
  text: '账号状态'
}
]
const operationButtons1 = [
  [{
    name: 'look',
    text: '查看',
    id: 0,
    type: 'primary'
  },
  {
    name: 'startUs',
    text: '启用',
    id: 1,
    type: 'success'
  },
  {
    name: 'reset',
    text: '重置密码',
    id: 3,
    type: 'danger'
  }],
  [{
    name: 'look',
    text: '查看',
    id: 0,
    type: 'primary'
  },
  {
    name: 'forbidden',
    text: '禁用',
    id: 2,
    type: 'warning'
  },
  {
    name: 'reset',
    text: '重置密码',
    id: 3,
    type: 'danger'
  }],
  []
]
const statusArr = ['停用', '启用']
const statusSelectArr = [{
  label: '停用',
  value: 0
},
{
  label: '启用',
  value: 1
}
]
