<template>
  <div class="infomationCheck">
    <div slot="footer" class="dialog-footer clearfix">
      <div style="float: left; line-height: 32px;padding-left: 12px;">
          核对详情
        <span style="color: #999;font-size:12px;">对预约病人进行术前信息核对</span>
      </div>
    </div>
    <div class="scrollWrap" ref="scrollWrap">
      <div class="appointmentInfoBox">
        <div class="box">
          <appointment-info :appointmentMessaage="appointmentMessaage"></appointment-info>
        </div>
      </div>
      <div class="dataCheckBox margin20">
        <div class="box">
          <h3>资料核对</h3>
          <data-check :disabled="true" :dataList="dialogLeftTop1_3_data.dataList"></data-check>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import appointmentInfo from '@/yimiviews/components/appointmentInfo'
import dataCheck from '@/yimiviews/components/dataCheck'
import { read } from '@/api/appointmentManage/appointmentConfirm'
import { saveCheck, readCheckList, checkDetail } from '@/api/appointmentManage/check'
import _ from 'lodash'
export default {
  components: { appointmentInfo, dataCheck },
  data() {
    return {
      appointmentMessaage: {
        appointNo: '',
        appointmentStatus: '',
        createName: '',
        operationName: '',
        doctorName: '',
        createTime: '',
        patientName: '',
        phone: '',
        beforeDiagnosis: '',
        appointId: '',
        anesthetistTypeShow: ''
      },
      dialogLeftTop1_3_data: {
        id: parseInt(this.$route.params.id),
        type: '0',
        dataList: [
          { id: null, materialFromType: 0, materialName: 0, isChecked: 0, note: '', isPrinted: 0 },
          { id: null, materialFromType: 0, materialName: 1, isChecked: 0, note: '', isPrinted: 0 },
          { id: null, materialFromType: 0, materialName: 2, isChecked: 0, note: '', isPrinted: 0 },
          { id: null, materialFromType: 0, materialName: 3, isChecked: 0, note: '', isPrinted: 0 },
          { id: null, materialFromType: 0, materialName: 4, isChecked: 0, note: '', isPrinted: 0 },
          { id: null, materialFromType: 1, materialName: 5, isChecked: 0, note: '', isPrinted: 0 },
          { id: null, materialFromType: 1, materialName: 6, isChecked: 0, note: '', isPrinted: 0 },
          { id: null, materialFromType: 1, materialName: 7, isChecked: 0, note: '', isPrinted: 0 },
          { id: null, materialFromType: 1, materialName: 8, isChecked: 0, note: '', isPrinted: 0 },
          { id: null, materialFromType: 2, materialName: 9, isChecked: 0, note: '', isPrinted: 0 },
          { id: null, materialFromType: 3, materialName: 10, isChecked: 0, note: '', isPrinted: 0 }
        ]
      }
    }
  },
  created() {
    this.getPatientInfo()
  },
  mounted() {
    this.setAppMainHeight()
  },
  methods: {
    getPatientInfo() {
      read(parseInt(this.$route.params.id)).then(res => {
        if (res.data.code === 200) {
          for (const key in this.appointmentMessaage) {
            if (this.appointmentMessaage.hasOwnProperty(key)) {
              this.appointmentMessaage[key] = res.data.obj[key]
            }
            this.getDataList()
          }
        }
      })
    },
    getDataList() {
      readCheckList(this.dialogLeftTop1_3_data.dataList).then(res => {
        if (res.data.list.length > 0) {
          this.dialogLeftTop1_3_data.dataList = JSON.parse(JSON.stringify(_.forEach(this.dialogLeftTop1_3_data.dataList, data => {
            const result = _.find(res.data.list, { materialFromType: data.materialFromType, materialName: data.materialName })
            if (result) {
              data.materialFromTypeShow = result.materialFromTypeShow
              data.materialNameShow = result.materialNameShow
            }
            return data
          })))
        }
      }).then(x => {
        checkDetail(this.appointmentMessaage.appointId).then(res => {
          if (res.data.list.length > 0) {
            this.dialogLeftTop1_3_data.dataList = JSON.parse(JSON.stringify(_.forEach(this.dialogLeftTop1_3_data.dataList, data => {
              const result = _.find(res.data.list, { materialFromType: data.materialFromType, materialName: data.materialName })
              if (result) {
                data.isChecked = result.isChecked
                data.isPrinted = result.isPrinted
                data.note = result.note
              }
              return data
            })))
          }
        })
      })
    },
    submitForm(formName, type) {
      var tipText = ['保存成功！', '提交成功！']
      this.dialogLeftTop1_3_data.id = parseInt(this.$route.params.id)
      this.dialogLeftTop1_3_data.type = type
      const postdata = JSON.parse(JSON.stringify(this.dialogLeftTop1_3_data))
      postdata.appointId = this.appointmentMessaage.appointId
      const checkedLength = postdata.dataList.filter(v => v.isChecked === 1).length
      const AllcheckLength = postdata.dataList.length
      this.$confirm('总共' + AllcheckLength + '项，已核对' + checkedLength + '项，还有' + (AllcheckLength - checkedLength) + '项未核对，确定提交吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        saveCheck(postdata).then((res) => {
          if (res.data.code === 200) {
            this.$message({
              message: tipText[type],
              type: 'success',
              duration: 2000
            })
            if (type === 1) {
              this.$root.closeTag()
            }
          } else {
            this.$message({
              message: res.data.msg,
              type: 'error',
              duration: 2000
            })
          }
        })
      }).catch(() => {
        this.$message({
          message: '已取消，请重新核对',
          type: 'info',
          duration: 2000
        })
      })
    },
    cancel() {
      this.$root.closeTag()
    },
    setAppMainHeight() {
      const bodyHeight = document.body.offsetHeight
      const appMainHeight = bodyHeight - 180
      this.$refs.scrollWrap.style.height = appMainHeight + 'px'
    }
  }
}
</script>
<style lang="scss" scoped>
.infomationCheck {
  width: 100%;
  box-sizing: border-box;
  padding-bottom: 20px;
  background-color: #f0f2f5;
  .margin20 {
    margin: 20px;
    background-color: #fff;
  }
  .box {
    padding: 20px;
  }
  .dialog-footer {
    padding: 10px;
    background-color: #fff;
    margin-bottom: 20px;
  }
  .scrollWrap {
    min-height: 100%;
    overflow: auto;
  }
  .appointmentInfoBox {
    background-color: #fff;
    margin: 0 20px;
  }
  h3 {
    padding-left: 40px;
    font-weight: normal;
  }
  table {
    width: 100%;
    text-align: center;
    thead {
      background: #f0f2f5;
    }
    td {
      height: 36px;
      .full {
        width: 100%;
        height: 100%;
        outline: 0;
        border-color: transparent !important;
      }
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
