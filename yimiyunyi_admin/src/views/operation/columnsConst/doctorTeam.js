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
      label: 'name',
      text: '团队名称'
    },
    {
      label: 'typeShow',
      text: '团队类型',
      width: 100
    },
    {
      label: 'memberNum',
      text: '团队人数',
      width: 100
    },
    {
      label: 'ownerName',
      text: '团队创建人'
    },
    {
      label: 'createTime',
      text: ' 创建时间',
      width: 150
    }
  ]
}
