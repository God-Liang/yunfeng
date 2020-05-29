export {
  tableAttr
}
const tableAttr = {
  thead: [
    {
      label: 'landingLocation',
      text: '登录地址'
    },
    {
      label: 'ipAddress',
      text: '登录IP'
    },
    {
      label: 'landingTime',
      text: '登录时长'
    },
    {
      label: 'createTime',
      text: '登录时间'
    },
    {
      label: 'type',
      text: '状态',
      render: (h, row) => {
        const statusOptions = ['正常', '异常登录']
        const tags = ['success', 'danger']
        return h('el-tag', {
          attrs: {
            type: tags[row.type]
          }
        }, statusOptions[row.type])
      }
    }
  ]
}
