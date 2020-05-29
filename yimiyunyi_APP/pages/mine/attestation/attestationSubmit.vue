<template>
	<view class="lg-container">
		<uni-nav-bar left-icon="back" title="认证审核" @clickLeft="onLeftTap"></uni-nav-bar>
		<view class="audit-container">
			<image src="@/static/mine/succeed.png" mode=""></image>
			<text class="audit-status">认证提交成功！</text>
			<text class="audit-await">审核需要1~2个工作日，</text>
			<text class="audit-await">请耐心等待，保持手机畅通！</text>
		</view>
	</view>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
	computed: {
		...mapGetters(['myInfo'])
	},
	data() {
		return {
			status: null
		};
	},
	onBackPress(options) {
		if (options.from === 'navigateBack') {
			return false;
		}
		this.onLeftTap()
		return false;
	},
	onPullDownRefresh() {
		// 获取用户信息
		this.$store.dispatch('getUserInfo').then(() => {});
		// 获取医生信息
		this.$store.dispatch('getMyInfo').then(() => {
			this.isAttestation()
			uni.stopPullDownRefresh()
		})
	},
	onShow() {
		this.isAttestation()
	},
	methods: {
		onLeftTap() {
			const pages = getCurrentPages(); //当前页面栈
			if (pages.length > 1) {
				uni.navigateBack({ delta: 1 });
			} else {
				this.onLogout();
			}
		},
		onLogout() {
			uni.showModal({
				title: '提示',
				content: '是否退出登录',
				confirmColor: '#03A9AC',
				success: res => {
					if (res.confirm) {
						this.$store.dispatch('logout').then(res => {
							this.$im.conn.close();
							this.$helper.toast('success', '退出成功');
							setTimeout(() => {
								this.$helper.to('/pages/login/index');
							}, 2000);
						});
					} else if (res.cancel) {
						console.log('用户点击取消');
					}
				}
			});
		},
		isAttestation() {
			const verifyStatus = this.myInfo.doctor.verifyStatus;
			switch (verifyStatus) {
				case 0: // 审核未通过
					this.$helper.toNew('/pages/mine/attestation/attestationStatus');
					break;
				case 1: // 已通过
					const doctorTeamId = this.myInfo.doctor.doctorTeamId;
					// 是否加入/创建团队
					if (doctorTeamId) {
						setTimeout(() => {
							this.$helper.toTab('/pages/tabBar/message');
						}, 1000);
					} else {
						this.$helper.toNew('/pages/mine/attestation/attestationStatus');
					}
					break;
				case 2: // 待审核
					break;
				case 3: // 注销
					uni.removeStorageSync('lg-token');
					this.$helper.toNew('/pages/login/index');
					break;
				case 4: // 未审核
					this.$helper.toNew('/pages/mine/attestation/attestationOne');
					break;
				default:
					uni.removeStorageSync('lg-token');
					this.$helper.toNew('/pages/login/index');
					break;
			}
		}
	}
};
</script>

<style lang="scss">
.audit-box {
	height: calc(100% - 88rpx);
}
.lg-container {
	.audit-container {
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		width: 100%;
		// height: 700rpx;
		image {
			width: 138rpx;
			height: 166rpx;
			margin-top: 100rpx;
		}
		.audit-status {
			color: #333333;
			font-size: 30rpx;
			margin-top: 46rpx;
			font-weight: bold;
		}
		.audit-await {
			color: #898989;
			font-size: 24rpx;
			line-height: 24rpx;
			margin-top: 29rpx;
		}
		.audit-link {
			color: #898989;
			font-size: 24rpx;
			line-height: 24rpx;
			margin-top: 14rpx;
		}
	}
}
</style>
