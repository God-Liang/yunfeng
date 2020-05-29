// entrust 委托
<template>
  <div>
    <div class="filter-container">
      <el-select
        v-model="filters['input.deleted']"
        class="marginR20"
        placeholder="证件状态"
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
      <el-select
        v-model="filters['input.qbqx']"
        class="marginR20"
        placeholder="效期"
        clearable
        size="small"
      >
        <el-option
          v-for="item in isOverdueOptions"
          :key="item.value"
          :label="item.label"
          :value="item.category_code"
        />
      </el-select>
      <el-input
        v-model="filters['input.query']"
        class="marginR20"
        style="width:199px;"
        placeholder="客户名称/业务员/手机号码"
        size="small"
      />
      <el-button
        type="primary"
        size="small"
        @click="handleFilter"
      >搜索</el-button>
      <el-button
        type="primary fr"
        icon="el-icon-plus"
        size="small"
        @click="handleCreat"
      >添加委托书</el-button>
    </div>
    <lgTable
      :has-selection="false"
      :list="list"
      :total-list="total"
      :lg-thead="userAttr.thead"
      :lg-buttons="userAttr.buttons"
      :lg-status="userAttr.status"
      status-name="deleted"
      @operationEvent0="operationEvent0"
      @operationEvent1="operationEvent1"
      @operationEvent2="operationEvent2"
      @initListQuery="initListQuery"
      @getListByPagination="getListByPagination"
    />

    <el-dialog
      :title="dialogStatus == 'update' ? '编辑委托书' : '添加委托书'"
      :visible.sync="addVisible"
      width="650px"
      :before-close="onClose"
    >
      <el-form
        ref="formData"
        label-width="120px"
        :model="formData"
        :rules="rules"
      >
        <h3>基础信息</h3>
        <el-form-item label="委托客户名称" prop="customer_name">
          <el-input v-model="formData.customer_name" />
        </el-form-item>
        <el-form-item label="员工真实姓名" prop="employee_name">
          <el-input v-model="formData.employee_name" />
        </el-form-item>
        <el-form-item label="手机号码" prop="phone">
          <el-input v-model="formData.phone" />
        </el-form-item>
        <el-form-item label="有效期" prop="start_time">
          <el-date-picker
            v-model="formData.start_time"
            value-format="yyyy-MM-dd"
            size="small"
            type="date"
            style="width:160px;"
            placeholder="开始日期"
            @change="onStartTime"
          />
          至
          <el-date-picker
            v-show="!formData.long_term"
            v-model="formData.end_time"
            value-format="yyyy-MM-dd"
            size="small"
            type="date"
            style="width:160px;"
            placeholder="结束日期"
          />
          <el-checkbox
            v-model="formData.long_term"
            :true-label="1"
            :false-label="0"
            size="small"
            class="fr"
          >长期有效</el-checkbox>
        </el-form-item>
        <h3>证件图片信息</h3>
        <el-form-item label="法人委托书" prop="code">
          <el-upload
            :action="action"
            list-type="picture-card"
            :file-list="fileList1"
            :headers="headers"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
            :on-success="handleSuccess"
          >
            <i class="el-icon-plus" />
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="">
          </el-dialog>
        </el-form-item>
        <el-form-item label="身份证正反面" prop="code">
          <el-upload
            :action="action"
            list-type="picture-card"
            :file-list="fileList2"
            :headers="headers"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove2"
            :on-success="handleSuccess2"
          >
            <i class="el-icon-plus" />
          </el-upload>
          <el-dialog :visible.sync="dialogVisible" append-to-body>
            <img width="100%" :src="dialogImageUrl" alt="">
          </el-dialog>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="addVisible = false">取消</el-button>
        <el-button type="primary" @click="creatData">确认</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import lgTable from '@/views/components/lgTable'
