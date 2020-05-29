<template>
	<view class="lg-container">
		<view class="user-container" @tap="onJump('/pages/mine/userInfo')">
			<view class="avatar" :class="myInfo.doctor.verifyStatus===1?'avatarThrough':''">
				<view class="avatarbg">
					<image v-if="myInfo.avatar" class="img-yes" :src="myInfo.avatar" mode="aspectFill"></image>
					<image v-if="!myInfo.avatar && myInfo.sex" class="img-yes" src="@/static/followUp/doctor_woman.jpg" mode=""></image>
					<image v-if="!myInfo.avatar && !myInfo.sex" class="img-yes" src="@/static/followUp/doctor_man.jpg" mode=""></image>
				</view>
			</view>
			<view class="userinfo">
				<view class="username">
					<text>{{myInfo.nick || '暂无昵称'}}</text>
					<button class="attestation" v-if="myInfo.doctor.verifyStatus===2">待审核</button>
					<button class="attestation through" @tap.stop="onJump('/pages/mine/attestation/attestationInfo')" v-if="myInfo.doctor.verifyStatus===1">已认证</button>
					<button class="attestation" v-if="myInfo.doctor.verifyStatus===0">已拒绝</button>
					<button class="attestation" v-if="myInfo.doctor.verifyStatus===3">待认证</button>
					<button class="attestation" v-if="myInfo.doctor.verifyStatus===4">已注销</button>
				</view>
				<view class="doctorid"><text>依米医生ID：{{myInfo.doctor.yimiNumber}}</text></view>
			</view>
			<view class="user-more">
				<text v-if="isReplenish" class="user-title">补充个人信息</text>
				<text class="user-icon icon iconfont iconjiantouarrow487"></text>
			</view>
		</view>
		<view class="work-container">
			<view class="workstation">
				<view class="workList">
					<navigator url="/pages/mine/homepage" hover-class="none" class="workitem">
						<image class="home" src="@/static/mine/home.png" mode=""></image>
						<text>我的主页</text>
					</navigator>
					<!-- <navigator url="/pages/mine/statistics" hover-class="none" class="workitem">
						<image class="charts" src="@/static/mine/charts.png" mode=""></image>
						<text>统计分析</text>
					</navigator> -->
					<navigator url="/pages/mine/practicePlace" class="workitem" hover-class="none">
						<image class="site" src="@/static/mine/site.png" mode=""></image>
						<text>执业地点</text>
					</navigator>
				</view>
			</view>
		</view>
		<uni-list>
		  <uni-list-item thumb="/static/mine/service.png" :thumbStyle="{width: '38rpx', height: '32rpx', display: 'block'}" title="我的客服" @click="onJump('/pages/mine/service')"></uni-list-item>
		  <uni-list-item thumb="/static/mine/aboutus.png" :thumbStyle="{width: '38rpx', height: '33rpx', display: 'block'}" title="关于我们" @click="onJump('/pages/mine/aboutUs')"></uni-list-item>
		  <uni-list-item thumb="/static/mine/checkout.png" :thumbStyle="{width: '35rpx', height: '35rpx', display: 'block'}" title="检验更新" @click="onUpdate"></uni-list-item>
		  <uni-list-item v-if="!isLevel" thumb="/static/mine/exit.png" :thumbStyle="{width: '34rpx', height: '32rpx', display: 'block'}" title="退出团队" @click="onExit"></uni-list-item>
		  <uni-list-item thumb="/static/mine/set.png" :thumbStyle="{width: '38rpx', height: '38rpx', display: 'block'}" title="设置" @click="onJump('/pages/mine/settting')"></uni-list-item>
		</uni-list>
	</view>
</template>

