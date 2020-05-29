<template>
  <ul class="sumStatsContain">
    <li>
      <div class="img img_1" />
      <div class="info">
        <div class="sum">{{ info.order_count || 0 }}</div>
        <div class="name">订单总数量</div>
      </div>
    </li>
    <li>
      <div class="img img_2" />
      <div class="info">
        <div class="sum">{{ info.customer_count || 0 }}</div>
        <div class="name">客户总数量</div>
      </div>
    </li>
    <li>
      <div class="img img_3" />
      <div class="info">
        <div class="sum">{{ info.money_count || 0 }}</div>
        <div class="name">订单总金额</div>
      </div>
    </li>
    <li>
      <div class="img img_4" />
      <div class="info">
        <div class="sum">{{ info.certificate_count || 0 }}</div>
        <div class="name">注册证数量</div>
      </div>
    </li>
  </ul>
</template>
<script>
export default {
  name: 'Panel',
  props: {
    infoData: {
      type: Object
    }
  },
  data() {
    return {
      info: {
        order_count: 0,
        customer_count: 0,
        money_count: 0,
        certificate_count: 0
      }
    }
  },
  mounted() {
    this.changeData()
  },
  methods: {
    changeData() {
      this.info = this.infoData
    }
  }
}
</script>
<style lang="scss" scoped>
.sumStatsContain {
  width: 100%;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: space-between;
  li {
    width: calc(calc(100% - 60px) / 4);
    height: 120px;
    background: #fff;
    display: flex;
    justify-content: center;
    border-radius: 5px;
    .img {
      width: 80px;
      height: 80px;
      border-radius: 50%;
      margin: 20px 0 10px 20px;
      // background: pink;
      background-image: url(../../../assets/p_1.png);
    }
    .info {
      width: calc(100% - 110px);
      padding: 20px 10px;
      box-sizing: border-box;
      line-height: 40px;
      text-align: center;
      .name {
        font-size: 16px;
        color: #888888;
      }
      .sum {
        font-size: 30px;
      }
    }
    &:nth-child(2) {
      .img {
        background-image: url(../../../assets/p_2.png);
      }
    }
    &:nth-child(3) {
      .img {
        background-image: url(../../../assets/p_3.png);
      }
    }
    &:nth-child(4) {
      .img {
        background-image: url(../../../assets/p_4.png);
      }
    }
  }
}
</style>
