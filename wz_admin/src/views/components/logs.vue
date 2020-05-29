<template>
  <el-dialog title="日志" :visible.sync="logVisible" width="800px" :before-close="onClose">
    <lgTable :list="list" :lg-thead="logThead" :has-selection="false" :is-operation="false" :is-pagination="false" />
    <span slot="footer" class="dialog-footer">
      <slot name="action">
        <el-button type="primary" @click="onClose">知道了</el-button>
      </slot>
    </span>
  </el-dialog>
</template>
<script>
import lgTable from '@/views/components/lgTable'
export default {
  components: {
    lgTable
  },
  props: {
    logVisible: {
      type: Boolean,
      default: false
    },
    list: {
      type: Array,
      default: function() {
        return []
      }
    }
  },
  data() {
    return {
      logThead: [
        {
          label: 'create_name',
          text: '操作人',
          width: '150'
        },
        {
          label: 'create_date',
          text: '操作时间',
          width: '150'
        },
        {
          label: 'content',
          text: '操作详情'
        }
      ]
    }
  },
  methods: {
    onClose() {
      this.$emit('logClose')
    }
  }
}
</script>
