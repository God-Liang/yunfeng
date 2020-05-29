<template>
  <div class='dataCheck'>
    <!-- <h3>
      资料核对
    </h3> -->
    <table border = '1'  bordercolor="#eee" style="border-collapse:collapse;">
      <thead>
        <tr>
          <td>资料提供者</td>
          <td>资料清单</td>
          <td>完成核对</td>
          <td>是否已打印</td>
          <td>资料备注(数量,特殊说明等)</td>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(data, index) in dataList" :key="index">
          {{data.hasRowSpan}}
          <td v-if="spanData[index].hasRowSpan" :rowspan="spanData[index].rowSpan">{{data.materialFromTypeShow}}</td>
          <td>{{data.materialNameShow}}</td>
          <td><el-checkbox size="medium" border class ='full' :disabled="disabled" v-model="data.isChecked" :true-label="1" :false-label="0"></el-checkbox ></td>
          <td><el-checkbox size="medium" border class ='full' :disabled="disabled" v-model="data.isPrinted" :true-label="1" :false-label="0"></el-checkbox ></td>
          <td><input type="text" v-model="data.note"></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        lastMaterialFromType: '',
        spanData: []
      }
    },
    props: {
      dataList: {
        type: Array,
        default: function() {
          return []
        }
      },
      disabled: {
        type: Boolean,
        default: false
      }
    },
    created() {
      this.dataList.forEach((data, index) => {
        this.spanData.push({
          hasRowSpan: this.checkHasRowSpan(data.materialFromType),
          rowSpan: this.getRowSpan(index, data.materialFromType)
        })
      })
      this.lastMaterialFromType = ''
    },
    methods: {
      checkHasRowSpan(type) {
        if (this.lastMaterialFromType === type) {
          return false
        }
        this.lastMaterialFromType = type
        return true
      },
      getRowSpan(index, type) {
        let rowSpan = 1
        for (const data of this.dataList.slice(index + 1)) {
          if (data.materialFromType !== type) {
            break
          }
          rowSpan++
        }
        return rowSpan
      }
    }
  }
</script>
<style lang="scss" scoped>
.dataCheck{
  width: 100%;
  box-sizing: border-box;
  padding: 20px;
  h3{
    padding-left: 40px;
    font-weight: normal;
  }
  table{
    width: 100%;
    text-align: center;
    thead{
      background: #f0f2f5;
    }
    td{
      height: 36px;
      .full{
        width: 100%;
        height: 100%;
        outline: 0;
        border-color: transparent !important;
      }
      &>input{
        width: 100%;
        height: 100%;
        border: 0;
        outline: 0;
      }
    }
  }
}
</style>
