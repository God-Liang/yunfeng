<template>
  <div class="messageRecord" ref="sectionBox">
    <div class="sectionBox">
      <h2>
        <span>短信记录</span>
      </h2>
      <div class="box">
        <complex-table
          :hasSelection="false"
          :list="list"
          :totalList="totalList"
          :theadList="theadList"
          :operationButtons="operationButtons"
          @getListByPagination="getListByPagination"
          @initListQuery="initListQuery"
        ></complex-table>
      </div>
    </div>
  </div>
</template>
<script>
import complexTable from '@/views/table/complexTable'
import { getSmsRecord } from '@/api/patientArchives'
export default {
  components: { complexTable },
  data() {
    return {
      list: [],
      totalList: 0,
      theadList: [
        {
          label: 'createTime',
          text: '发送时间'
        },
        {
          label: 'updateName',
          text: '发送人'
        },
        {
          label: 'typeShow',
          text: '短信类型'
        },
        {
          label: 'content',
          text: '短信内容'
        }
      ],
      filter: {
        patientId: 0,
        page: 1,
        limit: 10
      },
      operationButtons: [
        {
          name: 'look',
          text: '查看详情',
          id: 0,
          type: 'text'
        }
      ]
    }
  },
  mounted() {
    const CH = document.body.offsetHeight
    this.$refs.sectionBox.style.height = CH - 78 + 'px'
    this.getSmsRecordList()
  },
  created() {},
  methods: {
    initListQuery(listQuery) {
      this.filter = listQuery
    },
    // 分页加载
    getListByPagination(listQuery) {
      this.listQuery = listQuery
      this.getSmsRecordList()
    },
    getSmsRecordList() {
      const query = Object.assign({ appointId: parseInt(this.$route.params.id) }, this.filter)
      getSmsRecord(query).then(res => {
        if (res.data.code === 200) {
          this.list = res.data.list
          this.totalList = parseInt(res.data.total)
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
@import "../../styles/case.scss";
</style>



