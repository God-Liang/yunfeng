<template>
  <div class="app-container">
    <el-row type="flex" :gutter="20" justify="start" class="row-bg">
      <el-col v-for="(item, index) in userList" :key="index">
        <div class="clientItem">
          <div class="clientImg">
            <img v-if="item.avatar" :src="item.avatar" alt>
            <span>{{ item.link_man == null ? " " : item.link_man[0] }}</span>
          </div>
          <h4 class="clientName">{{ item.link_man == null ? "未填写" : item.link_man }}</h4>
          <p>联系电话: {{ item.telephone }}</p>
          <!-- <p>部门: 开发部</p> -->
          <p>拥有客户数: {{ item.company_count }}</p>
          <el-button
            type="primary"
            size="mini"
            @click="permissionsEditor(item)"
          >设置客户权限</el-button>
        </div>
      </el-col>
    </el-row>
    <lgDialog
      title="设置业务权限"
      :visible="visible"
      width="800px"
      :show-form="false"
      @on-submit="onSubmit"
      @on-close="onClose"
    >
      <template>
        <!--搜索模块-->
        <div class="flex-container">
          <el-input
            v-model="filters['company_name']"
            placeholder="请输入客户名称"
            style="width: 200px;"
            size="small"
            class="flex-item"
            @keyup.enter.native="getQXList"
          />
          <div class="flex-item">
            <span>拥有客户数：<i>{{ companyCount }}</i></span>
          </div>
        </div>
        <!--权限列表模块-->
        <el-table
          ref="multipleTable"
          :data="list"
          style="width: 100%"
          border
          @selection-change="handleSelectionChange"
          @select="selectRow"
        >
          <el-table-column
            type="selection"
            width="55"
            align="center"
            prop="ischecked"
          />
          <el-table-column label="客户名称" prop="company_name" />
          <el-table-column align="center" class-name="switchHead" width="150px">
            <template slot="header">
              <span>是否接收短信</span>
              <!-- <div class="ss">
                <el-switch
                  v-model="switchValue"
                  active-color="#13ce66"
                  inactive-color="#ff4949"
                />
              </div> -->
            </template>
            <template slot-scope="scope">
              <el-switch v-model="scope.row.is_msg" />
            </template>
          </el-table-column>
        </el-table>
      </template>
    </lgDialog>
  </div>
</template>
<script>
import { list, getList, doSome } from '@/api/common'
import lgDialog from '@/views/components/lgDialog'
import { setTimeout } from 'timers'
export default {
  components: { lgDialog },
  data() {
    return {
      userList: [],
      visible: false,
      apiUri: 'user',
      switchValue: '',
      list: [],
      selectedList: [],
      companyCount: 0,
      filters: {
        emp_id: '',
        company_name: ''
      }
    }
  },
  mounted() {
    this.getUserList()
  },
  methods: {
    getUserList() {
      list(this.apiUri, {}).then((res) => {
        if (res.success === true) {
          this.userList = res.data.list
        }
      })
    },
    permissionsEditor(row) {
      this.visible = true
      this.filters.emp_id = row.Id
      this.getQXList()
    },
    onClose() {
      this.visible = false
    },
    getSelectArr(s, r) {
      console.log(s)
      console.log(r)
    },
    // 获取列表
    getQXList() {
      const params = Object.assign({}, this.filters)
      getList('unitPower', params).then((res) => {
        if (res.success === true) {
          this.list = res.data.list
          this.companyCount = res.data.company_count
          setTimeout(() => {
            this.list.forEach((row) => {
              if (row.ischecked) {
                console.log(row)
                this.$refs.multipleTable.toggleRowSelection(row, true)
              }
            })
          }, 0)
        }
      })
    },
    selectRow(selection, row) {
      const newarr = selection.filter((res) => {
        return res.id === row.id
      })
      if (newarr.length > 0) {
        row.is_msg = true
      } else {
        row.is_msg = false
      }
    },
    handleSelectionChange(val) {
      this.selectedList = val
    },
    onSubmit() {
      const arr = this.selectedList.map((el) => {
        const obj = {
          org_id: el.id,
          type: el.is_msg ? 1 : 0
        }
        return obj
      })
      console.log(arr)
      const data = {
        emp_id: this.filters.emp_id,
        list: arr
      }
      doSome(data).then((res) => {
        console.log(res)
        this.visible = false
        this.getUserList()
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.el-table th div {
  overflow: visible;
}
.app-container {
  .el-row {
    .el-col {
      width: auto;
      .clientItem {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding: 24px;
        box-shadow: 4px 4px 40px 0 rgba(0, 0, 0, 0.05);
        border-radius: 4px;
        width: 225px;
        border: 1px solid #e9e9e9;
        &:hover {
          box-shadow: 0 1px 6px rgba(0, 0, 0, 0.2);
          border-color: rgba(0, 0, 0, 0.2);
        }
        .clientImg {
          width: 76px;
          height: 76px;
          background-color: #eee;
          border-radius: 50%;
          overflow: hidden;
          border: 2px solid #ff9329;
          span {
            font-size: 36px;
            color: #14b0b2;
            width: 76px;
            height: 76px;
            display: inline-block;
            text-align: center;
            background-color: #eee;
            line-height: 72px;
          }
          img {
            width: 76px;
            height: 76px;
            display: inline-block;
          }
        }
        h4 {
          font-size: 16px;
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
          color: #333333;
          font-weight: 700;
          margin: 10px 0;
        }
        p {
          margin: 0;
          font-size: 12px;
          color: #4b4b4b;
          line-height: 20px;
        }
        .el-button {
          margin-top: 10px;
        }
      }
    }
  }
  .flex-container {
    display: flex;
    justify-content: space-between;
    padding-bottom: 10px;
    .flex-item {
      display: inline-block;
      vertical-align: middle;
      margin-bottom: 10px;
      span {
        color: #333;
        font-size: 16px;
        i {
          font-style: normal;
          font-weight: normal;
          color: #35c4e8;
        }
      }
    }
  }
}
</style>
