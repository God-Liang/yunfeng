<template lang="pug">
  .lg-container
    lgExhibition(:exhibitionData="exhibitionData")
    .lg-container-white
      .filter-container
        el-radio-group.filter-item.type(v-model="filters.status" @change="change")
          el-radio-button(label="") 全部
          el-radio-button(label="0") 待处理
          el-radio-button(label="1") 已处理
        el-input.filter-item.w250(v-model="filters.keyWord" suffix-icon="el-icon-search" placeholder="请输入提交人账号/昵称/内容" @keyup.enter.native="handleFilter")

      lgTable(columns-type="index"
            columns-label="序号"
            :list="list"
            :total-list="total"
            :lg-thead="feedback.tableAttr.thead"
            :lg-buttons="feedback.tableAttr.buttons"
            @operationEvent0="operationEvent0"
            @operationEvent1="operationEvent1"
            @initListQuery="initListQuery"
            @getListByPagination="getListByPagination")
</template>
<script>
import { feedback } from './columnsConst'
import lgTable from '@/views/components/lgTable'
import lgExhibition from '@/views/components/lgExhibition'
import { list, statistics } from '@/api/common'
export default {
  name: 'ComponentName',
  components: { lgTable, lgExhibition },
  data() {
    return {
      feedback,
      apiUri: 'feedback',
      num: {},
      list: [],
      total: 0,
      filters: {
        status: '',
        keyWord: ''
      },
      listQuery: {
        current: 1,
        pageSize: 10
      },
      exhibitionData: []
    }
  },
  mounted() {
    this.getStatistics()
    this.getList()
  },
  methods: {
    getStatistics() {
      statistics(this.apiUri).then((res) => {
        if (res.code === 200) {
          this.num = res.info
          this.exhibitionData = [{
            ratio: 8,
            img: require('@/assets/img/f_1.png'),
            num: this.num.getFeedbackNum,
            unit: '个',
            title: '待处理意见'
          }, {
            ratio: 8,
            img: require('@/assets/img/f_2.png'),
            num: this.num.getFeedbackWeek,
            unit: '个',
            title: '本周新增意见与反馈'
          }, {
            ratio: 8,
            img: require('@/assets/img/f_3.png'),
            num: this.num.getFeedbackYear,
            unit: '个',
            title: '本年累计处理意见与反馈'
          }]
        }
      })
    },
    getList() {
      const params = Object.assign({}, this.listQuery, this.filters)
      list(this.apiUri, params).then((res) => {
        if (res.code === 200) {
          this.list = res.list
          this.total = res.total
        }
      })
    },
    change() {
      this.getList()
    },
    handleFilter() {
      this.getList()
    },
    // 初始化页数与条数
    initListQuery(listQuery) {
      this.listQuery = listQuery
    },
    // 分页操作
    getListByPagination(listQuery) {
      this.listQuery = listQuery
      this.getList()
    },
    operationEvent0(row) {
      this.$router.push({ path: `/details/solving/${row.id}` })
    },
    operationEvent1(row) {
      this.$router.push({ path: `/details/lookMessage/${row.id}` })
    }
  }
}
</script>
<style lang="scss" scoped>
.lg-container-white {
  margin-top: 20px;
  height: calc(100% - 140px);
  .filter-container {
    justify-content: space-between;
  }
}
</style>
