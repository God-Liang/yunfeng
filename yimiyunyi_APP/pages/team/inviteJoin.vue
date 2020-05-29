<template>
	<view class="lg-container">
		<uni-nav-bar left-icon="back" title="申请加入" @clickLeft="onLeftTap"></uni-nav-bar>
		<view class="team-container">
			<view class="team_img">
				<image class="img" v-if="teamInfo.avatar" :src="teamInfo.avatar" mode="aspectFill"></image>
				<image class="img" v-else src="@/static/team/avatar.png" mode=""></image>
			</view>
			<view class="team_box">
				<view class="color333 fs30">{{teamInfo.name || '暂无团队名称'}}</view>
				<view class="team_box_con">
					<text class="color333 fs22">{{teamInfo.hospital || '暂无所在医院'}}</text>
					<text class="level fs20">{{teamInfo.hospitalLevel || '暂无等级'}}</text>
				</view>
			</view>
		</view>
		<scroll-view scroll-y class="message-container">
			<view class="message-item">
				<view class="title">
					<image class="introduction-img img" src="@/static/team/members/introduction_team.png" mode=""></image>
					<text>团队说明</text>
				</view>
				<view class="content">
					<text>{{ teamInfo.description || '暂无团队说明' }}</text>
				</view>
			</view>
			<view class="message-item">
				<view class="title">
					<image class="operation-img img" src="@/static/team/members/operation.png" mode=""></image>
					<text>擅长手术</text>
				</view>
				<view class="content" v-if="operations.length === 0">
					<text>暂无擅长手术</text>
				</view>
				<view class="content" v-else>
					<view v-for="(item, index) in operations" :key="index">
						{{item}}
					</view>
				</view>
			</view>
			<view class="message-item">
				<view class="title">
					<image class="disease-img img" src="@/static/team/members/disease.png" mode=""></image>
					<text>擅长疾病</text>
				</view>
				<view class="content" v-if="diseases.length === 0">
					<text>暂无擅长疾病</text>
				</view>
				<view class="content" v-else>
					<view v-for="(item, index) in diseases" :key="index">
						{{item}}
					</view>
				</view>
			</view>
			<view class="message-item">
				<view class="title">
					<image class="teamNote-img img" src="@/static/team/members/teamNote.png" mode=""></image>
					<text>团队寄语</text>
				</view>
				<view class="content">
					<text>{{ teamInfo.teamNote || '暂无团队寄语' }}</text>
				</view>
			</view>
		</scroll-view>
		<view class="operationBox" @tap="onJoin">
			加入
		</view>
	</view>
</template>

