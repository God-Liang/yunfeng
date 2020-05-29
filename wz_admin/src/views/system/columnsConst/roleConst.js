export {
  tableAttr,
  statusOptions
}
const tableAttr = {
  thead: [{
    label: 'role_name',
    text: '角色名称',
    width: 100
  },
  {
    label: 'description',
    text: '角色描述'
  },
  {
    label: 'power_name',
    text: '角色权限'
  },
  {
    label: 'seq',
    text: '排序'
  }
  ],
  buttons: {
    status: false, // 是否区分操作状态 true：根据当前列的数据状态值使用operation[状态值]; false：使用operation[0]
    width: 300, // 表格操作列的宽度
    operation: { // 操作按钮配置
      0: [{
        name: 'permissions',
        text: '权限',
        id: 0,
        type: 'primary'
      },
      {
        name: 'editor',
        text: '编辑',
        id: 1,
        type: 'primary'
      },
      {
        name: 'delete',
        text: '删除',
        id: 2,
        type: 'danger'
      }
      ]
    }
  }
}

const statusOptions = [{
  key: 1,
  valueCn: '启用'
},
{
  key: 0,
  valueCn: '禁用'
}
]
