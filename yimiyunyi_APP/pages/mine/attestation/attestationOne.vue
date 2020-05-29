<template>
	<view class="lg-container">
		<view class="logo-container"><image class="image" src="/static/system/logo.png" mode=""></image></view>
		<view class="identity-container">
			<view class="identity-title">请选择您的身份：</view>
			<view class="identity-list">
				<view class="identity-item mb52" :class="selectType === 3 ? 'active' : ''" @tap="onSelect(3)">
					<view class="imgBox"><image class="identity-doctor" src="@/static/team/doctor.png" mode=""></image></view>
					<text class="identity-title">我是医生</text>
					<view class="identity-checkBox"></view>
				</view>
				<view class="identity-item" :class="selectType === 4 ? 'active' : ''" @tap="onSelect(4)">
					<view class="imgBox"><image class="identity-nurse" src="@/static/team/nurse.png" mode=""></image></view>
					<text class="identity-title">我是护士</text>
					<view class="identity-checkBox"></view>
				</view>
			</view>
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
			selectType: 0,
			attestationInfo: {
				nick: '',
				career: '',
				doctorHospital: '',
				doctorHospitalLevel: '',
				department: '',
				professionCallShow: '',
				professionCallType: null,
				type: null
			}
		};
	},
	onShow() {
		if (uni.getStorageSync('attestationInfo')) {
			this.attestationInfo = uni.getStorageSync('attestationInfo');
			this.selectType = this.attestationInfo.type;
		}
		// this.isAttestation()
	},
	methods: {
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
		onSelect(val) {
			this.selectType = val;
			this.attestationInfo.type = this.selectType;
			uni.setStorageSync('attestationInfo', this.attestationInfo);
			setTimeout(() => {
				this.$helper.to('/pages/mine/attestation/attestationTwo');
			}, 300);
		}
	}
};
</script>

<style lang="scss" scoped>
.lg-container {
	background-color: #fff;
	.logo-container {
		height: 407rpx;
		width: 100%;
		.image {
			width: 100%;
			height: 100%;
		}
	}
	.identity-container {
		padding: 0 40rpx;
		width: 100vw;
		box-sizing: border-box;
		.identity-title {
			height: 130rpx;
			line-height: 130rpx;
			font-size: 30rpx;
			color: #333333;
		}
		.identity-list {
			.mb52 {
				margin-bottom: 52rpx;
			}
			.identity-item {
				display: flex;
				align-items: center;
				height: 150rpx;
				background: rgba(244, 244, 244, 1);
				border-radius: 10rpx;
				box-sizing: border-box;
				&.active {
					background: rgba(255, 255, 255, 1);
					border: 2rpx solid rgba(3, 169, 172, 1);
					.identity-checkBox {
						background: rgba(3, 169, 172, 1);
						border: 0;
					}
				}
				.imgBox {
					width: 167rpx;
					text-align: center;
					.identity-doctor {
						width: 95rpx;
						height: 104rpx;
					}
					.identity-nurse {
						width: 75rpx;
						height: 99rpx;
					}
				}

				.identity-title {
					flex: 1;
					margin: 0 30rpx;
				}
				.identity-checkBox {
					width: 30rpx;
					height: 30rpx;
					background: rgba(255, 255, 255, 1);
					border: 2rpx solid rgba(220, 220, 220, 1);
					border-radius: 50%;
					margin-right: 40rpx;
				}
			}
		}
	}
}
</style>
