<template>
  <div class="app-container">
    <div>
      <h3
        v-if="userInfo.examine === 0"
        class="fl"
        style="margin:0;color:#14b0b2;padding-top:10px;"
      >
        请完善机构信息
      </h3>
      <h3
        v-if="userInfo.examine === 1"
        class="fl"
        style="margin:0;color:#14b0b2;padding-top:10px;"
      >
        待审核
      </h3>
      <h3
        v-if="userInfo.examine === 2"
        class="fl"
        style="margin:0;color:#14b0b2;padding-top:10px;"
      >
        机构信息
      </h3>
      <h3
        v-if="userInfo.examine === 3"
        class="fl"
        style="margin:0;color:red;padding-top:10px;"
      >
        审核不通过
        <span style="font-size:12px;">({{ userInfo.examine_msg }})</span>
      </h3>
      <el-button v-show="!isEdit" type="primary" class="fr" @click="clickEdit">
        编辑</el-button>
    </div>
    <div class="order-container" style="margin-top:50px;">
      <h3>基本信息</h3>
      <el-row class="lgInfoBox">
        <el-col :span="24">
          <span class="labelNormal">单位Logo:</span>
          <span class="labelVal">
            <img
              v-show="!isEdit"
              style="width:138px;height:138px;"
              :src="info.logo_url"
              alt=""
            >
            <div
              v-show="isEdit"
              style="width:150px;height:150px;overflow:hidden"
            >
              <upload-img
                :img-url="info.logo_url"
                @change="handleSuccess($event, 'logo_url')"
              />
            </div>
          </span>
        </el-col>
      </el-row>
      <el-row class="lgInfoBox">
        <el-col :span="8">
          <span class="labelNormal">单位名称:</span>
          <span class="labelVal">{{ info.company_name }}</span>
        </el-col>
        <el-col :span="8">
          <span class="labelNormal">单位类型:</span>
          <span class="labelVal">{{ info.company_type_name }}</span>
        </el-col>
      </el-row>
      <el-row class="lgInfoBox">
        <el-col :span="8">
          <span class="labelNormal">法人:</span>
          <span class="labelVal">
            <span v-show="!isEdit">{{ info.corporation }}</span>
            <el-input v-show="isEdit" v-model="info.corporation" />
          </span>
        </el-col>
        <el-col :span="8">
          <span class="labelNormal">联系责任人:</span>
          <span class="labelVal">
            <span v-show="!isEdit">{{ info.link_man }}</span>
            <el-input v-show="isEdit" v-model="info.link_man" />
          </span>
        </el-col>
        <el-col :span="8">
          <span class="labelNormal">手机号:</span>
          <span class="labelVal">
            <span v-show="!isEdit">{{ info.link_phone }}</span>
            <el-input v-show="isEdit" v-model="info.link_phone" />
          </span>
        </el-col>
      </el-row>
      <el-row class="lgInfoBox">
        <el-col :span="8">
          <span class="labelNormal">固定电话:</span>
          <span class="labelVal">
            <span v-show="!isEdit">{{ info.telephone }}</span>
            <el-input v-show="isEdit" v-model="info.telephone" />
          </span>
        </el-col>
        <el-col :span="8">
          <span class="labelNormal">传真:</span>
          <span class="labelVal">
            <span v-show="!isEdit">{{ info.fax }}</span>
            <el-input v-show="isEdit" v-model="info.fax" />
          </span>
        </el-col>
        <el-col :span="8">
          <span class="labelNormal">邮箱:</span>
          <span class="labelVal">
            <span v-show="!isEdit">{{ info.email }}</span>
            <el-input v-show="isEdit" v-model="info.email" />
          </span>
        </el-col>
      </el-row>
      <el-row class="lgInfoBox">
        <el-col :span="24">
          <span class="labelNormal">单位地址:</span>
          <span class="labelVal">
            <span v-show="!isEdit">{{ info.address }}</span>
            <el-input v-show="isEdit" v-model="info.address" />
          </span>
        </el-col>
      </el-row>
    </div>
    <div class="order-container" style="border-bottom:1px dashed #E0E0E0">
      <h3>资质证件</h3>
      <el-row class="lgInfoBox">
        <el-col :span="8">
          <span class="labelNormal">证件类型:</span>
          <span class="labelVal">
            <el-radio-group v-model="info.of_one" :disabled="!isEdit">
              <el-radio :label="0">多证合一</el-radio>
              <el-radio :label="1">传统三证</el-radio>
            </el-radio-group>
          </span>
        </el-col>
      </el-row>
    </div>
    <!-- <h4>必填项</h4> -->
    <div class="ul" style="margin:20px; 0">
      <div v-show="isEdit || info.credit_img.length > 0" class="li">
        <div class="clearfix top">
          <span class="fl">
            营业执照
            <span v-show="info.of_one === 0"> (多证合一)</span>
          </span>
          <a
            v-show="isEdit"
            class="fr"
            href="https://aek-prod-image.oss-cn-hangzhou.aliyuncs.com/public/credentials/uniformCreditCode.png"
            target="_blank"
          >示例</a>
        </div>
        <div
          v-show="!isEdit"
          style="height:150px;margin-bottom:10px;overflow:auto;"
        >
          <img
            v-for="url in info.credit_img"
            :key="url.id"
            style="width:145px;height:145px;margin-right:10px;"
            :src="url.file_path"
            alt=""
          >
        </div>
        <div v-show="isEdit" style="height: 150px;overflow: auto;">
          <upload-img
            style="margin-bottom:10px;"
            :img-list="info.credit_img"
            @change="handleSuccess($event, 'credit_img')"
          />
        </div>
        <div class="tips">
          1.企业名称需要与营业执照名称保持一致
          2.三证合一的企业请在证照号码处填写“全国统一社会信用代码”
          3.证照起止日期为必填，若为长期终止时间可不填
        </div>
        <div class="form  clearfix">
          <div v-show="info.of_one === 0" class="label fl">
            社会统一信用代码:
          </div>
          <div v-show="info.of_one === 1" class="label fl">证件号:</div>
          <el-input
            v-show="isEdit"
            v-model="info.credit_code"
            class="val fl"
            size="mini"
          />
          <span v-show="!isEdit" class="val fl" style="line-height:30px;">
            {{ info.credit_code }}
          </span>
        </div>
        <div class="form  clearfix">
          <div class="label fl">有效期:</div>
          <div v-show="isEdit" class="val fl">
            <div>
              <el-date-picker
                v-model="info.credit_starttime"
                class="fl"
                type="date"
                size="mini"
                style="width:130px;"
                placeholder="选择日期"
              />
              <span
                class="fl"
                style="width:20px;text-align:center;line-height:28px;"
              >
                -</span>
              <el-date-picker
                v-model="info.credit_endtime"
                class="fl"
                type="date"
                size="mini"
                style="width:130px;"
                placeholder="选择日期"
              />
            </div>
            <span style="font-size:12px;color:#ff903e">
              截止日期不填则默认长期有效</span>
          </div>
          <span v-show="!isEdit" class="val fl" style="line-height:30px;">
            {{ info.credit_starttime }}-{{ info.credit_endtime }}
          </span>
        </div>
      </div>
      <div v-show="isEdit || info.certificate_img.length > 0" class="li">
        <div class="clearfix top">
          <span class="fl">经营许可证/经营备案证 </span>
          <a
            v-show="isEdit"
            class="fr"
            href="https://aek-prod-image.oss-cn-hangzhou.aliyuncs.com/public/credentials/businessCertificate.png"
            target="_blank"
          >示例</a>
        </div>
        <div
          v-show="!isEdit"
          style="height:150px;margin-bottom:10px;overflow:auto;"
        >
          <img
            v-for="url in info.certificate_img"
            :key="url.id"
            style="width:145px;height:145px;margin-right:10px;"
            :src="url.file_path"
            alt=""
          >
        </div>
        <upload-img
          v-show="isEdit"
          style="margin-bottom:10px;"
          :img-list="info.certificate_img"
          @change="handleSuccess($event, 'certificate_img')"
        />
        <!-- <div class="tips" /> -->
        <div class="form  clearfix">
          <div class="label fl">证件号:</div>
          <el-input
            v-show="isEdit"
            v-model="info.certificate_number"
            class="val fl"
            size="mini"
          />
          <span v-show="!isEdit" class="val fl" style="line-height:30px;">
            {{ info.certificate_number }}
          </span>
        </div>
        <div class="form  clearfix">
          <div class="label fl">有效期:</div>
          <div v-show="isEdit" class="val fl">
            <div>
              <el-date-picker
                v-model="info.certificate_starttime"
                class="fl"
                type="date"
                size="mini"
                style="width:130px;"
                placeholder="选择日期"
              />
              <span
                class="fl"
                style="width:20px;text-align:center;line-height:28px;"
              >
                -</span>
              <el-date-picker
                v-model="info.certificate_endtime"
                class="fl"
                type="date"
                size="mini"
                style="width:130px;"
                placeholder="选择日期"
              />
            </div>
            <span style="font-size:12px;color:#ff903e">
              截止日期不填则默认长期有效</span>
          </div>
          <span v-show="!isEdit" class="val fl" style="line-height:30px;">
            {{ info.certificate_starttime }}-{{ info.certificate_endtime }}
          </span>
        </div>
      </div>
      <!-- <div v-show="isEdit || info.zlfw_img.length > 0" class="li">
        <div class="clearfix top">
          <span class="fl">质量服务保证协议 </span>
          <a
            v-show="isEdit"
            class="fr"
            href="https://aek-prod-image.oss-cn-hangzhou.aliyuncs.com/public/credentials/qualityAgreement.png"
            target="_blank"
          >示例</a>
        </div>
        <upload-img style="margin-bottom:10px;" />
      </div>
      <div v-show="isEdit || info.hggh_img.length > 0" class="li">
        <div class="clearfix top">
          <span class="fl">合格供货方档案表/质量体系调查表</span>
          <a
            v-show="isEdit"
            class="fr"
            href="https://aek-prod-image.oss-cn-hangzhou.aliyuncs.com/public/credentials/listQualifiedSuppliers.png"
            target="_blank"
          >示例</a>
        </div>
        <upload-img style="margin-bottom:10px;" />
      </div>
      <div v-show="isEdit || info.corporation_img.length > 0" class="li">
        <div class="clearfix top">
          <span class="fl">法人身份证</span>
          <a
            v-show="isEdit"
            class="fr"
            href="https://aek-prod-image.oss-cn-hangzhou.aliyuncs.com/public/credentials/corporateIdentityCard.png"
            target="_blank"
          >示例</a>
        </div>
        <upload-img style="margin-bottom:10px;" />
        <div class="tips">
          1.身份证需包含正反两面<br >
          2.身份证须在有效期内
        </div>
      </div> -->
    </div>
    <!-- <h4>非必填项</h4>
    <div class="ul" style="margin-bottom:20px;">
      <div v-show="isEdit || info.tax_img.length > 0" class="li">
        <div class="clearfix top">
          <span class="fl">税务登记证</span>
          <a
            v-show="isEdit"
            class="fr"
            href="https://aek-prod-image.oss-cn-hangzhou.aliyuncs.com/public/credentials/taxRegisterCerti.png"
            target="_blank"
          >示例</a>
        </div>
        <upload-img style="margin-bottom:10px;" />
        <div class="form  clearfix">
          <div class="label fl">证件号:</div>
          <el-input
            v-show="isEdit"
            v-model="info.tax_number"
            class="val fl"
            size="mini"
          />
          <span v-show="!isEdit" class="val fl" style="line-height:30px;">
            {{ info.tax_number }}
          </span>
        </div>
        <div class="form  clearfix">
          <div class="label fl">有效期:</div>
          <div v-show="isEdit" class="val fl">
            <div>
              <el-date-picker
                v-model="info.tax_starttime"
                class="fl"
                type="date"
                size="mini"
                style="width:130px;"
                placeholder="选择日期"
              />
              <span
                class="fl"
                style="width:20px;text-align:center;line-height:28px;"
              >
                -</span>
              <el-date-picker
                v-model="info.tax_endtime"
                class="fl"
                type="date"
                size="mini"
                style="width:130px;"
                placeholder="选择日期"
              />
            </div>
            <span style="font-size:12px;color:#ff903e">
              截止日期不填则默认长期有效</span>
          </div>
          <span v-show="!isEdit" class="val fl" style="line-height:30px;">
            {{ info.tax_starttime }}-{{ info.tax_endtime }}
          </span>
        </div>
      </div>
      <div v-show="isEdit || info.spyb_img.length > 0" class="li">
        <div class="clearfix top">
          <span class="fl">税票样本</span>
          <a
            v-show="isEdit"
            class="fr"
            href="https://aek-prod-image.oss-cn-hangzhou.aliyuncs.com/public/credentials/taxBillSample.png"
            target="_blank"
          >示例</a>
        </div>
        <upload-img style="margin-bottom:10px;" />
      </div>
      <div v-show="isEdit || info.org_img.length > 0" class="li">
        <div class="clearfix top">
          <span class="fl">组织机构代码</span>
          <a
            v-show="isEdit"
            class="fr"
            href="https://aek-prod-image.oss-cn-hangzhou.aliyuncs.com/public/credentials/organizingBarCode.png"
            target="_blank"
          >示例</a>
        </div>
        <upload-img style="margin-bottom:10px;" />
        <div class="form  clearfix">
          <div class="label fl">证件号:</div>
          <el-input
            v-show="isEdit"
            v-model="info.org_code"
            class="val fl"
            size="mini"
          />
          <span v-show="!isEdit" class="val fl" style="line-height:30px;">
            {{ info.org_code }}
          </span>
        </div>
        <div class="form  clearfix">
          <div class="label fl">有效期:</div>
          <div v-show="isEdit" class="val fl">
            <div>
              <el-date-picker
                v-model="info.org_starttime"
                class="fl"
                type="date"
                size="mini"
                style="width:130px;"
                placeholder="选择日期"
              />
              <span
                class="fl"
                style="width:20px;text-align:center;line-height:28px;"
              >
                -</span>
              <el-date-picker
                v-model="info.org_endtime"
                class="fl"
                type="date"
                size="mini"
                style="width:130px;"
                placeholder="选择日期"
              />
            </div>
            <span style="font-size:12px;color:#ff903e">
              截止日期不填则默认长期有效</span>
          </div>
          <span v-show="!isEdit" class="val fl" style="line-height:30px;">
            {{ info.org_starttime }}-{{ info.org_endtime }}
          </span>
        </div>
      </div>
      <div v-show="isEdit || info.frsqwts_img.length > 0" class="li">
        <div class="clearfix top">
          <span class="fl">法人授权委托书</span>
          <a
            v-show="isEdit"
            class="fr"
            href="https://aek-prod-image.oss-cn-hangzhou.aliyuncs.com/public/credentials/LegalPersonAttorney.png"
            target="_blank"
          >示例</a>
        </div>
        <upload-img style="margin-bottom:10px;" />
        <div class="tips">
          1.受委托人的姓名与身份证号须清晰可见 2..需注明授权有效期
          3..需法定代表人签字盖章
        </div>
      </div>
      <div v-show="isEdit || info.internet_sales_img.length > 0" class="li">
        <div class="clearfix top">
          <span class="fl">医疗器械网络销售备案凭证</span>
          <a
            v-show="isEdit"
            class="fr"
            href="https://aek-prod-image.oss-cn-hangzhou.aliyuncs.com/public/credentials/medicalDvviVoucher.png"
            target="_blank"
          >示例</a>
        </div>
        <upload-img style="margin-bottom:10px;" />
        <div class="form  clearfix">
          <div class="label fl">证件号:</div>
          <el-input
            v-show="isEdit"
            v-model="info.internet_sales_code"
            class="val fl"
            size="mini"
          />
          <span v-show="!isEdit" class="val fl" style="line-height:30px;">
            {{ info.internet_sales_code }}
          </span>
        </div>
        <div class="form  clearfix">
          <div class="label fl">有效期:</div>
          <div v-show="isEdit" class="val fl">
            <div>
              <el-date-picker
                v-model="info.internet_sales_starttime"
                class="fl"
                type="date"
                size="mini"
                style="width:130px;"
                placeholder="选择日期"
              />
              <span
                class="fl"
                style="width:20px;text-align:center;line-height:28px;"
              >
                -</span>
              <el-date-picker
                v-model="info.internet_sales_endtime"
                class="fl"
                type="date"
                size="mini"
                style="width:130px;"
                placeholder="选择日期"
              />
            </div>
            <span style="font-size:12px;color:#ff903e">
              截止日期不填则默认长期有效</span>
          </div>
          <span v-show="!isEdit" class="val fl" style="line-height:30px;">
            {{ info.internet_sales_starttime }}-{{
              info.internet_sales_endtime
            }}
          </span>
        </div>
      </div>
      <div v-show="isEdit || info.gsyz_img.length > 0" class="li">
        <div class="clearfix top">
          <span class="fl">公司印章印模</span>
        </div>
        <upload-img style="margin-bottom:10px;" />
      </div>
    </div> -->
    <div v-show="isEdit" class="botFixed">
      <el-button type="primary" size="mini" @click="confirm">
        提交审核</el-button>
      <el-button size="mini" @click="isEdit = false">取消</el-button>
    </div>
  </div>
