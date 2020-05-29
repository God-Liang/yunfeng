export {
  tableAttr,
  typeOptions,
  statusOptions
}

const tableAttr = {
  // 表头
  thead: [{
    label: 'company_name',
    text: '单位名称',
    width: 250
  },
  {
    label: 'company_type',
    text: '单位类型'
  },
  {
    label: 'org_type',
    text: '单位性质'
  },
  {
    label: 'bank_card',
    text: '银行账号',
    width: 200
  },
  {
    label: 'setup_date',
    text: '关系建立日期',
    width: 200
  }
  ],
  // 操作按钮
  buttons: {
    status: false, // 是否区分操作状态 true：根据当前列的数据状态值使用operation[状态值]; false：使用operation[0]
    width: 200, // 表格操作列的宽度
    operation: { // 操作按钮配置
      0: [{
        name: 'look',
        text: '查看',
        id: 0,
        type: 'primary'
      },
      {
        name: 'relieve',
        text: '解除关系',
        id: 1,
        type: 'primary'
      }
      ]
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
