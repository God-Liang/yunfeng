<template>
  <el-dialog
    title="打印拣货单"
    :visible.sync="printVisible"
    width="1150px"
    :before-close="onClose"
  >
    <div id="lgOrderBox">
      <div class="lgOrderBox">
        <div class="header">
          <div class="title">
            <h3>{{ info.company }}(拣货单)</h3>
            <span class="order_source">{{ info.order_source_name }}</span>
            <!-- <img
              height="32"
              src="@/assets/ph.png"
              alt
            > -->
          </div>
          <div class="barCode">
            <svg id="barcode" />
          </div>
        </div>
        <el-row class="lgInfoBox">
          <el-col :span="6">
            <span class="labelNormal">客户名称:</span>
            <span class="labelVal">{{ info.company_name }}</span>
          </el-col>
          <el-col :span="6">
            <span class="labelNormal">订单编号:</span>
            <span class="labelVal">{{ info.order_no }}</span>
          </el-col>
          <el-col :span="6">
            <span class="labelNormal">配送金额:</span>
            <span class="labelVal">¥{{ info.money }}</span>
          </el-col>
          <el-col :span="6">
            <span class="labelNormal">下单人:</span>
            <span class="labelVal">{{ 'order' in info ? info.order.order_emp_name:'' }}</span>
          </el-col>
        </el-row>
        <el-row class="lgInfoBox">
          <el-col :span="6">
            <span class="labelNormal">下单时间:</span>
            <span class="labelVal">{{ 'order' in info ?info.order.create_date:'' }}</span>
          </el-col>
          <el-col :span="6">
            <span class="labelNormal">是否加急:</span>
            <span class="labelVal">{{ info.urgent_name }}</span>
          </el-col>
        </el-row>
        <el-row class="lgInfoBox">
          <el-col :span="6">
            <span class="labelNormal">发货人:</span>
            <span class="labelVal">{{ info.create_name }}</span>
          </el-col>
          <el-col :span="6">
            <span class="labelNormal">联系电话:</span>
            <span class="labelVal">{{ 'order' in info ?info.order.linkman_phone:'' }}</span>
          </el-col>
          <el-col :span="6">
            <span class="labelNormal">发货时间:</span>
            <span class="labelVal">{{ info.create_date }}</span>
          </el-col>
        </el-row>
        <el-row class="lgInfoBox">
          <el-col :span="12">
            <span class="labelNormal">采购备注:</span>
            <span class="labelVal">{{ 'order' in info ?info.order.remark:'' }}</span>
          </el-col>
          <el-col :span="12">
            <span class="labelNormal">发货备注:</span>
            <span class="labelVal">{{ info.remark }}</span>
          </el-col>
        </el-row>
        <el-row class="lgInfoBox">
          <el-col
            :span="24"
            class="mb0"
          >
            <span class="labelNormal">收货地址:</span>
            <span class="labelVal">{{ 'customer' in info ? info.customer.link_man:'' }}，{{ 'customer' in info ? info.customer.link_phone:'' }}，{{ 'customer' in info ? info.customer.address:'' }}</span>
          </el-col>
        </el-row>
        <table class="index_table-nlsM5">
          <colgroup>
            <col>
            <col>
            <col>
            <col>
            <col>
            <col>
            <col>
            <col>
            <col>
            <col>
            <col>
            <col>
            <col>
            <col>
            <col>
            <col>
          </colgroup>
          <thead>
            <tr>
              <th>物资名称</th>
              <th>规格型号</th>
              <th>单价</th>
              <th>单位</th>
              <th>数量</th>
              <th>金额</th>
              <th>生产厂家/注册证号</th>
              <th>省标编号</th>
              <th>批号</th>
              <th>生产日期</th>
              <th>有效期</th>
              <th>灭菌批次/灭菌效期</th>
              <th>跟踪码</th>
              <th>发票号码</th>
              <th>发票日期</th>
              <th>备注</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(item,index) in info.detail"
              :key="index"
            >
              <td>{{ item.goods_name }}</td>
              <td>{{ item.ggxh }}</td>
              <td>￥{{ item.price }}</td>
              <td>{{ item.dw }}</td>
              <td>{{ item.amount }}</td>
              <td class="aek-text-right ui-money">￥{{ item.money }}</td>
              <td>
                <div>
                  <p>{{ item.factory_name }}</p>
                  <p>{{ item.certificate_no }}</p>
                </div>
              </td>
              <td>{{ item.province }}</td>
              <td>{{ item.batch }}</td>
              <td>{{ item.product_time }}</td>
              <td>{{ item.exp_time }}</td>
              <td>{{ item.sterilization_batch }}/{{ item.sterilization_time }}</td>
              <td>{{ item.tracking_code }}</td>
              <td>{{ item.invoice_no }}</td>
              <td>{{ item.invoice_time }}</td>
              <td rowspan="1">
                <span>{{ item.remark }}</span>
              </td>
            </tr>
          </tbody>
        </table>
        <el-row class="lgInfoBox">
          <el-col :span="6">
            <span class="labelNormal">送货人:</span>
            <span class="labelVal" />
          </el-col>
          <el-col :span="6">
            <span class="labelNormal">验收人:</span>
            <span class="labelVal" />
          </el-col>
          <el-col :span="6">
            <span class="labelNormal">确认人:</span>
            <span class="labelVal" />
          </el-col>
          <el-col :span="6">
            <span class="labelNormal">验收时间:</span>
            <span class="labelVal" />
          </el-col>
        </el-row>
      </div>
    </div>
    <span
      slot="footer"
      class="dialog-footer"
    >
      <slot name="action">
        <el-button @click="onClose">取消</el-button>
        <el-button
          type="primary"
          @click="printOrder"
        >打印拣货单</el-button>
      </slot>
    </span>
  </el-dialog>
</template>
<script>
export default {
  props: {
    printVisible: {
      type: Boolean,
      default: false
    },
    info: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data() {
    return {}
  },
  methods: {
    onClose() {
      this.$emit('on-print-close')
    },
    printOrder() {
      const subOutputRankPrint = document.getElementById('lgOrderBox')
      const newContent = subOutputRankPrint.innerHTML
      const oldContent = document.body.innerHTML
      document.body.innerHTML = newContent
      window.print()
      window.location.reload()
      document.body.innerHTML = oldContent
    }
  }
}
</script>
<style lang="scss" scoped>
.order_source {
  color: #ff3e3e;
  border: 2px solid #ff3e3e;
  line-height: 30px;
  padding: 0 10px;
  font-size: 16px;
}
// 打印预览
.lgOrderBox {
  max-height: 80vh;
  width: 1110px;
  overflow-y: auto;
  box-sizing: border-box;
  .header {
    display: flex;
    justify-content: space-between;
    height: 107px;
    align-items: center;
    .title {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      h3 {
        font-size: 20px;
        color: #333;
        margin: 0;
        line-height: 36px;
        margin-right: 10px;
      }
    }
  }
  .index_table-nlsM5 {
    width: 100%;
    border-collapse: collapse;
  }
  .index_table-nlsM5 thead th {
    padding: 4px 4px;
    border: 1px solid #333;
    text-align: center;
    font-weight: bold;
    white-space: nowrap;
    font-size: 12px;
  }
  .index_table-nlsM5 tbody td {
    padding: 4px 4px;
    border: 1px solid #333;
    word-break: break-all;
    font-size: 12px;
  }
  .index_table-nlsM5 tbody td p {
    margin: 0;
  }
}
</style>
