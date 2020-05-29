<template>
	<view class="lg-container">
		<uni-nav-bar left-icon="back" title="认证信息" @clickLeft="onLeftTap"></uni-nav-bar>
		<view class="uploadType">
			<view class="tit">上传资料</view>
			<view class="uni-list">
				<radio-group @change="radioChange">
					<label class="list-label" v-for="(item, index) in list" :key="index">
						<view><radio :value="item.value" :checked="item.value === uploadType" color="#03a9ac" style="transform:scale(0.6)" /></view>
						<view>{{ item.name }}</view>
					</label>
				</radio-group>
			</view>
		</view>
		<view class="uploadImg">
			<view class="tit">{{ title }}</view>
			<view class="img-container">
				<view class="upload-case" @tap="onPreview">
					<image :src="urls[uploadType]" mode="aspectFill"></image>
					<text>查看范例（照片页）</text>
				</view>
				<view class="img-item img-upload-btn" @tap="uploadImg">
					<image v-if="authUrl2 && uploadType === '1'" :src="authUrl2" mode="aspectFill"></image>
					<image v-else-if="authUrl1 && uploadType === '2'" :src="authUrl1" mode="aspectFill"></image>
					<image v-else-if="professionUrl && uploadType === '3'" :src="professionUrl" mode="aspectFill"></image>
					<image v-else-if="jobUrl && uploadType === '4'" :src="jobUrl" mode="aspectFill"></image>
					<image v-else class="border0" src="/static/mine/upload.png" mode=""></image>
				</view>
			</view>
		</view>
		<view class="btn"><button class="submit" @tap="submit">提交</button></view>
	</view>
</template>

