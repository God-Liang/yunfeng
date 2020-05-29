<template>
  <div class="my">
    <van-tabs v-model="active" animated @change="statusChange" id="header">
      <van-tab title="待审批"></van-tab>
      <van-tab title="未发货"></van-tab>
      <van-tab title="部分发货"></van-tab>
      <van-tab title="已发货"></van-tab>
    </van-tabs>
    <div class="suppliesBox" ref="suppliesBox">
      <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
        <div class="suppliesList" v-for="item in list" :key="item.xh">
          <div class="itemHead">
            <h5 class="orderNumb">订单号：{{item.bianhao}}</h5>
            <span class="status">{{item.zhuangtai | statusFilter}}</span>
          </div>
          <div class="suppliesItem" v-for="value in item.data" :key="value.xh">
            <div class="namePrice">
              <span class="name">{{value.wuzi_mc}}</span>
              <span class="price">￥{{value.jine}}</span>
            </div>
            <div class="specificationsNumber">
              <span class="specifications">{{value.guige_xh}}</span>
              <span class="number">X{{value.shuliang}}</span>
            </div>
            <div class="operating">{{value.keshi_mc}}</div>
          </div>
          <div class="totalBox">
            <span>共1件商品</span>
            <div class="allPrice">
              <span>合计：￥</span>
              <i>{{item.jine}}</i>
            </div>
          </div>
          <div class="btnBox" v-if="filter.zt === 0">
            <span @click="urged(item.xh)">催促发货</span>
            <span @click="cancel(item.xh)" class="cancel">取消订单</span>
          </div>
          <div class="btnBox" v-else-if="filter.zt === 1">
            <span @click="urged(item.xh)">催促发货</span>
          </div>
          <div class="btnBox" v-else-if="filter.zt === 2">
            <span @click="save(item.xh)">确认收货</span>
          </div>
          <div class="btnBox" v-else-if="filter.zt === 5 && item.isshenhe === '1'">
            <span @click="audit(item.xh)">审核通过</span>
            <span @click="noAudit(item.xh)" class="cancel">审核不通过</span>
          </div>
        </div>
      </van-list>
    </div>
  </div>
