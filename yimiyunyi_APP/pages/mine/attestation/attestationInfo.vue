<template>
	<view class="lg-container">
		<uni-nav-bar left-icon="back" rightText="认证说明" title="认证信息" @clickLeft="onLeftTap" @clickRight="onRightTap"></uni-nav-bar>
		<view class="upload-container">
			<view class="upload-title"><text>本人着白大褂手持工牌照片：</text></view>
			<view class="upload-content">
				<view class="upload-case" @tap="onPreview(1)">
					<image src="https://gitee.com/picture_storage_area/follow_up_doctor/raw/master/images/mine/handheld.jpg" mode=""></image>
					<text>查看范例</text>
				</view>
				<view class="upload-mine upload-ml">
					<image v-if="attestationData.authUrl2" :src="attestationData.authUrl2" mode="aspectFill"></image>
					<image v-else src="https://gitee.com/picture_storage_area/follow_up_doctor/raw/master/images/mine/upload.png" mode="aspectFill"></image>
				</view>
			</view>
		</view>
		<view class="upload-container">
			<view class="upload-title"><text>身份证正反面：</text></view>
			<view class="upload-content">
				<view class="upload-mine">
					<image v-if="attestationData.idCardUrl1" :src="attestationData.idCardUrl1" mode="aspectFill"></image>
					<image v-else src="https://gitee.com/picture_storage_area/follow_up_doctor/raw/master/images/mine/upload.png" mode="aspectFill"></image>
				</view>
				<view class="upload-mine upload-ml">
					<image v-if="attestationData.idCardUrl2" :src="attestationData.idCardUrl2" mode="aspectFill"></image>
					<image v-else src="https://gitee.com/picture_storage_area/follow_up_doctor/raw/master/images/mine/upload.png" mode="aspectFill"></image>
				</view>
			</view>
		</view>
		<view class="upload-container">
			<view class="upload-title"><text>医师资格证（所有内容页）</text></view>
			<view class="upload-content">
				<view class="upload-case">
					<image src="https://gitee.com/picture_storage_area/follow_up_doctor/raw/master/images/mine/case3.jpg" mode=""></image>
					<text>查看范例</text>
				</view>
				<view class="upload-mine upload-ml">
					<image v-if="attestationData.authUrl1" :src="attestationData.authUrl1" mode="aspectFill"></image>
					<image v-else src="https://gitee.com/picture_storage_area/follow_up_doctor/raw/master/images/mine/upload.png" mode="aspectFill"></image>
				</view>
			</view>
		</view>
		<view class="upload-container">
			<view class="upload-title"><text>医师执业证书（所有内容页）</text></view>
			<view class="upload-content">
				<view class="upload-case" @tap="onPreview(3)">
					<image src="https://gitee.com/picture_storage_area/follow_up_doctor/raw/master/images/mine/case1.jpg" mode=""></image>
					<text>查看范例</text>
				</view>
				<view class="upload-mine upload-ml">
					<image v-if="attestationData.professionUrl" :src="attestationData.professionUrl" mode="aspectFill"></image>
					<image v-else src="https://gitee.com/picture_storage_area/follow_up_doctor/raw/master/images/mine/upload.png" mode="aspectFill"></image>
				</view>
			</view>
		</view>
		<view class="upload-container">
			<view class="upload-title"><text>医师职称证书（所有内容页）</text></view>
			<view class="upload-content">
				<view class="upload-case" @tap="onPreview(4)">
					<image src="https://gitee.com/picture_storage_area/follow_up_doctor/raw/master/images/mine/case2.jpg" mode=""></image>
					<text>查看范例</text>
				</view>
				<view class="upload-mine upload-ml">
					<image v-if="attestationData.jobUrl" :src="attestationData.jobUrl" mode="aspectFill"></image>
					<image v-else src="https://gitee.com/picture_storage_area/follow_up_doctor/raw/master/images/mine/upload.png" mode="aspectFill"></image>
				</view>
			</view>
		</view>
		<!-- <button class="bound" v-if="myInfo.doctor.verifyStatus === 0 || myInfo.doctor.verifyStatus === 3" @tap="onBound">提交</button> -->
	</view>
</template>