<script>
import uploadJs from '@/mixins/uploadFile';
import { updateInfo } from '@/api/mine';
import { mapGetters } from 'vuex';
export default {
	mixins: [uploadJs],
	computed: {
		...mapGetters(['myInfo'])
	},
	data() {
		return {
			list: [
				{
					value: '1',
					name: '胸牌/工作证'
				},
				{
					value: '2',
					name: '医师资格证'
				},
				{
					value: '3',
					name: '医师执业证'
				},
				{
					value: '4',
					name: '医生职称证'
				}
			],
			urls: {
				'1': 'https://gitee.com/picture_storage_area/follow_up_doctor/raw/master/images/mine/handheld.jpg',
				'2': 'https://gitee.com/picture_storage_area/follow_up_doctor/raw/master/images/mine/case3.jpg',
				'3': 'https://gitee.com/picture_storage_area/follow_up_doctor/raw/master/images/mine/case1.jpg',
				'4': 'https://gitee.com/picture_storage_area/follow_up_doctor/raw/master/images/mine/case2.jpg'
			},
			uploadType: '1',
			title: '胸牌/工作证',
			authUrl1: '',
			authUrl2: '',
			professionUrl: '',
			jobUrl: ''
		};
	},
	onShow() {
		this.id = this.myInfo.id;
		if (uni.getStorageSync('attestationInfo')) {
			const attestationInfo = uni.getStorageSync('attestationInfo');
			if (attestationInfo.uploadType) {
				this.uploadType = attestationInfo.uploadType
				this.authUrl1 = attestationInfo.authUrl1
				this.authUrl2 = attestationInfo.authUrl2
				this.professionUrl = attestationInfo.professionUrl
				this.jobUrl = attestationInfo.jobUrl
			}
		}
	},
	methods: {
		onLeftTap() {
			uni.navigateBack({ delta: 1 });
		},
		radioChange(e) {
			this.uploadType = e.detail.value;
			this.title = this.list.filter(v => v.value === this.uploadType)[0].name;
		},
		onPreview() {
			if (uni.getStorageSync('attestationInfo')) {
				const attestationInfo = uni.getStorageSync('attestationInfo');
				attestationInfo.uploadType = this.uploadType
				attestationInfo.authUrl1 = this.authUrl1
				attestationInfo.authUrl2 = this.authUrl2
				attestationInfo.professionUrl = this.professionUrl
				attestationInfo.jobUrl = this.jobUrl
				uni.setStorageSync('attestationInfo', attestationInfo)
			}
			uni.previewImage({
				urls: [this.urls[this.uploadType]],
				longPressActions: {
					success: function(data) {},
					fail: function(err) {}
				}
			});
		},
		uploadImg() {
			this.uploadFile(
				['album', 'camera'],
				1,
				imgUrl => {
					switch (this.uploadType) {
						case '1':
							this.authUrl2 = imgUrl
							break;
						case '2':
							this.authUrl1 = imgUrl
							break;
						case '3':
							this.professionUrl = imgUrl
							break;
						case '4':
							this.jobUrl = imgUrl
							break;
						default:
							break;
					}
					if (uni.getStorageSync('attestationInfo')) {
						const attestationInfo = uni.getStorageSync('attestationInfo');
						attestationInfo.uploadType = this.uploadType
						attestationInfo.authUrl1 = this.authUrl1
						attestationInfo.authUrl2 = this.authUrl2
						attestationInfo.professionUrl = this.professionUrl
						attestationInfo.jobUrl = this.jobUrl
						uni.setStorageSync('attestationInfo', attestationInfo)
					}
				},
				error => {
					this.$helper.toast('none', error)
				}
			);
		},
		submit() {
			if (!this.authUrl2 && !this.authUrl1 && !this.professionUrl && !this.jobUrl) {
				this.$helper.toast('none', '至少上传一份资料')
				return false;
			}
			this.$helper.loading('提交中')
			const attestationInfo = uni.getStorageSync('attestationInfo');
			const data = {
				id: this.id,
				nick: attestationInfo.nick,
				doctor: {
					doctorHospital: attestationInfo.doctorHospital,
					doctorHospitalLevel: attestationInfo.doctorHospitalLevel,
					department: attestationInfo.department,
					professionCallShow: attestationInfo.professionCallShow,
					professionCallType: attestationInfo.professionCallType,
					verifyStatus: 2,
					authUrl1: this.authUrl1,
					authUrl2: this.authUrl2,
					professionUrl: this.professionUrl,
					jobUrl: this.jobUrl
				},
				type: attestationInfo.type,
				typeShow: attestationInfo.type === 3 ? '随访医生' : '护士'
			};
			updateInfo(data, res => {
				uni.hideLoading();
				uni.removeStorageSync('attestationInfo');
				this.$store.dispatch('getMyInfo').then(() => {
					this.$helper.toNew('/pages/mine/attestation/attestationSubmit')
				})
			});
		}
	}
};
</script>

<style lang="scss">
.lg-container {
	.uploadType {
		background: #fff;
		padding: 20rpx 40rpx;
		margin-bottom: 20rpx;
		.tit {
			line-height: 60rpx;
			font-size: 30rpx;
		}
		.list-label {
			display: flex;
			justify-content: flex-start;
			font-size: 26rpx;
			line-height: 50rpx;
		}
	}
	.uploadImg {
		background: #fff;
		padding: 20rpx 40rpx;
		margin-bottom: 50rpx;
		.tit {
			line-height: 60rpx;
			font-size: 30rpx;
		}
		.img-container {
			display: flex;
			justify-content: flex-start;
			align-items: center;
			// flex-wrap: wrap;
			width: 100%;
			.upload-case {
				width: 240rpx;
				height: 155rpx;
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				margin-right: 40rpx;
				text {
					color: #888888;
					font-size: 26rpx;
				}
				image {
					width: 110rpx;
					height: 85rpx;
					margin-bottom: 14rpx;
				}
			}
			.img-item {
				width: 155rpx;
				height: 155rpx;
				margin: 20rpx 35rpx 20rpx 0;
				image {
					width: 100%;
					height: 100%;
					border: 1px solid #dcdcdc;
					box-sizing: border-box;
					&.border0 {
						border: none;
					}
				}
				&:nth-child(3n) {
					margin: 40rpx 0 0 0;
				}
			}
		}
	}
	.btn {
		padding: 0 40rpx;
		.submit {
			width: 100%;
			background: #03a9ac;
			color: #fff;
			font-size: 26rpx;
			line-height: 80rpx;
		}
	}
}
</style>
