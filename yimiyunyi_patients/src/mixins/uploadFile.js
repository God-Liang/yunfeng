import plupload from 'plupload'
import {
  Toast
} from 'vant'
import {
  getOssPolicy
} from '@/api/common'
export default {
  data () {
    return {
      imgUrl: '',
      aliyunServerURL: '',
      aliyunFileKey: '',
      OSSAccessKeyId: '',
      policy: '',
      signature: '',
      uploader: null
    }
  },
  mounted () {
    this.getOssPolicy()
  },
  methods: {
    getOssPolicy () {
      getOssPolicy().then(res => {
        if (res.code === 200) {
          const config = res.result
          this.aliyunServerURL = config.host
          this.aliyunFileKey = config.dir + new Date().getTime()
          this.OSSAccessKeyId = config.accessKeyId
          this.policy = config.policy
          this.signature = config.signature
          this.initPlupload()
        }
      })
    },
    set_upload_param (up, filename) {
      this.aliyunFileKey = this.aliyunFileKey + filename
      const newMultipartParams = {
        'key': this.aliyunFileKey,
        'policy': this.policy,
        'OSSAccessKeyId': this.OSSAccessKeyId,
        'success_action_status': '200', // 让服务端返回200,不然，默认会返回204
        'signature': this.signature,
        'x-oss-object-acl': 'public-read'
      }
      up.setOption({
        'url': this.aliyunServerURL,
        'multipart_params': newMultipartParams
      })
      up.start()
    },
    initPlupload () {
      const that = this
      this.uploader = new plupload.Uploader({
        runtimes: 'html5,flash,silverlight,html4',
        browse_button: 'selectfiles',
        multi_selection: false,
        container: document.getElementById('container'),
        url: that.aliyunServerURL, // 服务器端接收和处理上传文件的脚本地址
        filters: {
          mime_types: [ // 用来限定上传文件的类型
            {
              title: 'Image files',
              extensions: 'jpg,jpeg,gif,png,bmp'
            }
          ],
          max_file_size: '50mb', // 用来限定上传文件的大小
          prevent_duplicates: true // 是否允许选取重复的文件，为true时表示不允许，为false时表示允许，默认为false。如果两个文件的文件名和大小都相同，则会被认为是重复的文件
        },
        init: {
          PostInit: function () {
            document.getElementById('ossfile').innerHTML = ''
            document.getElementById('postfiles').onclick = function () {
              that.set_upload_param(that.uploader, '', false)
              return false
            }
          },
          FilesAdded: function (up, files) {
            plupload.each(files, function (file) {
              document.getElementById('ossfile').innerHTML += '<div id="' + file.id + '">' + file.name + ' (' + plupload.formatSize(file.size) + ')<b></b>' +
                '<div class="progress"><div class="progress-bar" style="width: 0%"></div></div>' +
                '</div>'
            })
          },
          BeforeUpload: function (up, file) {
            that.set_upload_param(up, file.name, true)
          },

          UploadProgress: function (up, file) {
            var d = document.getElementById(file.id)
            d.getElementsByTagName('b')[0].innerHTML = '<span>' + file.percent + '%</span>'
            var prog = d.getElementsByTagName('div')[0]
            var progBar = prog.getElementsByTagName('div')[0]
            progBar.style.width = 2 * file.percent + 'px'
            progBar.setAttribute('aria-valuenow', file.percent)
          },

          FileUploaded: function (up, file, info) {
            if (info.status === 200) {
              Toast('上传成功')
              that.imgUrl = that.aliyunServerURL + '/' + that.aliyunFileKey
              // 这一步是 上传成功后，清除进度条
              document.getElementById('ossfile').innerHTML = ''
            } else if (info.status === 203) {
              console.log('上传到OSS成功，但是oss访问用户设置的上传回调服务器失败')
              console.log('失败原因是:' + info.response)
            } else {
              console.log('失败原因是:' + info.response)
            }
          },
          Error: function (up, err) {
            if (err.code === -600) {
              Toast('选择的文件太大了！')
            } else if (err.code === -601) {
              Toast('选择的上传文件类型不对！')
            } else if (err.code === -602) {
              Toast('这个文件已经选择过一遍了！')
            } else {
              console.log(err.response)
            }
          }
        }
      })
      this.uploader.init()
    }
  }
}
