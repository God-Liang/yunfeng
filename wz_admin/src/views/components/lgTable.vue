<template>
  <div class="lg-tabel-container">
    <el-table
      :key="tableKey"
      ref="table"
      v-loading="listLoading"
      row-key="id"
      :data="list"
      element-loading-text="加载中..."
      fixed
      fit
      border
      highlight-current-row
      style="width: 100%"
      :class="isCheckboxUse ? '' : 'disabled'"
      @select="getRow"
      @select-all="getRow"
      @row-click="getRowClick"
    >
      <!-- 表格第一列 -->
      <el-table-column
        v-if="hasSelection"
        :label="columnsLabel"
        align="center"
        :type="columnsType"
        :index="indexMethod"
        width="55"
        :selectable="selectable"
      />
      <!-- 表格头部 -->
      <el-table-column
        v-for="thead in lgThead"
        :key="thead.label"
        :width="thead.width || &quot;&quot;"
        class-name="status-col"
        :prop="thead.label"
        :label="thead.text"
        :fixed="thead.fixed || false"
      >
        <template slot-scope="scope">
          <!-- 状态 -->
          <div v-if="thead.label === statusName">
            <div v-if="thead.label ==='is_bind'">
              {{ scope.row[thead.label]?scope.row.gyspmc:'否' }}
            </div>
            <div v-else>
              <el-tag :type="scope.row[thead.label] | statusFilter('tag')">{{ scope.row[thead.label] | statusFilter('text') }}</el-tag>
            </div>
          </div>
          <!-- 授权产品	 -->
          <div v-else-if="thead.label === 'zcznum'">
            <span>
              {{ scope.row.zcznum }}本，
              <el-button
                class="editorContac"
                type="text"
                size="small"
                @click="editCP(scope.row)"
              >编辑</el-button>
            </span>
          </div>
          <!-- 授权客户	 -->
          <div v-else-if="thead.label === 'customernum'">
            <span>
              {{ scope.row.customernum }}家客户已授权，
              <el-button
                class="editorContac"
                type="text"
                size="small"
                @click="editKH(scope.row)"
              >编辑</el-button>
            </span>
          </div>
          <!-- 性别 -->
          <div v-else-if="thead.label === 'sex'">
            <span>{{ scope.row.sex | sexFilter }}</span>
          </div>
          <!-- 配送序号 -->
          <div v-else-if="thead.label === 'distributionNum'">
            <span>第<span style="color:#ff9329">{{ (scope.$index + 1) }}</span>次配送/{{ scope.row.distribution_type == 1?'物流':'自送' }}</span>
          </div>
          <!-- 订单编号 -->
          <div v-else-if="thead.label === 'order_no'">
            <span v-if="thead.noedit">{{ scope.row[thead.label] }}</span>
            <router-link
              v-else
              :to="'/details/OrderDetails/' + scope.row.order_id"
              style="color: #35C4E8;text-decoration: underline;"
            >{{ scope.row[thead.label] }}</router-link>
          </div>
          <!-- 配送单号 -->
          <div v-else-if="thead.label === 'distribution_no'">
            <span v-if="thead.noedit">{{ scope.row[thead.label] }}</span>
            <router-link
              v-else
              :to="'/details/distributionDetail/' + scope.row.Id"
              style="color: #35C4E8;text-decoration: underline;"
            >{{ scope.row[thead.label] }}</router-link>
          </div>
          <!-- 是否发送短信 -->
          <div v-else-if="thead.label === 'receive'">
            <el-switch
              v-model="scope.row[thead.label]"
              active-text="是"
              inactive-text="否"
            />
          </div>
          <!-- 发票号码/发票日期 -->
          <div v-else-if="thead.label === 'invoice'">
            <el-input
              v-model="scope.row.invoiceNo"
              style="width: 200px;margin-bottom: 5px;"
              placeholder="请输入发票号码"
              size="mini"
            />
            <el-date-picker
              v-model="scope.row.invoiceTime"
              value-format="yyyy-MM-dd"
              type="date"
              size="mini"
              style="width: 200px;"
              placeholder="请选择日期"
            />
          </div>
          <!-- 单位名称 -->
          <div v-else-if="thead.label === 'company_name'">
            <div v-if="thead.noedit">{{ scope.row.company_name }}</div>
            <div
              v-else
              class="company-container"
            >
              <img
                v-if="scope.row.logo_url"
                :src="scope.row.logo_url"
                alt
              >
              <img
                v-else
                src="@/assets/clientImg.png"
                alt
              >
              <div class="companyInfo">
                <router-link
                  v-if="thead.key"
                  :to="`/details/customerDetail/${scope.row[thead.key]}/${!thead.key}`"
                >{{ scope.row.company_name }}</router-link>
                <router-link
                  v-else
                  :to="`/details/customerDetail/${scope.row.Id}/${!thead.key}`"
                >{{ scope.row.company_name }}</router-link>
                <p v-if="scope.row.link_man && scope.row.link_phone">
                  {{ scope.row.link_man }} - {{ scope.row.link_phone }}
                  <el-button
                    class="editorContac"
                    type="text"
                    size="small"
                    @click="editorcontactMen(scope.row)"
                  >编辑</el-button>
                </p>
                <div v-else>
                  <el-button
                    type="text"
                    size="small"
                    @click="addcontactMen(scope.row)"
                  >添加联系人</el-button>
                </div>
              </div>
            </div>
          </div>
          <!-- 有效期 -->
          <div v-else-if="thead.label === 'end_time'">
            <span v-if="scope.row.end_time == '' || scope.row.end_time == null">
              长期有效
            </span>
            <span
              v-else-if="new Date(scope.row.end_time).getTime()<new Date().getTime()"
              style="color:#ccc"
            >
              <!-- v-if="thead.label!='start_time'" -->
              {{ scope.row.start_time | timeFilter }}至{{ scope.row.end_time | timeFilter }}<span style="color:#cd1616"> (已过期)</span>
            </span>
            <span v-else>
              {{ scope.row.start_time | timeFilter }}至{{ scope.row.end_time | timeFilter }}
            </span>
          </div>
          <!-- 证件类型 -->
          <div v-else-if="thead.label === 'papers_type'">
            {{ scope.row.papers_type | papers_type_filter }}
          </div>
          <!-- 过期天数 -->
          <div v-else-if="thead.label === 'gqts'">
            <span v-if="scope.row.gqts<0">
              已过期<span style="color:#cd1616">{{ Math.abs(scope.row.gqts) }}</span>天
            </span>
            <span v-else>{{ scope.row.gqts }}天后过期</span>
          </div>
          <div v-else-if="thead.label === 'company_type'">
            {{ scope.row.company_type | company_type_filter }}({{ scope.row.emp_type | emp_type_filter }})
          </div>
          <div v-else-if="thead.label === 'org_type'">
            {{ scope.row.org_type | org_type_filter }}
          </div>
          <div v-else-if="thead.label === 'relation_type'">
            成为你的{{ scope.row.relation_type | relation_type_filter }}
          </div>
          <!-- 平台认证状态 -->
          <div v-else-if="thead.label === 'cer_check_type'">
            {{ scope.row.cer_check_type | cer_type_filter }}
          </div>

          <div v-else>
            <router-link
              v-if="thead.router"
              :to="thead.router"
              style="color: #35C4E8;text-decoration: underline;"
            >{{ scope.row[thead.label] }}</router-link>
            <span v-else>{{ scope.row[thead.label] }}</span>
          </div>
        </template>
      </el-table-column>

      <el-table-column
        v-if="isOperation"
        label="操作"
        :width="lgButtons.width ? lgButtons.width : 100 * lgButtons.operation[0].length"
        align="center"
        class-name="small-padding fixed-width"
        fixed="right"
      >
        <template slot-scope="scope">
          <el-button
            v-for="button in (lgButtons.status ? lgButtons.operation[scope.row[statusName]] : lgButtons.operation[0])"
            :key="button.name"
            size="small"
            :type="button.type"
            waves
            @click="fun(scope.row, button.id, button.permissionValue)"
          >
            <span :style="button.color ? &quot;color:&quot; + button.color : &quot;&quot;">{{ button.text }}</span>
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <div
      v-if="isPagination"
      class="pagination-container"
      style="text-align: right;"
    >
      <el-pagination
        ref="pagination"
        background
        :current-page="listQuery.current"
        :page-sizes="[10,20,50,100]"
        :page-size="listQuery.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalList"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
    <lgDialog
      v-model="concatMenForm"
      :visible="contactMenFormVisible"
      width="600px"
      :title="dialogTitle + '联系人'"
      :show-form="true"
      form-ref="concatMenForm"
      :form-rules="concatMenFormRules"
      label-width="120px"
      @on-submit="handleCreateOrUpdate"
      @on-close="onClose"
    >
      <template slot="form">
        <el-form-item
          label="联系负责人："
          prop="link_man"
        >
          <el-input
            v-model="concatMenForm.link_man"
            placeholder="请输入联系负责人"
          />
        </el-form-item>
        <el-form-item
          label="联系方式："
          prop="link_phone"
        >
          <el-input
            v-model="concatMenForm.link_phone"
            placeholder="请输入联系方式"
          />
        </el-form-item>
      </template>
    </lgDialog>
    <lgDialog
      :visible="sqvisible"
      width="600px"
      :title="sqType==='cp'?'授权产品':'授权客户'"
      :show-form="false"
      @on-submit="onsqSubmit"
      @on-close="onsqClose"
    >
      <template>
        <el-transfer
          v-model="sqSelectData"
          style="text-align: left; display: inline-block"
          filterable
          :left-default-checked="[]"
          :right-default-checked="[]"
          :titles="['未选择客户', '已选择客户']"
          :button-texts="['移出', '移入']"
          :props="{
            key: 'Id',
            label: 'company_name'
          }"
          :format="{
            noChecked: '${total}',
            hasChecked: '${checked}/${total}'
          }"
          :data="sqData"
          @change="sqChange"
        >
          <span
            slot-scope="{ option }"
            class="sqContent"
          >
            <img
              v-if="option.logo_url"
              :src="option.logo_url"
              alt
            >
            <img
              v-else
              src="@/assets/clientImg.png"
              alt
            >
            <span :title="option.company_name">{{ option.company_name }}</span>
          </span>
        </el-transfer>
      </template>
    </lgDialog>
  </div>
