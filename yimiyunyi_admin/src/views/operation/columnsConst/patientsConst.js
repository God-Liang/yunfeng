import { getAge } from '@/utils/index'
export {
  tableAttr
}
const tableAttr = {
  thead: [
    {
      label: 'name',
      text: '姓名'
    },
    {
      label: 'sex',
      text: '性别',
      width: 60,
      render: (h, row) => {
        const sexOptions = ['男', '女']
        return sexOptions[row.sex]
      }
    },
    {
      label: 'birthday',
      text: '年龄',
      width: 60,
      render: (h, row) => {
        return getAge(row.birthday)
      }
    },
    {
      label: 'phone',
      text: '手机号'
    },
    {
      label: 'teamName',
      text: '团队名称'
    },
    {
      label: 'operationName',
      text: '手术名称'
    },
    {
      label: 'identity',
      text: '身份证号'
    },
    {
      label: 'createTime',
      text: '关注团队时间'
    },
    {
      label: 'type',
      text: '状态',
      width: 80,
      render: (h, row) => {
        const statusOptions = ['未完善', '已完善']
        const tags = ['danger', 'success']
        return h('el-tag', {
          attrs: {
            type: tags[row.type]
          }
        }, statusOptions[row.type])
      }
    }
  ],
  buttons: {
    operation: {
      0: [{
        name: 'perfect',
        text: '完善手术信息',
        id: 0,
        type: 'text'
      }]
    }
  }
}
