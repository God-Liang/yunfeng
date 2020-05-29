export {
  tableAttr1,
  tableAttr2,
  statusArr
}
const tableAttr1 = {
  thead: [{
    label: 'name',
    text: '宣教名字'
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
  ],
  buttons: {
    statusName: 'status',
    width: 240,
    operation: { // 操作按钮配置
      0: [{
        name: 'enable',
        text: '启用',
        id: 0,
        type: 'text'
      },
      {
        name: 'editor',
        text: '编辑属性',
        id: 2,
        type: 'text'
      },
      {
        name: 'template',
        text: '编辑宣教',
        id: 3,
        type: 'text'
      },
      {
        name: 'share',
        text: '分享',
        id: 4,
        type: 'text'
      }],
      1: [{
        name: 'disable',
        text: '禁用',
        id: 1,
        type: 'text'
      },
      {
        name: 'delete',
        text: '编辑属性',
        id: 2,
        type: 'text'
      },
      {
        name: 'template',
        text: '编辑宣教',
        id: 3,
        type: 'text'
      },
      {
        name: 'share',
        text: '分享',
        id: 4,
        type: 'text'
      }]
    }
  }
}
const tableAttr2 = {
  thead: [{
    label: 'name',
    text: '宣教名字'
  },
  {
    label: 'scopeShow',
    text: '范围'
  },
  {
    label: 'formTypeShow',
    text: '适用范围'
  },
  {
    label: 'createTime',
    text: '创建时间',
    width: 150
  }],
  buttons: {
    width: 300,
    operation: { // 操作按钮配置
      0: [{
        name: 'look1',
        text: '查看属性',
        id: 7,
        type: 'text'
      },
      {
        name: 'look2',
        text: '查看宣教',
        id: 8,
        type: 'text'
      },
      {
        name: 'add',
        text: '添加到个人',
        id: 9,
        type: 'text'
      }]
    }
  }
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
