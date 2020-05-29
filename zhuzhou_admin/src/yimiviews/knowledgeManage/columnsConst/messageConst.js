export { theadList1, operationButtons1, statusArr }
const theadList1 = [
  {
    label: 'typeShow',
    text: '类别'
  },
  {
    label: 'name',
    text: '模板名称'
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
}]
const statusArr = ['停用', '启用']
