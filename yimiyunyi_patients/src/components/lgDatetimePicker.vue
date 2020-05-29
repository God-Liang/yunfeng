<template>
  <div class="lg-datetime-picker">
    <Popup v-model="showPopup" :close-on-click-overlay="false" position="bottom" :style="{ height: '40%' }">
      <DatetimePicker
        show-toolbar
        v-model="currentDate"
        :min-date="minDate"
        :max-date="maxDate"
        @confirm="onTimeConfirm"
        @cancel="onTimeCancel"
        type="date"
      ></DatetimePicker>
    </Popup>
  </div>
</template>
<script>
import { Popup, DatetimePicker } from 'vant'
export default {
  components: { Popup, DatetimePicker },
  props: {
    value: [String, Date],
    minDate: {
      type: Date,
      default: function () {
        return new Date(1900, 0, 1)
      }
    },
    maxDate: {},
    isShow: {
      type: Boolean,
      default: false
    },
    format: {
      type: String,
      default: '{y}-{m}-{d}'
    }
  },
  data () {
    return {
      currentDate: new Date(),
      showPopup: false
    }
  },
  watch: {
    isShow (newVal, oldVal) {
      if (newVal) {
        this.open()
        if (this.value) {
          this.currentDate = typeof (this.value) === 'string' ? new Date(this.value) : this.value
        }
      } else {
        this.close()
      }
    }
  },
  methods: {
    open () {
      this.$nextTick(() => {
        this.showPopup = true
      })
    },
    close () {
      this.$nextTick(() => {
        this.showPopup = false
      })
    },
    onTimeConfirm (val) {
      const tempTime = this.parseTime(val, this.format)
      this.$emit('confirm', tempTime)
    },
    onTimeCancel () {
      this.$emit('cancel')
    }
  }
}
</script>
