<template>
  <div class="app-container">
    <order :info="orderInfo" />
    <div class="order-container">
      <h3>物流信息</h3>
      <el-form
        ref="logisticsForm"
        :model="logisticsForm"
        :rules="logisticsRules"
        label-width="100px"
        class="logisticsForm templateForm"
      >
        <el-form-item
          label="配送方式："
          prop="distribution_type"
          class="distribution"
        >
          <el-radio-group v-model="logisticsForm.distribution_type">
            <el-radio :label="1">物流配送</el-radio>
            <el-radio :label="2">自送</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item
          v-show="logisticsForm.distribution_type === 1"
          label="物流公司："
          prop="logistics_type"
          style="width: 33%;"
        >
          <el-select
            v-model="logisticsForm.logistics_type"
            size="small"
            placeholder
          >
            <el-option
              v-for="item in logisticsFirmList"
              :key="item.value"
              :label="item.label"
              :value="item.category_code"
            />
          </el-select>
        </el-form-item>
        <el-form-item
          v-show="logisticsForm.distribution_type === 1"
          label="物流单号："
          prop="logistics_no"
          style="width: 33%;"
        >
          <el-input v-model="logisticsForm.logistics_no" size="small" />
        </el-form-item>
        <el-form-item
          v-show="logisticsForm.distribution_type === 2"
          label="配送人："
          prop="distribution_man"
          style="width: 33%;"
        >
          <el-input v-model="logisticsForm.distribution_man" size="small" />
        </el-form-item>
        <el-form-item
          v-show="logisticsForm.distribution_type === 2"
          label="手机号码："
          prop="telephone"
          style="width: 33%;"
        >
          <el-input v-model="logisticsForm.telephone" size="small" />
        </el-form-item>
        <el-form-item
          v-show="logisticsForm.distribution_type === 2"
          label="车牌号："
          prop="car_no"
          style="width: 33%;"
        >
          <el-input v-model="logisticsForm.car_no" size="small" />
        </el-form-item>
        <el-form-item
          class="remark"
          label="发货备注："
          prop="remark"
          style="width: 66%;"
        >
          <el-input
            v-model="logisticsForm.remark"
            type="textarea"
            size="small"
          />
        </el-form-item>
      </el-form>
    </div>
    <i class="septal-line" />
    <div class="order-container">
      <h3>发货明细</h3>
      <div
        :class="
          isFullScreen === 1
            ? 'detail-container fullScreen'
            : 'detail-container'
        "
      >
        <div class="detailBox">
          <div class="barcodeBox">
            <el-input
              v-model="logisticsForm.barCode"
              placeholder="请输入条码"
              class="barCode"
            />
            <div class="sweepBox">
              <img src="@/assets/sweep.png" alt="扫一扫">
            </div>
          </div>
          <el-button size="small" @click="fullScreenClick">{{
            operations[isFullScreen]
          }}</el-button>
        </div>
        <!--主列表模块-->
        <el-form
          ref="monitorForm"
          :model="monitorForm"
          :rules="monitorForm.monitorRules"
          label-width="70px"
          class="monitorForm"
        >
          <div class="shipmentsTabel">
            <el-table
              ref="shipmentsTabel"
              :data="monitorForm.monitorData"
              :span-method="objectSpanMethod"
              border
              fixed
              fit
              style="width: 100%;"
            >
              <!-- 表格第一列 -->
              <el-table-column
                label="序号"
                align="center"
                type="index"
                fixed="left"
                :index="indexMethod"
                width="55"
              />
              <!-- 表格头部 -->
              <el-table-column
                v-for="thead in lgThead"
                :key="thead.label"
                :width="thead.width"
                class-name="status-col"
                :prop="thead.label"
                :label="thead.text"
                fixed="left"
              >
                <template slot-scope="scope">
                  <div v-if="thead.label == 'amount'">
                    {{ scope.row.ok_amount }} / {{ scope.row.amount }}
                  </div>
                  <div v-else>{{ scope.row[thead.label] }}</div>
                </template>
              </el-table-column>
              <el-table-column
                width="110"
                class-name="status-col"
                prop="price"
                label="单价"
                fixed="left"
              >
                <template slot-scope="scope">
                  <el-form-item label label-width="0px">
                    <el-input
                      v-model="scope.row.price"
                      size="mini"
                    />
                  </el-form-item>
                </template>
              </el-table-column>

              <el-table-column
                width="210"
                class-name="status-col"
                prop="certificate"
                label="注册证/省标编号"
              >
                <template slot-scope="scope">
                  <el-form-item
                    label="注册证:"
                    :prop="'monitorData.' + scope.$index + '.certificate_no'"
                    :rules="monitorForm.monitorRules.certificate_no"
                    class="lgMonitorData"
                  >
                    <el-select
                      v-model="scope.row.certificate_no"
                      size="mini"
                      filterable
                      placeholder="请选择注册证"
                    >
                      <el-option
                        v-for="item in certificateList"
                        :key="item.id"
                        :label="item.certificate_name"
                        :value="item.certificate_no"
                      />
                    </el-select>
                    <!-- <el-input size="mini" v-model="scope.row.certificate"></el-input> -->
                  </el-form-item>
                  <el-form-item label="省标:">
                    <el-input v-model="scope.row.province" size="mini" />
                  </el-form-item>
                </template>
              </el-table-column>
              <el-table-column
                width="110"
                class-name="status-col"
                prop="amount_num"
                label="配送数量"
              >
                <template slot-scope="scope">
                  <el-form-item label label-width="0px">
                    <el-input
                      v-model="scope.row.amount_num"
                      size="mini"
                      @change="getMoney"
                    />
                  </el-form-item>
                </template>
              </el-table-column>
              <el-table-column
                width="152"
                class-name="status-col"
                prop="product_time"
                label="生产日期"
              >
                <template slot-scope="scope">
                  <el-form-item label label-width="0px">
                    <el-date-picker
                      v-model="scope.row.product_time"
                      value-format="yyyy-MM-dd"
                      type="date"
                      size="mini"
                      style="width: 132px;"
                      placeholder="选择日期"
                    />
                  </el-form-item>
                </template>
              </el-table-column>
              <el-table-column
                width="140"
                class-name="status-col"
                prop="batch"
                label="批次"
              >
                <template slot-scope="scope">
                  <el-form-item label label-width="0px">
                    <el-input v-model="scope.row.batch" size="mini" />
                  </el-form-item>
                </template>
              </el-table-column>
              <el-table-column
                width="152"
                class-name="status-col"
                prop="exp_time"
                label="有效期"
              >
                <template slot-scope="scope">
                  <el-form-item label label-width="0px">
                    <el-date-picker
                      v-model="scope.row.exp_time"
                      value-format="yyyy-MM-dd"
                      type="date"
                      size="mini"
                      style="width: 132px;"
                      placeholder="选择日期"
                    />
                  </el-form-item>
                </template>
              </el-table-column>
              <el-table-column
                width="110"
                class-name="status-col"
                prop="sterilization_batch"
                label="灭菌批号"
              >
                <template slot-scope="scope">
                  <el-form-item label label-width="0px">
                    <el-input
                      v-model="scope.row.sterilization_batch"
                      size="mini"
                    />
                  </el-form-item>
                </template>
              </el-table-column>
              <el-table-column
                width="152"
                class-name="status-col"
                prop="sterilization_time"
                label="灭菌效期"
              >
                <template slot-scope="scope">
                  <el-form-item label label-width="0px">
                    <el-date-picker
                      v-model="scope.row.sterilization_time"
                      value-format="yyyy-MM-dd"
                      type="date"
                      size="mini"
                      style="width: 132px;"
                      placeholder="选择日期"
                    />
                  </el-form-item>
                </template>
              </el-table-column>
              <el-table-column
                width="140"
                class-name="status-col"
                prop="tracking_code"
                label="跟踪码"
              >
                <template slot-scope="scope">
                  <el-form-item label label-width="0px">
                    <el-input v-model="scope.row.tracking_code" size="mini" />
                  </el-form-item>
                </template>
              </el-table-column>
              <el-table-column
                width="140"
                class-name="status-col"
                prop="invoice_no"
                label="发票号码"
              >
                <template slot-scope="scope">
                  <el-form-item label label-width="0px">
                    <el-input v-model="scope.row.invoice_no" size="mini" />
                  </el-form-item>
                </template>
              </el-table-column>
              <el-table-column
                width="152"
                class-name="status-col"
                prop="invoice_time"
                label="发票日期"
              >
                <template slot-scope="scope">
                  <el-form-item label label-width="0px">
                    <el-date-picker
                      v-model="scope.row.invoice_time"
                      value-format="yyyy-MM-dd"
                      type="date"
                      size="mini"
                      style="width: 132px;"
                      placeholder="选择日期"
                    />
                  </el-form-item>
                </template>
              </el-table-column>
              <el-table-column
                label="操作"
                width="100"
                align="center"
                class-name="small-padding fixed-width"
                fixed="right"
              >
                <template slot-scope="scope">
                  <el-button
                    v-if="scope.row.isAdd"
                    type="text"
                    style="font-size: 12px;color: red;"
                    @click="removeBatch(scope.row, scope.$index)"
                  >删除批次</el-button>
                  <el-button
                    v-else
                    type="text"
                    style="font-size: 12px;"
                    @click="addBatch(scope.row, scope.$index)"
                  >添加批次</el-button>
                  <el-button
                    v-if="isOnceAgain"
                    type="text"
                    style="font-size: 12px;margin: 0;"
                    @click="entryRFID(scope.row, scope.$index)"
                  >录入RFID</el-button>
                  <p
                    v-else
                    style="color: rgba(0, 0, 0, 0.65);font-size: 12px;line-height: 22px;margin: 0;"
                  >
                    录入RFID
                  </p>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-form>
        <div
          :class="
            isFullScreen === 1
              ? 'operationBox fullScreenOperation'
              : 'operationBox'
          "
        >
          <p>
            配送金额共计：
            <i>￥{{ money }}</i>
          </p>
          <div class="operationBtn">
            <el-button :disabled="disabled_btn" type="primary" size="small" @click="dispatchBill(1)">
              发货</el-button>
            <el-button :disabled="disabled_btn" type="primary" size="small" @click="dispatchBill(0)">
              暂存</el-button>
            <el-button type="text" @click="reset">重置</el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { list, info, create, category } from '@/api/common'
