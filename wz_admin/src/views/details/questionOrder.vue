<template>
  <div
    :class="
      isFullScreen === 1
        ? 'app-container orderDetails fullScreen'
        : 'app-container orderDetails'
    "
  >
    <order :info="orderInfo" />
    <div class="order-container">
      <h3>配送信息</h3>
      <el-row class="lgInfoBox">
        <el-col :span="6">
          <span class="labelNormal">配送单号:</span>
          <span class="labelVal">{{ orderInfo.distribution_no }}</span>
        </el-col>
        <el-col :span="6">
          <span class="labelNormal">配送数量:</span>
          <span class="labelVal">{{ orderInfo.ps_amount }}</span>
        </el-col>
        <el-col :span="6">
          <span class="labelNormal">配送金额:</span>
          <span class="labelVal">￥{{ orderInfo.money }}</span>
        </el-col>
        <el-col :span="6">
          <span class="labelNormal">发货人:</span>
          <span class="labelVal">{{ orderInfo.create_name }}</span>
        </el-col>
      </el-row>
      <el-row class="lgInfoBox">
        <el-col :span="6">
          <span class="labelNormal">发货时间:</span>
          <span class="labelVal">{{ orderInfo.create_date }}</span>
        </el-col>
        <el-col :span="6">
          <span class="labelNormal">配送方式:</span>
          <span class="labelVal">{{
            orderInfo.distribution_type == 1 ? "物流" : "自送"
          }}</span>
        </el-col>
        <el-col v-if="orderInfo.distribution_type == 1" :span="6">
          <span class="labelNormal">物流公司:</span>
          <span class="labelVal">{{ orderInfo.logistics_type }}</span>
        </el-col>
        <el-col v-if="orderInfo.distribution_type == 1" :span="6">
          <span class="labelNormal">物流单号:</span>
          <span class="labelVal">{{ orderInfo.logistics_no }}</span>
        </el-col>
        <el-col v-if="orderInfo.distribution_type == 2" :span="6">
          <span class="labelNormal">配送人:</span>
          <span class="labelVal">{{ orderInfo.distribution_man }}</span>
        </el-col>
        <el-col v-if="orderInfo.distribution_type == 2" :span="6">
          <span class="labelNormal">电话:</span>
          <span class="labelVal">{{ orderInfo.telephone }}</span>
        </el-col>
      </el-row>
      <el-row class="lgInfoBox">
        <el-col v-if="orderInfo.distribution_type == 2" :span="6">
          <span class="labelNormal">车牌号:</span>
          <span class="labelVal">{{ orderInfo.car_no }}</span>
        </el-col>
        <el-col :span="18">
          <span class="labelNormal">发货备注:</span>
          <span class="labelVal">{{ orderInfo.remark }}</span>
        </el-col>
      </el-row>
    </div>
    <i class="septal-line" />
    <div class="commodityInfo">
      <div class="header">
        <h3>商品信息</h3>
        <div class="btnBox">
          <el-button
            size="mini"
            type="primary"
            :plain="isFullScreen === 0"
            @click="fullScreenClick"
          >{{ operations[isFullScreen] }}</el-button>
        </div>
      </div>
      <el-row class="lgInfoBox">
        <el-col :span="24" class="mb0">
          <span class="labelNormal">收获地址:</span>
          <span
            class="labelVal"
          >广西医科大学第一附属医院设备科-仓库，莫敦欣，5356779</span>
        </el-col>
      </el-row>
      <!-- 订单详情列表 -->
      <el-table :data="distributionList" border style="width: 100%">
        <el-table-column fixed prop="goods_name" label="物资名称" />
        <el-table-column fixed prop="ggxh" label="规格/型号" width="100px" />
        <el-table-column prop="amount" label="配送数">
          <template slot-scope="scope">
            <el-input v-model="scope.row.amount" />
          </template>
        </el-table-column>
        <el-table-column prop="price" label="单价" />
        <el-table-column prop="money" label="小计金额" />
        <el-table-column prop="dw" label="单位" />
        <el-table-column prop="province" label="省标编号" />
        <el-table-column prop="factory_name" label="生产厂家" />
        <el-table-column prop="certificate_no" label="注册证" />
        <el-table-column prop="batch" label="批次" />
        <el-table-column prop="exp_time" label="有效期" />
        <el-table-column prop="invoice_no" label="发票号码" width="150px">
          <template slot-scope="scope">
            <el-input v-model="scope.row.invoice_no" />
          </template>
        </el-table-column>
        <el-table-column prop="invoice_time" label="发票日期" width="180px">
          <template slot-scope="scope">
            <el-date-picker
              v-model="scope.row.invoice_time"
              style="width:100%"
              type="date"
              placeholder="选择日期"
              value-format="yyyy-MM-dd"
            />
          </template>
        </el-table-column>
        <el-table-column prop="check_num" label="验收数量" />
      </el-table>
    </div>
    <div class="lgFooter">
      <span @click="questionOrder">保存</span>
    </div>
  </div>
