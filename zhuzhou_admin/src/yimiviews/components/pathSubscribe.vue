<template>
  <div class="path">
    <h3>手术路径</h3>
    <div class="statusBox">
      <span class="active">已完成</span>
      <span>未完成</span>
    </div>
    <div class="pathBox">
      <ul>
        <li>
          
        </li>
      </ul>
    </div>
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
  position: relative;
  h3 {
    color: #333;
    height: 66px;
    line-height: 54px;
    font-size: 14px;
    font-weight: bold;
    margin: 0;
    padding: 0 20px;
    border-bottom: 1px solid #eeeeee;
  }
  .statusBox {
    position: absolute;
    top: 36px;
    left: 50%;
    transform: translateX(-50%);
    span {
      font-size: 13px;
      color: #333;
      padding: 0 20px;
      cursor: pointer;
      &.active {
        color: #6e96ff;
        font-weight: bold;
      }
    }
  }
  .el-steps {
    padding: 30px 20px;
    .el-step {
      .el-step__main {
        .el-step__title {
          font-size: 12px;
        }
      }
    }
  }
}
</style>