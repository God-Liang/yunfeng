// 授权
<template>
  <div>
    <div class="filter-container">
      <el-select
        v-model="filters['input.papers_type']"
        class="marginR20"
        placeholder="类型"
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
        placeholder="请输入客户名称"
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
      >添加证件</el-button>
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
      :title="dialogStatus == 'update' ? '编辑档案' : '添加档案'"
      :visible.sync="addVisible"
      width="650px"
      :before-close="onClose"
    >
      <el-form
        ref="formData"
        label-width="100px"
        :model="formData"
        :rules="rules"
      >
        <h3>基础信息</h3>
        <el-form-item label="证件类型" prop="papers_type">
          <el-select
            v-model="formData.papers_type"
            placeholder="证件类型"
            size="small"
          >
            <el-option
              v-for="item in typeOptions"
              v-show="item.value != 0"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
          <!-- <el-input
            v-model="formData.papers_type"
            size="small"
          /> -->
        </el-form-item>
        <el-form-item label="客户名称" prop="customer_name">
          <el-input v-model="formData.customer_name" />
        </el-form-item>
        <el-form-item label="有效期" prop="start_time">
          <el-date-picker
            v-model="formData.start_time"
            size="small"
            type="date"
            value-format="yyyy-MM-dd"
            style="width:180px;"
            placeholder="开始日期"
            @change="onStartTime"
          />
          至
          <el-date-picker
            v-show="formData.long_term == 0 || formData.long_term == null"
            v-model="formData.end_time"
            value-format="yyyy-MM-dd"
            size="small"
            type="date"
            style="width:180px;"
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
        <el-form-item label="证件" prop="code">
          <el-upload
            :action="action"
            list-type="picture-card"
            :file-list="fileList"
            :headers="headers"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
            :on-success="handleSuccess"
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
  name: 'Other',
  components: { lgTable },
  props: {
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
      apiUri: 'archives',
      list: [],
      total: 0,
      listQuery: {
        current: 1,
        pageSize: 10
      },
      filters: {
        'input.papers_type': 0,
        'input.qbqx': '0',
        'input.query': ''
      },
      typeOptions: [
        { label: '全部', value: 0 },
        { label: '服务承诺书', value: 1 },
        { label: '廉政协议书', value: 2 },
        { label: '其他', value: 3 }
      ],
      userAttr: {
        thead: [
          {
            label: 'customer_name',
            text: '客户名称'
          },
          {
            label: 'papers_type',
            text: '证件类型'
          },
          {
            label: 'start_time',
            text: '有效期'
          },
          {
            label: 'end_time',
            text: '有效期'
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
      dialogStatus: 'add',
      rules: {
        papers_type: [
          { required: true, message: '证件类型不能为空！', trigger: 'blur' }
        ],
        customer_name: [
          { required: true, message: '客户名称不能为空！', trigger: 'blur' }
        ],
        start_time: [
          { required: true, message: '有效期不能为空！', trigger: 'change' }
        ]
      },
      formData: {},
      isLong: '',
      time: '',
      dialogImageUrl: '',
      dialogVisible: false,
      fileList: []
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
        start_time: '',
        end_time: '',
        long_term: 0
      }
      this.addVisible = true
      this.dialogStatus = 'add'
      this.fileList = []
      this.formData.attach_id = '-1'
    },
    // 添加
    creatData() {
      if (
        this.formData.attach_id === '' ||
        this.formData.attach_id === undefined
      ) {
        this.formData.attach_id = '-1'
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
      console.log(row)
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
