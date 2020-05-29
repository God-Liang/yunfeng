<template lang="pug">
  .lg-container
    lgExhibition(:exhibitionData="exhibitionData" @click="clickShow")
    .lg-container-white
      .filter-container
        el-radio-group.filter-item(v-model="filters.verifyStatus" @change="change")
          el-radio-button(label="") 全部
          el-radio-button(label="2") 待认证
          el-radio-button(label="1") 已认证
          el-radio-button(label="0") 已拒绝
          //- el-radio-button(label="3") 已注销
        el-input.filter-item.w250(v-model="filters.keyWord" suffix-icon="el-icon-search" placeholder="请输入提交人账号/昵称/内容" @keyup.enter.native="handleFilter")

      lgTable(columns-type="index"
            style="height:calc(100% - 55px)"
            columns-label="序号"
            :list="list"
            :total-list="total"
            :lg-thead="doctor.tableAttr.thead"
            :lg-buttons="doctor.tableAttr.buttons"
            @operationEvent0="operationEvent0"
            @operationEvent1="operationEvent1"
            @operationEvent2="operationEvent2"
            @operationEvent3="operationEvent3"
            @operationEvent4="operationEvent4"
            @initListQuery="initListQuery"
            @getListByPagination="getListByPagination")
      lgDialog(title="认证"
            :visible="dialogFormVisible"
            width="1000px"
            :value="dataForm"
            :action="false"
            @on-submit="handleCreateOrUpdate"
            @on-close="onClose")
            template
              div.topInfo
                img(:src="dataForm.avatar")
                div.info
                  div.name {{dataForm.name}}
                    span {{dataForm.yimiNumber}}
                  ul
                    li
                      div.label 所在医院：
                      div.value {{dataForm.doctorHospital}}
                    li
                      div.label 所在科室：
                      div.value {{dataForm.department}}
                    li
                      div.label 联系电话：
                      div.value {{dataForm.phone}}
                    li
                      div.label 职称：
                      div.value {{dataForm.professionCallShow}}
                    li
                      div.label 年龄：
                      div.value {{dataForm.age}}岁
                    li
                      div.label 注册时间：
                      div.value {{dataForm.createTime}}
              ul.cers
                li
                  div.tit 胸牌/工作证
                  img(v-if="dataForm.authUrl2" :src="dataForm.authUrl2")
                  .imgNull(v-else)
                li
                  div.tit 医师资格证
                  img(v-if="dataForm.authUrl1" :src="dataForm.authUrl1")
                  .imgNull(v-else)
                li
                  div.tit 医师执业证
                  img(v-if="dataForm.professionUrl" :src="dataForm.professionUrl")
                  .imgNull(v-else)
                li
                  div.tit 医生职称证
                  img(v-if="dataForm.jobUrl" :src="dataForm.jobUrl")
                  .imgNull(v-else)
              div.btns
                //- el-button(@click="onClose") 取消
                el-button(type="info" @click="refuse") 拒绝
                el-button(type="primary" @click="approve") 认证
