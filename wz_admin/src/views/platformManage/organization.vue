<template>
  <div class="lg-container app-container">
    <div class="lg-container-white">
      <div class="filter-container">
        <el-select
          v-model="filters.emp_type"
          size="small"
          style="width: 136px;"
          placeholder="机构类型"
          clearable
        >
          <el-option
            v-for="item in orgType"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
        <el-select
          v-model="filters.examine"
          size="small"
          style="width: 136px;"
          placeholder="审核状态"
          clearable
        >
          <el-option
            v-for="item in auditStatus"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
        <el-select
          v-model="filters.is_stop"
          size="small"
          style="width: 136px;"
          placeholder="机构状态"
          clearable
        >
          <el-option
            v-for="item in orgStatus"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
        <el-input
          v-model="filters.query"
          placeholder="机构名称/联系电话/联系人"
          style="width: 200px;"
          class=" el-input--small"
          @keyup.enter.native="getList"
        />
        <el-button
          v-waves
          class="el-button--small"
          type="primary"
          icon="el-icon-search"
          @click="getList"
        >搜索</el-button>
      </div>
      <div class="lg-tabel-container">
        <el-table
          :data="tableData"
          border
          stripe
          style="width: 100%"
          element-loading-text="加载中..."
          fixed
          fit
          highlight-current-row
        >
          <el-table-column
            type="index"
            width="50"
            align="center"
            label="序号"
          />
          <el-table-column
            prop="company_name"
            align="center"
            label="机构名称"
          />
          <el-table-column
            prop="emp_type_name"
            align="center"
            label="机构类型"
          />
          <el-table-column
            prop="company_type_name"
            align="center"
            label="单位类型"
          />
          <el-table-column prop="link_man" align="center" label="联系负责人" />
          <el-table-column prop="link_phone" align="center" label="手机号" />
          <el-table-column prop="examine" align="center" label="审核状态">
            <template slot-scope="scope">
              <span v-if="scope.row.examine == 0">待完善</span>
              <span v-else-if="scope.row.examine == 1">待审核</span>
              <span v-else-if="scope.row.examine == 2">审核通过</span>
              <span v-else-if="scope.row.examine == 3">审核失败</span>
            </template>
          </el-table-column>
          <el-table-column prop="create_date" align="center" label="提交时间" />
          <el-table-column prop="is_stop" align="center" label="机构状态">
            <template slot-scope="scope">
              <el-tag v-if="scope.row.is_stop == 1" type="danger">停用</el-tag>
              <el-tag v-else>启用</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center" width="250">
            <template slot-scope="scope">
              <el-button
                size="small"
                type="primary"
                @click="getInfo(scope.row, 1)"
              >
                查看</el-button>
              <el-button
                v-if="scope.row.examine == 1"
                size="small"
                type="primary"
                @click="getInfo(scope.row, 2)"
              >审核</el-button>
              <el-button
                v-if="scope.row.is_stop == 1"
                size="small"
                type="primary"
                @click="changeStop(scope.row.Id, 0)"
              >启用</el-button>
              <el-button
                v-else
                size="small"
                type="danger"
                @click="changeStop(scope.row.Id, 1)"
              >停用</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          ref="pagination"
          style="float:right;margin-top:20px;"
          background
          :current-page="filters.current_page"
          :page-sizes="[10, 20, 50, 100]"
          :page-size="filters.per_page"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>

      <el-dialog title="机构审核" :visible.sync="dialogVisible" width="550px">
        <div class="infoContent">
          <el-row>
            <el-col :span="3">
              <h4 style="line-height:30px;margin:0">基本信息</h4></el-col>
          </el-row>
          <el-row>
            <el-col :span="5" :offset="3" class="clabel">机构名称：</el-col>
            <el-col :span="15" class="cvalue">
              {{ info.company_name }}
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="5" :offset="3" class="clabel">机构类型：</el-col>
            <el-col :span="15" class="cvalue">
              <span v-if="info.emp_type == 1">企业</span>
              <span v-else>医疗机构</span>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="5" :offset="3" class="clabel">法人：</el-col>
            <el-col :span="15" class="cvalue">{{ info.corporation }}</el-col>
          </el-row>
          <el-row>
            <el-col :span="5" :offset="3" class="clabel">机构注册地址：</el-col>
            <el-col :span="15" class="cvalue"> {{ info.address }}</el-col>
          </el-row>
          <el-row>
            <el-col :span="5" :offset="3" class="clabel">固话：</el-col>
            <el-col :span="15" class="cvalue">{{ info.telephone }}</el-col>
          </el-row>

          <el-row>
            <el-col :span="3">
              <h4 style="line-height:30px;margin:0">扩展信息</h4>
            </el-col>
          </el-row>
          <div
            v-for="item in info.unit_c_list"
            :key="item.Id"
            style="margin-bottom:15px;"
          >
            <!-- <div v-if="item.attachment_list.length > 0"> -->
            <div>
              <el-row>
                <el-col :span="5" :offset="3" class="clabel">证件类型：</el-col>
                <el-col :span="15" class="cvalue">
                  {{ item.name }}
                </el-col>
              </el-row>
              <el-row v-if="item.is_show">
                <el-col :span="5" :offset="3" class="clabel">证号：</el-col>
                <el-col :span="15" class="cvalue">
                  {{ item.code }}
                </el-col>
              </el-row>
              <el-row v-if="item.is_show">
                <el-col :span="5" :offset="3" class="clabel">有效期：</el-col>
                <el-col :span="15" class="cvalue">
                  {{ item.starttime }} — {{ item.endtime }}</el-col>
              </el-row>
              <el-row>
                <el-col :span="5" :offset="3" class="clabel">证件照：</el-col>
                <el-col :span="15" class="cvalue">
                  <img
                    v-for="img in item.attachment_list"
                    :key="img.id"
                    style="width:90px;height:60px;margin-right:10px;"
                    :src="img.file_path"
                  >
                </el-col>
              </el-row>
            </div>
          </div>

          <el-row v-if="isExamine">
            <el-col :span="5" :offset="3" class="clabel">审核结果：</el-col>
            <el-col :span="15" class="cvalue">
              <el-radio-group v-model="examine">
                <el-radio :label="2">通过</el-radio>
                <el-radio :label="3">不通过</el-radio>
              </el-radio-group>
              <el-input
                v-model="examine_msg"
                type="textarea"
                :rows="4"
                placeholder="请输入拒绝的原因"
              />
              <el-button
                type="primary"
                style="margin-top:15px;"
                @click="setExamine"
              >
                确认</el-button>
            </el-col>
          </el-row>
        </div>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import { list, info2, operation } from '@/api/organization'
