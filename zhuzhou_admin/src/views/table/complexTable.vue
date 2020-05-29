<template>
  <div class="app-container">
    <el-table
      :key='tableKey'
      :data="list"
      v-loading="listLoading"
      element-loading-text="我不怕等待，因为等待的时间越长，等到之后就会越幸福！"
      fixed
      fit
      border
      highlight-current-row
      ref= 'table'
      @select = 'getRow'
      @select-all = 'getRow'
      @row-click ='getRowClick'
      style="width: 100%">

        <el-table-column
          :label='columnsLabel'
          align='center'
          v-if= 'hasSelection'
          :type="columnsType"
          :index = 'indexMethod'
          width="55">
        </el-table-column>
        <el-table-column
          v-for = "thead in theadList"
          :key = "thead.label"
          :width = "thead.label == 'ID' ||
                    thead.label == 'idCard' ||
                    thead.label == 'schedule' ||
                    thead.label == 'scheduleTime' ||
                    thead.label == 'hospTime' ||
                    thead.label == 'appointNo' ? 180
                    : (thead.label == 'phone'  ? 120 : '')"
        class-name="status-col"
        :prop="thead.label"
        :label="thead.text"
      >
        <template slot-scope="scope">
          <!-- 状态 -->
          <div
            v-if='thead.label === statusName'
            :class="{danger: scope.row[thead.label] === 0 }"
          > 
            {{statusArr[scope.row[thead.label]]}}
          </div>
          <!-- 图片 -->
          <div v-else-if='thead.label === "avatar"' style="height:50px; text-align: center;">
            <img width="50px;" height="50px;" class="avatarImg" v-if="scope.row[thead.label]" :src="scope.row[thead.label]" alt>
            <img v-else width="50px;" height="50px;" src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1547630573796&di=2cae1a5d3ab998a7f28adef4f93d0e79&imgtype=0&src=http%3A%2F%2Fpic.90sjimg.com%2Fdesign%2F00%2F67%2F59%2F63%2F58e89bee922a2.png" alt="">
          </div>
          <!-- 是否已读 -->
          <div
            v-else-if='thead.label === "isRead"'
            :class="{danger: scope.row[thead.label] === 0 }"
          >{{statusArr[scope.row[thead.label]]}}</div>
          <div
            v-else-if="thead.valueMap"
          >{{thead.valueMap.find(map=>map.key===scope.row[thead.label]).value}}</div>
          <!-- 住院时长 -->
          <div
            v-else-if='thead.label === "hospTime"'
          >
            {{scope.row[thead.label] | dateFilter}}
          </div>
          <div
            v-else-if='thead.label === "messageContent"'
            style="color: #409EFF; cursor: pointer;text-decoration:underline;"
          >
            {{scope.row[thead.label]}}
          </div>
          <!-- 校验是否需要溢出隐藏 -->
          <div
            v-else-if='overflowEvent(thead.label)'
            style="white-space: nowrap;overflow: hidden;text-overflow: ellipsis;"
            :title="scope.row[thead.label]"
          >
            {{scope.row[thead.label]}}
          </div>

          <!-- 手术预期 -->
          <div
            v-else-if='thead.label === "schedule"'
            :title="scope.row[thead.label]"
          >
            {{scope.row[thead.label] | fmtYMD}}
          </div>
          <div v-else-if='thead.label === "patientName" && community === false' style="color: #409EFF; cursor: pointer;">
            <div>
              <router-link
                :to='"/case/case/"+scope.row.appointId'
                tag="div"
              >{{scope.row[thead.label]}}</router-link>
            </div>
          </div>
          <div
            v-else-if='thead.label === "operationName"'
            style="color: #409EFF; cursor: pointer;"
            @click="getSurgeryInfo(scope.row.operationNo)"
          >{{scope.row[thead.label]}}</div>
          <div v-else-if="/time|day/i.test(thead.label)">{{scope.row[thead.label] | dataFormat}}</div>
          <div v-else>{{scope.row[thead.label]}}</div>
        </template>
      </el-table-column>

      <el-table-column
        v-if="hasOperate"
        label="操作"
        :width="fixation ? fixation : 100 * operationButtons.length"
        align="center"
        class-name="small-padding fixed-width"
        fixed="right"
      >
        <template slot-scope="scope">
          <el-button
            v-for="button in operationButtons"
            size="small"
            :type="button.type"
            @click="fun(scope.row, button.id)"
            :key="button.name"
          >
            <router-link
              v-if="button.router"
              tag="span"
              :to='button.router+ "/"+scope.row.id'
            >{{button.text}}</router-link>
            <span v-else>{{button.text}}</span>
          </el-button>
        </template>
      </el-table-column>

      <el-table-column
        v-if="moreHasOperate"
        label="操作"
        :width="fixation ? fixation : 100 * operationButtons.length"
        align="center"
        class-name="small-padding fixed-width"
        fixed="right"
      >
        <template slot-scope="scope">
          <span
            v-if="scope.row[statusName] == 1 && statusName == 'applyStatus'"
            style="color:#ccc;font-size:12px;"
          >{{operationButtons[1][0].text}}</span>
          <el-button
            v-else
            v-for="button in operationButtons[scope.row[statusName]]"
            size="small"
            :type="button.type"
            @click="fun(scope.row, button.id, button.jurisdiction)"
            :key="button.name"
          >
            <router-link
              v-if="button.router"
              tag="span"
              :to='button.router+ "/"+scope.row.id'
            >{{button.text}}</router-link>
            <span v-else-if="button.color" tag="span" :style="'color:' + button.color + ';'">{{button.text}}</span>
            <span v-else>{{button.text}}</span>
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="pagination-container" style="text-align: right;">
      <el-pagination
        ref="pagination"
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="listQuery.page"
        :page-sizes="[10,20,50,100]"
        :page-size="listQuery.limit"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalList"
      ></el-pagination>
    </div>
    <el-dialog title="手术简介" :visible.sync="surgeryInfoShow">
      <el-row>
        <el-col>
          <div>
            <h3>手术名称：</h3>
            <p style="padding-left:20px;">{{surgeryInfo.name}}</p>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <div>
            <h3>手术类型：</h3>
            <p style="padding-left:20px;">{{surgeryInfo.typeShow}}</p>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <div>
            <h3>手术简介：</h3>
            <p style="padding-left:20px;" v-html="surgeryInfo.introduction"></p>
          </div>
        </el-col>
      </el-row>
    </el-dialog>
  </div>
