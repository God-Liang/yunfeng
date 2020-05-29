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
          title: '', // 标题
          subtext: '', // 描述
          key: [], // x轴数据
          value: [], // y轴数据
          color: '#FECD2E', // 柱状图颜色
          axisLabel: false, // y轴值是否显示
          symbol: '' // 结果值展示样式 例子：symbol: '%' 数据显示 10%
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
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        xAxis: {
          type: 'category',
          axisTick: {
            show: false,
            alignWithLabel: true
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
          axisLabel: {
            show: this.analyze.axisLabel,
            interval: 'auto',
            formatter: '{value}' + this.analyze.symbol
          },
          axisLine: {
            lineStyle: {
              type: 'solid',
              color: '#8a8a8a',
              width: '1'
            }
          },
          splitLine: {
            show: true,
            lineStyle: {
              type: 'dashed',
              color: 'rgba(80, 139, 255, .2)'
            }
          }
        },
        series: [{
          data: this.analyze.value,
          type: 'bar',
          barWidth: '30%',
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
