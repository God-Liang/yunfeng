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
  label: 'bm',
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
const operationButtons1 = [{
  name: 'look',
  text: '查看',
  id: 0,
  type: 'text'
}, {
  name: 'remove',
  text: '移除',
  id: 1,
  type: 'text'
}]
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
