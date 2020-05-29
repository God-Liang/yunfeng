export { theadList1, theadList2, theadList3, operationpendingButtons, operationDoneButtons, moreOperate }
const theadList1 = [
  {
    label: 'name',
    text: '姓名'
  },
  {
    label: 'gender',
    text: '性别'
  },
  {
    label: 'age',
    text: '年龄'
  },
  {
    label: 'telephone',
    text: '联系电话'
  },
  {
    label: 'ID',
    text: '身份证号'
  },
  {
    label: 'doctor',
    text: '主刀医生'
  },
  {
    label: 'surgery',
    text: '手术名称'
  },
  {
    label: 'expectTime',
    text: '手术时间'
  },
  {
    label: 'currentStep',
    text: '当前手术路径'
  },
  {
    label: 'origin',
    text: '预约来源'
  }
]
const theadList2 = [
  {
    label: 'name',
    text: '姓名'
  },
  {
    label: 'gender',
    text: '性别'
  },
  {
    label: 'age',
    text: '年龄'
  },
  {
    label: 'telephone',
    text: '联系电话'
  },
  {
    label: 'ID',
    text: '身份证号'
  },
  {
    label: 'doctor',
    text: '主刀医生'
  },
  {
    label: 'surgery',
    text: '手术名称'
  },
  {
    label: 'expectTime',
    text: '手术时间'
  },
  {
    label: 'currentStep',
    text: '当前手术路径'
  },
  {
    label: 'origin',
    text: '预约来源'
  }
]
const theadList3 = [
  {
    label: 'name',
    text: '姓名'
  },
  {
    label: 'gender',
    text: '性别'
  },
  {
    label: 'age',
    text: '年龄'
  },
  {
    label: 'telephone',
    text: '联系电话'
  },
  {
    label: 'ID',
    text: '身份证号'
  },
  {
    label: 'doctor',
    text: '主刀医生'
  },
  {
    label: 'surgery',
    text: '手术名称'
  },
  {
    label: 'expectTime',
    text: '手术时间'
  },
  {
    label: 'leaveType',
    text: '离院类型'
  },
  {
    label: 'origin',
    text: '预约来源'
  }
]
const operationpendingButtons = [
  {
    name: 'add',
    text: '预约处理',
    event: 'fun(scope.row)',
    type: 'primary'
  },
  {
    name: 'delete',
    text: '取消预约',
    event: 'fun(scope.row)',
    type: 'danger'
  },
  {
    name: 'add2',
    text: '调阅病例',
    event: 'fun(scope.row)',
    type: 'warning'
  }
]
const operationDoneButtons = [
  {
    name: 'add',
    text: '重新预约',
    event: 'fun(scope.row)',
    type: 'primary'
  }]
const moreOperate = [
  {
    'key': 'excle',
    'label': '导出EXCEL',
    'value': 'excle'
  },
  {
    'key': 'massMessage',
    'label': '群发短信',
    'value': 'massMessage'
  },
  {
    'key': 'massPAE',
    'label': '群发宣教',
    'value': 'massPAE'
  },
  {
    'key': 'massForms',
    'label': '群发表单',
    'value': 'massForms'
  }
]
