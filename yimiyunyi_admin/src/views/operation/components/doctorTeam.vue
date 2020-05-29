<template lang="pug">
  .teamMembersBox
    lgTable(columns-type="index"
            columns-label="序号"
            :list="list"
            :total-list="total"
            :lg-thead="doctorTeam.tableAttr.thead"
            :isOperation='false'
            @initListQuery="initListQuery"
            @getListByPagination="getListByPagination")
</template>
<script>
import lgTable from '@/views/components/lgTable'
import { doctorTeam } from '../columnsConst'
import { list } from '@/api/doctor'
export default {
  name: 'DoctorTeam',
  components: { lgTable },
  props: {
    active: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      doctorTeam,
      listQuery: {
        current: 1,
        pageSize: 10
      },
      filters: {
        doctorId: this.$route.params.id
      },
      list: [],
      total: 0
    }
  },
  watch: {
    active(val, oldVal) {
      if (val === '3') {
        this.getList()
      }
    }
  },
  methods: {
    // 初始化页数与条数
    initListQuery(listQuery) {
      this.listQuery = listQuery
    },
    // 分页操作
    getListByPagination(listQuery) {
      this.listQuery = listQuery
      this.getList()
    },
    getList() {
      const params = Object.assign({}, this.listQuery, this.filters)
      list(params).then((res) => {
        if (res.code === 200) {
          this.list = res.list
          this.total = res.total
        }
      })
    }
  }
}
</script>
