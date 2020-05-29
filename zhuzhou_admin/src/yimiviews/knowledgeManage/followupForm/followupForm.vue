<template>
  <div class= 'wrap'>
    <div class="wrapBox">

   
      <div class="app-button-container">
          <el-button type="primary" @click=" dialogLeftTop1_1_show">新增表单</el-button>
          <el-button type="primary" @click=" dialogLeftTop1_2_show">编辑表单</el-button>
          <el-button type="primary" @click=" dialogLeftTopChildTable1_1_show">新增项目</el-button>
          <!-- <el-button type="primary" @click=" dialogLeftTop1_4_show">生成模板</el-button> -->
          <el-button type="primary" @click=" dialogLeftTop1_5_show">模板预览</el-button>
          <!-- <el-button type="primary" @click=" dialogLeftTop1_6_show"></el-button> -->
      </div>

      <div class="filter-container">
        <div class= 'filterBox'>
          <div class='leftPart filterPart'></div>
          <div class='rightPart filterPart'>
            <el-input style="width: 220px;" class="filter-item" placeholder="输入要查询的关键字" v-model="filter.nameTel">
            </el-input>
            <el-button class="filter-item" type="primary" v-waves icon="el-icon-search" @click="handleFilter">搜索</el-button>
          </div>
        </div>
      </div>
      <my-table :list = 'tableList1' :theadList = "theadList1" :operationButtons = 'operationButtons1'  @getListByPagination = 'getTableList1' @getSelectArr = 'getSelectArr' @childrenTableEvent ='childrenTableEdit'></my-table>
    </div>
      <el-dialog :title="dialogLeftTop1_1_dialogTitle" :visible.sync="dialogLeftTop1_1" class='dialogLeftTop1_1'>
        <el-form :model="dialogLeftTop1_1_data" ref='dialogLeftTop1_1_data' :show-message= true :rules="dialogLeftTop1_1_data_rules" :inline="true">
          <el-form-item label="表单分类" :label-width="formLabelWidth" prop="formType">
            <el-select v-model="dialogLeftTop1_1_data.formType" placeholder="请选择表单分类" style = 'width: 190px'>
              <el-option label="随访表单" value="1"></el-option>
              <el-option label="随访表单2" value="0"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="表单功能" :label-width="formLabelWidth" prop="formFacility">
            <el-select v-model="dialogLeftTop1_1_data.formFacility" placeholder="请选择表单功能" style = 'width: 190px'>
              <el-option label="普通表单" value="1"></el-option>
              <el-option label="特殊表单" value="0"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="表单名称" :label-width="formLabelWidth" prop="name">
            <el-input v-model="dialogLeftTop1_1_data.name" auto-complete="off" placeholder="请输入表单名称"></el-input>
          </el-form-item>
          <el-form-item label="启用状态" :label-width="formLabelWidth" prop="isShow">
            <el-select v-model="dialogLeftTop1_1_data.isShow" placeholder="请选择启用状态" style = 'width: 190px'>
              <el-option label="启用" value="1"></el-option>
              <el-option label="禁用" value="0"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="创建人" :label-width="formLabelWidth" prop="creater">
            <el-select v-model="dialogLeftTop1_1_data.creater" placeholder="请选择创建人" style = 'width: 190px'>
              <el-option label="张三" value="1"></el-option>
              <el-option label="李四" value="0"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="创建时间" :label-width="formLabelWidth" prop="createTime">
            <el-date-picker type="date" placeholder="选择日期" v-model="dialogLeftTop1_1_data.createTime" ></el-date-picker>
          </el-form-item>
          <el-form-item label="表单开头语" :label-width="formLabelWidth" prop="opending">
            <el-input type = 'textarea' rows = '10' v-model="dialogLeftTop1_1_data.opending" auto-complete="off" placeholder="请输入表单开头语"></el-input>
          </el-form-item>
          <el-form-item label="表单结束语" :label-width="formLabelWidth" prop="ending">
            <el-input type = 'textarea' rows = '10' v-model="dialogLeftTop1_1_data.ending" auto-complete="off" placeholder="请输入表单结束语"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogLeftTop1_1_cancel('dialogLeftTop1_1_data')">取 消</el-button>
          <el-button type="primary" @click="dialogLeftTop1_1_submit('dialogLeftTop1_1_data',dialogLeftTop1_1_data)">确 定</el-button>
        </div>
      </el-dialog>
      <el-dialog :title="dialogLeftTopChild1_1_dialogTitle" :visible.sync="dialogLeftTopChild1_1" class='dialogLeftTopChild1_1'>
        <el-form :model="dialogLeftTopChild1_1_data" ref='dialogLeftTopChild1_1_data' :show-message= true :rules="dialogLeftTopChild1_1_data_rules" :inline="true">
          <el-form-item label="项目名" :label-width="formLabelWidth" prop="title">
            <el-input v-model="dialogLeftTopChild1_1_data.title" auto-complete="off" placeholder="请输入项目名" style = 'width: 220px;'></el-input>
          </el-form-item>
          <el-form-item label="控件类型" :label-width="formLabelWidth" prop="type.el">
            <el-select v-model="dialogLeftTopChild1_1_data.type.el" placeholder="请选择控件类型" style = 'width: 220px;'>
              <el-option label="单选" value="radio" ></el-option>
              <el-option label="多选" value="checkbox"></el-option>
              <el-option label="下拉框" value="select"></el-option>
              <el-option label="文本域" value="textarea" ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="控件值域" :label-width="formLabelWidth" prop="options">
            <el-select
              v-model="dialogLeftTopChild1_1_data.options"
              multiple
              allow-create
              default-first-option
              filterable
              placeholder="请输入控件值域" style = 'width: 220px;'>
            </el-select>
          </el-form-item>
          <el-form-item label="备注" :label-width="formLabelWidth" prop="remark">
            <el-input type='textarea' v-model="dialogLeftTopChild1_1_data.remark" auto-complete="off" placeholder="请输入备注" style = 'width: 220px;'></el-input>
          </el-form-item>
          <el-form-item label="创建人" :label-width="formLabelWidth" prop="creater">
            <el-select v-model="dialogLeftTopChild1_1_data.creater" placeholder="请选择创建人" style = 'width: 220px'>
              <el-option label="本人" value="surgery1"></el-option>
              <el-option label="父亲" value="surgery2"></el-option>
              <el-option label="母亲" value="surgery3"></el-option>
              <el-option label="兄弟" value="surgery4"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="创建时间" :label-width="formLabelWidth" prop="createTime">
            <el-date-picker type="date" placeholder="选择日期" v-model="dialogLeftTopChild1_1_data.createTime" ></el-date-picker>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogLeftTopChild1_1 = false">取 消</el-button>
          <el-button type="primary" @click="dialogLeftTopChild1_1_submit(dialogLeftTopChild1_1_data)">确 定</el-button>
        </div>
      </el-dialog>

      <el-dialog title="模板预览" :visible.sync="dialogLeftTop1_5" class='dialogLeftTop1_1'>
        <span>{{dialogLeftTop1_5_data.opending}}</span>
        <el-form :model="dialogLeftTop1_5_data" label-position="top" ref='dialogLeftTop1_5_data' :show-message= true :inline="true">
          <el-form-item v-for='item in dialogLeftTop1_5_data.formLists' :label="item.title"  :prop="item.type.el" :key='item.id'>
            <el-select v-if='item.type.el === "select"'  v-model="item.feedback"  placeholder="请选择表单分类" style = 'width: 100%;'>
              <el-option v-for='(subItem, index) in item.options' :label="subItem" :value="index" :key='index'></el-option>
            </el-select>
            
            <el-radio-group v-else-if = 'item.type.el === "radio"' v-model="item.feedback"  style = 'width: 100%;'>
              <el-radio v-for='subItem in item.options' :label="subItem" :key='subItem'></el-radio>
            </el-radio-group>
            <el-checkbox-group v-else-if = 'item.type.el === "checkbox"' v-model="item.feedback" style = 'width: 100%;'>
              <el-checkbox v-for='(subItem, index) in item.options' :label="subItem" name="type" :key ='index'></el-checkbox>
            </el-checkbox-group>

          </el-form-item>
          <el-form-item label="表单功能" prop="formFacility" style = 'width: 100%;'>
            <el-select v-model="dialogLeftTop1_5_data.formFacility" placeholder="请选择表单功能" style = 'width: 190px'>
              <el-option label="普通表单" value="1"></el-option>
              <el-option label="特殊表单" value="0"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="表单名称"  prop="name">
            <el-input v-model="dialogLeftTop1_5_data.name" auto-complete="off" placeholder="请输入表单名称"></el-input>
          </el-form-item>
          <el-form-item label="启用状态"  prop="isShow">
            <el-select v-model="dialogLeftTop1_5_data.isShow" placeholder="请选择启用状态" style = 'width: 190px'>
              <el-option label="启用" value="1"></el-option>
              <el-option label="禁用" value="0"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="创建人"  prop="creater">
            <el-select v-model="dialogLeftTop1_5_data.creater" placeholder="请选择创建人" style = 'width: 190px'>
              <el-option label="张三" value="1"></el-option>
              <el-option label="李四" value="0"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="创建时间"  prop="createTime">
            <el-date-picker type="date" placeholder="选择日期" v-model="dialogLeftTop1_5_data.createTime" ></el-date-picker>
          </el-form-item>
          <el-form-item label="表单开头语" :label-width="formLabelWidth" prop="opending">
            <el-input type = 'textarea' rows = '10' v-model="dialogLeftTop1_5_data.opending" auto-complete="off" placeholder="请输入表单开头语"></el-input>
          </el-form-item>
          <el-form-item label="表单结束语" :label-width="formLabelWidth" prop="ending">
            <el-input type = 'textarea' rows = '10' v-model="dialogLeftTop1_5_data.ending" auto-complete="off" placeholder="请输入表单结束语"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogLeftTop1_5_cancel('dialogLeftTop1_5_data')">取 消</el-button>
          <el-button type="primary" @click="dialogLeftTop1_5_submit('dialogLeftTop1_5_data',dialogLeftTop1_5_data)">确 定</el-button>
        </div>
      </el-dialog>

 </div>
