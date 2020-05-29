// 注册证
<template>
  <div>
    <div class="filter-container clearfix">
      <div class="filters clearfix fl">
        <div class="f_item">
          <span v-if="isAdvSearch" class="f_label">状态:</span>
          <el-select
            v-model="filters['input.deleted']"
            placeholder="状态"
            clearable
            size="small"
          >
            <el-option
              v-for="item in statusOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>
        <div class="f_item">
          <span v-if="isAdvSearch" class="f_label">认证状态:</span>
          <el-select
            v-model="filters['input.cer_check_type']"
            placeholder="认证状态"
            clearable
            size="small"
          >
            <el-option
              v-for="item in acStatusOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>
        <div class="f_item">
          <span v-if="isAdvSearch" class="f_label">证件类型:</span>
          <el-select
            v-model="filters['input.certificate_type']"
            placeholder="证件类型"
            clearable
            size="small"
          >
            <el-option
              v-for="item in typeOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>
        <div v-if="isAdvSearch" class="f_item">
          <span class="f_label">是否进口:</span>
          <el-select
            v-model="filters['input.inward']"
            placeholder="是否进口"
            clearable
            size="small"
          >
            <el-option
              v-for="item in importOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>
        <div v-if="isAdvSearch" class="f_item">
          <span class="f_label">全部效期:</span>
          <el-select
            v-model="filters['input.qbxq']"
            placeholder="全部效期"
            clearable
            size="small"
          >
            <el-option
              v-for="item in validDateOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>
        <div class="f_item">
          <span v-if="isAdvSearch" class="f_label">关键字:</span>
          <el-input
            v-model="filters['input.query']"
            style="width:199px;"
            placeholder="注册证号/产品名称/厂家"
            size="small"
          />
        </div>
        <div class="f_item" :class="{ fr: isAdvSearch }">
          <el-button
            type="primary"
            size="small"
            @click="handleFilter"
          >搜索</el-button>
          <el-button
            v-show="isAdvSearch"
            size="small"
            @click="resetFilters"
          >重置</el-button>
          <el-button
            type="text"
            size="small"
            @click="isAdvSearch = !isAdvSearch"
          >
            {{ isAdvSearch ? '简易' : '高级' }}搜索
            <i v-if="isAdvSearch" class="el-icon-arrow-up" />
            <i v-else class="el-icon-arrow-down" />
          </el-button>
        </div>
      </div>
      <el-button
        type="primary fr"
        icon="el-icon-plus"
        size="small"
        @click="handleCreate"
      >添加注册证</el-button>
    </div>

    <lgTable
      columns-type="index"
      columns-label="序号"
      :list="list"
      :total-list="total"
      :lg-thead="userAttr.thead"
      :lg-buttons="userAttr.buttons"
      :lg-status="userAttr.status"
      status-name="deleted"
      @operationEvent0="operationEvent0"
      @operationEvent1="operationEvent1"
      @operationEvent2="operationEvent2"
      @operationEvent3="operationEvent3"
      @initListQuery="initListQuery"
      @getListByPagination="getListByPagination"
    />

    <el-dialog
      :title="isEdit ? '编辑注册证' : '添加注册证'"
      :visible.sync="addVisible"
      width="650px"
      @close="onClose"
    >
      <template>
        <div v-show="step === 1 && !isEdit">
          <el-form
            ref="formExistData"
            :model="formExistData"
            :rules="formExistRules"
            label-width="100px"
          >
            <el-form-item label="证件类型：" prop="certificate_type">
              <el-radio-group
                v-model="formExistData.certificate_type"
                size="mini"
              >
                <el-radio-button
                  v-for="(item, index) in typeOptions"
                  :key="index"
                  :label="item.value"
                >{{ item.label }}</el-radio-button>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="证件编号：" prop="certificate_no">
              <el-input
                v-model="formExistData.certificate_no"
                size="small"
                @blur="blurCerCode"
              />
            </el-form-item>
            <el-form-item>
              如果资质没有证号请选择：
              <el-button size="small" @click="onNullNo">无证号资质</el-button>
            </el-form-item>
          </el-form>
        </div>
        <div v-show="step === 2 || isEdit">
          <el-alert
            v-show="!isEdit"
            :title="hintTitleArr[hintFlag]"
            :closable="false"
            type="warning"
            show-icon
          />
          <el-form
            ref="creatForm"
            :model="formData"
            :rules="formRules"
            label-width="100px"
          >
            <el-form-item label="证件编号：">
              <span>{{ formData.certificate_no }}</span>
              <el-button
                v-if="hintFlag != 0"
                type="text"
                @click="step = 1"
              >编辑证号</el-button>
              <span v-if="hintFlag == 0 && !isEdit">系统自动生成</span>
            </el-form-item>
            <el-form-item label="证件类型：" prop="certificate_type">
              <span>{{ formExistData.certificate_type | filterType }}</span>
            </el-form-item>
            <!-- <el-form-item
            style="display:none"
            label="产品名称："
            prop="certificate_name"
          >
            <el-input
              v-model="formData.certificate_name"
              size="small"
            />
          </el-form-item> -->
            <el-form-item
              v-if="!isEdit"
              label="产品名称："
              prop="certificate_name"
            >
              <el-input v-model="formData.certificate_name" size="small" />
            </el-form-item>
            <el-form-item v-else label="产品名称：">
              {{ formData.certificate_name }}
            </el-form-item>
            <el-form-item
              v-if="!isEdit"
              label="生产企业："
              prop="product_factory"
            >
              <el-input v-model="formData.product_factory" size="small" />
            </el-form-item>
            <el-form-item v-else label="生产企业：">
              {{ formData.product_factory }}
            </el-form-item>
            <el-form-item v-if="!isEdit" label="有效期：" prop="start_time">
              <el-date-picker
                v-model="formData.start_time"
                style="width: 140px"
                size="small"
                type="date"
                value-format="yyyy-MM-dd"
                placeholder="选择日期"
                @change="onStartTime"
              />
              <span style="font-size: 13px;">至</span>
              <el-date-picker
                v-if="formData.longTerm === 0 || formData.longTerm == null"
                v-model="formData.end_time"
                style="width: 140px"
                size="small"
                type="date"
                value-format="yyyy-MM-dd"
                placeholder="选择日期"
              />
              <el-checkbox
                v-model="formData.longTerm"
                :true-label="1"
                :false-label="0"
                style="margin-left:30px;"
              >长期有效</el-checkbox>
            </el-form-item>
            <el-form-item
              v-else
              label="有效期："
            >{{ formData.start_time }} 至 {{ formData.end_time || '~' }}
            </el-form-item>
            <el-form-item v-if="!isEdit" label="是否进口：" prop="inward">
              <el-radio v-model="formData.inward" label="1">是</el-radio>
              <el-radio v-model="formData.inward" label="2">否</el-radio>
            </el-form-item>
            <el-form-item v-else label="是否进口：">{{
              formData.inward == 1 ? '是' : '否'
            }}</el-form-item>
          </el-form>
          <h3>证件图片信息</h3>
          <el-row class="tips">
            <el-col :span="4" class="textR">
              <p>注意:</p>
            </el-col>
            <el-col :span="20">
              <p>1、图片必须盖公司红章</p>
              <p>
                2、图片上传时必须要把注册证首页、注册登记表、规格附页全部上传
              </p>
              <p>3、图片大小限制20M以内，格式BMP、pdf、jpg、png</p>
            </el-col>
          </el-row>
          <el-row class="tips">
            <el-col :span="4" class="textR">
              <p />
            </el-col>
            <el-col :span="20">
              <el-upload
                :action="action"
                size="small"
                list-type="picture-card"
                :file-list="fileList"
                :headers="headers"
                :on-preview="handlePictureCardPreview"
                :on-remove="handleRemove"
                :on-success="handleSuccess"
              >
                <i class="el-icon-plus" />
              </el-upload>
            </el-col>
          </el-row>
        </div>
      </template>
      <span slot="footer" class="dialog-footer">
        <div v-show="step == 1 && !isEdit">
          <el-button @click="onClose">取消</el-button>
          <el-button
            type="primary"
            @click="onNext('formExistData')"
          >下一步</el-button>
        </div>
        <div v-show="step == 2 || isEdit">
          <el-button v-if="!isEdit" @click="onPrev">上一步</el-button>
          <el-button v-if="isEdit" @click="addVisible = false">取消</el-button>
          <el-button type="primary" @click="createData">提交</el-button>
        </div>
      </span>
    </el-dialog>
    <!-- 图片预览 -->
    <el-dialog :visible.sync="dialogVisible" append-to-body>
      <img width="100%" :src="dialogImageUrl" alt>
    </el-dialog>
    <!--编辑新增部门弹出框-->
    <lgDialog
      title="编辑注册证"
      :visible="dialogRegisterVisible"
      width="500px"
      :show-form="false"
      @on-submit="updateData"
      @on-close="onRegisterClose"
    >
      <template />
    </lgDialog>
  </div>
