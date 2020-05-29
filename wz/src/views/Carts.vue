<template>
  <div class="carts">
    <div class="cartList" v-if="packageMessage.length > 0">
      <div class="cartItem" v-for="value in packageMessage" :key="value.id">
        <div class="warehouseBox">
          <van-checkbox v-model="value.checkAll" @click="checkedAll(value)" checked-color="#03a9ac"></van-checkbox>
          <img class="house" src="@/assets/house.jpg" alt>
          <h4>{{value.kfmc}}</h4>
        </div>
        <div class="suppliesBox">
          <div class="packageInfo">
            <div class="packageItem" v-for="item in value.data" :key="item.id">
              <div
                class="packageBox"
                :style="deleteSlider"
                @touchstart="touchStart"
                @touchmove="touchMove"
                @touchend="touchEnd"
              >
                <van-checkbox
                  v-model="item.checked"
                  @click="checkedItem(item, value);"
                  checked-color="#03a9ac"
                ></van-checkbox>
                <div class="packageInfo">
                  <h3>{{item.wzmc}}</h3>
                  <p class="specificationsBox">{{item.ggxh}}</p>
                  <span class="price">¥ {{item.dj}}</span>
                </div>
                <van-stepper v-model="item.sl" integer/>
              </div>
              <div id="close" @click="closeClick(item.paiid)">删除</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else id="lgNull">申领车内没有物资</div>
    <van-submit-bar :price="price" :button-text="'结算 ( '+ allNumber + ' )'" @submit="onSubmit">
      <van-checkbox v-model="cleanCarts" @click="cleanCartsClick" checked-color="#03a9ac">全选</van-checkbox>
    </van-submit-bar>
  </div>
</template>
<script>
import { getMyCarts, removeCarts, save } from '@/api/carts'
import { setTimeout } from 'timers'

