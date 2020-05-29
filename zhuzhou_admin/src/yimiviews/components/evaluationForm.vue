<template>
  <div class="evaluationForm">
    <table border="1" bordercolor="#eee" style="border-collapse:collapse;">
      <thead>
        <tr>
          <td>评估项</td>
          <td>评估标准</td>
          <td>得分</td>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>出血</td>
          <td style="text-align: left; padding-left: 30px;">
            <el-radio-group v-model="radioGroup.radio1" :disabled="disabled" @change="assessChange">
              <el-radio :label="2">轻度，无需换药</el-radio>
              <el-radio :label="1">中度，需要换药2-3次</el-radio>
              <el-radio :label="0">重度，需要换药3次以上</el-radio>
            </el-radio-group>
          </td>
          <td>{{radioGroup.radio1}}</td>
        </tr>
        <tr>
          <td>恶心呕吐</td>
          <td style="text-align: left; padding-left: 30px;">
            <el-radio-group v-model="radioGroup.radio2" :disabled="disabled" @change="assessChange">
              <el-radio :label="2">轻度，口服药可以控制</el-radio>
              <el-radio :label="1">中度，注射药剂可以控制</el-radio>
              <el-radio :label="0">重度，需要反复用药</el-radio>
            </el-radio-group>
          </td>
          <td>{{radioGroup.radio2}}</td>
        </tr>
        <tr>
          <td>活动能力</td>
          <td style="text-align: left; padding-left: 30px;">
            <el-radio-group v-model="radioGroup.radio3" :disabled="disabled" @change="assessChange">
              <el-radio :label="2">步态平稳（与入院前）</el-radio>
              <el-radio :label="1">需要帮助</el-radio>
              <el-radio :label="0">不能走动</el-radio>
            </el-radio-group>
          </td>
          <td>{{radioGroup.radio3}}</td>
        </tr>
        <tr>
          <td>疼痛耐受</td>
          <td style="text-align: left; padding-left: 30px;">
            <el-radio-group v-model="radioGroup.radio4" :disabled="disabled" @change="assessChange">
              <el-radio :label="2">轻度，口服药可以控制</el-radio>
              <el-radio :label="1">中度，注射药剂可以控制</el-radio>
              <el-radio :label="0">重度，需要反复用药</el-radio>
            </el-radio-group>
          </td>
          <td>{{radioGroup.radio4}}</td>
        </tr>
        <tr>
          <td>血压</td>
          <td style="text-align: left; padding-left: 30px;">
            <el-radio-group v-model="radioGroup.radio5" :disabled="disabled" @change="assessChange">
              <el-radio :label="2">轻度，口服药可以控制</el-radio>
              <el-radio :label="1">中度，中度，注射药剂可以控制</el-radio>
              <el-radio :label="0">重度，需要反复用药</el-radio>
            </el-radio-group>
          </td>
          <td>{{radioGroup.radio5}}</td>
        </tr>
        <tr>
          <td>总评分</td>
          <td style="text-align: left; padding-left: 30px;">
            <el-radio-group v-model="isPass" :disabled="disabled" @change="assessChange">
              <el-radio :label="1">通过</el-radio>
              <el-radio :label="0">不通过</el-radio>
            </el-radio-group>
          </td>
          <td>{{radioGroup.radio6}}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
export default {
  props: {
    disabled: {
      type: Boolean,
      default: false
    },
    radioGroup: {
      type: Object,
      default: {}
    }
  },
  data() {
    return {
      appointmentInfo: {},
      appointment: {},
      isPass: 0
    }
  },
  methods: {
    assessChange(val) {
      this.radioGroup.radio6 = this.radioGroup.radio1 + this.radioGroup.radio2 + this.radioGroup.radio3 + this.radioGroup.radio4 + this.radioGroup.radio5
      this.isPass = this.radioGroup.radio6 < 8 ? 0 : 1
    }
  },
  watch: {
    radioGroup(val, oldVal) {
      this.isPass = this.radioGroup.radio6 < 8 ? 0 : 1
    }
  }
}
</script>
<style lang="scss">
.evaluationForm {
  table {
    width: 100%;
    text-align: center;
    thead {
      background: #f0f2f5;
    }
    td {
      height: 36px;
      & > input {
        width: 100%;
        height: 100%;
        border: 0;
        outline: 0;
      }
    }
  }
}
</style>
