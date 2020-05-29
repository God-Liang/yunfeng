<template>
  <div class="app-container">
    <el-tabs
      v-model="activeName"
      @tab-click="handleClick"
    >
      <el-tab-pane
        label="证件过期提醒"
        name="1"
      >
        <span
          slot="label"
          class="tabname"
        >证件过期提醒 <span class="tabsum">({{ total.remind }})</span></span>
        <remind @total="getTotal_remind" />
      </el-tab-pane>
      <el-tab-pane
        label="注册证"
        name="2"
      >
        <span
          slot="label"
          class="tabname"
        >注册证 <span class="tabsum">({{ total.register }})</span></span>
        <register
          :status-options="statusOptions"
          :import-options="importOptions"
          @total="getTotal_register"
        />
      </el-tab-pane>
      <!-- <el-tab-pane
        label="生产厂家/总经销商"
        name="3"
      >
        <span
          slot="label"
          class="tabname"
        >生产厂家/总经销商 <span class="tabsum">({{ total.manufacturers }})</span></span>
        <manufacturers
          :status-options="statusOptions"
          :import-options="importOptions"
        />
      </el-tab-pane> -->
      <el-tab-pane
        label="授权书"
        name="4"
      >
        <span
          slot="label"
          class="tabname"
        >授权书 <span class="tabsum">({{ total.accredit }})</span></span>
        <accredit
          :status-options="statusOptions"
          :is-overdue-options="isOverdueOptions"
          @total="getTotal_accredit"
        />
      </el-tab-pane>
      <el-tab-pane
        label="委托书"
        name="5"
      >
        <span
          slot="label"
          class="tabname"
        >委托书 <span class="tabsum">({{ total.entrust }})</span></span>
        <entrust
          :status-options="statusOptions"
          :is-overdue-options="isOverdueOptions"
          @total="getTotal_entrust"
        />
      </el-tab-pane>
      <el-tab-pane
        label="其他档案"
        name="6"
      >
        <span
          slot="label"
          class="tabname"
        >其他档案 <span class="tabsum">({{ total.other }})</span></span>
        <other
          :is-overdue-options="isOverdueOptions"
          @total="getTotal_other"
        />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import remind from './components/remind'
import register from './components/register'
// import manufacturers from './components/manufacturers'
import accredit from './components/accredit'
import entrust from './components/entrust'
import other from './components/other'
import { category } from '@/api/common'
export default {
  name: 'MyCredential',
  components: { remind, register, accredit, entrust, other }, // manufacturers
  data() {
    return {
      activeName: '1',
      statusOptions: [
        { label: '全部', value: 0 },
        { label: '启用', value: 1 },
        { label: '停用', value: 2 }
      ],
      importOptions: [
        { label: '全部', value: 0 },
        { label: '进口', value: 1 },
        { label: '国内', value: 2 }
      ],
      isOverdueOptions: [
        { label: '全部', value: 0 },
        { label: '已过期', value: 1 },
        { label: '未过期', value: 2 }
      ],
      total: {
        remind: 0,
        register: 0,
        // manufacturers: 0,
        accredit: 0,
        entrust: 0,
        other: 0
      }
    }
  },
  mounted() {
    this.getCategory_qbqx()
  },
  methods: {
    handleClick() {},
    // 订单来源字典
    getCategory_qbqx() {
      category('entrust_qbqx').then((res) => {
        this.isOverdueOptions = res.data.list
      })
    },
    getTotal_remind(total) {
      this.total.remind = total
    },
    getTotal_register(total) {
      this.total.register = total
    },
    // getTotal_manufacturers(total) {
    //   this.total.manufacturers = total
    // },
    getTotal_accredit(total) {
      this.total.accredit = total
    },
    getTotal_entrust(total) {
      this.total.entrust = total
    },
    getTotal_other(total) {
      this.total.other = total
    }
  }
}
</script>
<style lang="scss" scoped>
.tabname {
  padding: 0 20px;
  .tabsum {
    color: #cd1616;
  }
}
</style>
