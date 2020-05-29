<template lang="pug">
  .lg-filter-select
    Popup.lg-filter-select-popup(v-model="showPopup" :close-on-click-overlay="false" position="bottom")
      .van-hairline--top-bottom.van-picker__toolbar
        Button.van-picker__cancel(type="button" @click="onCancel") 取消
        Button.van-picker__confirm(type="button" @click="onConfirm") 确认
      .select-filter-box
        .filter-box
          Field.filterInput(v-model="lgKeyWord" @input="onInputFilter" clearable placeholder="请输入过滤条件")
          span.iconfont.iconsousuo-m(v-if="lgKeyWord === ''")
        .select-box(v-if="list.length>0")
          .select-box-list
            .select-box-item(v-for="(item, index) in list" :key="index" :class="selectVal===item.name?'active':''" @click="onSelect(item)")
              span.select-box-item-label {{item.name}}
              span.select-box-item-isSelect.iconfont.icondui
        .select-filter-null(v-else) 暂无数据
</template>
<script>
import { Popup, Button, Field } from 'vant'
import '@/assets/iconfont/iconfont.css'
export default {
  components: { Popup, Button, Field },
  data () {
    return {
      lgKeyWord: '',
      selectVal: '',
      selectObj: {},
      showPopup: false
    }
  },
  props: {
    isShow: {
      type: Boolean,
      default: false
    },
    list: {
      type: Array,
      default: function () {
        return []
      }
    },
    value: {
      type: String,
      default: ''
    }
  },
  watch: {
    isShow (newVal) {
      if (newVal) {
        this.open()
        this.selectVal = this.value
      } else {
        this.close()
      }
    }
  },
  methods: {
    open () {
      this.$nextTick(() => {
        this.showPopup = true
      })
    },
    close () {
      this.$nextTick(() => {
        this.showPopup = false
      })
    },
    onInputFilter (val) {
      this.lgKeyWord = val
      this.$emit('filter', this.lgKeyWord)
    },
    // 选择
    onSelect (data) {
      this.selectVal = data.name
      this.selectObj = data
    },
    // 取消
    onCancel () {
      this.$emit('cancel')
    },
    // 确认
    onConfirm () {
      this.$emit('confirm', this.selectVal, this.selectObj)
    }
  }
}
</script>
<style lang="scss">
.filterInput {
  height: 30px;
  line-height: 30px;
  padding: 0 10px !important;
  border-radius: 5px;
}
.lg-filter-select {
  .van-cell:not(:last-child)::after {
    display: none !important;
  }
}
</style>
<style lang="scss" scoped>
.lg-filter-select {
  &-popup {
    height: 300px;
    .select-filter-box {
      .filter-box {
        width: 80%;
        margin: 10px 10%;
        border: 1px solid #dcdcdc;
        border-radius: 5px;
        position: relative;
        .iconsousuo-m {
          position: absolute;
          right: 10px;
          top: 7px;
          color: #888888;
        }
      }
      .select-box {
        width: 100vw;
        &-list {
          display: flex;
          flex-direction: column;
          padding: 10px 0;
          height: 200px;
          box-sizing: border-box;
          overflow-y: scroll;
          .select-box-item {
            padding: 0 20px;
            box-sizing: border-box;
            width: 100%;
            line-height: 30px;
            &-label {
              color: #333333;
              font-size: 14px;
              float: left;
              display: inline-block;
              width: 280px;
              overflow: hidden;
              text-overflow:ellipsis;
              white-space: nowrap;
            }
            &-isSelect {
              display: none;
              color: #03A9AC;
              float: right;
            }
            &.active {
              .select-box-item-isSelect {
                display: block;
              }
            }
          }
        }
      }
    }
  }
}
</style>
