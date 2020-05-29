<template lang="pug">
  .lg-container
    .lg-container-white
      el-container
        el-header
          h2 {{ types[type] }}
            span.formName ({{ templateName }}—{{ scopeShow }})
          .operationBox
            el-button(type="primary" @click="getBack") 返回
        el-main
          .bgGray
            fm-generate-form(v-if="widgetForm.list.length > 0"
              ref="generateForm"
              insite="true"
              :data="widgetForm"
              :value="widgetModels"
              :remote="remoteFuncs")
            div(v-else-if="content !== ''" v-html="content")
            #lgNullData(v-else) 暂未数据，请前往设置
</template>
<script>
import { read } from '@/api/common'
export default {
  data() {
    return {
      content: '',
      aprUri: 'template',
      widgetForm: {
        list: [],
        config: {
          labelWidth: 100,
          labelPosition: 'right',
          size: 'small'
        }
      },
      type: null,
      templateName: '',
      scopeShow: '',
      widgetModels: {},
      remoteFuncs: {},
      types: ['', '随访量表', '宣教表单']
    }
  },
  mounted() {
    read(this.aprUri, parseInt(this.$route.params.id)).then(res => {
      if (res.code === 200) {
        this.type = res.info.type
        if (this.type === 1) {
          if (res.info.htmlContent) {
            this.widgetForm = JSON.parse(res.info.htmlContent)
          }
        } else {
          this.content = res.info.htmlContent
        }
        this.templateName = res.info.name
        this.scopeShow = res.info.scopeShow
      }
    })
  },
  methods: {
    getBack() {
      this.$store.dispatch('tagsView/delView', this.$route)
      this.$router.go(-1)
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
          .formName {
            font-size: 13px;
            color: #888888;
          }
        }
      }
      > .el-main {
        .bgGray {
          background-color: #fff;
          min-height: 100%;
          padding: 20px;
          border-radius: 4px;
          overflow: auto;
        }
      }
    }
  }
}
</style>