</template>
<script>
import order from '@/views/components/order'
import { info, update } from '@/api/common'
export default {
  comments: true,
  components: { order },
  data() {
    return {
      apiUri: 'distribution',
      orderInfo: {},
      // 表格列表
      distributionList: [],
      isFullScreen: 0,
      operations: ['全屏操作', '退出全屏']
    }
  },
  mounted() {
    this.getInfo()
  },
  methods: {
    getInfo() {
      const id = this.$route.params.id
      info(this.apiUri, { 'input.id': id }).then(res => {
        if (res.success === true) {
          this.orderInfo = res.data
          this.distributionList = res.data.detail
        }
      })
    },

    // 全屏操作
    fullScreenClick() {
      this.isFullScreen = this.isFullScreen === 0 ? 1 : 0
    },
    // 疑问配送单
    questionOrder() {
      // this.$router.push(
      //   `/details/questionOrder/${this.orderInfo.distribution_no}`
      // )
      const obj = {
        id: this.orderInfo.Id,
        list: this.distributionList
      }
      update(this.apiUri, obj).then(res => {
        if (res.success) {
          this.$router.push(`/details/distributionDetail/${this.orderInfo.Id}`)
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.orderDetails {
  padding-bottom: 70px;
  &.fullScreen {
    position: fixed;
    left: 0;
    top: 0;
    width: 100vw;
    height: 100vh;
    z-index: 9999;
    padding: 20px;
    background-color: #fff;
  }
  .orderStatus {
    width: 100%;
    height: 70px;
    background: #ecf0f7;
    border-radius: 6px;
    margin-bottom: 16px;
    padding: 15px;
    box-sizing: border-box;
    &.orange {
      color: rgb(255, 144, 62);
    }
    &.gray {
      color: rgb(153, 153, 153);
    }
    h2 {
      font-size: 20px;
      font-weight: bold;
      line-height: 30px;
      margin: 0;
      span {
        font-size: 12px;
      }
    }
    p {
      font-size: 12px;
      margin: 0;
      &.gray {
        color: rgb(153, 153, 153);
      }
    }
  }
  .commodityInfo {
    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin: 0 0 20px;
      h3 {
        margin: 0;
        font-size: 18px;
        color: #333333;
        &::before {
          content: "";
          display: inline-block;
          width: 4px;
          background-color: #35c4e8;
          margin-right: 10px;
          margin-bottom: 3px;
          height: 22px;
          vertical-align: middle;
        }
      }
    }
  }
  .lgFooter {
    width: 100%;
    height: 50px;
    position: fixed;
    bottom: 0;
    right: 0;
    z-index: 2;
    background: #ffffff;
    box-shadow: 0px 0px 8px 0px rgba(125, 131, 133, 0.18);
    display: flex;
    align-items: center;
    align-content: center;
    justify-content: flex-end;
    span {
      display: inline-block;
      height: 50px;
      line-height: 50px;
      text-align: center;
      cursor: pointer;
      width: 120px;
      color: #fff;
      font-size: 18px;
      background: #35c4e8;
      font-weight: 700;
      // &:last-child {
      //   background-color: #f2fcff;
      //   color: #35c4e8;
      // }
    }
  }
}
</style>
<style lang="scss">
// 打印标签
.print-container {
  .printTypeBox {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin-bottom: 30px;
    > span {
      display: inline-block;
      width: 100px;
      text-align: right;
      font-size: 14px;
      color: #333;
      margin-right: 10px;
    }
  }
  p {
    margin: 0 0 15px;
    color: #666;
    font-size: 12px;
  }
  .printList {
    height: 400px;
    overflow-y: scroll;
    .printItem {
      margin-bottom: 20px;
      display: inline-block;
    }
  }
}
</style>
