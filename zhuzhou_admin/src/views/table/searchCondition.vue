<template>
  <div class= 'clearfix'>
    <div class="fl">
      <el-checkbox class="filter-item" style="margin-left:15px;" @change="todayAppointment">今日预约</el-checkbox>
    </div>
    
    <div class="fr">
      <el-input @keyup.enter.native="handleFilter" style="width: 220px;" class="filter-item" placeholder="输入患者姓名/手机号后四位" v-model="nameTel">
      </el-input>
      <el-input @keyup.enter.native="handleFilter" style="width: 220px;" class="filter-item" placeholder="就诊卡号/身份证号" v-model="cardNo">
      </el-input>
      <el-select clearable style="width: 120px" class="filter-item" v-model="origin" placeholder="预约来源">
        <el-option v-for="item in originOptions" :key="item" :label="item" :value="item">
        </el-option>
      </el-select>
      
      <el-button class="filter-item" type="primary" v-waves icon="el-icon-search" @click="handleFilter">搜索</el-button>
    </div>
    
  </div>
</template>

<script>
import waves from '@/directive/waves/index.js'
export default {
  data() {
    return {
      nameTel: '',
      cardNo: '',
      origin: '',
      originOptions: [
        '平台预约',
        '院内预约',
        '双向转诊'
      ],
      downloadLoading: false

    }
  },
  methods: {
    todayAppointment(isToday) {
      this.$emit('getTodayAppointment', isToday)
    },
    handleFilter() {},
    handleCreate() {},
    handleDownload() {}
  },
  directives: {
    waves
  }
}
</script>
