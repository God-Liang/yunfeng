import { getAllDicByType, getOssPolicy } from '@/api/common'
import { Toast } from 'vant'
import request from '@/utils/request'
export default {
  data () {
    return {

    }
  },
  methods: {
    // 获取字典列表
    getDicByType (type) {
      return new Promise((resolve, reject) => {
        getAllDicByType(type).then(res => {
          if (res.code === 200) {
            resolve(res.list)
          } else {
            reject(res)
          }
        })
      })
    },
    async uploadFile (filePath, fileName, successc, failc) {
      const res = await getOssPolicy()
      if (res.code === 200) {
        const config = res.result
        // OSS地址
        const aliyunServerURL = config.host
        // 存储路径(后台固定位置+当前时间+文件名称)
        const aliyunFileKey = config.dir + new Date().getTime() + fileName
        // 临时AccessKeyID
        const OSSAccessKeyId = config.accessKeyId
        // 加密策略
        const policy = config.policy
        // 签名
        const signature = config.signature
        const formData = new FormData()
        formData.append('key', aliyunFileKey) // 临时AccessKeyID
        formData.append('policy', policy) // 加密策略
        formData.append('OSSAccessKeyId', OSSAccessKeyId) // 临时AccessKeyID
        formData.append('signature', signature) // 签名
        formData.append('success_action_status', '200')
        formData.append('file', filePath) // 文件路径
        formData.append('name', fileName)
        formData.append('x-oss-object-acl', 'public-read') // 只读访问权限
        request({
          method: 'post',
          url: config.host,
          data: formData
        }).then(() => {
          successc(aliyunServerURL + '/' + aliyunFileKey)
        }).catch(() => {
          failc('上传失败')
        })
      }
    },
    uploadProcess (file, callback) {
      let fileResult = []
      console.log(file)
      if (file.length && file.length >= 2) {
        file.map((e, i) => {
          const index = i + 1
          Toast.loading({
            message: '上传中' + index + '/' + file.length,
            forbidClick: true,
            loadingType: 'spinner'
          })
          this.uploadFile(e.file, e.file.name,
            path => {
              fileResult.push(path)
              if (index === file.length) {
                Toast.success('上传成功')
                callback && callback(fileResult)
              }
            },
            err => {
              Toast.fail(err)
            }
          )
        })
      } else {
        Toast.loading({
          message: '上传中',
          forbidClick: true,
          loadingType: 'spinner'
        })
        this.uploadFile(file.file, file.file.name,
          path => {
            fileResult.push(path)
            Toast.success('上传成功')
            callback && callback(fileResult)
          },
          err => {
            Toast.fail(err)
          }
        )
      }
    }
  }
}
