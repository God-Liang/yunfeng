<template lang="pug">
  .lg-container
    .lg-container-white(v-loading="loading")
      el-container
        el-header
          h2 {{ name }}
          .operationBox
            el-button(type="primary" @click="getBack") 返回
            el-button(type="primary" @click="handleSave") 保存
        el-main
          .bgGray
            Tinymce#tinymceId(v-model="content")
  </div>
</template>
<script>
import Tinymce from '@/components/Tinymce'
import { createOrUpdate, read } from '@/api/common'
import { mapGetters } from 'vuex'
export default {
  components: { Tinymce },
  data() {
    return {
      content: '',
      name: '',
      loading: true,
      patientEducationInfo: {}
    }
  },
  computed: {
    ...mapGetters(['userInfo'])
  },
  mounted() {
    this.getInfo()
  },
  methods: {
    getInfo() {
      read('template', parseInt(this.$route.params.id)).then(res => {
        if (res.code === 200) {
          setTimeout(() => {
            this.loading = false
          }, 500)
          this.content = res.info.htmlContent
          this.name = res.info.name
        }
      })
    },
    getBack() {
      this.$store.dispatch('tagsView/delView', this.$route)
      if (this.userInfo.type === 0) {
        this.$router.push('/operation/mission')
      } else {
        this.$router.push('/operationDoctor/mission')
      }
    },
    handleSave() {
      this.loading = true
      const data = {
        id: parseInt(this.$route.params.id),
        htmlContent: this.content
      }
      createOrUpdate('template', data).then(res => {
        if (res.code === 200) {
          this.loading = false
          this.$message({
            message: '保存成功',
            type: 'success'
          })
          setTimeout(() => {
            this.$store.dispatch('tagsView/delView', this.$route)
            if (this.userInfo.type === 0) {
              this.$router.push('/operation/mission?random=' + Math.floor(Math.random() * 9999))
            } else {
              this.$router.push('/operationDoctor/mission?random=' + Math.floor(Math.random() * 9999))
            }
          }, 1000)
        }
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
        .bgGray {
          background-color: #fff;
          height: 100%;
          padding: 20px;
          overflow: auto;
          border-radius: 4px;
        }
      }
    }
  }
}
</style>
