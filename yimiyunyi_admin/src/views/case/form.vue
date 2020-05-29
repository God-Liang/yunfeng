<template lang="pug">
  .lg-fm(v-loading="loading" element-loading-text="模板保存中")
    .fm-header
      h2.fm-title 表单设计器
      el-button(@click="goGetBack") 返回
    .fm-container
      fm-making-form(ref="makingForm"
        save-name="保存"
        :event-data="eventData"
        :senior-show="false"
        preview
        generate-json
        clearable
        @handleGenerateJson="handleGenerateJson")
        template(slot="action")
</template>
<script>
import { createVersion, read, createOrUpdate } from '@/api/common'
export default {
  data() {
    return {
      eventData: [{
        label: '事件1',
        value: 1
      },
      {
        label: '事件2',
        value: 2
      }],
      loading: false,
      info: {}
    }
  },
  created() {
    this.getFormData()
  },
  methods: {
    getFormData() {
      read('template', parseInt(this.$route.query.id)).then(res => {
        if (res.code === 200) {
          this.info = res.info
          if (res.info.htmlContent) {
            this.$refs.makingForm.setJSON(JSON.parse(res.info.htmlContent))
          }
        }
      })
    },
    handleGenerateJson(val) {
      this.loading = true
      const data = Object.assign({}, this.info)
      if (data.htmlContent === '' && data.version === 1) {
        const dataObj = {
          id: data.id,
          htmlContent: JSON.stringify(val)
        }
        createOrUpdate('template', dataObj).then(res => {
          if (res.code === 200) {
            this.$notify({
              title: '成功',
              message: '保存成功',
              type: 'success',
              duration: 2000
            })
            window.opener.location.reload()
            this.loading = false
            setTimeout(() => {
              window.close()
            }, 1000)
          }
        })
      } else {
        data.htmlContent = JSON.stringify(val)
        createVersion('template', data).then(res => {
          if (res.code === 200) {
            this.$notify({
              title: '成功',
              message: '保存成功',
              type: 'success',
              duration: 2000
            })
            window.opener.location.reload()
            this.loading = false
            setTimeout(() => {
              window.close()
            }, 1000)
          }
        })
      }
    },
    goGetBack() {
      // this.$router.push('/operation/scale')
      window.close()
    }
  }
}
</script>
<style lang="scss">
@import "~@/styles/element-variables";

.lg-fm {
  height: 100%;
  .fm-header {
    height: 50px;
    box-shadow: 0 2px 10px $--color-primary;
    padding: 0 10px;
    background-color: $--color-primary;
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .fm-title {
      display: inline-block;
      line-height: 50px;
      vertical-align: middle;
      color: #fff;
      font-size: 20px;
      font-weight: 600;
      opacity: 0.8;
      margin-left: 6px;
      cursor: pointer;
    }

  }
  .fm-container {
    height: calc(100% - 50px);
    aside {
      padding: 0;
      margin: 0;
    }
  }
}
</style>
