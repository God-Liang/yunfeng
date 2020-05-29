<template lang="pug">
  .lg-container(v-wechat-title="appTitle")
    .load-container(v-if="isLoading")
      i.lg-icon-loading.lg-mescroll-rotate
      span 加载中 ...
    template(v-else)
      h5.lg-title {{title}}
      fm-generate-form(v-if="widgetForm.list.length > 0 && type === 1" ref="generateForm" insite="true" :data="widgetForm" :value="widgetModels" :remote="remoteFuncs")
      div(v-if="content !== '' && type === 2" v-html="content")
      #lgNullData(v-if="lgnullFlag") 暂无数据，请告知医生
      Button.lg-save-btn(type="primary" v-if="type === 1" :disabled="isBtn ? false : 'disabled'" @click="handleTest" color="#03A9AC") {{buttonText}}
</template>
<script>
import { read } from '@/api/common'
import { updataRead, lgSave } from '@/api/followup'
import { Button, Dialog, Toast } from 'vant'
export default {
  components: { Button },
  data () {
    return {
      apiUri: 'AppPlanNodeItem',
      buttonText: '提交',
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
      widgetModels: {},
      remoteFuncs: {},
      isLoading: true,
      lgnullFlag: false,
      content: '',
      type: 0,
      isBtn: false,
      analysisResult: '',
      analysisList: []
    }
  },
  mounted () {
    this.readInfo()
  },
  methods: {
    readInfo () {
      read(this.apiUri, parseInt(this.$route.query.id)).then(res => {
        if (res.code === 200) {
          if (res.info) {
            this.title = res.info.name
            this.type = res.info.type
            if (this.type === 1) {
              this.appTitle = '量表详情'
              if (res.info.htmlContent) {
                this.widgetForm = JSON.parse(res.info.htmlContent)
                if (this.widgetForm.list.length === 0) {
                  this.lgnullFlag = true
                  this.isBtn = false
                } else {
                  this.lgnullFlag = false
                  this.isBtn = true
                }
              }
            } else {
              this.appTitle = '宣教详情'
              this.isBtn = false
              this.content = res.info.htmlContent
              if (this.content || this.content !== '') {
                this.lgnullFlag = false
              } else {
                this.lgnullFlag = true
              }
              this.updataRead()
            }
            if (res.info.isScore) {
              this.analysisList = JSON.parse(res.info.analysisResult)
            }
            if (res.info.answer) {
              this.widgetModels = JSON.parse(res.info.answer)
              this.isBtn = false
              this.widgetForm.list.map(v => {
                v.options.disabled = true
              })
            }
          } else {
            this.updataRead()
            this.lgnullFlag = true
          }
          if (this.isBtn) {
            this.buttonText = '提交'
          } else {
            this.buttonText = '已提交'
          }
          setTimeout(() => {
            this.isLoading = false
          }, 500)
        }
      })
    },
    updataRead () {
      updataRead(parseInt(this.$route.query.id)).then(res => { })
    },
    // 保存结果
    handleTest () {
      this.$refs.generateForm.getData().then(data => {
        Dialog.confirm({
          title: '提示',
          message: '提交后不可再修改，是否继续'
        }).then(() => {
          // on confirm
          Toast.loading({
            message: '加载中...',
            forbidClick: true,
            overlay: true,
            duration: 0
          })
          const resultArr = this.statisticalPointso(data)
          let sum = 0
          let isAbnormal = false
          resultArr.map(v => {
            if (v.type === 'checkbox') {
              v.resultObj.map(e => {
                sum += e.score
              })
            } else {
              sum += v.resultObj.score
            }
            if (v.resultObj.isAbnormal) {
              isAbnormal = true
            }
          })
          this.analysisList.map(v => {
            if (v.min <= sum && v.max >= sum) {
              this.analysisResult = v.content
            }
          })
          const datas = {
            answer: JSON.stringify(data),
            id: parseInt(this.$route.query.id),
            scaleType: this.type,
            status: 1,
            isUnusual: isAbnormal ? 1 : 0
          }
          lgSave(datas).then(res => {
            Toast.clear()
            if (res.code === 200) {
              this.updataRead()
              this.loading = false
              Toast.success('提交成功')
              this.widgetForm.list.map(v => {
                v.options.disabled = true
              })
              this.readInfo()
              this.isBtn = false
              this.buttonText = '已提交'
            }
          })
        }).catch(() => {
          // on cancel
        })
      })
    },
    // 获取所有单选、下拉框的选择项及结果
    statisticalPointso (data) {
      const selectArr = []
      this.widgetForm.list.map((v, i) => {
        for (const key in data) {
          if (data.hasOwnProperty(key)) {
            if (v.model === key) {
              switch (v.type) {
                case 'select':
                  selectArr.push({
                    type: v.type,
                    model: v.model,
                    options: v.options.options,
                    result: data[key],
                    resultObj: {}
                  })
                  break
                case 'radio':
                  selectArr.push({
                    type: v.type,
                    model: v.model,
                    options: v.options.options,
                    result: data[key],
                    resultObj: {}
                  })
                  break
                case 'checkbox':
                  selectArr.push({
                    type: v.type,
                    model: v.model,
                    options: v.options.options,
                    result: data[key],
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
      return selectArr
    }
  }
}
</script>
<style lang="scss">
img {
  width: 100%;
}
.el-radio,
.el-checkbox,
.el-input {
  white-space: normal;
}
</style>
<style lang="scss" scoped>
.lg-title {
  font-size: 18px;
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
.lg-container {
  padding: 10px;
  background-color: #fff;
  width: 100%;
  min-height: 100vh;
  overflow: auto;
  box-sizing: border-box;
  font-size: 14px;
  .load-container {
    display: flex;
    width: 100%;
    justify-content: center;
    align-items: center;
    margin-top: 40px;
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
