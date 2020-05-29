<template>
  <div class="app-container">
    <div class="filter-container">
      <el-select
        v-model="filters['input.order_source']"
        class="marginRB"
        placeholder="订单来源"
        clearable
        size="small"
      >
        <el-option
          v-for="item in ordSourceOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
      <!-- <el-select
        v-model="filters.refundStatus"
        class="marginRB"
        placeholder="退款状态"
        clearable
        size="small"
      >
        <el-option
          v-for="item in refundStatusOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select> -->
      <!-- <el-select
        v-model="filters.status"
        class="marginRB"
        placeholder="状态"
        clearable
        size="small"
      >
        <el-option
          v-for="item in statusOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select> -->
      <!-- <el-select
        v-model="filters.customerService"
        class="marginRB"
        placeholder="客服介入"
        clearable
        size="small"
      >
        <el-option
          v-for="item in customerServiceOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select> -->
      <el-input
        v-model="filters['input.query']"
        placeholder="请输入内容"
        class="input-with-select marginRB"
        style="width:422px"
        size="small"
      >
        <el-select
          slot="prepend"
          v-model="filters['input.order_keyword']"
          placeholder="请选择"
          style="width:140px"
        >
          <el-option
            v-for="item in keywordList"
            :key="item.value"
            :label="item.label"
            :value="item.category_code"
          />
        </el-select>
      </el-input>
      <el-date-picker
        v-model="filters.time"
        style="width:300px"
        class="marginRB"
        size="small"
        type="daterange"
        value-format="yyyy-MM-dd"
        range-separator="~"
        start-placeholder="申请开始日期"
        end-placeholder="申请结束日期"
      />
      <!-- <el-select
        v-model="filters.salesMethod"
        class="marginRB"
        placeholder="销售方式"
        clearable
        size="small"
      >
        <el-option
          v-for="item in salesMethodOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select> -->
      <el-button
        type="primary"
        size="small"
        @click="handleFilter"
      >搜索</el-button>
    </div>
    <lgTable
      columns-type="index"
      columns-label="序号"
      :list="list"
      :total-list="total"
      :lg-thead="userAttr.thead"
      :lg-buttons="userAttr.buttons"
      @operationEventdetails="operationEventdetails"
      @initListQuery="initListQuery"
      @getListByPagination="getListByPagination"
    />
  </div>
</template>
<script>
import lgTable from '@/views/components/lgTable'
import { list, category } from '@/api/common'
export default {
  name: 'QuitSingle',
  components: { lgTable },
  data() {
    return {
      apiUri: 'return',
      ordSourceOptions: [],
      keywordList: [],
      refundStatusOptions: [
        { label: '全部', value: 0 },
        { label: '仅退款', value: 1 },
        { label: '退款退货', value: 2 }
      ],
      statusOptions: [
        { label: '全部', value: 0 },
        { label: '待卖家审核', value: 1 },
        { label: '待买家退货', value: 2 },
        { label: '待卖家验收', value: 3 },
        { label: '仅退款', value: 4 },
        { label: '已完成', value: 5 },
        { label: '审核不通过', value: 6 }
      ],
      customerServiceOptions: [
        { label: '全部', value: 0 },
        { label: '有', value: 1 },
        { label: '无', value: 2 }
      ],
      salesMethodOptions: [
        { label: '全部', value: 0 },
        { label: '过票', value: 1 },
        { label: '直销', value: 2 }
      ],
      filters: {
        'input.order_source': '',
        'input.query': '',
        time: ''
      },
      select: '',
      list: [],
      userAttr: {
        thead: [
          {
            label: 'return_no',
            text: '退款/退货单号'
          },
          {
            label: 'company_name',
            text: '客户名称',
            noedit: true
          },
          {
            label: 'return_money',
            text: '退款金额'
          },
          // {
          //   label: 'order_no',
          //   text: '关联单号',
          //   noedit: true
          // },
          {
            label: 'order_source_name',
            text: '退款类型'
          },
          {
            label: 'create_date',
            text: '退货时间'
          }
        ],
        buttons: {
          status: false, // 是否区分操作状态 true：根据当前列的数据状态值使用operation[状态值]; false：使用operation[0]
          width: 100, // 表格操作列的宽度
          operation: {
            // 操作按钮配置
            0: [
              {
                name: 'details',
                text: '详情',
                id: 'details',
                type: 'primary'
              }
            ]
          }
        }
      },
      total: 0,
      listQuery: {
        current: 1,
        pageSize: 10
      }
    }
  },
  mounted() {
    this.getList()
    this.getCategory_source()
    this.getCategory_keyword()
  },
  methods: {
    // 订单来源字典
    getCategory_source() {
      category('order_source').then((res) => {
        this.ordSourceOptions = res.data.list
        this.ordSourceOptions.unshift({ category_code: '', label: '全部' })
      })
    },
    // 搜索类型字典
    getCategory_keyword() {
      category('refund_keyword').then((res) => {
        this.keywordList = res.data.list
      })
    },
    operationEventdetails(row) {
      const id = row.Id
      this.$router.push({ path: `/details/returned/${id}` })
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
    // 过滤列表
    handleFilter() {
      this.listQuery.current = 1
      this.getList()
    },
    // 获取列表
    getList() {
      const params = Object.assign({}, this.listQuery, this.filters)
      if (this.filters.time !== null && this.filters.time.length > 0) {
        params['input.apply_starttime'] = this.filters.time[0]
        params['input.apply_endtime'] = this.filters.time[1]
      } else {
        params['input.apply_starttime'] = ''
        params['input.apply_endtime'] = ''
      }
      delete params.time
      list(this.apiUri, params).then((res) => {
        if (res.success) {
          this.list = res.data.list
          this.total = res.data.total_count
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.marginRB {
  margin: 0 20px 15px 0;
}
</style>
