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
    chartTitle: {
      type: String,
      default: '1'
    },
    fChartData: {
      type: Object
    }
  },
  data() {
    return {
      chart: null,
      chart_data: {
        total: 0,
        data: []
      }
    }
  },
  watch: {
    // type(val, oldval) {
    //   this.changeData()
    // }
    fChartData: {
      handler: function(val, oldval) {
        this.changeData()
      },
      deep: true
    }
  },
  mounted() {
    // this.changeData()
    // this.$nextTick(() => {
    //   this.initChart()
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
      this.chart_data = this.fChartData
      this.initChart()
    },
    initChart() {
      const chartData = this.chart_data.data
      const total = this.chart_data.total
      this.chart = echarts.init(this.$el)

      this.chart.setOption({
        title: {
          text: this.chartTitle,
          left: '20',
          top: '25',
          textStyle: {
            fontSize: 20,
            fontWeight: 'bold'
          }
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        color: [
          '#84c8eb',
          '#a9d8f1',
          '#cee9f7',
          '#e6f4fb',
          '#03a9ac',
          '#4ec3c5',
          '#4ec3c5',
          '#cdeeee',
          '#ffb422',
          '#ffd990'
        ],
        legend: {
          orient: 'vertical',
          left: '70',
          top: '100',
          textStyle: {
            fontSize: 18,
            color: '#888',
            lineHeight: 30
          },
          formatter: name => {
            let index = 0
            const aa = chartData
            aa.forEach((e, i) => {
              if (e.name === name) {
                index = i
              }
            })

            const pro =
              total !== 0
                ? (
                  parseFloat(((aa[index].value || 0) / total).toFixed(4)) *
                    100
                ).toFixed(2)
                : 0
            return name + '  ' + pro + '%'
          }
        },
        series: [
          {
            name: '占比',
            type: 'pie',
            radius: '60%',
            center: ['70%', '60%'],
            avoidLabelOverlap: false,
            label: {
              normal: {
                show: false
                // position: 'center'
              },
              emphasis: {
                show: false
                // textStyle: {
                //   fontSize: '30',
                //   fontWeight: 'bold'
                // }
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data: chartData
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
