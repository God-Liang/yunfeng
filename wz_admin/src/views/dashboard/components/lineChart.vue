<template>
  <div class="lineChart">
    <div :class="className" />
  </div>
</template>
<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
import resize from './mixins/resize'

// const animationDuration = 6000
export default {
  name: 'LineChart',
  mixins: [resize],
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    type: {
      type: String,
      default: '1'
    },
    lineData: {
      type: Object
    }
  },
  data() {
    return {
      chart: null,
      chartData: {
        x_data: [],
        order_data: [],
        notice_data: [],
        avg_data: []
      }
    }
  },
  watch: {
    // type(val, oldval) {
    //   this.changeData()
    // }
    lineData: {
      handler: function(val, oldval) {
        this.changeData()
      },
      deep: true
    }
  },
  mounted() {
    // this.changeData()
    // this.$nextTick(() => {
    //  this.initChart()
    // })
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    changeData() {
      this.chartData = this.lineData
      this.initChart()
    },
    initChart() {
      const el = this.chartData
      this.chart = echarts.init(this.$el)

      this.chart.setOption({
        title: {
          text: '订单金额统计',
          left: 'center',
          top: '20',
          textStyle: {
            fontSize: 20,
            fontWeight: 'bold'
          }
        },
        color: ['#ffb422', '#84c8eb', '#03a9ac'],
        grid: {
          left: 60,
          top: 90,
          right: 60,
          bottom: 40
        },
        legend: {
          top: '60',
          icon: 'circle',
          right: '60'
        },
        tooltip: {
          trigger: 'axis'
        },
        xAxis: {
          name: '时间',
          boundaryGap: false,
          data: el.x_data
        },
        yAxis: {
          name: '金额（元）',
          type: 'value'
        },
        series: [
          {
            name: '预期金额',
            type: 'line',
            data: el.order_data
          },
          {
            name: '完成金额',
            type: 'line',
            data: el.notice_data
          },
          {
            name: '平均金额',
            type: 'line',
            data: el.avg_data
          }
        ]
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.lineChart {
  height: 450px;
  width: 100%;
  background: #fff;
  border-radius: 5px;
  margin-top: 20px;
}
</style>
