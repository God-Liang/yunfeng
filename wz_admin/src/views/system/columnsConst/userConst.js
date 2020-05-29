export {
  tableAttr,
  statusOptions,
  sexOptions,
  roleOptions
}
const tableAttr = {
  thead: [{
    label: 'login_name',
    text: '用户名',
    width: 100
  },
  {
    label: 'link_man',
    text: '名字'
  },
  {
    label: 'role_name',
    text: '角色'
  },
  {
    label: 'sex',
    text: '性别'
  },
  {
    label: 'create_date',
    text: '创建时间',
    width: 200
  }
    // {
    //   label: 'status',
    //   text: '状态'
    // }
  ],
  buttons: {
    status: false, // 是否区分操作状态 true：根据当前列的数据状态值使用operation[状态值]; false：使用operation[0]
    width: 300, // 表格操作列的宽度
    operation: { // 操作按钮配置
      0: [{
        name: 'editor',
        text: '编辑',
        id: 0,
        type: 'primary'
      },
      // {
      //   name: 'enable',
      //   text: '启用',
      //   id: 1,
      //   type: 'success'
      // },
      {
        name: 'delete',
        text: '删除',
        id: 3,
        type: 'danger'
      }
      ],
      1: [{
        name: 'editor',
        text: '编辑',
        id: 0,
        type: 'primary'
      }, {
        name: 'disable',
        text: '禁用',
        id: 2,
        type: ''
      },
      {
        name: 'delete',
        text: '删除',
        id: 3,
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
  key: 2,
  valueCn: '停用'
}
]

const sexOptions = [{
  key: 0,
  valueCn: '男'
},
{
  key: 1,
  valueCn: '女'
}
]

const roleOptions = [{
  key: 10008,
  valueCn: '管理员'
},
{
  key: 10009,
  valueCn: '业务员'
}
]
