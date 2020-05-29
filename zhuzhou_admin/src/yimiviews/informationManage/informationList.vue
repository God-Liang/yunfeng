<template>
  <div class="lg_wrap">
    <div class="lg_informationList">
      <div class="informationtop">
        <el-select v-model="value" size="small" placeholder="请选择信息状态" @change="getReadStatus">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
        <div class="messageMore" @click="getDispose">
          <span style="font-size:20px;">
            <svg-icon class-name='international-icon' icon-class="sign" />
          </span>
          <span>全部标记为已读</span>
        </div>
      </div>
      <complex-table
        :columnsLabel='"序号"'
        :columnsType='"index"'
        :list="tableList1"
        :totalList="totalList1"
        :theadList="informationListConst.theadList1"
        :hasOperate="false"
        :statusArr="informationListConst.statusArr"
        @getListByPagination="getListByPagination"
      ></complex-table>
    </div>
  </div>
</template>

<script>
import complexTable from '@/views/table/complexTable'
import { informationListConst } from '@/yimiviews/informationManage/columnsConst'
import { list, dispose } from '@/api/informationManage/informationList'
import qs from 'qs'
export default {
  components: { complexTable },
  mounted() {
    this.handleFilter()
  },
  data() {
    return {
      options: [{
        value: '0',
        label: '未读'
      },
      {
        value: '1',
        label: '已读'
      },
      {
        value: '2',
        label: '全部'
      }],
      value: '',
      informationListConst,
      tableList1: [],
      totalList1: 0,
      listQuery: {
        page: 1,
        limit: 10
      },
      filter: {
        readStatus: 2
      }
    }
  },
  created() { },
  methods: {
    getListByPagination(listQuery) {
      this.listQuery = listQuery
      this.handleFilter()
    },
    handleFilter() {
      const query = Object.assign({}, this.listQuery, this.filter)
      list(query).then((res) => {
        this.tableList1 = res.data.list
        this.totalList1 = parseInt(res.data.total)
      })
    },
    getReadStatus(val) {
      this.filter.readStatus = parseInt(val)
      this.handleFilter()
    },
    getDispose() {
      const ids = []
      this.tableList1.forEach((val) => {
        ids.push(val.id)
      })
      dispose(qs.stringify({ ids: ids }, { arrayFormat: 'brackets' })).then((res) => {
        this.$message({
          type: 'success',
          message: '全部标记已读'
        })
        this.handleFilter()
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.lg_informationList {
  width: 100%;
  height: 100%;
  background-color: #fff;
  overflow: auto;
  border-radius: 4px;
  .informationtop {
    padding: 10px 20px;
    display: flex;
    justify-content: space-between;
    .messageMore {
      color: #1890ff;
      line-height: 32px;
      font-size: 14px;
      cursor: pointer;
    }
  }
}
</style>