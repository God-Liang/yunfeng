<template>
<div class="fromPlatform">
    <div slot="footer" class="dialog-footer clearfix">
      <div style="float: left; line-height: 32px;padding-left: 12px;">
        预约处理
        <span style='color: #999;font-size:12px;'>
          处理平台患者预约的订单
        </span>
      </div>
      <div style="float: right;">
          <el-button type="primary" @click="submitForm('dialogLeftTop1_3_data')">下一步</el-button>
          <el-button type="success" @click="getCase">调阅病历</el-button>
          <el-button type="info" @click="cancel">取 消</el-button>
      </div>
    </div>
    <div class="scrollWrap" ref= 'scrollWrap'>
      <appointment-info :appointment='appointmentInfo'></appointment-info>
      <el-row :gutter="20">
          <el-col :span="6"><div class='item'><span >性别：</span> {{appointment.sex}}</div></el-col>
          <el-col :span="6"><div  class='item'><span >出生日期：</span>{{appointment.birthday}}</div></el-col>
          <el-col :span="6"><div  class='item'><span >申请时间：</span>{{appointment.expectTime}}</div></el-col>
      </el-row>
      <el-row>
          <el-col><div  class='item'><span >家庭地址：</span>{{appointment.address}}</div></el-col>
      </el-row>

      <el-row :gutter="20">
          <el-col :span="8"><div  class='item'><span >预约手术时间：</span>{{appointment.isAppointed}}</div></el-col>
          <el-col :span="8"><div  class='item'><span >是否已就诊：</span>{{appointment.jzbz}}</div></el-col>
          <el-col :span="8"><div  class='item'><span >就诊卡号：</span>{{appointment.idCard}}</div></el-col>
      </el-row>
      <el-row>
          <el-col :span="12"><div  class='item'><span >该疾病是否是第一次手术：</span>{{appointment.firstOpt}}</div></el-col>
      </el-row>
      <el-row>
          <el-col :span="6"><div  class='item'><span >患者留言：</span>{{appointment.ly}}</div></el-col>
      </el-row>
      <div class='attachment'>
          <h3> 附件：</h3>
        <div class="box">
          <img :src="item" v-for='(item, index) in thumbnailImgList' :key="index" alt="" id="imgWidth" @click="imgClick(item)">
          <el-dialog
            id="dialog"
            :visible.sync="dialogVisible">
            <img :src="thumbnail" id="s" alt="">
          </el-dialog>
        </div>
      </div>
      <div class="change">
        <el-form :inline="true">
          <el-form-item label="">
            <el-radio-group v-model="resource">
              <!-- <el-radio label="0">转挂号</el-radio> -->
              <el-radio label="1">转院内预约</el-radio>
              <el-radio label="2">取消预约</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="">
            <el-input v-if='resource === "2"' type='text'  placeholder="取消原因" v-model="dialogLeftTop1_3_data.cancelNote"></el-input>
          </el-form-item>
        </el-form>
      </div>
    </div>
</div>
</template>
<script>
import appointmentInfo from '@/yimiviews/components/appointmentInfo'
import { appointmentConfirmConst } from '@/yimiviews/appointmentManage/columnsConst'
import { read, deal } from '@/api/appointmentManage/appointmentConfirm'
export default {
  components: { appointmentInfo },
  created() {
    this.getPatientInfo()
  },
  mounted() {
    this.setAppMainHeight()
  },
  data() {
    return {
      resource: '1',
      appointmentInfo: {},
      radio2: '', // 要删掉的
      checkbox: [], // 要删掉的
      textarea: '', // 要删掉的
      appointmentConfirmConst,
      activeName: 'first',
      dialogLeftTop1_3_data: {
        cancelNote: ''
      },
      appointment: {},
      dialogVisible: false,
      imgWidth: '300px',
      thumbnail: '',
      thumbnailImgList: ['http://pic2.ooopic.com/12/40/58/18bOOOPIC9c.jpg', 'https://gitee.com/uploads/67/892167_minghauqiang.png?1504588531']
    }
  },
  methods: {
    imgClick(item) {
      this.thumbnail = item
      setTimeout(function() {
        document.getElementById('dialog').childNodes[0].style.width = document.getElementById('s').offsetWidth + 42 + 'px'
      }, 100)
      this.dialogVisible = true
    },
    getPatientInfo() {
      read(this.$route.params.id).then(res => {
        this.appointmentInfo = res.data.data
      })
    },
    submitForm(formName) {
      const id = this.$route.params.id
      deal(this.dialogLeftTop1_3_data, this.resource, id).then((res) => {
        if (res.data.code === 200) {
          this.$message({
            message: '预约处理成功！',
            type: 'success',
            duration: 2000
          })
          this.$router.push({ path: '/appointmentConfirm/appointmentDeal/' + id })
          this.$root.closeTag()
        } else {
          this.$message({
            message: res.data.msg,
            type: 'error',
            duration: 2000
          })
        }
      })
    },
    getCase() {
      const id = this.$route.params.id
      this.$router.push(`/case/${id}`)
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
.fromPlatform{
    padding-bottom: 20px;
    background-color: #f0f2f5;
    .dialog-footer {
        padding: 10px;
        background-color: #fff;
        margin-bottom: 20px;
    }
    .scrollWrap{
      min-height: 100%;
      overflow: auto;
      padding: 20px;
      background-color: #fff;
      margin: 0 20px;
    }
    .el-input-group__append{
        width: 80px;
        border: 0 !important;
        background-color: transparent !important;
    }
    .item{
        padding: 10px 0;
        margin-left: 40px;
    }
    .attachment{
      padding-left: 40px;
      .box{
        border: 1px solid #ddd;
        padding: 20px 20px 15px;
        display: flex;
        justify-content: flex-start;
        img{
          width: 100px;
          height: 100px;
          margin-right: 20px;
          display: block;
        }
        .el-dialog__wrapper{
          .el-dialog{
            max-width: 100%;
            .el-dialog__body{
              img{
                width: auto;
                height: auto;
                display: block;
                max-width: 100%;
              }
            }
          }
        }
      }
    }
    .change{
      margin: 20px 0;
      padding-left: 40px;
    }
}
</style>