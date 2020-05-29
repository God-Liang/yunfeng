<template lang="pug">
  .lg-container
    .record
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
      .list
        .text {{feedbackReplyInfo.reply}}
        .bot
          .name
            img.img(v-if="feedbackReplyInfo.avatar" :src="feedbackReplyInfo.avatar")
            .img(v-else)
            span {{feedbackReplyInfo.createName}}
          .from 提交于
          .time {{feedbackReplyInfo.createTime}}
</template>
<script>
import { read } from '@/api/common'
export default {
  name: 'ComponentName',
  filters: {
    sourceFilter(val) {
      const statusOptions = ['患者端', '医生端']
      return statusOptions[val]
    }
  },
  data() {
    return {
      apiUri: 'feedback',
      feedbackInfo: {},
      feedbackReplyInfo: {}
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    getList() {
      read(this.apiUri, parseInt(this.$route.params.id)).then(res => {
        if (res.code === 200) {
          this.feedbackInfo = res.info.feedback
          this.feedbackReplyInfo = res.info.feedbackReply
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.lg-container {
  .list {
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    height: 100%;
    .text {
      flex: 1;
      font-size: 16px;
      line-height: 24px;
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
  .record {
    min-height: 100%;
    background: #fff;
    border-radius: 5px;
    padding: 20px;
    font-size: 20px;
    box-sizing: border-box;
    .list {
      min-height: 120px;
      border-bottom: 1px solid #ccc;
      padding: 10px 0;
      margin-bottom: 20px;
    }
  }
}
</style>
