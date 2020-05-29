<template lang="pug">
  .lg-container(v-wechat-title="appTitle")
    .load-container(v-if="isLoading")
      i.lg-icon-loading.lg-mescroll-rotate
      span 加载中 ...
    template(v-else)
      h5.lg-title {{title}}
      fm-generate-form(v-if="widgetForm.list.length > 0 && type === 1" ref="generateForm" insite="true" :data="widgetForm" :value="widgetModels" :remote="remoteFuncs")
      div(v-else-if="content !== '' && type === 2" v-html="content")
      #lgNullData(v-if="lgnullFlag") 暂无数据，请告知医生
      .analysisBox(v-if="analysisResult")
        span 统计分析：
        span {{analysisResult}}
</template>
<script>
import { read } from '@/api/common'
export default {
  data () {
    return {
      apiUri1: 'AppFollowupSolutionNodeItem',
      apiUri2: 'AppPlanNodeItem',
      apiUri3: 'Apptemplate',
      content: '',
      title: '',
      appTitle: '加载中...',
      widgetForm: {
        list: [],
        config: {
          labelWidth: 100,
          labelPosition: 'right',
          size: 'small'
        }
      },
      isLoading: true,
      lgnullFlag: false,
      type: 0,
      name: '',
      widgetModels: {},
      remoteFuncs: {},
      isPlan: 0,
      resultArr: [],
      analysisResult: '',
      analysisList: []
    }
  },
  mounted () {
    this.isPlan = parseInt(this.$route.query.isPlan)
    if (this.$route.query.templateId) {
      this.getTemplate()
    } else {
      if (this.isPlan === 0) {
        this.getSolution()
      } else {
        this.getPlan()
      }
    }
  },
  methods: {
    getTemplate () {
      read(this.apiUri3, parseInt(this.$route.query.templateId)).then(res => {
        if (res.code === 200) {
          if (res.info) {
            this.title = res.info.name
            this.type = parseInt(res.info.type)
            if (this.type === 1) {
              this.appTitle = '量表详情'
              if (res.info.htmlContent) {
                this.widgetForm = JSON.parse(res.info.htmlContent)
                this.widgetForm.list.map(v => {
                  v.options.disabled = true
                })
              }
            } else {
              this.appTitle = '宣教详情'
              this.content = res.info.htmlContent
            }
          }
          setTimeout(() => {
            this.isLoading = false
          }, 500)
        }
      })
    },
    // 获取计划表单数据
    getPlan () {
      read(this.apiUri2, parseInt(this.$route.query.id)).then(res => {
        if (res.code === 200) {
          if (res.info) {
            this.title = res.info.name
            this.type = res.info.type
            if (this.type === 1) {
              this.appTitle = '量表详情'
              if (res.info.htmlContent) {
                this.widgetForm = JSON.parse(res.info.htmlContent)
                this.widgetForm.list.map(v => {
                  v.options.disabled = true
                })
              } else {
                this.lgnullFlag = true
              }
            } else {
              this.appTitle = '宣教详情'
              if (res.info.htmlContent) {
                this.content = res.info.htmlContent
              } else {
                this.lgnullFlag = true
              }
            }
            // 是否存在答案
            if (res.info.answer) {
              this.widgetModels = JSON.parse(res.info.answer)
              if (res.info.isScore) {
                this.analysisList = JSON.parse(res.info.analysisResult)
                this.statisticalPointso()
              }
            }
          }
          setTimeout(() => {
            this.isLoading = false
          }, 500)
        }
      })
    },
    // 获取方案表单数据
    getSolution () {
      read(this.apiUri1, parseInt(this.$route.query.id)).then(res => {
        if (res.code === 200) {
          if (res.info) {
            this.title = res.info.name
            this.type = parseInt(res.info.templateType)
            if (this.type === 1) {
              this.appTitle = '量表详情'
              if (res.info.htmlContent) {
                this.widgetForm = JSON.parse(res.info.htmlContent)
                this.widgetForm.list.map(v => {
                  v.options.disabled = true
                })
              }
            } else {
              this.appTitle = '宣教详情'
              this.content = res.info.htmlContent
            }
          }
          setTimeout(() => {
            this.isLoading = false
          }, 500)
        }
      })
    },
    // 获取所有单选、下拉框的选择项及结果
    statisticalPointso () {
      const selectArr = []
      this.widgetForm.list.map((v, i) => {
        for (const key in this.widgetModels) {
          if (this.widgetModels.hasOwnProperty(key)) {
            if (v.model === key) {
              switch (v.type) {
                case 'select':
                  selectArr.push({
                    type: v.type,
                    model: v.model,
                    options: v.options.options,
                    result: this.widgetModels[key],
                    resultObj: {}
                  })
                  break
                case 'radio':
                  selectArr.push({
                    type: v.type,
                    model: v.model,
                    options: v.options.options,
                    result: this.widgetModels[key],
                    resultObj: {}
                  })
                  break
                case 'checkbox':
                  selectArr.push({
                    type: v.type,
                    model: v.model,
                    options: v.options.options,
                    result: this.widgetModels[key],
                    resultObj: []
                  })
                  break
                default:
                  break
              }
            }
          }
        }
      })
      selectArr.map(v => {
        if (v.type === 'checkbox') {
          v.options.map(e => {
            if (v.result.includes(e.value)) {
              v.resultObj.push({
                score: e.score,
                isAbnormal: e.isAbnormal,
                introduce: e.introduce
              })
            }
          })
        } else {
          v.options.map(e => {
            if (e.value === v.result) {
              v.resultObj = {
                score: e.score,
                isAbnormal: e.isAbnormal,
                introduce: e.introduce
              }
            }
          })
        }
      })
      this.resultArr = selectArr
      this.handlerResult()
    },
    // 通过答案获取总分。得到结果分析
    handlerResult () {
      let sum = 0
      this.resultArr.map(v => {
        if (v.type === 'checkbox') {
          v.resultObj.map(e => {
            sum += e.score
          })
        } else {
          sum += v.resultObj.score
        }
      })
      this.analysisList.map(v => {
        if (v.min <= sum && v.max >= sum) {
          this.analysisResult = v.content
        }
      })
    }
  }
}
</script>
<style lang="scss">
.el-radio,
.el-checkbox,
.el-input {
  white-space: normal;
}
img {
  width: 100%;
}
</style>
<style lang="scss" scoped>
.lg-title {
  font-size: 18px !important;
  color: #111111;
  text-align: center;
  line-height: 26px;
  margin: 0 0 20px;
  padding: 0 30px;
}
// 空数据
#lgNullData {
  display: inline-block;
  width: 100%;
  color: #666666;
  font-size: 14px;
}
// 统计分析结果
.analysisBox {
  span {
    font-size: 14px;
    color: #333;
  }
}
.lg-container {
  padding: 20px;
  background-color: #fff;
  width: 100%;
  overflow: auto;
  min-height: 100vh;
  box-sizing: border-box;
  .load-container {
    display: flex;
    width: 100%;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
    .lg-icon-loading {
      display: inline-block;
      width: 16px;
      height: 16px;
      border-radius: 50%;
      border: 1px solid gray;
      border-bottom-color: transparent;
      vertical-align: middle;
    }
    .lg-mescroll-rotate {
      -webkit-animation: mescrollRotate 0.6s linear infinite;
      animation: mescrollRotate 0.6s linear infinite;
    }
    span {
      color: gray;
      font-size: 14px;
      margin-left: 5px;
    }
  }
}
@-webkit-keyframes mescrollRotate {
  0% {
    -webkit-transform: rotate(0deg);
  }

  100% {
    -webkit-transform: rotate(360deg);
  }
}

@keyframes mescrollRotate {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}
</style>
