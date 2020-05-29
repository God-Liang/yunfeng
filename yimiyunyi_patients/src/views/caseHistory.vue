<template lang="pug">
  .lg-container(v-wechat-title="title")
    CellGroup
      Field.h40.required(v-model="caseInfo.visitTypeShow" @click="onVisitType" label="就诊类型" input-align="right" right-icon="arrow" readonly placeholder="请选择")
      Field.h40.required(v-model="caseInfo.visitTime" @click="isVisitTimeShow=true" label="就诊时间" input-align="right" right-icon="arrow" readonly placeholder="请选择")
      Field.h40.required(v-model="caseInfo.hospitalName" @click="isHospitalShow=true" readonly label="医院名称" input-align="right" right-icon="arrow" placeholder="请选择")
      Field.h40.required(v-model="caseInfo.departmentName" @click="isDepartmentShow=true" label="就诊科室" input-align="right" right-icon="arrow" readonly placeholder="请选择")
      Field.h40.required.pr24(v-model="caseInfo.admissionNumber" label="住院号" input-align="right" placeholder="请输入住院号")
      Field.h40.pr24(v-model="caseInfo.visitCard" label="就诊卡号" input-align="right" placeholder="请输入就诊卡号")
      Field.h40(v-model="caseInfo.operationDate" @click="isOperationDateShow=true" label="手术日期" input-align="right" right-icon="arrow" readonly placeholder="请选择")
      Field.h40.pr24(v-model="caseInfo.operationName" label="手术名称" input-align="right" placeholder="请输入手术名称")
      Field.h40.pr24(v-model="caseInfo.remark" label="备注信息" input-align="right" placeholder="请输入备注信息")
    .case-container
      .case-container-head 上传检查单/CT/病历/处方/药品等
      .case-container-files
        .file-list
          .file-item(v-for="(item, index) in caseInfo.accessoryUrl" :key="index" @click="onPreview(index)")
            img.deleteFile(src="@/assets/team/delete.png" @click.stop="onDelete(index)")
            img.caseFile(:src="item")
          Uploader.uploadStyle(:before-read="beforeRead" :after-read="afterRead" :preview-image="false" :multiple="true")
    p.lg-hint 依米云医确保您的隐私
    Button.lg-save-btn(type="primary" @click="onSave" color="#03A9AC") 保存
    lg-picker(:isShow="showPicker" :defaultIndex="defaultIndex" :columns="columns" @cancel="onCancel" @confirm="onConfirm")
    lg-datetime-picker(v-model="caseInfo.visitTime" :isShow="isVisitTimeShow" @confirm="onVisitTimeConfirm" @cancel="isVisitTimeShow=false")
    lg-datetime-picker(v-model="caseInfo.operationDate" :isShow="isOperationDateShow" @confirm="onOperationDateConfirm" @cancel="isOperationDateShow=false")
    lgFilterSelect(v-model="caseInfo.hospitalName" :isShow="isHospitalShow" :list="hospitalList" @cancel="onHospitalCancel" @filter="onInputFilter" @confirm="onHospitalConfirm")
    lgCascader(v-model="caseInfo.departmentName" :isShow="isDepartmentShow" :list="departmentList" :prop="prop" @cancel="onDepartmentCancel" @confirm="onDepartmentConfirm")
