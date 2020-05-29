<template>
  <div>
    <div class="filter-container">
      <el-select v-model="filters.status" class="marginR20" placeholder="状态" clearable size="small">
        <el-option
          v-for="item in statusOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
      <el-select v-model="filters.isImport" class="marginR20" placeholder="厂家类型" clearable size="small">
        <el-option
          v-for="item in importOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
      <el-input v-model="filters.keyword" class="marginR20" style="width:199px;" placeholder="生产厂家/总经销商" size="small" />
      <el-button type="primary" size="small">搜索</el-button>
    </div>
    <lgTable
      :has-selection="false"
      :list="list"
      :total-list="total"
      :lg-thead="userAttr.thead"
      :lg-buttons="userAttr.buttons"
      :lg-status="userAttr.status"
      status-name="deleted"
      @operationEvent0="operationEvent0"
      @operationEvent1="operationEvent1"
      @operationEvent2="operationEvent2"
      @initListQuery="initListQuery"
      @getListByPagination="getListByPagination"
    />
  </div>
</template>
<script>
import lgTable from '@/views/components/lgTable'
import { list } from '@/api/common'
// import { list, update, create } from '@/api/common'
export default {
  name: 'Manufacturers',
  components: { lgTable },
  props: {
    statusOptions: {
      type: Array,
      default: function() {
        return []
      }
    },
    importOptions: {
      type: Array,
      default: function() {
        return []
      }
    }
  },
  data() {
    return {
      apiUri: 'entrust',
      list: [],
      total: 0,
      listQuery: {
        current: 1,
        pageSize: 10
      },
      filters: {
        status: 0,
        isImport: 0,
        keyword: ''
      },
      userAttr: {
        thead: [
          {
            label: 'name',
            text: '生产厂家/总经销商'
          },
          {
            label: 'nick',
            text: '厂家类型'
          },
          {
            label: 'sex',
            text: '维护状态'
          },
          {
            label: 'deleted',
            text: '状态'
          }
        ],
        buttons: {
          status: true, // 是否区分操作状态 true：根据当前列的数据状态值使用operation[状态值]; false：使用operation[0]
          width: 300, // 表格操作列的宽度
          operation: { // 操作按钮配置
            1: [{
              name: 'editor',
              text: '编辑',
              id: 0,
              type: 'primary'
            }, {
              name: 'change',
              text: '换证',
              id: 1,
              type: 'primary'
            }, {
              name: 'blockup',
              text: '停用',
              id: 2,
              type: 'primary'
            }],
            2: [{
              name: 'editor',
              text: '编辑',
              id: 0,
              type: 'primary'
            }, {
              name: 'change',
              text: '换证',
              id: 1,
              type: 'primary'
            }, {
              name: 'blockup',
              text: '启用',
              id: 2,
              type: 'primary'
            }]
          }
        },
        status: [
          {
            status: 1,
            text: '启用',
            tag: 'success'
          },
          {
            status: 2,
            text: '停用',
            tag: 'danger'
          }
        ]
      }
    }
  },
  mounted() {},
  methods: {
    // 初始化页数与条数
    initListQuery(listQuery) {
      this.listQuery = listQuery
    },
    // 分页操作
    getListByPagination(listQuery) {
      this.listQuery = listQuery
      this.getList()
    },
    // 过滤列表
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },
    // 获取列表
    getList() {
      const params = Object.assign({}, this.listQuery, this.filters)
      list(this.apiUri, params).then(res => {
        if (res.success) {
          this.list = res.data.list
          this.total = res.data.total_count
        }
      })
    },
    // 编辑
    operationEvent0(row) {

    },
    // 换证
    operationEvent1(row) {

    },
    // 启用/停用
    operationEvent2(row) {

    }
  }
}
</script>
<style lang="scss" scoped>
.marginR20{
  margin-right: 15px;
}
</style>
