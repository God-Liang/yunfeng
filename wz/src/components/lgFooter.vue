<template>
  <van-tabbar
    v-model="active"
    @change="tabChange"
    active-color="#03A9AC"
    inactive-color="#BDBDBD"
    id="lgFooter"
  >
    <van-tabbar-item to="/">
      <span>物资清单</span>
      <img slot="icon" slot-scope="props" v-if="props.active" src="@/assets/listing_ed.png" />
      <img slot="icon" v-else src="@/assets/listing.jpg" />
    </van-tabbar-item>
    <van-tabbar-item to="/package">
      <span>物资套餐</span>
      <img slot="icon" slot-scope="props" v-if="props.active" src="@/assets/class_ed.png" />
      <img slot="icon" v-else src="@/assets/class.png" />
    </van-tabbar-item>
    <van-tabbar-item :info="cart" to="/carts">
      <span>申领车</span>
      <img slot="icon" slot-scope="props" v-if="props.active" src="@/assets/cart_ed.png" />
      <img slot="icon" v-else src="@/assets/cart.png" />
    </van-tabbar-item>
    <van-tabbar-item to="/my">
      <span>我的</span>
      <img slot="icon" slot-scope="props" v-if="props.active" src="@/assets/my_ed.png" />
      <img slot="icon" v-else src="@/assets/my.png" />
    </van-tabbar-item>
  </van-tabbar>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  name: 'lgFooter',
  data () {
    return {
      active: 0,
      cart: 0,
      docmHeight: document.documentElement.clientHeight, // 默认屏幕高度
      showHeight: document.documentElement.clientHeight, // 实时屏幕高度
      hidshow: true
    }
  },
  computed: {
    ...mapGetters(['cartsInfo'])
  },
  watch: {
    cartsInfo () {
      //  获取vuex中申领车数据
      let cart = 0
      this.cartsInfo.forEach(v => {
        v.data.forEach(e => {
          cart++
        })
      })
      this.cart = cart
    },
    showHeight () {
      if (this.docmHeight > this.showHeight) {
        this.hidshow = false
      } else {
        this.hidshow = true
      }
    },
    $route (to, from) {
      switch (to.name) {
        case 'Inventory':
          this.active = 0
          break
        case 'Package':
          this.active = 1
          break
        case 'Carts':
          this.active = 2
          break
        case 'My':
          this.active = 3
          break
        default:
          break
      }
    }
  },
  mounted () {
    // window.onresize监听页面高度的变化
    window.onresize = () => {
      return (() => {
        this.showHeight = document.body.clientHeight
      })()
    }
  },
  methods: {
    tabChange (val) {
      this.active = val
    }
  }
}
</script>

<style lang="scss">
#lgFooter {
  z-index: 9900 !important;
}
</style>
