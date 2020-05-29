/* 
 * 阿里云OSS上传文件
 */
import {
	getOssPolicy
} from '@/api/system.js'
import {
	uploadFile
} from '@/static/common/uploadFile'
export default {
	mounted() {

	},
	methods: {
		/**
		 * @param {String} filePath 文件路径
		 * @param {String} fileName 文件名称
		 * @param {Function} successCallback 成功回调
		 * @param {Function} errorCallback 失败回调
		 */
		uploadAli(filePath, fileName, successCallback, errorCallback) {
			new Promise((resolve, resject) => {
				// 获取阿里云配置
				getOssPolicy(res => {
					resolve(res.data.result);
				});
			}).then(config => {
				uploadFile(
					config,
					filePath,
					fileName,
					function(result) {
						console.log('result')
						console.log(result)
						successCallback && successCallback(result);
					},
					function(error) {
						errorCallback && errorCallback(error);
					}
				);
			})
		},
		/**
		 * @param {Array} sourceType 选择文件方式 ['album', 'camera']
		 * @param {Number} count 选择文件的数量
		 * @param {Function} success 成功回调
		 * @param {Function} error 失败回调
		 */
		uploadFile(sourceType, count, success, error) {
			const _this = this;
			// 选择图片或者音频
			uni.chooseImage({
				count: count,
				sourceType: sourceType,
				success: chooseImageRes => {
					const tempFiles = chooseImageRes.tempFiles;
					let maxCount = 0 // 超过文件大小的数量
					for (let i = 1; i <= tempFiles.length; i++) {
						uni.showLoading({
							title: '上传中' + i + '/' + tempFiles.length,
							mask: true
						})
						// 是否存在超过最大文件大小50MB
						console.log(tempFiles)
						if (tempFiles[i - 1].size / 1024 / 1024 > 50) {
							maxCount++
							return true
						} else {
							// 上传至阿里云
							this.uploadAli(tempFiles[i - 1].path, tempFiles[i - 1].name,
								result => {
									if (i === tempFiles.length) {
										if (maxCount === 0) {
											uni.showToast({
												title: '上传完成',
												duration: 2000
											})
										} else {
											uni.showToast({
												title: '存在' + maxCount + '个文件上传失败,文件超过50MB!',
												duration: 2000,
												icon: 'none'
											})
										}
									}
									success && success(result)
								},
								error => {
									error && error(error)
								})
						}
					}
				}
			})
		}
	}
}
