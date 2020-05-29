<template>
  <div class="wrap">
    <el-tabs v-model="activePanel" type="card" @tab-click="handleClick" class="tabPanel">
      <el-tab-pane label="待交接患者" name="await">
        <div class="filter-container">
          <div class="filterBox">
            <div class="leftPart filterPart"></div>
            <div class="rightPart filterPart">
              <el-select clearable style="width: 120px" class="filter-item" v-model="filter.type">
                <el-option
                  v-for="item in handoverConst.keyWordList"
                  :label="item.label"
                  :value="item.value"
                  :key="item.value"
                ></el-option>
              </el-select>
              <el-input
                style="width: 220px;"
                class="filter-item"
                placeholder="请输入搜索条件"
                v-model="filter.keyWord"
              ></el-input>
              <el-button
                class="filter-item"
                type="primary"
                v-waves
                icon="el-icon-search"
                @click="handleFilter"
              >搜索</el-button>
            </div>
          </div>
        </div>
        <complex-table
          :columnsType="'index'"
          columnsLabel="序号"
          :list="tableList1"
          :totalList="totalList1"
          :theadList="handoverConst.theadList1"
          :operationButtons="handoverConst.operationButtons1"
          @initListQuery="initListQuery"
          @operationEvent0="operationEvent0"
          @getListByPagination="getListByPagination"
        ></complex-table>
      </el-tab-pane>
      <el-tab-pane label="已交接患者" name="history">
        <div class="filter-container">
          <div class="filterBox">
            <div class="leftPart filterPart"></div>
            <div class="rightPart filterPart">
              <el-select clearable style="width: 120px" class="filter-item" v-model="filter2.type">
                <el-option
                  v-for="item in handoverConst.keyWordList"
                  :label="item.label"
                  :value="item.value"
                  :key="item.value"
                ></el-option>
              </el-select>
              <el-input
                style="width: 220px;"
                class="filter-item"
                placeholder="请输入搜索条件"
                v-model="filter2.keyWord"
              ></el-input>
              <el-button
                class="filter-item"
                type="primary"
                v-waves
                icon="el-icon-search"
                @click="handleFilter2"
              >搜索</el-button>
            </div>
          </div>
        </div>
        <complex-table
          :columnsType="'index'"
          columnsLabel="序号"
          :list="tableList2"
          :statusArr="handoverConst.statusArr"
          :totalList="totalList2"
          :theadList="handoverConst.theadList1"
          :operationButtons="handoverConst.operationButtons2"
          @initListQuery="initListQuery"
          @operationEvent1="operationEvent1"
          @operationEvent2="operationEvent2"
          @getListByPagination="getListByPagination2"
        ></complex-table>
      </el-tab-pane>
    </el-tabs>
    <!-- 上传 -->
    <el-dialog
      title="上传文件"
      :visible.sync="dialogVisible"
      width="500px"
       v-loading="loading"
       :element-loading-text="loadText"
      :before-close="handleClose">
        <div class="lgFile">
          <h3>附件</h3>
          <el-upload
            class="upload-demo"
            style="display: inline-block;margin-right: 10px;"
            :action="action"
            :show-file-list="false"
            :headers="headerToken"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
            :file-list="fileList">
            <el-button type="text" icon="el-icon-plus">添加</el-button>
          </el-upload>
        </div>
        <div class="imgList">
          <img :src="imgUri" alt="">
          <div class="imgBox">
            <h5 :title="imgName">{{imgName}}</h5>
            <p>{{imgCreateName}} {{imgTime}}</p>
          </div>
        </div>
       
    </el-dialog>
  </div>
