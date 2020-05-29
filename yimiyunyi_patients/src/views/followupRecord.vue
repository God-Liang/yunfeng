<template lang="pug">
  .lg-container(v-wechat-title="$route.meta.title" v-if="isTemplate")
    Search.mb10(placeholder="请输入搜索关键词" v-model="filters.keyWord" left-icon='' right-icon='https://gitee.com/picture_storage_area/follow_up_doctor/raw/master/images/message/search.png' @input="handler")
    keep-alive
      Tabs(v-model="activeName" color="#03A9AC" @change="onChange" title-active-color="#03A9AC")
        Tab(title="已处理" name="1")
        Tab(title="未处理" name="0")
    List.lg-list(v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad" :error.sync="error" error-text="请求失败，点击重新加载")
      Cell.p20(v-for="item in list" :key="item.id")
        .recordContent(@click="goNav(item)")
          .recordLeft
            .name.ellipsis {{ item.name }}
            .temporary(v-if="item.scaleType === 1") 临
          .recordRight
            .date {{ item.updateTime | parseTime('{y}-{m}-{d}') }}
            .status.status1(v-if="item.type === 1&&item.status == 0") 未填
            .status.status2(v-if="item.type === 1&&item.status == 1") 已填
            .status.status3(v-if="item.type === 2&&item.status == 0") 未读
            .status.status4(v-if="item.type === 2&&item.status == 1") 已读
          Icon(color="#B9B9B9" size="16" name="arrow")
          //- .recordRight(v-if="item.type === 1" :class="{ status: item.status === '1' }") {{ item.status === '1' ? '已填' : '未填' }}
          //- .recordRight(v-if="item.type === 2" :class="{ status: item.status === '1' }") {{ item.status === '1' ? '已读' : '未读' }}
</template>
<script>
import { Search, List, Cell, Tab, Tabs, Toast, Icon } from 'vant'
import { list } from '@/api/followup'
import { readOpenId } from '@/api/info'
export default {
  components: { Search, List, Cell, Tab, Tabs, Icon },
  data () {
    return {
      activeName: '1',
      isTemplate: true,
      // 表格列表
      list: [],
      // 表格总条数
      total: 0,
      // 页数、条数
      listQuery: {
        current: 1,
        pageSize: 10
      },
      // 过滤条件
      filters: {
        keyWord: '',
        patientId: null,
        status: 1
      },
      loading: false,
      finished: false,
      error: false,
      myInfo: {}
    }
  },
  created () {
    if (this.$route.query.openId) {
      this.readopenIdInfo(this.$route.query.openId)
    }
  },
  methods: {
    readopenIdInfo (openId) {
      readOpenId(openId).then(res => {
        if (res.code === 200) {
          if (res.info) {
            this.myInfo = res.info
            this.filters.patientId = this.myInfo.id
            if (!res.info.phone) {
              this.$router.push('/?openId=' + this.myInfo.openId)
            }
          }
        } else {
          Toast.fail(res.msg)
        }
      })
    },
    onChange (val) {
      this.filters.status = parseInt(this.activeName)
      this.handler()
    },
    onLoad () {
      setTimeout(() => {
        this.getList()
      }, 500)
    },
    handler () {
      this.listQuery.current = 1
      this.finished = false
      this.loading = true
      this.list = []
      this.onLoad()
    },
    getList () {
      const data = Object.assign({}, this.listQuery, this.filters)
      list(data).then(res => {
        if (res.code === 200) {
          // 数据全部加载完成
          if (res.list.length < 10) {
            this.finished = true
          }
          // 初始列表未空
          if (this.listQuery.current === 1) {
            this.list = []
          }
          this.list.push(...res.list)
          this.listQuery.current++
          this.loading = false
        } else {
          this.loading = false
          this.finished = true
        }
      }).catch(() => {
        this.loading = false
        this.finished = false
        this.error = true
      })
    },
    goNav (data) {
      this.$router.push('/userForm?id=' + data.id + '&isPlan=1')
    }
  }
}
</script>
<style lang="scss">
.lg-list {
  width: 100%;
  box-sizing: border-box;
  .van-cell {
    border-radius: 4px;
    &.p20 {
      padding: 14px 20px;
    }
  }
}
</style>
<style lang="scss" scoped>
.lg-container {
  width: 100vw;
  min-height: 100vh;
  background-color: #f4f4f4;
  .recordContent {
    display: flex;
    justify-content: space-between;
    align-items: center;
    align-content: flex-end;
    width: 100%;
    .recordLeft {
      flex: 1;
      display: flex;
      align-items: center;
      .name {
        max-width: 200px;
        margin-right: 5px;
      }
      .temporary {
        width: 15px;
        height: 15px;
        line-height: 15px;
        background: rgba(147, 195, 249, 1);
        border-radius: 50%;
        font-size: 10px;
        text-align: center;
        color: #fff;
      }
    }
    .recordRight {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      margin: 0 4px 0 10px;
      .date {
        font-size: 12px;
        color: #888888;
      }
      .status {
        width: 40px;
        height: 15px;
        line-height: 15px;
        text-align: center;
        background: rgba(255, 255, 255, 1);
        border-radius: 8px;
        font-size: 10px;
        margin-top: 6px;
      }
      .status1 {
        border: 1px solid #fdbb59;
        color: #fdbb59;
      }
      .status2 {
        border: 1px solid #81d4d5;
        color: #81d4d5;
      }
      .status3 {
        border: 1px solid #e60012;
        color: #e60012;
      }
      .status4 {
        border: 1px solid #03a9ac;
        color: #03a9ac;
      }
    }
  }
}
</style>
