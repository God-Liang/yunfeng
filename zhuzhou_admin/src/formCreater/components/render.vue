<template>
<div>
  <el-form ref="formValidate" class="b-a" :label-width="'100px'" :model="formData" :label-position = '"top"' @submit.native.prevent>
    <!--<p>未绑定数据字典控件无效</p>-->
    <renders 
      v-for="(element,index) in template_form" 
      :key="index" 
      :index="index" 
      :ele="element.ele" 
      :obj="element.obj || {}" 
      :data="formData" 
      @handleChangeVal="val => handleChangeVal(val,element)" 
      @changeVisibility="changeVisibility" 
      :value="formData[element.obj.name]"
      :border = border
      :sortableItem="template_form">
    </renders>
    <div>
      <el-button type="primary" @click="handlePreview('formValidate')" style="margin-left: 8px">预览</el-button>
    </div>
  </el-form>
  <el-dialog title="预览" :visible.sync="previewShow">
    <div v-if = 'previewShow'>
      <preview v-for="(item, index) in template_form" :key="index" :ele="item.ele" :obj="item.obj"></preview>
    </div>
  </el-dialog>
</div>
</template>
<script>
export default {
  props: {
    template_form: [String, Array],
    border: {
      type: Boolean,
      default: true
    },
    lgCheck: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      formData: {},
      previewShow: false
    }
  },
  methods: {
    // 控件回填数据
    handleChangeVal(val, element) {
      this.$set(this.formData, element.obj.name, val)
      this.formData[element.obj.name] = val
    },
    handlePreview() {
      if (this.lgCheck) { // 详情页面直接浏览
        this.previewShow = true
        return false
      }
      const valid = this.checkValid()
      if (valid) {
        // window.localStorage.setItem('template_form', JSON.stringify(this.template_form))
        this.$message({ message: 'Success!', type: 'success' })
        // this.$router.push('/preview')
        this.previewShow = true
      } else {
        this.$message.error('请填写必填项!')
      }
    },
    checkValid() {
      let flag = false
      this.$refs['formValidate'].validate((valid) => {
        if (valid) {
          // window.localStorage.setItem('template_form', JSON.stringify(this.template_form))
          flag = true
          // this.$router.push('/preview')
        }
      })
      return flag
    },
    // 更改当前渲染字段是否显示
    changeVisibility(index, visibility) {
      this.$set(this.template_form[index].obj, 'visibility', visibility)
    }
  },
  watch: {
    template_form: function() {
      for (const i in this.template_form) {
        this.$set(this.formData, this.template_form[i].obj.name, this.template_form[i].obj.value)
      }
    }
  }
}

</script>
<style lang="scss" scoped>
  .b-a{
    padding: 20px;
  }
</style>

