export { theadList1, theadList2, statusArr, operationButtons, keyWordList }
const theadList1 = [
  {
    label: 'patientName',
    text: '患者姓名'
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
  }
]
const theadList2 = [
  {
    label: 'patientName',
    text: '患者姓名'
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
  }
]
const statusArr = ['未提交', '已提交']

const operationButtons = [
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  [{
    name: 'register',
    text: '报到',
    id: 0,
    type: 'primary'
  }],
  [{
    name: 'register',
    text: '已报到',
    id: 1,
    type: 'text',
    color: '#333'
  }]
]
const keyWordList = [
  {
    label: '患者姓名',
    value: 0
  },
  {
    label: '手机后四位',
    value: 1
  },
  {
    label: '就诊卡号',
    value: 2
  }
]
