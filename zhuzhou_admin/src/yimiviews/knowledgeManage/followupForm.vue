<template>
  <div class="wrap">
    <div class="flexWrap">
      <div class="leftWrap">
        <div class="filter-container">
          <div class="filterBox">
            <div class="leftPart filterPart">
              <el-input
                style="width: 220px;"
                class="filter-item"
                placeholder="请输入表单名称"
                v-model="filter.keyword"
              ></el-input>
              <el-button
                class="filter-item"
                type="primary"
                v-waves
                icon="el-icon-search"
                @click="handleFilter"
              >搜索</el-button>
              <router-link style="margin-left:10px;" class="filter-item" to="/followupForm/followupFormEdit/0">
                <el-button type="primary">新建表单</el-button>
              </router-link>
            </div>
          </div>
        </div>
        <!-- 列表 -->
        <complexTable
          :columnsType="'index'"
          :list="tableList1"
          :theadList="followupConst.theadList1"
          :totalList="totalList"
          :operationButtons="followupConst.operationButtons1"
          :statusArr="followupConst.statusArr"
          :moreHasOperate="moreHasOperate"
          :hasOperate="hasOperate"
          @getListByPagination="handleFilter"
          @operationEvent0="operationEvent0"
          @operationEvent1="operationEvent1"
          @operationEvent3="operationEvent3"
          @operationEvent4="operationEvent4"
        ></complexTable>
      </div>
      <!--<div class="rightWrap">-->
      <!--<category></category> -->
      <!--</div>-->
      <div class="rightWrap">
        <category :data="filterData" classfiy="表单类别" @selectedType="selectedType" @searchKey="searchKey" :classLoading="classLoading"></category>
      </div>
    </div>
  </div>
</template>

<script>
import waves from '@/directive/waves/index.js'
import complexTable from '@/views/table/complexTable'
import category from '@/yimiviews/components/category'
import { followupConst } from '@/yimiviews/knowledgeManage/columnsConst'
import { page, deleteForm, postForm } from '@/api/knowledgeManage/followupForm'
import { dictionary } from '@/api/knowledgeManage/dictionary'
export default {
  directives: { waves },
  components: { category, complexTable },
  mounted() {
    this.initSelect()
  },
  data() {
    return {
      moreHasOperate: true,
      hasOperate: false,
      followupConst,
      tableList1: [],
      totalList: 0,
      filter: {
        type: '',
        keyword: ''
      },
      listQuery: {
        page: 1,
        limit: 10
      },
      options: [],
      filterData: [],
      classLoading: true
    }
  },
  methods: {
    selectedType(selected) {
      this.filter.type = selected.value
      this.listQuery.page = 1
      this.handleFilter()
    },
    initSelect() {
      dictionary({ type: 'bdlx' }).then((res) => {
        this.options = res.data.list
        this.filterData = res.data.list // 过滤数据
        if (res.data.list.length > 0) {
          this.filter.type = this.options[0].value
          this.handleFilter()
        }
        this.classLoading = false
      })
    },
    // 输入框过滤
    searchKey(keyWord) {
      this.filterData = this.options.filter(v => v.label.indexOf(keyWord) > -1)
    },
    handleFilter() {
      const query = Object.assign({}, this.filter, this.listQuery)
      page(query).then(res => {
        this.tableList1 = res.data.list
        this.totalList = res.data.total
      })
    },
    // 编辑
    operationEvent0(row) {
      this.$router.push('/followupForm/followupFormEdit/' + row.id)
    },
    // 删除
    operationEvent1(row) {
      this.$confirm('您确定要删除此表单吗？', '提示', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteForm(row.id).then((res) => {
          if (res.data.code === 200) {
            this.$message({
              message: '恭喜你，表单删除成功！',
              type: 'success',
              duration: 2000
            })
          }
          this.handleFilter()
        })
      }).catch(action => {
        this.$message({
          type: 'info',
          message: '放弃删除'
        })
      })
    },
    // 启用
    operationEvent3(row) {
      this.$confirm('是否启用?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        postForm({ id: row.id, status: 1 }).then((res) => {
          if (res.data.code === 200) {
            this.$message({
              type: 'success',
              message: '启用成功'
            })
            this.handleFilter()
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消启用'
        })
      })
    },
    // 停用
    operationEvent4(row) {
      this.$confirm('是否禁用?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        postForm({ id: row.id, status: row.status === 0 ? 1 : 0 }).then((res) => {
          if (res.data.code === 200) {
            this.$message({
              type: 'success',
              message: '禁用成功'
            })
            this.handleFilter()
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消禁用'
        })
      })
    }
  }
}
</script>

<style lang="scss">
.wrap {
  .flexWrap {
    display: flex;
    height: 100%;
    background-color: #fff;
    overflow-y: scroll;
    overflow-x: hidden;
    .leftWrap {
      flex: 10;
    }
    .rightWrap {
      flex: 2;
    }
  }
  .filterBox {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .filterPart {
      line-height: 2;
    }
  }
}
</style>