</template>
<script>
import { getList, hurryorder, del, okorder, shorder, noshorder } from '@/api/my'
export default {
  name: 'My',
  inject: ['reload'],
  filters: {
    statusFilter (val) {
      if (val) {
        const statusArr = ['新单', '部分配送', '全部配送', '递回', '作废', '待主任审核', '待分管院长审核', '待大院长审核']
        return statusArr[parseInt(val)]
      } else {
        return ''
      }
    }
  },
  data () {
    return {
      active: 0,
      loading: false,
      finished: false,
      list: [],
      filter: {
        current_page: 1,
        per_page: 10,
        zt: 5
      }
    }
  },
  mounted () {
    this.filter.zt = this.$store.getters.status
    switch (this.filter.zt) {
      case 5:
        this.active = 0
        break
      case 0:
        this.active = 1
        break
      case 1:
        this.active = 2
        break
      case 2:
        this.active = 3
        break
      default:
        break
    }
  },
  methods: {
    onLoad () {
      // 异步更新数据
      setTimeout(() => {
        this.getList()
      }, 500)
    },
    getList () {
      const req = Object.assign({}, this.filter)
      getList(req).then(res => {
        if (res.data.success) {
          // 数据全部加载完成
          if (res.data.data.list.length < 10) {
            this.finished = true
          }
          // 初始列表未空
          if (this.filter.current_page === 1) {
            this.list = []
          }
          this.list.push(...res.data.data.list)
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
    },
    statusChange (val) {
      this.filter.current_page = 1
      this.finished = false
      this.loading = true
      this.list = []
      this.onLoad()
      switch (val) {
        case 0:
          this.$store.commit('SET_STATUS', 5)
          this.filter.zt = 5
          break
        case 1:
          this.$store.commit('SET_STATUS', 0)
          this.filter.zt = 0
          break
        case 2:
          this.$store.commit('SET_STATUS', 1)
          this.filter.zt = 1
          break
        case 3:
          this.$store.commit('SET_STATUS', 2)
          this.filter.zt = 2
          break
        default:
          break
      }
    },
    // 催促发货
    urged (id) {
      const req = {
        id: id
      }
      hurryorder(req).then(res => {
        if (res.data.success) {
          this.$toast.success({
            message: '催单成功',
            duration: 2000
          })
        }
      })
    },
    // 取消订单
    cancel (id) {
      const req = {
        id: id
      }
      del(req).then(res => {
        if (res.data.success) {
          this.$toast.success({
            message: '取消成功',
            duration: 2000
          })
          setTimeout(() => {
            this.reload()
          }, 500)
        }
      })
    },
    // 确认收货
    save (id) {
      const req = {
        id: id
      }
      okorder(req).then(res => {
        if (res.data.success) {
          this.$toast.success({
            message: '确认成功',
            duration: 2000
          })
          setTimeout(() => {
            this.reload()
          }, 500)
        }
      })
    },
    // 审核通过
    audit (id) {
      const req = {
        id: id
      }
      shorder(req).then(res => {
        if (res.data.success) {
          this.$toast.success({
            message: '成功通过',
            duration: 2000
          })
          setTimeout(() => {
            this.reload()
          }, 500)
        }
      })
    },
    // 审核不通过
    noAudit (id) {
      const req = {
        id: id
      }
      noshorder(req).then(res => {
        if (res.data.success) {
          this.$toast.success({
            message: '成功不通过',
            duration: 2000
          })
          setTimeout(() => {
            this.reload()
          }, 500)
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.my {
  height: 100%;
  #header {
    position: fixed;
    top: 0;
    left: 0;
    height: 2.2rem;
    width: 100%;
  }
  .suppliesBox {
    padding: 55px 10px 0px;
    height: calc(100% - 50px);
    overflow: hidden;
    .van-list {
      height: 100%;
      overflow: auto;
      .suppliesList {
        background-color: #fff;
        margin-bottom: 10px;
        padding: 0 10px;
        border-radius: 5px;
        .itemHead {
          height: 32px;
          line-height: 32px;
          display: flex;
          justify-content: space-between;
          h5 {
            font-size: 14px;
            font-weight: normal;
            color: #333333;
          }
          .status {
            color: #03a9ac;
            font-size: 14px;
          }
        }
        .suppliesItem {
          border-top: 1px solid #eeeeee;
          padding: 10px 0;
          .namePrice {
            font-size: 13px;
            display: flex;
            justify-content: space-between;
            margin-bottom: 6px;
            .name {
              color: #4d4d4d;
            }
            .price {
              color: #333333;
            }
          }
          .specificationsNumber {
            font-size: 12px;
            display: flex;
            justify-content: space-between;
            color: #bdbdbd;
            margin-bottom: 6px;
          }
          .operating {
            display: inline-block;
            background-color: rgba(3, 169, 172, 0.2);
            color: #03a9ac;
            font-size: 12px;
            padding: 2px 5px;
          }
        }
        .totalBox {
          display: flex;
          justify-content: flex-end;
          align-items: center;
          span {
            color: #535353;
            font-size: 13px;
            line-height: 24px;
          }
          .allPrice {
            margin-left: 5px;
            span {
              color: #535353;
              font-size: 13px;
              line-height: 24px;
            }
            i {
              color: #03a9ac;
              font-size: 18px;
              line-height: 24px;
            }
          }
        }
        .btnBox {
          border-top: 1px solid #eeeeee;
          display: flex;
          justify-content: flex-end;
          padding: 10px 0;
          span {
            width: 75px;
            height: 30px;
            line-height: 30px;
            color: #feffff;
            font-size: 12px;
            background-color: #03a9ac;
            border-radius: 5px;
            display: inline-block;
            margin-left: 10px;
            text-align: center;
            cursor: pointer;
            &.cancel {
              border: 1px solid #03a9ac;
              color: #03a9ac;
              background-color: #fff;
            }
          }
        }
      }
    }
  }
}
</style>
<style lang="scss">
.my {
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
  .suppliesList {
    &:last-child {
      margin-bottom: 0px;
    }
  }
}
</style>