</template>
<script>
import { info, update } from '@/api/organization'
import uploadImg from '../components/uploadImg'

export default {
  name: 'OrganInfo',
  components: {
    uploadImg
  },
  data() {
    return {
      isEdit: false,
      info: {
        credit_img: [],
        certificate_img: []
        // tax_img: [],
        // org_img: [],
        // internet_sales_img: [],
        // zlfw_img: [],
        // hggh_img: [],
        // corporation_img: [],
        // spyb_img: [],
        // frsqwts_img: [],
        // gsyz_img: []
      },
      postInfo: {},
      time1: '',
      time2: '',
      userInfo: {}
    }
  },
  created() {
    this.userInfo = JSON.parse(sessionStorage.getItem('userInfo'))
  },
  mounted() {
    this.getInfo()
  },
  methods: {
    getInfo() {
      const id = this.$route.params.id
      info({ id: id }).then(res => {
        if (res.success === true) {
          this.info = res.data
          this.postInfo = Object.assign({}, this.info)
          const credit_img = this.postInfo.credit_img.map(e => {
            return e.id
          })
          const certificate_img = this.postInfo.certificate_img.map(e => {
            return e.id
          })
          // const tax_img = res.data.tax_img.map(e => {
          //   return e.id
          // })
          // const org_img = res.data.org_img.map(e => {
          //   return e.id
          // })
          // const internet_sales_img = res.data.internet_sales_img.map(e => {
          //   return e.id
          // })
          // const zlfw_img = res.data.zlfw_img.map(e => {
          //   return e.id
          // })
          // const hggh_img = res.data.hggh_img.map(e => {
          //   return e.id
          // })
          // const corporation_img = res.data.corporation_img.map(e => {
          //   return e.id
          // })
          // const spyb_img = res.data.spyb_img.map(e => {
          //   return e.id
          // })
          // const frsqwts_img = res.data.frsqwts_img.map(e => {
          //   return e.id
          // })
          // const gsyz_img = res.data.gsyz_img.map(e => {
          //   return e.id
          // })
          this.postInfo.credit_img = credit_img.join(',')
          this.postInfo.certificate_img = certificate_img.join(',')
          // this.postInfo.tax_img = tax_img.join(',')
          // this.postInfo.org_img = org_img.join(',')
          // this.postInfo.internet_sales_img = internet_sales_img.join(',')
          // this.postInfo.zlfw_img = zlfw_img.join(',')
          // this.postInfo.hggh_img = hggh_img.join(',')
          // this.postInfo.corporation_img = corporation_img.join(',')
          // this.postInfo.spyb_img = spyb_img.join(',')
          // this.postInfo.frsqwts_img = frsqwts_img.join(',')
          // this.postInfo.gsyz_img = gsyz_img.join(',')
        }
      })
    },
    clickEdit() {
      this.isEdit = true
    },
    confirm() {
      this.isEdit = false
      console.log(this.info)
      const obj = Object.assign({}, this.info)
      delete obj.business_scope
      delete obj.business_scope_json
      obj.logo_url = this.logo_url
      obj.credit_img = this.credit_img
      obj.certificate_img = this.certificate_img
      obj.tax_img = ''
      obj.org_img = ''
      obj.internet_sales_img = ''
      obj.zlfw_img = ''
      obj.hggh_img = ''
      obj.corporation_img = ''
      obj.spyb_img = ''
      obj.frsqwts_img = ''
      obj.gsyz_img = ''
      update(obj).then(res => {
        if (res.success) {
          this.getInfo()
        }
      })
    },
    handleSuccess(msg, type) {
      console.log(msg, type)
      this[type] = msg
    }
  }
}
</script>
<style lang="scss" scoped>
// .app-container {
//   position: relative;
// }
.lgInfoBox {
  span {
    line-height: 36px;
  }
}
.ul {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  border-bottom: 1px dashed #e0e0e0;
  .li {
    width: calc(calc(100% - 40px) / 2);
    // width: 100%;
    margin: 0 10px 20px 10px;
    border: 1px solid #e0e0e0;
    box-sizing: border-box;
    padding: 20px;
    height: 350px;
    font-size: 14px;
    .top {
      padding-bottom: 20px;
      .fr {
        color: #35c4e8;
      }
    }
    .tips {
      font-size: 12px;
      height: 30px;
      line-height: 15px;
      padding-bottom: 10px;
    }
    .form {
      // width: 50%;
      padding-top: 10px;
      .label {
        width: 130px;
        text-align: left;
        display: inline-block;
        line-height: 30px;
      }
      .val {
        width: 280px;
      }
    }
  }
}
.botFixed {
  position: fixed;
  // width: calc(100% - 210px);
  background: #fff;
  bottom: 0;
  left: 210px;
  right: 20px;
  height: 40px;
  box-shadow: 0px -4px 15px #7d8385;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
