<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input
        v-model="listQuery.keyWord"
        placeholder="名称"
        style="width: 200px;"
        class="filter-item el-input--small"
      />
      <el-button
        class="filter-item el-button--small"
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
      @operationEventdetails="operationEventdetails"
      @initListQuery="initListQuery"
      @getListByPagination="getListByPagination"
    />
  </div>
</template>
<script>
import lgTable from '@/views/components/lgTable'
export default {
  name: 'CertificatePush',
  components: { lgTable },
  data() {
    return {
      listQuery: {
        current: 1,
        pageSize: 10,
        keyWord: '',
        type: null
      },
      list: [{}],
      userAttr: {
        thead: [
          {
            label: 'name',
            text: '客户名称'
          },
          {
            label: 'nick',
            text: '待审核'
          },
          {
            label: 'sex',
            text: '已拒绝'
          },
          {
            label: 'createName',
            text: '已通过'
          },
          {
            label: 'createTime',
            text: '已撤销'
          }
        ],
        buttons: {
          status: false, // 是否区分操作状态 true：根据当前列的数据状态值使用operation[状态值]; false：使用operation[0]
          width: 200, // 表格操作列的宽度
          operation: {
            // 操作按钮配置
            0: [
              {
                name: 'details',
                text: '查看推送情况',
                id: 'details',
                type: 'primary'
              }
            ]
          }
        }
      },
      total: 0
    }
  },
  mounted() {},
  methods: {
    handleFilter() {},
    initListQuery() {},
    getListByPagination() {},
    operationEventdetails() {
      const id = 111
      this.$router.push({ path: `/details/pushDetail/${id}` })
    }
  }
}
</script>
<style lang="less" scoped>
</style>
