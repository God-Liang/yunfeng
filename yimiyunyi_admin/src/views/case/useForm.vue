<template lang="pug">
  .lg-container
    .lg-container-white
      el-container
        el-header
          h2 查看量表
        el-main
          .bgGray
            fm-generate-form(v-if="widgetForm.list.length > 0"
              ref="generateForm"
              insite="true"
              :data="widgetForm"
              :value="widgetModels"
              :remote="remoteFuncs")
            #lgNullData(v-else) 暂未数据，请前往设置
</template>
<script>
import { read } from '@/api/common'
export default {
  data() {
    return {
      apiUri: 'template',
      widgetForm: {
        list: [],
        config: {
          labelWidth: 100,
          labelPosition: 'right',
          size: 'small'
        }
      },
      widgetModels: {},
      remoteFuncs: {}
    }
  },
  mounted() {
    read(this.apiUri, parseInt(this.$route.params.id)).then(res => {
      if (res.code === 200) {
        if (res.info.htmlContent) {
          this.widgetForm = JSON.parse(res.info.htmlContent)
        }
      }
    })
  },
  methods: {
    // 保存结果
    handleTest() {
      this.$refs.generateForm.getData().then(data => {
        console.log(data)
      }).catch(e => {
        console.log(e)
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.lg-container {
  padding: 0;
  .lg-container-white {
    padding: 0;
    overflow: auto;
    > .el-container {
      background-color: #f0f2f5;
      height: 100%;
      > .el-header {
        line-height: 60px;
        display: flex;
        justify-content: space-between;
        border-bottom: 1px solid #e6e6e6;
        background-color: #fff;
        h2 {
          font-size: 16px;
          margin: 0;
          color: #333333;
        }
      }
      > .el-main {
        padding: 15px;
        .bgGray {
          background-color: #fff;
          height: 100%;
          padding: 15px;
          overflow: auto;
        }
      }
    }
  }
}
</style>
