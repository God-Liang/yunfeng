<template>
  <div class="aa">
    <el-upload
      :action="action"
      list-type="picture-card"
      :file-list="fileList"
      :headers="headers"
      :on-preview="handlePictureCardPreview"
      :on-remove="handleRemove"
      :on-success="handleSuccess"
    >
      <i class="el-icon-plus" />
    </el-upload>
    <el-dialog :visible.sync="dialogVisible" append-to-body>
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
  </div>
</template>
<script>
import { getToken } from '@/utils/auth'
export default {
  name: 'UploadImg',
  props: {
    imgList: {
      type: Array,
      default: function() {
        return []
      }
    },
    imgUrl: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      action: this.$store.state.app.BASE_API + '/file/upload',
      headers: {
        Authorization: getToken()
      },
      fileList: [],
      dialogImageUrl: '',
      dialogVisible: false
    }
  },
  watch: {
    imgList(val, oldval) {
      this.initList()
    },
    imgUrl(val, oldval) {
      this.initList()
    }
  },
  mounted() {
    this.initList()
  },
  methods: {
    initList() {
      this.fileList = this.imgList.map(res => {
        const file = {
          name: res.file_name,
          url: res.file_path,
          response: {
            data: {
              attach_id: res.id,
              file_name: res.file_name,
              url: res.file_path
            }
          }
        }
        return file
      })
      if (this.imgUrl !== '') {
        this.fileList = [
          {
            name: '',
            url: this.imgUrl,
            response: {
              data: {
                attach_id: '',
                file_name: '',
                url: this.imgUrl
              }
            }
          }
        ]
      }
      // console.log(this.fileList)
    },
    // 上传图片成功
    handleSuccess(response, file, fileList) {
      const attach_ids = fileList.map(res => {
        return res.response.data.attach_id
      })
      this.$emit('change', attach_ids.join(','))
      //   this.formData.attach_id = attach_ids.join(',')
    },
    // 删除图片
    handleRemove(file, fileList) {
      const attach_ids = fileList.map(res => {
        return res.response.data.attach_id
      })
      this.$emit('change', attach_ids.join(','))
      //   this.formData.attach_id = attach_ids.join(',')
    },
    // 查看图片
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    }
  }
}
</script>
<style lang="scss" scoped>
.aa {
  //   height: 150px;
  //   overflow: auto;
}
</style>
