<template>
  <div class="app-container">
    <!-- <div class="clearfix stepsBox">
      <div class="fl">已完成</div>
      <div class="fr">
        <el-steps
          :active="3"
          align-center
        >
          <el-step
            title="发起申请"
            description="2018-05-05 17:50"
          />
          <el-step
            title="待退款"
            description="2018-05-05 17:50"
          />
          <el-step
            title="已完成"
            description="2018-05-05 17:50"
          />
        </el-steps>
      </div>
    </div> -->
    <div class="order-container">
      <h3>退款信息</h3>
      <el-row class="lgInfoBox">
        <el-col :span="6">
          <span class="labelNormal">退款编号:</span>
          <span class="labelVal">{{ returnInfo.return_no }}</span>
        </el-col>
        <!-- <el-col :span="6">
          <span class="labelNormal">退款类型:</span>
          <span class="labelVal">无</span>
        </el-col> -->
      </el-row>
    </div>
    <i class="septal-line" />
    <!--<div class="order-container">
      <h3>订单信息</h3>
      <el-row class="lgInfoBox">
        <el-col :span="6">
          <span class="labelNormal">订单编号:</span>
          <span class="labelVal">{{ 'order' in returnInfo?returnInfo.order.order_no:'' }}</span>
        </el-col>
        <el-col :span="6">
          <span class="labelNormal">订单来源:</span>
          <span class="labelVal">{{ 'order' in returnInfo?returnInfo.order.order_source_name:'' }}</span>
        </el-col>
        <el-col :span="6">
          <span class="labelNormal">订单金额:</span>
          <span class="labelVal colorRed">￥{{ 'order' in returnInfo?returnInfo.order.order_price:'' }}</span>
        </el-col>
        <el-col :span="6">
          <span class="labelNormal">客户名称:</span>
          <span class="labelVal">{{ 'customer' in returnInfo?returnInfo.customer.company_name:'' }}</span>
        </el-col>
      </el-row>
      <el-row class="lgInfoBox">
        <el-col :span="6">
          <span class="labelNormal">业务员:</span>
          <span class="labelVal">暂无</span>
        </el-col>
        <el-col :span="6">
          <span class="labelNormal">下单人:</span>
          <span class="labelVal">{{ 'order' in returnInfo?returnInfo.order.order_emp_name:'' }}</span>
        </el-col>
        <el-col :span="6">
          <span class="labelNormal">下单时间:</span>
          <span class="labelVal">{{ 'order' in returnInfo?returnInfo.order.order_time:'' }}</span>
        </el-col>
        <el-col :span="6">
          <span class="labelNormal">支付方式:</span>
          <span class="labelVal">中信钱包</span>
        </el-col>
        <el-col :span="6">
          <span class="labelNormal">备注信息:</span>
          <span>{{ 'order' in returnInfo?returnInfo.order.remark:'' }}</span>
        </el-col>
      </el-row>
      <el-row class="lgInfoBox">
        <el-col :span="6">
          <span class="labelNormal">付款时间:</span>
          <span>无</span>
        </el-col>
        <el-col :span="6">
          <span class="labelNormal">备注信息:</span>
          <span>无</span>
        </el-col>
      </el-row>
    </div>
    <i class="septal-line" />-->
    <div class="order-container">
      <h3>客户信息</h3>
      <el-row class="lgInfoBox">
        <el-col :span="6">
          <span class="labelNormal">客户名称:</span>
          <span class="labelVal">{{ 'customer' in returnInfo?returnInfo.customer.company_name:'' }}</span>
        </el-col>
        <el-col :span="6">
          <span class="labelNormal">联系人:</span>
          <span class="labelVal">{{ 'customer' in returnInfo?returnInfo.customer.link_man:'' }}</span>
        </el-col>
        <el-col :span="6">
          <span class="labelNormal">联系电话:</span>
          <span class="labelVal">{{ 'customer' in returnInfo?returnInfo.customer.link_phone:'' }}</span>
        </el-col>
      </el-row>
    </div>
    <i class="septal-line" />
    <div class="order-container">
      <h3>退款清单</h3>
      <el-row class="lgInfoBox">
        <el-col :span="6">
          <span class="labelNormal">退货品种:</span>
          <span class="labelVal">{{ returnInfo.return_breed }}</span>
        </el-col>
        <el-col :span="6">
          <span class="labelNormal">退货数:</span>
          <span class="labelVal">{{ returnInfo.return_amount }}</span>
        </el-col>
        <el-col :span="6">
          <span class="labelNormal">退货金额:</span>
          <span class="labelVal colorRed">￥{{ returnInfo.return_money }}</span>
        </el-col>
      </el-row>
      <lgTable
        columns-type="index"
        columns-label="序号"
        :list="list"
        :lg-thead="userAttr.thead"
        :lg-buttons="userAttr.buttons"
        :is-operation="false"
        :is-pagination="false"
        @operationEventdetails="operationEventdetails"
      />
    </div>
  </div>
