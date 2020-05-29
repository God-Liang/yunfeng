<template>
  <el-radio-group v-model = '_value' :style = 'cssStyle'>
      <el-radio
        v-if = 'type === "radio"'
        v-for = 'item in lists'
        @click.native = 'toggle()'
        :label = 'item.value' 
        :key = 'item.value'>
        {{item.label}}
      </el-radio>
      <el-radio-button
        v-if = 'type === "button"'
        v-for = 'item in lists'
        @click.native = 'toggle()'
        :label = 'item.value' 
        :key = 'item.value'>
        {{item.label}}
      </el-radio-button>
  </el-radio-group>
</template>

<script>
  export default {
    props: {
      cssStyle: '',
      type: {
        type: String,
        default: 'radio'
      },
      lists: {
        type: Array,
        default() {
          return [
            {
              label: '上海',
              value: 0
            },
            {
              label: '郑州',
              value: 1
            },
            {
              label: '杭州',
              value: 2
            }
          ]
        }
      },
      value: ''
    },
    data() {
      return {}
    },
    computed: {
      _value: {
        get() {
          return this.value
        },
        set(nval) {
          this.$emit('input', nval)
        }
      }
    },
    methods: {
      toggle(e) {
        this._value = ''
      }
    }
  }
</script>

<style scoped>

</style>
