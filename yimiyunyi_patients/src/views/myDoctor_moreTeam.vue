
<template>
  <div class="lg-container" v-if="loading" v-wechat-title="$route.meta.title">
    <div class="noDoc" v-if="list.length===0&&info==null">
      <img src="@/assets/img/noDoc.png" alt />
      <p>暂未加入医疗团队</p>
      <p>加入医疗团队，随时随地咨询团队医生</p>
      <Button type="primary" class="join" color="#03A9AC" @click="checkMore">申请加入医疗团队</Button>
      <p class="tips" @click="checkHelp">看如何加入医疗团队</p>
    </div>
    <div v-else class="docList">
      <SwipeCell v-if="info!=null" class="defaultLi">
        <div class="li" @click="onNav">
          <img v-if="info.avatar" :src="info.avatar" alt />
          <img v-else src="@/assets/team/teamAvatar.png" alt />
          <div class="info">
            <div class="name">{{info.name}}</div>
            <p class="ellipsis w220">
              <span v-if="info.hospitalLevel">{{info.hospitalLevel}}</span>
              {{info.hospital}}
            </p>
            <p class="ellipsis w220">擅长手术：{{info.operation || '暂无'}}</p>
          </div>
          <div class="default">默认</div>
        </div>
        <template slot="right">
          <Button
            color="#BFBFBF"
            square
            type="primary"
            text="取关"
            style="height: 100%;"
            @click="update(info)"
          ></Button>
        </template>
      </SwipeCell>
      <SwipeCell v-for="(item,index) in list" :key="index">
        <router-link :to="'/teamDetails?teamId=' + item.id" class="li">
          <img v-if="info.avatar" :src="item.avatar" alt />
          <img v-else src="@/assets/team/doctor_man.jpg" alt />
          <div class="info">
            <div class="name">{{item.name}}</div>
            <p class="ellipsis w220">
              <span v-if="item.hospitalLevel">{{item.hospitalLevel}}</span>
              {{item.hospital}}
            </p>
            <p class="ellipsis w220">擅长：{{item.operation || '暂无'}}</p>
          </div>
        </router-link>
        <template slot="right">
          <Button
            color="#03A9AC"
            square
            type="danger"
            text="设为默认"
            style="height: 100%;"
            @click="setDefaultTeam(item)"
          ></Button>
          <Button
            color="#BFBFBF"
            square
            type="primary"
            text="取关"
            style="height: 100%;"
            @click="update(item)"
          ></Button>
        </template>
      </SwipeCell>
      <Button type="primary" class="checkMore" color="#03A9AC" @click="checkMore">查找更多医疗团队</Button>
    </div>
  </div>
</template>
<script>
import { Button, SwipeCell, Toast } from 'vant'
import {
  getDefaultTeamInfo,
  getTeamList,
  updateFollowStatus,
  setDefaultTeam
} from '@/api/team'
import { readOpenId, readId } from '@/api/info'
export default {
  components: { Button, SwipeCell },
  name: 'myDoctor',
  data () {
    return {
      info: {},
      list: [],
      openId: null,
      id: null,
      loading: false
    }
  },
  mounted () {
    if (this.$route.query.id) {
      this.id = this.$route.query.id
      this.readInfo()
    }
    if (this.$route.query.openId) {
      this.openId = this.$route.query.openId
      this.getInfo()
    }
  },
  methods: {
    // 通过Id获取患者信息
    async readInfo () {
      const res = await readId(this.id)
      if (res.code === 200) {
        if (res.info) {
          this.id = res.info.id
          this.openId = res.info.openId
          if (!res.info.phone) {
            this.$router.push('/?openId=' + res.info.openId)
          }
          const res1 = await getDefaultTeamInfo(this.id)
          if (res1.code === 200) {
            this.info = res1.info
          } else {
            Toast.fail(res.msg)
          }
          const res2 = await getTeamList(this.id)
          if (res2.code === 200) {
            this.list = res2.list || []
          } else {
            Toast.fail(res2.msg)
          }
        }
      } else {
        Toast.fail(res.msg)
      }
      this.loading = true
    },
    // 通过openId获取患者信息
    async getInfo () {
      const res = await readOpenId(this.openId)
      if (res.code === 200) {
        if (res.info) {
          this.id = res.info.id
          this.openId = res.info.openId
          if (!res.info.phone) {
            this.$router.push('/?openId=' + res.info.openId)
          }
          const res1 = await getDefaultTeamInfo(this.id)
          if (res1.code === 200) {
            this.info = res1.info
          } else {
            Toast.fail(res.msg)
          }
          const res2 = await getTeamList(this.id)
          if (res2.code === 200) {
            this.list = res2.list || []
          } else {
            Toast.fail(res2.msg)
          }
        }
      } else {
        Toast.fail(res.msg)
      }
      this.loading = true
    },
    onNav () {
      this.$router.push('/teamDetails?teamId=' + this.info.id + '&openId=' + this.openId)
    },
    // 设为默认
    setDefaultTeam (item) {
      Toast.loading({
        message: '加载中...',
        forbidClick: true
      })
      setDefaultTeam(this.id, item.id).then((res) => {
        Toast.clear()
        if (res.code === 200) {
          Toast('设置默认成功')
          this.getInfo()
          this.getList()
        } else {
          Toast.fail(res.msg)
        }
      })
    },
    // 取关
    update (item) {
      Toast.loading({
        message: '加载中...',
        forbidClick: true
      })
      updateFollowStatus(this.id, item.id, 0).then((res) => {
        Toast.clear()
        if (res.code === 200) {
          Toast('取关成功')
          this.getInfo()
          this.getList()
        } else {
          Toast.fail(res.msg)
        }
      })
    },
    checkMore () {
      this.$router.push({ path: '/doctorList?id=' + this.id })
    },
    checkHelp () {
      this.$router.push({ path: '/joinTeam' })
    }
  }
}
</script>
<style lang="scss" scoped>
.noDoc {
  height: 70vh;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-content: center;
  img {
    width: 105px;
    height: 110px;
    margin-bottom: 18px;
    object-fit: cover;
  }
  p {
    width: 100%;
    text-align: center;
    color: rgba(136, 136, 136, 1);
    line-height: 18px;
    font-size: 13px;
  }
  .join {
    margin-top: 35px;
    width: 90vw;
  }
  .tips {
    color: #03a9ac;
    margin-top: 10px;
  }
}
.docList {
  .li {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    height: 80px;
    padding: 0 20px;
    background: #fff;
    margin-bottom: 1px;
    img {
      height: 55px;
      width: 55px;
      // border: 1px solid rgba(188, 188, 188, 1);
      border-radius: 50%;
      margin-right: 15px;
      object-fit: cover;
    }
    .info {
      .name {
        font-size: 15px;
        color: rgba(51, 51, 51, 1);
        line-height: 30px;
      }
      p {
        font-size: 12px;
        color: rgba(136, 136, 136, 1);
        line-height: 18px;
        span {
          background: #ffbb3f;
          border-radius: 8px;
          padding: 0 10px;
          color: #fff;
          margin-right: 8px;
        }
      }
    }
    .default {
      color: #03a9ac;
      font-size: 12px;
      margin-left: auto;
    }
  }
  .defaultLi {
    margin-bottom: 10px;
    box-shadow: 0px 2px 5px 0px rgba(0, 0, 0, 0.2);
    .li {
      margin-bottom: 0;
    }
  }
  .checkMore {
    width: 90vw;
    margin: 25px 0 0 5vw;
  }
}
</style>
