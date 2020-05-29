<template>
  <el-select v-model="__value" :placeholder="placeholder" :disabled="disabled" :style = 'cssStyle' :size="size" :filterable="filterable" :multiple="multiple" @change="handleChange" :clearable="clearable">
    <el-option v-for= 'item in lists' :label="item.label" :value="item.value" :key='item.value'></el-option>
  </el-select>
</template>

<script>
  import { dictionary, getDictListByParent } from '@/api/knowledgeManage/dictionary'
  export default {
    name: 'dictSelect',
    props: {
      dictCode: {
        type: String
      },
      cssStyle: {
        type: String
      },
      placeholder: {
        type: String
      },
      multiple: {
      },
      value: {},
      parentCode: {
        type: String
      },
      size: {
        type: String
      },
      clearable: {
        type: Boolean,
        default: false
      },
      disabled: {
        type: Boolean,
        default: false
      },
      filterable: {
        type: Boolean,
        default: false
      },
      parentId: {}
    },
    data() {
      return {
        lists: []
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
    mounted() {
      if (!this.parentCode) {
        this.getDictList(this.dictCode).then((res) => {
          this.lists = res.data.list
        })
      } else {
        getDictListByParent({
          type: this.dictCode,
          parentId: this.parentId
        }).then((res) => { this.lists = res.data.list })
      }
    },
    methods: {
      getDictList(type) {
        return dictionary({ type: type })
      },
      handleChange(value) {
        this.$emit('change', value)
      }
    },
    watch: {
      parentId: function() {
        getDictListByParent({
          type: this.dictCode,
          parentId: this.parentId
        }).then((res) => {
          this.lists = res.data.list
          this.__value = ''
        })
      }
    }
  }
</script>

<style scoped>

</style>
