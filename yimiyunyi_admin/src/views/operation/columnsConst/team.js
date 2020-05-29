export {
  tableAttr,
  statusOptions,
  sexOptions
}
const tableAttr = {
  thead: [
    {
      label: 'avatar',
      text: '头像',
      width: 60,
      render: (h, row) => {
        const img = require('@/assets/img/teamAvatar.png')
        return h('img', {
          style: {
            width: '30px',
            height: '30px',
            'border-radius': '50%',
            'object-fit': 'cover'
          },
          attrs: {
            src: row.avatar || img
          }
        })
      }
    },
    {
      label: 'typeShow',
      text: '团队类型',
      width: 100
    },
    {
      label: 'name',
      text: '团队名称'
    },
    {
      label: 'hospital',
      text: '所在医院'
    },
    {
      label: 'ownerName',
      text: '创建人',
      width: 150
    },
    {
      label: 'createTime',
      text: '创建时间',
      width: 150
    },
    {
      label: 'verifyStatus',
      text: '状态',
      width: 100,
      render: (h, row) => {
        const statusOptions = ['待审核', '审核通过', '审核不通过', '已注销']
        const tags = ['warning', 'success', 'danger']
        return h('el-tag', {
          attrs: {
            type: tags[row.verifyStatus]
          }
        }, statusOptions[row.verifyStatus])
      }
    }
  ],
  buttons: {
    statusName: 'verifyStatus',
    width: 160,
    operation: {
      0: [{
        name: 'editor',
        text: '审核',
        id: 0,
        type: 'text'
      },
      {
        name: 'enable',
        text: '查看',
        id: 1,
        type: 'text'
      }],
      1: [{
        name: 'enable',
        text: '查看',
        id: 1,
        type: 'text'
      }],
      2: [{
        name: 'enable',
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
