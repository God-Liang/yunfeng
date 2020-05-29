<template>
	<view class="lg-container">
		<uni-nav-bar left-icon="back" title="荣誉证书" right-text="保存" @clickLeft="onLeftTap" @clickRight="onRightTap"></uni-nav-bar>
		<view class="upload-container">
			<view class="img-container">
				<template v-if="honorCertificates.length > 0">
					<view class="img-item" v-for="(item, index) in honorCertificates" :key="index"><image :src="item" mode="aspectFill"></image></view>
				</template>
				<view class="img-item img-upload-btn" @tap="uploadImg"><image src="https://gitee.com/picture_storage_area/follow_up_doctor/raw/master/images/mine/upload.png" mode=""></image></view>
			</view>
		</view>
	</view>
</template>

<script>
import { updateInfo } from '@/api/mine';
import { mapGetters } from 'vuex';
import uploadJs from '@/mixins/uploadFile';
export default {
	mixins: [uploadJs],
	data() {
		return {
			honorCertificates: []
		};
	},
	mounted() {
		this.honorCertificates = this.myInfo.doctor.honorCertificates ? this.myInfo.doctor.honorCertificates.split(','): []
	},
	computed: {
		...mapGetters(['myInfo'])
	},
	methods: {
		onLeftTap() {
			uni.navigateBack({ delta: 1 });
		},
		onRightTap() {
			if (this.honorCertificates.length === 0) {
				uni.showModal({
					title: '提示',
					showCancel: false,
					confirmColor: '#03A9AC',
					content: '请上传荣誉证书',
					success: function(res) {
						if (res.confirm) {}
					}
				});
				return false
			}
			this.$helper.loading('保存中')
			const data = {
				id: this.myInfo.id,
				doctor: {
					honorCertificates: this.honorCertificates.join(',')
				}
			}
			updateInfo(data, res => {
				this.$helper.toast('success' ,'保存成功')
				setTimeout(() => {
					uni.navigateBack({ delta: 1 });
				}, 1000);
			})
		},
		uploadImg() {
			this.uploadFile(['album', 'camera'], 9, imgUrl => {
				this.honorCertificates.push(imgUrl)
			}, error => {
				this.$helper.toast('none', error)
			})
		}
	}
};
</script>

<style lang="scss">
.lg-container {
	width: 100vw;
	min-height: calc(100vh - 100rpx);
	background-color: #ffffff;
	.upload-container {
		padding: 0 40rpx;
		width: 100%;
		box-sizing: border-box;
		.img-container {
			display: flex;
			justify-content: flex-start;
			flex-wrap: wrap;
			width: 100%;
			.img-item {
				width: 200rpx;
				height: 200rpx;
				margin: 40rpx 35rpx 0 0;
				background: rgba(244, 244, 244, 1);
				image {
					width: 100%;
					height: 100%;
				}
				&:nth-child(3n) {
					margin: 40rpx 0 0 0;
				}
			}
		}
	}
}
</style>
