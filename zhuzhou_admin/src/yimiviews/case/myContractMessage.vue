<template>
  <div class="contractContent">
    <div class="contractList">
      <span class="frist">机构logo：</span>
      <img v-if="imageUrl" :src="imageUrl" alt class="contractImg">
      <div v-else class="svgSize">
        <svg-icon
          class-name="international-icon"
          class="avatar right_menu_item"
          icon-class="contractLogo"
        />
      </div>
      <el-upload
        class="avatar-uploader"
        :action="upLoadImage"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload"
      >
        <span>更换logo</span>
      </el-upload>
    </div>
    <div class="contractList">
      <span class="frist">机构名称：</span>
      <span v-if="compile">{{contractList.hospitalName}}</span>
      <el-input
        v-else
        v-model="contractList.hospitalName"
        size="small"
        style="width:200px;margin-top:4px;"
      ></el-input>
    </div>
    <div class="contractList">
      <span class="frist">机构类型：</span>
      <span v-if="compile">{{contractList.hospitalTypeShow}}</span>
      <dict-select
        v-else
        v-model="contractList.hospitalType"
        placeholder
        size="small"
        style="width:200px;"
        dict-code="jgxz"
      ></dict-select>
    </div>
    <div class="contractList">
      <span class="frist">地址：</span>
      <span v-if="compile">{{contractList.addressIdsShow}}</span>
      <el-cascader
        v-else
        placeholder="试试搜索：地名"
        :options="options"
        filterable
        change-on-select
        v-model="contractList.addressIds"
        style="width: 200px;"
      ></el-cascader>
    </div>
    <div class="contractList">
      <span class="frist">详细地址：</span>
      <span v-if="compile">{{contractList.address}}</span>
      <el-input
        v-else
        v-model="contractList.address"
        auto-complete="off"
        placeholder="详细地址"
        style="width: 200px;"
      ></el-input>
    </div>
    <div class="contractList">
      <span class="frist">联系人：</span>
      <span v-if="compile">{{contractList.contacts}}</span>
      <el-input
        v-else
        v-model="contractList.contacts"
        size="small"
        style="width:200px;margin-top:4px;"
      ></el-input>
    </div>
    <div class="contractList">
      <span class="frist">联系电话：</span>
      <span v-if="compile">{{contractList.contactMethod}}</span>
      <el-input
        v-else
        v-model="contractList.contactMethod"
        size="small"
        style="width:200px;margin-top:4px;"
      ></el-input>
    </div>
    <div class="contractList">
      <span class="frist">传真：</span>
      <span v-if="compile">{{contractList.fax}}</span>
      <el-input v-else v-model="contractList.fax" size="small" style="width:200px;margin-top:4px;"></el-input>
    </div>
    <div class="contractList">
      <span class="frist">邮箱：</span>
      <span v-if="compile">{{contractList.email}}</span>
      <el-input
        v-else
        v-model="contractList.email"
        size="small"
        style="width:200px;margin-top:4px;"
      ></el-input>
    </div>
    <h5>机构资质</h5>
    <div class="qualification">
      <div class="qualificationitem" v-for="image in contractList.images" :key="image.id">
        <img :src="image.src">
      </div>
    </div>
  </div>
</template>

<script>
import DictSelect from '@/views/form/dictSelect'
import { getAreaList } from '@/api/common/common'
export default {
  props: {
    contractList: {
      type: Object,
      default: function() {
        return {}
      }
    },
    compile: {
      type: Boolean,
      default: true
    }
  },
  components: { DictSelect },
  data() {
    return {
      upLoadImage: this.$store.state.app.BASE_API + '/attachment/upLoadImage',
      imageUrl: '',
      options: []
    }
  },
  mounted() {
    this.imageUrl = this.contractList.avatar
    this.getArea()
  },
  watch: {
    contractList(val) {
      console.log(val)
    }
  },
  methods: {
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw)
    },
    beforeAvatarUpload(file) { },
    getArea() {
      getAreaList().then((res) => {
        this.options = res.data.list
        this.loadingOptions = false
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.contractContent {
  padding: 20px;
  .contractList {
    display: flex;
    justify-content: flex-start;
    .svgSize {
      font-size: 30px;
    }
    .avatar-uploader {
      margin-left: 10px;
      span {
        font-size: 12px;
        color: #1890ff;
        padding-top: 10px;
        line-height: 30px;
        display: inline-block;
      }
    }
    .contractImg {
      width: 40px;
      height: 40px;
      display: inline-block;
    }
    .upload-demo {
      margin-left: 10px;
      span {
        font-size: 12px;
        color: #1890ff;
      }
    }
    span {
      font-size: 14px;
      color: #333333;
      height: 40px;
      line-height: 40px;
      &.frist {
        margin-right: 20px;
        width: 80px;
        display: inline-block;
        text-align: left;
      }
    }
  }
  h5 {
    margin: 0;
    height: 30px;
    line-height: 30px;
    font-size: 14px;
    color: #333;
    border-bottom: 1px solid #eee;
  }
  .qualification {
    margin-top: 20px;
    display: flex;
    justify-content: flex-start;
    .qualificationitem {
      width: 260px;
      height: 260px;
      text-align: center;
      display: flex;
      flex-direction: column;
      img {
        width: 100%;
        height: 100%;
        display: inline-block;
        background-color: red;
      }
    }
  }
}
</style>
<style lang="scss">
.contractContent {
  .el-input--medium {
    .el-input__inner {
      height: 32px;
      line-height: 32px;
      margin-top: 4px;
    }
  }
}
</style>