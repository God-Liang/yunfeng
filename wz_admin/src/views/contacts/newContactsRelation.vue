<template>
  <div class="app-container">
    <!--搜索模块-->
    <div class="filter-container">
      <el-input
        v-model="filters['input.query']"
        placeholder="手机号/组织名称/联系人"
        style="width: 200px;"
        class="filter-item"
        size="small"
      />
      <el-button
        class="filter-item"
        size="small"
        type="primary"
        icon="el-icon-search"
        waves
        @click="handleFilter"
      >搜索</el-button>
    </div>

    <!--主列表模块-->
    <lgTable
      columns-type="index"
      columns-label="序号"
      :list="list"
      :total-list="total"
      :lg-thead="newContactsRelationConst.tableAttr.thead"
      :lg-buttons="newContactsRelationConst.tableAttr.buttons"
      @operationEvent0="operationEvent0"
      @operationEvent1="operationEvent1"
      @operationEvent2="operationEvent2"
      @initListQuery="initListQuery"
      @getListByPagination="getListByPagination"
    />
  </div>
</template>

<script>
import { list, update } from '@/api/common'
import waves from '@/directive/waves' // Waves directive
import lgTable from '@/views/components/lgTable'
import { newContactsRelationConst } from '@/views/contacts/columnsConst'

export default {
  components: { lgTable },
  directives: { waves },
  data() {
    return {
      newContactsRelationConst,
      apiUri: 'relation',
      list: [],
      total: 0,
      listQuery: {
        current: 1,
        pageSize: 10
      },
      filters: {
        'input.query': ''
      }
    }
  },
  mounted() {
    this.getList()
  },
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
      this.listQuery.current = 1
      this.getList()
    },
    // 获取列表
    getList() {
      const params = Object.assign({}, this.listQuery, this.filters)
      list(this.apiUri, params).then((res) => {
        if (res.success) {
          this.list = res.data.list
          this.total = res.data.total_count
        }
      })
    },
    // 通过
    operationEvent0(row) {
      this.$confirm('您确定要通过该机构的申请吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          const params = {
            id: row.Id,
            status: 1
          }
          update(this.apiUri, params).then((res) => {
            if (res.success) {
              this.getList()
              this.$message({
                message: '通过成功',
                type: 'success'
              })
            }
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消通过'
          })
        })
    },
    // 拒绝
    operationEvent1(row) {
      this.$prompt('请输入拒绝原因', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputValidator: function(val) {
          if (val === null) {
            return false
          }
          if (val === '') {
            return false
          }
          return true
        },
        inputErrorMessage: '拒绝原因不能为空！'
      })
        .then(({ value }) => {
          const params = {
            id: row.Id,
            status: 2
          }
          update(this.apiUri, params).then((res) => {
            if (res.success) {
              this.getList()
              this.$message({
                message: '拒绝成功',
                type: 'success'
              })
            }
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消拒绝'
          })
        })
    },
    // 忽略
    operationEvent2(row) {
      this.$confirm('您确定要忽略该机构的申请吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          const params = {
            id: row.Id,
            status: 3
          }
          update(this.apiUri, params).then((res) => {
            if (res.success) {
              this.getList()
              this.$message({
                message: '忽略成功',
                type: 'success'
              })
            }
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消忽略'
          })
        })
    }
  }
}
</script>
<style lang="scss">
.lgStatus > .el-input {
  &:after {
    content: '状态 :';
    height: 32px;
    line-height: 32px;
    position: absolute;
    top: 0;
    left: 20px;
  }
  .el-input__inner {
    padding-left: 60px !important;
  }
}
.lgType > .el-input {
  &:after {
    content: '客户类型 :';
    height: 32px;
    line-height: 32px;
    position: absolute;
    top: 0;
    left: 15px;
  }
  .el-input__inner {
    padding-left: 80px !important;
  }
}
.clientBox {
  min-height: 200px;
  max-height: 450px;
  overflow: auto;
  .el-table th.is-leaf {
    background-color: #ecf0f7;
    color: #666;
  }
  .el-table tr:nth-child(even) {
    background-color: #fafafa;
  }
  .el-table--enable-row-hover .el-table__body tr:hover > td .clientInfo a {
    text-decoration: underline;
  }
  .client-container {
    width: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    img {
      width: 40px;
      height: 40px;
      display: inline-block;
    }
    .clientInfo {
      flex: 1;
      margin-left: 20px;
      font-size: 12px;
      a {
        line-height: 20px;
        color: #4b4b4b;
      }
      p {
        margin: 0;
        line-height: 20px;
        color: #757575;
      }
    }
  }
}
</style>