import waves from '@/directive/waves'
export default {
  name: 'Organization',
  directives: {
    waves
  },
  data() {
    return {
      orgType: [
        { value: 1, label: '企业' },
        { value: 2, label: '医疗机构' }
      ],
      auditStatus: [
        { value: 0, label: '待完善' },
        { value: 1, label: '待审核' },
        { value: 2, label: '审核通过' },
        { value: 3, label: '审核失败' }
      ],
      orgStatus: [
        { value: 0, label: '启用' },
        { value: 1, label: '停用' }
      ],
      filters: {},
      total: 0,
      tableData: [],
      dialogVisible: false,
      info: {},
      examine: '0',
      examine_msg: '',
      isExamine: false
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    handleSizeChange(val) {
      this.filters.per_page = val
      this.getList()
    },
    handleCurrentChange(val) {
      this.filters.current_page = val
      this.getList()
    },

    getList() {
      list(this.filters).then(res => {
        this.tableData = res.data.list
        this.total = res.data.total_count
      })
    },
    getInfo(row, type) {
      info2({ id: row.Id }).then(res => {
        this.info = res.data
        this.dialogVisible = true
      })
      if (type === 2) {
        this.isExamine = true
      } else {
        this.isExamine = false
      }
    },
    setExamine() {
      const obj = {
        id: this.info.Id,
        examine: parseInt(this.examine),
        examine_msg: this.examine_msg
      }
      operation(obj).then(res => {
        if (res.success) {
          this.getList()
          this.dialogVisible = false
        }
      })
    },
    changeStop(id, is_stop) {
      const obj = {
        id,
        is_stop
      }
      operation(obj).then(res => {
        console.log(res)
        if (res.success) {
          this.getList()
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.infoContent {
  line-height: 30px;
  .clabel {
    text-align: right;
  }
}
</style>
