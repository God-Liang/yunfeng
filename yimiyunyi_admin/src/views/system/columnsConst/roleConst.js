export {
  tableAttr,
  statusOptions
}
const tableAttr = {
  thead: [
    {
      label: 'name',
      text: '角色名称',
      width: 100
    },
    {
      label: 'code',
      text: '角色标识'
    },
    {
      label: 'description',
      text: '角色权限'
    },
    {
      label: 'orders',
      text: '排序'
    },
    {
      label: 'status',
      text: '状态',
      render: (h, row) => {
        const statusOptions = ['禁用', '启用']
        const tags = ['danger', 'success']
        return h('el-tag', {
          attrs: {
            type: tags[row.status]
          }
        }, statusOptions[row.status])
      }
    },
    {
      label: 'updateName',
      text: '编辑人'
    },
    {
      label: 'updateTime',
      text: '更新日期',
      width: 200
    }
  ],
  buttons: {
    statusName: 'status',
    width: 200,
    operation: {
      0: [{
        name: 'editor',
        text: '编辑',
        id: 0,
        type: 'text'
      },
      {
        name: 'permissions',
        text: '权限',
        id: 1,
        type: 'text'
      },
      {
        name: 'enable',
        text: '启用',
        id: 2,
        type: 'text'
      }],
      1: [{
        name: 'editor',
        text: '编辑',
        id: 0,
        type: 'text'
      },
      {
        name: 'permissions',
        text: '权限',
        id: 1,
        type: 'text'
      },
      {
        name: 'disable',
        text: '禁用',
        id: 3,
        type: 'text'
      }]
    }
  }
}

const statusOptions = [
  {
    key: 1,
    valueCn: '启用'
  },
  {
    key: 0,
    valueCn: '禁用'
  }
]
