<template>
  <div class="confirmWrap">
    <div class="operationSequencingBox" v-loading="globalLoading" element-loading-text="数据加载中...">
      <div slot="header" class="dialog-header clearfix">
        <div class="title" style="float: left;">
          手术排序
          <span style="color: rgb(153, 153, 153); font-size: 12px;font-weight:normal;margin-top:3px;">通过拖拽每一排信息排序，手术时间、手术室获取所有手术</span>
        </div>
        <div style="float: right;">
          <el-button type="primary" :loading="sumbitLoading" @click="sumitSort()" v-waves>保存</el-button>
        </div>
      </div>
      <div class="filter-container">
        <div class="filterBox">
          <div class="leftPart filterPart"></div>
          <div class="rightPart filterPart">
            <el-date-picker
              style="width: 196px"
              v-model="filter.optDate"
              type="date"
              size="small"
              placeholder="选择手术时间"
              value-format="yyyy-MM-dd"
              class="filter-item"
            ></el-date-picker>
            <el-select v-model="filter.optRoomId" filterable class="filter-item" size="small" placeholder="请选择手术室" style='width: 196px'>
              <el-option v-for='item in operationRoomList' :label="item.name" :value="item.id" :key='item.id'></el-option>
            </el-select>
          </div>
        </div>
      </div>
      <div id="lg_sort">
        <el-table :data="tableList" border row-key="id" align="left">
          <el-table-column
            v-for="(item, index) in surgerySendOnConst.theadList3"
            :key="`col_${index}`"
            :width = "item.label == 'doctorName' || item.label == 'patientName' ? 100 : (item.label == 'sexShow' || item.label == 'age' ? 80 : '')"
            :prop="item.label"
            align="center"
            :label="item.text"
          >
            <template slot-scope="scope">
              <div v-if="item.label === 'schedule' || item.label === 'updateTime'">
                {{scope.row[item.label] | fmtYMD}}
              </div>
              <div v-else>{{scope.row[item.label]}}</div>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>
<script>
import { pageList, sortConfirm } from '@/api/appointmentManage/surgerySendOn'
import { surgerySendOnConst } from '@/yimiviews/appointmentManage/columnsConst'
import { pending } from '@/api/appointmentManage/appointmentRegistration'
import Sortable from 'sortablejs'
import waves from '@/directive/waves/index.js'
export default {
  name: '',
  data() {
    return {
      surgerySendOnConst,
      sumbitLoading: false,
      globalLoading: false,
      filter: {
        optDate: null,
        optRoomId: null,
        page: 1,
        limit: 99
      },
      tableList: [],
      operationRoomList: [],
      valid: false
    }
  },
  directives: {
    waves
  },
  mounted() {
    this.getPend()
  },
  methods: {
    // 行拖拽
    rowDrop() {
      const lgSort = document.querySelector('#lg_sort table tbody')
      const _this = this
      Sortable.create(lgSort, {
        onEnd({ newIndex, oldIndex }) {
          const currRow = _this.tableList.splice(oldIndex, 1)[0]
          _this.tableList.splice(newIndex, 0, currRow)
        }
      })
    },
    // 排序提交
    sumitSort() {
      if (this.valid) {
        const idArr = []
        this.tableList.forEach(v => {
          idArr.push(v.id)
        })
        const data = {
          orders: idArr.join(',')
        }
        sortConfirm(data).then(res => {
          if (res.data.code === 200) {
            this.$message({
              message: '保存成功',
              type: 'success'
            })
            this.handleFilter()
          }
        })
      } else {
        this.$message({
          type: 'warning',
          message: '手术时间及手术室都不能为空'
        })
        return false
      }
    },
    handleFilter() {
      this.globalLoading = true
      const query = Object.assign({}, this.filter)
      pageList(query).then(res => {
        if (res.data.code === 200) {
          this.tableList = res.data.list
          this.rowDrop()
          this.globalLoading = false
        }
      })
    },
    // 搜索
    checkFilter() {
      if (this.filter.optDate !== '' && this.filter.optRoomId) {
        this.valid = true
        this.handleFilter()
      } else {
        this.$message({
          message: '手术时间及手术室都不能为空',
          type: 'warning'
        })
        this.valid = false
        this.tableList = []
      }
    },
    // 手术室列表
    getPend() {
      pending({ optRoomType: null, keywords: '', page: 1, limit: 10 }).then((res) => {
        if (res.data.code === 200) {
          this.loading = false
          this.operationRoomList = res.data.list
        }
      })
    }
  },
  watch: {
    filter: {
      handler(newValue, oldValue) {
        if (newValue.optDate && newValue.optRoomId) {
          this.valid = true
          this.handleFilter()
        } else {
          this.$message({
            message: '手术时间及手术室都不能为空',
            type: 'warning'
          })
          this.valid = false
          this.tableList = []
        }
      },
      deep: true
    }
  }
}
</script>
<style lang="scss" scoped>
.confirmWrap {
  background-color: #f0f2f5;
  padding: 15px;
  height: 100%;
  .operationSequencingBox {
    background-color: #fff;
    height: 100%;
    overflow: auto;
    .dialog-header {
      height: 60px;
      line-height: 60px;
      padding: 0 30px 0 20px;
      border-bottom: 1px solid #979797;
      .title {
        font-size: 20px;
        color: #333333;
        font-weight: bold;
      }
      .el-button--medium {
        border-radius: 0;
        background-color: #0270f5;
        font-size: 13px;
        outline: none;
        width: 90px;
        border: 0;
      }
    }
    .filter-container {
      padding: 25px 30px 25px 20px;
      .filterBox {
        display: flex;
        justify-content: space-between;
        align-items: center;
        .filterPart {
          line-height: 2;
          .buttonRadius {
            border-radius: 0;
            width: 90px;
            background-color: #508BFF;
            border: 0;
          }
        }
      }
    }
    #lg_sort {
      padding: 0 30px 0 20px;
    }
  }
}

</style>
<style lang="scss">
.el-table th.is-leaf {
  background-color: #f4f4f4;
  color: #666;
}
.filter-container {
  line-height: 2.5;
}
.danger {
  color: red;
}
.avatarImg {
  width: 50px;
  height: 50px;
  border-radius: 50%;
}
.el-dialog__body {
  border-top: 1px solid #ddd;
}
</style>
