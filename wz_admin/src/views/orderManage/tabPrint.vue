<template>
  <div class="app-container">
    <el-container>
      <el-aside width="290px">
        <h3>打印类型选择</h3>
        <div class="typeList">
          <div
            v-for="(item, index) in typeList"
            :key="index"
            :class="isActive === index ? 'typeItem active' : 'typeItem'"
            @click="isActive=index"
          >{{ item }}</div>
        </div>
      </el-aside>
      <el-main>
        <h3>院内码标签打印</h3>
        <el-form
          ref="codeForm"
          :model="codeForm"
          :rules="codeRules"
          label-width="100px"
          class="codeForm"
        >
          <template v-if="isActive === 0">
            <el-form-item label="打印数量:" prop="amount">
              <el-radio-group v-model="codeForm.amount">
                <el-radio label="单张" />
                <el-radio label="多张" />
              </el-radio-group>
            </el-form-item>
            <el-form-item label="生产批号:" prop="batchNum">
              <el-input v-model="codeForm.batchNum" size="small" style="width:250px;" placeholder="请输入生产批号" />
            </el-form-item>
            <el-form-item label="有效期:">
              <el-date-picker
                v-model="codeForm.validity"
                type="date"
                style="width:250px;"
                placeholder="选择日期"
                size="small"
              />
            </el-form-item>
            <el-form-item label="序列号SN:" prop="serialNum">
              <el-input v-model="codeForm.serialNum" size="small" style="width:250px;" placeholder="请输入序列号SN" />
            </el-form-item>
            <el-form-item label="打印纸张:" prop="sheet">
              <el-radio-group v-model="codeForm.sheet">
                <el-radio label="A4" />
                <el-radio label="标签纸" />
              </el-radio-group>
            </el-form-item>
          </template>
          <template v-else-if="isActive === 1">
            <el-form-item label="打印数量:" prop="amount">
              <el-radio-group v-model="codeForm.amount">
                <el-radio label="单张" />
                <el-radio label="多张" />
              </el-radio-group>
            </el-form-item>
            <el-form-item label="物资名称:" prop="batchNum">
              <el-input v-model="codeForm.batchNum" size="small" style="width:250px;" placeholder="请输入物资名称" />
            </el-form-item>
            <el-form-item label="规格型号:" prop="batchNum">
              <el-input v-model="codeForm.batchNum" size="small" style="width:250px;" placeholder="请输入规格型号" />
            </el-form-item>
            <el-form-item label="供应商:" prop="batchNum">
              <el-input v-model="codeForm.batchNum" size="small" style="width:250px;" placeholder="请输入供应商" />
            </el-form-item>
            <el-form-item label="生产厂家:" prop="batchNum">
              <el-input v-model="codeForm.batchNum" size="small" style="width:250px;" placeholder="请输入生产厂家" />
            </el-form-item>
            <el-form-item label="产品码:" prop="batchNum">
              <el-input v-model="codeForm.batchNum" size="small" style="width:250px;" placeholder="请输入产品码" />
            </el-form-item>
            <el-form-item label="生产批号:" prop="batchNum">
              <el-input v-model="codeForm.batchNum" size="small" style="width:250px;" placeholder="请输入生产批号" />
            </el-form-item>
            <el-form-item label="有效期:">
              <el-date-picker
                v-model="codeForm.validity"
                type="date"
                size="small"
                placeholder="选择日期"
                style="width:250px;"
              />
            </el-form-item>
            <el-form-item label="序列号SN:" prop="serialNum">
              <el-input v-model="codeForm.serialNum" size="small" style="width:250px;" placeholder="请输入序列号SN" />
            </el-form-item>
            <el-form-item label="打印纸张:" prop="sheet">
              <el-radio-group v-model="codeForm.sheet">
                <el-radio label="A4" />
                <el-radio label="标签纸" />
              </el-radio-group>
            </el-form-item>
          </template>
          <template v-else>
            <el-form-item label="打印纸张:" prop="sheet">
              <el-radio-group v-model="codeForm.sheet">
                <el-radio label="A4" />
                <el-radio label="标签纸" />
              </el-radio-group>
            </el-form-item>
            <el-form-item label="院内码" prop="hospitalCode">
              <el-input
                v-model="codeForm.hospitalCode"
                type="textarea"
                class="hospitalCode"
                style="width:250px;"
                size="small"
                placeholder="每行一个院内码，最多112个"
              />
            </el-form-item>
            <el-form-item label>
              <span>推荐使用80MM*50MM标签纸进行打印</span>
            </el-form-item>
          </template>
          <el-form-item>
            <el-button type="primary" size="small" @click="barCode">打印条码</el-button>
            <el-button size="small" @click="codePrint">打印二维码</el-button>
          </el-form-item>
        </el-form>
      </el-main>
    </el-container>
  </div>
</template>
<script>
export default {
  data() {
    return {
      typeList: ['副码打印', '主副码打印', '院内标签打印'],
      isActive: 0,
      codeForm: {},
      codeRules: {}
    }
  },
  mounted() {

  },
  methods: {
    barCode() {

    },
    codePrint() {

    }
  }
}
</script>
<style lang="scss" scoped>
.el-container {
  min-height: calc(100vh - 124px);
  .el-aside {
    border-right: 1px dashed #e9e9e9;
    padding: 0 20px;
    margin-bottom: 0;
    h3 {
      margin: 0;
      height: 30px;
      line-height: 30px;
      border-bottom: 1px solid #bebebe;
      font-size: 12px;
    }
    .typeList {
      .typeItem {
        height: 40px;
        line-height: 40px;
        font-size: 14px;
        border-bottom: 1px solid #e8e8e8;
        padding-left: 10px;
        cursor: pointer;
        &.active {
          background-color: #f5f7fa;
        }
      }
    }
  }
  .el-main {
    padding: 0 20px;
    h3 {
      margin: 0;
      height: 30px;
      line-height: 30px;
      border-bottom: 1px solid #bebebe;
      font-size: 12px;
    }
    .codeForm {
      margin-top: 40px;
    }
  }
}
</style>
<style lang="scss">
.hospitalCode {
  textarea {
    height: 80px;
    resize: none;
  }
}
</style>

