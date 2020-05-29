<template>
  <div class="startPAE">
    <div slot="footer" class="dialog-footer clearfix">
      <div style="float: left; line-height: 32px;">
        宣教详情
      </div>
    </div>
    <div class="scrollWrap" ref="scrollWrap">
      <div class="appointmentInfoBox">
        <div class="box">
          <appointment-info :appointmentMessaage="appointmentMessaage"></appointment-info>
        </div>
      </div>

      <div class="startPAEBox margin20">
        <div class="box">
          <h3>开始宣教</h3>
          <div class="paeContent" v-html="dialogLeftTop1_3_data.eduContent"></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import appointmentInfo from '@/yimiviews/components/appointmentInfo'
import { readEdu, readEduDetail } from '@/api/appointmentManage/pae'
import { page as healthEduPage, read as readHealthEdu } from '@/api/knowledgeManage/healthPropaganda'
import Tinymce from '@/components/Tinymce'
import DictSelect from '@/views/form/dictSelect'
export default {
  components: { DictSelect, appointmentInfo, Tinymce },
  created() {
    this.getPatientInfo()
  },
  data() {
    return {
      appointmentMessaage: {
        appointNo: '',
        appointmentStatus: '',
        createName: '',
        operationName: '',
        operationNo: null,
        doctorName: '',
        createTime: '',
        patientName: '',
        phone: '',
        beforeDiagnosis: '',
        appointId: '',
        anesthetistTypeShow: ''
      },
      dialogLeftTop1_3_data: {
        id: null,
        eduRecordType: null,
        eduRecordId: null,
        eduContent: ''
      },
      formLabelWidth: '120px',
      eduContents: [],
      loading: false,
      dialogLeftTop1_3_data_rules: {
        eduRecordType: [{ required: true, message: '此项不能为空', trigger: 'change' }]
      }
    }
  },
  mounted() {
    this.setAppMainHeight()
    this.getHealthEdu(' ')
  },
  methods: {
    getPatientInfo() {
      readEduDetail(this.$route.params.id).then(res => {
        if (res.data.code === 200) {
          for (const key in this.appointmentMessaage) {
            if (res.data.obj.hasOwnProperty(key)) {
              this.appointmentMessaage[key] = res.data.obj[key]
            }
          }
          if (res.data.eduRecord) {
            this.dialogLeftTop1_3_data.eduRecordType = res.data.eduRecord.eduType
            this.dialogLeftTop1_3_data.eduRecordId = res.data.eduRecord.eduId
            this.dialogLeftTop1_3_data.eduContent = res.data.eduRecord.eduContent
          } else {
            this.getEdu()
          }
        }
      })
    },
    getEdu() {
      readEdu(this.appointmentMessaage.operationNo).then(res => {
        if (res.data.code === 200) {
          this.dialogLeftTop1_3_data.eduRecordType = res.data.info.eduType
          this.dialogLeftTop1_3_data.eduRecordId = res.data.info.eduId
          if (this.dialogLeftTop1_3_data.eduRecordId) {
            this.paeChange(this.dialogLeftTop1_3_data.eduRecordId)
          }
        }
      })
    },
    cancel() {
      this.$store.commit('SET_SECONDARYJUMP', '/appointmentManage/PAE')
      this.$root.closeTag()
    },
    setAppMainHeight() {
      const bodyHeight = document.body.offsetHeight
      const appMainHeight = bodyHeight - 180
      this.$refs.scrollWrap.style.height = appMainHeight + 'px'
    },
    // 宣教内容
    getHealthEdu(query) {
      if (query !== '') {
        this.loading = true
        setTimeout(() => {
          healthEduPage({
            page: 1,
            limit: 9999,
            type: this.dialogLeftTop1_3_data.eduRecordType,
            keyword: query
          }).then(res => {
            this.eduContents = res.data.list
            this.loading = false
          })
        }, 200)
      } else {
        this.dialogLeftTop1_1_data_doctorList = []
      }
    },
    // 通过宣教类型获取宣教内容
    refreshEduRecord() {
      this.dialogLeftTop1_3_data.eduRecordId = ''
      this.paeContent = ''
      this.getHealthEdu(' ')
    },
    // 宣教表单
    paeChange(val) {
      readHealthEdu(val).then(res => {
        if (res.data.code === 200) {
          this.dialogLeftTop1_3_data.eduContent = res.data.info.content
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.startPAE {
  padding-bottom: 20px;
  background-color: #f0f2f5;
  .margin20 {
    margin: 20px;
    background-color: #fff;
  }
  .box {
    padding: 20px;
  }
  .scrollWrap {
    min-height: 100%;
    overflow: auto;
  }
  .dialog-footer {
    padding: 10px 20px;
    background-color: #fff;
    margin-bottom: 20px;
  }
  .appointmentInfoBox {
    background-color: #fff;
    margin: 0 20px;
  }
}
.paeContent {
  padding: 20px;
  border: 1px solid #eee;
  min-height: 200px;
}
.buttonRadius {
  border-radius: 0;
  width: 90px;
  border: 0;
  color: #fff;
}
.sumbitColor {
  background-color: #0270f5;
}
.saveColor {
  background-color: #f5a623;
}
.auditColor {
  background-color: #ff5555;
}
</style>