</template>
<script>
import lgTable from '@/views/components/lgTable'
import { list, update, create } from '@/api/common'
// import { list, update, create } from '@/api/common'
import { getToken } from '@/utils/auth'
import { parseTime } from '@/utils'
import lgDialog from '@/views/components/lgDialog'
import { setTimeout } from 'timers'
var _this
export default {
  name: 'Register',
  components: { lgTable, lgDialog },
  filters: {
    filterType(val) {
      const typeArr = _this.typeOptions.filter((v) => {
        return v.value === val
      })
      return typeArr.length > 0 ? typeArr[0].label : '无证号资质'
    }
  },
  props: {
    statusOptions: {
      type: Array,
      default: function() {
        return []
      }
    },
    importOptions: {
      type: Array,
      default: function() {
        return []
      }
    }
  },
  data() {
    const checkCode = (rule, value, callback) => {
      setTimeout(() => {
        if (this.isExist) {
          callback(new Error('该证书编号已存在'))
        } else {
          callback()
        }
      }, 200)
    }
    return {
      isAdvSearch: false,
      apiUri: 'certificate',
      list: [],
      total: 0,
      listQuery: {
        current: 1,
        pageSize: 10
      },
      filters: {
        'input.deleted': null,
        'input.cer_check_type': null,
        'input.certificate_type': null,
        'input.inward': null,
        'input.qbxq': null,
        'input.query': ''
      },
      acStatusOptions: [
        { label: '全部', value: 0 },
        { label: '已认证', value: 1 },
        { label: '待审核', value: 2 },
        { label: '未通过', value: 3 }
      ],
      typeOptions: [
        { label: '注册证', value: 1 },
        { label: '备案证', value: 2 },
        { label: '消毒证', value: 3 },
        { label: '药品批准文号', value: 4 },
        { label: '药包材注册证', value: 5 },
        { label: '无证号资质', value: 6 }
      ],
      validDateOptions: [
        { label: '全部', value: 0 },
        { label: '已过期', value: 1 },
        { label: '一个星期内', value: 2 },
        { label: '一个月内', value: 3 },
        { label: '三个月内', value: 4 },
        { label: '六个月内', value: 5 }
      ],
      userAttr: {
        thead: [
          {
            label: 'category_name',
            text: '证件类型'
          },
          {
            label: 'certificate_no',
            text: '注册证号'
          },
          {
            label: 'certificate_name',
            text: '产品名称'
          },
          {
            label: 'end_time',
            text: '有效期',
            width: '220'
          },
          {
            label: 'product_factory',
            text: '生产厂家'
          },
          {
            label: 'deleted',
            text: '状态'
          }
          // {
          //   label: 'cer_check_type',
          //   text: '平台认证状态'
          // }
        ],
        buttons: {
          status: true, // 是否区分操作状态 true：根据当前列的数据状态值使用operation[状态值]; false：使用operation[0]
          width: 200, // 表格操作列的宽度
          operation: {
            // 操作按钮配置
            1: [
              {
                name: 'editor',
                text: '编辑',
                id: 0,
                type: 'primary'
              },
              {
                name: 'blockup',
                text: '停用',
                id: 3,
                type: 'primary'
              }
            ],
            2: [
              {
                name: 'editor',
                text: '编辑',
                id: 0,
                type: 'primary'
              },
              {
                name: 'blockup',
                text: '启用',
                id: 3,
                type: 'primary'
              }
            ]
          }
        },
        status: [
          {
            status: 1,
            text: '启用',
            tag: 'success'
          },
          {
            status: 2,
            text: '停用',
            tag: 'danger'
          }
        ]
      },
      // 添加注册证
      addVisible: false,
      formExistData: {
        certificate_type: 1,
        certificate_no: ''
      },
      formExistRules: {
        certificate_type: [
          { required: true, message: '证件类型不能为空！', trigger: 'change' }
        ],
        certificate_no: [
          { required: true, message: '证件编号不能为空！', trigger: 'blur' },
          { required: true, validator: checkCode, trigger: 'blur' }
        ]
      },
      hintTitleArr: [
        '无证号资质无需平台审核，提交后即可使用',
        '平台尚未添加此证件，请填写好证件信息，并将证件的首页及附页图片或扫描件上传，提交至客服进行审核。',
        '平台已经存在这本证件，请上传证件扫描件或图片信息'
      ],
      hintFlag: 0,
      formData: {
        certificate_type: null,
        certificate_no: '',
        certificate_name: '',
        product_factory: '',
        inward: '2',
        start_time: '',
        end_time: '',
        longTerm: 0,
        cer_check_type: 2
      },
      formRules: {
        certificate_name: [
          { required: true, message: '产品名称不能为空！', trigger: 'blur' }
        ],
        product_factory: [
          { required: true, message: '生产企业不能为空！', trigger: 'blur' }
        ],
        inward: [
          { required: true, message: '是否进口不能为空！', trigger: 'change' }
        ],
        start_time: [
          { required: true, message: '有效期不能为空！', trigger: 'change' }
        ]
      },
      step: 1,
      action: this.$store.state.app.BASE_API + '/file/upload',
      headers: {
        Authorization: getToken()
      },
      // 图片预览
      dialogImageUrl: '',
      dialogVisible: false,
      // 编辑注册证
      dialogRegisterVisible: false,
      // 时间处理校验
      timeFlag: true,
      // 验证证件编号是否已存在
      isExist: false,
      isEdit: false,
      fileList: []
    }
  },
  beforeCreate() {
    _this = this
  },
  mounted() {
    this.getList()
  },
  methods: {
    // 初始化页数与条数
    initListQuery(listQuery) {
      this.listQuery = listQuery
    },
    // 分页操作
    getListByPagination(listQuery) {
      this.listQuery = listQuery
      this.getList()
    },
    // 重置
    resetFilters() {
      this.filters = {}
    },
    // 过滤列表
    handleFilter() {
      this.listQuery.current = 1
      this.getList()
    },
    // 获取列表
    getList() {
      const params = Object.assign({}, this.listQuery, this.filters)
      list(this.apiUri, params).then((res) => {
        if (res.success) {
          this.list = res.data.list
          this.total = res.data.total_count
          this.$emit('total', this.total)
        }
      })
    },
    // 编辑
    operationEvent0(row) {
      this.formData = Object.assign({}, row)
      this.fileList = this.formData.attachmentList.map((res) => {
        const file = {
          name: res.file_name,
          url: res.file_path,
          response: {
            data: {
              attach_id: res.id,
              file_name: res.file_name,
              url: res.file_path
            }
          }
        }
        return file
      })
      const attach_ids = this.fileList.map((res) => {
        return res.response.data.attach_id
      })
      this.formData.attach_id = attach_ids.join(',')
      this.addVisible = true
      this.isEdit = true
    },
    // 换证
    operationEvent1(row) {},
    // 延期
    operationEvent2(row) {},
    // 启用/停用
    operationEvent3(row) {
      const obj = { id: row.id }
      let str = ''
      if (row.deleted === 1) {
        obj.deleted = 2
        str = '停用'
      } else {
        obj.deleted = 1
        str = '启用'
      }
      this.$confirm(`您确定要${str}该证件吗？`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          update(this.apiUri, obj).then((res) => {
            if (res.success) {
              this.getList()
              this.$message({
                message: '操作成功',
                type: 'success'
              })
            }
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消忽略'
          })
        })
    },
    // 添加注册证
    handleCreate() {
      this.addVisible = true
      this.isEdit = false
      this.step = 1
      this.formExistData = {
        certificate_type: 1,
        certificate_no: ''
      }
      this.formData = {
        certificate_type: 1,
        certificate_no: '',
        certificate_name: '',
        product_factory: '',
        inward: '2',
        start_time: '',
        end_time: '',
        longTerm: 0,
        cer_check_type: 2
      }
    },
    createData() {
      if (
        this.formData.attach_id === '' ||
        this.formData.attach_id === undefined
      ) {
        this.formData.attach_id = '-1'
      }

      if (!this.isEdit) {
        this.$refs.creatForm.validate((valid) => {
          if (valid) {
            const obj = Object.assign({}, this.formExistData, this.formData)
            if (this.formData.longTerm) {
              obj.end_time = ''
            }
            if (this.formData.certificate_no === '') {
              this.formData.certificate_no = '0'
            }
            create(this.apiUri, obj).then((res) => {
              if (res.success) {
                this.getList()
                this.$message({
                  message: '添加成功',
                  type: 'success'
                })
                this.addVisible = false
                this.$refs.creatForm.clearValidate()
              }
            })
          } else {
            console.log('error submit!!')
            return false
          }
        })
      } else {
        const obj = {
          id: this.formData.id,
          attach_id: this.formData.attach_id,
          deleted: this.formData.deleted
        }
        update(this.apiUri, obj).then((res) => {
          if (res.success) {
            this.getList()
            this.$message({
              message: '操作成功',
              type: 'success'
            })
            this.addVisible = false
          }
        })
      }

      // this.addVisible = false
    },
    // 验证证件编号
    blurCerCode() {
      const params = { certificate_no: this.formExistData.certificate_no }
      list(this.apiUri, params).then((res) => {
        if (res.success) {
          if (res.data.total_count !== 0) {
            this.isExist = true
          } else {
            this.isExist = false
          }
        }
      })
    },
    onClose() {
      this.addVisible = false
      this.$refs.creatForm.clearValidate()
    },
    // 下一步
    onNext(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.step = 2
          for (const key in this.formExistData) {
            if (this.formExistData.hasOwnProperty(key)) {
              this.formData[key] = this.formExistData[key]
            }
          }
          this.hintFlag = 1
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    // 上一步
    onPrev() {
      this.step = 1
    },
    // 无资质证号
    onNullNo() {
      this.$refs['formExistData'].clearValidate()
      this.step = 2
      this.formData.certificate_no === ''
    },
    // 编辑注册证
    updateData() {},
    onRegisterClose() {
      this.dialogRegisterVisible = false
    },
    // 上传图片成功
    handleSuccess(response, file, fileList) {
      const attach_ids = fileList.map((res) => {
        return res.response.data.attach_id
      })
      this.formData.attach_id = attach_ids.join(',')
    },
    // 删除图片
    handleRemove(file, fileList) {
      const attach_ids = fileList.map((res) => {
        return res.response.data.attach_id
      })
      this.formData.attach_id = attach_ids.join(',')
    },
    // 查看图片
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    // 通过开始时间默认给结束时间
    onStartTime(val) {
      if (val) {
        const startTime = new Date(val)
        startTime.setFullYear(startTime.getFullYear() + 15)
        this.formData.end_time = parseTime(startTime, '{y}-{m}-{d}')
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.filter-container {
  padding-bottom: 0;
  .filters {
    width: calc(100% - 150px);
    .f_item {
      float: left;
      margin: 0 20px 10px 0;
      .f_label {
        width: 75px;
        display: inline-block;
        text-align: right;
        font-size: 12px;
      }
    }
  }
}
.textR {
  text-align: right;
}
.tips {
  color: #bebebe;
}
</style>
