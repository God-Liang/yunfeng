<template lang="pug">
  .certificationInfo
    .lgNullData(v-if="info.verifyStatus !== 1") 暂未认证
    ul.cers(v-else)
      li
        div.tit 胸牌/工作证
        img(v-if="info.authUrl2" :src="info.authUrl2")
        .imgNull(v-else)
      li
        div.tit 医师资格证
        img(v-if="info.authUrl1" :src="info.authUrl1")
        .imgNull(v-else)
      li
        div.tit 医师执业证
        img(v-if="info.professionUrl" :src="info.professionUrl")
        .imgNull(v-else)
      li
        div.tit 医生职称证
        img(v-if="info.jobUrl" :src="info.jobUrl")
        .imgNull(v-else)
</template>
<script>
export default {
  name: 'CertificationInfo',
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
.certificationInfo {
  .cers {
    margin-bottom: 40px;
    display: flex;
    justify-content: space-between;
    max-width: 1000px;
    li {
      .tit {
        position: relative;
        line-height: 20px;
        padding-left: 10px;
        margin-bottom: 20px;
        font-size: 14px;
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
      img {
        width: 180px;
        height: 180px;
        background: #e4e4e4;
        border-radius: 5px;
        object-fit: cover;
      }
      .imgNull {
        width: 180px;
        height: 180px;
        background: #e4e4e4;
        border-radius: 5px;
      }
    }
  }
}

</style>
