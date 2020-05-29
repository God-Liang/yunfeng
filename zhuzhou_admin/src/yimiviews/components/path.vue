<template>
  <div class="path">
    <el-steps :active="appointment.path" finish-status="success">
      <el-step :title="item.operateTypeShow" :status="item.isFinished === 1 ? 'success' : item.serialNo - 1 === appointment.path ? 'process' : 'wait'" v-for="(item, index) in stepList" :key="index">
        <template slot="description">
          {{item.operatorName}}
          <br>
          {{item.operateTime | fmtYMD}}
        </template>
      </el-step>
    </el-steps>
  </div>
</template>
<script>
import { operationPath } from '@/api/appointmentManage/path'
export default {
  props: {
    appointment: {
      type: Object,
      default: function() {
        return {}
      }
    },
    id: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      stepList: []
    }
  },
  mounted() {
    this.getOperationPath()
  },
  methods: {
    getOperationPath() {
      operationPath(this.$route.params.id).then(res => {
        if (res.data.code === 200) {
          this.stepList = res.data.list
        }
      })
    }
  }
}
</script>
<style lang="scss">
.path {
  padding: 0 15px 0 5px;
  overflow-y: scroll;
  h3 {
    color: #333;
    height: 54px;
    line-height: 54px;
    font-size: 14px;
    font-weight: bold;
    margin: 0;
    padding: 0 20px;
    border-bottom: 1px solid #eeeeee;
  }
  .el-steps {
    width: 200%;
    overflow: auto;
    padding: 55px 20px 20px 40px;
    .el-step {
      cursor: pointer;
      &:hover {
        .el-step__main {
          .el-step__description {
            display: block;
          }
        }
      }
      .el-step__head.is-success {
        color: #ffb03c;
        border-color: #ffb03c;
      }
      .el-step__main {
        margin-left: -10%;
        .el-step__title {
          font-size: 14px;
          &.is-success {
            color: #ffb03c;
          }
        }
        .el-step__description {
          // display: none;
          line-height: 16px;
          position: absolute;
          top: -35px;
          left: 0;
          color: #ffb03c;
          margin-left: -15%;
        }
      }
    }
  }
}
</style>