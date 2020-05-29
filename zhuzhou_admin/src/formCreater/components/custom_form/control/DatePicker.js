// import moment from 'moment'
export default (_self, h) => {
  return [
    h('el-date-picker', {
      props: {
        placeholder: _self.obj.placeholder || (_self.obj.name ? '' : '请选择日期'),
        type: (!_self.obj.format || _self.obj.format === 'yyyy-MM-dd') ? 'date' : 'datetime',
        'value-format': _self.obj.format || 'yyyy-MM-dd',
        'format': _self.obj.format || 'yyyy-MM-dd',
        value: _self.obj.value
      },
      on: {
        'input': function(value) { // 此时的change 事件不被触发
          if (!_self.obj.name) {
            return false
          }
          _self.obj.value = value
          _self.$emit('handleChangeVal', value)
        }
      }
    })
  ]
}

export const datePickerConf = {
  // 对应数据库内类型
  type: 'datepicker',
  // 是否可配置
  config: true,
  // 控件左侧label内容
  label: '时间选择',
  placeholder: '请选择日期',
  // 是否显示行内元素
  inlineBlock: false,
  // 是否必填
  require: true,
  // 表单name
  name: '',
  // 绑定的值
  value: '',
  // 验证错误提示信息
  ruleError: '选项不能为空',
  // 是否关联字段
  relation: false,
  // 关联字段name
  relation_name: '',
  // 关联字段value
  relation_value: '',
  // 是否被渲染
  visibility: true,
  // 是否需要时分
  format: 'yyyy-MM-dd'
}
