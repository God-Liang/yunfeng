<template>
  <div class="lg-picker">
    <Popup v-model="showPopup" :close-on-click-overlay="false" position="bottom" :style="{ height: '40%' }">
      <Picker show-toolbar ref="picker" :default-index="defIndex" :columns="columns" @cancel="onCancel" @confirm="onConfirm" @change="onChange"></Picker>
    </Popup>
  </div>
</template>
<script>
import { Popup, Picker } from 'vant'
export default {
  components: { Popup, Picker },
  props: {
    value: {},
    isShow: {
      type: Boolean,
      default: false
    },
    columns: {
      type: Array,
      default: function () {
        return []
      }
    },
    defaultIndex: {
      type: Number,
      default: 0
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
      selectVal: '',
      showPopup: false,
      defIndex: 0
    }
  },
  mounted () {

  },
  methods: {
    open () {
      this.$nextTick(() => {
        this.showPopup = true
        this.handlerSelectVal()
      })
    },
    close () {
      this.showPopup = false
    },
    handlerSelectVal () {
      if (this.value) {
        this.columns.map((v, i) => {
          if (this.value === v.text) {
            this.selectVal = v.text
            this.defIndex = i
            this.$nextTick(() => {
              this.$refs.picker.setIndexes([i])
            })
          }
        })
      } else {
        if (this.defaultIndex) {
          this.selectVal = this.columns[this.defaultIndex].text
          this.defIndex = this.defaultIndex
          this.$nextTick(() => {
            this.$refs.picker.setIndexes([this.defaultIndex])
          })
        } else {
          this.selectVal = this.columns[0].text
          this.defIndex = 0
          this.$nextTick(() => {
            this.$refs.picker.setIndexes([0])
          })
        }
      }
    },
    // 选中
    onChange (picker, e) {
      this.selectVal = e.text
    },
    // 取消
    onCancel (e) {
      this.$emit('cancel')
    },
    // 确定
    onConfirm (e) {
      this.$emit('confirm', this.selectVal)
    }
  }
}
</script>
