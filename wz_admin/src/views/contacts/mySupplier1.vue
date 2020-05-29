<template>
  <div class="app-container">
    <div class="filter-container">
      <el-select
        v-model="listQuery.type"
        class="filter-item"
        size="small"
        style="width: 200px;"
      >
        <el-option
          v-for="item in typeOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
      <el-select
        v-model="listQuery.pay"
        class="filter-item"
        size="small"
        style="width: 200px;"
      >
        <el-option
          v-for="item in payOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
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
      <el-button
        class="filter-item fr"
        size="small"
        type="primary"
        icon="el-icon-plus"
        @click="handleFilter"
      >添加供应商</el-button>
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
      @initListQuery="initListQuery"
      @getListByPagination="getListByPagination"
    />
  </div>
</template>
<script>
import lgTable from '@/views/components/lgTable'
export default {
  name: 'MySupplier',
  components: { lgTable },
  data() {
    return {
      typeOptions: [
        {
          value: 0,
          label: '全部'
        },
        {
          value: 1,
          label: '已通过'
        },
        {
          value: 2,
          label: '被解除'
        }
      ],
      payOptions: [
        {
          value: 0,
          label: '全部'
        },
        {
          value: 1,
          label: '未设置'
        },
        {
          value: 2,
          label: '账期支付'
        },
        {
          value: 3,
          label: '实时支付'
        }
      ],
      listQuery: {
        current: 1,
        pageSize: 10,
        keyWord: '',
        type: '',
        pay: ''
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
            text: '单位类型'
          },
          {
            label: 'createName',
            text: '银行账号'
          },
          {
            label: 'createTime',
            text: '关系建立日期'
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
                text: '查看',
                id: '0',
                type: 'primary'
              },
              {
                name: '1',
                text: '解除关系',
                id: '1',
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
    operationEvent0() {
      const id = 22
      this.$router.push({ path: `/details/customerDetail/${id}` })
    },
    operationEvent1() {
      this.$confirm('您确定要解除与该机构关系吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$message({
            type: 'success',
            message: '解除成功!'
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消解除'
          })
        })
    }
  }
}
</script>
<style lang="less" scoped>
</style>
