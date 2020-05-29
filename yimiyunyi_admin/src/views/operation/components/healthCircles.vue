<template lang="pug">
    .healthCircles
        .list
            .top
                .img
                .text
                    .t1 徐大宝妇科名医馆
                        el-tag( effect="dark" style="margin:0 10px;") 医生说
                        el-tag( effect="dark") 手术
                    .t2 林东东 发布于  2019-10-01 18:00
            .center 武汉协和医院规模宏大，总面积近500亩，由本部、肿瘤中心、西院及在建的国际医院等四部分组成，西院及在建的国际医院等四部分组成，现有床位4800张，武汉协和医院规模宏大，总面积近500亩，由本部、肿瘤中心、西院及在建的国际医院等四部分组成，现有床位4800张临床医技科室57个、研究所/实验室／临床研究中心115个。其中武汉协和医院的核心（即本部）位于.....
            .bot
                .li
                    i(class="el-icon-star-off")
                    span 100
                .li
                    i(class="el-icon-chat-dot-square")
                    span 100
                .li
                    i(class="el-icon-thumb")
                    span 100
</template>
<script>
export default {
  name: 'ComponentName',
  data() {
    return {}
  },
  mounted() {},
  methods: {}
}
</script>
<style lang="scss" scoped>
.healthCircles {
  height: 100%;
  overflow: auto;
  .list {
    height: 230px;
    border-bottom: 1px solid #dcdcdc;
    .top {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      .img {
        width: 60px;
        height: 60px;
        border-radius: 50%;
        border: 1px solid rgba(220, 220, 220, 1);
        margin-right: 20px;
      }
      .text {
        line-height: 30px;
        .t1 {
          font-size: 16px;
          color: #000;
          font-weight: bold;
        }
        .t2 {
          font-size: 14px;
          color: #888;
        }
      }
    }
    .center {
      height: 120px;
      padding: 10px 0;
      line-height: 24px;
      font-size: 14px;
    }
    .bot {
      .li {
        width: 200px;
        height: 40px;
        text-align: center;
        line-height: 40px;
        border-right: 1px solid #dcdcdc;
        float: left;
        color: #888888;
        display: flex;
        justify-content: center;
        i {
          line-height: 40px;
          font-size: 20px;
          margin-right: 10px;
        }
      }
    }
  }
}
</style>
