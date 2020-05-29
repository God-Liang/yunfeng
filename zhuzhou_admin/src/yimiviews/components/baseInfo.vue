<template>
  <div>
    <el-form
      label-width="120px"
      ref="dialogLeftTop1_3_data"
      :inline="true"
      :rules="appointmentConfirmConst.baseInfo_rules"
      :model="dialogLeftTop1_3_data"
      :disabled="disabled"
    >
      <el-form-item label="病人姓名" prop="patientName">
        <el-input
          v-model="dialogLeftTop1_3_data.patientName"
          style="width: 196px"
          auto-complete="off"
          placeholder="请输入姓名"
        ></el-input>
      </el-form-item>
      <el-form-item label="手机号码" prop="phone">
        <el-input
          v-model="dialogLeftTop1_3_data.phone"
          auto-complete="off"
          style="width: 196px"
          placeholder="请输入手机号"
        ></el-input>
      </el-form-item>
      <el-form-item label="身份证号" prop="idCard">
        <el-input
          v-model="dialogLeftTop1_3_data.idCard"
          auto-complete="off"
          style="width: 196px"
          placeholder="请输入身份证"
        ></el-input>
      </el-form-item>
      <el-form-item label="性别" prop="sex">
        <dict-select
          v-model="dialogLeftTop1_3_data.sex"
          placeholder="请选择性别"
          style="width: 196px"
          dict-code="xb"
        ></dict-select>
      </el-form-item>
      <el-form-item label="出生日期" prop="birthday">
        <el-date-picker
          type="date"
          placeholder="选择日期"
          v-model="dialogLeftTop1_3_data.birthday"
          style="width: 196px;"
          value-format="yyyy-MM-dd HH:mm:ss"
          :picker-options="endDatePicker"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="婚姻" prop="marry">
        <dict-select
          v-model="dialogLeftTop1_3_data.marry"
          placeholder="请选择婚姻状况"
          style="width: 196px"
          dict-code="hy"
        ></dict-select>
      </el-form-item>
      <el-form-item label="文化程度" prop="educationalLevel">
        <dict-select
          v-model="dialogLeftTop1_3_data.educationalLevel"
          placeholder="请选择文化程度"
          style="width: 196px"
          dict-code="whcd"
        ></dict-select>
      </el-form-item>
      <el-form-item label="备用电话" prop="backupTel">
        <el-input
          v-model="dialogLeftTop1_3_data.backupTel"
          style="width: 196px"
          auto-complete="off"
          placeholder="请输入备用电话"
        ></el-input>
      </el-form-item>
      <el-form-item label="国籍" prop="nationality">
        <dict-select
          v-model="dialogLeftTop1_3_data.nationality"
          placeholder="请选择国籍"
          :filterable="true"
          style="width: 196px"
          dict-code="nation"
        ></dict-select>
      </el-form-item>
      <el-form-item label="民族" prop="nation">
        <dict-select
          v-model="dialogLeftTop1_3_data.nation"
          placeholder="请选择民族"
          style="width: 196px"
          dict-code="mingzu"
        ></dict-select>
      </el-form-item>
      <!-- <br/> -->
      <el-form-item label="出生地" prop="birthAreaId">
        <el-cascader
          placeholder="试试搜索：地名"
          :options="options"
          filterable
          change-on-select
          v-model="dialogLeftTop1_3_data.birthAreaId"
          style="width: 196px;"
        ></el-cascader>
      </el-form-item>
      <el-form-item label="居住地址" prop="liveAreaId">
        <el-cascader
          placeholder="试试搜索：地名"
          :options="options"
          filterable
          change-on-select
          v-model="dialogLeftTop1_3_data.liveAreaId"
        ></el-cascader>
        <el-input
          v-model="dialogLeftTop1_3_data.liveStreet"
          auto-complete="off"
          placeholder="镇/街道"
          style="width: 196px;"
        ></el-input>
        <el-input
          v-model="dialogLeftTop1_3_data.liveDetailAddr"
          auto-complete="off"
          placeholder="详细地址"
          style="width: 196px;"
        ></el-input>
      </el-form-item>
      <br>
      <el-form-item label="职业" prop="occupation">
        <dict-select
          v-model="dialogLeftTop1_3_data.occupation"
          placeholder="请选择职业"
          style="width: 196px"
          dict-code="zhiye"
        ></dict-select>
      </el-form-item>
      <el-form-item label="单位名称" prop="companyName">
        <el-input
          v-model="dialogLeftTop1_3_data.companyName"
          auto-complete="off"
          style="width: 196px"
          placeholder="请输入单位名称"
        ></el-input>
      </el-form-item>
      <el-form-item label="单位电话" prop="companyTel">
        <el-input
          v-model="dialogLeftTop1_3_data.companyTel"
          auto-complete="off"
          style="width: 196px"
          placeholder="请输入单位电话"
        ></el-input>
      </el-form-item>
      <br>
      <el-form-item label="单位地址" prop="companyAreaId">
        <el-cascader
          placeholder="试试搜索：地名"
          :options="options"
          filterable
          change-on-select
          v-model="dialogLeftTop1_3_data.companyAreaId"
          style="width: 196px;"
        ></el-cascader>
        <el-input
          v-model="dialogLeftTop1_3_data.companyStreet"
          auto-complete="off"
          placeholder="镇/街道"
          style="width: 196px;"
        ></el-input>
        <el-input
          v-model="dialogLeftTop1_3_data.companyDetialAddr"
          auto-complete="off"
          placeholder="详细地址"
          style="width: 196px;"
        ></el-input>
      </el-form-item>
      <br>
      <el-form-item label="联系人" prop="refName">
        <el-input
          v-model="dialogLeftTop1_3_data.refName"
          style="width: 196px"
          auto-complete="off"
          placeholder="请输入联系人"
        ></el-input>
      </el-form-item>
      <el-form-item label="联系电话" prop="refTel">
        <el-input
          v-model="dialogLeftTop1_3_data.refTel"
          style="width: 196px"
          auto-complete="off"
          placeholder="请输入联系电话"
        ></el-input>
      </el-form-item>
      <el-form-item label="关系" prop="refRelation">
        <dict-select
          v-model="dialogLeftTop1_3_data.refRelation"
          placeholder="请选择关系"
          style="width: 196px"
          dict-code="guanxi"
        ></dict-select>
      </el-form-item>
      <el-form-item label="联系人地址" prop="refAreaId">
        <el-cascader
          placeholder="试试搜索：地名"
          :options="options"
          :loading="loadingOptions"
          filterable
          change-on-select
          v-model="dialogLeftTop1_3_data.refAreaId"
          style="width: 196px;"
        ></el-cascader>
        <el-input
          v-model="dialogLeftTop1_3_data.refStreet"
          auto-complete="off"
          placeholder="镇/街道"
          style="width: 196px;"
        ></el-input>
        <el-input
          v-model="dialogLeftTop1_3_data.refDetialAddr"
          auto-complete="off"
          placeholder="详细地址"
          style="width: 196px;"
        ></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { appointmentConfirmConst } from '@/yimiviews/appointmentManage/columnsConst'
import DictSelect from '@/views/form/dictSelect'
import { getAreaList } from '@/api/common/common'

export default {
  components: { DictSelect },
  data() {
    return {
      loading: false,
      loadingOptions: true,
      options: [], // 地址
      appointmentConfirmConst,
      formLabelWidth: '120px',
      endDatePicker: this.endDate()
    }
  },
  props: {
    dialogLeftTop1_3_data: {
      type: Object,
      default: function() {
        return {}
      }
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  mounted() {
    this.getArea()
  },
  methods: {
    submit() {
      let validFlag = false
      this.$refs['dialogLeftTop1_3_data'].validate((valid) => {
        if (valid) {
          validFlag = true
        }
      })
      return validFlag
    },
    endDate() {
      return {
        disabledDate(time) {
          return time.getTime() > Date.now() // 预约手术时间为当前时间之后的时间
        }
      }
    },
    // 地址
    getArea() {
      getAreaList().then((res) => {
        this.options = res.data.list
        this.loadingOptions = false
      })
    }
  }
}
</script>

