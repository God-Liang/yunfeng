<template>
  <div class="chart" style="height:370px;width:100%;"></div>
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
import { debounce } from '@/utils'

export default {
  props: {
    analyze: {
      type: Object,
      default() {
        return {
          title: '费用统计页面',
          subtext: '单位：万元',
          key: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          value: [820, 932, 901, 934, 1290, 1330, 1320],
          color: '#FECD2E',
          axisLabel: false,
          rotate: 0
        }
      }
    }
  },
  data() {
    return {
      chart: null
    }
  },
  watch: {
    analyze: {
      handler(newValue, oldValue) {
        this.initChart()
        this.__resizeHanlder = debounce(() => {
          if (this.chart) {
            this.chart.resize()
          }
        }, 100)
        window.addEventListener('resize', this.__resizeHanlder)
      },
      deep: true
    }
  },
  mounted() {
    // this.initChart()
    // this.__resizeHanlder = debounce(() => {
    //   if (this.chart) {
    //     this.chart.resize()
    //   }
    // }, 100)
    // window.addEventListener('resize', this.__resizeHanlder)
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    window.removeEventListener('resize', this.__resizeHanlder)
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    initChart() {
      this.chart = echarts.init(this.$el, 'chart')
      this.chart.setOption({
        animation: false,
        title: {
          text: this.analyze.title,
          x: 'left',
          textStyle: {
            fontSize: 14,
            color: '#333',
            fontWeight: 'bold'
          },
          subtext: this.analyze.subtext
        },
        tooltip: {
          trigger: 'axis',
          formatter: '{c}' + this.analyze.symbol,
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'line' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          left: 30,
          right: 70,
          bottom: 30,
          top: 60,
          containLabel: true
        },
        xAxis: {
          type: 'category',
          axisTick: {
            show: false
          },
          axisLine: {
            lineStyle: {
              type: 'solid',
              color: '#8a8a8a',
              width: '1'
            }
          },
          data: this.analyze.key,
          axisLabel: {
            interval: 0,
            rotate: this.analyze.rotate,
            formatter: function(value, index) {
              var texts = value
              return texts
            }
          }
        },
        yAxis: {
          type: 'value',
          axisTick: {
            show: false
          },
          axisLine: {
            lineStyle: {
              type: 'solid',
              color: '#8a8a8a',
              width: '1'
            }
          },
          axisLabel: {
            show: this.analyze.axisLabel,
            interval: 'auto',
            formatter: '{value}' + this.analyze.symbol
          },
          splitLine: {
            show: true,
            lineStyle: {
              type: 'dashed'
            }
          }
        },
        series: [{
          data: this.analyze.value,
          type: 'line',
          itemStyle: {
            normal: {
              color: this.analyze.color
            }
          }
        }]
      })
    }
  }
}
</script>
