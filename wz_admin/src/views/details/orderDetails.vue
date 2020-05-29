<template>
  <div class="app-container orderDetails">
    <div :class="orderInfo.status < 4 ? 'orderStatus orange' : 'orderStatus gray'">
      <h3>
        {{ orderInfo.status_name }}
        <!-- <span v-if="orderInfo.status === 2">（部分发货）</span> -->
      </h3>
      <p>{{ orderMesStatus[orderInfo.status] }}</p>
    </div>
    <el-tabs
      v-model="activeName"
      @tab-click="handleClick"
    >
      <el-tab-pane
        label="订单详情"
        name="orderDetail"
      >
        <order :info="orderInfo" />
        <div class="order-container">
          <h3>商品信息</h3>
          <el-row class="lgInfoBox">
            <el-col
              :span="24"
              class="mb0"
            >
              <span
                class="labelNormal"
                style="width: 60px;"
              >收获地址:</span>
              <span class="labelVal">{{ 'customer' in orderInfo ? orderInfo.customer.link_man:'' }}，{{ 'customer' in orderInfo ? orderInfo.customer.link_phone:'' }}，{{ 'customer' in orderInfo ? orderInfo.customer.address:'' }}</span>
            </el-col>
          </el-row>
          <!-- 订单详情列表 -->
          <lgTable
            columns-type="index"
            columns-label="序号"
            :list="orderDetailList"
            :lg-thead="lgThead"
            :is-operation="false"
            :is-pagination="false"
          />
        </div>
      </el-tab-pane>
      <el-tab-pane
        label="物流信息"
        name="logisticsInfo"
      >
        <div class="order-container">
          <h3>物流信息</h3>
          <!-- 订单详情列表 -->
          <lgTable
            :list="logisticsList"
            :lg-thead="logisticsAttr.thead"
            :lg-buttons="logisticsAttr.buttons"
            :has-selection="false"
            :is-pagination="false"
            @operationEvent0="operationEvent0"
            @operationEvent1="operationEvent1"
          />
        </div>
      </el-tab-pane>
    </el-tabs>
    <!-- 打拣货单弹窗 -->
    <printOrder
      :print-visible="printVisible"
      :info="orderInfo"
      @on-print-close="onPrintClose"
    />
    <!-- 订单确认弹窗 -->
    <lgDialog
      title="订单确认"
      :visible="orderVisible"
      width="500px"
      @on-submit="onSubmit"
      @on-close="onOrderClose"
    >
      <el-radio-group v-model="orderConfirmForm.sure_type">
        <el-radio :label="1">正常发货</el-radio>
        <el-radio :label="2">延迟发货</el-radio>
        <el-radio :label="3">缺货</el-radio>
      </el-radio-group>
      <el-input
        v-model="orderConfirmForm.sure_msg"
        type="textarea"
        class="deliveryMes"
      />
      <el-tag
        type="info"
        class="promptMes"
        @click="quickBtn(0)"
      >由于某种特殊原因，我们需要延迟发货！</el-tag>
      <el-tag
        type="info"
        class="promptMes"
        @click="quickBtn(1)"
      >我们已收到您的订单，请您耐心等候，我们会尽快发货</el-tag>
    </lgDialog>
    <div
      v-if="orderInfo.status === 1"
      class="lgFooter"
    >
      <span
        class="gray"
        @click="printOrderBtn"
      >打拣货单</span>
      <span @click="linkBtn">发货</span>
      <span @click="orderConfirm">确认订单</span>
    </div>
    <div
      v-else-if="orderInfo.status === 2"
      class="lgFooter"
    >
      <!-- <span @click="linkBtn">发货</span> -->
      <span @click="printOrderBtn">打拣货单</span>
    </div>
  </div>
