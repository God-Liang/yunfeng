<template>
  <el-cascader
    v-model="__value"
    :options="siteJSON"
    size="small"
    clearable
    :placeholder="placeholder"
    @change="handleChange"
  />
</template>
<script>
import { siteJSON } from './site.js'
export default {
  props: {
    siteVal: {
      type: Array,
      default: function() {
        return []
      }
    },
    value: {},
    placeholder: {
      type: String,
      default: '请选择'
    }
  },
  data() {
    return {
      siteJSON
    }
  },
  computed: {
    __value: {
      get() {
        return this.value
      },
      set(nval) {
        this.$emit('input', nval)
      }
    }
  },
  methods: {
    handleChange(val) {
      this.$emit('change', val)
    }
  }
}
</script>