<script>
import { getInfo, authenticationSave } from '@/api/mine';
import { mapGetters } from 'vuex';
import uploadJs from '@/mixins/uploadFile';
export default {
	mixins: [uploadJs],
	data() {
		return {
			attestationData: {
				authUrl1: '',
				authUrl2: '',
				idCardUrl1: '',
				idCardUrl2: '',
				jobUrl: '',
				professionUrl: '',
				id: null
			},
			rightText: ''
		};
	},
	onShow() {
		this.getDoctorInfo();
	},
	computed: {
		...mapGetters(['myInfo'])
	},
	methods: {
		getDoctorInfo() {
			getInfo(this.myInfo.id, res => {
				if (res.data.info) {
					for (const key in res.data.info.doctor) {
						if (this.attestationData.hasOwnProperty(key)) {
							if (res.data.info.doctor[key]) {
								this.attestationData[key] = res.data.info.doctor[key];
							}
						}
					}
					if (uni.getStorageSync('attestationData')) {
						this.attestationData = JSON.parse(uni.getStorageSync('attestationData'));
					}
				}
			});
		},
		onLeftTap() {
			uni.navigateBack({ delta: 1 });
		},
		onRightTap() {
			this.$helper.to('/pages/mine/attestation/attestationExplain')
		},
		onPreview(index) {
			let urls = [];
			switch (index) {
				case 1:
					urls = ['https://gitee.com/picture_storage_area/follow_up_doctor/raw/master/images/mine/handheld.jpg'];
					break;
				case 2:
					urls = ['https://gitee.com/picture_storage_area/follow_up_doctor/raw/master/images/mine/case3.jpg'];
					break;
				case 3:
					urls = ['https://gitee.com/picture_storage_area/follow_up_doctor/raw/master/images/mine/case1.jpg'];
					break;
				case 4:
					urls = ['https://gitee.com/picture_storage_area/follow_up_doctor/raw/master/images/mine/case2.jpg'];
					break;
				default:
					break;
			}
			uni.previewImage({
				urls: urls,
				longPressActions: {
					success: function(data) {},
					fail: function(err) {}
				}
			});
		},
		uploadImg(index) {
			if (this.myInfo.doctor.verifyStatus !== 0 && this.myInfo.doctor.verifyStatus !== 3) {
				return false;
			}
			const _this = this;
			const _index = index;
			this.uploadFile(
				['album', 'camera'],
				1,
				imgUrl => {
					switch (_index) {
						case 1:
							_this.attestationData.authUrl2 = imgUrl;
							break;
						case 2:
							_this.attestationData.idCardUrl1 = imgUrl;
							break;
						case 3:
							_this.attestationData.idCardUrl2 = imgUrl;
							break;
						case 4:
							_this.attestationData.authUrl1 = imgUrl;
							break;
						case 5:
							_this.attestationData.professionUrl = imgUrl;
							break;
						case 6:
							_this.attestationData.jobUrl = imgUrl;
							break;
						default:
							break;
					}
				},
				error => {
					this.$helper.toast('none', error)
				}
			);
		},
		onBound() {
			this.$helper.loading('提交中')
			authenticationSave(this.attestationData, res => {
				uni.removeStorageSync('attestationData');
				uni.hideLoading();
			});
		}
	}
};
</script>

<style lang="scss">
.lg-container {
	.upload-container {
		background-color: #fff;
		margin-bottom: 2rpx;
		height: 270rpx;
		width: 100%;
		padding: 29rpx 38rpx;
		box-sizing: border-box;
		.upload-title {
			color: #333333;
			font-size: 26rpx;
			margin-bottom: 26rpx;
		}
		.upload-content {
			display: flex;
			justify-content: flex-start;
			width: 100%;
			.upload-case {
				width: 155rpx;
				height: 155rpx;
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
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
			.upload-mine {
				width: 155rpx;
				height: 155rpx;
				&.upload-ml {
					margin-left: 90rpx;
				}
				image {
					width: 100%;
					height: 100%;
				}
			}
		}
	}
	.bound {
		width: 672rpx;
		height: 80rpx;
		line-height: 80rpx;
		background: rgba(3, 169, 172, 1);
		border-radius: 10rpx;
		color: #fff;
		font-size: 26rpx;
		margin: 40rpx auto;
		&:after {
			display: none;
		}
	}
}
</style>
