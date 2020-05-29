<template>
  <div>
    <div class="filter-container">
      <span style="font-size:12px;">过期时间：</span>
      <el-radio-group
        v-model="filters['input.qbxq']"
        size="mini"
        @change="handleFilter"
      >
        <el-radio-button :label="1">已过期</el-radio-button>
        <el-radio-button :label="2">一周内过期</el-radio-button>
        <el-radio-button :label="3">一个月内过期</el-radio-button>
        <el-radio-button :label="4">三个月内过期</el-radio-button>
        <el-radio-button :label="5">六个月内过期</el-radio-button>
      </el-radio-group>
    </div>
    <lgTable
      :has-selection="false"
      :list="list"
      :total-list="total"
      :lg-thead="userAttr.thead"
      :lg-buttons="userAttr.buttons"
      @operationEvent0="operationEvent0"
      @initListQuery="initListQuery"
      @getListByPagination="getListByPagination"
    />

    <lgDialog
      title="查看注册证"
      :visible="registerVisible"
      width="650px"
      :show-form="true"
      form-ref="asfdas"
      :form-rules="rules"
      label-width="90px"
      :value="formData"
      :action="false"
      @on-submit="dialogStatus === 'create' ? createData() : updateData()"
      @on-close="onClose"
    >
      <template slot="form">
        <div class="tit">基础信息</div>
        <el-row>
          <el-col
            :span="5"
            class="textR"
          >
            <p>证件编号: </p>
            <p>证件类型: </p>
            <p>产品名称: </p>
            <p>生产企业: </p>
            <p>有效期: </p>
            <p>是否进口: </p>
          </el-col>
          <el-col :span="19">
            <p>{{ info.certificate_no }}</p>
            <p>{{ info.category_name }}</p>
            <p>{{ info.certificate_name }}</p>
            <p>{{ info.product_factory }}</p>
            <p>{{ info.start_time | timeFilter }}至{{ info.end_time | timeFilter }}</p>
            <p>{{ info.inward===1?'是':'否' }}</p>
          </el-col>
        </el-row>
        <div class="tit">证件图片信息</div>
        <el-row class="tips">
          <el-col
            :span="5"
            class="textR"
          >
            <p>注意: </p>
          </el-col>
          <el-col :span="19">
            <p>1、图片必须盖公司红章</p>
            <p>2、图片上传时必须要把注册证首页、注册登记表、规格附页全部上传</p>
            <p>3、图片大小限制20M以内，格式BMP、pdf、jpg、png</p>
          </el-col>
        </el-row>
      </template>
    </lgDialog>
  </div>
</template>
<script>
import lgTable from '@/views/components/lgTable'
import lgDialog from '@/views/components/lgDialog'
import { list } from '@/api/common'
import { parseTime } from '@/utils'
export default {
  name: 'Remind',
  components: { lgTable, lgDialog },
  filters: {
    timeFilter(val, str) {
      const strr = str || '{y}-{m}-{d}'
      return parseTime(val, strr)
    }
  },
  data() {
    return {
      apiUri: 'certificate',
      list: [],
      total: 0,
      listQuery: {
        current: 1,
        pageSize: 10
      },
      filters: {
        'input.qbxq': 5
      },
      userAttr: {
        thead: [
          {
            label: 'certificate_name',
            text: '过期证件'
          },
          {
            label: 'category_name',
            text: '证件类型'
          },
          {
            label: 'gqts',
            text: '过期时间'
          }
        ],
        buttons: {
          status: false, // 是否区分操作状态 true：根据当前列的数据状态值使用operation[状态值]; false：使用operation[0]
          width: 100, // 表格操作列的宽度
          operation: {
            // 操作按钮配置
            0: [
              {
                name: '0',
                text: '查看',
                id: '0',
                type: 'primary'
              }
            ]
          }
        }
      },
      registerVisible: false,
      dialogStatus: 'update',
      rules: {
        type: [{ required: true }]
      },
      formData: {},
      info: {}
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    // 初始化页数与条数
    initListQuery(listQuery) {
      this.listQuery = listQuery
    },
    // 分页操作
    getListByPagination(listQuery) {
      this.listQuery = listQuery
      this.getList()
    },
    // 过滤列表
    handleFilter() {
      this.listQuery.current = 1
      this.getList()
    },
    // 获取列表
    getList() {
      const params = Object.assign({}, this.listQuery, this.filters)
      list(this.apiUri, params).then((res) => {
        if (res.success) {
          this.list = res.data.list
          this.total = res.data.total_count
          this.$emit('total', this.total)
        }
      })
    },
    operationEvent0(row) {
      this.registerVisible = true
      console.log(row)
      this.info = row
    },
    onClose() {
      this.registerVisible = false
    },
    createData() {},
    updateData() {}
  }
}
</script>
<style lang="scss" scoped>
.textR {
  text-align: right;
}
.textL {
  text-align: left;
}
.tit {
  font-size: 14px;
  color: #757575;
  font-weight: 600;
}
.tips {
  color: #bebebe;
}
</style>
