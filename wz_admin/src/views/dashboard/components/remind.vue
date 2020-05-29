<template>
  <div class="remind">
    <div class="tit">智能提醒</div>
    <div class="sum">您有<span>{{ remid.un_order_count || 0 }}</span>条订单未处理</div>
    <div class="ul">
      <div class="li">1周即将过期的注册证 : {{ remid.cf_week_out_count || 0 }}种</div>
      <div class="li">1个月即将过期的注册证 : {{ remid.cf_month_count || 0 }}种</div>
      <div class="li">3个月即将过期的注册证 : {{ remid.cf_month3_out_count || 0 }}种</div>
      <div class="li">6个月即将过期的注册证 : {{ remid.cf_month6_out_count || 0 }}种</div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Remind',
  props: {
    remidData: {
      type: Object
    }
  },
  data() {
    return {
      remid: {
        un_order_count: 0,
        cf_week_out_count: 0,
        cf_month_count: 0,
        cf_month3_out_count: 0,
        cf_month6_out_count: 0
      }
    }
  },
  mounted() {
    this.changeData()
  },
  methods: {
    changeData() {
      this.remid = this.remidData
    }
  }
}
</script>
<style lang="scss" scoped>
.remind {
  height: 590px;
  background: #fff;
  border-radius: 5px;
  .tit {
    line-height: 60px;
    position: relative;
    padding-left: 40px;
    border-bottom: 1px solid #f1f1f1;
    &::after {
      display: block;
      content: "";
      position: absolute;
      width: 4px;
      height: 20px;
      background: #03a9ac;
      left: 20px;
      top: 20px;
    }
  }
  .sum {
    line-height: 90px;
    border-bottom: 1px solid #f1f1f1;
    padding-left: 60px;
    background: url(../../../assets/tip.png) no-repeat 20px center;
    span {
      color: red;
    }
  }
  .ul {
    padding: 20px;
    .li {
      line-height: 30px;
    }
  }
}
</style>
