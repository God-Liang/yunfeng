export {
  tableAttr,
  statusOptions,
  sexOptions
}
const tableAttr = {
  thead: [
    {
      label: 'name',
      text: '用户名',
      width: 100
    },
    {
      label: 'nick',
      text: '名字'
    },
    {
      label: 'sex',
      text: '性别',
      render: (h, row) => {
        const sexOptions = ['男', '女']
        return sexOptions[row.sex]
      }
    },
    {
      label: 'createName',
      text: '创建人'
    },
    {
      label: 'createTime',
      text: '创建时间',
      width: 200
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
        name: 'enable',
        text: '启用',
        id: 1,
        type: 'text'
      },
      {
        name: 'delete',
        text: '删除',
        id: 3,
        type: 'text'
      }],
      1: [{
        name: 'editor',
        text: '编辑',
        id: 0,
        type: 'text'
      }, {
        name: 'disable',
        text: '禁用',
        id: 2,
        type: 'text'
      },
      {
        name: 'delete',
        text: '删除',
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

const sexOptions = [{
  key: 0,
  valueCn: '男'
},
{
  key: 1,
  valueCn: '女'
}]
