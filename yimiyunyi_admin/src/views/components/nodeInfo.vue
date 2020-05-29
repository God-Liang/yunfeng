<template lang="pug">
  .nodeInfo
    .nodeHead
      el-button(:disabled="curTotal === 1" type="primary" @click="onTotalAdd") 上一页
      .headpage {{curTotal}} / {{total}}
      el-button(:disabled="curTotal === total" type="primary" @click="onTotalSub") 下一页
    .nodeMain
      .node_l
        .node-item 第{{1+(curTotal-1)*4}}周
        .node-item 第{{2+(curTotal-1)*4}}周
        .node-item 第{{3+(curTotal-1)*4}}周
        .node-item 第{{4+(curTotal-1)*4}}周
      .node_r
        .node-item(v-for="(item,index) in nodeList" :key="index" @click="onLookNode(item)")
          .node-item_name(v-if="item.name") {{item.name}}
          .node-item_day(v-if="item.name") 术后康复第{{item.intervalDay}}天
          .node-item_num(v-if="item.name") 量表{{item.lbNum}} 宣教{{item.xjNum}}
    el-dialog(:visible.sync="visible" :before-close="close" title="查看节点" width="800px")
      el-form(:model="nodeInfo" ref="nodeInfoForm" label-width="180px" :disabled="true")
        el-form-item(label="节点名称：" prop="name")
          el-input(v-model="nodeInfo.name" style="width: 300px;" placeholder="请输入节点名称")
        el-form-item(label="与起始节点的间隔时间：" prop="intervalValue")
          el-input-number(v-model="nodeInfo.intervalValue" :min="1" style='width: 200px;')
          el-select(v-model="nodeInfo.unit" placeholder="请选择间隔时间单位" style='width: 100px;')
            el-option(v-for="item in timeOption" :key="item.value" :label="item.label" :value="item.value")
      .titleBox
        .title_l 量表：
        .title_l 宣教：
      .lg_formList
        .scale_l
          .scale_l_item(v-for="(nodeVal, node_i) in nodeInfo.formSolutionNodeItemList" :key="node_i" @click="onLookForm(nodeVal.templateId)")
            .scale_l_item_title {{nodeVal.templateName}}
        .mission_r
          .mission_r_item(v-for="(nodeVal, node_i) in nodeInfo.visitSolutionNodeItemList" :key="node_i" @click="onLookForm(nodeVal.templateId)")
            .mission_r_item_title {{nodeVal.templateName}}
</template>
<script>
export default {
  props: {
    totalDay: {
      type: Number,
      default: 0
    },
    list: {
      type: Array,
      default: function() {
        return []
      }
    },
    isLook: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      curTotal: 1,
      nodeList: [],
      visible: false,
      nodeInfo: {},
      timeOption: [{
        value: 1,
        label: '天'
      }, {
        value: 2,
        label: '周'
      }, {
        value: 3,
        label: '月'
      },
      {
        value: 4,
        label: '年'
      }]
    }
  },
  computed: {
    total() {
      const total = Math.ceil(this.totalDay / 28)
      return total
    },
    dataList() {
      const list = []
      const totalDay = this.totalDay - this.totalDay % 28 + 28
      for (let index = 1; index <= totalDay; index++) {
        const arr = this.list.filter(e => e.intervalDay === index)
        if (arr.length > 0) {
          list.push(arr[0])
        } else {
          list.push({})
        }
      }
      return list
    }
  },
  watch: {
    totalDay(val, oldVal) {
      if (val) {
        this.getList()
      }
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    onTotalAdd() {
      this.curTotal--
      this.getList()
    },
    onTotalSub() {
      this.curTotal++
      this.getList()
    },
    getList() {
      const start = (this.curTotal - 1) * 28
      const end = this.curTotal * 28
      this.nodeList = this.dataList.slice(start, end)
      console.log(this.nodeList)
    },
    close() {
      this.visible = false
    },
    onLookNode(item) {
      if (!this.isLook) return
      this.nodeInfo = item
      this.visible = true
    },
    onLookForm(id) {
      this.$router.push(`/case/lookForm/${id}`)
    }
  }
}
</script>
<style lang="scss" scoped>
.nodeInfo {
  width: 100%;
  overflow: hidden;
  box-sizing: border-box;
  .nodeHead {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    .headpage {
      margin: 0 20px;
    }
  }
  .nodeMain {
    display: flex;
    margin-top: 20px;
    overflow: auto;
    padding-bottom: 10px;
    .node_l {
      min-width: 80px;
      width: 80px;
      display: flex;
      flex-direction: column;
      border-top: 1px solid #ccc;
      border-left: 1px solid #ccc;
      color: #333333;
      .node-item {
        width: 100%;
        text-align: center;
        height: 60px;
        line-height: 60px;
        border-bottom: 1px solid #ccc;
        border-right: 1px solid #ccc;
      }
    }
    .node_r {
      display: flex;
      min-width: 1050px;
      width: 1050px;
      flex-wrap: wrap;
      border-top: 1px solid #ccc;
      color: #333333;
      .node-item {
        width: 150px;
        padding: 5px;
        height: 60px;
        border-bottom: 1px solid #ccc;
        border-right: 1px solid #ccc;
        cursor: pointer;
        &_name {
          color: #999;
          width: 140px;
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
        }
        &_day {
        }
        &_num {
          color: #999;
        }
      }
    }
  }
}
.titleBox {
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 0 5%;
  margin-bottom: 5px;
  .title_l {
    width: 45%;
    font-size: 14px;
    color: #606266;
    font-weight: bold;
  }
}
.lg_formList {
    width: 100%;
    display: flex;
    justify-content: space-between;
    padding: 0 5%;
    .scale_l {
      width: 45%;
      height: 400px;
      border: 1px solid #bcbcbc;
      padding: 10px;
      overflow: auto;
      &_item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 28px;
        margin-bottom: 6px;
        &_title {
          color: #999;
          font-size: 12px;
          text-decoration: underline;
          cursor: pointer;
        }
      }
    }
    .mission_r {
      width: 45%;
      height: 400px;
      border: 1px solid #bcbcbc;
      padding: 10px;
      overflow: auto;
      &_item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 28px;
        margin-bottom: 6px;
        &_title {
          color: #999;
          font-size: 12px;
          text-decoration: underline;
          cursor: pointer;
        }
      }
    }
  }
</style>
