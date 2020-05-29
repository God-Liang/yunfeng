<template>
  <div class="lg_wrap">
    <div class="lg_informationConfig" v-loading="loading">
      <div class="manageList" v-for="list in informationConfigList" :key="list.title">
        <div class="manageTitle">{{list.title}}</div>
        <div class="manageBox" v-for="item in list.configList" :key="item.id">
          <div class="manageText">
            <span>{{item.itemName}}</span>
            <span class="last">{{item.itemIntro}}</span>
          </div>
          <el-switch
            v-model="item.itemValue"
            active-value='1'
            inactive-value='0'
            active-color="rgba(24, 144, 255, 1)"
            inactive-color="#999"
            @change="switchTage($event,item)">
          </el-switch>
          <div class="recipient">
            <span>接受人：</span>
            <!-- <img v-if="item." :src="" alt class="contractImg"> -->
            <div class="svgSize">
              <svg-icon
                class-name="international-icon"
                class="avatar right_menu_item"
                icon-class="contractLogo"
              />
            </div>
            <span>{{item.objectName}}</span>
          </div>
          <el-button type="primary" style="background-color:rgba(22, 155, 213, 1);height:26px;line-height:24px;padding:0 8px;font-size:12px;" @click="changaBox(item)">更换</el-button>
        </div>
      </div>
      <div class="changePersonnel" v-if="changePersonnelTage">
        <div class="bg"></div>
        <div class="changeBox">
          <div class="changeTop">
            <h5>更换人员</h5>
            <i class="el-icon-close" @click="closeChange"></i>
          </div>
          <div class="changePersonnelFrom">
            <div class="search">
              <el-input v-model="searchName" placeholder="请输入搜索人员"></el-input>
              <i class="el-icon-search" @click="searchBtn"></i>
            </div>
            <h5>所有人员</h5>
            <div class="personnelFrom" v-loading="loading2">
              <div class="personnelItem" v-for="(item,index) in personnelList" :key="item.id">
                <div class="svgSize">
                  <svg-icon
                    class-name="international-icon"
                    class="avatar right_menu_item"
                    icon-class="contractLogo"
                  />
                </div>
                <span class="personnelName">{{item.name}}</span>
                <span class="personnelSection">{{item.departId}}</span>
                <span class="personnelPhone">{{item.phone}}</span>
                <el-button type="primary" v-if="selected === index" class="active" disabled>更换</el-button>
                <el-button type="primary" v-else @click="changePersonnel(item.id)">更换</el-button>
              </div>
            </div>
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="currentPage"
              :page-sizes="[7]"
              :page-size="7"
              layout="total, sizes, prev, pager, next, jumper"
              :total="total">
            </el-pagination>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { list, renewal } from '@/api/informationManage/informationConfig'
