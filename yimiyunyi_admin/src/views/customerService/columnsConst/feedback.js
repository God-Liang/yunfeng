export {
  tableAttr,
  statusOptions,
  sexOptions
}
const tableAttr = {
  thead: [
    {
      label: 'accessoryUrl',
      text: '头像',
      width: 60,
      render: (h, row) => {
        return h('img', {
          style: {
            width: '30px',
            height: '30px',
            'border-radius': '50%',
            'object-fit': 'cover'
          },
          attrs: {
            src: row.accessoryUrl
          }
        })
      }
    },
    {
      label: 'source',
      text: '来源',
      width: 60,
      render: (h, row) => {
        const statusOptions = ['患者端', '医生端']
        return h('span', statusOptions[row.source])
      }
    },
    {
      label: 'content',
      text: '意见与反馈'
    },
    {
      label: 'createName',
      text: '提交人',
      width: 80
    },
    {
      label: 'createTime',
      text: '提交时间',
      width: 150
    },
    {
      label: 'status',
      text: '状态',
      width: 80,
      render: (h, row) => {
        const statusOptions = ['待处理', '已处理']
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
    width: 100,
    operation: {
      0: [{
        name: 'editor',
        text: '处理',
        id: 0,
        type: 'text'
      }],
      1: [{
        name: 'look',
        text: '查看',
        id: 1,
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