</template>
<script>
import order from '@/views/components/order'
import lgTable from '@/views/components/lgTable'
import lgDialog from '@/views/components/lgDialog'
import printOrder from '@/views/components/printOrder'
import JsBarcode from 'jsbarcode'
import { sure, info } from '@/api/common'
export default {
  components: { order, lgTable, lgDialog, printOrder },
  data() {
    return {
      apiUri: 'order',
      status: 1,
      orderStatus: [
        '待付款',
        '待发货',
        '待发货',
        '已发货',
        '已完成',
        '已终止',
        '已作废'
      ],
      orderMesStatus: [
        '买家等的好心急，尽快发货吧~',
        '买家等的好心急，尽快发货吧~',
        '买家还没收到，请耐心等待买家收货哦~',
        '恭喜恭喜，交易顺利完成咯~'
      ],
      activeName: 'orderDetail',
      // 表格列表
      orderDetailList: [],
      logisticsList: [],
      // 页数、条数
      listQuery: {
        current: 1,
        pageSize: 10
      },
      lgThead: [
        {
          label: 'goods_name',
          text: '物资名称'
        },
        {
          label: 'ggxh',
          text: '规格/型号'
        },
        {
          label: 'amount',
          text: '采购数量'
        },
        {
          label: 'ok_amount',
          text: '已配送数量'
        },
        {
          label: 'no_amount',
          text: '待配送数量'
        },
        {
          label: 'check_num',
          text: '验收数量'
        },
        {
          label: 'price',
          text: '单价'
        },
        {
          label: 'factory_name',
          text: '生产厂家'
        }
      ],
      logisticsAttr: {
        thead: [
          {
            label: 'distributionNum',
            text: '配送序号'
          },
          {
            label: 'status_name',
            text: '状态'
          },
          {
            label: 'distribution_no',
            text: '配送单号',
            noedit: true
          },
          {
            label: 'create_name',
            text: '发货人'
          },
          {
            label: 'create_date',
            text: '发货时间'
          }
        ],
        // 操作按钮
        buttons: {
          status: false, // 是否区分操作状态 true：根据当前列的数据状态值使用operation[状态值]; false：使用operation[0]
          width: 200, // 表格操作列的宽度
          operation: {
            // 操作按钮配置
            0: [
              {
                name: 'delivery',
                text: '配送明细',
                id: 0,
                type: 'primary'
              },
              {
                name: 'look',
                text: '查看物流',
                id: 1,
                type: 'primary'
              }
            ]
          }
        }
      },
      // 打拣货单
      printVisible: false,
      cargoData: [
        {
          id: 1,
          suppliesName: '1',
          specifications: '2',
          deliveredNum: '3',
          unit: '4',
          manufacturer: '5',
          brand: '6',
          note: '7'
        }
      ],
      // 订单确认
      orderVisible: false,
      orderConfirmForm: {
        sure_type: 1,
        sure_msg: ''
      },
      orderInfo: {}
    }
  },
  mounted() {
    this.getInfo()
  },
  methods: {
    getInfo() {
      const id = this.$route.params.id
      info(this.apiUri, { 'input.id': id }).then((res) => {
        if (res.success === true) {
          this.orderInfo = res.data
          this.orderDetailList = res.data.list
          this.logisticsList = res.data.distributionList
        }
      })
    },
    handleClick(tab, event) {
      console.log(tab, event)
    },
    // 配送明细
    operationEvent0(row) {
      this.$router.push('/details/distributionDetail/' + row.Id)
    },
    // 查看物流
    operationEvent1(row) {
      this.$router.push('/details/logisticsDetail/' + row.Id)
    },
    // 发货
    linkBtn() {
      this.$router.push('/details/orderDistribution/' + this.$route.params.id)
    },
    // 打拣货单
    printOrderBtn() {
      this.printVisible = true
      this.$nextTick(() => {
        JsBarcode('#barcode', this.orderInfo.order_no, {
          height: 60
        })
      })
    },
    // 取消
    onPrintClose() {
      this.printVisible = false
    },
    // 订单确认
    orderConfirm(row) {
      this.orderVisible = true
      this.orderConfirmForm.id = this.orderInfo.Id
    },
    // 取消
    onOrderClose() {
      this.orderVisible = false
    },
    // 快捷语
    quickBtn(val) {
      const quicks = [
        '由于某种特殊原因，我们需要延迟发货！',
        '我们已收到您的订单，请您耐心等候，我们会尽快发货'
      ]
      this.orderConfirmForm.sure_msg = quicks[val]
    },
    // 订单确认提交
    onSubmit() {
      const params = Object.assign({}, this.orderConfirmForm)
      sure(params).then((res) => {
        if (res.success === true) {
          this.$message({
            message: '订单确认成功',
            type: 'success'
          })
          this.orderVisible = false
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.orderDetails {
  padding-bottom: 70px;
  .orderStatus {
    width: 100%;
    height: 78px;
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
    h3 {
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
      &.gray {
        background-color: #fff;
        color: #333;
      }
      &:last-child {
        background-color: #f2fcff;
        color: #35c4e8;
      }
    }
  }
  // 提示语
  .promptMes {
    cursor: pointer;
    margin-bottom: 10px;
  }
}
</style>
<style lang="scss">
.deliveryMes {
  margin: 20px 0;
  height: 200px;
  textarea {
    resize: none;
    height: 100%;
  }
}
</style>
