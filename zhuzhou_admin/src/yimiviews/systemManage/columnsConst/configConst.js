export { theadList1, theadList2, operationButtons1, operationButtons2, statusArr, departmentArr, professionalTitleArr, dialogLeftTop1_1_data_rules }
const theadList1 = [
  {
    label: 'avatar',
    text: '头像'
  },
  {
    label: 'name',
    text: '医生姓名'
  },
  {
    label: 'departId',
    text: '所在科室'
  },
  {
    label: 'titleShow',
    text: '职称'
  },
  {
    label: 'phone',
    text: '联系电话'
  },
  {
    label: 'status',
    text: '状态'
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
    label: 'card',
    text: '就诊卡号'
  },
  {
    label: 'operateDoctor',
    text: '主刀医生'
  },
  {
    label: 'operateSurgery',
    text: '预约手术'
  },
  {
    label: 'expectTime',
    text: '预约时间'
  },
  {
    label: 'telephone',
    text: '联系电话'
  },
  {
    label: 'anesthesia',
    text: '麻醉'
  },
  {
    label: 'anesthesiaDoctor',
    text: '麻醉医生'
  }
]
const operationButtons1 = [{
  name: 'add',
  text: '编辑',
  id: 0,
  type: 'primary'
},
{
  name: 'delete',
  text: '删除',
  id: 1,
  type: 'danger'
}]
const operationButtons2 = [{
  name: 'add',
  text: '核对详情',
  id: 0,
  type: 'primary'
}]
const statusArr = ['禁用', '正常']
const departmentArr = [
  {
    label: '部门1',
    value: 1
  },
  {
    label: '部门2',
    value: 2
  },
  {
    label: '部门3',
    value: 3
  }
]
const professionalTitleArr = [
  {
    label: '职称1',
    value: 'zhicheng1'
  },
  {
    label: '职称2',
    value: 'zhicheng2'
  },
  {
    label: '职称3',
    value: 'zhicheng3'
  }
]
const dialogLeftTop1_1_data_rules = {
  card: [
    { required: true, message: '请输入就诊卡号', trigger: ['blur', 'change'] }
  ],
  ID: [
    { required: true, message: '请输入身份证号', trigger: ['blur', 'change'] }
  ],
  name: [
    { required: true, message: '请输入姓名', trigger: ['blur', 'change'] }
  ],
  doctor: [
    { required: true, message: '请选择主刀医生', trigger: 'change' }
  ],
  surgery: [
    { required: true, message: '请选择手术', trigger: 'change' }
  ],
  expectTime: [
    { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
  ],
  telephone: [
    { required: true, message: '请输入手机号', trigger: ['blur', 'change'] }
  ]
}
