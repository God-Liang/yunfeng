<template>
  <div class="package">
    <div class="typeNav">
      <van-tabs id="header" v-model="active" @change="tabChange">
        <van-tab v-for="(item, index) in typeList" :title="item.kfmc" :key="index"></van-tab>
      </van-tabs>
      <div class="flexBox">
        <div class="typeList" ref="typeList">
          <van-sidebar :active-key="activeKey" @change="onChange" v-if="packageList.length > 0">
            <van-sidebar-item :title="k.TCMC" v-for="(k, i) in packageList" :key="i"/>
          </van-sidebar>
          <div id="lgNull" v-else>
            <span>暂</span>
            <span>无</span>
            <span>套</span>
            <span>餐</span>
          </div>
        </div>
        <div class="packageBox" ref="packageBox">
          <van-checkbox v-model="allPackage" @click="allCartsClick" checked-color="#03a9ac" id="allPackage">全选</van-checkbox>
          <div class="packageContent">
            <van-list
              v-model="loading"
              :finished="finished"
              finished-text="没有更多了"
              @load="onLoad"
              :error.sync="error"
              error-text="请求失败，点击重新加载"
            >
              <div class="packageItem" data-v-77a61008 v-for="item in list" :key="item.id">
                <van-checkbox v-model="item.checked" @click="packageClick" checked-color="#03a9ac"></van-checkbox>
                <div class="packageInfo">
                  <h3>{{item.wzmc}}</h3>
                  <p class="specificationsBox">{{item.ggxh}}</p>
                  <span class="price">¥ {{item.dj}}</span>
                </div>
                <van-stepper v-model="item.sl" :max="item.maxSl" integer/>
              </div>
            </van-list>
          </div>
        </div>
      </div>
    </div>
    <div class="cartBox" @click="addCarts">
      <img src="../assets/add.png" alt="添加到购物车">
    </div>
    <!-- <lgFooter id="lgFooter"></lgFooter> -->
  </div>
