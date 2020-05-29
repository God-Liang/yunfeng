<template>
  <div class="lg-container" v-wechat-title="$route.meta.title">
    <div class="tips">
      申请加入医疗团队前先前往个人中心维护病历
      <span @click="onNav">添加病历</span>
    </div>
    <template v-if="list.length > 0 || isTage">
      <router-link :to="'/teamDetails?teamId=' + item.id" class="li" v-for="(item,index) in list" :key="index">
        <img v-if="item.avatar" :src="item.avatar" alt />
        <img v-else src="@/assets/team/teamAvatar.png" alt />
        <div class="info">
          <div class="name">{{item.name}}</div>
          <p class="ellipsis w200">
            <span v-if="item.hospitalLevel">{{item.hospitalLevel}}</span>
            {{item.hospital}}
          </p>
          <p class="ellipsis w200">擅长手术：{{item.operation || '暂无'}}</p>
        </div>
        <Button class="focus" size="mini" color="#03A9AC" type="primary" @click="update(item)">关注</Button>
      </router-link>
    </template>
    <div v-else class="lg-null nullMore">暂无更多团队</div>
  </div>
</template>
<script>
import { Button, Toast } from 'vant'
import { getMatchTeamList, updateFollowStatus } from '@/api/team'
export default {
  components: { Button },
  name: 'component_name',
  data () {
    return {
      list: [],
      id: null,
      isTage: true
    }
  },
  mounted () {
    if (this.$route.query.id) {
      this.id = this.$route.query.id
      this.getList()
    }
  },
  methods: {
    onNav () {
      this.$router.push('/caseHistory?patientId=' + this.id)
    },
    getList () {
      Toast.loading({
        message: '加载中...',
        forbidClick: true
      })
      getMatchTeamList(this.id).then((res) => {
        this.isTage = false
        setTimeout(() => {
          Toast.clear()
        }, 1000)
        if (res.code === 200) {
          this.list = res.list
        } else {
          Toast(res.msg)
        }
      })
    },
    update (item) {
      updateFollowStatus(this.id, item.id, 1).then((res) => {
        if (res.code === 200) {
          this.getList()
          Toast('关注成功')
        } else {
          Toast(res.msg)
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.tips {
  line-height: 28px;
  background: rgba(252, 229, 231, 1);
  color: #ff0016;
  font-size: 12px;
  padding: 0 20px;
  span {
    color: #03a9ac;
    float: right;
    text-decoration: underline;
  }
}
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
    border: 1px solid rgba(188, 188, 188, 1);
    border-radius: 50%;
    margin-right: 15px;
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
  .focus {
    color: #03a9ac;
    font-size: 12px;
    margin-left: auto;
  }
}
.nullMore {
  text-align: center;
  padding: 20px 0;
}
</style>