</template>
<script>
import { Field, CellGroup, Button, Uploader, Toast, ImagePreview } from 'vant'
import lgFilterSelect from '@/components/lgFilterSelect'
import lgCascader from '@/components/lgCascader'
import Dictionary from '@/mixins/dictionary'
import { getHospitalList, getDepartmentList, myCreateMedicalRecord, myUpdateMedicalRecord, getMedicalRecord } from '@/api/info'
export default {
  components: { Field, CellGroup, Button, Uploader, lgFilterSelect, lgCascader },
  mixins: [Dictionary],
  data () {
    return {
      title: '新增病历',
      caseInfo: {
        id: null,
        patientId: null, // 患者ID
        visitType: null, // 就诊类型
        visitTypeShow: '',
        visitTime: '', // 就诊时间
        hospitalName: '', // 医院名称
        departmentName: '', // 就诊科室
        admissionNumber: '', // 住院号
        visitCard: '', // 就诊卡号
        operationDate: '', // 手术日期
        operationName: '', // 手术名称
        remark: '', // 备注信息
        accessoryUrl: []// 上传检查单/CT/病历/处方/药品等
      },
      hospitalList: [],
      // 选择器
      showPicker: false,
      defaultIndex: 0,
      columns: [{
        text: '手术',
        value: 0
      },
      {
        text: '初诊',
        value: 1
      },
      {
        text: '复诊',
        value: 2
      },
      {
        text: '体检',
        value: 3
      }],
      // 就诊时间
      isVisitTimeShow: false,
      // 手术日期
      isOperationDateShow: false,
      // 医院
      isHospitalShow: false,
      keyWord: '',
      // 科室
      isDepartmentShow: false,
      departmentList: [],
      prop: {
        label: 'label',
        value: 'name',
        children: 'hospitalDepartmentList'
      }
    }
  },
  mounted () {
    if (this.$route.query.id) {
      this.title = '修改病历'
      this.caseInfo.id = this.$route.query.id
      this.getMedicalRecord()
    } else {
      this.caseInfo.patientId = this.$route.query.patientId
    }
    this.getHospitalList()
    this.getDepartmentList()
  },
  methods: {
    getMedicalRecord () {
      getMedicalRecord(this.caseInfo.id).then(res => {
        if (res.code === 200) {
          for (const key in this.caseInfo) {
            if (res.info.hasOwnProperty(key)) {
              this.caseInfo[key] = res.info[key]
            }
          }
          this.caseInfo.visitTypeShow = this.columns.filter(e => e.value === this.caseInfo.visitType)[0].text
          this.caseInfo.accessoryUrl = this.caseInfo.accessoryUrl ? this.caseInfo.accessoryUrl.split(',') : []
        } else {
          Toast.fail(res.msg)
        }
      })
    },
    // 上传前校验
    beforeRead (file) {
      let tage = true
      if (file.length && file.length >= 2) {
        file.map(v => {
          if (v.size / 1024 / 1024 > 20) {
            tage = false
            Toast('单个文件大小不能超过 20MB!')
          }
        })
      } else {
        if (file.size / 1024 / 1024 > 20) {
          tage = false
          Toast('单个文件大小不能超过 20MB!')
        }
      }
      return tage
    },
    // 上传病历
    afterRead (file) {
      this.uploadProcess(file, res => {
        this.caseInfo.accessoryUrl = [...this.caseInfo.accessoryUrl, ...res]
      })
    },
    // 保存
    onSave () {
      console.log(this.caseInfo)
      const fromData = Object.assign({}, this.caseInfo)
      const rules = [
        { name: 'visitTypeShow', type: 'required', errmsg: '请选择就诊类型' },
        { name: 'visitTime', type: 'required', errmsg: '请选择就诊时间' },
        { name: 'hospitalName', type: 'required', errmsg: '请选择医院名称' },
        { name: 'departmentName', type: 'required', errmsg: '请选择就诊科室' },
        { name: 'admissionNumber', type: 'required', errmsg: '请输入住院号' }
      ]
      const validateResult = this.$validate.validate(this.caseInfo, rules)
      if (!validateResult.isOk) {
        Toast(validateResult.errmsg)
        return false
      }
      Toast.loading({
        message: '加载中...',
        forbidClick: true
      })
      fromData.visitType = this.columns.filter(e => e.text === fromData.visitTypeShow)[0].value
      fromData.admissionNumber = Number(fromData.admissionNumber)
      fromData.accessoryUrl = fromData.accessoryUrl.length > 0 ? fromData.accessoryUrl.join(',') : ''
      if (fromData.id) {
        myUpdateMedicalRecord(fromData).then(res => {
          if (res.code === 200) {
            setTimeout(() => {
              Toast.clear()
              this.$router.push('/healthRecords?id=' + fromData.patientId)
            }, 200)
          } else {
            Toast.fail(res.msg)
          }
        })
      } else {
        myCreateMedicalRecord(fromData).then(res => {
          if (res.code === 200) {
            setTimeout(() => {
              Toast.clear()
              const isHeadlth = this.$route.query.isHeadlth
              if (isHeadlth) {
                this.$router.push('/healthRecords?id=' + fromData.patientId)
              } else {
                this.$router.push('/myDoctor?id=' + fromData.patientId)
              }
            }, 200)
          } else {
            Toast.fail(res.msg)
          }
        })
      }
    },
    // 删除
    onDelete (i) {
      this.caseInfo.accessoryUrl.splice(i, 1)
    },
    // 选择器取消
    onCancel () {
      this.showPicker = false
      // 还原默认
      this.defaultIndex = 0
    },
    // 选择器保存
    onConfirm (value) {
      this.showPicker = false
      this.caseInfo.visitTypeShow = value
      // 还原默认
      this.defaultIndex = 0
    },
    // 就诊时间
    onVisitTimeConfirm (val) {
      this.caseInfo.visitTime = this.parseTime(val, '{y}-{m}-{d}')
      this.isVisitTimeShow = false
    },
    // 手术时间
    onOperationDateConfirm (val) {
      this.caseInfo.operationDate = this.parseTime(val, '{y}-{m}-{d}')
      this.isOperationDateShow = false
    },
    getDefaultIndex () {
      if (this.caseInfo.visitTypeShow) {
        this.columns.map((v, i) => {
          if (v.text === this.caseInfo.visitTypeShow) {
            this.defaultIndex = i
          }
        })
      } else {
        this.defaultIndex = 0
      }
    },
    // 就诊类型
    onVisitType () {
      this.getDefaultIndex()
      this.showPicker = true
    },
    onHospitalCancel () {
      this.isHospitalShow = false
    },
    onHospitalConfirm (val, data) {
      this.isHospitalShow = false
      this.caseInfo.hospitalName = val
    },
    onInputFilter (val) {
      this.keyWord = val
      this.getHospitalList()
    },
    // 获取医院
    getHospitalList () {
      const data = {
        keyWord: this.keyWord
      }
      getHospitalList(data).then(res => {
        if (res.code === 200) {
          this.hospitalList = res.list
        } else {
          Toast.fail(res.msg)
        }
      })
    },
    // 获取科室
    getDepartmentList () {
      getDepartmentList().then(res => {
        console.log(res)
        if (res.code === 200) {
          this.departmentList = res.info
        } else {
          Toast.fail(res.msg)
        }
      })
    },
    onDepartmentConfirm (val) {
      this.caseInfo.departmentName = val
      this.isDepartmentShow = false
    },
    onDepartmentCancel () {
      this.isDepartmentShow = false
    },
    // 查看病历图片
    onPreview (index) {
      ImagePreview({
        images: this.caseInfo.accessoryUrl,
        startPosition: index
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.lg-container {
  .case-container {
    padding: 0 20px 5px;
    box-sizing: border-box;
    background-color: #fff;
    &-head {
      color: #333333;
      font-size: 12px;
      line-height: 40px;
    }
    &-files {
      width: 100%;
      .file-list {
        display: flex;
        flex-wrap: wrap;
        .file-item {
          width: 70px;
          height: 70px;
          margin: 0 15px 15px 0;
          border: 1px dashed #ebedf0;
          box-sizing: border-box;
          position: relative;
          &:nth-child(4n) {
            margin: 0 0 15px 0;
          }
          .deleteFile {
            position: absolute;
            width: 15px;
            height: 15px;
            right: -6px;
            top: -6px
          }
          .caseFile {
            width: 100%;
            height: 100%;
          }
        }
      }
    }
  }
  .lg-hint {
    color: #BCBCBC;
    font-size: 12px;
    text-align: center;
    margin: 14px 0 29px;
  }
}
</style>
