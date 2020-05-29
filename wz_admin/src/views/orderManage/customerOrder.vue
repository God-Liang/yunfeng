<template>
  <div class="app-container">
    <el-tabs
      v-model="filters['input.status']"
      @tab-click="handleFilter"
    >

      <el-tab-pane
        v-for="(item,index) in statusList"
        :key="index"
        :label="item.label"
        :name="item.category_code"
      />
    </el-tabs>
    <!--搜索模块-->
    <div class="filter-container">
      <el-select
        v-model="filters['input.order_source']"
        class="sourceStyle"
        size="small"
        style="width: 200px;margin-top:15px;margin-right:15px;"
      >
        <el-option
          v-for="item in sourceList"
          :key="item.value"
          :label="item.label"
          :value="item.category_code"
        />
      </el-select>
      <el-select
        v-model="filters['input.order_keyword']"
        size="small"
        style="width: 136px;margin-top:15px;"
        placeholder="请选择"
      >
        <el-option
          v-for="item in keywordList"
          :key="item.value"
          :label="item.label"
          :value="item.category_code"
        />
      </el-select>
      <!-- <el-select
        v-if="filters.type === '3'"
        v-model="filters['input.query']"
        size="small"
        style="width: 180px;margin-top:15px;margin-right:15px;"
        placeholder="所有客户"
      >
        <el-option
          label="中心医院"
          value="1"
        />
      </el-select> -->
      <el-input
        v-model="filters['input.query']"
        placeholder="请输入内容"
        size="small"
        style="width: 180px;margin-top:15px;margin-right:15px;"
        class="selectInput"
      />
      <!-- <el-select
        v-model="filters.timeType"
        size="small"
        style="width: 100px;margin-top:15px;"
      >
        <el-option
          v-for="item in timeTypeList"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select> -->
      <el-date-picker
        v-model="filters['input.order_time']"
        type="daterange"
        size="small"
        style="width: 260px;margin-top:15px;margin-right:15px;"
        range-separator="~"
        unlink-panels
        value-format="yyyy-MM-dd"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
      />
      <el-select
        v-model="filters['input.order_urgent']"
        class="urgentStyle"
        size="small"
        style="width: 200px;margin-top:15px;margin-right:15px;"
      >
        <el-option
          v-for="item in urgentList"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
      <!-- <el-checkbox
        v-model="filters.timeout"
        size="small"
        class="lg_overdue"
        style="margin-top:15px;"
      >超过一周未发货</el-checkbox> -->
      <el-button
        v-waves
        class="el-button--small"
        type="primary"
        style="margin-top:15px;"
        @click="handleFilter"
      >搜索</el-button>
      <el-button
        v-waves
        class="el-button--small"
        style="margin-top:15px;"
        @click="reset"
      >重置</el-button>
    </div>

    <!--主列表模块-->
    <lgTable
      columns-type="index"
      columns-label="序号"
      :list="list"
      :total-list="total"
      :lg-thead="tableAttr.thead"
      :lg-buttons="tableAttr.buttons"
      :lg-status="tableAttr.statusArr"
      status-name="status"
      @operationEvent0="operationEvent0"
      @operationEvent1="operationEvent1"
      @operationEvent2="operationEvent2"
      @operationEvent3="operationEvent3"
      @initListQuery="initListQuery"
      @getListByPagination="getListByPagination"
    />
    <!-- 打拣货单弹窗 -->
    <printOrder
      :print-visible="printVisible"
      :info="printInfo"
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
    <!-- 日志弹窗 -->
    <logs
      :log-visible="logVisible"
      :list="logsList"
      @logClose="logClose"
    />
  </div>
</template>

