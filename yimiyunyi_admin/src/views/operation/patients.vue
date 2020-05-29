<template lang="pug">
  .lg-container
    lgExhibition(:exhibitionData="exhibitionData")
    .lg-container-white
      .filter-container
        el-radio-group.filter-item(v-model="filters.type" @change="change")
          el-radio-button(label="") 全部
          el-radio-button(label="0") 未完善
          el-radio-button(label="1") 已完善
        .filter-item
          el-date-picker.filter-item(v-model="filters.patientCreateTime" value-format="yyyy-MM-dd HH:mm:ss" type="date" placeholder="关注团队时间" @change="handleFilter")
          el-input.filter-item.w250(v-model="filters.keyWord" suffix-icon="el-icon-search" placeholder="请输入提交人账号/昵称/内容" @keyup.enter.native="handleFilter")

      lgTable(columns-type="index"
            style="height:calc(100% - 55px)"
            columns-label="序号"
            :list="list"
            :total-list="total"
            :lg-thead="patientsConst.tableAttr.thead"
            :lg-buttons="patientsConst.tableAttr.buttons"
            @operationEvent0="operationEvent0"
            @initListQuery="initListQuery"
            @getListByPagination="getListByPagination")
      lgDialog(title="完善信息"
        :visible="dialogFormVisible"
        width="600px"
        :show-form="true"
        form-ref="dataForm"
        :form-rules="rules"
        label-width="120px"
        :value="templateForm"
        @on-submit="onSubmit"
        @on-close="onClose")
        template(slot="form")
          .patientsInfo
            .patientsInfo_box.h30
              .patientsInfo_box_name.mr20 {{templateForm.name}}
              .patientsInfo_box_sex.mr20 {{templateForm.sexShow}}
              .patientsInfo_box_age.mr20 {{templateForm.birthday | getAge}}岁
              .patientsInfo_box_phone {{templateForm.phone}}
            .patientsInfo_box
              .patientsInfo_box_site 家庭住址：{{templateForm.address}}
          el-form-item(label="手术名称：" prop="operationName")
            el-select(v-model="templateForm.operationName" filterable remote reserve-keyword :remote-method="remoteMethod" :loading="loading" placeholder="请输入关键词搜索" style="width: 220px;")
              el-option(v-for="item in operationList" :key="item.id" :label="item.name" :value="item.name")
          el-form-item(label="住院日期：" prop="inHospital")
            el-date-picker(v-model="templateForm.inHospital" :picker-options="startDatePicker" value-format="yyyy-MM-dd HH:mm:ss" type="date" placeholder="选择日期")
          el-form-item(label="离院日期：" prop="outHospital")
            el-date-picker(v-model="templateForm.outHospital" :picker-options="endDatePicker" value-format="yyyy-MM-dd HH:mm:ss" type="date" placeholder="选择日期")
