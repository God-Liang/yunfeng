<template lang="pug">
  .lg-container(v-loading="loadingAll" element-loading-text="加载中...")
    .question
      .list
        .text {{feedbackInfo.content}}
        .bot
          .name
            img.img(v-if="feedbackInfo.avatar" :src="feedbackInfo.avatar")
            .img(v-else)
            span {{feedbackInfo.createName}}
          .from 提交于
            span {{feedbackInfo.source | sourceFilter}}
          .time {{feedbackInfo.createTime}}
    .answer 问题处理
      el-input(type="textarea" placeholder="请输入内容" resize="none" v-model="reply" rows="8" style="margin:20px 0;")
      el-button(type="primary" @click="onSubmit" style="float:right") 提交
    //- .record
    //-   h2 历史记录
    //-   .list
    //-     .text 无法正常登录系统了，登出出现页面报错。
    //-     .bot
    //-       .name
    //-         .img
    //-         span 林东东
    //-       .from 提交于
    //-         span 微信患者端
    //-       .time 2017-10-01 18:00
    //-   .list
    //-     .text 无法正常登录系统了，登出出现页面报错。
    //-     .bot
    //-       .name
    //-         .img
    //-         span 林东东
    //-       .from 提交于
    //-         span 微信患者端
    //-       .time 2017-10-01 18:00
</template>
<script>
import { read, createOrUpdate } from '@/api/common'
export default {
  name: 'ComponentName',
  filters: {
    sourceFilter(val) {
      const sources = ['患者端', '医生端']
      return sources[val]
    }
  },
  data() {
    return {
      reply: '',
      feedbackInfo: {}
    }
  },
  computed: {
    // 通过vuex存储加载状态
    loadingAll() {
      return this.$store.getters.loadingAll
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    getList() {
      read('feedback', this.$route.params.id).then(res => {
        if (res.code === 200) {
          this.feedbackInfo = res.info.feedback
        }
      })
    },
    onSubmit() {
      this.$store.dispatch('app/toggleLoadingAll', true)
      const data = {
        feedbackId: parseInt(this.$route.params.id),
        reply: this.reply
      }
      createOrUpdate('feedbackReply', data).then(res => {
        if (res.code === 200) {
          this.$notify({
            title: '成功',
            message: '提交成功',
            type: 'success',
            duration: 2000
          })
          this.$store.dispatch('tagsView/delView', this.$route)
          this.$router.push('/customerService/feedback?random=' + Math.floor(Math.random() * 9999))
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.lg-container {
  overflow: auto;
  .list {
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    height: 100%;
    .text {
      flex: 1;
      font-size: 16px;
      height: calc(100% - 40px);
    }
    .bot {
      flex: 1;
      height: 40px;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      line-height: 40px;
      font-size: 16px;
      .name {
        display: flex;
        justify-content: flex-start;
        margin-right: 20px;
        .img {
          height: 40px;
          width: 40px;
          background: #cdeeee;
          border-radius: 50%;
          margin-right: 10px;
        }
      }
      .from {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        margin-right: 20px;
        span {
          margin-left: 10px;
          line-height: 28px;
          height: 30px;
          width: 120px;
          text-align: center;
          border-radius: 5px;
          border: 1px solid rgba(220, 220, 220, 1);
          color: #888888;
        }
      }
      .time {
        color: #888888;
      }
    }
  }
  .question,
  .answer {
    height: 140px;
    background: #fff;
    border-radius: 5px;
    padding: 20px;
    font-size: 20px;
  }
  .answer {
    height: 300px;
    margin: 20px 0;
  }
  .record {
    background: #fff;
    border-radius: 5px;
    padding: 20px;
    font-size: 20px;
    h2 {
      font-weight: normal;
      font-size: 20px;
      line-height: 24px;
      margin-bottom: 5px;
    }
    .list {
      height: 120px;
      border-bottom: 1px solid #ccc;
      padding: 10px 0;
    }
  }
}
</style>
