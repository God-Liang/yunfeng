<template lang="pug">
  .lg-container
    .lg-container-white
      .filter-container
        el-select.filter-item.w200(v-model="filters.province" placeholder="请选择省份" @change="handleFilter")
          el-option(v-for="item in provinceList" :key="item.city_code" :label="item.city_name" :value="item.city_name")
        //- el-input.filter-item.w200(v-model="filters.province" suffix-icon="el-icon-search" placeholder="请输入省份" @keyup.enter.native="handleFilter")
        el-input.filter-item.w200(v-model="filters.keyWord" suffix-icon="el-icon-search" placeholder="请输入医院名称" @keyup.enter.native="handleFilter")
        el-button.filter-item(type="primary" icon="el-icon-plus" @click="handleCreate") 新增
      lgTable(columns-type="index"
        columns-label="序号"
        :list="list"
        :total-list="total"
        :lg-thead="hospitalDirConst.tableAttr.thead"
        :lg-buttons="hospitalDirConst.tableAttr.buttons"
        @operationEvent0="operationEvent0"
        @operationEvent1="operationEvent1"
        @initListQuery="initListQuery"
        @getListByPagination="getListByPagination")
      lgDialog(:title="dialogTitle"
        :visible="dialogFormVisible"
        width="600px"
        :show-form="true"
        form-ref="dataForm"
        :form-rules="dataRules"
        label-width="100px"
        :value="dataForm"
        @on-submit="handleCreateOrUpdate"
        @on-close="onClose")
        template(slot="form")
          el-form-item(label="医院名称" prop="name")
            el-input.w250(v-model="dataForm.name")
          el-form-item(label="医院等级" prop="type")
            el-select.w250(v-model="dataForm.type")
              el-option(v-for="item in hospitalDirConst.hospitalLevelOptions" :key="item.value" :label="item.label" :value="item.value")
          el-form-item(label="省市区" prop="province" style='display:inline-block;width: 220px;')
            el-select.w120(v-model="dataForm.province" @change="provinceChange")
              el-option(v-for="item in provinceList" :key="item.city_code" :label="item.city_name" :value="item.city_code")
          el-form-item(label="" label-width="0" prop="city" style='display:inline-block;width: 120px;')
            el-select.w120(v-model="dataForm.city" ref="citySelect" @focus="cityClick" @change="cityChange")
              el-option(v-for="item in cityList" :key="item.city_code" :label="item.city_name" :value="item.city_code")
          el-form-item(label="" label-width="0" prop="area" style='display:inline-block;width: 120px;')
            el-select.w120(v-model="dataForm.area" @focus="areaClick" @change="areaChange")
              el-option(v-for="item in areaList" :key="item.city_code" :label="item.city_name" :value="item.city_code")
          el-form-item(label="详细地址" prop="address")
            el-input.w250(v-model="dataForm.address")
          el-form-item(label="联系电话" prop="phone")
            el-input.w250(v-model="dataForm.phone")

</template>

