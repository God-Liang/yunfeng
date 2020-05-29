<template>
  <div class="app-container">
    <div class="info">
      河南省戈尔医疗器械有限公司
      <i class="el-icon-phone" />
      刘学凯-13732390018
    </div>
    <el-tabs
      v-model="listQuery.activeName"
      @tab-click="handleClick"
    >
      <el-tab-pane name="1">
        <span
          slot="label"
          class="tabname"
        >待审核<span class="tabsum">(20)</span></span>
      </el-tab-pane>
      <el-tab-pane name="2">
        <span
          slot="label"
          class="tabname"
        >已拒绝<span class="tabsum">(20)</span></span>
      </el-tab-pane>
      <el-tab-pane name="3">
        <span
          slot="label"
          class="tabname"
        >已通过<span class="tabsum">(20)</span></span>
      </el-tab-pane>
      <el-tab-pane name="4">
        <span
          slot="label"
          class="tabname"
        >已撤销<span class="tabsum">(20)</span></span>
      </el-tab-pane>
    </el-tabs>
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
  name: 'Details',
  components: { lgTable },
  data() {
    return {
      listQuery: {
        keyWord: '',
        activeName: ''
      },
      list: [{}],
      userAttr: {
        thead: [
          {
            label: 'name',
            text: '注册证'
          },
          {
            label: 'nick',
            text: '厂家'
          },
          {
            label: 'sex',
            text: '推送时间'
          }
        ],
        buttons: {
          status: false, // 是否区分操作状态 true：根据当前列的数据状态值使用operation[状态值]; false：使用operation[0]
          width: 200, // 表格操作列的宽度
          operation: {
            // 操作按钮配置
            0: [
              {
                name: '0',
                text: '重新推送',
                id: '0',
                type: 'primary'
              },
              {
                name: '1',
                text: '删除',
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
    handleClick() {},
    handleFilter() {},
    initListQuery() {},
    getListByPagination() {},
    operationEvent0() {},
    operationEvent1() {}
  }
}
</script>
<style lang="scss" scoped>
.info {
  font-size: 12px;
  border-bottom: 1px solid #bebebe;
  padding-bottom: 10px;
}
.tabname {
  padding: 0 20px;
  .tabsum {
    color: #cd1616;
  }
}
</style>
