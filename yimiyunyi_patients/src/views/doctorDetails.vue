<template lang="pug">
  .lg-container(v-wechat-title="$route.meta.title")
    .doctor-container
      .doctor-container-bg
        .doctor-info
          .doctor-info-avatar
            img(v-if="!doctorInfo.avatar&&!doctorInfo.sex" src="@/assets/team/doctor_man.jpg")
            img(v-else-if="!doctorInfo.avatar&&doctorInfo.sex" src="@/assets/team/doctor_woman.jpg")
            img(v-else :src="doctorInfo.avatar")
          .doctor-info-box
            .doctor-name {{doctorInfo.doctorName || '暂无名称'}}
            .doctor-info-box-more.mt8.mb8
              span.doctor-info-box-more-hospital.mr5 {{doctorInfo.doctorHospital || '暂无所在医院'}}
              span.doctor-info-box-more-level(v-if="doctorInfo.hospitalLevel") {{doctorInfo.hospitalLevel}}
            .doctor-info-box-more
              span.doctor-info-box-more-department.mr5 {{doctorInfo.department || '暂无所在科室'}}
              span.doctor-info-box-more-professionCall {{doctorInfo.professionCallShow || '暂无职称'}}
    .doctor-info-more
      .doctor-info-more-head
        img.doctor-info-more-head-introduction(src="@/assets/team/introduction.png")
        span.doctor-info-more-head-title 医生简介
      .doctor-info-more-con {{doctorInfo.introduction || '暂无医生简介'}}
    .doctor-info-more
      .doctor-info-more-head
        img.doctor-info-more-head-operation(src="@/assets/team/operation.png")
        span.doctor-info-more-head-title 擅长手术
      .doctor-info-more-con {{doctorInfo.operation || '暂无擅长手术'}}
    .doctor-info-more
      .doctor-info-more-head
        img.doctor-info-more-head-disease(src="@/assets/team/disease.png")
        span.doctor-info-more-head-title 擅长疾病
      .doctor-info-more-con {{doctorInfo.disease || '暂无擅长疾病'}}
    .doctor-info-more
      .doctor-info-more-head
        img.doctor-info-more-head-certificate(src="@/assets/team/certificate.png")
        span.doctor-info-more-head-title 荣誉证书
      .doctor-info-more-con(v-if="doctorInfo.honorCertificates.length === 0")
        span.lg-null 暂无荣誉证书
      .doctor-info-more-con(v-else)
        .doctor-info-more-con-item(v-for="(item, index) in doctorInfo.honorCertificates" :key="index" @click="onPreview(index)")
          img(:src="item")
</template>
<script>
import { getDoctorInfo } from '@/api/team'
import { Toast, ImagePreview } from 'vant'
export default {
  data () {
    return {
      doctorInfo: {
        honorCertificates: []
      }
    }
  },
  mounted () {
    this.getDoctorInfo()
  },
  methods: {
    getDoctorInfo () {
      getDoctorInfo(this.$route.query.doctorId).then(res => {
        if (res.code === 200) {
          if (res.info) {
            this.doctorInfo = res.info
            this.doctorInfo.honorCertificates = this.doctorInfo.honorCertificates ? this.doctorInfo.honorCertificates.split(',') : []
          }
        } else {
          Toast.fail(res.msg)
        }
      })
    },
    onPreview (index) {
      ImagePreview({
        images: this.doctorInfo.honorCertificates,
        startPosition: index
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.lg-container {
  .doctor-container {
    padding: 10px;
    width: 100vw;
    box-sizing: border-box;
    &-bg {
      background: linear-gradient(
        -90deg,
        rgba(92, 204, 205, 1),
        rgba(3, 169, 172, 1)
      );
      width: 100%;
      height: 90px;
      padding: 10px;
      box-sizing: border-box;
      border-radius: 5px;
      .doctor-info {
        width: 100%;
        display: flex;
        align-items: center;
        &-avatar {
          border-radius: 50%;
          overflow: hidden;
          width: 65px;
          height: 65px;
          img {
            width: 65px;
            height: 65px;
            object-fit: cover;
          }
        }
        &-box {
          display: flex;
          flex: 1;
          flex-direction: column;
          margin: 0 10px;
          .doctor-name {
            color: #ffffff;
            font-size: 15px;
          }
          &-more {
            display: flex;
            align-items: center;
            &-level {
              background-color: #ffbb3f;
              font-size: 10px;
              color: #ffffff;
              padding: 3px 8px;
              line-height: 10px;
              border-radius: 8px;
            }
            &-hospital {
              color: #ffffff;
              font-size: 12px;
              line-height: 10px;
            }
            &-department {
              color: #ffffff;
              font-size: 12px;
              line-height: 10px;
            }
            &-professionCall {
              color: #ffffff;
              font-size: 12px;
              line-height: 10px;
            }
          }
        }
      }
    }
  }
  .doctor-info-more {
    width: 100vw;
    background-color: #fff;
    padding: 15px 20px;
    box-sizing: border-box;
    margin-bottom: 1px;
    &-head {
      display: flex;
      align-items: center;
      &-introduction {
        width: 12px;
        height: 13px;
      }
      &-operation {
        width: 14px;
        height: 14px;
      }
      &-disease {
        width: 15px;
        height: 14px;
      }
      &-certificate {
        width: 14px;
        height: 13px;
      }
      &-title {
        color: #333333;
        font-size: 13px;
        margin-left: 8px;
      }
    }
    &-con {
      color: #888888;
      font-size: 12px;
      line-height: 14px;
      margin-top: 10px;
      display: flex;
      justify-content: flex-start;
      flex-wrap: wrap;
      &-item {
        width: 70px;
        height: 70px;
        border-radius: 5px;
        overflow: hidden;
        margin-bottom: 14px;
        margin-right: 14px;
        &:nth-child(4n) {
          margin-right: 0;
        }
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
  }
}
</style>
