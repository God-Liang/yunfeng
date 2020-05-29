<template>
    <div class="wrap ">
      <div class="flexWrap">
        <div class="leftWrap">
            <div class="filter-container">
              <div class= 'filterBox'>
                <div class='leftPart filterPart'>
                  <el-input style="width: 220px;" class="filter-item" placeholder="请输入搜索条件" v-model="filter.keywords">
                    </el-input>
                    <el-button class="filter-item" type="primary" v-waves icon="el-icon-search" @click="getListBySearch">搜索</el-button>
                  <el-button type="primary" class="filter-item" @click="dialogLeftTop1_1_show()"> 新建</el-button>
                </div>
                <div class='rightPart filterPart'></div>
              </div>
            </div>
          <complexTable
            :hasSelection= false 
            :list = 'list'
            :totalList = 'total'
            :theadList = "systemConst.theadList1"
            :operationButtons = 'systemConst.operationButtons1'
            :statusArr = 'systemConst.statusArr'
            @operationEvent0 = 'operationEvent1_0'
            @operationEvent1 = 'operationEvent1_1'
            @getListByPagination = 'getListByPagination'>
          </complexTable>
        </div>
      </div>
        <el-dialog  :title="dialogLeftTop1_1_title" :visible.sync="dialogLeftTop1_1" class='dialogLeftTop1_1'>
            <el-form ref="formLeftTop1" :model="formLeftTop1" :inline="true"  label-width="80px">
                <el-form-item label="系统编码">
                    <el-input v-model ='formLeftTop1.name' style= 'width: 196px;'></el-input>
                </el-form-item>

                <el-form-item label="系统名称">
                    <el-input v-model ='formLeftTop1.title' style= 'width: 196px;'></el-input>
                </el-form-item>
                <el-form-item label="描述">
                  <el-input type='textarea' placeholder= '请输入描述' v-model ='formLeftTop1.description'></el-input>
                </el-form-item>
                <el-form-item label="状态">
                  <dict-select v-model="formLeftTop1.status" placeholder="请选择" style= 'width: 196px;' dict-code="sjzt">
                  </dict-select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogLeftTop1_1 = false">取 消</el-button>
                <el-button type="primary" @click="formLeftTop1_submit()">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import waves from '@/directive/waves/index.js'
    import complexTable from '@/views/table/complexTable'
    import { systemConst } from '@/yimiviews/systemManage/columnsConst'
    import { getList, save, remove, update } from '@/api/systemManage/system'
    import DictSelect from '@/views/form/dictSelect'
    const defaultForm = {
      name: '',
      title: '',
      description: '',
      status: ''
    }
    export default {
      directives: { waves },
      components: { DictSelect, complexTable },
      mounted() {
        this.handleFilter()
      },
      data() {
        return {
          dialogLeftTop1_1: false,
          dialogLeftTop1_2: false,
          dialogLeftTop1_3: false,
          systemConst,
          isUpdate: true,
          list: [],
          total: 0,
          listQuery: {
            page: 1,
            limit: 10
          },
          filter: {
            keywords: ''
          },
          dialogLeftTop1_1_title: '',
          formLeftTop1: Object.assign({}, defaultForm)
        }
      },
      methods: {
        formLeftTop1_reset() {
          this.formLeftTop1 = Object.assign({}, defaultForm)
        },
        formLeftTop1_submit() {
          if (this.isUpdate) {
            update(this.formLeftTop1).then((res) => {
              this.dialogLeftTop1_1 = false
              this.$message({
                message: '恭喜你，提交成功!',
                type: 'success'
              })
              this.handleFilter()
            })
          } else {
            save(this.formLeftTop1).then((res) => {
              this.dialogLeftTop1_1 = false
              this.$message({
                message: '恭喜你，提交成功!',
                type: 'success'
              })
              this.handleFilter()
            })
          }
        },
        dialogLeftTop1_1_show() {
          this.dialogLeftTop1_1 = true
          this.dialogLeftTop1_1_title = '新建'
          this.formLeftTop1_reset()
        },
        getListBySearch() {
          this.listQuery.page = 1
          this.handleFilter()
        },
        getListByPagination(listQuery) {
          this.listQuery = listQuery
          this.handleFilter()
        },
        handleFilter() {
          const query = Object.assign({}, this.listQuery, this.filter)
          getList(query).then(res => {
            this.list = res.data.list
            this.total = parseInt(res.data.total)
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
              this.handleFilter()
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

<style lang="scss">
.wrap{
    .flexWrap{
        display: flex;
        height: 100%;
        background-color: #fff;
        overflow-y: scroll;
        overflow-x: hidden;
        .leftWrap{
            flex: 10;
        }
        .rightWrap{
            flex: 2;
        }
    }


    .filterBox{
        display: flex;
        justify-content: space-between;
        align-items: center;
        .filterPart{
        line-height: 2;
        }
    }
    .avatar-uploader{
     .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
        &:hover{
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