export default {
  name: 'Carts',
  inject: ['reload'],
  watch: {
    packageMessage: {
      handler (newName, oldName) {
        let prices = 0
        let allNumber = 0
        newName.forEach(v => {
          v.data.forEach(e => {
            if (e.checked) {
              prices += e.dj * e.sl
              allNumber++
            }
          })
        })
        this.price = prices * 100
        this.allNumber = allNumber
      },
      deep: true
    }
  },
  data () {
    return {
      checkAll: false,
      cleanCarts: false,
      icon: {
        normal: '//img.yzcdn.cn/icon-normal.png',
        active: '//img.yzcdn.cn/icon-active.png'
      },
      packageMessage: [],
      startX: 0, // 触摸位置
      endX: 0, // 结束位置
      moveX: 0, // 滑动时的位置
      disX: 0, // 移动距离
      deleteSlider: '', // 滑动时的效果,使用v-bind:style="deleteSlider"
      removeStyle: '',
      price: 0,
      allNumber: 0
    }
  },
  mounted () {
    this.getMyCarts()
  },
  methods: {
    // 获取购物车列表
    getMyCarts () {
      this.$toast.loading({
        mask: true,
        message: '加载中...',
        duration: 0
      })
      getMyCarts().then(res => {
        if (res.data.success) {
          const packageMessage = res.data.data
          packageMessage.forEach(v => {
            v.checkAll = true
            v.data.forEach(e => {
              e.checked = true
            })
          })
          this.packageMessage = [...packageMessage]
          let allNumber = 0
          this.packageMessage.forEach((v, i) => {
            allNumber += parseInt(v.data.length)
          })
          this.allNumber = allNumber
          if (this.packageMessage.length > 0) {
            this.cleanCarts = true
          } else {
            this.cleanCarts = false
          }
          this.$toast.clear()
        }
      })
    },
    // 删除某个物资
    closeClick (id) {
      const ids = [id]
      removeCarts(ids).then(res => {
        if (res.data.success) {
          this.$toast.success({
            message: '删除成功',
            duration: 2000
          })
          setTimeout(() => {
            this.reload()
          }, 500)
        }
      })
    },
    checkedAll (value) {
      value.checkAll = !value.checkAll
      value.data.forEach(v => {
        if (value.checkAll) {
          v.checked = true
        } else {
          v.checked = false
        }
      })
      const checkedAllArr = this.packageMessage.filter(v => v.checkAll)
      if (checkedAllArr.length === this.packageMessage.length) {
        this.cleanCarts = true
      } else {
        this.cleanCarts = false
      }
    },
    checkedItem (item, value) {
      item.checked = !item.checked
      const checkedArr = value.data.filter(v => v.checked)
      if (checkedArr.length === value.data.length) {
        value.checkAll = true
      } else {
        value.checkAll = false
      }
      const checkedAllArr = this.packageMessage.filter(v => v.checkAll)
      if (checkedAllArr.length === this.packageMessage.length) {
        this.cleanCarts = true
      } else {
        this.cleanCarts = false
      }
    },
    cleanCartsClick () {
      this.cleanCarts = !this.cleanCarts
      if (this.cleanCarts) {
        this.packageMessage.forEach(v => {
          v.checkAll = true
          v.data.forEach(e => {
            e.checked = true
          })
        })
      } else {
        this.packageMessage.forEach(v => {
          v.checkAll = false
          v.data.forEach(e => {
            e.checked = false
          })
        })
      }
      this.packageMessage.forEach(v => {
        if (this.checkAll) {
          v.checked = true
        } else {
          v.checked = false
        }
      })
    },
    onSubmit () {
      if (this.packageMessage.length === 0 || this.allNumber === 0) {
        this.$toast('暂无物资可结算')
        return false
      }
      this.$toast.loading({
        mask: true,
        message: '结算中...'
      })
      const dataFilter = [...this.packageMessage]
      dataFilter.forEach(v => {
        v.data = v.data.filter(e => e.checked)
        v.data.forEach(i => {
          i.id = i.paiid
        })
      })
      const data = {
        psdz: '',
        wzlx: '',
        LXRXM: '',
        LXRDH: '',
        jjdd: 0,
        data: dataFilter.filter(v => v.data.length > 0)
      }
      save(data).then(res => {
        if (res.data.success) {
          this.$toast.success({
            message: '结算成功',
            duration: 1000
          })
          setTimeout(() => {
            this.$toast.loading({
              mask: true,
              message: '进入我的...'
            })
          }, 1000)
          setTimeout(() => {
            this.$store.commit('SET_STATUS', 0)
            this.$router.push('/my')
          }, 2000)
        }
      })
    },
    touchStart (ev) {
      ev = ev || event
      // tounches类数组，等于1时表示此时有只有一只手指在触摸屏幕
      if (ev.touches.length === 1) {
        // 记录开始位置
        this.startX = ev.touches[0].clientX
      }
    },
    touchMove (ev) {
      ev = ev || event
      // 获取删除按钮的宽度，此宽度为滑块左滑的最大距离
      let wd = document.getElementById('close').offsetWidth
      let parent
      if (ev.target.className === 'packageBox') {
        parent = ev.target
      } else {
        parent = ev.target.offsetParent
      }
      if (ev.touches.length === 1) {
        // 滑动时距离浏览器左侧实时距离
        this.moveX = ev.touches[0].clientX
        // 起始位置减去 实时的滑动的距离，得到手指实时偏移距离
        this.disX = this.startX - this.moveX
        // 如果是向右滑动或者不滑动，不改变滑块的位置
        if (this.disX < 0 || this.disX === 0) {
          parent.style.transform = 'translateX(0px)'
          // 大于0，表示左滑了，此时滑块开始滑动
        } else if (this.disX > 0) {
          // 具体滑动距离我取的是 手指偏移距离*5。
          parent.style.transform = 'translateX(-' + this.disX * 5 + 'px)'
          // 最大也只能等于删除按钮宽度
          if (this.disX * 5 >= wd) {
            parent.style.transform = 'translateX(-' + wd + 'px)'
          }
        }
      }
    },
    touchEnd (ev) {
      ev = ev || event
      let wd = document.getElementById('close').offsetWidth
      let parent, allBrother
      if (ev.target.className === 'packageBox') {
        parent = ev.target
        allBrother = ev.target.parentNode.parentNode.parentNode.parentNode.parentNode.children
      } else {
        parent = ev.target.offsetParent
        allBrother = ev.target.offsetParent.parentNode.parentNode.parentNode.parentNode.parentNode.children
      }
      if (ev.changedTouches.length === 1) {
        let endX = ev.changedTouches[0].clientX
        this.disX = this.startX - endX
        // 如果距离小于删除按钮一半,强行回到起点
        if ((this.disX * 5) < (wd / 2)) {
          parent.style.transform = 'translateX(0px)'
        } else {
          // 大于一半 滑动到最大值
          parent.style.transform = 'translateX(-' + wd + 'px)'
          for (let i = 0; i < allBrother.length; i++) {
            for (let j = 0; j < allBrother[i].children[1].children[0].children.length; j++) {
              if (parent.parentNode !== allBrother[i].children[1].children[0].children[j]) {
                allBrother[i].children[1].children[0].children[j].children[0].style.transform = 'translateX(0px)'
              }
            }
          }
        }
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.carts {
  .cartList {
    height: 100%;
    padding: 10px 10px 50px;
    .cartItem {
      padding: 0 10px 0 13px;
      margin-bottom: 10px;
      background-color: #fff;
      border-radius: 5px;
      .warehouseBox {
        height: 32px;
        line-height: 32px;
        display: flex;
        justify-content: flex-start;
        border-bottom: 1px solid #eeeeee;
        .van-checkbox {
          margin-right: 15px;
          margin-top: 6px;
        }
        .house {
          width: 14px;
          height: 14px;
          margin-top: 9px;
          margin-right: 5px;
        }
        h4 {
          color: #333333;
          font-size: 14px;
          font-weight: normal;
        }
      }
      .packageInfo {
        overflow: hidden;
        .packageItem {
          border-top: 1px solid #eee;
          width: 100%;
          height: 110px;
          position: relative;
          user-select: none;
          &:first-child {
            border: 0;
          }
          .packageBox {
            display: inline-flex;
            width: 100%;
            justify-content: space-between;
            margin-left: 0;
            position: absolute;
            left: 0;
            right: 0;
            top: 0;
            bottom: 0;
            background: #fff;
            z-index: 100;
            padding: 12px 0;
            transform: translateX(0px);
            //  设置过渡动画
            transition: 0.3s;
            .van-checkbox {
              margin-top: 33px;
            }
            .packageInfo {
              flex: 1;
              padding: 0 15px;
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
                color: #999999;
                font-size: 13px;
                margin-bottom: 3px;
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
              margin-right: 10px;
            }
          }
          #close {
            display: inline-block;
            width: 52px;
            height: 100px;
            background-color: #03a9ac;
            color: #fff;
            font-size: 14px;
            text-align: center;
            position: absolute;
            right: 0;
            top: 0;
            line-height: 100px;
            // line-height: 10;
          }
        }
      }
    }
  }
  #lgNull {
    padding: 30px 0;
    color: #666666;
    text-align: center;
    font-size: 14px;
  }
}
</style>
<style lang="scss">
.carts {
  .cartList {
    .van-checkbox__icon {
      .van-icon {
        width: 18px;
        height: 18px;
      }
    }
    .van-checkbox {
      width: 20px;
      height: 20px;
    }
  }
  .van-submit-bar {
    border-bottom: 1px solid #dadada;
    border-top: 1px solid #dadada;
    .van-checkbox__icon {
      width: 20px;
      height: 20px;
    }
  }
}
</style>
