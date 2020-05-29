export { theadList1, theadList2, theadList3, statusArr, statusArr1, statusList, operationButtons }
const theadList1 = [
  {
    label: 'patientName',
    text: '姓名'
  },
  {
    label: 'sexShow',
    text: '性别'
  },
  {
    label: 'age',
    text: '年龄'
  },
  {
    label: 'operationRoomName',
    text: '手术室'
  },
  {
    label: 'beforeDiagnosis',
    text: '术前诊断'
  },
  {
    label: 'operationName',
    text: '拟行手术'
  },
  {
    label: 'anesthetistTypeShow',
    text: '麻醉方式'
  },
  {
    label: 'schedule',
    text: '手术日期'
  },
  {
    label: 'doctorName',
    text: '主刀医生'
  },
  {
    label: 'updateTime',
    text: '更新时间'
  }
]
const theadList2 = [
  {
    label: 'operationOrder',
    text: '顺序'
  },
  {
    label: 'patientName',
    text: '姓名'
  },
  {
    label: 'sexShow',
    text: '性别'
  },
  {
    label: 'age',
    text: '年龄'
  },
  {
    label: 'operationRoomName',
    text: '手术室'
  },
  {
    label: 'beforeDiagnosis',
    text: '术前诊断'
  },
  {
    label: 'operationName',
    text: '拟行手术'
  },
  {
    label: 'anesthetistTypeShow',
    text: '麻醉方式'
  },
  {
    label: 'schedule',
    text: '手术日期'
  },
  {
    label: 'doctorName',
    text: '主刀医生'
  },
  {
    label: 'updateTime',
    text: '更新时间'
  },
  {
    label: 'checkedStatus',
    text: '状态'
  }
]
const theadList3 = [
  {
    label: 'operationOrder',
    text: '顺序'
  },
  {
    label: 'patientName',
    text: '姓名'
  },
  {
    label: 'sexShow',
    text: '性别'
  },
  {
    label: 'age',
    text: '年龄'
  },
  {
    label: 'operationRoomName',
    text: '手术室'
  },
  {
    label: 'beforeDiagnosis',
    text: '术前诊断'
  },
  {
    label: 'operationName',
    text: '拟行手术'
  },
  {
    label: 'anesthetistTypeShow',
    text: '麻醉方式'
  },
  {
    label: 'schedule',
    text: '手术日期'
  },
  {
    label: 'doctorName',
    text: '主刀医生'
  },
  {
    label: 'updateTime',
    text: '更新时间'
  }
]
const statusList = [
  {
    label: '待提交',
    value: 5
  },
  {
    label: '待审核',
    value: 6
  }
]
const statusArr = ['', '', '', '', '', '未提交', '未审核']
const statusArr1 = ['未确认', '已确认']
const operationButtons = [
  [],
  [],
  [],
  [],
  [],
  [{
    name: 'submit',
    text: '提交',
    id: 0,
    type: 'primary'
  }],
  [{
    name: 'audit',
    text: '审核',
    id: 1,
    type: 'success'
  }]
]
for (let i = 0; i < 8; i++) {
  operationButtons.push([{
    name: 'audit',
    text: '已审核',
    id: 2,
    type: 'text',
    color: '#ccc'
  }])
  statusArr.push('已审核')
}

