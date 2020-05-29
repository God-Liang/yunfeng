<template lang="pug">
  .lgSelectGroup
    .select_group_box
      .select_group_box_title {{title}}
      .select_group_box_list(v-if="!moreShow" :style="'width:'+width+'px'")
        .select_group_box_list_item(:class="value === item[props.value]?'active':''" v-for="(item, index) in list" :key="index" @click="click(item)") {{item[props.label]}}
      el-button.moreBtn(v-if="selectData.length > list.length" type="text" @click="onMore") 更多
        i.el-icon--right.el-icon-caret-bottom(v-if="!moreShow")
        i.el-icon--right.el-icon-caret-top(v-else)
      .select_group_box_more(v-if="moreShow")
        .select_group_box_list(:style="{width: width + 'px'}")
          .select_group_box_list_item(:class="value === item[props.value]?'active':''" v-for="(item, index) in selectData" :key="index" @click="click(item)") {{item[props.label]}}
        el-button.moreBtn(type="text" @click="onMore") 更多
          i.el-icon--right.el-icon-caret-bottom(v-if="!moreShow")
          i.el-icon--right.el-icon-caret-top(v-else)

</template>
<script>
export default {
  props: {
    selectData: {
      type: Array,
      default: function() {
        return []
      }
    },
    title: {
      type: String,
      default: ''
    },
    value: {
      type: Number,
      default: null
    },
    max: {
      type: Number,
      default: 6
    },
    width: {
      type: Number,
      default: 500
    },
    props: {
      type: Object,
      default: function() {
        return {
          label: 'label',
          value: 'value'
        }
      }
    }
  },
  data() {
    return {
      moreShow: false
    }
  },
  computed: {
    list() {
      const list1 = this.selectData.length > this.max ? this.selectData.slice(0, this.max) : this.selectData
      return list1
    }
  },
  methods: {
    click(item) {
      this.moreShow = false
      this.$emit('click', item[this.props.value], item)
    },
    onMore() {
      this.moreShow = !this.moreShow
    }
  }
}
</script>
<style lang="scss" scoped>
  .lgSelectGroup {
    display: flex;
    justify-content: flex-start;
    flex-direction: column;
    margin-bottom: 20px;
    .select_group_box {
      display: flex;
      justify-content: flex-start;
      // align-content: center;
      height: 26px;
      line-height: 26px;
      position: relative;
      &_title {
        width: 100px;
      }
      &_list {
        display: flex;
        justify-content: flex-start;
        &_item {
          height: 26px;
          line-height: 26px;
          font-size: 12px;
          padding: 0 15px;
          margin-right: 20px;
          color: #333333;
          background-color: #fff;
          border-radius: 15px;
          cursor: pointer;
          &.active {
            color: #FFFFFF;
            background-color: #03A9AC;
          }
        }
      }
      &_more {
        position: absolute;
        left: 90px;
        top: -10px;
        z-index: 9999;
        display: flex;
        justify-content: flex-start;
        align-content: flex-start;
        padding: 10px;
        background:rgba(255,255,255,1);
        box-shadow:0px 2px 8px 0px rgba(0, 0, 0, 0.15);
        border-radius:5px;
        .select_group_box_list {
          max-height: 200px;
          flex-wrap: wrap;
          overflow: auto;
          align-content: flex-start;
          .select_group_box_list_item {
            margin-bottom: 10px;
          }
        }
        .moreBtn {
          height: 26px;
        }
      }
    }
  }
</style>
<style lang="scss">
  .moreBtn {
    padding: 0;
  }
</style>
