export {
  tableAttr,
  typeOptions,
  statusOptions
}

const tableAttr = {
  // 表头
  thead: [{
    label: 'gysmc',
    text: '供应商名称',
    width: 250
  },
  {
    label: 'gysdm',
    text: '供应商代码'
  },
  {
    label: 'is_bind',
    text: '是否已匹配'
  }
  ],
  statusName: 'is_bind',
  // 操作按钮
  buttons: {
    status: true, // 是否区分操作状态 true：根据当前列的数据状态值使用operation[状态值]; false：使用operation[0]
    width: 300, // 表格操作列的宽度
    operation: { // 操作按钮配置
      'true': [{
        name: 'look',
        text: '重新匹配',
        id: 0,
        type: 'primary'
      },
      {
        name: 'relieve',
        text: '解除关系',
        id: 1,
        type: 'info'
      },
      {
        name: 'delete',
        text: '删除',
        id: 2,
        type: 'danger'
      }
      ],
      'false': [{
        name: 'pp',
        text: '匹配',
        id: 0,
        type: 'primary'
      },
      {
        name: 'delete',
        text: '删除',
        id: 2,
        type: 'danger'
      }]
    }
  }
}
const statusOptions = [{
  value: '',
  label: '全部'
},
{
  value: 1,
  label: '正常'
},
{
  value: 4,
  label: '被解除'
}
]
const typeOptions = [{
  value: 0,
  label: '全部'
},
{
  value: 1,
  label: '直销客户'
},
{
  value: 2,
  label: '分销客户'
}
]
