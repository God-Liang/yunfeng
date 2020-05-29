export {
  tableAttr,
  operationLevelOptions
}
const tableAttr = {
  thead: [
    {
      label: 'name',
      text: '疾病名称'
    },
    {
      label: 'icd10',
      text: 'icd10'
    },
    {
      label: 'icd9',
      text: 'icd9'
    },
    {
      label: 'department',
      text: '科室'
    },
    {
      label: 'position',
      text: '部位'
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
    value: 1,
    label: '一级'
  },
  {
    value: 2,
    label: '二级'
  }
]
