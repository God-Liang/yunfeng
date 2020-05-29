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
      render: (h, row) => {
        const img = require('@/assets/img/doctor.png')
        return h('img', {
          style: {
            width: '30px',
            height: '30px',
            'border-radius': '50%'
          },
          attrs: {
            src: row.avatar || img
          }
        })
      }
    },
    {
      label: 'name',
      text: '姓名'
    },
    {
      label: 'jobType',
      text: '职务'
    },
    {
      label: 'doctorHospital',
      text: '所在医院'
    },
    {
      label: 'createTime',
      text: '创建时间',
      width: 150
    },
    {
      label: 'typeShow',
      text: '身份'
    },
    {
      label: 'verifyStatus',
      text: '状态',
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
    statusName: 'verifyStatus',
    width: 200,
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
