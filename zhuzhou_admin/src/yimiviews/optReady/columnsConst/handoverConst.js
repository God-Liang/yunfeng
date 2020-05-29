export { theadList1, statusArr, operationButtons1, operationButtons2, keyWordList }
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
    label: 'schedule',
    text: '预约手术时间'
  },
  {
    label: 'phone',
    text: '联系电话'
  }
]
const statusArr = ['评估不通过', '评估通过']
const operationButtons1 = [
  {
    name: 'optReady',
    text: '交接登记',
    id: 0,
    type: 'primary'
  }
]
const operationButtons2 = [
  {
    name: 'detail',
    text: '上传',
    id: 1,
    type: 'primary'
  },
  {
    name: 'download',
    text: '下载',
    id: 2,
    type: 'danger'
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
