<template>
    <div class="wrap ">
        <div class="flexWrap">
            <div class="leftWrap">
                <div class="app-button-container">
                </div>

                <div class="filter-container">
                    <div class= 'filterBox'>
                    <div class='leftPart filterPart'>
                    </div>
                    <div class='rightPart filterPart'>
                        <el-button class="filter-item" type="primary" v-waves @click="goBack()">返回上一层</el-button>
                    </div>
                    </div>
                </div>
                <complexTable 
                  :columnsType= "'index'" 
                  :list = 'tableList1' 
                  :theadList = "followupConst.theadList2" 
                  :totalList = 'totalList' 
                  :statusArr = 'followupConst.statusArr' 
                  :hasOperate = false
                  @getListByPagination = 'handleFilter'
                ></complexTable>
            </div>
            <div class="rightWrap">
                <category></category> 
            </div>
        </div>
    </div>
</template>

<script>
    import waves from '@/directive/waves/index.js'
    import complexTable from '@/views/table/complexTable'
    import category from '@/yimiviews/components/category'
    import { followupConst } from '@/yimiviews/knowledgeManage/columnsConst'
    import { page } from '@/api/knowledgeManage/followupForm'
    export default {
      directives: { waves },
      components: { category, complexTable },
      mounted() {
        this.handleFilter(this.listQuery)
      },
      data() {
        return {
          followupConst,
          tableList1: [],
          totalList: 0,
          filter: {
            keyword: ''
          },
          listQuery: {
            current: 1,
            pageSize: 5
          }

        }
      },
      methods: {
        goBack() {
        //   this.$root.closeTag()
          this.$router.push('/knowledgeManage/followupForm')
        },
        dialogLeftTop1_1() {},

        handleFilter(listQuery) {
          this.listQuery.page = listQuery.page
          this.listQuery.limit = listQuery.limit
          const query = Object.assign({}, this.filter, this.listQuery)
          page(query).then(res => {
            this.tableList1 = res.data.list
            this.totalList = res.data.total
          })
        },
        operationEvent1_0(row) {
        }
      }
    }
</script>

<style lang="scss" scoped>
.wrap{
     .flexWrap{
        display: flex;
        height: 100%;
        background-color: #fff;
        overflow-y: scroll;
        box-sizing: border-box;
        .leftWrap{
            flex: 1;
        }
        .rightWrap{
            width: 240px;
        }
    }
.filterBox{
    display: flex;
    justify-content: space-between;
    align-items: center;
    .filterPart{
      line-height: 2;
    }
  }
}
</style>