<script>
	import { mapGetters } from 'vuex';
	import { getList } from '@/api/followUp';
	import { quitTeam, getLevel, readTeamMember } from '@/api/team';
	export default {
		computed: {
			...mapGetters(['myInfo'])
		},
		data() {
			return {
				qrcode: '',
				verifyStatus: '',
				isReplenish: false, // 
				isLevel: true, // 是否是创建者
				teamType: null, // 0无团队、1申请加入团队、2有团队、3退出中
				
			}
		},
		onShow: function() {
			if (this.myInfo.nick && this.myInfo.sexShow && this.myInfo.doctor.doctorHospital && this.myInfo.doctor.professionCallShow) {
				this.isReplenish = false
			} else {
				this.isReplenish = true
			}
			if (this.myInfo.doctor.doctorTeamId) {
				this.getLevel()
				this.readTeamMember()
			}
		},
		methods: {
			onJump(url) {
				this.$helper.to(url)
			},
			// 检测更新
			onUpdate() {
				this.$helper.loading('检测中')
				setTimeout(() => {
					this.$helper.toast('none', '当前已是最新版本')
				}, 1000)
			},
			// 获取是否是团队创建者
			getLevel() {
				if (this.myInfo.doctor.doctorTeamId) {
					getLevel(this.myInfo.doctor.doctorTeamId, res => {
						this.isLevel = res.data.info
					})
				} else {
					this.isLevel = true
				}
			},
			// 获取团队成员信息
			readTeamMember() {
				readTeamMember(this.myInfo.id, this.myInfo.doctor.doctorTeamId, res => {
					this.teamType = res.data.info.teamType
				})
			},
			onExit() {
				const data = {
					current: 1,
					pageSize: 10,
					doctorUserId: this.myInfo.id,
					teamId: this.myInfo.doctor.doctorTeamId
				};
				getList('teamPatient/patientPage', data, res => {
					if (this.teamType === 3) {
						this.$helper.toast('none', '正在审核中')
						return false
					}
					if (res.data.list.length > 0) {
						this.$helper.to('/pages/team/teamExit')
					} else {
						uni.showModal({
							title: '提示',
							content: '是否确定退出团队？',
							confirmColor: '#03A9AC',
							success: (res) => {
								if (res.confirm) {
									this.$helper.loading('申请中')
									quitTeam({teamPatientFrom: []}, res => {
										uni.hideLoading()
										this.$helper.toast('none','申请成功')
									})
								} else if (res.cancel) {
									console.log('用户点击取消');
								}
							}
						});
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.lg-container {
		// #ifdef H5
		height: calc(100vh - 50px);
		// #endif
		.user-container {
			width: 100%;
			height: 356rpx;
			background: url('@/static/mine/userBg.jpg');
			background-size: cover;
			display: flex;
			justify-content: flex-start;
			padding: 104rpx 20rpx 0 29rpx;
			box-sizing: border-box;
			.avatar {
				width: 122rpx;
				height: 122rpx;
				display: flex;
				justify-content: center;
				align-items: center;
				box-sizing: border-box;
				border-radius: 50%;
				background: rgba(255, 255, 255, 0.2);
				&.avatarThrough {
					position: relative;
					&:after {
						content: 'V';
						font-size: 24rpx;
						color: #fff;
						display: inline-block;
						position: absolute;
						bottom: 0;
						right: 0;
						width: 30rpx;
						height: 30rpx;
						line-height: 32rpx;
						text-align: center;
						border-radius: 50%;
						background-color: #FDBB59;
						font-weight: 700;
					}
				}
				.avatarbg {
					width: 114rpx;
					height: 114rpx;
					background: rgba(255, 255, 255, 1);
					border-radius: 50%;
					display: flex;
					justify-content: center;
					align-items: center;
					overflow: hidden;
					.img-yes {
						width: 114rpx;
						height: 114rpx;
					}
				}
			}
			.userinfo {
				flex: 1;
				display: flex;
				flex-direction: column;
				margin-left: 27rpx;
				padding-top: 20rpx;
				.username {
					display: flex;
					justify-content: flex-start;
					align-items: center;
					text {
						font-size: 34rpx;
						line-height: 36rpx;
						color: #ffffff;
					}
					.attestation {
						display: inline-block;
						// width: 103rpx;
						height: 36rpx;
						line-height: 32rpx;
						padding: 0 16rpx;
						margin: 0 0 0 15rpx;
						border:2rpx solid rgba(227,227,227,0.5);
						border-radius: 18rpx;
						font-size: 24rpx;
						color: rgba(255,255,255,0.5);
						background-color: transparent;
						box-sizing: border-box;
						&:after {
							display: none;
						}
						&.through {
							color: #FDBB59;
							border: 2rpx solid #FDBB59;
						}
					}
				}
				.teams {
					height: 36rpx;
					line-height: 24rpx;
					margin-top: 6rpx;
					text {
						color: #ffffff;
						font-size: 24rpx;
					}
				}
				.doctorid {
					height: 36rpx;
					line-height: 24rpx;
					margin-top: 18rpx;
					text {
						color: #ffffff;
						font-size: 24rpx;
					}
				}
			}
			.qrcode {
				width: 120rpx;
				height: 120rpx;
				image {
					width: 100%;
					height: 100%;
				}
			}
			.user-more {
				color: #FFFFFF;
				margin-top: 30rpx;
				.user-title {
					font-size: 24rpx;
				}
				.user-icon {
					font-size: 56rpx;
					vertical-align: middle;
				}
			}
		}
		.work-container {
			height: 104rpx;
			width: 100%;
			background-color: #fff;
			position: relative;
			.workstation {
				width: 711rpx;
				height: 150rpx;
				background: rgba(255, 255, 255, 1);
				box-shadow: 0px 0px 10rpx 0px rgba(3, 169, 172, 0.41);
				border-radius: 20rpx;
				text-align: center;
				position: absolute;
				left: 50%;
				top: -67rpx;
				transform: translateX(-50%);
				.title {
					height: 57rpx;
					line-height: 57rpx;
					color: #333333;
					font-size: 26rpx;
				}
				.workList {
					width: 100%;
					box-sizing: border-box;
					padding: 34rpx 38rpx 27rpx;
					display: flex;
					justify-content: space-around;
					align-items: center;
					.workitem {
						.home {
							width: 53rpx;
							height: 47rpx;
						}
						.charts {
							width: 58rpx;
							height: 46rpx;
						}
						.site {
							width: 40rpx;
							height: 46rpx;
						}
						text {
							display: block;
							color: #333333;
							font-size: 26rpx;
							margin-top: 4rpx;
						}
					}
				}
			}
		}
	}
</style>