import { getList } from '@/api/systemManage/user'
import qs from 'qs'
export default {
  mounted() {
    this.getInformationConfigList()
    this.handleFilter()
  },
  data() {
    return {
      item: {
        avatar: ''
      },
      informationConfigList: [], // 配置列表
      configTitle: [], // 列表标题
      changePersonnelTage: false, // 更换弹窗的显示隐藏
      searchName: '', // 搜索名字
      currentPage: 1, // 默认页码
      personnelList: [], // 人员列表
      total: 0,
      listQuery: {
        page: 1,
        limit: 7
      },
      filter: {
        keywords: ''
      },
      manageMessage: {},
      selected: -1,
      loading: true,
      loading2: false,
      statusMessage: ''

    }
  },
  methods: {
    // 配置列表
    getInformationConfigList() {
      list().then((res) => {
        if (res.data.code === 200) {
          this.informationConfigSwitch(res.data.list)
        }
      })
    },
    // 后台数据转化为前端所用格式
    informationConfigSwitch(list) {
      const itemTypeIntroArr = []
      list.forEach((v, k) => {
        itemTypeIntroArr.push(v.itemTypeIntro)
      })
      this.configTitle = Array.from(new Set(itemTypeIntroArr))
      this.configTitle.forEach(v => {
        this.informationConfigList.push({
          title: v,
          configList: list.filter(item => item.itemTypeIntro === v)
        })
      })
      this.loading = false
    },
    closeChange() {
      this.changePersonnelTage = false
    },
    handleSizeChange(val) {},
    handleCurrentChange(val) {
      this.listQuery.page = val
      this.handleFilter()
    },
    changePersonnel(id) {
      this.changePersonnelTage = false
      this.loading = true
      const objectIds = []
      objectIds.push(id)
      const data = qs.stringify({
        itemKey: this.manageMessage.itemKey,
        itemType: this.manageMessage.itemType,
        itemValue: this.manageMessage.itemValue,
        objectType: 1,
        objectIds: objectIds
      },
      { arrayFormat: 'brackets' })
      renewal(data).then((res) => {
        this.$message({
          type: 'success',
          message: '更换成功'
        })
        this.informationConfigList = []
        this.getInformationConfigList()
        this.loading = false
      })
    },
    changaBox(val) {
      this.changePersonnelTage = true
      this.manageMessage = val
      this.loading2 = true
      this.listQuery.page = 1
      this.handleFilter()
    },
    searchBtn() {
      this.filter.keywords = this.searchName
      this.listQuery.page = 1
      this.loading2 = true
      this.handleFilter()
    },
    handleFilter() {
      const query = Object.assign({}, this.listQuery, this.filter)
      getList(query).then(res => {
        this.personnelList = res.data.list
        this.total = parseInt(res.data.total)
        if (this.personnelList.filter(item => item.id === parseInt(this.manageMessage.objectId)).length > 0) {
          this.personnelList.forEach((item, index) => {
            if (parseInt(this.manageMessage.objectId) === item.id) {
              this.selected = index
            }
          })
        } else {
          this.selected = -1
        }
        setTimeout(() => {
          this.loading2 = false
        }, 500)
      })
    },
    switchTage(val, item) {
      if (item.objectId === null) {
        this.$message({
          type: 'info',
          message: '请选择接受人'
        })
        item.itemValue = 0
        return false
      }
      const objectIds = []
      const itemValue = val
      objectIds.push(item.objectId)
      const data = qs.stringify({
        itemKey: item.itemKey,
        itemType: item.itemType,
        itemValue: itemValue,
        objectType: 1,
        objectIds: objectIds
      },
      { arrayFormat: 'brackets' })
      val === '0' ? this.statusMessage = '取消设置' : this.statusMessage = '设置成功'
      renewal(data).then((res) => {
        this.$message({
          type: 'success',
          message: this.statusMessage
        })
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.lg_informationConfig {
  width: 100%;
  height: 100%;
  background-color: #fff;
  overflow: auto;
  padding: 2px;
  border-radius: 4px;
  .manageList{
    .manageTitle{
      height: 40px;
      line-height: 40px;
      background-color: rgba(230, 247, 255, 1);
      border:1px solid rgba(186, 231, 255, 1);
      border-radius: 4px;
      padding: 0 60px 0 40px;
      color:#1890FF;
      font-size: 14px;
    }
    .manageBox{
      display: flex;
      justify-content: flex-start;
      line-height: 80px;
      height: 80px;
      border-bottom:1px solid #ccc;
      padding: 0 40px;
      &:last-child{
        border:0;
      }
      .manageText{
        width: 50%;
        display: flex;
        flex-direction: column;
        margin-top: 15px;
        span{
          margin: 0;
          line-height: 24px;
          font-size: 14px;
          color:#333;
          &.last{
            color:#999999;
          }
        }
      }
    }
    .el-switch{
      margin:auto 0;
    }
    .el-button{
      margin:auto 0;
    }
    .recipient{
      display: flex;
      justify-content: flex-start;
      width: 30%;
      margin-left: 100px;
      span{
        color:#333;
        font-size: 12px;
      }
      .svgSize {
        font-size: 32px;
        margin:0 10px;
      }
      .contractImg {
        width: 40px;
        height: 40px;
        display: inline-block;
        margin:0 10px;
      }
    }
  }
  .changePersonnel {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    z-index: 1999;
    .bg {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.25);
    }
    .changeBox {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      margin: auto;
      width: 774px;
      height: 783px;
      background-color: #fff;
      .changeTop {
        height: 40px;
        line-height: 40px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid #eee;
        padding: 0 10px;
        h5 {
          margin: 0;
          color: rgba(0, 0, 0, 0.65);
        }
        i {
          line-height: 40px;
          font-weight: bold;
          cursor: pointer;
        }
      }
      .changePersonnelFrom{
        position: relative;
        height: 743px;
        padding: 30px 100px 80px;
        .search{
          position: relative;
          i{  

            position: absolute;
            right: 15px;
            top: 8px;
            cursor: pointer;
            color:#ccc;
            font-size: 18px;
          }
        }
        h5{
          color:rgba(0, 0, 0, 0.85);
          font-size:12px;
          font-weight: normal;
        }
        .personnelFrom{
          .personnelItem{
            display: flex;
            justify-content: flex-start;
            height: 40px;
            padding: 16px 0;
            border-bottom:1px solid #eee;
            box-sizing: content-box;
            .svgSize{
              font-size: 36px;
              margin-right: 10px;
              width: 10%;
            }
            span{
              font-size: 14px;
              display: inline-block;
              color:#333;
              line-height: 40px;
              width: 24%;
              text-align: center;
            }
            .el-button{
              margin-top: 8px;
              margin-left: 20px;
              background-color:rgba(22, 155, 213, 1);
              height:32px;
              line-height:30px;
              padding: 0;
              text-align: center;
              width: 56px;
              font-size:12px;
              &.active{
                color:#666666;
                background-color: rgba(242, 242, 242, 1);
                border-color: rgba(242, 242, 242, 1);
              }
            }
          }
        }
        .el-pagination{
          margin: auto;
          position: absolute;
          bottom: 40px;
          right: 30px;
        }
      }
    }
  }
}
</style>
