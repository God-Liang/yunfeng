<template>
  <div class="PAERecord" ref="sectionBox">
    <div class="sectionBox">
      <h2>
        <span>宣教记录</span>
      </h2>
      <div class="box">
        <complex-table
          :list="list"
          :theadList="theadList"
          :totalList="totalList1"
          :hasSelection='false'
          :operationButtons="operationButtons"
          @operationEvent0='operationEvent0'
          @getListByPagination="getTableList1"
          @initListQuery="initListQuery"
        ></complex-table>
      </div>
    </div>
    <el-dialog
      title="宣教详情"
      :visible.sync="dialogVisible"
      width="600px"
      :before-close="handleClose">
      <div v-html="paeDetails"></div>
    </el-dialog>
  </div>
</template>
<script>
import complexTable from '@/views/table/complexTable'
import { getEduRecord } from '@/api/patientArchives'
export default {
  components: { complexTable },
  data() {
    return {
      list: [],
      theadList: [
        {
          label: 'eduTime',
          text: '宣教时间'
        },
        {
          label: 'executeName',
          text: '执行人'
        },
        {
          label: 'eduTypeShow',
          text: '宣教类型'
        }
      ],
      filter: {
        page: 1,
        limit: 10
      },
      totalList1: 0,
      operationButtons: [
        {
          name: 'look',
          text: '查看详情',
          id: 0,
          type: 'text'
        }
      ],
      dialogVisible: false,
      paeDetails: ''
    }
  },
  mounted() {
    const CH = document.body.offsetHeight
    this.$refs.sectionBox.style.height = CH - 78 + 'px'
    this.getTableList1()
  },
  created() {
    this.filter.patientId = this.patientId
  },
  methods: {
    initListQuery(listQuery) {
      this.filter.limit = listQuery.limit
      this.filter.page = listQuery.page
    },
    getTableList1() {
      const query = Object.assign({ appointId: this.$route.params.id }, this.filter)
      getEduRecord(query).then(res => {
        if (res.data.code === 200) {
          this.list = res.data.list
          this.totalList1 = parseInt(res.data.total)
        }
      })
    },
    operationEvent0(row) {
      this.paeDetails = row.eduContent
      this.dialogVisible = true
    },
    handleClose(done) {
      done()
    }
  }
}
</script>
<style lang="scss" scoped>
@import "../../styles/case.scss";
.PAERecord .sectionBox {
  min-height: 100%;
  .box {
    padding: 0;
  }
}
</style>



