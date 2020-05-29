<template>
  <div class="wrap ">
    <div class="flexWrap">
      <div class="leftWrap">
        <div class="filter-container">
          <div class='filterBox'>
            <div class='leftPart filterPart'>
              <dict-select clearable style="width: 120px" class="filter-item" v-model="filter.optRoomType" dict-code="ssslb">
              </dict-select>
              <el-input style="width: 220px;" class="filter-item" placeholder="请输入手术间代码或名称" v-model="filter.keywords">
              </el-input>
              <el-button class="filter-item" type="primary" v-waves icon="el-icon-search" @click="getListBySearch">搜索
              </el-button>
              <el-button type="primary" class="filter-item" @click="dialogLeftTop1_1_show()"> 新建</el-button>
            </div>
            <div class='rightPart filterPart'>

            </div>
          </div>
        </div>
        <complexTable
          :hasSelection=true :columnsType='"index"' :list='tableList1' :totalList='totalList1'
          :theadList="operationRoomConst.theadList1" :operationButtons='operationRoomConst.operationButtons1'
          :statusArr='operationRoomConst.statusArr' @operationEvent0='operationEvent1_0'
          @operationEvent1='operationEvent1_1' @getListByPagination = 'getListByPagination'
        ></complexTable>
      </div>
    </div>
    <el-dialog :title="dialogLeftTop1_1_title" :visible.sync="dialogLeftTop1_1" class='dialogLeftTop1_1'>
      <el-form ref="formLeftTop1" :rules="roomRules" :model="formLeftTop1" :inline="true" label-width="100px">
        <el-form-item label="代码" prop="code">
          <el-input v-model='formLeftTop1.code' style='width: 196px;'></el-input>
        </el-form-item>
        <el-form-item label="手术间名称" prop="name">
          <el-input v-model='formLeftTop1.name' style='width: 196px;'></el-input>
        </el-form-item>
        <el-form-item label="类别" prop="type">
          <dict-select v-model="formLeftTop1.type" placeholder="请选择手术室类别" style='width: 196px;' dict-code="ssslb">
          </dict-select>
        </el-form-item>
        <el-form-item label="可预约台数:" prop="optNo">
          <el-input-number
            v-model="formLeftTop1.optNo"
            :min="1"
            style="width: 196px;"
            label="输入手术台数"
          ></el-input-number>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-select v-model="formLeftTop1.status" placeholder="请选择启用标识" style='width: 196px;'>
            <el-option v-for='item in operationRoomConst.statusSelectArr' :label="item.label" :value="item.value"
                       :key='item.value'></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="备注">
          <el-input type='textarea' placeholder='请输入备注' v-model='formLeftTop1.note' style='width: 196px;'></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogLeftTop1_1 = false">取 消</el-button>
        <el-button type="primary" @click="formLeftTop1_submit('formLeftTop1')">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="手术简介预览" :visible.sync="dialogLeftTop1_2" class='dialogLeftTop1_2'>
      <div v-html='formLeftTop2'></div>
    </el-dialog>
    <el-dialog title="退出日间" :visible.sync="dialogLeftTop1_3" class='dialogLeftTop1_3'>
      <el-form ref="formLeftTop3" :model="formLeftTop3" label-width="80px">
        <el-form-item label="类型">
          <el-select v-model="formLeftTop3.type" placeholder="请选择取消类型">
            <el-option label='病人取消' value='type1'></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="取消原因">
          <el-select v-model="formLeftTop3.content" placeholder="请选择取消原因">
            <el-option label='不好' value='bad'></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="备注">
          <el-input type="textarea" v-model='formLeftTop3.remark'></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogLeftTop1_3 = false">取 消</el-button>
        <el-button type="primary" @click="dialogLeftTop1_3 = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import waves from '@/directive/waves/index.js'
  import complexTable from '@/views/table/complexTable'
  import { operationRoomConst } from '@/yimiviews/knowledgeManage/columnsConst'
  import { pending, postForm, remove, dictionary } from '@/api/knowledgeManage/operationRoom.js'
  import DictSelect from '@/views/form/dictSelect'

  const defaultForm = {
    operateDoctor: '',
    operateTelephone: '',
    department: '',
    professionalTitle: '',
    description: '',
    status: '',
    avatar: ''
  }
  export default {
    directives: { waves },
    components: { DictSelect, complexTable },
    mounted() {
      // this.handleFilter()
      this.initSelect()
      this.handleFilter(this.listQuery)
    },
    data() {
      return {
        dialogLeftTop1_1: false,
        dialogLeftTop1_2: false,
        dialogLeftTop1_3: false,
        operationRoomConst,
        tableList1: [],
        totalList1: 0,
        listQuery: {
          page: 1,
          limit: 10
        },
        filter: {
          optRoomType: '',
          keywords: ''
        },
        dialogLeftTop1_1_title: '',
        formLeftTop1: Object.assign({}, defaultForm),
        formLeftTop2: '',
        formLeftTop3: {
          type: '',
          content: '',
          remark: ''
        },
        roomRules: {
          code: { required: true, message: '请填写代码', trigger: 'blur' },
          name: { required: true, message: '请填写手术间名称', trigger: 'blur' },
          type: { required: true, message: '请填写类别', trigger: 'change' },
          status: { required: true, message: '请填写状态', trigger: 'change' }
        }
      }
    },
    methods: {
      initSelect() {
        dictionary({ type: 'bffl' }).then((res) => {

        })
      },
      handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw)
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg'
        const isLt2M = file.size / 1024 / 1024 < 2
        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!')
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!')
        }
        return isJPG && isLt2M
      },
      formLeftTop1_reset() {
        this.formLeftTop1 = Object.assign({}, defaultForm)
      },
      formLeftTop1_submit(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            postForm(this.formLeftTop1).then((res) => {
              if (res.data.code === 200) {
                this.dialogLeftTop1_1 = false
                this.$message({
                  message: '恭喜你，提交成功!',
                  type: 'success'
                })
                this.handleFilter(this.listQuery)
              }
            })
          } else {
            return false
          }
        })
      },
      dialogLeftTop1_1_show() {
        this.dialogLeftTop1_1 = true
        this.dialogLeftTop1_1_title = '新建'
        this.formLeftTop1_reset()
      },
      getListBySearch() {
        this.listQuery.page = 1
        this.handleFilter(this.listQuery)
      },
      getListByPagination(listQuery) {
        this.listQuery = listQuery
        pending(listQuery).then(res => {
          this.tableList1 = res.data.list
          this.totalList1 = parseInt(res.data.total)
        })
      },
      handleFilter(listQuery) {
        const query = Object.assign({}, listQuery, this.filter)
        pending(query).then(res => {
          this.tableList1 = res.data.list
          this.totalList1 = res.data.total
        })
      },
      operationEvent1_0(row) {
        this.formLeftTop1_reset()
        this.dialogLeftTop1_1_title = '编辑'
        this.formLeftTop1 = Object.assign({}, row)
        this.dialogLeftTop1_1 = !this.dialogLeftTop1_1
      },
      operationEvent1_1(row) {
        this.$confirm('此操作将永久删除该条信息, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          remove({ id: row.id }).then(() => {
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
            if (this.tableList1.length === 1) {
              this.listQuery.page = (this.listQuery.page - 1 <= 0 ? 1 : this.listQuery.page - 1)
            }
            this.handleFilter(this.listQuery)
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .wrap {
    .flexWrap {
      display: flex;
      height: 100%;
      background-color: #fff;
      overflow-y: scroll;
      overflow-x: hidden;
      .leftWrap {
        flex: 10;
      }
      .rightWrap {
        flex: 2;
      }
    }

    .filterBox {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .filterPart {
        line-height: 2;
      }
    }
    .avatar-uploader {
      .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
        &:hover {
          border-color: #409EFF;
        }
        .avatar-uploader-icon {
          font-size: 28px;
          color: #8c939d;
          width: 178px;
          height: 178px;
          line-height: 178px;
          text-align: center;
        }
        .avatar {
          width: 178px;
          height: 178px;
          display: block;
        }
      }
    }
  }
</style>
