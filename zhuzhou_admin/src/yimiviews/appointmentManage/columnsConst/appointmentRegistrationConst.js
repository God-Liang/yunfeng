export { theadList1, theadList2, operationButtons1, operationButtons2, statusList, keyWordList, keyWordList1 }
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
    label: 'visitId',
    text: '就诊卡号'
  },
  {
    label: 'idCard',
    text: '身份证号'
  },
  {
    label: 'doctorName',
    text: '预约医生'
  },
  {
    label: 'operationName',
    text: '预约手术'
  },
  {
    label: 'phone',
    text: '联系电话'
  },
  {
    label: 'createName',
    text: '申请人'
  },
  {
    label: 'createTime',
    text: '申请时间'
  }
]
const theadList2 = JSON.parse(JSON.stringify(theadList1))
const operationButtons1 = [
  [{
    name: 'outpatientReg',
    text: '门诊登记',
    id: 1,
    type: 'primary'
  }],
  [{
    name: 'add',
    text: '预约登记',
    id: 0,
    type: 'primary'
  }],
  [{
    name: 'audit',
    text: '登记审核',
    id: 2,
    type: 'success'
  }]
]
const operationButtons2 = [
  {
    name: 'add',
    text: '重新预约',
    id: 0,
    type: 'primary'
  }
]
const statusList = [
  {
    label: '门诊登记',
    value: 0
  },
  {
    label: '预约登记',
    value: 1
  },
  {
    label: '审核',
    value: 2
  }
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
const keyWordList1 = [
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
  },
  {
    label: '申请人',
    value: 3
  },
  {
    label: '预约医生',
    value: 4
  }
]
