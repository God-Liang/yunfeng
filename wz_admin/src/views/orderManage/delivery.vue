<template>
  <div class="app-container">
    <div class="delivery-container">
      <h3>发货信息</h3>
      <el-form
        ref="deliveryForm"
        :model="deliveryForm"
        :rules="deliveryRules"
        label-width="100px"
        class="deliveryForm-ruleForm"
      >
        <el-form-item label="总代商：" prop="generation">
          <el-select v-model="deliveryForm.generation" size="small" placeholder>
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="客户名称：" prop="generation">
          <el-select v-model="deliveryForm.generation" size="small" placeholder>
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="接收科室：" prop="generation">
          <el-select v-model="deliveryForm.generation" size="small" placeholder>
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="发货人：">
          <span>供应商</span>
        </el-form-item>
        <el-form-item label="收货人：" prop="consignee">
          <el-input v-model="deliveryForm.consignee" size="small" />
        </el-form-item>
        <el-form-item label="联系电话：" prop="phone">
          <el-input v-model="deliveryForm.phone" size="small" />
        </el-form-item>
        <el-form-item class="remark" label="发货备注：" prop="remark">
          <el-input v-model="deliveryForm.remark" type="textarea" size="small" />
        </el-form-item>
      </el-form>
    </div>
    <i class="septal-line" />
    <div class="delivery-container">
      <h3>发货明细</h3>
      <div :class="isFullScreen === 1 ? 'detail-container fullScreen' : 'detail-container'">
        <div class="detailBox">
          <el-input v-model="deliveryForm.barCode" class="barCode" />
          <el-button size="small" @click="fullScreenClick">{{ operations[isFullScreen] }}</el-button>
        </div>
        <!--主列表模块-->
        <lgTable
          :id="isFullScreen === 1 ? 'fullScreenTabel' : ''"
          columns-type="index"
          columns-label="序号"
          :list="list"
          :total-list="total"
          :lg-thead="deliveryAttr.thead"
          :lg-buttons="deliveryAttr.buttons"
          @initListQuery="initListQuery"
          @getListByPagination="getListByPagination"
        />
        <div :class="isFullScreen === 1 ? 'operationBox fullScreenOperation' : 'operationBox'">
          <p>
            配送金额共计：
            <i>￥0.00</i>
          </p>
          <div class="operationBtn">
            <el-button type="primary" size="small" :disabled="isAllow ? '' : 'disabled'">发货</el-button>
            <el-button type="primary" size="small" :disabled="isAllow ? '' : 'disabled'">暂存</el-button>
            <el-button type="text">重置</el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import lgTable from '@/views/components/lgTable'
import { list } from '@/api/common'
export default {
  components: { lgTable },
  data() {
    return {
      apiUri: 'user',
      list: [],
      total: 0,
      listQuery: {
        current: 1,
        pageSize: 10
      },
      deliveryAttr: {
        thead: [
          {
            label: 'name',
            text: '用户名',
            width: 100
          },
          {
            label: 'nick',
            text: '名字'
          },
          {
            label: 'sex',
            text: '性别'
          },
          {
            label: 'createName',
            text: '创建人'
          },
          {
            label: 'createTime',
            text: '创建时间',
            width: 200
          },
          {
            label: 'status',
            text: '状态'
          }
        ],
        buttons: {
          status: true, // 是否区分操作状态 true：根据当前列的数据状态值使用operation[状态值]; false：使用operation[0]
          width: 300, // 表格操作列的宽度
          operation: { // 操作按钮配置
            0: [{
              name: 'editor',
              text: '编辑',
              id: 0,
              type: 'primary'
            },
            {
              name: 'enable',
              text: '启用',
              id: 1,
              type: 'success'
            },
            {
              name: 'delete',
              text: '删除',
              id: 3,
              type: 'danger'
            }],
            1: [{
              name: 'editor',
              text: '编辑',
              id: 0,
              type: 'primary'
            }, {
              name: 'disable',
              text: '禁用',
              id: 2,
              type: ''
            },
            {
              name: 'delete',
              text: '删除',
              id: 3,
              type: 'danger'
            }]
          }
        }
      },
      options: [{
        value: '选项1',
        label: '自供'
      }, {
        value: '选项2',
        label: '双皮奶'
      }],
      deliveryForm: {
        generation: null,
        consignee: '',
        phone: '',
        barCode: ''
      },
      deliveryRules: {
        generation: [{ required: true, message: '请选择总代商', trigger: 'change' }]
      },
      isAllow: false,
      isFullScreen: 0,
      operations: ['全屏操作', '退出全屏']
    }
  },
  mounted() {
    // this.getList()
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
      this.listQuery.page = 1
      this.getList()
    },
    // 获取列表
    getList() {
      const params = Object.assign({}, this.listQuery)
      list(this.apiUri, params).then(res => {
        if (res.code === 200) {
          this.list = res.list
          this.total = res.total
        }
      })
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    fullScreenClick() {
      this.isFullScreen = this.isFullScreen === 0 ? 1 : 0
    }
  }
}
</script>
<style lang="scss">
.delivery-container {
  h3 {
    margin: 0 0 30px;
    font-size: 18px;
    color: #333333;
    &::before {
      content: "";
      display: inline-block;
      width: 4px;
      background-color: #42b983;
      margin-right: 10px;
      margin-bottom: 3px;
      height: 22px;
      vertical-align: middle;
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
      .barCode {
        input {
          font-size: 18px;
          font-weight: bold;
          height: 50px;
          width: 400px;
          color: #000;
          background: url("../../assets/barCode.png") repeat-x 0 0 !important;
          &:focus {
            background: none !important;
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
#fullScreenTabel {
  max-height: calc(100vh - 210px);
  overflow: auto;
}
.septal-line {
  display: block;
  width: 100%;
  border-bottom: 1px dashed #eeeeee;
  margin: 10px 0 30px;
}
.deliveryForm-ruleForm {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  .el-form-item {
    width: 33%;
    &.remark {
      width: 100%;
      textarea {
        height: 80px;
        resize: none;
      }
    }
    .el-form-item__label {
      font-weight: normal;
    }
    .el-select {
      width: 100%;
    }
  }
}
</style>
