<template>
  <div class="app-container">
    <div class="filter-container">
      <el-select v-model="listQuery.type" class="filter-item" size="small" style="width: 200px;">
        <el-option
          v-for="item in typeOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
      <el-select
        v-model="listQuery.customer"
        class="filter-item"
        size="small"
        style="width: 200px;"
      >
        <el-option
          v-for="item in customerOptions"
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
      >添加客户</el-button>
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

    <el-dialog title="采购范围设置" :visible.sync="scopeVisible" width="400px">
      <template>
        <el-input v-model="filterText" suffix-icon="el-icon-search" placeholder="输入关键字进行过滤" />
        <div style="height:320px;padding:20px 0">
          <el-tree
            ref="scopeTree"
            class="filter-tree"
            show-checkbox
            :data="data"
            :props="defaultProps"
            default-expand-all
            :filter-node-method="filterNode"
          />
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button @click="scopeVisible = false">取 消</el-button>
          <el-button type="primary" @click="scopeVisible = false">确 定</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>
<script>
import lgTable from '@/views/components/lgTable'
export default {
  name: 'MyCustomer',
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
          label: '正常'
        },
        {
          value: 2,
          label: '被解除'
        }
      ],
      customerOptions: [
        {
          value: 0,
          label: '全部'
        },
        {
          value: 1,
          label: '直销客户'
        },
        {
          value: 2,
          label: '分销客户'
        }
      ],
      listQuery: {
        current: 1,
        pageSize: 10,
        keyWord: '',
        type: '',
        customer: ''
      },
      list: [{}],
      userAttr: {
        thead: [
          {
            label: 'name',
            text: '单位名称'
          },
          {
            label: 'nick',
            text: '单位类型'
          },
          {
            label: 'sex',
            text: '单位性质'
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
                text: '供货范围',
                id: '1',
                type: 'primary'
              },
              {
                name: '2',
                text: '解除关系',
                id: '2',
                type: 'primary'
              }
            ]
          }
        }
      },
      total: 0,
      scopeVisible: false,
      filterText: '',
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      data: [
        {
          id: 1,
          label: '一级 1',
          children: [
            {
              id: 4,
              label: '二级 1-1',
              children: [
                {
                  id: 9,
                  label: '三级 1-1-1'
                },
                {
                  id: 10,
                  label: '三级 1-1-2'
                }
              ]
            }
          ]
        },
        {
          id: 2,
          label: '一级 2',
          children: [
            {
              id: 5,
              label: '二级 2-1'
            },
            {
              id: 6,
              label: '二级 2-2'
            }
          ]
        }
      ]
    }
  },
  watch: {
    filterText(val) {
      this.$refs.scopeTree.filter(val)
    }
  },
  mounted() { },
  methods: {
    handleFilter() { },
    initListQuery() { },
    getListByPagination() { },
    operationEvent0() {
      const id = 111
      this.$router.push({ path: `/details/customerDetail/${id}` })
    },
    operationEvent1() {
      this.scopeVisible = true
    },
    operationEvent2() {
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
    },
    updateRange() { },
    onClose() { },
    filterNode(value, data) {
      if (!value) return true
      return data.label.indexOf(value) !== -1
    }
  }
}
</script>
<style lang="less" scoped>
</style>
