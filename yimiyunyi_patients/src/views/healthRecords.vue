<template lang="pug">
  .lg-container(v-wechat-title="$route.meta.title")
    .my-container
      .my-container-bg(@click="onNavHome")
        .my-info
          .my-info-avatar
            img(v-if="!myInfo.avatar&&!myInfo.sex" src="@/assets/team/man.jpg")
            img(v-else-if="!myInfo.avatar&&myInfo.sex" src="@/assets/team/woman.jpg")
            img(v-else :src="myInfo.avatar")
          .my-info-box
            .my-info-box-name {{myInfo.name}}
            .my-info-box-more
              router-link(:to="'/perfectInfo?openId='+myInfo.openId+'&title=补充个人资料'") {{title}}
          Icon.doctor-more(color="#FFFFFF" size="16" name="arrow")
    .records-filters
      .records-filters-time(:class="time.length>0?'w60':''" @click="isShow=true")
        span.title.text-dark(v-if="time.length>0") {{time[0]}}至{{time[1]}}
        span.title(v-else) 就诊时间
        Icon.doctor-more(color="#B9B9B9" size="16" :name="timeIcon")
      .records-filters-department(@click="isDepartmentShow=true")
        span.title.text-dark(v-if="departmentName !== ''") {{departmentName}}
        span.title(v-else) 就诊科室
        Icon.doctor-more(color="#B9B9B9" size="16" :name="departmentIcon")
      .records-filters-reset.color-main(@click="onReset") 重置
    .records-box(v-if="list.length>0")
      .records-box-list
        .records-box-list-item(v-for="(item, index) in list" :key="index" @click="onEditor(item)")
          .records-box-list-item-left
            img(src="@/assets/mine/records.png")
            span.records-name {{item.departmentName}}
          .records-box-list-item-right {{item.visitTime | parseTime('{y}-{m}-{d}')}}
    .select-filter-null(v-else) 暂无数据
    Button.lg-add-btn(type="primary" icon="add-o" @click="onAdd" color="#03A9AC") 新增
    Calendar(v-model="isShow" ref="calendar" title="就诊时间" :round="false" color="rgb(3, 169, 172)" :min-date="minDate" :max-date="maxDate" type="range" @confirm="onConfirm")
    lg-picker(:isShow="isDepartmentShow" v-model="departmentName" :columns="departmentList" @cancel="onDepartmentCancel" @confirm="onDepartmentConfirm")