</template>
<script>
import complexTable from '@/views/table/complexTable'
import waves from '@/directive/waves/index.js'
import { handoverConst } from '@/yimiviews/optReady/columnsConst'
import { pageList, findAttach, saveAttach } from '@/api/optReady/handover'
import { getToken } from '@/utils/auth'
const token = getToken()
export default {
  components: { complexTable },
  data() {
    return {
      handoverConst,
      tableList1: [],
      tableList2: [],
      totalList1: 0,
      totalList2: 0,
      filter: {
        keyWord: '',
        type: null,
        isHistory: 0
      },
      filter2: {
        keyWord: '',
        type: null,
        isHistory: 1 // 历史预约
      },
      listQuery: {
        page: 1,
        limit: 10
      },
      listQuery2: {
        page: 1,
        limit: 10
      },
      activePanel: 'await',
      action: this.$store.state.app.BASE_API + '/attachment/upLoadImage',
      headerToken: { 'token': token },
      dialogVisible: false,
      fileList: [],
      loading: false,
      loadText: '',
      imgUri: '',
      imgName: '',
      imgTime: '',
      imgCreateName: '',
      handoverForm: {}
    }
  },
  mounted() {
    this.handleFilter()
    this.handleFilter2()
  },
  methods: {
    initListQuery(listQuery) {
      this.listQuery = listQuery
      this.listQuery2 = listQuery
    },
    // 交接患者
    operationEvent0(row) {
      this.$router.push('/handoverPatient/patientConnect/' + row.id)
    },
    // 上传
    operationEvent1(row) {
      this.dialogVisible = true
      this.handoverForm = row
      findAttach(row.appointId).then(res => {
        if (res.data.code === 200) {
          if (res.data.attachment) {
            this.imgUri = res.data.attachment.path
            this.imgName = res.data.attachment.fileName
            this.imgTime = res.data.attachment.createTime
            this.imgCreateName = res.data.attachment.createName
          } else {
            this.imgUri = ''
            this.imgName = ''
            this.imgTime = ''
            this.imgCreateName = ''
          }
        }
      })
    },
    // 下载
    operationEvent2(row) {
      this.loading = true
      this.loadText = '图片下载中，请稍等...'
      var iframe = document.createElement('iframe')
      iframe.src = this.$store.state.app.BASE_API + '/patientHandOver/readAttach?appointId=' + row.appointId + '&appointStatus=12'
      iframe.style.display = 'none'
      document.body.appendChild(iframe)
      this.loading = false
    },
    handleFilter() {
      const query = Object.assign({}, this.listQuery, this.filter)
      pageList(query).then(res => {
        if (res.data.code === 200) {
          this.tableList1 = res.data.list
          this.totalList1 = parseInt(res.data.total)
        }
      })
    },
    handleFilter2() {
      const query = Object.assign({}, this.listQuery2, this.filter2)
      pageList(query).then(res => {
        if (res.data.code === 200) {
          this.tableList2 = res.data.list
          this.totalList2 = parseInt(res.data.total)
        }
      })
    },
    // 分页加载
    getListByPagination(listQuery) {
      this.listQuery = listQuery
      this.handleFilter()
    },
    getListByPagination2(listQuery) {
      this.listQuery2 = listQuery
      this.handleFilter2()
    },
    handleClick(tab, event) {
      // this.handleFilter()
      // this.handleFilter2()
    },
    handleClose() {
      this.dialogVisible = false
    },
    // 上传之前
    beforeAvatarUpload(file) {
      this.loading = true
      this.loadText = '图片上传中，请稍等...'
      const isLt2M = file.size / 1024 / 1024 < 30
      if (!isLt2M) {
        this.$message.error('上传图片大小不能超过 30MB!')
      }
      return isLt2M
    },
    // 上传成功
    handleAvatarSuccess(res, file) {
      if (res.code === 200) {
        this.imgUri = res.attachment.path
        this.imgName = res.attachment.fileName
        this.imgTime = res.attachment.createTime
        this.imgCreateName = res.attachment.createName
        const data = {
          appointId: this.handoverForm.appointId,
          appointStatus: 12,
          attachId: res.attachment.id
        }
        saveAttach(data).then(res => {
          if (res.data.code === 200) {
            this.$message({
              message: '图片上传成功',
              type: 'success'
            })
          }
          this.loading = false
        })
      }
    }
  },
  computed: {
    APPLICANT_NAME() {
      this.dialogLeftTop1_1_data.applicant = this.$store.getters.name
      return this.$store.getters.name
    }
  },
  directives: {
    waves
  }
}
</script>
<style lang="scss" scope>
.tabPanel {
  height: 100%;
  background-color: #fff;
  padding-top: 10px;
  overflow: auto;
  .el-tabs__header {
    padding-left: 20px;
  }
}
.filterBox {
  display: flex;
  justify-content: space-between;
  align-items: center;
  .filterPart {
    line-height: 2;
  }
}
.lgFile {
  display: flex;
  justify-content: flex-start;
  h3 {
    font-size: 16px;
    color: #333;
    margin: 0;
    line-height: 36px;
    margin-right: 20px;
  }
}
.imgList {
  margin-top: 10px;
  display: flex;
  justify-content: flex-start;
  .imgBox {
    margin-left: 10px;
    h5 {
      color: #333;
      font-size: 16px;
      margin: 0;
      line-height: 36px;
      width: 240px;
      overflow: hidden;
      text-overflow:ellipsis;
      white-space: nowrap;
    }
    p {
      color: #666;
      font-size: 14px;
      margin: 0;
      line-height: 20px;
    }
  }
  img {
    display: block;
    width: 80px;
    height: 60px;
  }
}
</style>