</template>
<script>
import { doctor } from './columnsConst'
import lgTable from '@/views/components/lgTable'
import lgDialog from '@/views/components/lgDialog'
import lgExhibition from '@/views/components/lgExhibition'
import { list, statistics, createOrUpdate } from '@/api/common'
import { info, refuse, famousDoctor } from '@/api/doctor'
export default {
  name: 'ComponentName',
  components: { lgTable, lgDialog, lgExhibition },
  data() {
    return {
      doctor,
      apiUri: 'adminDoctor',
      num: {},
      list: [],
      total: 0,
      filters: {
        verifyStatus: '',
        keyWord: ''
      },
      listQuery: {
        current: 1,
        pageSize: 10
      },
      dialogFormVisible: false,
      dataForm: {},
      exhibitionData: []
    }
  },
  mounted() {
    this.getStatistics()
    this.getList()
  },
  methods: {
    getStatistics() {
      statistics(this.apiUri).then((res) => {
        if (res.code === 200) {
          this.num = res.info
          this.exhibitionData = [{
            ratio: 12,
            img: require('@/assets/img/s_1.png'),
            num: this.num.certifiedPhysician,
            unit: '个',
            title: '待认证医生'
          }, {
            ratio: 12,
            img: require('@/assets/img/t_2.png'),
            num: this.num.famousDoctorNum,
            unit: '个',
            title: '名医数量/医生人数'
          }]
          // {
          //   ratio: 8,
          //   img: require('@/assets/img/t_3.png'),
          //   num: this.num.logoutDoctor,
          //   unit: '个',
          //   title: '注销医生'
          // }
        }
      })
    },
    getList() {
      const params = Object.assign({}, this.listQuery, this.filters)
      list(this.apiUri, params).then((res) => {
        if (res.code === 200) {
          this.list = res.list
          this.total = res.total
        }
      })
    },
    change() {
      this.getList()
    },
    clickShow(data) {
      console.log(data)
      if (data.index === 0) {
        this.filters.verifyStatus = '2'
        this.handleFilter()
      }
    },
    handleFilter() {
      this.getList()
    },
    // 初始化页数与条数
    initListQuery(listQuery) {
      this.listQuery = listQuery
    },
    // 分页操作
    getListByPagination(listQuery) {
      this.listQuery = listQuery
      this.getList()
    },
    operationEvent0(row) {
      this.dialogFormVisible = true
      info(row.id).then((res) => {
        this.dataForm = res.info.doctor
        this.dataForm.name = res.info.user.nick
        this.dataForm.avatar = res.info.user.avatar
        this.dataForm.phone = res.info.user.phone
        this.dataForm.createTime = res.info.user.createTime
        this.dataForm.age =
          new Date().getFullYear() -
          new Date(res.info.user.birthday).getFullYear()
      })
    },
    // 查看
    operationEvent1(row) {
      this.$router.push({ path: `/details/doctorDetial/${row.id}` })
    },
    // 设置名医
    operationEvent2(row) {
      const data = {
        id: row.id,
        type: 1
      }
      famousDoctor(data).then(res => {
        this.$notify({
          title: '成功',
          message: '设置成功',
          type: 'success',
          duration: 2000
        })
        this.getList()
      })
    },
    // 取消名医
    operationEvent3(row) {
      const data = {
        id: row.id,
        type: 0
      }
      famousDoctor(data).then(res => {
        this.$notify({
          title: '成功',
          message: '取消成功',
          type: 'success',
          duration: 2000
        })
        this.getList()
      })
    },
    operationEvent4(row) {
      this.$alert(row.reason || '无', '拒绝理由', {
        confirmButtonText: '确定',
        callback: action => {}
      })
    },
    handleCreateOrUpdate() {},
    // 关闭弹窗
    onClose() {
      this.dialogFormVisible = false
    },
    refuse() {
      this.$prompt('', '填写拒绝理由', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputValidator: (value) => { // 点击按钮时，对文本框里面的值进行验证
          if (!value) {
            return '拒绝理由不能为空！'
          }
        }
      })
        .then(({ value }) => {
          const data = { id: this.dataForm.id, reason: value }
          refuse(data).then((res) => {
            if (res.code === 200) {
              this.$notify({
                title: '成功',
                message: '拒绝成功',
                type: 'success',
                duration: 2000
              })
              this.dialogFormVisible = false
              this.getList()
            }
          })
        })
        .catch(() => {})

      // this.dialogFormVisible = false
    },
    approve() {
      const data = {
        id: this.dataForm.id,
        verifyStatus: 1
      }
      createOrUpdate(this.apiUri, data).then((res) => {
        if (res.code === 200) {
          this.$notify({
            title: '成功',
            message: '认证成功',
            type: 'success',
            duration: 2000
          })
          this.dialogFormVisible = false
          this.getList()
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
@import '@/styles/mixin.scss';

.lg-container-white {
  margin-top: 20px;
  height: calc(100% - 140px);
  .filter-container {
    display: flex;
    justify-content: space-between;
    .w400 {
      width: 400px;
      margin-left: 20px;
    }
  }
}
/deep/ .el-dialog__body {
  border-top: 1px solid #e4e4e4;
}
.topInfo {
  display: flex;
  justify-content: flex-start;
  img {
    display: block;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: #e4e4e4;
    margin-right: 20px;
  }
  .info {
    width: 900px;
    .name {
      font-size: 20px;
      font-weight: bold;
      span {
        font-size: 16px;
        color: #888;
        padding-left: 10px;
        font-weight: normal;
      }
    }
    ul {
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      font-size: 16px;
      color: #888;
      margin-top: 10px;
      margin-bottom: 50px;
      li {
        display: flex;
        justify-content: flex-start;
        margin: 5px 0;
        height: 24px;
        line-height: 24px;
        .label {
          width: 80px;
          text-align: justify;
          display: inline-block;
          vertical-align: top;
          &::after {
            display: inline-block;
            width: 100%;
            content: '';
            height: 0;
          }
        }
        .value {
          width: 220px;
          @include ellipsis(1);
        }
      }
    }
  }
}
.cers {
  margin-bottom: 40px;
  display: flex;
  justify-content: space-around;
  li {
    .tit {
      position: relative;
      line-height: 20px;
      padding-left: 10px;
      margin-bottom: 20px;
      &::after {
        position: absolute;
        left: 0;
        top: 0;
        display: block;
        content: '';
        width: 2px;
        height: 20px;
        background: #14b0b2;
      }
    }
    img {
      width: 180px;
      height: 180px;
      background: #e4e4e4;
      border-radius: 5px;
      object-fit: cover;
    }
    .imgNull {
      width: 180px;
      height: 180px;
      background: #e4e4e4;
      border-radius: 5px;
    }
  }
}
.btns {
  text-align: right;
}
</style>
