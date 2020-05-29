<template lang="pug">
  .teamInfo
    .teamInfo_box
      h3.teamInfo_box_title 团队说明
      .teamInfo_box_content.h100(:class="!info.description ? 'lgNull' : ''") {{info.description || '暂无团队说明'}}
    .teamInfo_box
      h3.teamInfo_box_title 擅长手术
      .teamInfo_box_content(:class="!info.operation ? 'lgNull' : ''") {{info.operation || '暂无擅长手术'}}
    .teamInfo_box
      h3.teamInfo_box_title 擅长疾病
      .teamInfo_box_content(:class="!info.disease ? 'lgNull' : ''") {{info.disease || '暂无擅长疾病'}}
    .teamInfo_box
      h3.teamInfo_box_title 团队寄语
      .teamInfo_box_content(:class="!info.teamNote ? 'lgNull' : ''") {{info.teamNote || '暂无团队寄语'}}

</template>
<script>
export default {
  name: 'TeamInfo',
  props: {
    info: {
      type: Object,
      default: function() {
        return {}
      }
    }
  },
  data() {
    return {

    }
  },
  methods: {

  }
}
</script>
<style lang="scss" scoped>
  .teamInfo {
    overflow: auto;
    &_box {
      margin-bottom: 30px;
      &:last-child {
        margin-bottom: 0;
      }
      &_title {
        position: relative;
        line-height: 20px;
        padding-left: 10px;
        margin-bottom: 20px;
        font-size: 14px;
        font-weight: normal;
        &::after {
          position: absolute;
          left: 0;
          top: 0;
          display: block;
          content: '';
          width: 2px;
          height: 20px;
          background: #14b0b2;
        }
      }
      &_content {
        border: 1px solid rgba(204, 204, 204, 1);
        min-height: 55px;
        padding: 10px;
        box-sizing: border-box;
        color: #555555;
        line-height: 22px;
        font-size: 14px;
        &.h100 {
          min-height: 100px;
        }
        .certificateBox {
          display: flex;
          flex-wrap: wrap;
          .certificate_img {
            width: 80px;
            height: 80px;
            margin-right: 10px;
          }
        }
        .lgNull {
          font-size: 14px;
          color: #bbbbbb;
        }
      }
    }
  }
</style>
