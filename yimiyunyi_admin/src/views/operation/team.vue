<template lang="pug">
  .lg-container
    lgExhibition(:exhibitionData="exhibitionData")
    .lg-container-white
      .filter-container
        el-radio-group.filter-item(v-model="filters.verifyStatus" @change="change")
          el-radio-button(label="") 全部
          el-radio-button(label="0") 待审核
          el-radio-button(label="1") 审核通过
          el-radio-button(label="2") 审核不通过
          el-radio-button(label="3") 已注销
        el-input.filter-item.w250(v-model="filters.keyWord" suffix-icon="el-icon-search" placeholder="请输入提交人账号/昵称/内容" @keyup.enter.native="handleFilter")
      lgTable(columns-type="index"
            columns-label="序号"
            :list="list"
            :total-list="total"
            :lg-thead="team.tableAttr.thead"
            :lg-buttons="team.tableAttr.buttons"
            @operationEvent0="operationEvent0"
            @operationEvent1="operationEvent1"
            @initListQuery="initListQuery"
            @getListByPagination="getListByPagination")
</template>
<script>
import { team } from './columnsConst'
import lgTable from '@/views/components/lgTable'
import lgExhibition from '@/views/components/lgExhibition'
import { list, statistics, createOrUpdate } from '@/api/common'
export default {
  name: 'ComponentName',
  components: { lgTable, lgExhibition },
  data() {
    return {
      team,
      apiUri: 'followupTeam',
      num: {},
      list: [],
      total: 0,
      filters: {
        verifyStatus: '',
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
            img: require('@/assets/img/s_1.png'),
            num: this.num.checkPendingTeam,
            unit: '个',
            title: '待审核团队'
          }, {
            ratio: 8,
            img: require('@/assets/img/t_4.png'),
            num: this.num.hospitalTeam,
            unit: '个',
            title: '院内团队'
          }, {
            ratio: 8,
            img: require('@/assets/img/t_5.png'),
            num: this.num.medicalTeam,
            unit: '个',
            title: '名医团队'
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
    // 审核
    operationEvent0(row) {
      this.$confirm('是否审核通过?', '提示', {
        confirmButtonText: '审核通过',
        cancelButtonText: '拒绝',
        distinguishCancelAndClose: true,
        type: 'warning'
      }).then((val) => {
        const params = {
          id: row.id,
          verifyStatus: 1
        }
        createOrUpdate(this.apiUri, params).then(res => {
          if (res.code === 200) {
            this.getList()
            this.$notify({
              title: '成功',
              message: '审核通过',
              type: 'success',
              duration: 2000
            })
          }
        })
      }).catch((action) => {
        if (action === 'cancel') {
          const params = {
            id: row.id,
            verifyStatus: 2
          }
          createOrUpdate(this.apiUri, params).then(res => {
            if (res.code === 200) {
              this.getList()
              this.$notify({
                title: '成功',
                message: '审核不通过',
                type: 'success',
                duration: 2000
              })
            }
          })
          // this.$prompt('', '填写拒绝理由', {
          //   confirmButtonText: '确定',
          //   cancelButtonText: '取消',
          //   inputValidator: (value) => { // 点击按钮时，对文本框里面的值进行验证
          //     if (!value) {
          //       return '拒绝理由不能为空！'
          //     }
          //   }
          // })
          //   .then(({ value }) => {

          //   })
          //   .catch(() => {})
        }
      })
    },
    // 查看
    operationEvent1(row) {
      this.$router.push({ path: `/details/teamDetial/${row.id}` })
    }
  }
}
</script>
<style lang="scss" scoped>

.lg-container-white {
  margin-top: 20px;
  height: calc(100% - 140px);
}
</style>