</template>
<script>
import { getkskf, gettcxx, gettcmx } from '@/api/package'
import { addCar } from '@/api/inventory'
import { setTimeout } from 'timers'
export default {
  name: 'Package',
  data () {
    return {
      active: 0,
      typeId: null,
      activeKey: 0,
      filter: {
        current_page: 1,
        per_page: 10,
        tcxh: null
      },
      typeList: [],
      loading: false,
      finished: false,
      packageList: [],
      list: [],
      error: false,
      allPackage: true
    }
  },
  created () {
    this.getkskf()
  },
  watch: {
    list: {
      handler (newName, oldName) {
        const allChecked = newName.filter(v => v.checked)
        if (allChecked.length === newName.length) {
          this.allPackage = true
        } else {
          this.allPackage = false
        }
      },
      deep: true
    }
  },
  mounted () {
    var CH = document.body.offsetHeight
    var header = document.getElementById('header').offsetHeight
    var lgFooter = document.getElementById('lgFooter').offsetHeight
    this.$refs.typeList.style.minHeight = CH - lgFooter - header + 'px'
    this.$refs.packageBox.style.maxHeight = CH - lgFooter - header + 'px'
  },
  methods: {
    packageClick () {
      const allChecked = this.list.filter(v => v.checked)
      if (allChecked.length === this.list.length) {
        this.allPackage = true
      } else {
        this.allPackage = false
      }
    },
    // 获取分类列表
    getkskf () {
      this.$toast.loading({
        mask: true,
        message: '加载中...'
      })
      getkskf().then(res => {
        if (res.data.success) {
          this.typeList = res.data.data
          if (this.typeList.length > 0) {
            this.typeId = this.typeList[0].kfdm
            this.gettcxx()
          } else {
            this.$toast.clear()
            this.finished = true
            this.loading = false
          }
        }
      })
    },
    // 分类切换
    tabChange (index, title) {
      this.$toast.loading({
        mask: true,
        message: '加载中...'
      })
      this.typeId = this.typeList[this.active].kfdm
      this.list = []
      this.filter.current_page = 1
      this.filter.tcxh = null
      this.loading = true
      this.finished = false
      this.gettcxx()
      this.onLoad()
    },
    // 套餐列表
    gettcxx () {
      gettcxx(this.typeId).then(res => {
        if (res.data.success) {
          this.packageList = res.data.data
          if (this.packageList.length > 0) {
            this.filter.tcxh = this.packageList[0].TCXH
            this.activeKey = 0
          } else {
            this.finished = true
            this.loading = false
          }
          this.$toast.clear()
        }
      })
    },
    // 套餐切换
    onChange (key) {
      this.activeKey = key
      this.filter.tcxh = this.packageList[key].TCXH
      this.filter.current_page = 1
      this.loading = true
      this.finished = false
      this.list = []
      this.onLoad()
    },
    // 套餐明细
    gettcmx () {
      const query = Object.assign({}, this.filter)
      if (query.tcxh) {
        gettcmx(query).then(res => {
          if (res.data.success) {
            // 数据全部加载完成
            if (res.data.data.list.length < 10) {
              this.finished = true
            }
            // 初始列表未空
            if (this.filter.current_page === 1) {
              this.list = []
            }
            const list = res.data.data.list
            list.forEach(e => {
              e.checked = true
              e.maxSl = e.sl
            })
            this.list.push(...list)
            this.filter.current_page++
            this.loading = false
          } else {
            this.loading = false
            this.finished = true
          }
        }).catch(() => {
          this.error = true
          this.loading = false
        })
      } else {
        this.loading = false
        this.finished = true
      }
    },
    // 列表加载
    onLoad () {
      // 异步更新数据
      setTimeout(() => {
        this.gettcmx()
      }, 500)
    },
    // 添加到购物车
    addCarts () {
      this.$toast.loading({
        mask: true,
        message: '加入申领车中...'
      })
      let arr = []
      this.list.forEach(v => {
        if (v.checked) {
          arr.push({
            wzxh: v.wzxh,
            sl: v.sl,
            kfdm: this.typeId,
            wzlx: v.wzlx
          })
        }
      })
      addCar({ data: arr }).then(res => {
        if (res.data.success) {
          this.$store.dispatch('GetCarts').then(() => {
            setTimeout(() => {
              this.$router.push('/carts')
            }, 2000)
          })
          this.$toast.success({
            message: '加入成功',
            duration: 1000
          })
          setTimeout(() => {
            this.$toast.loading({
              mask: true,
              message: '进入申领车...'
            })
          }, 1000)
        }
      })
    },
    allCartsClick () {
      this.allPackage = !this.allPackage
      this.list.forEach(v => {
        if (this.allPackage) {
          v.checked = true
        } else {
          v.checked = false
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.typeList {
  overflow: auto;
  background: #fff;
  #lgNull {
    font-size: 14px;
    color: #969799;
    display: flex;
    height: 100%;
    width: 85px;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    background-color: #fff;
  }
}
.packageBox {
  flex: 1;
  overflow: auto;
  padding: 10px;
  #allPackage {
    background: #fff;
    padding: 5px 12px;
    border-radius: 5px 5px 0 0;
    border-bottom: 1px solid #eee;
  }
  .packageContent {
    background-color: #fff;
    width: 100%;
    padding: 0 12px;
    border-radius: 0 0 5px 5px;
    .packageItem {
      display: flex;
      justify-content: space-between;
      padding: 12px 0;
      border-top: 1px solid #eee;
      &:first-child {
        border: 0;
      }
      .packageInfo {
        flex: 1;
        padding: 0 10px;
        h3 {
          color: #333333;
          font-size: 14px;
          height: 40px;
          line-height: 22px;
          font-weight: normal;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
        }
        .specificationsBox {
          width: 100px;
          color: #999999;
          font-size: 13px;
          margin: 3px 0;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .price {
          font-size: 16px;
          color: #03a9ac;
        }
      }
      .van-stepper {
        display: flex;
        align-items: flex-end;
      }
    }
  }
}
</style>
<style lang="scss" scoped>
.package {
  height: 100%;
  overflow: hidden;
  .typeNav {
    height: 100%;
    .flexBox {
      display: flex;
      justify-content: flex-start;
    }
  }
  .cartBox {
    position: fixed;
    right: 10px;
    bottom: 65px;
    width: 40px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #03a9ac;
    border-radius: 50%;
    img {
      width: 20px;
      height: 20px;
      display: block;
    }
  }
}
#lgFooter {
  height: 50px;
}
</style>
<style lang="scss">
.package {
  .van-tabs__nav {
    background: -webkit-linear-gradient(left, #03a9ac, #5ccccd);
    background: -o-linear-gradient(right, #03a9ac, #5ccccd);
    background: -moz-linear-gradient(right, #03a9ac, #5ccccd);
    background: linear-gradient(to right, #03a9ac, #5ccccd);
    .van-tabs__line {
      background-color: #fff;
    }
    .van-tab {
      color: #ffffff;
    }
  }
}
.typeList {
  .van-hairline {
    &::after {
      border: none;
    }
  }
  .van-sidebar {
    height: 100%;
    &::after {
      border: none;
    }
  }
  .van-sidebar-item {
    background-color: #fff;
    border-bottom: 1px solid #eeeeee;
  }
  .van-sidebar-item--select {
    border-color: #f4f4f4;
    color: #03a9ac;
    font-weight: normal;
    background-color: #f4f4f4;
  }
}
.packageBox {
  .van-checkbox__icon {
    .van-icon {
      width: 18px;
      height: 18px;
    }
  }
  .packageContent {
    .van-checkbox {
      margin-top: 35px;
      width: 20px;
      height: 20px;
    }
  }
  #allPackage {
    .van-checkbox__label {
      font-size: 14px;
    }
  }
}
</style>
