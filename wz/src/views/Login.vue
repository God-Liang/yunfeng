<template>
  <div class="login">
    <van-cell-group>
      <van-field
        v-model="loginForm.username"
        required
        clearable
        label="用户名"
        placeholder="请输入用户名"
        @click-right-icon="$toast('question')"
      />

      <van-field
        v-model="loginForm.password"
        type="password"
        label="密码"
        placeholder="请输入密码"
        required
      />
    </van-cell-group>
    <div class="btn">
      <van-button type="primary" @click="login">登陆</van-button>
    </div>
  </div>
</template>
<script>
import { setTimeout } from 'timers'
export default {
  name: 'Login',
  data () {
    return {
      loginForm: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    login () {
      this.$toast.loading({
        mask: true,
        message: '登陆加载中...'
      })
      const query = Object.assign({}, this.loginForm)
      this.$store.dispatch('Login', query).then((result) => {
        if (result.data.success) {
          this.$toast.success({
            message: '登陆成功',
            duration: 2000
          })
          setTimeout(() => {
            this.$router.push('/')
          }, 2000)
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.login {
  padding: 0 10px;
  .btn {
    margin-top: 30px;
    text-align: center;
    .van-button {
      width: 80%;
    }
  }
}
</style>
