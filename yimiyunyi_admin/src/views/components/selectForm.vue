<template lang="pug">
  el-dialog(:title="title" :visible.sync="visible" :before-close="close" width="500px")
    el-form(id="formRef"
      ref="followUpForm"
      :model="followUpForm"
      label-width="100px")
      el-form-item(label="表单：" prop="templateId")
        el-select(v-model="followUpForm.templateId"
        filterable
        placeholder="请选择表单"
        @change="getTemplateInfo")
          el-option(v-for="item in formList" :key="item.id" :label="item.name+'('+item.scopeShow+')'" :value="item.id")
    span.dialog-footer(slot="footer")
      el-button(@click="close") 取消
      el-button(type="primary" @click="submitForm") 确定

</template>
<script>
import lgDialog from '@/views/components/lgDialog'
import { getFormList } from '@/api/system'

export default {
  components: { lgDialog },
  props: {
    type: {
      type: Number,
      default: 1
    },
    visible: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ''
    },
    formType: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      followUpForm: {
        templateId: null,
        templateName: '',
        scopeShow: ''
      },
      formList: [],
      allRangeList: []
    }
  },
  watch: {
    visible(val, oldVal) {
      if (val) {
        this.getFormList()
      }
    }
  },
  methods: {
    getFormList(val) {
      const params = {
        type: this.type,
        formTypes: this.formType
      }
      getFormList(params).then(res => {
        if (res.code === 200) {
          this.formList = res.list
        }
      })
    },
    getTemplateInfo(val) {
      const formInfo = this.formList.filter(v => v.id === val)[0]
      this.followUpForm.templateId = formInfo.id
      this.followUpForm.templateName = formInfo.name
      this.followUpForm.scopeShow = formInfo.scopeShow
    },
    close() {
      this.selectReset()
      this.$emit('on-close')
    },
    submitForm() {
      const objData = Object.assign({}, this.followUpForm)
      objData.templateType = this.type
      this.selectReset()
      console.log(objData)
      this.$emit('on-submit', objData)
    },
    selectReset() {
      this.followUpForm = {
        templateId: null,
        templateName: '',
        scopeShow: ''
      }
      this.formList = []
    }
  }
}
</script>