</template>
<script>
import waves from '@/directive/waves' // 水波纹指令
import { list, update, saveContac } from '@/api/common'
import { parseTime } from '@/utils'
import lgDialog from '@/views/components/lgDialog'
let _this
export default {
  name: 'LgTable',
  components: {
    lgDialog
  },
  directives: {
    waves
  },
  filters: {
    timeFilter(val, str) {
      if (!val) return
      const strr = str || '{y}-{m}-{d}'
      return parseTime(val, strr)
    },
    statusFilter(val, key) {
      if (!val) return
      const keyValue = _this.lgStatus.reduce((acc, cur) => {
        acc[cur.status] = cur[key]
        return acc
      }, {})
      return keyValue[val]
    },
    sexFilter(val) {
      const sexOptions = [
        {
          key: 0,
          display_name: '男'
        },
        {
          key: 1,
          display_name: '女'
        }
      ]
      const sexKeyValue = sexOptions.reduce((acc, cur) => {
        acc[cur.key] = cur.display_name
        return acc
      }, {})
      return sexKeyValue[val]
    },
    emp_type_filter(val) {
      if (!val) return
      const empTypeOptions = [
        {
          key: 1,
          value: '企业'
        },
        {
          key: 2,
          value: '医疗机构'
        }
      ]
      const data = empTypeOptions.filter((v) => {
        return v.key === val
      })
      return data[0].value || ''
    },
    cer_type_filter(val) {
      if (!val) return
      const cerTypeOptions = [
        {
          key: 1,
          value: '已认证'
        },
        {
          key: 2,
          value: '待审核'
        },
        {
          key: 3,
          value: '未通过'
        }
      ]
      const data = cerTypeOptions.filter((v) => {
        return v.key === val
      })
      return data.length !== 0 ? data[0].value : ''
    },
    papers_type_filter(val) {
      if (!val) return
      const papersTypeOptions = [
        { value: '服务承诺书', key: 1 },
        { value: '廉政协议书', key: 2 },
        { value: '其他', key: 3 }
      ]
      const data = papersTypeOptions.filter((v) => {
        return v.key === val
      })
      return data.length !== 0 ? data[0].value : ''
    },
    org_type_filter(val) {
      if (!val) return
      const orgTypeOptions = [
        {
          key: 1,
          value: '民营'
        },
        {
          key: 2,
          value: '公立'
        }
      ]
      const data = orgTypeOptions.filter((v) => {
        return v.key === val
      })
      return data.length !== 0 ? data[0].value : ''
    },
    relation_type_filter(val) {
      if (!val) return
      const relationTypeOptions = [
        {
          key: 1,
          value: '供应商'
        },
        {
          key: 2,
          value: '客户'
        }
      ]
      const data = relationTypeOptions.filter((v) => {
        return v.key === val
      })
      return data.length !== 0 ? data[0].value : ''
    },
    company_type_filter(val) {
      if (!val) return
      const companyTypeOptions = [
        {
          key: 1,
          value: '厂商'
        },
        {
          key: 2,
          value: '供应商'
        },
        {
          key: 3,
          value: '厂商&供应商'
        },
        {
          key: 4,
          value: '其他'
        },
        {
          key: 5,
          value: '医院'
        },
        {
          key: 6,
          value: '诊所'
        },
        {
          key: 7,
          value: '卫生院'
        },
        {
          key: 8,
          value: '门诊'
        }
      ]
      const data = companyTypeOptions.filter((v) => {
        return v.key === val
      })
      return data[0].value || ''
    }
  },
  props: {
    // 表格数据
    list: {
      type: Array,
      default: function() {
        return []
      }
    },
    // 表格数据长度
    totalList: {
      type: Number,
      default: 0
    },
    // 表头数据
    lgThead: {
      type: Array,
      default: function() {
        return []
      }
    },
    // 状态名称
    statusName: {
      type: String,
      default: function() {
        return 'status'
      }
    },
    // 表格第一列是否需要
    hasSelection: {
      type: Boolean,
      default: true
    },
    // 第一列表格类型 |默认值：selection、index、expand
    columnsType: {
      type: String,
      default: 'selection'
    },
    // 如果columnsType为index时，第一列表头的名称
    columnsLabel: {
      type: String,
      default: '#'
    },
    // 如果columnsType为select时,是否复选框可以使用
    isCheckboxUse: {
      type: Boolean,
      default: true
    },
    // 默认选中的复选框
    defaultIds: {
      type: Array,
      default: function() {
        return []
      }
    },
    // 判断是否需要操作按钮
    isOperation: {
      type: Boolean,
      default: true
    },
    // 操作按钮
    lgButtons: {
      type: Object,
      default: function() {
        return {
          status: true, // 是否区分操作状态 true：根据当前列的数据状态值使用operation[状态值]; false：使用operation[0]
          width: 300, // 表格操作列的宽度
          operation: {
            // 操作按钮配置
            0: [
              {
                name: 'enable',
                text: '启用',
                id: 0,
                type: 'primary'
              }
            ],
            1: [
              {
                name: 'disable',
                text: '禁用',
                id: 1,
                type: 'primary'
              }
            ]
          }
        }
      }
    },
    // 数据状态
    lgStatus: {
      type: Array,
      default: function() {
        return [
          {
            status: 0,
            text: '禁用',
            tag: 'danger'
          },
          {
            status: 1,
            text: '启用',
            tag: 'success'
          }
        ]
      }
    },
    // 是否显示分页
    isPagination: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      tableKey: 0,
      listQuery: {
        current: 1,
        pageSize: 10
      },
      // 客户名称联系人相关
      dialogTitle: '',
      concatMenForm: {
        id: null,
        link_phone: '',
        link_man: ''
      },
      concatMenFormRules: {
        link_phone: [
          { required: true, message: '请输入联系方式', trigger: 'blur' }
        ],
        link_man: [
          { required: true, message: '请输入联系负责人', trigger: 'blur' }
        ]
      },
      contactMenFormVisible: false,
      sqType: 'cp',
      sqvisible: false,
      sqData: [],
      sqSelectData: [],
      sqId: null
    }
  },
  computed: {
    // 通过vuex存储加载状态
    // 切换加载状态：this.$store.commit('TOGGLE_LOADING', listLoading)
    listLoading() {
      return this.$store.getters.listLoading
    },
    permissionButtons() {
      return this.$store.state.permissionButtons
    }
  },
  beforeCreate() {
    _this = this
  },
  created() {
    // 初始化页码、每页条数
    this.$emit('initListQuery', this.listQuery)
  },
  mounted() {
    this.$nextTick(() => {
      this.list.forEach((e) => {
        if (this.defaultIds.includes(e.id)) {
          this.$refs.table.toggleRowSelection(e, true)
        }
      })
    })
  },
  methods: {
    editCP() {
      this.sqvisible = true
      this.sqType = 'cp'
    },
    editKH(row) {
      this.sqType = 'kh'
      this.sqId = row.id
      list('mycustomer', {
        current: 1,
        pageSize: 9999
      }).then((res) => {
        this.sqData = res.data.list
        this.sqvisible = true
        if (row.customerList.length > 0) {
          const sqSelectData = []
          row.customerList.forEach((v) => {
            sqSelectData.push(v.Id)
          })
          this.sqSelectData = sqSelectData
        } else {
          this.sqSelectData = []
        }
      })
    },
    sqChange(value, direction, movedKeys) {},
    // 授权客户确定
    onsqSubmit() {
      const data = {
        id: this.sqId,
        customer_ids:
          this.sqSelectData.length > 0 ? this.sqSelectData.join(',') : -1
      }
      saveContac(data).then((res) => {
        this.getList()
        this.$notify({
          title: '成功',
          message: '编辑成功',
          type: 'success',
          duration: 2000
        })
        this.sqvisible = false
      })
    },
    // 取消
    onsqClose() {
      this.sqvisible = false
    },
    getRow(s, r) {
      this.$emit('getSelectArr', s, r)
    },
    getRowClick(r, e, c) {
      this.$emit('getRowClick', r, e, c)
    },
    selectable() {
      return this.isCheckboxUse
    },
    // 按钮事件、处理权限
    fun(row, buttonId, permissionValue) {
      if (permissionValue) {
        if (this.permission(permissionValue)) {
          this.$emit('operationEvent' + buttonId, row)
        } else {
          this.$message({
            message: '暂无权限',
            type: 'warning'
          })
        }
      } else {
        this.$emit('operationEvent' + buttonId, row)
      }
    },
    permission(permissionValue) {
      // 处理存在权限按钮
      if (this.permissionValue) {
        const resButton = this.permissionButtons.find(
          (v) => v === permissionValue
        )
        return resButton !== undefined
      } else {
        return false
      }
    },
    // 搜索页码获取列表
    getList() {
      this.$emit('getListByPagination', this.listQuery)
    },
    handleFilter() {
      // 手动触发 @current-page事件
      this.$refs.pagination.lastEmittedPage = 1
      // 通过筛选条件每次请求默认第一页
      this.listQuery.current = 1
      this.getList()
    },
    // 修改每页条数
    handleSizeChange(val) {
      this.listQuery.pageSize = val
      this.getList()
    },
    // 页码改变时触发
    handleCurrentChange(val) {
      this.listQuery.current = val
      this.getList()
    },
    // 索引
    indexMethod(index) {
      return this.listQuery.pageSize * (this.listQuery.current - 1) + index + 1
    },
    // 添加联系人
    addcontactMen(row) {
      this.concatMenForm = Object.assign({}, row)
      this.dialogTitle = '添加'
      this.contactMenFormVisible = true
    },
    handleCreateOrUpdate() {
      let id = this.concatMenForm.Id
      if (this.concatMenForm.org_emp_id) {
        id = this.concatMenForm.org_emp_id
      }
      const data = {
        id: id,
        link_phone: parseInt(this.concatMenForm.link_phone),
        ling_man: this.concatMenForm.link_man
      }
      update('mycustomer', data).then((res) => {
        if (res.success) {
          this.$message({
            message: this.dialogTitle + '成功',
            type: 'success'
          })
          this.getList()
          this.contactMenFormVisible = false
        }
      })
    },
    editorcontactMen(row) {
      this.concatMenForm = Object.assign({}, row)
      this.dialogTitle = '编辑'
      this.contactMenFormVisible = true
    },
    onClose() {
      this.contactMenFormVisible = false
    }
  }
}
</script>
<style lang="scss">
.lg-tabel-container {
  .el-table {
    font-size: 12px;
    tr {
      .companyInfo {
        a {
          height: 20px;
          line-height: 20px;
        }
        .editorContac {
          display: none;
          margin-left: 5px;
          padding: 0;
        }
      }
      &.hover-row {
        .companyInfo {
          a {
            height: 20px;
            line-height: 20px;
            text-decoration: underline;
          }
          .editorContac {
            display: inline-block;
          }
        }
      }
    }
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
.company-container {
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  img {
    width: 40px;
    height: 40px;
    display: inline-block;
  }
  .companyInfo {
    flex: 1;
    margin-left: 20px;
    font-size: 12px;
    text-align: left;
    a {
      line-height: 20px;
      color: #4b4b4b;
    }
    p {
      margin: 0;
      line-height: 20px;
      color: #757575;
    }
  }
}
.sqContent {
  display: flex;
  align-items: center;
  height: 30px;
  img {
    width: 30px;
    height: 30px;
    vertical-align: middle;
    margin-right: 8px;
  }
  span {
    font-size: 12px;
    color: #757575;
    line-height: 30px;
    display: inline-block;
    width: 110px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
</style>

