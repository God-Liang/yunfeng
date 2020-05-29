export default (_self, h) => {
  return [
    h('el-checkbox-group', {
      props: {
        value: _self.obj.value || []
      },
      on: {
        'change': function(arr) {
        }
      }
    }, _self.obj.items.map(v => {
      return h('el-checkbox', {
        props: {
          label: v.label_value
        },
        on: {
          change: function(arr) {
            if (!_self.obj.name) {
              return false
            }
            if (arr) {
              _self.obj.value.push(v.label_value)
            } else {
              var index = _self.obj.value.indexOf(v.label_value)
              if (index > -1) {
                _self.obj.value.splice(index, 1)
              }
            }
            _self.$emit('handleChangeVal', _self.obj.value)
          }
        }
      }, v.label_name)
    }))
  ]
}

export const checkBoxConf = {
  // 对应数据库内类型
  type: 'checkbox',
  // 是否可配置
  config: true,
  // 控件左侧label内容
  label: '多选框',
  // 是否显示行内元素
  inlineBlock: false,
  // 是否必填
  require: true,
  // 绑定的值
  value: [],
  // 选项内数据
  items: [{ 'label_value': '1', 'label_name': '单选框1' }, { 'label_value': '2', 'label_name': '单选框2' }],
  // 表单name
  name: '',
  // 验证错误提示信息
  ruleError: '该选项不能为空',
  // 是否关联字段
  relation: false,
  // 关联字段name
  relation_name: '',
  // 关联字段value
  relation_value: '',
  // 是否被渲染
  visibility: true
}
