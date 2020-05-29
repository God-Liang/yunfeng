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
        return {}
      }
    }
  },
  data() {
    return {
      chart: null,
      patient: '',
      time: '',
      ranking: []
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
  mounted() {},
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
            color: '#a2a2a2',
            fontWeight: 'bold'
          },
          subtext: ''
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'line'
          }
        },
        dataZoom: [{
          type: 'slider',
          show: false,
          realtime: false,
          start: 0,
          end: 100,
          handleSize: 5,
          height: 0
        },
        {
          type: 'inside',
          realtime: false
        }],
        xAxis: {
          type: 'category',
          boundaryGap: false,
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
            interval: 5,
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
          },
          areaStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(
                0, 0, 0, 1,
                [
                  { offset: 0, color: this.analyze.bgColor },
                  { offset: 1, color: '#fff' }
                ]
              )
            }
          }
        }]
      })
    }
  }
}
</script>
