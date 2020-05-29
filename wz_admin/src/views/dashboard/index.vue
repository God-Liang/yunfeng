<template>
  <div class="content">
    <el-row :gutter="20">
      <el-col :span="18">
        <panel :info-data="info" />
        <div class="col">
          <lineChart :line-data="lineData" :type="type1" />
          <el-radio-group
            v-model="type1"
            class="types"
            size="small"
            @change="changeType1"
          >
            <el-radio-button label="1">近一周</el-radio-button>
            <el-radio-button label="2">近一月</el-radio-button>
            <el-radio-button label="3">近半年</el-radio-button>
            <el-radio-button label="4">近一年</el-radio-button>
          </el-radio-group>
        </div>
      </el-col>
      <el-col :span="6">
        <remind :remid-data="remidData" />
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="12">
        <div class="col">
          <pieChart :f-chart-data="customer_proportion" :type="type2" chart-title="客户订单数占比" />
          <el-radio-group
            v-model="type2"
            class="types"
            size="small"
            @change="changeType2"
          >
            <el-radio-button label="1">近一周</el-radio-button>
            <el-radio-button label="2">近一月</el-radio-button>
            <el-radio-button label="3">近半年</el-radio-button>
            <el-radio-button label="4">近一年</el-radio-button>
          </el-radio-group>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="col">
          <pieChart :f-chart-data="customer_money_proportion" :type="type3" chart-title="客户订单金额占比" />
          <el-radio-group
            v-model="type3"
            class="types"
            size="small"
            @change="changeType3"
          >
            <el-radio-button label="1">近一周</el-radio-button>
            <el-radio-button label="2">近一月</el-radio-button>
            <el-radio-button label="3">近半年</el-radio-button>
            <el-radio-button label="4">近一年</el-radio-button>
          </el-radio-group>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { index } from '@/api/common'
import panel from './components/panel.vue'
import remind from './components/remind.vue'
import lineChart from './components/lineChart.vue'
import pieChart from './components/pieChart.vue'
export default {
  name: 'Index',
  components: { panel, remind, lineChart, pieChart },
  data() {
    return {
      type1: '1',
      type2: '1',
      type3: '1',
      remidData: {
        un_order_count: 10,
        cf_week_out_count: 0,
        cf_month_count: 0,
        cf_month3_out_count: 0,
        cf_month6_out_count: 0
      },
      info: {
        order_count: 0,
        customer_count: 0,
        money_count: 0,
        certificate_count: 0
      },
      lineData: {
        x_data: [],
        order_data: [],
        notice_data: [],
        avg_data: []
      },
      customer_proportion: {
        total: 0,
        data: []
      },
      customer_money_proportion: {
        total: 0,
        data: []
      }
    }
  },
  created() {
    // const userInfo = sessionStorage.getItem('userInfo')
    // console.log(userInfo)
  },
  mounted() {
    this.getData()
  },
  methods: {
    changeType1() {
      const params = { 'input.key': this.type1 }
      index('orderLine', params).then((res) => {
        if (res.success) {
          this.lineData = res.data
        }
      })
    },
    changeType2() {
      const params = { 'input.key': this.type2, 'input.type': 1 }
      index('customerPie', params).then((res) => {
        if (res.success) {
          this.customer_proportion = res.data
        }
      })
    },
    changeType3() {
      const params = { 'input.key': this.type3, 'input.type': 2 }
      index('customerPie', params).then((res) => {
        if (res.success) {
          this.customer_money_proportion = res.data
        }
      })
    },
    // 获取数据
    getData() {
      const params = []
      index('info', params).then((res) => {
        if (res.success) {
          this.remidData.un_order_count = res.data.un_order_count
          this.remidData.cf_week_out_count = res.data.cf_week_out_count
          this.remidData.cf_month_count = res.data.cf_month_count
          this.remidData.cf_month3_out_count = res.data.cf_month3_out_count
          this.remidData.cf_month6_out_count = res.data.cf_month6_out_count
          this.info.order_count = res.data.order_count
          this.info.customer_count = res.data.customer_count
          this.info.money_count = res.data.money_count
          this.info.certificate_count = res.data.certificate_count
          this.lineData = res.data.order_statistics_data
          this.customer_proportion = res.data.customer_proportion
          this.customer_money_proportion = res.data.customer_money_proportion
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.content {
  // height: 100vh;
  width: 100%;
  padding: 20px;
  background: #f4f4f4;
  .col {
    position: relative;
    .types {
      position: absolute;
      right: 20px;
      top: 20px;
    }
  }
}
</style>