</template>
<script>
  import myTable from '@/yimiviews/knowledgeManage/followupForm/table'
  import waves from '@/directive/waves/index.js'
  import { theadList1, operationButtons1, dialogLeftTop1_1_data_rules, dialogLeftTopChild1_1_data_rules } from '@/yimiviews/knowledgeManage/followupForm/followupFormConst.js'
  import { getDoctorList, getSurgeryList } from '@/api/appointmentManage/appointmentConfirm'
  // import { pending, getDoctorList, getSurgeryList } from '@/api/appointmentManage/appointmentConfirm'
  export default {
    components: { myTable },
    data() {
      return {
        theadList1,
        operationButtons1,
        dialogLeftTop1_1_data_rules,
        dialogLeftTopChild1_1_data_rules,
        filter: {
          nameTel: '',
          cardNo: '',
          origin: ''
        },
        activePanel: 'pending',
        dialogLeftTop1_1: false,
        dialogLeftTop1_5: false,
        dialogLeftTopChild1_1: false,
        dialogLeftTop1_1_data: {
          formType: '',
          formFacility: '',
          opending: '',
          ending: '',
          code: '',
          name: '',
          description: '',
          createTime: ''
        },
        dialogLeftTop1_5_data: {},
        dialogLeftTop1_1_dialogTitle: '',
        dialogLeftTopChild1_1_dialogTitle: '',
        dialogLeftTopChild1_1_data: {
          title: '',
          type: {
            'text': '单选',
            'el': 'radio'
          },
          options: [
            {
              label: '',
              value: ''
            }
          ],
          remark: '',
          createTime: ''
        },
        dialogLeftTop1_1_data_doctorList: [],
        dialogLeftTop1_1_data_surgeryList: [],
        formLabelWidth: '120px',
        filterContainer: {},
        tableList1: [],
        selectArr: []
      }
    },
    mounted() {
      this.getTableList1()
      this.getDoctorList()
    },
    methods: {
      dialogLeftTop1_1_show() {
        this.dialogLeftTop1_1_data = {}
        this.dialogLeftTop1_1_dialogTitle = '新增表单'
        this.dialogLeftTop1_1 = !this.dialogLeftTop1_1
      },
      getSelectArr(selectArr, row) {
        this.selectArr = selectArr
        if (selectArr.length === 1) {
          this.dialogLeftTop1_1_data = selectArr[0]
        }
      },
      dialogLeftTop1_2_show() {
        if (this.selectArr.length > 1 || this.selectArr.length === 0) {
          this.$message({
            message: '只能选择一条数据进行编辑！',
            type: 'warning',
            duration: 2000
          })
          return
        }
        this.dialogLeftTop1_1_dialogTitle = '编辑表单'
        if (this.selectArr.length === 1) {
          this.dialogLeftTop1_1 = !this.dialogLeftTop1_1
        }
      },
      dialogLeftTop1_4_show() {},
      dialogLeftTop1_5_show() {
        this.dialogLeftTop1_5 = !this.dialogLeftTop1_5
        this.dialogLeftTop1_5_data = this.selectArr[0]
      },
      dialogLeftTopChildTable1_1_show() {
        if (this.selectArr.length > 1 || this.selectArr.length === 0) {
          this.$message({
            message: '请选择一个表单进行添加项目！',
            type: 'warning',
            duration: 2000
          })
          return
        }
        this.dialogLeftTopChild1_1_data = {
          type: {},
          options: []
        }
        this.dialogLeftTopChild1_1_dialogTitle = '新增项目'
        this.dialogLeftTopChild1_1 = !this.dialogLeftTopChild1_1
      },
      operationEvent0(row) {
        this.dialogLeftTop1_1 = !this.dialogLeftTop1_1
        this.dialogLeftTop1_3_data = Object.assign({}, this.dialogLeftTop1_3_data, row)
      },
      operationEvent1(row) {},
      operationEvent2(row) {},
      dialogLeftTop1_1_submit(formName, formData) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$message({
              message: '恭喜你，添加成功！',
              type: 'success',
              duration: 2000
            })
            this.$refs[formName].resetFields()
            this.dialogLeftTop1_1 = false
            // 登记预约 ajax to do
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
      dialogLeftTop1_1_cancel(formName) {
        this.$refs[formName].resetFields()
        this.dialogLeftTop1_1 = false
      },
      dialogLeftTopChild1_1_submit(formData) {
        // 拿到表单 编码  和项目关联 并传给后台
        // const code = this.selectArr[0].code
        this.tableList1.forEach((item) => {
          if (this.selectArr.code === item.code) {
            item.formLists.forEach((subItem) => {
              if (formData.id === subItem.id) {
                subItem = formData
              }
            })
          }
        })
        this.dialogLeftTopChild1_1 = !this.dialogLeftTopChild1_1
      },
      childrenTableEdit(row) {
        this.dialogLeftTopChild1_1_dialogTitle = '编辑项目'
        let a = this.dialogLeftTopChild1_1_data
        a = row
        this.dialogLeftTopChild1_1_data = a
        this.dialogLeftTopChild1_1 = !this.dialogLeftTopChild1_1
      },
      getDoctorList() {
        getDoctorList().then((res) => {
          this.dialogLeftTop1_1_data_doctorList = res.data.data
        })
      },
      getSurgeryList(doctor) {
        getSurgeryList({ doctor: doctor }).then((res) => {
          this.dialogLeftTop1_1_data_surgeryList = res.data.data
        })
      },
      handleFilter() {
        this.getTableList1(this.filter)
      },
      handleClick(tab, event) {},
      getTableList1(listQuery) {
        // pending().then((res) => {
        //   this.listLoading = false
        //   this.tableList1 = res.data.data.result
        // })
        this.tableList1 = [
          {
            'code': '001',
            'formType': '随访表单',
            'formFacility': '普通表单',
            'opending': '您好，我是杭州市第二人民医院的医护人员，为了更好的了解您/您家人的出院健康情况，现在对您做出以下出院随访，请答复以下问题：',
            'ending': '祝您/您家人早日身体康复，谢谢！',
            'name': '术后表单1',
            'isShow': 1,
            'creater': '张三',
            'description': '这是一个调查痔疮手术的随访表',
            'createTime': '2018-03-12',
            'formLists': [
              {
                'id': '0010',
                'pid': '001',
                'isShow': 1,
                'title': '出院后感觉?',
                'type': {
                  'text': '单选',
                  'el': 'radio'
                },
                'feedback': '',
                'options': ['非常好', '很好', '一般'],
                'remark': '没备注',
                'createTime': '2018-03-23',
                'creater': '张三'
              },
              {
                'pid': '001',
                'id': '0011',
                'isShow': 1,
                'title': '您感觉自己睡觉好吗?',
                'type': {
                  'text': '多选',
                  'el': 'checkbox'
                },
                'feedback': [],
                'options': ['非常好', '很好', '一般'],
                'remark': '没备注',
                'createTime': '2018-03-23',
                'creater': '里斯'
              },
              {
                'pid': '001',
                'id': '0012',
                'isShow': 1,
                'title': '您进食情况好吗?',
                'type': {
                  'text': '下拉框',
                  'el': 'select'
                },
                'options': ['非常好', '很好', '一般'],
                'remark': '没备注',
                'createTime': '2018-03-23',
                'creater': '马武'
              }
            ]
          },
          {
            'code': '002',
            'name': '术后表单2',
            'description': '这是一个调查痔疮手术的随访表2',
            'createTime': '2018-03-23',
            'formLists': [
              {
                'title': '出院后感觉?',
                'type': '单选',
                'options': '非常好，很好，一般',
                'remark': '没备注'
              },
              {
                'title': '您感觉自己睡觉好吗?',
                'type': '单选',
                'options': '非常好，很好，一般',
                'remark': '没备注'
              },
              {
                'title': '您进食情况好吗?',
                'type': '单选',
                'options': '非常好，很好，一般',
                'remark': '没备注'
              }
            ]
          }]
      }
    },
    directives: {
      waves
    }
  }
</script>
<style lang="scss">
.wrap {
   .wrapBox{
        height: 100%;
        background-color: #fff;
    }

  .tabPanel{
    padding-top: 10px;
    .el-tabs__header{
      padding-left: 20px;
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
  .dialogLeftTop1_1{
    .el-date-editor{
        width:190px;
      }
  }
  .dialogLeftTop1_2{
    .el-select{
      display: block;
    }
  }
  .dialogLeftTop1_3{
    .box-card{
      background: #eee;
    }
  }
}
</style>
