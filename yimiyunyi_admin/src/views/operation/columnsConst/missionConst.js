export {
  tableAttr,
  statusArr
}
const tableAttr = {
  thead: [{
    label: 'name',
    text: '宣教名字'
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
  ],
  buttons: {
    statusName: 'status',
    width: 240,
    operation: { // 操作按钮配置
      0: [{
        name: 'enable',
        text: '启用',
        id: 0,
        type: 'text',
        statusName: 'verifyStatus',
        statusValue: 1
      },
      {
        name: 'editor',
        text: '编辑属性',
        id: 2,
        type: 'text',
        statusName: 'verifyStatus',
        statusValue: 1
      },
      {
        name: 'template',
        text: '编辑宣教',
        id: 3,
        type: 'text',
        statusName: 'verifyStatus',
        statusValue: 1
      },
      {
        name: 'audit',
        text: '审核',
        id: 4,
        type: 'text',
        statusName: 'verifyStatus',
        statusValue: 0
      },
      {
        name: 'lookAttr',
        text: '查看属性',
        id: 5,
        type: 'text',
        statusName: 'verifyStatus',
        statusValue: [0, 2]
      },
      {
        name: 'lookTemplate',
        text: '查看宣教',
        id: 6,
        type: 'text',
        statusName: 'verifyStatus',
        statusValue: [0, 2]
      }
      ],
      1: [{
        name: 'disable',
        text: '禁用',
        id: 1,
        type: 'text',
        statusName: 'verifyStatus',
        statusValue: 1
      },
      {
        name: 'delete',
        text: '编辑属性',
        id: 2,
        type: 'text',
        statusName: 'verifyStatus',
        statusValue: 1
      },
      {
        name: 'template',
        text: '编辑宣教',
        id: 3,
        type: 'text',
        statusName: 'verifyStatus',
        statusValue: 1
      },
      {
        name: 'audit',
        text: '审核',
        id: 4,
        type: 'text',
        statusName: 'verifyStatus',
        statusValue: 0
      },
      {
        name: 'lookAttr',
        text: '查看属性',
        id: 5,
        type: 'text',
        statusName: 'verifyStatus',
        statusValue: [0, 2]
      },
      {
        name: 'lookTemplate',
        text: '查看宣教',
        id: 6,
        type: 'text',
        statusName: 'verifyStatus',
        statusValue: [0, 2]
      }
      ]
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
