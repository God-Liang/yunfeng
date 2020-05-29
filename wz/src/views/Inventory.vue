<template>
  <div class="inventory">
    <van-row type="flex" id="header">
      <van-col class="searchBox">
        <i></i>
        <input type="text" v-model="filter.keyword" placeholder="输入资产名称、编号或简拼搜索">
      </van-col>
    </van-row>
    <div class="content">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
        :error.sync="error"
        error-text="请求失败，点击重新加载"
      >
        <div data-v-1d0a5adc class="lgItem" v-for="item in list" :key="item.id" @click="getSuppliesInfo(item)">
          <div class="info">
            <h4>{{item.mc}}</h4>
            <p>供应单位：{{item.ghdwmc | defaultVal}}</p>
            <p>
              供货单价：
              <i>{{item.dj}}</i>
              /{{item.dw}}
            </p>
          </div>
          <div class="btn">{{item.kfmc}}</div>
        </div>
      </van-list>
    </div>
    <van-popup v-model="suppliesInfoShow" id="bouncedZindex" position="bottom" :close-on-click-overlay="false">
      <div id="suppliesInfo">
        <div id="lgClose" @click="suppliesInfoShow=false">
          <img src="../assets/close.png" alt="关闭">
        </div>
        <div class="infoName">
          <h5>{{specificationInfo.wzmc | defaultVal}}</h5>
          <span>￥{{specificationInfo.dj | defaultVal}}/{{specificationInfo.dw | defaultVal}}</span>
        </div>
        <div class="infoData">
          <h3>申领数量：</h3>
          <div class="infoList">
            <span>可用库存：</span>
            <span>{{specificationInfo.kcsl | defaultVal}}</span>
          </div>
          <div class="infoList">
            <span>包装说明：</span>
            <span>{{specificationInfo.bzsm | defaultVal}}</span>
          </div>
          <div class="infoList">
            <span>供货单位：</span>
            <span>{{specificationInfo.ghdwmc | defaultVal}}</span>
          </div>
          <div class="infoList">
            <span>最小申领数：</span>
            <span>{{specificationInfo.zxsqsl | defaultVal}}</span>
          </div>
        </div>
        <div class="infoSpecification">
          <h3>产品规格：</h3>
          <div class="specificationBox">
            <span
              :class="specifications === item.ggxh ? 'active' : ''"
              v-for="item in detaliObj.cpggs"
              :key="item.ggxh"
              @click="specifications=item.ggxh;specificationInfo=item"
            >{{item.ggxh}}</span>
          </div>
        </div>
        <div class="infoNumAdd">
          <h3>
            <span>申领数量：</span>
            <van-stepper v-model="applyNum" :min="specificationInfo.zxsqsl === '' ? 1 : parseInt(specificationInfo.zxsqsl)" integer/>
          </h3>
          <button v-if="btnTage" :disabled="specificationInfo.kcsl <= 0 || specificationInfo.kcsl === ''" :class="(specificationInfo.kcsl <= 0 || specificationInfo.kcsl === '') ? 'gray': ''" id="addCart" @click="addCartApply">加入申领车</button>
          <van-button v-else loading loading-text="加载中..." type="primary" id="addCart1"/>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
// @ is an alias to /src
import { hcslList, hcslDetail, addCar } from '@/api/inventory'
import { setTimeout } from 'timers'

