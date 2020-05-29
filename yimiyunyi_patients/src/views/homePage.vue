<template lang="pug">
  .lg-container(v-wechat-title="$route.meta.title")
    //- h2.van-doc-demo-block__title.required 以下是必填选项
    CellGroup.mb10
      Cell.h60(title="头像")
        template(#right-icon)
          img.img(v-if="data.avatar" :src="data.avatar" )
          img.img(v-else src="@/assets/team/man.jpg" )
      Field.h40(v-model="data.name" label="姓名" input-align="right" right-icon readonly placeholder="无")
      Field.h40(v-model="data.phone" label="手机号" input-align="right" right-icon readonly placeholder="无")
      Field.h40(v-model="data.sexShow" label="性别" input-align="right" readonly placeholder="请选择")
      Field.h40(v-model="data.birthday" label="出生日期" input-align="right" readonly placeholder="请选择")
      Field.h40(v-model="data.identity" label="身份证号" input-align="right" placeholder="请输入")
      Field.h40(v-model="data.address" label="家庭住址" input-align="right" placeholder="请输入")
    //- h2.van-doc-demo-block__title 以下是选填选项
    CellGroup.mb10
      Field.h40(v-model="data.height" label="身高(cm)" input-align="right" right-icon="arrow" readonly @click="onHeight" placeholder="请选择")
      Field.h40(v-model="data.weight" label="体重(kg)" input-align="right" right-icon="arrow" readonly @click="onWeight" placeholder="请选择")
      Field.pr24.h40(v-model="data.bim" label="BIM" input-align="right" right-icon readonly placeholder="系统自动计算")
      Field.h40(v-model="data.waistline" label="腰围(cm)" input-align="right" right-icon="arrow" readonly @click="onWaistline" placeholder="请选择")
      Field.h40(v-model="data.smoker" label="吸烟史" input-align="right" right-icon="arrow" readonly @click="onSmoker" placeholder="请选择")
      Field.h40(v-model="data.drinker" label="饮酒史" input-align="right" right-icon="arrow" readonly @click="onDrinker" placeholder="请选择")
      Field.h40(v-model="data.liver" label="肝功能" input-align="right" right-icon="arrow" readonly @click="onLiver" placeholder="请选择")
      Field.h40(v-model="data.kidney" label="肾功能" input-align="right" right-icon="arrow" readonly @click="onKidney" placeholder="请选择")
      Field.h40(v-model="data.marryStatus" label="婚姻状况" input-align="right" right-icon="arrow" readonly @click="onMarryStatus" placeholder="请选择")
      Field.h40(v-model="data.fertilityState" label="生育状况" input-align="right" right-icon="arrow" readonly @click="onFertilityState" placeholder="请选择")
    //- CellGroup.mb10
    //-   .section-info
    //-     .section-title 慢性病
    //-     .section-list
    //-       .section-item(:class="data.chronicDisease.includes(item) ? 'active' : ''" v-for="(item, index) in chronicDiseaseColumns" :key="index" @click="selectChronicDisease(item)") {{item}}
    //-     .section-other
    //-       Field.h40(placeholder="请输入补充内容" v-model="chronicDiseaseMore" clearable)
    //- CellGroup.mb10
    //-   .section-info
    //-     .section-title 家族病史
    //-     .section-list
    //-       .section-item(:class="data.familyDisease.includes(item) ? 'active' : ''" v-for="(item, index) in familyDiseaseColumns" :key="index" @click="selectFamilyDisease(item)") {{item}}
    //-     .section-other
    //-       Field.h40(placeholder="请输入补充内容" v-model="familyDiseaseMore" clearable)
    //- CellGroup.mb10
    //-   .section-info
    //-     .section-title 药物过敏
    //-     .section-list
    //-       .section-item(:class="data.drugAllergy.includes(item) ? 'active' : ''" v-for="(item, index) in drugAllergyColumns" :key="index" @click="selectDrugAllergy(item)") {{item}}
    //-     .section-other
    //-       Field.h40(placeholder="请输入补充内容" v-model="drugAllergyMore" clearable)
    //- CellGroup.mb10
    //-   .section-info
    //-     .section-title 食物/接触物过敏
    //-     .section-list
    //-       .section-item(:class="data.foodAllergy.includes(item) ? 'active' : ''" v-for="(item, index) in foodAllergyColumns" :key="index" @click="selectFoodAllergy(item)") {{item}}
    //-     .section-other
    //-       Field.h40(placeholder="请输入补充内容" v-model="foodAllergyMore" clearable)
    //- CellGroup.mb10
    //-   .section-info
    //-     .section-title 个人习惯
    //-     .section-list
    //-       .section-item(:class="data.habit.includes(item) ? 'active' : ''" v-for="(item, index) in habitColumns" :key="index" @click="selectHabit(item)") {{item}}
    //-     .section-other
    //-       Field.h40(placeholder="请输入补充内容" v-model="habitMore" clearable)
    CellGroup.mb10.section
      h5.title
        .title_box.bgc1
          img.title_img.title_img1(src="@/assets/mine/info2.png")
        span.title_txt.bgc1 家族病史
      CheckboxGroup.section-list(v-model="data.familyDisease")
        Checkbox.section-item(icon-size="14px" shape="square" checked-color="#03a9ac" v-for="(item, index) in familyDiseaseColumns" :key="index" :name="item") {{item}}
    CellGroup.mb10.section
      h5.title
        .title_box.bgc2
          img.title_img.title_img2(src="@/assets/mine/info4.png")
        span.title_txt.bgc2 药物过敏
      CheckboxGroup.section-list(v-model="data.drugAllergy")
        Checkbox.section-item(icon-size="14px" shape="square" checked-color="#03a9ac" v-for="(item, index) in drugAllergyColumns" :key="index" :name="item") {{item}}
    CellGroup.mb10.section
      h5.title
        .title_box.bgc3
          img.title_img.title_img3(src="@/assets/mine/info1.png")
        span.title_txt.bgc3 食物/接触物过敏
      CheckboxGroup.section-list(v-model="data.foodAllergy")
        Checkbox.section-item(icon-size="14px" shape="square" checked-color="#03a9ac" v-for="(item, index) in foodAllergyColumns" :key="index" :name="item") {{item}}
    CellGroup.mb10.section
      h5.title
        .title_box.bgc4
          img.title_img.title_img4(src="@/assets/mine/info3.png")
        span.title_txt.bgc4 个人习惯
      CheckboxGroup.section-list(v-model="data.habit")
        Checkbox.section-item(icon-size="14px" shape="square" checked-color="#03a9ac" v-for="(item, index) in habitColumns" :key="index" :name="item") {{item}}
    Button.lg-next-step(type="primary" @click="onNextStep" color="#03A9AC") {{title}}
    lg-picker(:isShow="showPicker" :defaultIndex="defaultIndex" :columns="columns" @cancel="onCancel" @confirm="onConfirm")
    lg-datetime-picker(v-model="data.birthday" :isShow="isShow" :max-date="maxDate" @confirm="onBirthdayConfirm" @cancel="isShow=false")
</template>
<script>
import { Field, Cell, CellGroup, Button, Toast, Checkbox, CheckboxGroup } from 'vant'
import { readOpenId, myUpdate, getUserWxInfo } from '@/api/info'
const heightColumns = []
for (let index = 0; index < 250; index++) {
  heightColumns.push({
    text: index
  })
}
const weightColumns = []
for (let index = 0; index < 200; index++) {
  weightColumns.push({
    text: index
  })
}
const waistlineColumns = []
for (let index = 0; index < 200; index++) {
  waistlineColumns.push({
    text: index
  })
}
export default {
  components: { Field, Cell, CellGroup, Button, Checkbox, CheckboxGroup },
  watch: {
    data: {
      handler (newVal, oldVal) {
        if (newVal.height && newVal.weight) {
          this.data.bim = (newVal.weight / ((newVal.height / 100) * (newVal.height / 100))).toFixed(2)
        }
      },
      deep: true
    }
  },
  data () {
    return {
      minDate: new Date(1900, 0, 1),
      maxDate: new Date(),
      title: '',
      data: {
        avatar: null, // 头像
        openId: '',
        id: null,
        name: '', // 姓名
        phone: '', // 手机号
        identity: '', // 身份证
        address: '', // 家庭住址
        sex: null, // 性别ID
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
      },
      chronicDiseaseMore: '', // 慢性病更多
      familyDiseaseMore: '', // 家族病史更多
      drugAllergyMore: '', // 药物过敏更多
      foodAllergyMore: '', // 食物/接触物过敏更多
      habitMore: '', // 个人习惯更多
      isShow: false,
      showPicker: false,
      columns: [],
      parameter: '',
      defaultIndex: 0,
      sexColumns: [{
        text: '男'
      },
      {
        text: '女'
      }],
      isNormalColumns: [{
        text: '正常'
      },
      {
        text: '异常'
      }], // 正常、异常
      isHaveColumns: [{
        text: '无'
      },
      {
        text: '有'
      }], // 有、无
      marryStatusColumns: [{
        text: '未婚'
      },
      {
        text: '已婚'
      },
      {
        text: '其他'
      }], // 婚姻状况选项
      fertilityStateColumns: [{
        text: '未生育'
      },
      {
        text: '备孕期'
      },
      {
        text: '怀孕期'
      },
      {
        text: '已生育'
      }], // 生育状况选项
      chronicDiseaseColumns: ['暂无', '高血压', '糖尿病', '心脏病', '过敏性疾病', '哮喘', '白癜风', '癫痫', '其他'], // 慢性病选项
      familyDiseaseColumns: ['暂无', '高血压', '糖尿病', '心脏病', '脑梗', '癌症', '哮喘', '白癜风', '癫痫', '近视', '其他'], // 家族病史选项
      drugAllergyColumns: ['暂无', '青霉素', '头孢类', '破伤风抗霉素', '普鲁卡因', '地卡因', '磺胺类', '维生素B1', '泛影葡胺', '阿西匹林', '其他'], // 药物过敏选项
      foodAllergyColumns: ['暂无', '芒果', '牛奶', '坚果类', '海鲜', '黄瓜', '花粉', '油漆', '动物皮毛', '化妆品', '其他'], // 食物/接触物过敏选项
      habitColumns: ['低头族', '久坐', '久站', '强忍大小便', '喝酒', '熬夜', '跷二郎腿', '吸烟', '饭后卧床', '不常锻炼', '如厕玩手机', '不喜喝水', '其他'] // 个人习惯选项
    }
  },
  mounted () {
    this.data.openId = this.$route.query.openId
    this.readInfo()
    if (this.$route.query.title) {
      this.title = '保存'
    } else {
      this.title = '下一步'
    }
  },
  methods: {
    readInfo () {
      readOpenId(this.data.openId).then(res => {
        if (res.code === 200) {
          if (!res.info || !res.info.phone) {
            this.$router.push('/?openId=' + this.data.openId)
          }
          this.data = res.info
          // 慢性病
          if (!this.data.chronicDisease) {
            this.data.chronicDisease = []
            this.chronicDiseaseMore = ''
          } else {
            const chronicDiseaseArr = this.data.chronicDisease.split('&')
            this.data.chronicDisease = chronicDiseaseArr[0] ? chronicDiseaseArr[0].split(',') : []
            if (chronicDiseaseArr.length === 2) {
              this.chronicDiseaseMore = chronicDiseaseArr[1]
            }
          }
          // 家族病史
          if (!this.data.familyDisease) {
            this.data.familyDisease = []
            this.familyDiseaseMore = ''
          } else {
            const familyDiseaseArr = this.data.familyDisease.split('&')
            this.data.familyDisease = familyDiseaseArr[0] ? familyDiseaseArr[0].split(',') : []
            if (familyDiseaseArr.length === 2) {
              this.familyDiseaseMore = familyDiseaseArr[1]
            }
          }
          // 药物过敏
          if (!this.data.drugAllergy) {
            this.data.drugAllergy = []
            this.drugAllergyMore = ''
          } else {
            const drugAllergyArr = this.data.drugAllergy.split('&')
            this.data.drugAllergy = drugAllergyArr[0] ? drugAllergyArr[0].split(',') : []
            if (drugAllergyArr.length === 2) {
              this.drugAllergyMore = drugAllergyArr[1]
            }
          }
          // 食物/接触物过敏
          if (!this.data.foodAllergy) {
            this.data.foodAllergy = []
            this.foodAllergyMore = ''
          } else {
            const foodAllergyArr = this.data.foodAllergy.split('&')
            this.data.foodAllergy = foodAllergyArr[0] ? foodAllergyArr[0].split(',') : []
            if (foodAllergyArr.length === 2) {
              this.foodAllergyMore = foodAllergyArr[1]
            }
          }
          // 个人习惯
          if (!this.data.habit) {
            this.data.habit = []
            this.habitMore = ''
          } else {
            const habitArr = this.data.habit.split('&')
            this.data.habit = habitArr[0] ? habitArr[0].split(',') : []
            if (habitArr.length === 2) {
              this.habitMore = habitArr[1]
            }
          }
          getUserWxInfo({ openId: this.data.openId }).then(res => {
            console.log(res)
            if (res.code === 200) {
              this.data.avatar = res.info.headimgurl
            }
          })
        } else {
          Toast.fail(res.msg)
        }
      })
    },
    onConfirm (value) {
      this.showPicker = false
      this.data[this.parameter] = value
      // 性别处理
      if (this.parameter === 'sexShow') {
        this.sexColumns.map((v, i) => {
          if (v.text === this.data.sexShow) {
            this.data.sex = i
          }
        })
      }
      // 还原默认
      this.columns = []
      this.defaultIndex = 0
    },
    onCancel () {
      this.showPicker = false
      // 还原默认
      this.columns = []
      this.defaultIndex = 0
    },
    // 表单提交
    onNextStep () {
      const formData = Object.assign({}, this.data)
      formData.chronicDisease = (formData.chronicDisease.length > 0 ? formData.chronicDisease.join(',') : '') + '&' + this.chronicDiseaseMore
      formData.familyDisease = (formData.familyDisease.length > 0 ? formData.familyDisease.join(',') : '') + '&' + this.familyDiseaseMore
      formData.drugAllergy = (formData.drugAllergy.length > 0 ? formData.drugAllergy.join(',') : '') + '&' + this.drugAllergyMore
      formData.foodAllergy = (formData.foodAllergy.length > 0 ? formData.foodAllergy.join(',') : '') + '&' + this.foodAllergyMore
      formData.habit = (formData.habit.length > 0 ? formData.habit.join(',') : '') + '&' + this.habitMore
      const rules = [
        { name: 'sexShow', type: 'required', errmsg: '请选择性别' },
        { name: 'birthday', type: 'required', errmsg: '请选择出生日期' },
        { name: 'identity', type: 'required', errmsg: '请输入身份证' },
        { name: 'address', type: 'required', errmsg: '请输入家庭住址' }
      ]
      const validateResult = this.$validate.validate(formData, rules)

      if (!validateResult.isOk) {
        Toast(validateResult.errmsg)
        return false
      }
      myUpdate(formData).then(res => {
        if (res.code === 200) {
          if (this.title === '保存') {
            this.$router.push('/homePage?openId=' + this.data.openId)
          } else {
            // 填写病例
            // this.$router.push('/myInfoStatus?id=' + this.data.id)
            // 我的医生
            this.$router.push('/myDoctor?id=' + this.data.id)
          }
        } else {
          Toast.fail(res.msg)
        }
      })
    },
    // 日期保存
    onBirthdayConfirm (val) {
      this.data.birthday = this.parseTime(val, '{y}-{m}-{d}')
      this.isShow = false
    },
    getDefaultIndex () {
      if (this.data[this.parameter]) {
        this.columns.map((v, i) => {
          if (v.text === this.data[this.parameter]) {
            this.defaultIndex = i
          }
        })
      } else {
        switch (this.parameter) {
          case 'height':
            this.defaultIndex = 170
            break
          case 'weight':
            this.defaultIndex = 60
            break
          case 'waistline':
            this.defaultIndex = 60
            break
          default:
            this.defaultIndex = 0
            break
        }
      }
    },
    // 性别
    onSexShow () {
      this.parameter = 'sexShow'
      this.columns = this.sexColumns
      this.getDefaultIndex()
      this.showPicker = true
    },
    // 身高
    onHeight () {
      this.parameter = 'height'
      this.columns = heightColumns
      this.getDefaultIndex()
      this.showPicker = true
    },
    // 体重
    onWeight () {
      this.parameter = 'weight'
      this.columns = weightColumns
      this.getDefaultIndex()
      this.showPicker = true
    },
    // 腰围
    onWaistline () {
      this.parameter = 'waistline'
      this.columns = waistlineColumns
      this.getDefaultIndex()
      this.showPicker = true
    },
    // 吸烟史
    onSmoker () {
      this.parameter = 'smoker'
      this.columns = this.isHaveColumns
      this.getDefaultIndex()
      this.showPicker = true
    },
    // 饮酒史
    onDrinker () {
      this.parameter = 'drinker'
      this.columns = this.isHaveColumns
      this.getDefaultIndex()
      this.showPicker = true
    },
    // 肝功能
    onLiver () {
      this.parameter = 'liver'
      this.columns = this.isNormalColumns
      this.getDefaultIndex()
      this.showPicker = true
    },
    // 肾功能
    onKidney () {
      this.parameter = 'kidney'
      this.columns = this.isNormalColumns
      this.getDefaultIndex()
      this.showPicker = true
    },
    // 婚姻状况
    onMarryStatus () {
      this.parameter = 'marryStatus'
      this.columns = this.marryStatusColumns
      this.getDefaultIndex()
      this.showPicker = true
    },
    // 生育状况
    onFertilityState () {
      this.parameter = 'fertilityState'
      this.columns = this.fertilityStateColumns
      this.getDefaultIndex()
      this.showPicker = true
    },
    // 慢性病
    selectChronicDisease (val) {
      if (this.data.chronicDisease.includes(val)) {
        this.data.chronicDisease.map((v, i) => {
          if (v === val) {
            this.data.chronicDisease.splice(i, 1)
          }
        })
      } else {
        this.data.chronicDisease.push(val)
      }
    },
    // 家族病史
    selectFamilyDisease (val) {
      if (this.data.familyDisease.includes(val)) {
        this.data.familyDisease.map((v, i) => {
          if (v === val) {
            this.data.familyDisease.splice(i, 1)
          }
        })
      } else {
        this.data.familyDisease.push(val)
      }
    },
    // 药物过敏
    selectDrugAllergy (val) {
      if (this.data.drugAllergy.includes(val)) {
        this.data.drugAllergy.map((v, i) => {
          if (v === val) {
            this.data.drugAllergy.splice(i, 1)
          }
        })
      } else {
        this.data.drugAllergy.push(val)
      }
    },
    // 食物/接触物过敏
    selectFoodAllergy (val) {
      if (this.data.foodAllergy.includes(val)) {
        this.data.foodAllergy.map((v, i) => {
          if (v === val) {
            this.data.foodAllergy.splice(i, 1)
          }
        })
      } else {
        this.data.foodAllergy.push(val)
      }
    },
    // 个人习惯
    selectHabit (val) {
      if (this.data.habit.includes(val)) {
        this.data.habit.map((v, i) => {
          if (v === val) {
            this.data.habit.splice(i, 1)
          }
        })
      } else {
        this.data.habit.push(val)
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.lg-container {
  .van-doc-demo-block__title {
    margin: 0;
    padding: 10px 20px;
    color: rgba(69, 90, 100, 0.6);
    font-weight: normal;
    font-size: 12px;
    &.required {
      position: relative;
      padding-left: 26px;
      &::before {
        position: absolute;
        left: 20px;
        top: 8px;
        color: #ee0a24;
        font-size: 14px;
        content: "*";
      }
    }
  }
  .img {
    width: 40px;
    height: 40px;
    margin-top: 10px;
    object-fit: cover;
    border-radius: 50%;
    overflow: hidden;
  }
}
</style>
<style lang="scss">
.lg-container {
  padding-bottom: 50px;
  box-sizing: border-box;
  .section {
    padding: 10px 0 0;
    h5.title {
      display: flex;
      align-items: center;
      padding: 0 20px;
      margin-bottom: 15px;
      .title_box {
        width: 20px;
        height: 20px;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 50%;
        overflow: hidden;
        background-color: #93c3f9;
        margin-right: 12px;
        &.bgc1 {
          background-color: #93c3f9;
        }
        &.bgc2 {
          background-color: #fdbb59;
        }
        &.bgc3 {
          background-color: #fa92ad;
        }
        &.bgc4 {
          background-color: #aa89bd;
        }
        .title_img1 {
          width: 14px;
          height: 11px;
        }
        .title_img2 {
          width: 12px;
          height: 12px;
        }
        .title_img3 {
          width: 12px;
          height: 11px;
        }
        .title_img4 {
          width: 12px;
          height: 10px;
        }
      }
      .title_txt {
        font-size: 15px;
        &.bgc1 {
          color: #93c3f9;
        }
        &.bgc2 {
          color: #fdbb59;
        }
        &.bgc3 {
          color: #fa92ad;
        }
        &.bgc4 {
          color: #aa89bd;
        }
      }
    }
    .section-list {
      padding: 0 20px;
      display: flex;
      flex-wrap: wrap;
      .section-item {
        width: 50%;
        font-size: 13px;
        color: #333333;
        margin-bottom: 10px;
      }
    }
  }

  // .section-info {
  //   .section-title {
  //     font-size: 13px;
  //     padding: 10px 20px;
  //   }
  //   .section-list {
  //     padding: 0 20px;
  //     display: flex;
  //     flex-wrap: wrap;
  //     .section-item {
  //       margin: 0 10px 10px 0;
  //       color: #ffffff;
  //       font-size: 10px;
  //       line-height: 10px;
  //       background: rgba(220, 220, 220, 1);
  //       border-radius: 8px;
  //       display: inline-block;
  //       padding: 4px 11px;
  //       &.active {
  //         background-color: #03a9ac;
  //       }
  //     }
  //   }
  //   .section-other {
  //     border-top: 1px solid #f4f4f4;
  //   }
  // }
  .lg-next-step {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100vw;
  }
}
</style>
