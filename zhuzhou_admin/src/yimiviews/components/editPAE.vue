<template>
  <div class="startPAE">
    <div slot="footer" class="dialog-footer clearfix">
      <div style="float: left; line-height: 32px;">
        设置宣教
        <!-- <span style="color: #999;font-size:12px;">对预约的病人进行麻醉评估</span> -->
      </div>
      <div style="float: right;">
        <el-button type="warning" class="buttonRadius saveColor" @click="missionOpen">另保存</el-button>
        <el-button type="primary" class="buttonRadius sumbitColor" @click="submitForm('dialogLeftTop1_3_data',1)">提交</el-button>
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
          <el-form
            :model="dialogLeftTop1_3_data"
            ref="dialogLeftTop1_3_data"
            :show-message="true"
            :rules="dialogLeftTop1_3_data_rules"
            :inline="true"
          >
            <el-form-item label="宣教类型" :label-width="formLabelWidth" prop="eduRecordType">
              <dict-select
                v-model="dialogLeftTop1_3_data.eduRecordType"
                placeholder="请选择"
                style="width: 196px"
                dict-code="xjlx"
                @change="refreshEduRecord"
              ></dict-select>
            </el-form-item>
            <el-form-item label="宣教名称" :label-width="formLabelWidth" prop="eduRecordId">
              <el-select
                v-model="dialogLeftTop1_3_data.eduRecordId"
                filterable
                reserve-keyword
                placeholder="请选择"
                :remote-method="getHealthEdu"
                :loading="loading"
                style="width: 196px"
              >
                <el-option
                  v-for="item in eduContents"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-button type="primary" @click="paeChange(dialogLeftTop1_3_data.eduRecordId)">添加</el-button>
          </el-form>
          <tinymce :height="400" ref="editor" class="paeContent" @isChange="isChange" :hasChangeTage="hasChange" :updateTage="false" v-model="dialogLeftTop1_3_data.eduContent"></tinymce>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import appointmentInfo from '@/yimiviews/components/appointmentInfo'
import { save, readEdu, readEduDetail } from '@/api/appointmentManage/pae'
import { list as healthEduList, read as readHealthEdu, postForm } from '@/api/knowledgeManage/healthPropaganda'
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
        visitDiagnosis: '',
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
      },
      hasChange: true
    }
  },
  mounted() {
    this.setAppMainHeight()
    this.getHealthEdu(' ')
  },
  methods: {
    isChange(val) {
      this.hasChange = val
    },
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
    submitForm(formName) {
      if (this.dialogLeftTop1_3_data.eduContent === '') {
        this.$message({
          message: '宣教内容不能为空',
          type: 'warning'
        })
        return false
      }
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const data = Object.assign({}, this.dialogLeftTop1_3_data)
          data.id = parseInt(this.$route.params.id)
          data.appointId = this.appointmentMessaage.appointId
          data.type = 0
          save(data).then(res => {
            if (res.data.code === 200) {
              this.$message({
                message: '设置成功',
                type: 'success'
              })
              this.cancel()
            }
          })
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
          healthEduList({
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
          this.hasChange = false
          this.dialogLeftTop1_3_data.eduContent += res.data.info.content
        }
      })
    },
    // 宣教内容另存为
    missionOpen() {
      if (!this.dialogLeftTop1_3_data.eduRecordType) {
        this.$message({
          type: 'warning',
          message: '请先选择宣教类型'
        })
        return false
      }
      this.$prompt('请输入宣教名称', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(({ value }) => {
        const data = {
          name: value,
          type: this.dialogLeftTop1_3_data.eduRecordType,
          content: this.dialogLeftTop1_3_data.eduContent,
          status: 1
        }
        postForm(data).then((res) => {
          if (res.data.code === 200) {
            this.$message({
              type: 'success',
              message: '另保存成功！'
            })
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消另存为'
        })
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

