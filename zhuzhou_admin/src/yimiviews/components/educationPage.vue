<template>
  <div class="eduPage">
    <h4>{{title}}</h4>
    <div class="content" v-html="content"></div>
  </div>
</template>
<script>
import { eduRead } from '@/api/login'
export default {
  name: 'EducationPage',
  data() {
    return {
      title: '',
      content: ''
    }
  },
  mounted() {
    this.getData(this.$route.query.id)
  },
  methods: {
    getData(id) {
      eduRead(id).then(res => {
        if (res.data.code === 200) {
          this.title = res.data.info.name
          this.content = res.data.info.content
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.eduPage{
  background-color: #eee;
  min-height: 100%;
  padding: 30px 20px 0;
  h4{
    margin: 0;
    text-align: center;
    font-size: 20px;
  }
  .content{
    margin-top: 20px;
  }
}
</style>
