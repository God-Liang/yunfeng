<template lang="pug">
  .lg-cascader
    Popup(v-model="showPopup" :close-on-click-overlay="false" position="bottom" :style="{ height: '40%' }")
      Picker(ref="cascader" show-toolbar :columns="columns" @cancel="onCancel" @confirm="onConfirm" @change="onChange")
</template>
<script>
import { Popup, Picker } from 'vant'
export default {
  components: { Popup, Picker },
  props: {
    isShow: {
      type: Boolean,
      default: false
    },
    value: {},
    list: {
      type: Array,
      default: function () {
        return []
      }
    },
    prop: {
      type: Object,
      default: function () {
        return {
          label: 'label',
          value: 'value',
          children: 'children'
        }
      }
    }
  },
  watch: {
    isShow (newVal, oldVal) {
      if (newVal) {
        this.open()
      } else {
        this.close()
      }
    }
  },
  data () {
    return {
      selectVal: [],
      columns: [
        {
          values: [],
          className: 'column1',
          defaultIndex: 0
        },
        {
          values: [],
          className: 'column2',
          defaultIndex: 0
        }
      ],
      showPopup: false
    }
  },
  methods: {
    open () {
      this.$nextTick(() => {
        this.showPopup = true
        this.handlerLabel()
      })
    },
    close () {
      this.$nextTick(() => {
        this.showPopup = false
      })
    },
    // 改变值
    onChange (picker, val) {
      const value = this.prop.value
      const children = this.prop.children
      if (this.selectVal[0] === val[0]) {
        this.selectVal = val
      } else {
        this.selectVal[0] = val[0]
        this.columns[0].values.map((v, i) => {
          if (v === val[0]) {
            const list = this.list[i][children]
            const columns2 = []
            list.map(v => {
              columns2.push(v[value])
            })
            this.columns[1].values = columns2
            picker.setColumnValues(1, columns2)
            this.selectVal[1] = columns2[0]
          }
        })
      }
    },
    onConfirm () {
      this.$emit('confirm', this.selectVal[1])
    },
    onCancel () {
      this.$emit('cancel')
    },
    // 过滤列表数据
    handlerLabel () {
      let list2 = []
      const value = this.prop.value
      const children = this.prop.children
      if (this.list.length > 0) {
        if (this.value) {
          this.list.map((e1, i1) => {
            if (e1[children] && e1[children].length > 0) {
              e1[children].map((e2, i2) => {
                if (e2[value] === this.value) {
                  list2 = e1[children]
                  this.columns[0].defaultIndex = i1
                  this.columns[1].defaultIndex = i2
                  this.columns[0].editorIndex = i1
                  this.columns[1].editorIndex = i2
                }
              })
            } else {
              if (e1[value] === this.value) {
                list2 = []
                this.columns[0].defaultIndex = i1
                this.columns[1].defaultIndex = 0
                this.columns[0].editorIndex = i1
                this.columns[1].editorIndex = 0
              }
            }
          })
        } else {
          list2 = this.list[0][children]
          this.columns[0].defaultIndex = 0
          this.columns[1].defaultIndex = 0
          this.columns[0].editorIndex = 0
          this.columns[1].editorIndex = 0
        }
        const columns1 = []
        this.list.map((e1, i1) => {
          columns1.push(e1[value])
        })
        this.columns[0].values = columns1
        this.getColumns(list2)
      }
    },
    // 处理二级列表数据
    getColumns (list) {
      const value = this.prop.value
      const columns2 = []
      list.map(v => {
        columns2.push(v[value])
      })
      this.columns[1].values = columns2
      const index1 = this.columns[0].values[this.columns[0].editorIndex]
      const index2 = this.columns[1].values[this.columns[1].editorIndex]
      this.selectVal = [index1, index2]
      this.$nextTick(() => {
        this.$refs.cascader.setColumnValues(1, columns2)
        this.$refs.cascader.setIndexes([this.columns[0].editorIndex, this.columns[1].editorIndex])
      })
    }
  }
}
</script>
