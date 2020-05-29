<template>
  <div class="records" v-loading="loading">
    <div class="base">
      <div class="avatar">
        <ul>
          <li>
            <img v-if="base.sex === 1" src="@/assets/images/male.jpg" width="80px;" height="80px;">
            <img
              v-else-if="base.sex === 2"
              src="@/assets/images/female.jpg"
              width="80px;"
              height="80px;"
            >
            <svg-icon
              class-name="international-icon"
              v-else
              class="avatar right_menu_item"
              icon-class="avatar"
            />
            <div class="name">{{base.patientName}}</div>
            <span class="el-icon-phone-outline" @click="makePhone"></span>
          </li>
          <li>
            <span class="gender">{{base.sex ===1 ?'男':'女'}}</span>
            <i></i>
            <span class="age">{{base.age || 0}}</span>
            <i></i>
            <span class="telephone">{{base.phone}}</span>
          </li>
        </ul>
      </div>
      <i class="lg_x"></i>
      <ul class="baseDetail">
        <li class="surgeryBox">
          <p>
            <label>就诊卡号</label>
            <span :title="base.visitId">{{base.visitId}}</span>
          </p>
          <p>
            <label>身份证号</label>
            <span :title="base.idCard">{{base.idCard}}</span>
          </p>
        </li>
        <li class="surgeryBox">
          <p>
            <label>预约单号</label>
            <span :title="base.appointNo">{{base.appointNo}}</span>
          </p>
          <p>
            <label>手术名称</label>
            <span :title="base.operationName">{{base.operationName}}</span>
          </p>
          <p>
            <label>手术医生</label>
            <span :title="base.doctorName">{{base.doctorName}}</span>
          </p>
          <p>
            <label>手术时间</label>
            <span>{{base.schedule | timeFilter}}</span>
          </p>
          <p>
            <label>术前诊断</label>
            <span :title="base.beforeDiagnosis">{{base.beforeDiagnosis}}</span>
          </p>
          <p>
            <label>就诊日期</label>
            <span>{{base.createTime | fmtYMD}}</span>
          </p>
          <p>
            <label>麻醉方式</label>
            <span
              :title="base.anesthetistTypeShow"
            >{{base.anesthetistTypeShow}}</span>
          </p>
        </li>
      </ul>
    </div>
    <div class="allInfo" ref="allInfo">
      <div class="renderWrap" v-if="template_form">
        <div class="title">
          <strong>{{this.formName}}</strong>
        </div>
        <render :template_form="template_form" ref="renderForm" :border="false" :lgCheck="true"></render>
      </div>
      <div v-else>
        <p>未设置随访表单</p>
      </div>

      <div class="follower">
        <el-form ref="formLeftTop2" :model="formLeftTop2" :label-width="labelWidth" :inline="true" :disabled="true">
          <el-form-item label="回访人">
            <el-input type="input" v-model="formLeftTop2.execUserName" style="width: 200px;"></el-input>
          </el-form-item>
          <el-form-item label="实际回访时间">
            <el-date-picker
              v-model="formLeftTop2.execTime"
              type="datetime"
              format="yyyy-MM-dd"
              placeholder="选择日期时间"
              disabled
              style="width: 200px;"
            ></el-date-picker>
          </el-form-item>
          <el-form-item label="实际回访方式">
            <el-select v-model="formLeftTop2.followupType" placeholder="请选择" style="width: 200px;">
              <el-option label="电话" :value="0"></el-option>
              <el-option label="短信" :value="1"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="随访状态">
            <el-select
              v-model="formLeftTop2.followupResult"
              placeholder="请选择"
              style="width: 200px;"
            >
              <el-option label="正常状态" :value="0"></el-option>
              <el-option label="无法接通" :value="1"></el-option>
              <el-option label="号码错误" :value="2"></el-option>
              <el-option label="无人接听" :value="3"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="是否异常">
            <el-select v-model="formLeftTop2.isUnusual" placeholder="请选择" style="width: 200px;">
              <el-option label="正常" :value="0"></el-option>
              <el-option label="异常" :value="1"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="是否完成">
            <el-select placeholder="请选择" style="width: 200px;" value="1">
              <el-option label="未完成" value="0"></el-option>
              <el-option label="已完成" value="1"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="处理意见">
            <el-input
              placeholder="请输入处理意见"
              style="width:350px;"
              @keyup.native="deleteInput"
              v-model="formLeftTop2.followupContent"
              class="input-with-select"
            >
            </el-input>
          </el-form-item>
        </el-form>
        <div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import formCreater from '@/yimiviews/case/formCreater'
