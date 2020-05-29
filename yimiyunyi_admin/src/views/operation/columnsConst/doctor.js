export {
  tableAttr
}
const tableAttr = {
  thead: [
    {
      label: 'avatar',
      text: '头像',
      width: 60,
      render: (h, row) => {
        const img = require('@/assets/img/doctor.png')
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
      label: 'nick',
      text: '姓名',
      width: 150
    },
    {
      label: 'professionCallShow',
      text: '职务'
    },
    {
      label: 'doctorHospital',
      text: '所在医院'
    },
    {
      label: 'phone',
      text: '账号',
      width: 100
    },
    {
      label: 'createTime',
      text: '提交时间',
      width: 150
    },
    {
      label: 'verifyStatus',
      text: '状态',
      width: 80,
      render: (h, row) => {
        const statusOptions = ['已拒绝', '已认证', '待审核', '已注销', '待认证']
        const tags = ['danger', 'success', 'warning', 'info', 'warning']
        return h('el-tag', {
          attrs: {
            type: tags[row.verifyStatus]
          }
        }, statusOptions[row.verifyStatus])
      }
    }
  ],
  buttons: {
    statusName: 'famousDoctor',
    width: 240,
    operation: {
      0: [{
        name: 'editor',
        text: '认证',
        id: 0,
        type: 'text',
        statusName: 'verifyStatus',
        statusValue: 2
      },
      {
        name: 'reason',
        text: '拒绝理由',
        id: 4,
        type: 'text',
        statusName: 'verifyStatus',
        statusValue: 0
      },
      {
        name: 'enable',
        text: '查看',
        id: 1,
        type: 'text'
      },
      {
        name: 'set',
        text: '设置名医',
        id: 2,
        type: 'text'
      }],
      1: [{
        name: 'editor',
        text: '认证',
        id: 0,
        type: 'text',
        statusName: 'verifyStatus',
        statusValue: 2
      },
      {
        name: 'reason',
        text: '拒绝理由',
        id: 4,
        type: 'text',
        statusName: 'verifyStatus',
        statusValue: 0
      },
      {
        name: 'enable',
        text: '查看',
        id: 1,
        type: 'text'
      },
      {
        name: 'delete',
        text: '取消名医',
        id: 3,
        type: 'text'
      }]
    }
  }
}