</template>
<script>
import { Icon, Button, Calendar, Toast } from 'vant'
import { readId, getDepartmentLists, getCaseList } from '@/api/info'
export default {
  components: { Icon, Button, Calendar },
  data () {
    return {
      title: '个人资料',
      myInfo: {
        id: ''
      },
      isShow: false,
      minDate: this.getMinDate(),
      maxDate: new Date(),
      time: [],
      timeIcon: 'arrow-down',
      departmentIcon: 'arrow-down',
      list: [],
      // 科室
      isDepartmentShow: false,
      departmentList: [],
      prop: {
        label: 'label',
        value: 'name',
        children: 'hospitalDepartmentList'
      },
      departmentName: ''
    }
  },
  mounted () {
    this.myInfo.id = this.$route.query.id
    this.readInfo()
    this.getMinDate()
    this.getDepartmentLists()
    this.getCaseList()
  },
  watch: {
    isShow (newVal) {
      if (newVal) {
        this.timeIcon = 'arrow-up'
      } else {
        this.timeIcon = 'arrow-down'
      }
    },
    isDepartmentShow (newVal) {
      if (newVal) {
        this.departmentIcon = 'arrow-up'
      } else {
        this.departmentIcon = 'arrow-down'
      }
    }
  },
  methods: {
    // 获取科室
    getDepartmentLists () {
      const data = {
        patientId: this.myInfo.id
      }
      getDepartmentLists(data).then(res => {
        if (res.code === 200) {
          if (res.info) {
            const departmentList = [...new Set(res.info)]
            const list = []
            departmentList.map(e => {
              list.push({
                text: e
              })
            })
            this.departmentList = list
          }
        } else {
          Toast.fail(res.msg)
        }
      })
    },
    getCaseList () {
      const data = {
        departmentName: this.departmentName,
        endTime: this.time[1],
        startTime: this.time[0]
      }
      getCaseList(this.myInfo.id, data).then(res => {
        if (res.code === 200) {
          this.list = res.list
        } else {
          Toast.fail(res.msg)
        }
      })
    },
    onReset () {
      this.time = []
      this.departmentName = ''
      this.$refs.calendar.reset()
      this.getCaseList()
    },
    onAdd () {
      this.$router.push('/caseHistory?patientId=' + this.myInfo.id + '&isHeadlth=1')
    },
    onEditor (row) {
      this.$router.push('/caseHistory?id=' + row.id + '&isHeadlth=1')
    },
    getMinDate () {
      const pre = new Date()
      return new Date(pre.setFullYear(pre.getFullYear() - 1))
    },
    onConfirm (data) {
      this.time[0] = this.parseTime(data[0], '{y}-{m}-{d}')
      this.time[1] = this.parseTime(data[1], '{y}-{m}-{d}')
      this.isShow = false
      this.getCaseList()
    },
    onDepartmentConfirm (val) {
      this.departmentName = val
      this.isDepartmentShow = false
      this.getCaseList()
    },
    onDepartmentCancel () {
      this.isDepartmentShow = false
    },
    onNavHome () {
      this.$router.push('/perfectInfo?openId=' + this.myInfo.openId + '&title=' + this.title)
    },
    readInfo () {
      readId(this.myInfo.id).then(res => {
        if (res.code === 200) {
          this.myInfo = res.info
          const obj = {
            name: '', // 姓名
            phone: '', // 手机号
            sexShow: '', // 性别
            birthday: '', // 出生日期
            height: '', // 身高
            weight: '', // 体重
            bim: '', // BIM
            waistline: '', // 腰围
            smoker: '', // 吸烟史
            drinker: '', // 饮酒史
            liver: '', // 肝功能
            kidney: '', // 肾功能
            marryStatus: '', // 婚姻状况
            fertilityState: '', // 生育状况
            chronicDisease: [], // 慢性病
            familyDisease: [], // 家族病史
            drugAllergy: [], // 药物过敏
            foodAllergy: [], // 食物/接触物过敏
            habit: [] // 个人习惯
          }
          for (const key in obj) {
            if (this.myInfo.hasOwnProperty(key)) {
              if (this.myInfo[key] === '' || this.myInfo[key] === null || this.myInfo[key].length === 0) {
                this.title = '补充个人资料'
              }
            }
          }
        } else {
          Toast.fail(res.msg)
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.lg-container {
  padding-bottom: 44px;
  box-sizing: border-box;
  position: relative;
  .my-container {
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
      .my-info {
        width: 100%;
        display: flex;
        align-items: center;
        &-avatar {
          img {
            width: 65px;
            height: 65px;
          }
        }
        &-box {
          display: flex;
          flex: 1;
          flex-direction: column;
          margin: 0 10px;
          &-name {
            color: #FFFFFF;
            font-size: 15px;
            margin-bottom: 13px;
          }
          &-more {
            a {
              color: #ffffff;
              font-size: 12px;
              line-height: 12px;
              text-decoration: underline;
            }
          }
        }
      }
    }
  }
  .records-filters {
    display: flex;
    width: 100%;
    height: 40px;
    background-color: #fff;
    align-items: center;
    padding: 0 10px;
    box-sizing: border-box;
    &-time {
      width: 50%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      &.w60 {
        width: 60%;
      }
      .title {
        color: #888888;
        font-size: 13px;
        margin-right: 5px;
      }
    }
    &-department {
      flex: 1;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      .title {
        color: #888888;
        font-size: 12px;
        margin-right: 5px;
      }
    }
    &-reset {
      font-size: 13px;
      padding: 6px 4px;
    }
  }
  .records-box {
    background-color: #fff;
    height: calc(100vh - 194px);
    overflow-y: scroll;
    &-list {
      &-item {
        height: 55px;
        border-top: 1px solid #f4f4f4;
        padding: 0 20px;
        box-sizing: border-box;
        width: 100vw;
        display: flex;
        justify-content: space-between;
        align-items: center;
        &-left {
          flex: 1;
          display: flex;
          align-items: center;
          img {
            width: 20px;
            height: 25px;
          }
          .records-name {
            color: #333333;
            font-size: 15px;
            margin-left: 10px;
            width: 200px;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
          }
        }
        &-right {
          color: #888888;
          font-size: 12px;
           margin-left: 10px;
        }
      }
    }
  }
  .lg-add-btn {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100vw;
    border-radius: 0;
    z-index: 999;
  }
}
</style>
