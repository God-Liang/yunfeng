/*
 *上传文件到阿里云oss
 *@param - config: 相关配置 {accessKeyId:'临时AccessKeyID', dir:'存储路径', host: 'OSS地址', policy: '加密策略', signature:'签名'}
 *@param - filePath: 文件路径
 *@param - format: 文件格式
 *@param - successc: 成功回调
 *@param - failc: 失败回调
 */ 
const uploadFile = function (config, filePath, fileName, successc, failc) {
  // OSS地址
  const aliyunServerURL = config.host
	// 存储路径(后台固定位置+随即数+文件格式)
	const aliyunFileKey = config.dir + new Date().getTime() + '_' + fileName
	// 临时AccessKeyID
	const OSSAccessKeyId = config.accessKeyId
	// 加密策略
	const policy = config.policy
	// 签名
	const signature = config.signature
  uni.uploadFile({
    url: aliyunServerURL,
    filePath: filePath,//要上传文件资源的路径
    name: 'file',//必须填file
    formData: {
      'key': aliyunFileKey,
      'policy': policy,
      'OSSAccessKeyId': OSSAccessKeyId,
      'signature': signature,
      'success_action_status': '200',
    },
    success: function (res) {
      if (res.statusCode != 200) {
        failc(new Error('上传错误:' + JSON.stringify(res)))
        return;
      }
      successc(aliyunServerURL+ '/' +aliyunFileKey);
    },
    fail: function (err) {
      failc(err);
    },
  })
}
module.exports = {
	uploadFile: uploadFile
}