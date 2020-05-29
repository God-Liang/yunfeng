<template>
	<view class="lg-container">
		<uni-nav-bar left-icon="back" title="认证审核" @clickLeft="onLeftTap"></uni-nav-bar>
		<view class="audit-container" v-if="status === 1">
			<image src="@/static/mine/attestation/c_1.png" mode=""></image>
			<text class="audit-status">你的身份认证已通过</text>
			<text class="audit-await">请创建医疗团队</text>
			<text class="audit-await">或通过扫一扫加入其他团队</text>
			<view class="btn">
				<button class="creatTeam" @tap="creatTeam">创建团队</button>
				<button class="joinTeam" @tap="onScanCode()">扫一扫</button>
			</view>
		</view>
		<view class="audit-container" v-if="status === 0">
			<image src="@/static/mine/attestation/c_3.png" mode=""></image>
			<text class="audit-status">你的身份认证未通过</text>
			<text class="audit-await">审核未通过原因：{{ myInfo.doctor.reason }}</text>
			<view class="btn"><button class="resSubmit" @tap="resSubmit">重新认证</button></view>
		</view>
	</view>
</template>

<script>
import { mapGetters } from 'vuex'
import common from '@/mixins/common';
export default {
	mixins: [common],
	computed: {
		...mapGetters(['myInfo'])
	},
	data() {
		return {
			status: null,
			reason:'您提供的资料不符合要求'
		};
	},
	onShow() {
		this.isAttestation();
	},
	onBackPress(options) {
		if (options.from === 'navigateBack') {
			return false;
		}
		this.onLeftTap()
		return false;
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
			this.$helper.toTab("/pages/tabBar/message")
			// uni.showModal({
			// 	title: '提示',
			// 	content: '是否退出登录',
			// 	confirmColor: '#03A9AC',
			// 	success: res => {
			// 		if (res.confirm) {
			// 			this.$store.dispatch('logout').then(res => {
			// 				this.$im.conn.close();
			// 				this.$helper.toast('success', '退出成功')
			// 				setTimeout(() => {
			// 					this.$helper.to('/pages/login/index')
			// 				}, 2000);
			// 			});
			// 		} else if (res.cancel) {
			// 			console.log('用户点击取消');
			// 		}
			// 	}
			// });
		},
		isAttestation() {
			this.status = this.myInfo.doctor.verifyStatus
			switch (this.status) {
				case 0: // 审核未通过
					break;
				case 1: // 已通过
					const doctorTeamId = this.myInfo.doctor.doctorTeamId;
					// 是否加入/创建团队
					if (doctorTeamId) {
						setTimeout(() => {
							this.$helper.toTab('/pages/tabBar/message');
						}, 1000);
					}
					break;
				case 2: // 待审核
					this.$helper.toNew('/pages/mine/attestation/attestationSubmit');
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
		},
		creatTeam(){
			this.$helper.to('/pages/team/createTeam')
		},
		resSubmit(){
			this.$helper.to('/pages/mine/attestation/attestationOne')
		},
	}
}
</script>

<style lang="scss">
.lg-container {
	.audit-container {
		margin-top: 25rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		// background-color: #fff;
		width: 100%;
		// height: 700rpx;
		image {
			width: 235rpx;
			height: 235rpx;
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
			line-height: 32rpx;
			margin-top: 29rpx;
			width: 100%;
			padding: 0 40rpx;
			box-sizing: border-box;
			text-align: center;
		}
		.audit-link {
			color: #898989;
			font-size: 24rpx;
			line-height: 24rpx;
			margin-top: 14rpx;
		}
		.btn {
			width: 100%;
			padding: 0 40rpx;
			box-sizing: border-box;
			margin-top: 80rpx;
			.creatTeam,
			.joinTeam,
			.resSubmit {
				width: 100%;
				background: #03a9ac;
				color: #fff;
				font-size: 26rpx;
				line-height: 80rpx;
			}
			.joinTeam {
				margin-top: 20rpx;
			}
		}
	}
}
</style>
