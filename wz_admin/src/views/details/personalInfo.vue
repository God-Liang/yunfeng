<template>
  <div class="lg-container">
    <el-container>
      <el-header class="personalHead">
        <div class="title">个人信息</div>
        <div class="operationBox">
          <el-button v-if="isEidtor" type="text" size="small" @click="onCancel">取消</el-button>
          <el-button v-if="isEidtor" type="text" size="small" @click="onSave">保存</el-button>
          <el-button v-else icon="el-icon-edit" type="text" size="small" @click="onEditor">编辑个人信息</el-button>
        </div>
      </el-header>
      <el-main class="personalMain">
        <el-row>
          <el-col :span="12">
            <label>用户名：</label>
            <span>{{ userInfo.login_name }}</span>
          </el-col>
          <el-col :span="12">
            <label>创建时间：</label>
            <span>{{ userInfo.create_date }}</span>
          </el-col>
        </el-row>
        <el-row>
          <!-- <el-col :span="12">
            <label>头像：</label>
            <img src="" alt="">
            <el-upload
              class="upload-demo"
              :action="action"
              :on-success="handleAvatarSuccess"
              :file-list="fileList"
              :show-file-list="false"
            >
              <el-button size="mini" type="primary">更换</el-button>
            </el-upload>
          </el-col> -->
          <el-col :span="12">
            <label>真实姓名：</label>
            <span v-if="!isEidtor">{{ userInfo.link_man }}</span>
            <el-input v-else v-model="userInfo.link_man" clearable size="small" placeholder="请输入真实姓名" />
          </el-col>
          <el-col :span="12">
            <label>性别：</label>
            <span v-if="!isEidtor">{{ sexList[userInfo.sex] }}</span>
            <el-select v-else v-model="userInfo.sex" size="small" placeholder="请选择性别">
              <el-option
                v-for="(item, index) in sexList"
                :key="index"
                :label="item"
                :value="index"
              />
            </el-select>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <label>出生日期：</label>
            <span v-if="!isEidtor">{{ userInfo.birthday }}</span>
            <el-date-picker
              v-else
              v-model="userInfo.birthday"
              size="small"
              type="date"
              placeholder="选择日期"
            />
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <label>邮箱：</label>
            <span v-if="!isEidtor">{{ userInfo.email }}</span>
            <el-input v-else v-model="userInfo.email" clearable size="small" placeholder="请输入邮箱" />
          </el-col>
          <!-- <el-col :span="12">
            <label>最后登录时间：</label>
            <span>{{ userInfo.link_man }}</span>
          </el-col> -->
        </el-row>
        <el-row>
          <el-col :span="24">
            <label>手机号：</label>
            <span v-if="!isEidtor">{{ userInfo.link_phone }}</span>
            <el-input v-else v-model="userInfo.link_phone" clearable size="small" placeholder="请输入手机号" />
          </el-col>
        </el-row>
        <!-- <el-row>
          <el-col :span="12">
            <label>创建人：</label>
            <span>{{ userInfo.link_man }}</span>
          </el-col>
          <el-col :span="12">
            <label>所属机构：</label>
            <span>{{ userInfo.link_man }}</span>
          </el-col>
        </el-row> -->
      </el-main>
    </el-container>
  </div>
</template>
<script>
import { getUserInfo, updateUserInfo } from '@/api/user'
export default {
  data() {
    return {
      action: this.$store.state.app.BASE_API + '/file/upload',
      userInfo: {},
      sexList: ['未知', '男', '女'],
      isEidtor: false,
      fileList: [],
      imageUrl: ''
    }
  },
  mounted() {
    this.getUserInfo()
  },
  methods: {
    getUserInfo() {
      getUserInfo().then(res => {
        this.userInfo = res.data
      })
    },
    onCancel() {
      this.isEidtor = false
      this.getUserInfo()
    },
    onSave() {
      const data = Object.assign({}, this.userInfo)
      if (data.link_man === '') {
        this.$message({
          message: '真实姓名不能为空！',
          type: 'warning'
        })
        return false
      }
      if (data.birthday === '') {
        this.$message({
          message: '出生日期不能为空！',
          type: 'warning'
        })
        return false
      }
      if (data.email === '') {
        this.$message({
          message: '邮箱不能为空！',
          type: 'warning'
        })
        return false
      }
      if (data.link_phone === '') {
        this.$message({
          message: '手机号不能为空！',
          type: 'warning'
        })
        return false
      }
      updateUserInfo(data).then(res => {
        this.$notify({
          title: '成功',
          message: '保存成功',
          type: 'success',
          duration: 2000
        })
        this.onCancel()
      })
    },
    onEditor() {
      this.isEidtor = true
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw)
    }
  }
}
</script>
<style lang="scss" scoped>
.lg-container {
  width: 100%;
  height: 100%;
  background: #f9f9f9;
  .el-container {
    padding: 0 20px 20px;
    height: 100%;
    box-sizing: border-box;
    .personalHead {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      padding: 0;
      .title {
        font-weight: 500;
        color: rgba(0, 0, 0, 0.65);
        font-size: 14px;
      }
    }
    .personalMain {
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
      height: 100%;
      background: #fff;
      box-sizing: border-box;
      .el-row {
        .el-col {
          display: flex;
          align-items: center;
          height: 40px;
          label {
            font-weight: normal;
            width: 100px;
            color: #757575;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            font-size: 12px;
            display: inline-block;
            text-align: right;
          }
          span {
            font-size: 12px;
            color: rgba(0, 0, 0, 0.65);
          }
          .el-input {
            width: 220px;
          }
          .el-date-picker {
            width: 220px;
          }
        }
      }
    }
  }
}
</style>