import { urlGetData } from '@/api/formCreater/formCreater'
import render from '@/formCreater/components/render'
import { getFollowResult, submitFollowup } from '@/api/followupManage'
import { pending } from '@/api/knowledgeManage/message'
export default {
  components: { formCreater, render },
  mounted() {
    const id = this.$route.params.id
    this.formLeftTop2.id = id
    getFollowResult({ id: id }).then(res => {
      this.base = res.data.followupDetail
      this.formLeftTop2 = res.data.followup
      if (res.data.formData) {
        this.loading = false
        this.formId = res.data.formData[0].id
        this.formName = res.data.formData[0].name
        this.template_form = JSON.parse(res.data.followupFormResult.result)
        this.template_form.forEach(v => {
          if (v.obj.urlData) {
            urlGetData(v.obj.urlData).then(res => {
              if (res.data.code === 200) {
                const item = JSON.parse(res.data.items)
                v.obj.items = item
              }
            })
          }
        })
      }
    })
    this.getHintList()
  },
  data() {
    return {
      labelWidth: '120px',
      followTime: '',
      formLeftTop2: {
        id: 0,
        followupType: '0',
        followupResult: '0',
        isUnusual: '0',
        isFinish: '0',
        followupContent: ''
      },
      base: {
        avatar: '',
        name: '',
        gender: '',
        age: '',
        card: '',
        ID: '',
        telephone: '',
        surgery: '',
        operateDoctor: '',
        surgeryTime: ''
      },
      formId: '',
      formName: '',
      template_form: '',
      hint: null,
      hintList: [],
      loading: true
    }
  },
  filters: {
    timeFilter: (val) => {
      if (!val) return ''
      if (val.indexOf('00:00:00') > -1) {
        const value = val.replace(' 00:00:00', '')
        return value
      }
    }
  },
  methods: {
    // 拨打电话
    makePhone() {
      const phone = this.base.phone
      if (phone != null) {
        const url = location.origin + '/static/bb.html?phone=' + phone
        window.location.href = 'openIE:' + url
      }
    },
    deleteInput() {
      this.hint = null
    },
    hintChange(val) {
      if (val) {
        this.formLeftTop2.followupContent = this.hintList.find(v => v.id === val).content
      } else {
        this.formLeftTop2.followupContent = ''
      }
    },
    getHintList() {
      const query = {
        page: 1,
        limit: 999999,
        type: 2
      }
      pending(query).then(res => {
        this.hintList = res.data.list
      })
    },
    handleSubmit(name) {
      const renderFormValid = this.$refs.renderForm.checkValid()
      this.$refs[name].validate((valid) => {
        if (valid && renderFormValid) {
          // window.localStorage.setItem('template_form', JSON.stringify(this.template_form))
          const query = Object.assign({}, this.formLeftTop2, { formId: this.formId, result: JSON.stringify(this.template_form) })
          query.execTime = query.execTime + ' 00:00:00'
          submitFollowup(query).then(res => {
            if (res.data.code === 200) {
              this.$message({ message: '保存随访成功!', type: 'success' })
              this.$root.closeTag()
            }
          })
        } else {
          this.$message.error('请填写必填项!')
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.records {
  display: flex;
  height: 100%;
  box-sizing: border-box;
  background-color: #f3f6ff;
  .base {
    width: 260px;
    height: 100%;
    background-color: #fff;
    .avatar {
      text-align: center;
      ul {
        list-style: none;
        padding: 0;
        margin: 0;
        li {
          padding: 0;
          color: #333;
          font-size: 12px;
          margin: 15px 0;
          display: flex;
          justify-content: center;
          align-items: center;
          > img {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            margin-right: 20px;
            display: inline-block;
          }
          .avatar {
            width: 40px;
            height: 40px;
            margin: 0;
            vertical-align: middle;
          }
          .name {
            font-size: 14px;
            font-weight: bold;
            cursor: pointer;
            &::after {
              content: "";
              display: inline-block;
              width: 1px;
              height: 12px;
              background-color: #ccc;
              margin: 0 10px 0 12px;
              vertical-align: middle;
            }
          }
          .el-icon-phone-outline {
            color: #1cb999;
            font-size: 16px;
            cursor: pointer;
          }
          .exitBox {
            width: 22px;
            position: relative;
            cursor: pointer;
            img {
              width: 100%;
              display: block;
            }
            .exit {
              position: absolute;
              left: 50%;
              transform: translateX(-50%);
              top: 30px;
              .transition-box {
                position: relative;
                width: 100px;
                height: 36px;
                line-height: 36px;
                border: 1px solid #eee;
                padding: 0;
                color: #333;
                background-color: #fff;
                box-shadow: 0px 0px 20px #deede6;
                &::before {
                  border: 8px solid transparent;
                  border-bottom: 8px solid #fff;
                  position: absolute;
                  content: "";
                  left: 50%;
                  margin-left: -10px;
                  bottom: 100%;
                }
              }
            }
          }
          .gender {
          }
          i {
            width: 1px;
            height: 7px;
            background-color: rgb(220, 220, 220);
            margin: 0 10px;
          }
        }
      }
    }
    .lg_x {
      width: 100%;
      height: 1px;
      margin: 20px 0;
      display: block;
      background: rgb(220, 220, 220);
    }
    ul.baseDetail {
      margin: 0;
      padding: 0 15px;
      li {
        list-style: none;
        margin: 0 0 20px;
        line-height: 32px;
        p {
          margin: 0;
          height: 32px;
          line-height: 32px;
          &:last-child {
            border: 0 !important;
          }
          label {
            font-weight: normal;
            color: #333;
            font-size: 14px;
            letter-spacing: 2px;
          }
          span {
            color: #333;
            font-size: 14px;
            letter-spacing: 2px;
          }
        }
        &.mesBox {
          padding: 0 15px;
          background-color: #fff4e8;
          border: 1px solid #eee;
          p {
            border-bottom: 1px solid #fff;
            height: 36px;
            line-height: 36px;
            span {
              float: right;
            }
          }
        }
        &.surgeryBox {
          border: 1px solid #eee;
          p {
            border-bottom: 1px dashed #eee;
            padding: 0 15px;
            label {
              font-weight: normal;
              color: #111;
              font-size: 12px;
              float: left;
            }
            span {
              color: #111;
              font-size: 12px;
              letter-spacing: 0px;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
              display: inline-block;
              width: 135px;
              float: left;
              padding-left: 10px;
            }
          }
        }
        span {
          font-size: 14px;
          font-weight: normal;
        }
      }
    }
  }

  .allInfo {
    flex: 1;
    padding: 15px 0 0;
    margin: 0 15px;
    box-sizing: border-box;
    overflow: auto;
    height: calc(100% - 30px);
    .renderWrap {
      background-color: #fff;
      .title {
        background-color: rgba(250, 250, 250, 1);
        height: 55px;
        line-height: 55px;
        width: 100%;
        border-bottom: 1px solid #ddd;
        strong {
          margin: 0;
          padding-left: 20px;
          line-height: 40px;
        }
      }
    }
    .tab {
      font-size: 20px;
      display: inline-block;
      height: 50px;
      line-height: 50px;
    }
    .follower {
      padding: 15px;
      background-color: #fff;
      margin-top: 15px;
    }
  }
}
</style>