</template>

<script>
import waves from '@/directive/waves' // 水波纹指令
import { read as operationRead } from '@/api/knowledgeManage/operationDirectory'
export default {
  name: 'complexTable',
  directives: {
    waves
  },
  filters: {
    dateFilter(time) {
      if (time) {
        const hours = Math.floor(time / 60 / 60)
        const minutes = Math.floor(time / 60) % 60
        const seconds = time % 60
        return (hours < 10 ? '0' + hours : hours) + '时' + (minutes < 10 ? '0' + minutes : minutes) + '分' + (seconds < 10 ? '0' + seconds : seconds) + '秒'
      } else {
        return 0
      }
    }
  },
  props: {
    fixation: {
      type: String,
      default: null
    },
    hasSelection: {
      type: Boolean,
      default: true
    },
    hasFollowId: {
      type: Boolean,
      default: false
    },
    community: {
      type: Boolean,
      default: false
    },
    serverId: {
      type: Boolean,
      default: false
    },
    columnsLabel: {
      type: String,
      default: '#'
    },
    columnsType: {
      type: String,
      default: 'selection'
    },
    hasOperate: {
      type: Boolean,
      default: true
    },
    doctorAuditTage: {
      type: Boolean,
      default: false
    },
    moreHasOperate: {
      type: Boolean,
      default: false
    },
    list: {
      type: Array,
      default: function() {
        return []
      }
    },
    theadList: {
      type: Array,
      default: function() {
        return []
      }
    },
    statusName: {
      type: String,
      default: function() {
        return 'status'
      }
    },
    operationButtons: {
      type: Array,
      default: function() {
        return []
      }
    },
    statusArr: {
      type: Array,
      default: function() {
        return ['不通过', '通过']
      }
    },
    totalList: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      // 溢出隐藏的字段
      overflowArr: ['anesthetistTypeShow', 'formTitle', 'operationName', 'beforeDiagnosis', 'eduContent'],
      tableKey: 0,
      listQuery: {
        page: 1,
        limit: 10
      },
      temp: {
        id: undefined,
        importance: 1,
        remark: '',
        timestamp: new Date(),
        title: '',
        type: '',
        status: 'published'
      },
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: 'Edit',
        create: 'Create'
      },
      dialogPvVisible: false,
      pvData: [],
      rules: {
        type: [
          { required: true, message: 'type is required', trigger: 'change' }
        ],
        timestamp: [
          {
            type: 'date',
            required: true,
            message: 'timestamp is required',
            trigger: 'change'
          }
        ],
        title: [
          { required: true, message: 'title is required', trigger: 'blur' }
        ]
      },
      downloadLoading: false,
      surgeryInfo: {},
      surgeryInfoShow: false
    }
  },
  computed: {
    listLoading() {
      return this.$store.getters.listLoading
    }
  },
  created() {
    this.$emit('initListQuery', this.listQuery)
  },
  methods: {
    overflowEvent(val) {
      let fage = false
      this.overflowArr.forEach(v => {
        if (v === val) {
          fage = true
        }
      })
      return fage
    },
    getRow(s, r) {
      this.$emit('getSelectArr', s, r)
    },
    getRowClick(r, e, c) {
      this.$emit('getRowClick', r, e, c)
    },
    fun(row, buttonId, jurisdiction) {
      if (jurisdiction) { // 按钮存在权限校验
        let routeTage = false // 是否有按钮的权限
        const btnRouters = this.$store.getters.btnRouters
        btnRouters.map(v => {
          if (v.permissionValue === name) {
            routeTage = true
          }
        })
        if (!routeTage) {
          this.$message({
            message: '该角色无此按钮权限',
            type: 'warning'
          })
          return false
        }
      }
      this.$emit('operationEvent' + buttonId, row)
    },
    getList() {
      this.$emit('getListByPagination', this.listQuery)
    },
    handleFilter() {
      this.$refs.pagination.lastEmittedPage = 1 // 手动触发 @current-page事件
      this.listQuery.page = 1 // 通过筛选条件每次请求默认第一页
      this.getList()
    },
    handleSizeChange(val) {
      this.listQuery.limit = val
      this.getList()
    },
    handleCurrentChange(val) {
      this.listQuery.page = val
      this.getList()
    },
    indexMethod(index) {
      return this.listQuery.limit * (this.listQuery.page - 1) + index + 1
    },
    getSurgeryInfo(id) {
      operationRead(id).then(res => {
        if (res.data.info) {
          this.surgeryInfo = res.data.info
        }
      })
      this.surgeryInfoShow = true
    }
  }
}
</script>
<style lang="scss">
.el-table th.is-leaf {
  background-color: #f4f4f4;
  color: #666;
}
.filter-container {
  line-height: 2.5;
}
.danger {
  color: red;
}
.avatarImg {
  width: 50px;
  height: 50px;
  border-radius: 50%;
}
.el-dialog__body {
  border-top: 1px solid #ddd;
}
</style>

