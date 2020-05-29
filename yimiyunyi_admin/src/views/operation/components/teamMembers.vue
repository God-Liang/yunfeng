<template lang="pug">
  .container
    lgExhibition(:exhibitionData="exhibitionData")
    .table
      .filter-container
        .tit 医生列表
        el-input.filter-item.w400(v-model="filters.keyWord" suffix-icon="el-icon-search" placeholder="请输入提交人账号/昵称/内容" @keyup.enter.native="handleFilter")

      lgTable(columns-type="index"
            columns-label="序号"
            :list="list"
            :total-list="total"
            :lg-thead="teamMembers.tableAttr.thead"
            :lg-buttons="teamMembers.tableAttr.buttons"
            :is-operation='false'
            @initListQuery="initListQuery"
            @getListByPagination="getListByPagination")
</template>
<script>
import { teamMembers } from '../columnsConst'
import lgTable from '@/views/components/lgTable'
import lgExhibition from '@/views/components/lgExhibition'
import { list, statistics } from '@/api/common'
export default {
  name: 'ComponentName',
  components: { lgTable, lgExhibition },
  props: {
    active: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      teamMembers,
      apiUri: 'AdminTeamMember',
      num: {},
      list: [],
      total: 0,
      filters: {
        keyWord: '',
        teamId: this.$route.params.id
      },
      listQuery: {
        current: 1,
        pageSize: 10
      },
      exhibitionData: []
    }
  },
  watch: {
    active(val, oldVal) {
      if (val === '3') {
        this.getStatistics()
        this.getList()
      }
    }
  },
  methods: {
    getStatistics() {
      statistics(this.apiUri, this.filters.teamId).then((res) => {
        if (res.code === 200) {
          this.num = res.info
          this.exhibitionData = [{
            ratio: 12,
            img: require('@/assets/img/t_1.png'),
            num: this.num.newApplication,
            unit: '个',
            title: '新申请医生'
          }, {
            ratio: 12,
            img: require('@/assets/img/t_2.png'),
            num: this.num.famousDoctorNum,
            unit: '个',
            title: '名医数量/医生人数'
          }]
          // {
          //   ratio: 8,
          //   img: require('@/assets/img/t_3.png'),
          //   num: this.num.logoutDoctor,
          //   unit: '个',
          //   title: '注销医生'
          // }
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
    }
  }
}
</script>
<style lang="scss" scoped>
.container {
  height: 100%;
}
.table {
  background: #fff;
  height: calc(100% - 140px);
  border-radius: 5px;
  padding: 24px 0 0;
  overflow: auto;
  border-top: 1px solid #dcdcdc;
  .filter-container {
    display: flex;
    justify-content: space-between;
    .tit {
      // line-height: 30px;
      font-size: 20px;
    }
    .type {
      margin-left: auto;
    }
    .w400 {
      width: 400px;
      margin-left: 20px;
    }
  }
}
</style>
