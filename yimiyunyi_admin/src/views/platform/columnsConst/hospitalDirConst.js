export {
  tableAttr,
  hospitalLevelOptions
}
const tableAttr = {
  thead: [
    {
      label: 'name',
      text: '医院名称'
    },
    {
      label: 'type',
      text: '医院等级',
      width: 100
    },
    {
      label: 'address',
      text: '地址',
      render: (h, row) => {
        const province = row.province ? row.province : ''
        const city = row.city ? row.city : ''
        const area = row.area ? row.area : ''
        const address = row.address ? row.address : ''
        return province + city + area + address
      }
    },
    {
      label: 'phone',
      text: '手机号',
      width: 120
    }
  ],
  buttons: {
    width: 160,
    operation: {
      0: [{
        name: 'editor',
        text: '编辑',
        id: 0,
        type: 'text'
      },
      {
        name: 'delete',
        text: '删除',
        id: 1,
        type: 'text'
      }]
    }
  }
}
const hospitalLevelOptions = [
  {
    value: '一级甲等',
    label: '一级甲等'
  },
  {
    value: '一级乙等',
    label: '一级乙等'
  },
  {
    value: '一级丙等',
    label: '一级丙等'
  },
  {
    value: '二级甲等',
    label: '二级甲等'
  },
  {
    value: '二级乙等',
    label: '二级乙等'
  },
  {
    value: '二级丙等',
    label: '二级丙等'
  },
  {
    value: '三级甲等',
    label: '三级甲等'
  },
  {
    value: '三级乙等',
    label: '三级乙等'
  },
  {
    value: '三级丙等',
    label: '三级丙等'
  },
  {
    value: '三级特等',
    label: '三级特等'
  }
]