</template>
<script>
import lgTable from '@/views/components/lgTable'
import { info } from '@/api/common'
export default {
  components: { lgTable },
  data() {
    return {
      apiUri: 'return',
      list: [],
      userAttr: {
        thead: [
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
            text: '退货数'
          },
          {
            label: 'price',
            text: '单价'
          },
          {
            label: 'money',
            text: '小计金额'
          },
          {
            label: 'dw',
            text: '单位'
          },
          {
            label: 'province',
            text: '省标编号'
          },
          {
            label: 'factory_name',
            text: '生产厂家'
          },
          {
            label: 'certificate_no',
            text: '注册证'
          },
          {
            label: 'batch',
            text: '批次'
          }
        ],
        buttons: {
          status: false, // 是否区分操作状态 true：根据当前列的数据状态值使用operation[状态值]; false：使用operation[0]
          width: 200, // 表格操作列的宽度
          operation: {
            // 操作按钮配置
            0: [
              {
                name: 'details',
                text: '详情',
                id: 'details',
                type: 'primary'
              }
            ]
          }
        }
      },
      total: 0,
      returnInfo: {}
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
          this.returnInfo = res.data
          this.list = res.data.detail
        }
      })
    },
    // 初始化页数与条数
    initListQuery(listQuery) {
      this.listQuery = listQuery
    },
    // 分页操作
    getListByPagination(listQuery) {
      this.listQuery = listQuery
      this.getList()
    },
    // 获取列表
    getList() {},
    operationEventdetails() {}
  }
}
</script>
<style lang="scss" scoped>
.colorRed {
  color: #ff3e3e !important;
}
.stepsBox {
  height: 110px;
  border: 1px solid #e0e0e0;
  border-radius: 6px;
  margin-bottom: 15px;
  .fl {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    flex-shrink: 0;
    position: relative;
    width: 155px;
    height: 100%;
    background: #ecf0f7;
    font-size: 20px;
    font-weight: bold;
    border-right: 1px solid #e0e0e0;
    color: #999999;
    &::after {
      content: '';
      position: absolute;
      width: 0px;
      height: 0px;
      display: block;
      border: 10px solid transparent;
      border-right: 10px solid #ffffff;
      right: -1px;
      top: 50%;
      margin-top: -10px;
    }
  }
  .fr {
    width: calc(100% - 155px);
    height: 100%;
    align-items: center;
    padding-top: 20px;
    /deep/ .el-step__description.is-finish,
    /deep/ .el-step__description.is-process {
      font-size: 12px;
      color: rgba(0, 0, 0, 0.43);
    }
  }
}
.septal-line {
  display: block;
  width: 100%;
  border-bottom: 1px dashed #eeeeee;
  margin: 10px 0 25px;
}
.templateForm {
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  .el-form-item {
    &.distribution {
      width: 100%;
    }
    &.remark {
      textarea {
        height: 80px;
        resize: none;
      }
    }
    .el-form-item__label {
      font-weight: normal;
    }
  }
}
</style>
<style lang="scss">
.barCode {
  .el-input__inner {
    height: 40px;
    line-height: 40px;
    font-size: 14px;
    color: #000;
  }
}
</style>