<script>
import { list, createOrUpdate, remove } from '@/api/common'
import lgTable from '@/views/components/lgTable'
import lgDialog from '@/views/components/lgDialog'
import { hospitalDirConst } from '@/views/platform/columnsConst'
import { getDepartments, getAreaList } from '@/api/system'
const defaultForm = {
  id: null,
  name: '',
  type: null,
  province: '',
  city: '',
  area: '',
  address: '',
  inputCode: '',
  phone: '',
  intro: ''
}
export default {
  components: { lgTable, lgDialog },
  data() {
    return {
      hospitalDirConst,
      apiUri: 'adminHospital',
      list: [],
      total: 0,
      listQuery: {
        current: 1,
        pageSize: 10
      },
      filters: {
        keyWord: ''
      },
      dataForm: Object.assign({}, defaultForm),
      dialogFormVisible: false,
      dialogTitle: '',
      dialogPvVisible: false,
      dataRules: {
        name: [{ required: true, message: '请输入医院名称', trigger: 'blur' }],
        type: [{ required: true, message: '请选择医院级别', trigger: 'change' }],
        province: [{ required: true, message: '请选择省', trigger: 'change' }],
        city: [{ required: true, message: '请选择市', trigger: 'change' }],
        area: [{ required: true, message: '请选择县/区', trigger: 'change' }],
        address: [{ required: true, message: '请输入详细地址', trigger: 'blur' }]
      },
      allDepartmentList: [], // 科室
      provinceList: [], // 省
      cityList: [], // 市
      areaList: [], // 区
      province: '', // 省
      city: '', // 市
      area: '' // 区
    }
  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val)
    }
  },
  mounted() {
    this.getList()
    this.getDepartmentList()
    this.getAcreaList()
  },
  methods: {
    getAcreaList() {
      const data = {
        level: 1
      }
      getAreaList(data).then(res => {
        if (res.code === 200) {
          this.provinceList = res.info
          this.areaList = []
          this.cityList = []
          this.dataForm.area = ''
          this.dataForm.city = ''
        }
      })
    },
    provinceChange(val) {
      const data = {
        level: 2,
        parent_code: val
      }
      getAreaList(data).then(res => {
        if (res.code === 200) {
          this.cityList = res.info
          this.areaList = []
          this.dataForm.area = ''
          this.dataForm.city = ''
          this.province = this.provinceList.filter(e => e.city_code === val)[0].city_name
        }
      })
    },
    cityClick() {
      if (this.cityList.length === 0) {
        this.$message({
          message: '请先选择省',
          type: 'warning'
        })
      }
    },
    cityChange(val) {
      const data = {
        level: 3,
        parent_code: val
      }
      getAreaList(data).then(res => {
        if (res.code === 200) {
          this.areaList = res.info
          this.dataForm.area = ''
          this.city = this.cityList.filter(e => e.city_code === val)[0].city_name
        }
      })
    },
    areaClick() {
      if (this.areaList.length === 0) {
        const message = this.cityList.length > 0 ? '请先选择市' : '请先选择省'
        this.$message({
          message: message,
          type: 'warning'
        })
        return false
      }
    },
    areaChange(val) {
      this.area = this.areaList.filter(e => e.city_code === val)[0].city_name
    },
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
      this.listQuery.page = 1
      this.getList()
    },
    // 获取列表
    getList() {
      const params = Object.assign({}, this.listQuery, this.filters)
      list(this.apiUri, params).then(res => {
        if (res.code === 200) {
          this.list = res.list
          this.total = res.total
        }
      })
    },
    // 编辑
    operationEvent0(row) {
      this.dataForm = Object.assign({}, row)
      if (this.dataForm.province) {
        this.province = this.dataForm.province
        const province = this.provinceList.filter(e => e.city_name === this.province)[0].city_code
        this.dataForm.province = province
        new Promise((resolve, reject) => {
          const data = {
            level: 2,
            parent_code: this.dataForm.province
          }
          getAreaList(data).then(res => {
            if (res.code === 200) {
              this.cityList = res.info
              resolve()
            }
          })
        }).then(() => {
          this.city = this.dataForm.city
          const city = this.cityList.filter(e => e.city_name === this.city)[0].city_code
          this.dataForm.city = city
          const data = {
            level: 3,
            parent_code: this.dataForm.city
          }
          getAreaList(data).then(res => {
            if (res.code === 200) {
              this.areaList = res.info
              this.area = this.dataForm.area
              const area = this.areaList.filter(e => e.city_name === this.area)[0].city_code
              this.dataForm.area = area
            }
          })
        })
      }
      this.dialogTitle = '更新'
      this.dialogFormVisible = true
    },
    // 删除
    operationEvent1(row) {
      this.$confirm('是否确定删除：' + row.name + '?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        remove(this.apiUri, row.id).then(res => {
          if (res.code === 200) {
            this.$notify({
              title: '成功',
              message: '删除成功',
              type: 'success',
              duration: 2000
            })
            if (this.list.length === 1 && this.listQuery.current > 1) {
              this.listQuery.current -= 1
            }
            this.getList()
          }
        })
      }).catch(() => {
        this.$notify({
          title: '取消',
          message: '已取消删除',
          type: 'info'
        })
      })
    },
    // 添加
    handleCreate() {
      this.resetForm()
      this.dialogTitle = '新增'
      this.dialogFormVisible = true
    },
    // 添加提交
    handleCreateOrUpdate() {
      const data = Object.assign({}, this.dataForm)
      data.province = this.province
      data.city = this.city
      data.area = this.area
      createOrUpdate(this.apiUri, data).then(res => {
        if (res.code === 200) {
          this.getList()
          this.dialogFormVisible = false
          this.$notify({
            title: '成功',
            message: this.dialogTitle + '成功',
            type: 'success',
            duration: 2000
          })
        }
      })
    },
    onClose() {
      this.dialogFormVisible = false
    },
    // 清空弹框表单
    resetForm() {
      this.dataForm = {
        id: null,
        name: '',
        type: null,
        province: '',
        city: '',
        area: '',
        address: '',
        inputCode: '',
        phone: '',
        intro: ''
      }
    },
    // 获取所有科室
    getDepartmentList() {
      getDepartments().then(
        (res) => {
          if (res.code === 200) {
            this.allDepartmentList = res.info
          }
        }
      )
    }
  }
}
</script>

<style lang="scss" scoped>
.filter-container {
  justify-content: flex-end;
}
</style>