export default {
  name: 'Inventory',
  filters: {
    defaultVal (val) {
      if (val && val !== '') {
        return val
      } else if (val === 0) {
        return val
      } else {
        return '--'
      }
    }
  },
  watch: {
    'filter.keyword' (val, Oldval) {
      setTimeout(() => {
        this.filter.current_page = 1
        this.finished = false
        this.loading = true
        this.list = []
        this.onLoad()
      })
    }
  },
  data () {
    return {
      loading: false,
      finished: false, // 数据加载完为true
      list: [],
      suppliesInfoShow: false,
      applyNum: 1,
      filter: {
        current_page: 1,
        per_page: 10,
        keyword: ''
      },
      detaliObj: {},
      specifications: '',
      specificationInfo: {},
      btnTage: true,
      error: false
    }
  },
  methods: {
    // 列表加载
    onLoad () {
      // 异步更新数据
      setTimeout(() => {
        this.getHcslList()
      }, 500)
    },
    // 获取物资列表
    getHcslList () {
      const query = Object.assign({}, this.filter)
      hcslList(query).then(res => {
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
    // 弹出物资中心库房信息
    getSuppliesInfo (item) {
      this.applyNum = 1
      const query = {
        wzbm: item.wzbm,
        kfdm: item.kfdm
      }
      hcslDetail(query).then(res => {
        if (res.data.success) {
          if (res.data.data) {
            this.detaliObj = res.data.data
            this.specifications = this.detaliObj.cpggs[0].ggxh
            this.specificationInfo = this.detaliObj.cpggs[0]
            this.suppliesInfoShow = true
          } else {
            this.$toast('暂无数据')
          }
        }
      })
    },
    // 加入申领车
    addCartApply () {
      this.btnTage = false
      const data = {
        'data': [
          {
            'wzxh': this.specificationInfo.wzxh,
            'sl': this.applyNum,
            'kfdm': this.specificationInfo.kfdm,
            'wzlx': this.specificationInfo.wzlx
          }
        ]
      }
      addCar(data).then(res => {
        if (res.data.success) {
          // 刷新vuex申领车信息
          this.$store.dispatch('GetCarts').then(() => {})
          this.$toast.success({
            message: '加入成功',
            duration: 2000
          })
          this.btnTage = true
          this.suppliesInfoShow = false
        } else {
          this.btnTage = true
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.inventory {
  position: relative;
  height: 100%;
  #header {
    background: -webkit-linear-gradient(left, #03a9ac, #5ccccd);
    background: -o-linear-gradient(right, #03a9ac, #5ccccd);
    background: -moz-linear-gradient(right, #03a9ac, #5ccccd);
    background: linear-gradient(to right, #03a9ac, #5ccccd);
    height: 54px;
    line-height: 54px;
    padding: 0 20px;
    width: 100%;
    position: fixed;
    left: 0;
    top: 0;
    z-index: 99;
    .van-col {
      &.searchBox {
        flex: 1;
        position: relative;
        i {
          display: inline-block;
          position: absolute;
          left: 12px;
          top: 20px;
          background: url("../assets/search.png") no-repeat;
          width: 16px;
          height: 16px;
          background-size: cover;
        }
        input {
          height: 30px;
          line-height: 30px;
          width: 100%;
          border-radius: 5px;
          border: 0;
          background-color: #fff;
          padding-left: 38px;
          font-size: 14px;
          color: #333333;
          &::placeholder {
            color: #d3d3d3;
          }
        }
      }
      img {
        width: 25px;
        height: 25px;
        display: block;
        margin: 14px auto;
      }
    }
  }
  .content {
    padding: 65px 10px 0;
    height: calc(100% - 50px);
    overflow: hidden;
    .van-list {
      position: relative;
      height: 100%;
      overflow: auto;
      .lgItem[data-v-1d0a5adc] {
        background-color: #fff;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 13px 10px 15px 12px;
        border-radius: 5px;
        margin-bottom: 10px;
        .info {
          h4 {
            font-size: 14px;
            color: #333333;
            line-height: 18px;
            margin-bottom: 10px;
            font-weight: normal;
          }
          p {
            font-size: 12px;
            color: #bcbcbc;
            line-height: 18px;
            margin-bottom: 6px;
            &:last-child {
              margin-bottom: 0;
            }
            i {
              color: #03a9ac;
              font-size: 18px;
            }
          }
        }
        .btn {
          width: 75px;
          text-align: center;
          height: 30px;
          line-height: 30px;
          background-color: #03a9ac;
          border-radius: 5px;
          font-size: 14px;
          color: #fff;
        }
      }
    }
  }
  .van-popup {
    #suppliesInfo {
      border-radius: 5px;
      #lgClose {
        width: 20px;
        height: 20px;
        float: right;
        margin: 9px 9px 0 0;
        cursor: pointer;
        img {
          display: block;
          width: 100%;
          height: 100%;
        }
      }
      .infoName {
        width: 100%;
        border-bottom: 1px solid #eeeeee;
        padding: 15px;
        h5 {
          color: #545454;
          font-size: 14px;
          font-weight: normal;
          line-height: 18px;
          margin-bottom: 2px;
        }
        span {
          color: #03a9ac;
          font-size: 18px;
          line-height: 18px;
          letter-spacing: 1px;
        }
      }
      .infoData {
        border-bottom: 1px solid #eeeeee;
        padding: 8px 15px;
        h3 {
          color: #545454;
          font-weight: normal;
          font-size: 16px;
        }
        .infoList {
          display: flex;
          justify-content: space-between;
          line-height: 26px;
          span {
            font-size: 14px;
            color: #bdbdbd;
          }
        }
      }
      .infoSpecification {
        border-bottom: 1px solid #eeeeee;
        padding: 8px 15px;
        h3 {
          color: #545454;
          font-weight: normal;
          font-size: 16px;
        }
        .specificationBox {
          margin: 14px 0;
          max-height: 80px;
          overflow-y: scroll;
          display: flex;
          flex-wrap: wrap;
          justify-content: flex-start;
          span {
            padding: 5px 16px;
            border-radius: 5px;
            border: 1px solid #bdbdbd;
            color: #bdbdbd;
            font-size: 13px;
            margin-bottom: 10px;
            margin-right: 10px;
            &.active {
              border: 1px solid #03a9ac;
              color: #03a9ac;
            }
          }
        }
      }
      .infoNumAdd {
        border-bottom: 1px solid #eeeeee;
        padding: 15px;
        h3 {
          color: #545454;
          font-weight: normal;
          font-size: 16px;
          height: 28px;
          line-height: 28px;
          display: flex;
          justify-content: space-between;
        }
        #addCart {
          background-color: #03a9ac;
          width: 100%;
          height: 33px;
          line-height: 33px;
          text-align: center;
          font-size: 14px;
          color: #ffffff;
          outline: none;
          border: 0;
          margin-top: 20px;
          border-radius: 5px;
          &.gray {
            background-color: rgba(3, 169, 172, 0.5);
          }
        }
        #addCart1 {
          background-color: #03a9ac;
          width: 100%;
          height: 33px;
          line-height: 33px;
          text-align: center;
          font-size: 14px;
          color: #ffffff;
          outline: none;
          border: 0;
          margin-top: 20px;
          border-radius: 5px;
        }
      }
    }
  }
}
#bouncedZindex {
  bottom: 50px;
}
</style>
