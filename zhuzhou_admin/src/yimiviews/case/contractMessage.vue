<template>
  <div class="contractContent">
    <div class="contractList">
      <span class="frist">机构logo：</span>
      <img v-if="contractList.avatar" :src="contractList.avatar" alt class="contractImg">
      <div v-else class="svgSize">
        <svg-icon
          class-name="international-icon"
          class="avatar right_menu_item"
          icon-class="contractLogo"
        />
      </div>
    </div>
    <div class="contractList">
      <span class="frist">机构名称：</span>
      <span>{{contractList.hospitalName}}</span>
    </div>
    <div class="contractList">
      <span class="frist">机构类型：</span>
      <span>{{contractList.hospitalTypeShow}}</span>
    </div>
    <div class="contractList">
      <span class="frist">地址：</span>
      <span>{{contractList.address}}</span>
    </div>
    <div class="contractList">
      <span class="frist">联系人：</span>
      <span>{{contractList.contacts}}</span>
    </div>
    <div class="contractList">
      <span class="frist">联系电话：</span>
      <span>{{contractList.contactMethod}}</span>
    </div>
    <div class="contractList">
      <span class="frist">传真：</span>
      <span>{{contractList.fax}}</span>
    </div>
    <div class="contractList">
      <span class="frist">邮箱：</span>
      <span>{{contractList.email}}</span>
    </div>
    <h5>机构资质</h5>
    <div class="qualification">
      <div class="qualificationitem" v-for="image in contractList.images" :key="image.id">
        <img :src="image.src">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    contractList: {
      type: Object,
      default: function() {
        return {}
      }
    }
  },
  data() {
    return {}
  },
  methods: {}
}
</script>
<style lang="scss" scoped>
.contractContent {
  padding: 20px;
  .contractList {
    display: flex;
    justify-content: flex-start;
    .svgSize {
      font-size: 30px;
    }
    .contractImg {
      width: 40px;
      height: 40px;
      display: inline-block;
    }
    .upload-demo {
      margin-left: 10px;
      span {
        font-size: 12px;
        color: #1890ff;
      }
    }
    span {
      font-size: 14px;
      color: #333333;
      height: 40px;
      line-height: 40px;
      &.frist {
        margin-right: 20px;
        width: 80px;
        display: inline-block;
        text-align: left;
      }
    }
  }
  h5 {
    margin: 0;
    height: 30px;
    line-height: 30px;
    font-size: 14px;
    color: #333;
    border-bottom: 1px solid #eee;
  }
  .qualification {
    margin-top: 20px;
    display: flex;
    justify-content: flex-start;
    .qualificationitem {
      width: 260px;
      height: 260px;
      text-align: center;
      display: flex;
      flex-direction: column;
      img {
        width: 100%;
        height: 100%;
        display: inline-block;
        background-color: red;
      }
    }
  }
}
</style>
