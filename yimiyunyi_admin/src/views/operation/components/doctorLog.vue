<template lang="pug">
  .logBox
    lgTable(columns-type="index"
            columns-label="序号"
            :list="list"
            :total-list="total"
            :lg-thead="doctorLog.tableAttr.thead"
            :isOperation='false'
            @initListQuery="initListQuery"
            @getListByPagination="getListByPagination")
</template>
<script>
import lgTable from '@/views/components/lgTable'
import { doctorLog } from '../columnsConst'
import { list } from '@/api/common'
export default {
  name: 'DoctorLog',
  components: { lgTable },
  props: {
    active: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      doctorLog,
      listQuery: {
        current: 1,
        pageSize: 10
      },
      list: [],
      total: 0,
      apiUri: 'AdminLoginLog'
    }
  },
  watch: {
    active(val, oldVal) {
      if (val === '5') {
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
      const params = Object.assign({}, this.listQuery)
      list(this.apiUri, params).then((res) => {
        if (res.code === 200) {
          this.list = res.list
          this.total = res.total
        }
      })
    }
  }
}
</script>