import { list, update, create } from '@/api/common'
import { parseTime } from '@/utils'
import { getToken } from '@/utils/auth'
// import { list, update, create } from '@/api/common'
export default {
  name: 'Entrust',
  components: { lgTable },
  props: {
    statusOptions: {
      type: Array,
      default: function() {
        return []
      }
    },
    isOverdueOptions: {
      type: Array,
      default: function() {
        return []
      }
    }
  },
  data() {
    return {
      action: this.$store.state.app.BASE_API + '/file/upload',
      headers: {
        Authorization: getToken()
      },
      apiUri: 'entrust',
      list: [],
      total: 0,
      listQuery: {
        current: 1,
        pageSize: 10
      },
      filters: {
        'input.deleted': 0,
        'input.qbqx': '0',
        'input.query': ''
      },
      userAttr: {
        thead: [
          {
            label: 'customer_name',
            text: '客户名称'
          },
          {
            label: 'employee_name',
            text: '业务员'
          },
          {
            label: 'phone',
            text: '手机号'
          },
          {
            label: 'end_time',
            text: '有效期',
            width: '220'
          },
          {
            label: 'deleted',
            text: '状态'
          }
        ],
        buttons: {
          status: true, // 是否区分操作状态 true：根据当前列的数据状态值使用operation[状态值]; false：使用operation[0]
          width: 300, // 表格操作列的宽度
          operation: {
            // 操作按钮配置
            1: [
              {
                name: 'editor',
                text: '编辑',
                id: 0,
                type: 'primary'
              },
              // {
              //   name: 'change',
              //   text: '换证',
              //   id: 1,
              //   type: 'primary'
              // },
              {
                name: 'blockup',
                text: '停用',
                id: 2,
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
              // {
              //   name: 'change',
              //   text: '换证',
              //   id: 1,
              //   type: 'primary'
              // },
              {
                name: 'blockup',
                text: '启用',
                id: 2,
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
      addVisible: false,
      dialogStatus: 'update',
      rules: {
        customer_name: [
          { required: true, message: '客户名称不能为空！', trigger: 'blur' }
        ],
        employee_name: [
          { required: true, message: '员工姓名不能为空！', trigger: 'blur' }
        ],
        phone: [
          { pattern: /^1\d{10}$/, message: '手机号不正确' },
          { required: true, message: '手机号码不能为空！', trigger: 'blur' }
        ],
        start_time: [
          { required: true, message: '有效期不能为空！', trigger: 'change' }
        ]
      },
      formData: {
        start_time: '',
        end_time: '',
        long_term: 0
      },
      dialogImageUrl: '',
      dialogVisible: false,
      fileList1: [],
      fileList2: []
    }
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
    onClose() {
      this.addVisible = false
      this.$refs.formData.clearValidate()
    },
    handleCreat() {
      this.formData = {
        long_term: 0
      }
      this.addVisible = true
      this.dialogStatus = 'add'
      this.fileList1 = []
      this.fileList2 = []
      this.formData.fr_attach_id = '-1'
      this.formData.sfz_attach_id = '-1'
    },
    // 添加
    creatData() {
      if (
        this.formData.fr_attach_id === '' ||
        this.formData.fr_attach_id === undefined
      ) {
        this.formData.fr_attach_id = '-1'
      }
      if (
        this.formData.sfz_attach_id === '' ||
        this.formData.sfz_attach_id === undefined
      ) {
        this.formData.sfz_attach_id = '-1'
      }
      this.$refs.formData.validate((valid) => {
        if (valid) {
          const obj = Object.assign({}, this.formData)
          if (obj.long_term === 1) {
            obj.end_time = ''
          }
          if (obj.id === undefined) {
            obj.id = 0
          }
          create(this.apiUri, obj).then((res) => {
            if (res.success) {
              this.getList()
              this.$message({
                message: '添加成功',
                type: 'success'
              })
              this.$refs.formData.clearValidate()
              this.addVisible = false
            }
          })
        } else {
          return false
        }
      })
    },
    // 编辑
    operationEvent0(row) {
      this.formData = Object.assign({}, row)
      this.fileList1 = this.formData.fr_attachmentList.map((res) => {
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
      this.fileList2 = this.formData.sfz_attachmentList.map((res) => {
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

      const fr_attach_id = this.fileList1.map((res) => {
        return res.response.data.attach_id
      })
      this.formData.fr_attach_id = fr_attach_id.join(',')

      const sfz_attach_id = this.fileList2.map((res) => {
        return res.response.data.attach_id
      })
      this.formData.sfz_attach_id = sfz_attach_id.join(',')
      this.addVisible = true
      this.dialogStatus = 'update'
    },
    // 换证
    operationEvent1(row) {},
    // 启用/停用
    operationEvent2(row) {
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
    // 上传图片成功
    handleSuccess(response, file, fileList) {
      const attach_ids = fileList.map((res) => {
        return res.response.data.attach_id
      })
      this.formData.fr_attach_id = attach_ids.join(',')
    },
    // 删除图片
    handleRemove(file, fileList) {
      const attach_ids = fileList.map((res) => {
        return res.response.data.attach_id
      })
      this.formData.fr_attach_id = attach_ids.join(',')
    },
    // 上传图片成功
    handleSuccess2(response, file, fileList) {
      const attach_ids = fileList.map((res) => {
        return res.response.data.attach_id
      })
      this.formData.sfz_attach_id = attach_ids.join(',')
    },
    // 删除图片
    handleRemove2(file, fileList) {
      const attach_ids = fileList.map((res) => {
        return res.response.data.attach_id
      })
      this.formData.sfz_attach_id = attach_ids.join(',')
    },
    // 查看图片
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
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
.marginR20 {
  margin-right: 15px;
}
</style>
