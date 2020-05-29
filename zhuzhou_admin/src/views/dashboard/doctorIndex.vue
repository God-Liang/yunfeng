<template>
  <div class="dashboard-container">
    <component :is="currentRole"></component>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import adminDashboard from './admin/doctorIndex'

export default {
  name: 'dashboard',
  components: { adminDashboard },
  data() {
    return {
      currentRole: 'adminDashboard',
      form: {
        name: '',
        region: ''
      }
    }
  },
  methods: {
    creatInput(type) {
      var item = this.myFormMap[type]
      this.myFormArr.push(item)
    }
  },
  computed: {
    ...mapGetters(['roles'])
  },
  created() {
    // if (!this.roles.includes('admin')) {
    //   this.currentRole = 'editorDashboard'
    // }
  }
}
</script>
<style lang ='scss'>
.dashboard-container {
  height: 100%;
  overflow: auto;
}
.editorBox {
  display: flex;
  & > div {
    flex: 1;
    border: 1px solid red;
  }
}
</style>


