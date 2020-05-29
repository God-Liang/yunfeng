export {
  tableAttr
}

const tableAttr = {
  // 表头
  thead: [{
    label: 'company_name',
    text: '单位名称',
    width: 250,
    key: 'org_emp_id'
  },
  {
    label: 'apply_remark',
    text: '申请说明'
  },
  {
    label: 'relation_type',
    text: '关系类型'
  },
  {
    label: 'create_date',
    text: '申请时间',
    width: 200
  }
  ],
  // 操作按钮
  buttons: {
    status: true, // 是否区分操作状态 true：根据当前列的数据状态值使用operation[状态值]; false：使用operation[0]
    width: 300, // 表格操作列的宽度
    operation: { // 操作按钮配置
      0: [{
        name: 'pass',
        text: '通过',
        id: 0,
        type: 'primary'
      },
      {
        name: 'noPass',
        text: '拒绝',
        id: 1,
        type: 'primary'
      },
      {
        name: 'ignore',
        text: '忽略',
        id: 2,
        type: 'primary'
      }
      ],
      1: [{
        name: 'alreadyPass',
        text: '已通过',
        id: 3,
        type: 'text',
        color: '#999'
      }],
      2: [{
        name: 'alreadyNoPass',
        text: '已拒绝',
        id: 4,
        type: 'text',
        color: '#ff4949'
      }],
      3: [{
        name: 'alreadyIgnore',
        text: '已忽略',
        id: 4,
        type: 'text',
        color: '#999'
      }],
      4: [{
        name: 'alreadyOut',
        text: '已解除',
        id: 4,
        type: 'text',
        color: '#ff4949'
      }],
      5: [{
        name: 'wait',
        text: '待通过',
        id: 5,
        type: 'text',
        color: '#999'
      }]
    }
  }
}
