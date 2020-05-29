<template>
  <div class="lgOrderDetail">
    <div class="order-container">
      <h3>订单信息</h3>
      <el-row class="logisticsInfo">
        <el-col :span="8">
          <span class="labelNormal">订单编号:</span>
          <span class="labelVal">{{ info.order_no }}</span>
          <!-- <router-link
            class="labelVal"
            to="/details/OrderDetails/0"
          >{{ info.order_no }}</router-link> -->
        </el-col>
        <el-col :span="8">
          <span class="labelNormal">订单来源:</span>
          <span class="labelVal">{{ info.order_source_name }}</span>
        </el-col>
        <el-col :span="8">
          <span class="labelNormal">订单金额:</span>
          <span class="labelVal">{{ info.order_price }}</span>
        </el-col>
      </el-row>
      <el-row class="logisticsInfo">
        <el-col :span="8">
          <span class="labelNormal">下单人:</span>
          <span class="labelVal">{{ info.order_emp_name }}</span>
        </el-col>
        <el-col :span="8">
          <span class="labelNormal">下单时间:</span>
          <span class="labelVal">{{ info.order_time }}</span>
        </el-col>
        <el-col :span="8">
          <span class="labelNormal">是否加急:</span>
          <span class="labelVal">{{ info.urgent_name }}</span>
        </el-col>
      </el-row>
      <el-row class="logisticsInfo">
        <el-col :span="24">
          <span class="labelNormal">备注信息:</span>
          <span>无</span>
        </el-col>
      </el-row>
    </div>
    <i class="septal-line" />
    <div class="order-container">
      <h3>客户信息</h3>
      <el-row class="logisticsInfo">
        <el-col :span="8">
          <span class="labelNormal">客户名称:</span>
          <span class="labelVal">{{ 'customer' in info? info.customer.company_name :'' }}</span>
        </el-col>
        <el-col :span="8">
          <span class="labelNormal">联系人:</span>
          <span class="labelVal">{{ 'customer' in info? info.customer.link_man :'' }}</span>
        </el-col>
        <el-col :span="8">
          <span class="labelNormal">联系电话:</span>
          <span class="labelVal">{{ 'customer' in info? info.customer.link_phone :'' }}</span>
        </el-col>
      </el-row>
      <el-row class="logisticsInfo">
        <el-col :span="24">
          <span class="labelNormal">业务员:</span>
          <span class="labelVal">暂无</span>
        </el-col>
      </el-row>
    </div>
    <i class="septal-line" />
  </div>
</template>
<script>
export default {
  props: {
    info: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data() {
    return {}
  }
}
</script>
<style lang="scss" scoped>
.lgOrderDetail {
  .order-container {
    h3 {
      margin: 0 0 20px;
      font-size: 18px;
      color: #333333;
      &::before {
        content: '';
        display: inline-block;
        width: 4px;
        background-color: #35c4e8;
        margin-right: 10px;
        margin-bottom: 3px;
        height: 22px;
        vertical-align: middle;
      }
    }
    .logisticsInfo {
      .el-col {
        line-height: 24px;
        margin-bottom: 15px;
        display: inline-flex;
        justify-content: flex-start;
        align-items: center;
        a.labelVal {
          font-size: 14px;
          text-decoration: none;
          color: #35c4e8;
        }
        span {
          color: #333;
          font-size: 14px;
          &.labelNormal {
            margin-right: 5px;
            width: 100px;
            text-align: right;
          }
          &.labelVal {
            flex: 1;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
        }
      }
    }
  }
  .septal-line {
    display: block;
    width: 100%;
    border-bottom: 1px dashed #eeeeee;
    margin: 10px 0 25px;
  }
}
</style>
