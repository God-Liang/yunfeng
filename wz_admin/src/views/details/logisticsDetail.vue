<template>
  <div class="app-container">
    <div class="order-container">
      <h3>配送信息</h3>
      <el-row class="logisticsInfo">
        <el-col :span="12">
          <span class="labelNormal">物流公司:</span>
          <span class="labelVal">安能物流</span>
        </el-col>
        <el-col :span="12">
          <span class="labelNormal">官方电话:</span>
          <span class="labelVal" />
        </el-col>
      </el-row>
      <el-row class="logisticsInfo">
        <el-col :span="24">
          <span class="labelNormal">物流单号:</span>
          <div class="valBox">
            <span class="labelVal">568678678</span>
            <el-button
              size="mini"
              type="primary"
              class="tag-read"
              :loading="copyLoading"
              data-clipboard-text="568678678"
              @click="copy"
            >点击复制</el-button>
          </div>
        </el-col>
      </el-row>
      <el-row class="logisticsInfo">
        <el-col :span="24">
          <span class="labelNormal">发货备注:</span>
          <span class="labelVal">我要发货啦</span>
        </el-col>
      </el-row>
    </div>
    <i class="septal-line" />
    <div class="order-container">
      <h3>物流信息</h3>
      <p class="nullInfo">未跟踪到信息</p>
    </div>
  </div>
</template>
<script>
import Clipboard from 'clipboard'
import { setTimeout } from 'timers'
export default {
  data() {
    return {
      copyLoading: false
    }
  },
  methods: {
    copy() {
      this.copyLoading = true
      var clipboard = new Clipboard('.tag-read')
      clipboard.on('success', e => {
        this.$message({
          message: '复制成功',
          type: 'success'
        })
        // 释放内存
        clipboard.destroy()
      })
      clipboard.on('error', e => {
        // 不支持复制
        this.$message.error('该浏览器不支持自动复制')
        // 释放内存
        clipboard.destroy()
      })
      setTimeout(() => {
        this.copyLoading = false
      }, 500)
    }
  }
}
</script>
<style lang="scss" scoped>
.order-container {
  h3 {
    margin: 0 0 20px;
    font-size: 18px;
    color: #333333;
    &::before {
      content: "";
      display: inline-block;
      width: 4px;
      background-color: #35c4e8;
      margin-right: 10px;
      margin-bottom: 3px;
      height: 22px;
      vertical-align: middle;
    }
  }
  .nullInfo {
    margin: 0;
    color: #333;
    font-size: 14px;
  }
  .logisticsInfo {
    .el-col {
      line-height: 24px;
      margin-bottom: 15px;
      display: inline-flex;
      justify-content: flex-start;
      align-items: center;
      &.mb0 {
        margin-bottom: 0;
      }
      span {
        color: #333;
        font-size: 14px;
        &.labelNormal {
          margin-right: 5px;
          width: 100px;
          text-align: right;
        }
        &.labelVal {
          flex: 1;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
      .valBox {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        .tag-read {
          margin-left: 10px;
        }
      }
    }
  }
}
.septal-line {
    display: block;
    width: 100%;
    border-bottom: 1px dashed #eeeeee;
    margin: 10px 0 25px;
  }
</style>
