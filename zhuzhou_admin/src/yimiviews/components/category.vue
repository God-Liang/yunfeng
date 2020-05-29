<template>
    <div class="categoryWrap" v-loading="classLoading">
      <h3>{{classfiy}}</h3>
      <el-input class="filter" v-model="selectType" clearable @keyup.enter.native="searchKey" placeholder="输入名称"></el-input>
      <div class="classfiy">
        <div class="box_card" :class= "{'active': item.value == active}" v-for="item in data" :key="item.value" @click="doSelect(item)" >
          <el-card shadow="always" >
            <el-tooltip class="item" effect="dark" :content="item.label" placement="left">
              <!-- <el-button>{{ item.label }}</el-button> -->
              <span>{{ item.label }}</span>
            </el-tooltip>
            <i v-if="operationTage" class="el-icon-edit" @click.stop="editClick(item)"></i>
            <i v-if="operationTage" class="el-icon-delete" @click.stop="deleteClick(item)"></i>
          </el-card>
        </div>
      </div>
      <el-dialog title="添加" :visible.sync="addCategoryShow">
        <el-form ref="addCategoryData" :model="addCategoryData" label-width="120px" :inline='true'>
          <el-form-item label="名称:">
              <el-input type="input" v-model ='addCategoryData.name' style="width: 196px;"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="addCategoryShow = false">取 消</el-button>
            <el-button type="primary" @click="addCategorySubmit('addCategoryData')">确 定</el-button>
        </div>
      </el-dialog>
    </div>
</template>
<script>
export default {
  props: {
    classfiy: {
      type: String,
      default: '分类'
    },
    data: {
      type: Array,
      default() {
        return []
      }
    },
    currentSelectedType: {
      type: Number,
      default: 0
    },
    classLoading: {
      type: Boolean,
      default: true
    },
    operationTage: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      addCategoryShow: false,
      addCategoryData: {},
      selectType: '',
      active: ''
    }
  },
  mounted() {},
  watch: {
    data(val, oldVal) {
      if (this.data.length > 0) {
        this.active = this.data[0].value
      }
    }
  },
  methods: {
    searchKey() {
      this.$emit('searchKey', this.selectType)
    },
    doSelect(item) {
      this.active = item.value
      this.$emit('selectedType', item)
    },
    // 编辑
    editClick(item) {
      this.$emit('editClick', item)
    },
    // 删除
    deleteClick(item) {
      this.$emit('deleteClick', item)
    }
  }
}
</script>
<style lang="scss">
.categoryWrap{
  width: 200px;
  margin: 0 20px;
  height: 100%;
  h3{
    margin: 0;
    padding: 20px 0;
  }
  .filter{
    margin: 10px 0;
  }
  .classfiy{
    height: calc(100% - 140px);
    overflow-y: scroll;
    box-shadow: 0px 1px 0px #eee;
    .box_card{
      width: 100%;
      margin: 5px 0;
      cursor: pointer;
      &.active{
        .el-card{
          background: #409EFF;
          color: #fff;
        }
      }
      span{
        display: inline-block;
        width: 80px;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
      }
      .el-icon-edit{
        margin-left: 30px;
        cursor: context-menu;
      }
      .el-icon-delete{
        margin-left: 5px;
        cursor: initial;
      }
    }
  }
}
</style>

