<template>
  <div :class="className" :style="{height:height,width:width}"></div>
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
import { debounce } from '@/utils'
const animationDuration = 3000

export default {
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '370px'
    },
    analyze: {
      type: Object,
      default() {
        return {
          title: '测试项目2',
          xAxis: ['测试项21', '测试项22', '测试项23', '测试项24', '测试项25'],
          data: [79, 52, 200, 334, 390, 330, 220]
        }
      }
    },
    axisTage: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      chart: null,
      xAxis: [],
      data: []
    }
  },
  mounted() {
    this.initChart()
    this.__resizeHanlder = debounce(() => {
      if (this.chart) {
        this.chart.resize()
      }
    }, 100)
    window.addEventListener('resize', this.__resizeHanlder)
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
      this.chart = echarts.init(this.$el, 'macarons')

      this.chart.setOption({
        title: {
          text: this.analyze.title,
          x: 'left',
          textStyle: {
            fontSize: 16,
            color: '#333',
            fontWeight: 'bold'
          },
          subtext: this.analyze.subtext
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: this.analyze.grid,
        xAxis: [{
          show: this.analyze.yAxisTage,
          type: 'category',
          boundaryGap: this.analyze.boundaryGap,
          data: this.analyze.xAxis,
          axisTick: {
            alignWithLabel: false,
            show: false
          },
          axisLabel: {
            show: this.analyze.axisTage,
            textStyle: {
              color: '#333'
            }
          },
          axisLine: {
            lineStyle: {
              type: 'solid',
              color: '#ccc',
              width: '1'
            }
          }
        }],
        yAxis: [{
          show: this.analyze.yAxisTage,
          type: 'value',
          axisTick: {
            show: false
          },
          axisLabel: {
            show: this.analyze.axisTage,
            textStyle: {
              color: '#333'
            }
          },
          axisLine: {
            lineStyle: {
              type: 'solid',
              color: '#fff',
              width: '1'
            }
          },
          splitArea: {
            show: false
          },
          splitLine: {// 终于找到了，背景图的内置表格中“边框”的颜色线条  这个是x轴的竖线
            show: true,
            lineStyle: {
              color: '#ccc',
              type: 'dashed'
            }
          }
        }],
        series: [{
          name: this.analyze.name,
          type: this.analyze.seriesType,
          stack: 'vistors',
          barWidth: this.analyze.barWidth,
          data: this.analyze.data,
          animationDuration,
          symbol: 'none',
          sampling: 'average',
          large: true,
          itemStyle: {
            normal: {
              color: '#3ba1ff',
              areaStyle: {
                color: this.analyze.areaStyle.color
              },
              lineStyle: {
                color: '#975fe4'
              }
            }
          }
        }]
      })
    }
  }
}
</script>
