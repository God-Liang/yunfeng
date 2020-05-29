export {
  tableAttr,
  statusOptions,
  payOptions
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
    width: 300, // 表格操作列的宽度
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
  label: '已通过'
},
{
  value: 4,
  label: '被解除'
}
]
const payOptions = [{
  value: 0,
  label: '全部'
},
{
  value: 1,
  label: '未设置'
},
{
  value: 2,
  label: '账期支付'
},
{
  value: 3,
  label: '实时支付'
}
]
