<template>
  <div class="app-container">
    <!--搜索模块-->
    <div class="filter-container">
      <el-select
        v-model="filters['input.is_bind']"
        class="filter-item lgStatus"
        size="small"
        clearable
        style="width: 200px;"
      >
        <el-option
          label="全部"
          value=""
        />
        <el-option
          label="已匹配"
          value="true"
        />
        <el-option
          label="未匹配"
          value="false"
        />
      </el-select>
      <el-input
        v-model="filters['input.query']"
        placeholder="供应商名称"
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
    <lgTable
      columns-type="index"
      columns-label="序号"
      :list="list"
      :total-list="total"
      :lg-thead="GysManageConst.tableAttr.thead"
      :lg-buttons="GysManageConst.tableAttr.buttons"
      status-name="is_bind"
      @operationEvent0="operationEvent0"
      @operationEvent1="operationEvent1"
      @operationEvent2="operationEvent2"
      @initListQuery="initListQuery"
      @getListByPagination="getListByPagination"
    />

    <!--权限设置-->
    <lgDialog
      title="对照供应商"
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
          />
          <el-input
            v-model="clientData['input.query']"
            placeholder="输入名称搜索"
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
                >匹配</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </template>
    </lgDialog>
  </div>
</template>
<script>
import { list } from '@/api/common'
import { sync, del } from '@/api/gysCompare'
import waves from '@/directive/waves'
import lgTable from '@/views/components/lgTable'
import lgDialog from '@/views/components/lgDialog'
import lgSite from '@/views/components/lgSite'
import { GysManageConst } from '@/views/contacts/columnsConst'
export default {
  name: 'ComponentName',
  components: { lgTable, lgDialog, lgSite },
  directives: { waves },
  data() {
    return {
      GysManageConst,
      apiUri: 'gys/compare',
      list: [],
      total: 0,
      listQuery: {
        current: 1,
        pageSize: 10
      },
      filters: {
        'input.is_bind': '',
        'input.query': ''
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
        'input.type': 3,
        'input.relation_type': 1
      },
      pId: null
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
    getList() {
      const params = Object.assign({}, this.listQuery, this.filters)
      list(this.apiUri, params).then((res) => {
        if (res.success) {
          this.list = res.data.list
          this.total = res.data.total_count
        }
      })
    },
    operationEvent0(row) {
      this.pId = row.id
      this.dialogFormVisible = true
      this.getClientList()
    },
    operationEvent1(row) {
      console.log(row)
      this.pId = row.id
      this.handleClientApply()
    },
    operationEvent2(row) {
      this.$confirm('此操作将永久删除该供应商, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          del({ id: row.id }).then((res) => {
            if (res.success) {
              this.$message({
                type: 'success',
                message: '删除成功!'
              })
              this.getList()
            }
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    getClientList() {
      const params = Object.assign({}, this.listQuery1, this.clientData)
      console.log(params)
      params['input.area'] = params['input.area'].join(',')
      list('mycustomer', params).then((res) => {
        if (res.success) {
          this.clientList = res.data.list
        }
      })
    },
    // 匹配
    handleClientApply(row) {
      console.log(row)
      const params = {
        is_reset: false,
        id: this.pId
      }
      if (row) {
        params.gysxh = row.Id
      }
      sync(params).then((res) => {
        if (res.success) {
          if (row) {
            this.$message({
              type: 'success',
              message: '匹配成功!'
            })
          } else {
            this.$message({
              type: 'success',
              message: '解除关系成功!'
            })
          }
          this.getList()
          this.dialogFormVisible = false
        }
      })
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
<style lang="scss" scoped>
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
</style>
