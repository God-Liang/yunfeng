export {
  tableAttr,
  statusArr
}
const tableAttr = {
  thead: [
    {
      label: 'templateNumber',
      text: '量表编码',
      width: 120
    },
    {
      label: 'formTypeShow',
      text: '适用范围'
    },
    {
      label: 'createTime',
      text: '创建时间',
      width: 150
    },
    {
      label: 'status',
      text: '状态',
      width: 80,
      render: (h, row) => {
        const statusOptions = ['停用', '启用']
        const tags = ['danger', 'success']
        return h('el-tag', {
          attrs: {
            type: tags[row.status]
          }
        }, statusOptions[row.status])
      }
    }
  ]
}

const statusArr = [
  {
    value: null,
    label: '全部'
  },
  {
    value: 1,
    label: '启用'
  },
  {
    value: 0,
    label: '禁用'
  }
]
