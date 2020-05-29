export {
  tableAttr,
  operationLevelOptions
}
const tableAttr = {
  thead: [
    {
      label: 'name',
      text: '手术名称'
    },
    {
      label: 'department',
      text: '科室'
    },
    {
      label: 'operationLevel',
      text: '手术级别',
      width: 100
    }
  ],
  buttons: {
    width: 160,
    operation: {
      0: [{
        name: 'editor',
        text: '编辑',
        id: 0,
        type: 'text'
      },
      {
        name: 'delete',
        text: '删除',
        id: 1,
        type: 'text'
      }]
    }
  }
}

const operationLevelOptions = [
  {
    value: '一级',
    label: '一级'
  },
  {
    value: '二级',
    label: '二级'
  },
  {
    value: '三级',
    label: '三级'
  },
  {
    value: '四级',
    label: '四级'
  }
]
