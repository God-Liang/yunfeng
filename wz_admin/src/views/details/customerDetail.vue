<template>
  <div class="app-container">
    <div class="tit">
      基本信息
      <el-button
        v-if="relieve"
        type="text fr"
        icon="el-icon-remove-outline"
        size="small"
      >解除关系</el-button>
    </div>
    <div class="info">
      <el-row class="row">
        <el-col :span="12">
          <div class="h_1 fl">企业LOGO:</div>
          <div class="h_2 fl">
            <img
              class="logo"
              :src="info.logo_url"
              alt=""
            >
          </div>
        </el-col>
        <el-col :span="12">
          <div class="h_1 fl">联系负责人:</div>
          <div class="h_2 fl">{{ info.link_man }}</div>
        </el-col>
      </el-row>
      <el-row class="row">
        <el-col :span="12">
          <div class="h_1 fl">机构名称:</div>
          <div class="h_2 fl">{{ info.company_name }}</div>
        </el-col>
        <el-col :span="12">
          <div class="h_1 fl">手机号:</div>
          <div class="h_2 fl">{{ info.link_phone }}</div>
        </el-col>
      </el-row>
      <el-row class="row">
        <el-col :span="12">
          <div class="h_1 fl">法人:</div>
          <div class="h_2 fl">{{ info.corporation }}</div>
        </el-col>
        <el-col :span="12">
          <div class="h_1 fl">固话:</div>
          <div class="h_2 fl">{{ info.telephone }}</div>
        </el-col>
      </el-row>
      <el-row class="row">
        <el-col :span="12">
          <div class="h_1 fl">注册地址:</div>
          <div class="h_2 fl">{{ info.area }} {{ info.address }}</div>
        </el-col>
        <el-col :span="12">
          <div class="h_1 fl">传真:</div>
          <div class="h_2 fl">{{ info.fax }}</div>
        </el-col>
      </el-row>
      <el-row class="row">
        <!-- <el-col :span="12">
          <div class="h_1 fl">经营范围:</div>
          <div class="h_2 fl">
            批发、零售：文体用品，日用百货，五金交电，点子产品，建筑装饰材料，化工原料（除化学危险品及易制毒化学品），计算机软硬件及配件，针纺织品，服装，鞋帽；服务：生物技术、计算机软硬件的技术开发、技术咨询、技术服务、成果转让，会务服务，商务信息咨询（除商品中介），企业管理咨询，建筑工程设计，汽车租赁。</div>
        </el-col> -->
        <el-col :span="12">
          <div class="h_1 fl">关系建立时间:</div>
          <div class="h_2 fl">{{ info.create_date }}</div>
        </el-col>
      </el-row>
    </div>
    <div class="tit">企业资质证件</div>
    <ul class="zj">
      <li
        v-for="(item,index) in info.attachmentList"
        :key="index"
      >
        <a
          :href="baseUrl+'/'+item.file_path"
          target="_blank"
          :style="'background-image: url('+baseUrl+'/'+item.file_path+')'"
        />
        <p>{{ item.file_name }}</p>
        <!-- <p>有效期：2014-11-17 ~ 2064-11-04</p> -->
      </li>
    </ul>
  </div>
</template>
<script>
import { update, info } from '@/api/common'
export default {
  name: 'CustomerDetail',
  data() {
    return {
      baseUrl: process.env.VUE_APP_BASE_API,
      info: {
        logo_url: '',
        link_man: '',
        company_name: '',
        link_phone: '',
        corporation: '',
        telephone: '',
        area: '',
        address: '',
        fax: '',
        attachmentList: []
      },
      relieve: false
    }
  },
  mounted() {
    this.getInfo()
    this.relieve = this.$route.params.relieve === 'true'
  },
  methods: {
    getInfo() {
      const id = this.$route.params.id
      info('mycustomer', { 'input.id': id }).then((res) => {
        if (res.success) {
          this.info = res.data
        }
      })
    },
    removeRelation() {
      const id = this.$route.params.id
      update('relation', { id: id, status: 4 }).then((res) => {
        if (res.success) {
          if (res.data.list.length !== 0) {
            this.info = res.data.list[0]
          }
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
ul,
li {
  padding: 0;
  margin: 0;
  list-style: none;
}
.tit {
  line-height: 30px;
  margin-bottom: 10px;
  border-bottom: 1px solid #bebebe;
  font-size: 12px;
}
.info {
  font-size: 12px;
  line-height: 18px;
  vertical-align: top;
  color: #757575;
  .row {
    margin-bottom: 15px;
    .h_1 {
      width: 100px;
      text-align: right;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    .h_2 {
      width: calc(100% - 100px);
      text-align: left;
      padding-left: 5px;
      .logo {
        display: inline-block;
        height: 40px;
        width: 40px;
        border-radius: 50%;
        background: #ccc;
      }
    }
  }
}
.zj {
  display: flex;
  justify-content: space-between;
  height: 280px;
  width: 100%;
  overflow-x: auto;
  li {
    // width: 280px;
    // height: 240px;
    margin-right: 20px;
    float: left;
    a {
      display: block;
      width: 280px;
      height: 200px;
      background-position: center;
      background-repeat: no-repeat;
      background-size: contain;
      background-color: #f5f5f5;
      border: 1px solid #d8d8d8;
    }
    p {
      text-align: center;
      font-size: 12px;
      line-height: 40px;
      color: #757575;
      margin: 0;
    }
  }
}
</style>
