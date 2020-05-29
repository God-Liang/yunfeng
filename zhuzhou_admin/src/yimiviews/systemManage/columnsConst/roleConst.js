export {
  theadList1,
  operationButtons1,
  statusArr,
  statusSelectArr
}
const theadList1 = [{
  label: 'title',
  text: '角色名称'
},
{
  label: 'typeShow',
  text: '角色类型'
},
{
  label: 'status',
  text: '状态'
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
    name: 'edit',
    text: '编辑',
    id: 1,
    type: 'primary'
  },
  {
    name: 'startUs',
    text: '启用',
    id: 2,
    type: 'success'
  }],
  [{
    name: 'look',
    text: '查看',
    id: 0,
    type: 'primary'
  },
  {
    name: 'edit',
    text: '编辑',
    id: 1,
    type: 'primary'
  },
  {
    name: 'forbidden',
    text: '禁用',
    id: 2,
    type: 'warning'
  }],
  []
]
const statusArr = ['已停用', '启用']
const statusSelectArr = [{
  label: '停用',
  value: 0
},
{
  label: '启用',
  value: 1
}]
