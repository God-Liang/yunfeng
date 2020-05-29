<template>
  <div class="app-container">
    <el-table 
      :key='tableKey' 
      :data="list"
      v-loading="listLoading"
      element-loading-text="我不怕等待，因为等待的时间越长，等到之后就会越幸福！"  
      fixed border fit
      highlight-current-row 
      ref= 'table'
      @select = 'getRow' 
      @select-all = 'getRow'>

      <el-table-column align='center' v-if= 'hasSelection' type="selection" width="55"></el-table-column>
      <el-table-column v-for = "thead in theadList"  
      :key = "thead.label" 
      :width = "thead.label == 'ID' ? 180 : (thead.label == 'telephone' || thead.label == 'expectTime' ? 120 : '')" class-name="status-col" 
      :prop ='thead.label' 
      :label="thead.text" >
        <template  slot-scope="scope">
          <span v-if ='/time|day/i.test(thead.label)'>
            {{scope.row[thead.label] | dataFormat}}
          </span>
          <span v-else>
            {{scope.row[thead.label]}}
          </span>
        </template>
      </el-table-column>
      <el-table-column width = "180" class-name="status-col" label="完成百分比" >
        <template slot-scope="scope">
          <el-progress :percentage="scope.row['degree']" :color= "degreeColor(scope.row['degree'])"></el-progress>
        </template>
      </el-table-column>
      
      <el-table-column v-if = 'hasOperate'  label="操作" :width="100 * operationButtons.length" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button v-for='button in operationButtons' size = 'small' :type="button.type" @click="fun(scope.row, button.id)" :key = 'button.name'>
            <router-link v-if='button.router' tag = 'span' :to ='button.router+ "/"+scope.row.id'>{{button.text}}</router-link>
            <span v-else>
              {{button.text}}
            </span>
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="pagination-container">
      <el-pagination
        ref = 'pagination'
        background 
        @size-change="handleSizeChange" 
        @current-change="handleCurrentChange" 
        :current-page="listQuery.page" 
        :page-sizes="[5,10,20,30, 50]" 
        :page-size="listQuery.limit" 
        layout="total, sizes, prev, pager, next, jumper" 
        :total="total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import waves from '@/directive/waves' // 水波纹指令
export default {
  name: 'followupTable',
  directives: {
    waves
  },
  props: {
    hasSelection: {
      type: Boolean,
      default: true
    },
    hasOperate: {
      type: Boolean,
      default: true
    },
    list: {
      type: Array,
      default: function() {
        return []
      }
    },
    total: 0,
    theadList: {
      type: Array,
      default: function() {
        return []
      }
    },
    operationButtons: {
      type: Array,
      default: function() {
        return []
      }
    }
  },
  data() {
    return {
      tableKey: 0,
      listQuery: {
        page: 1,
        limit: 5
      }
    }
  },
  computed: {
    listLoading() {
      return this.$store.getters.listLoading
    }
  },
  methods: {
    getRow(s, r) {
      this.$emit('getSelectArr', s)
    },
    fun(row, buttonId) {
      this.$emit('operationEvent' + buttonId, row)
    },
    getList() {
      this.$emit('getListByPagination', this.listQuery)
    },
    resetPage() {
      this.$refs.pagination.lastEmittedPage = 1 // 手动触发 @current-page事件
      this.listQuery.page = 1
    },
    handleSizeChange(val) {
      this.listQuery.limit = val
      this.getList()
    },
    handleCurrentChange(val) {
      this.listQuery.page = val
      this.getList()
    },
    degreeColor(degree) {
      const map = [
        {
          'level': 100,
          'color': '#67C23A'
        },
        {
          'level': 75,
          'color': '#409EFF'
        },
        {
          'level': 50,
          'color': '#E6A23C'
        },
        {
          'level': 25,
          'color': '#F56C6C'
        }
      ]
      let i = 0
      let result = '#67C23A'
      while (i < 4) {
        if (degree < map[i]['level']) {
          result = map[i]['color']
        } else {
          return result
        }
        i++
      }
      return result
    }
  }
}
</script>
<style lang="scss">
.filter-container{
  line-height: 2.5;
}
</style>

