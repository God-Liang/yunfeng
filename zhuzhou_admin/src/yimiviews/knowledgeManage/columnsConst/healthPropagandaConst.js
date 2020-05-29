export { theadList1, operationButtons1, statusArr, statusSelectArr }
const theadList1 = [
  {
    label: 'name',
    text: '宣教名称'
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
const operationButtons1 = [{
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