import order from '@/views/components/order'
export default {
  components: { order },
  data() {
    return {
      isOnceAgain: false,
      apiUri: 'order',
      orderInfo: {},
      list: [],
      countIndex: {},
      monitorForm: {
        monitorData: [],
        monitorRules: {
          certificate_no: [
            { required: true, message: '请选择注册证!', trigger: 'blur' }
          ]
        }
      },
      total: 0,
      listQuery: {
        current: 1,
        pageSize: 10
      },
      lgThead: [
        {
          label: 'goods_name',
          text: '物资名称',
          fixed: 'left',
          width: 120
        },
        {
          label: 'ggxh',
          text: '规格/型号',
          fixed: 'left',
          width: 80
        },
        {
          label: 'amount',
          text: '已配送/采购数量',
          fixed: 'left',
          width: 110
        },
        {
          label: 'factory_name',
          text: '生产厂家',
          fixed: 'left',
          width: 110
        }
      ],
      options: [
        {
          value: '选项1',
          label: '自供'
        },
        {
          value: '选项2',
          label: '双皮奶'
        }
      ],
      deliveryForm: {
        generation: null,
        consignee: '',
        phone: '',
        barCode: ''
      },
      deliveryRules: {
        generation: [
          { required: true, message: '请选择总代商', trigger: 'change' }
        ]
      },
      logisticsForm: {
        distribution_type: 1,
        logistics_type: null,
        logistics_no: '',
        remark: '',
        barCode: '',
        distribution_man: '',
        telephone: '',
        car_no: ''
      },
      logisticsRules: {
        distribution_type: [
          { required: true, message: '请选择配送方式', trigger: 'change' }
        ],
        logistics_type: [
          { required: true, message: '请选择物流公司', trigger: 'change' }
        ],
        logistics_no: [
          { required: true, message: '请输入物流单号', trigger: 'blur' }
        ]
      },
      logisticsFirmList: [],
      certificateList: [],
      isFullScreen: 0,
      operations: ['全屏操作', '退出全屏'],
      oldForm: {},
      oldList: [],
      money: 0,
      disabled_btn: false
    }
  },
  mounted() {
    this.getCategory_logistics()
    this.getInfo()
    this.getCertificate()
  },
  methods: {
    reset() {
      this.getInfo(true)
      this.logisticsForm = {
        distribution_type: 1,
        logistics_type: null,
        logistics_no: '',
        remark: '',
        barCode: '',
        distribution_man: '',
        telephone: '',
        car_no: ''
      }
      // console.log(this.monitorForm.monitorData)`
      // this.monitorForm.monitorData = this.oldList
      // console.log(this.monitorForm.monitorData, this.oldList)
    },
    // 物流字典
    getCategory_logistics() {
      category('logistics_type').then(res => {
        this.logisticsFirmList = res.data.list
      })
    },
    getCertificate() {
      list('certificate', {}).then(res => {
        if (res.success) {
          this.certificateList = res.data.list
        }
      })
    },
    getInfo(reset) {
      const id = this.$route.params.id
      const params = { 'id': id }
      if (reset !== null && reset !== undefined && reset !== '') {
        params.reset = reset
      }
      info(this.apiUri, params).then(res => {
        if (res.success === true) {
          this.orderInfo = res.data
          this.monitorForm.monitorData = res.data.list
          // this.oldList = res.data.list.concat()

          if (res.data.distribution_type != null) {
            this.logisticsForm.distribution_type = res.data.distribution_type
            this.logisticsForm.logistics_type = res.data.logistics_type
            this.logisticsForm.logistics_no = res.data.logistics_no
            this.logisticsForm.remark = res.data.logistics_remark
            this.logisticsForm.distribution_man = res.data.distribution_man
            this.logisticsForm.telephone = res.data.logistics_telephone
            this.logisticsForm.car_no = res.data.logistics_car_no
          }
          const disposeArr = []
          this.monitorForm.monitorData.forEach(v => {
            disposeArr.push(v.Id)
          })
          this.countIndex = disposeArr.reduce(
            (acc, cur, index) => {
              const arr = []
              for (const key in acc) {
                arr.push(acc[key])
              }
              if (arr.find(v => v.cur === cur) !== undefined) {
                const i = arr.find(v => v.cur === cur).index
                acc[i].count++
              } else {
                acc[index] = {
                  count: 1,
                  cur: cur,
                  index: index
                }
                acc.length++
              }
              return acc
            },
            { length: 0 }
          )
          console.log(this.countIndex)
        }
      })
    },
    dispatchBill(order_status) {
      this.disabled_btn = true
      const params = Object.assign({}, this.logisticsForm)
      params.list = this.monitorForm.monitorData
      delete params.barCode
      params.order_status = order_status // 0 暂存 1 发货
      params.status = order_status
      params.Id = 0
      params.order_id = this.orderInfo.Id
      params.order_no = this.orderInfo.order_no
      create('distribution', params).then(res => {
        this.disabled_btn = false
        if (res.success === true) {
          console.log(res.data)
          this.$message({
            message: order_status === 1 ? '发货成功' : '暂存成功',
            type: 'success'
          })
          if (order_status === 1) {
            this.$router.push({
              path: `/details/OrderDetails/${params.order_id}`
            })
          }
        }
      })
    },
    fullScreenClick() {
      this.isFullScreen = this.isFullScreen === 0 ? 1 : 0
    },
    addBatch(row, index) {
      const data = Object.assign({}, row)
      data.isAdd = true
      this.monitorForm.monitorData.splice(index + 1, 0, data)
      const disposeArr = []
      this.monitorForm.monitorData.forEach(v => {
        disposeArr.push(v.Id)
      })
      this.countIndex = disposeArr.reduce(
        (acc, cur, index) => {
          const arr = []
          for (const key in acc) {
            arr.push(acc[key])
          }
          if (arr.find(v => v.cur === cur) !== undefined) {
            const i = arr.find(v => v.cur === cur).index
            acc[i].count++
          } else {
            acc[index] = {
              count: 1,
              cur: cur,
              index: index
            }
            acc.length++
          }
          return acc
        },
        { length: 0 }
      )
      this.getMoney()
    },
    removeBatch(row, index) {
      this.$confirm('确定要删除该批次?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          const data = Object.assign({}, row)
          data.isAdd = true
          this.monitorForm.monitorData.splice(index, 1)
          const disposeArr = []
          this.monitorForm.monitorData.forEach(v => {
            disposeArr.push(v.Id)
          })
          this.countIndex = disposeArr.reduce(
            (acc, cur, index) => {
              const arr = []
              for (const key in acc) {
                arr.push(acc[key])
              }
              if (arr.find(v => v.cur === cur) !== undefined) {
                const i = arr.find(v => v.cur === cur).index
                acc[i].count++
              } else {
                acc[index] = {
                  count: 1,
                  cur: cur,
                  index: index
                }
                acc.length++
              }
              return acc
            },
            { length: 0 }
          )
          this.getMoney()
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    getMoney() {
      this.money = 0
      this.monitorForm.monitorData.forEach(e => {
        if (e.amount_num === null || e.amount_num === undefined || e.amount_num === '') {
          return
        }
        this.money = parseFloat((this.money + e.amount_num * e.price * 100 / 100).toFixed(2))
      })
      this.money = parseFloat(this.money.toFixed(2))
    },
    entryRFID(row, index) {},
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      if (columnIndex < 6) {
        if (rowIndex in this.countIndex) {
          if (this.countIndex[rowIndex].count > 1) {
            return {
              rowspan: this.countIndex[rowIndex].count,
              colspan: 1
            }
          } else {
            return {
              rowspan: 1,
              colspan: 1
            }
          }
        } else {
          return {
            rowspan: 0,
            colspan: 0
          }
        }
      }
    },
    // 索引
    indexMethod(index) {
      return this.listQuery.pageSize * (this.listQuery.current - 1) + index + 1
    }
  }
}
</script>
<style lang="scss" scoped>
.order-container {
  h3 {
    margin: 0 0 20px;
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
  .logisticsInfo {
    .el-col {
      line-height: 24px;
      margin-bottom: 15px;
      display: inline-flex;
      justify-content: flex-start;
      align-items: center;
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
  .detail-container {
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
    .detailBox {
      display: flex;
      justify-content: space-between;
      margin-bottom: 30px;
      .barcodeBox {
        display: flex;
        justify-content: flex-start;
        .barCode {
          width: 250px;
          margin-right: 10px;
        }
        .sweepBox {
          width: 40px;
          height: 40px;
          display: inline-block;
          background: linear-gradient(135deg, #35c4e8, #50d1f1);
          border-radius: 6px;
          cursor: pointer;
          display: flex;
          justify-content: center;
          align-items: center;
          img {
            width: 26px;
            height: 26px;
          }
        }
      }
      button {
        height: 30px;
        padding: 0 10px;
      }
    }
    .operationBox {
      display: flex;
      flex-wrap: wrap;
      flex-direction: column;
      align-items: flex-end;
      margin-top: 10px;
      &.fullScreenOperation {
        position: absolute;
        right: 20px;
        bottom: 20px;
      }
      p {
        font-size: 12px;
        i {
          color: #cd1616;
          font-size: 16px;
          font-style: normal;
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
// 表格
.shipmentsTabel {
  .el-table {
    font-size: 12px;
  }
  .el-table th.is-leaf {
    background-color: #ecf0f7;
    color: #666;
  }
  .el-table tr:nth-child(even) {
    background-color: #fafafa;
  }
  .disabled {
    th {
      .el-checkbox {
        display: none;
      }
    }
  }
}
// 表单
.monitorForm {
  .el-form-item {
    margin-bottom: 0;
    .el-form-item__label {
      font-weight: normal;
      font-size: 12px;
    }
  }
}
// 提示语样式
.lgMonitorData {
  .el-form-item__error {
    padding-top: 0;
    top: 14px;
    left: 16px;
  }
}
</style>