<script>
	import { read } from '@/api/common';
	import { joinTeam, isJoin, readTeamMember } from '@/api/team';
	import common from '@/mixins/common';
	import { mapGetters } from 'vuex';
	export default {
		onLoad(options) {
			if (options.code) {
				this.code = options.code
				let codeArr = this.code.split(',')
				this.teamId = parseInt(codeArr[0])
				this.id = parseInt(codeArr[1])
				this.name = codeArr[2]
			}
			if (options.teamId) {
				this.teamId = parseInt(options.teamId)
				this.id = parseInt(options.id)
				this.name = options.name
			}
		},
		mixins: [common],
		data() {
			return {
				teamInfo: {
					avatar: ''
				},
				diseases: [],
				operations: [],
				teamId: null,
				id: null,
				name: '',
				code: '',
				roomId: null,
				teamType: null
			}
		},
		computed: {
			...mapGetters(['myInfo'])
		},
		mounted() {
			this.getTeamInfo()
			this.readTeamMember()
		},
		methods: {
			onLeftTap() {
				uni.navigateBack({ delta: 1 });
			},
			// 获取团队信息
			getTeamInfo() {
				this.$helper.loading('加载中')
				read('team', this.teamId, res => {
					uni.hideLoading()
					if (res.data.info) {
						this.teamInfo = res.data.info;
						this.diseases = this.teamInfo.disease ? this.teamInfo.disease.split(',') : []
						this.operations = this.teamInfo.operation ? this.teamInfo.operation.split(',') : []
						this.getTeamGroupInfo(this.teamInfo.name, (res) => {
							this.roomId = res.groupid
						})
					}
				});
			},
			// 获取团队成员信息
			readTeamMember() {
				readTeamMember(this.myInfo.id, this.teamId, res => {
					if (res.data.info) {
						this.teamType = res.data.info.teamType
					}
				})
			},
			// 加入团队
			onJoin() {
				if (this.teamType === 1) {
					this.$helper.toast('none', '已申请加入该团队，等待审核中')
					return false
				}
				if (this.teamType === 2) {
					this.$helper.toast('none', '您已有团队')
					return false
				}
				this.$helper.loading('申请中')
				new Promise((resolve, reject) => {
					isJoin(this.myInfo.id, res => {
						if (res.data.info) {
							resolve()
						} else {
							uni.hideLoading()
							this.$helper.toast('none', '您已加入团队或者等待审核中')
						}
					})
				}).then(() => {
					const data = {
						teamId: this.teamId,
						userId: this.myInfo.id,
						fromDoctorId: this.id,
						fromDoctorName: this.name,
						requestType: 2
					}
					joinTeam(data, res => {
						this.joinGroup({groupId: this.roomId}, () => {
							this.$helper.toast('none', '申请加入成功，请等待团队负责人审核')
							setTimeout(() => {
								uni.navigateBack({ delta: 1 });
							}, 1500)
						})
					})
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.lg-container {
		.team-container {
			display: flex;
			align-items: center;
			padding: 0 40rpx;
			height: 215rpx;
			box-sizing: border-box;
			background-color: #fff;
			margin-bottom: 20rpx;
			.team_img {
				.img {
					width: 140rpx;
					height: 140rpx;
					border-radius: 50%;
					border: 2rpx solid #BCBCBC;
					overflow: hidden;
				}
			}
			.team_box {
				flex: 1;
				margin-left: 40rpx;
				display: flex;
				flex-direction: column;
				&_con {
					margin-top: 30rpx;
					display: flex;
					align-items: center;
					.level {
						color: #FFFFFF;
						background-color: #FFBB3F;
						border-radius: 15rpx;
						height: 30rpx;
						line-height: 30rpx;
						padding: 0 20rpx;
						margin-left: 20rpx;
					}
				}
			}
		}
		.message-container {
			height: calc(100vh - 400rpx);
			// #ifndef H5
			height: calc(100vh - 448rpx);
			// #endif
			width: 100%;
			margin-top: 20rpx;
			.message-item {
				padding: 28rpx 58rpx 36rpx 40rpx;
				background-color: #fff;
				margin-bottom: 2rpx;
				&:last-child {
					margin-bottom: 0;
					padding: 28rpx 40rpx 36rpx 40rpx;
				}
				.title {
					margin-bottom: 20rpx;
					display: flex;
					align-items: center;
					color: #333333;
					font-size: 26rpx;
					.img {
						margin-right: 12rpx;
					}
					.introduction-img {
						width: 30rpx;
						height: 24rpx;
					}
					.operation-img {
						width: 28rpx;
						height: 28rpx;
					}
					.disease-img {
						width: 30rpx;
						height: 27rpx;
					}
					.teamNote-img {
						width: 27rpx;
						height: 25rpx;
					}
				}
				.content {
					color: #888888;
					font-size: 24rpx;
					line-height: 36rpx;
				}
				.certificate-list {
					width: 100%;
					display: flex;
					justify-content: flex-start;
					flex-wrap: wrap;
					.certificate-null {
						width: 100%;
						height: 40rpx;
						text {
							color: #888888;
							font-size: 24rpx;
						}
					}
					.certificate-item {
						width: 140rpx;
						height: 140rpx;
						background: rgba(244, 244, 244, 1);
						border-radius: 10rpx;
						margin: 0 37rpx 37rpx 0;
						overflow: hidden;
						&:nth-child(4n) {
							margin: 0 0 37rpx 0;
						}
						image {
							width: 100%;
							height: 100%;
						}
					}
				}
			}
		}
		.operationBox {
			position: fixed;
			bottom: 0;
			left: 0;
			width: 100vw;
			height: 80rpx;
			line-height: 80rpx;
			background-color: #fff;
			box-sizing: border-box;
			background-color: #03A9AC;
			color: #FFFFFF;
			font-size: 30rpx;
			text-align: center;
		}
	}
</style>