<script>
import { list, category, sure, info } from '@/api/common'
import waves from '@/directive/waves' // Waves directive
import lgTable from '@/views/components/lgTable'
import lgDialog from '@/views/components/lgDialog'
import logs from '@/views/components/logs'
import printOrder from '@/views/components/printOrder'
import JsBarcode from 'jsbarcode'
export default {
  components: { lgTable, lgDialog, logs, printOrder },
  directives: { waves },
  data() {
    return {
      // 公共接口地址
      apiUri: 'order',
      // 表格列表
      list: [],
      // 表格总条数
      total: 0,
      // 页数、条数
      listQuery: {
        current: 1,
        pageSize: 10
      },
      // 过滤条件
      filters: {
        'input.status': '',
        'input.order_source': '',
        'input.order_keyword': '',
        'input.query': '',
        'input.order_time': [],
        'input.order_urgent': ''
      },
      statusList: [],
      sourceList: [],
      keywordList: [],
      timeTypeList: [
        {
          value: 1,
          label: '付款时间'
        },
        {
          value: 2,
          label: '下单时间'
        }
      ],
      urgentList: [
        {
          value: '',
          label: '全部'
        },
        {
          value: 1,
          label: '否'
        },
        {
          value: 2,
          label: '是'
        }
      ],
      // 表格属性
      tableAttr: {
        // 表头
        thead: [
          {
            label: 'order_no',
            text: '订单编号'
          },
          {
            label: 'company_name',
            text: '客户名称',
            width: '200',
            noedit: true
          },
          {
            label: 'order_price',
            text: '订单金额'
          },
          {
            label: 'pay_type',
            text: '付款方式'
          },
          {
            label: 'order_source',
            text: '订单来源'
          },
          {
            label: 'order_emp_name',
            text: '下单人'
          },
          {
            label: 'order_time',
            text: '制单时间'
          },
          {
            label: 'create_date',
            text: '下单时间'
          },
          // {
          //   label: 'paymentTime',
          //   text: '付款时间'
          // },
          {
            label: 'businessman',
            text: '业务员'
          },
          {
            label: 'order_status',
            text: '订单状态',
            width: 100
          }
        ],
        // 操作按钮
        buttons: {
          status: true, // 是否区分操作状态 true：根据当前列的数据状态值使用operation[状态值]; false：使用operation[0]
          width: 400, // 表格操作列的宽度
          operation: {
            // 操作按钮配置
            1: [
              {
                name: 'hair',
                text: '发货',
                id: 0,
                type: 'primary'
              },
              {
                name: 'print',
                text: '打拣货单',
                id: 1,
                type: 'primary'
              },
              {
                name: 'affirm',
                text: '订单确认',
                id: 2,
                type: 'primary'
              },
              {
                name: 'logs',
                text: '日志',
                id: 3,
                type: 'primary'
              }
            ],
            2: [
              {
                name: 'print',
                text: '打拣货单',
                id: 1,
                type: 'primary'
              },
              {
                name: 'logs',
                text: '日志',
                id: 3,
                type: 'primary'
              }
            ],
            3: [
              {
                name: 'print',
                text: '打拣货单',
                id: 1,
                type: 'primary'
              },
              {
                name: 'logs',
                text: '日志',
                id: 3,
                type: 'primary'
              }
            ],
            4: [
              {
                name: 'print',
                text: '打拣货单',
                id: 1,
                type: 'primary'
              },
              {
                name: 'logs',
                text: '日志',
                id: 3,
                type: 'primary'
              }
            ],
            5: [
              {
                name: 'hair',
                text: '发货',
                id: 0,
                type: 'primary'
              },
              {
                name: 'print',
                text: '打拣货单',
                id: 1,
                type: 'primary'
              },
              {
                name: 'affirm',
                text: '订单确认',
                id: 2,
                type: 'primary'
              },
              {
                name: 'logs',
                text: '日志',
                id: 3,
                type: 'primary'
              }
            ],
            6: [
              {
                name: 'print',
                text: '打拣货单',
                id: 1,
                type: 'primary'
              },
              {
                name: 'logs',
                text: '日志',
                id: 3,
                type: 'primary'
              }
            ]
          }
        },
        statusArr: [
          {
            status: 0,
            text: '待付款',
            tag: 'warning'
          },
          {
            status: 1,
            text: '待发货',
            tag: 'warning'
          },
          {
            status: 2,
            text: '部分发货',
            tag: 'success'
          },
          {
            status: 3,
            text: '已发货',
            tag: 'success'
          },
          {
            status: 4,
            text: '已完成',
            tag: 'info'
          },
          {
            status: 5,
            text: '已终止',
            tag: 'danger'
          },
          {
            status: 6,
            text: '已作废',
            tag: 'danger'
          }
        ]
      },
      // 导出加载
      downloadLoading: false,
      // 打拣货单
      printVisible: false,
      // 订单确认
      orderVisible: false,
      orderConfirmForm: {
        sure_type: 1,
        sure_msg: ''
      },
      // 日志
      logVisible: false,
      logsList: [],
      printInfo: {}
    }
  },
  watch: {},
  created() {
    this.getCategory_source()
    this.getCategory_status()
    this.getCategory_keyword()
  },
  mounted() {
    this.getList()
  },
  methods: {
    // 订单来源字典
    getCategory_source() {
      category('order_source').then((res) => {
        this.sourceList = res.data.list
        this.sourceList.unshift({ category_code: '', label: '全部' })
      })
    },
    // 订单状态字典
    getCategory_status() {
      category('order_status').then((res) => {
        this.statusList = res.data.list
        this.statusList.splice(this.statusList.length - 2, 2)
        this.statusList.unshift({ category_code: '', label: '全部' })
      })
    },
    // 搜索类型字典
    getCategory_keyword() {
      category('order_keyword').then((res) => {
        this.keywordList = res.data.list
      })
    },
    // 状态切换
    handleClick(val) {
      this.getList
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
    // 过滤列表
    handleFilter() {
      this.listQuery.current = 1
      this.getList()
    },
    // 重置
    reset() {
      this.filters = {
        'input.status': '0',
        'input.order_source': '',
        'input.order_keyword': '',
        'input.query': '',
        'input.order_time': [],
        'input.order_urgent': ''
      }
    },
    // 获取列表
    getList() {
      const params = Object.assign({}, this.listQuery, this.filters)
      if (params['input.status'] === '0') {
        params['input.status'] = ''
      }
      if (
        this.filters['input.order_time'] !== null &&
        this.filters['input.order_time'].length > 0
      ) {
        params['input.order_starttime'] = this.filters['input.order_time'][0]
        params['input.order_endtime'] = this.filters['input.order_time'][1]
      } else {
        params['input.order_starttime'] = ''
        params['input.order_endtime'] = ''
      }
      delete params['input.order_time']
      list(this.apiUri, params).then((res) => {
        if (res.success === true) {
          this.list = res.data.list
          this.total = res.data.total_count
        }
      })
    },
    // 发货
    operationEvent0(row) {
      this.$router.push('/details/orderDistribution/' + row.Id)
    },
    // 打拣货单
    operationEvent1(row) {
      this.printVisible = true

      const id = row.Id
      info(this.apiUri, { 'input.id': id }).then((res) => {
        if (res.success === true) {
          this.printInfo = res.data
          this.$nextTick(() => {
            JsBarcode('#barcode', res.data.order_no, {
              height: 60
            })
          })
        }
      })
    },
    // 取消
    onPrintClose() {
      this.printVisible = false
    },
    // 订单确认
    operationEvent2(row) {
      this.orderVisible = true
      this.orderConfirmForm.id = row.Id
      if (row.sure_type != null) {
        this.orderConfirmForm.sure_type = row.sure_type
        this.orderConfirmForm.sure_msg = row.sure_msg
      } else {
        this.orderConfirmForm.sure_type = 1
        this.orderConfirmForm.sure_msg = ''
      }
    },
    // 取消
    onOrderClose() {
      this.orderVisible = false
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
          this.getList()
        }
      })
    },
    // 快捷语
    quickBtn(val) {
      const quicks = [
        '由于某种特殊原因，我们需要延迟发货！',
        '我们已收到您的订单，请您耐心等候，我们会尽快发货'
      ]
      this.orderConfirmForm.sure_msg = quicks[val]
    },
    // 日志
    operationEvent3(row) {
      this.logVisible = true
      const data = {
        current: 1,
        pageSize: 999,
        'input.orderId': row.order_id
      }
      list('orderLog', data).then(res => {
        this.logsList = res.data.list
      })
    },
    logClose() {
      this.logVisible = false
    }
  }
}
</script>
<style lang="scss" scoped>
.cargoTabel {
  font-size: 12px;
}
.index_footer-DJnFj {
  padding: 4px 4px;
  border: 1px solid #333;
  border-top: none;
}
// 提示语
.promptMes {
  cursor: pointer;
  margin-bottom: 10px;
}
</style>
<style lang="scss">
.sourceStyle > .el-input {
  &:after {
    content: '订单来源 :';
    font-size: 13px;
    height: 30px;
    line-height: 32px;
    position: absolute;
    top: 0;
    left: 20px;
    color: #606266;
  }
  .el-input__inner {
    padding-left: 85px !important;
  }
}
.urgentStyle > .el-input {
  &:after {
    content: '是否加急 :';
    font-size: 13px;
    height: 30px;
    line-height: 32px;
    position: absolute;
    top: 0;
    left: 20px;
    color: #606266;
  }
  .el-input__inner {
    padding-left: 85px !important;
  }
}
.deliveryMes {
  margin: 20px 0;
  height: 200px;
  textarea {
    resize: none;
    height: 100%;
  }
}
</style>
<style lang="scss">
.lg_overdue {
  .el-checkbox__label {
    font-size: 13px;
  }
}
</style>
