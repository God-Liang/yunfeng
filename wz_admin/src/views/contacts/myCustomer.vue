<template>
  <div class="app-container">
    <!--搜索模块-->
    <div class="filter-container">
      <el-select
        v-model="filters['input.status']"
        class="filter-item lgStatus"
        size="small"
        clearable
        style="width: 200px;"
      >
        <el-option
          v-for="item in myCustomerConst.statusOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
      <!-- <el-select
        v-model="filters.type"
        class="filter-item lgType"
        size="small"
        clearable
        style="width: 200px;"
      >
        <el-option
          v-for="item in myCustomerConst.typeOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select> -->
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
      <el-button
        class="filter-item"
        size="small"
        type="primary"
        icon="el-icon-plus"
        waves
        @click="handleCreate"
      >添加客户</el-button>
    </div>

    <!--主列表模块-->
    <lgTable
      columns-type="index"
      columns-label="序号"
      :list="list"
      :total-list="total"
      :lg-thead="myCustomerConst.tableAttr.thead"
      :lg-buttons="myCustomerConst.tableAttr.buttons"
      @operationEvent0="operationEvent0"
      @operationEvent1="operationEvent1"
      @initListQuery="initListQuery"
      @getListByPagination="getListByPagination"
    />
    <!--权限设置-->
    <lgDialog
      title="添加客户"
      :visible="dialogFormVisible"
      width="600px"
      :show-form="false"
      :action="false"
      @on-close="onClose"
    >
      <template>
        <!--搜索模块-->
        <div class="filter-container">
          <lgSite
            v-model="clientData['input.area']"
            class="filter-item"
            @change="changeArea"
          />
          <el-input
            v-model="clientData['input.query']"
            placeholder="输入名称、拼音码搜索"
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
            @click="handleClientFilter"
          >搜索</el-button>
        </div>
        <div class="clientBox">
          <el-table
            :data="clientList"
            :show-header="false"
            border
          >
            <el-table-column
              prop="date"
              width="460"
            >
              <template slot-scope="scope">
                <div class="client-container">
                  <img
                    class
                    src="@/assets/clientImg.png"
                    alt
                  >
                  <div class="clientInfo">
                    <router-link :to="`/details/customerDetail/${scope.row.Id}/false`">{{ scope.row.company_name }}</router-link>
                    <p>{{ scope.row.address }}</p>
                  </div>
                </div>
              </template>
            </el-table-column>
            <el-table-column
              prop="name"
              align="center"
            >
              <template slot-scope="scope">
                <el-button
                  type="primary"
                  size="small"
                  @click="handleClientApply(scope.row)"
                >申请</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </template>
    </lgDialog>
  </div>
</template>

<script>
import { list, update, create } from '@/api/common'
import waves from '@/directive/waves' // Waves directive
import lgTable from '@/views/components/lgTable'
import lgDialog from '@/views/components/lgDialog'
import lgSite from '@/views/components/lgSite'
import { myCustomerConst } from '@/views/contacts/columnsConst'

export default {
  components: { lgTable, lgDialog, lgSite },
  directives: { waves },
  data() {
    return {
      myCustomerConst,
      apiUri: 'mycustomer',
      list: [],
      total: 0,
      listQuery: {
        current: 1,
        pageSize: 10
      },
      filters: {
        'input.query': '',
        'input.type': 1,
        'input.relation_type': 2,
        'input.status': null
      },
      dialogFormVisible: false,
      listQuery1: {
        current: 1,
        pageSize: 99
      },
      clientList: [],
      clientData: {
        'input.area': [],
        'input.query': '',
        'input.type': 2,
        'input.relation_type': 2
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
    // 获取客户列表
    getList() {
      const params = Object.assign({}, this.listQuery, this.filters)
      list(this.apiUri, params).then((res) => {
        if (res.success) {
          this.list = res.data.list.filter((e) => {
            return e.status !== 4
          })
          this.total = res.data.total_count
        }
      })
    },
    // 查看
    operationEvent0(row) {
      this.$router.push({ path: `/details/customerDetail/${row.Id}/true` })
    },
    // 解除关系
    operationEvent1(row) {
      this.$confirm('您确定要解除与该机构关系吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          const params = {
            id: row.Id,
            status: 4
          }
          update('relation', params).then((res) => {
            if (res.success) {
              this.getList()
              this.$message({
                message: '解除成功',
                type: 'success'
              })
            }
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消解除'
          })
        })
    },
    // 添加
    handleCreate() {
      this.getClientList()
      this.dialogFormVisible = true
    },
    getClientList() {
      const params = Object.assign({}, this.listQuery1, this.clientData)
      console.log(params)
      params['input.area'] = params['input.area'].join(',')
      list(this.apiUri, params).then((res) => {
        if (res.success) {
          this.clientList = res.data.list
        }
      })
    },
    // 申请
    handleClientApply(row) {
      console.log(row)

      this.$prompt('请输入申请理由', '提示', {
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
        inputErrorMessage: '申请理由不能为空！'
      })
        .then(({ value }) => {
          const data = {
            // id: row.Id,
            // org_id: row.org_id,
            org_emp_id: row.Id,
            relation_type: 2,
            apply_remark: value,
            status: 0
          }
          create('relation', data).then((res) => {
            if (res.success) {
              this.getClientList()
              this.$message({
                message: '申请成功',
                type: 'success'
              })
            }
          })
        })
        .catch(() => {})
    },
    changeArea(aa) {
      console.log(aa)
    },
    // 过滤客户
    handleClientFilter() {
      this.getClientList()
    },
    onClose() {
      this.dialogFormVisible = false
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
