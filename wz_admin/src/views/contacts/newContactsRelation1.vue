<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input
        v-model="listQuery.keyWord"
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
        @click="handleFilter"
      >搜索</el-button>
    </div>
    <!--主列表模块-->
    <lgTable
      columns-type="index"
      columns-label="序号"
      :list="list"
      :total-list="total"
      :lg-thead="userAttr.thead"
      :lg-buttons="userAttr.buttons"
      @operationEvent0="operationEvent0"
      @operationEvent1="operationEvent1"
      @operationEvent2="operationEvent2"
      @initListQuery="initListQuery"
      @getListByPagination="getListByPagination"
    />
    <el-dialog
      title="采购范围设置"
      :visible.sync="reasonVisible"
      width="520px"
    >
      <el-form :rules="rules">
        <el-form-item
          label="拒绝原因"
          prop="reason"
          label-width="100px"
        >
          <el-input
            v-model="reason"
            type="textarea"
            style="width:300px"
          />
        </el-form-item>
      </el-form>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="reasonVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="reasonVisible = false"
        >确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import lgTable from '@/views/components/lgTable'
export default {
  name: 'NewContactsRelation',
  components: { lgTable },
  data() {
    return {
      listQuery: {
        current: 1,
        pageSize: 10,
        keyWord: ''
      },
      list: [{}],
      userAttr: {
        thead: [
          {
            label: 'name',
            text: '名称'
          },
          {
            label: 'nick',
            text: '申请说明'
          },
          {
            label: 'sex',
            text: '关系类型'
          },
          {
            label: 'createName',
            text: '申请时间'
          }
        ],
        buttons: {
          status: false, // 是否区分操作状态 true：根据当前列的数据状态值使用operation[状态值]; false：使用operation[0]
          width: 300, // 表格操作列的宽度
          operation: {
            // 操作按钮配置
            0: [
              {
                name: '0',
                text: '通过',
                id: '0',
                type: 'primary'
              },
              {
                name: '1',
                text: '拒绝',
                id: '1',
                type: 'primary'
              },
              {
                name: '2',
                text: '忽略',
                id: '2',
                type: 'primary'
              }
            ]
          }
        }
      },
      total: 0,
      reasonVisible: false,
      rules: {
        reason: [{ required: true, message: '请填写拒绝原因', trigger: 'blur' }]
      },
      reason: ''
    }
  },
  mounted() {},
  methods: {
    handleFilter() {},
    initListQuery() {},
    getListByPagination() {},
    operationEvent0() {
      this.$confirm('您确定要通过该机构的申请吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$message({
            type: 'success',
            message: '通过成功!'
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消通过'
          })
        })
      // const id = 33
      // this.$router.push({ path: `/details/customerDetail/${id}` })
    },
    operationEvent1() {
      this.reasonVisible = true
    },
    operationEvent2() {
      this.$confirm('您确定要忽略该机构的申请吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$message({
            type: 'success',
            message: '忽略成功!'
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
<style lang="less" scoped>
</style>