</template>
<script>
import { patientsConst } from './columnsConst'
import lgTable from '@/views/components/lgTable'
import lgDialog from '@/views/components/lgDialog'
import lgExhibition from '@/views/components/lgExhibition'
import { list, statistics, read } from '@/api/common'
import { consummate } from '@/api/patient'
import { getOperationList } from '@/api/system'
export default {
  name: 'ComponentName',
  components: { lgTable, lgDialog, lgExhibition },
  data() {
    return {
      patientsConst,
      apiUrl: 'AdminPatient',
      num: {},
      list: [],
      total: 0,
      filters: {
        verifyStatus: '',
        keyWord: '',
        patientCreateTime: '',
        type: ''
      },
      listQuery: {
        current: 1,
        pageSize: 10
      },
      dialogFormVisible: false,
      templateForm: {
        id: null,
        operationName: '',
        inHospital: '',
        outHospital: ''
      },
      rules: {
        operationName: [{ required: true, message: '手术名称不能为空！', trigger: 'blur' }],
        inHospital: [{ required: true, message: '住院日期不能为空！', trigger: 'change' }],
        outHospital: [{ required: true, message: '离院日期不能为空！', trigger: 'change' }]
      },
      loading: false,
      exhibitionData: [],
      operationList: [],
      startDatePicker: this.beginDate(),
      endDatePicker: this.processDate()
    }
  },
  mounted() {
    this.getStatistics()
    this.remoteMethod('')
    this.getList()
  },
  methods: {
    beginDate() {
      const _this = this
      return {
        disabledDate(time) {
          if (_this.templateForm.outHospital) {
            return new Date(_this.templateForm.outHospital).getTime() < time.getTime()
          } else {
            return time.getTime() > Date.now() // 开始时间不选时，结束时间最大值小于等于当天
          }
        }
      }
    },
    // 提出结束时间必须大于提出开始时间
    processDate() {
      const _this = this
      return {
        disabledDate(time) {
          if (_this.templateForm.inHospital) {
            return new Date(_this.templateForm.inHospital).getTime() > time.getTime()
          } else {
            return time.getTime() > Date.now() // 开始时间不选时，结束时间最大值小于等于当天
          }
        }
      }
    },
    remoteMethod(query) {
      this.loading = true
      getOperationList(query).then(res => {
        this.operationList = res.list
        setTimeout(() => {
          this.loading = false
        }, 200)
      })
    },
    getStatistics() {
      statistics(this.apiUrl).then((res) => {
        if (res.code === 200) {
          this.exhibitionData = [{
            ratio: 24,
            img: require('@/assets/img/s_1.png'),
            num: res.info,
            unit: '个',
            title: '新病人'
          }]
        }
      })
    },
    getList() {
      const params = Object.assign({}, this.listQuery, this.filters)
      list(this.apiUrl, params).then((res) => {
        if (res.code === 200) {
          this.list = res.list
          this.total = res.total
        }
      })
    },
    change() {
      this.getList()
    },
    handleFilter() {
      this.getList()
    },
    // 初始化页数与条数
    initListQuery(listQuery) {
      this.listQuery = listQuery
    },
    // 分页操作
    getListByPagination(listQuery) {
      this.listQuery = listQuery
      this.getList()
    },
    operationEvent0(row) {
      this.templateForm = Object.assign({}, row)
      if (row.casesId) {
        read('patientCases', row.casesId).then(res => {
          this.$set(this.templateForm, 'inHospital', res.info.inHospital)
          this.$set(this.templateForm, 'outHospital', res.info.outHospital)
          this.dialogFormVisible = true
        })
      } else {
        this.dialogFormVisible = true
      }
    },
    handleCreateOrUpdate() { },
    // 关闭弹窗
    onClose() {
      this.dialogFormVisible = false
    },
    onSubmit() {
      const data = {
        id: this.templateForm.casesId,
        patientId: this.templateForm.id,
        operationName: this.templateForm.operationName,
        inHospital: this.templateForm.inHospital,
        outHospital: this.templateForm.outHospital
      }
      consummate(data).then(res => {
        if (res.code === 200) {
          this.getList()
          this.dialogFormVisible = false
          this.$notify({
            title: '成功',
            message: '完善信息',
            type: 'success',
            duration: 2000
          })
        }
      })
    }
  }
}
</script>
<style lang="scss">
  .patientsInfo {
    padding: 0 36px 5px;
    margin-bottom: 30px;
    border-bottom: 1px solid #DCDCDC;
    .patientsInfo_box {
      display: flex;
      align-items: flex-end;
      margin-bottom: 20px;
      color: #333333;
      font-size: 14px;
      .h30 {
        height: 30px;
      }
      &_name {
        font-size: 24px;
      }
      .mr20 {
        margin-right: 20px;
      }
    }
  }
</style>
<style lang="scss" scoped>
@import "@/styles/mixin.scss";

.lg-container-white {
  margin-top: 20px;
  height: calc(100% - 140px);
  .filter-container {
    display: flex;
    justify-content: space-between;
    .w400 {
      width: 400px;
      margin-left: 20px;
    }
  }
}
/deep/ .el-dialog__body {
  border-top: 1px solid #e4e4e4;
}
.topInfo {
  display: flex;
  justify-content: flex-start;
  img {
    display: block;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: #e4e4e4;
    margin-right: 20px;
  }
  .info {
    width: 900px;
    .name {
      font-size: 20px;
      font-weight: bold;
      span {
        font-size: 16px;
        color: #888;
        padding-left: 10px;
        font-weight: normal;
      }
    }
    ul {
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      font-size: 16px;
      color: #888;
      margin-top: 10px;
      margin-bottom: 50px;
      li {
        display: flex;
        justify-content: flex-start;
        margin: 5px 0;
        height: 24px;
        line-height: 24px;
        .label {
          width: 80px;
          text-align: justify;
          display: inline-block;
          vertical-align: top;
          &::after {
            display: inline-block;
            width: 100%;
            content: "";
            height: 0;
          }
        }
        .value {
          width: 220px;
          @include ellipsis(1);
        }
      }
    }
  }
}
.cers {
  margin-bottom: 40px;
  display: flex;
  justify-content: space-around;
  li {
    .tit {
      position: relative;
      line-height: 20px;
      padding-left: 10px;
      margin-bottom: 20px;
      &::after {
        position: absolute;
        left: 0;
        top: 0;
        display: block;
        content: "";
        width: 2px;
        height: 20px;
        background: #14b0b2;
      }
    }
    img {
      width: 180px;
      height: 180px;
      background: #e4e4e4;
      border-radius: 5px;
      object-fit: cover;
    }
    .imgNull {
      width: 180px;
      height: 180px;
      background: #e4e4e4;
      border-radius: 5px;
    }
  }
}
.btns {
  text-align: right;
}
</style>
