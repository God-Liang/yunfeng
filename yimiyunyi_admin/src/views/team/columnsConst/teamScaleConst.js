export {
  tableAttr,
  statusArr
}
const tableAttr = {
  thead: [
    // {
    //   label: 'name',
    //   text: '量表名字'
    // },
    {
      label: 'templateNumber',
      text: '量表编码',
      width: 120
    },
    {
      label: 'version',
      text: '版本号',
      width: 60
    },
    {
      label: 'formTypeShow',
      text: '适用范围'
    },
    {
      label: 'createName',
      text: '创建人',
      width: 100
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
    },
    {
      label: 'verifyStatus',
      text: '审核状态',
      width: 100,
      render: (h, row) => {
        const statusOptions = ['待审核', '审核通过', '已拒绝']
        const tags = ['warning', 'success', 'info']
        return h('el-tag', {
          attrs: {
            type: tags[row.verifyStatus]
          }
        }, statusOptions[row.verifyStatus])
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
