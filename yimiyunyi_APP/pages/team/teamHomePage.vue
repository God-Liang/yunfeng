<template>
	<view class="lg-container">
		<view class="container_info">
			<view class="operation_left" @tap="onLeftTap"><uni-icons color="#fff" size="28" type="back" /></view>
			<view class="container_info_box">
				<image class="avatar" v-if="teamInfo.avatar" :src="teamInfo.avatar" mode="aspectFill"></image>
				<image class="avatar" v-else src="@/static/team/avatar.png" mode=""></image>
				<text class="info_box fs30">{{ teamInfo.name || '暂无名称' }}</text>
				<text class="info_box fs22">
					{{ teamInfo.hospital || '暂无所在医院' }}&nbsp;&nbsp;&nbsp;&nbsp;
					<text class="level">{{ teamInfo.hospitalLevel || '暂无等级' }}</text>
				</text>
			</view>
			<view v-if="isLevel" class="operation_right" @tap="onJump('/pages/team/teamInfo')">
				<image class="operation_img" src="@/static/team/editor.png" mode=""></image>
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
	</view>
</template>

<script>
import { read } from '@/api/common';
import { getLevel } from '@/api/team';
import common from '@/mixins/common';
import { mapGetters } from 'vuex';
export default {
	mixins: [common],
	data() {
		return {
			teamInfo: {
				avatar: ''
			},
			diseases: [],
			operations: [],
			isLevel: true
		};
	},
	computed: {
		...mapGetters(['myInfo'])
	},
	onShow() {
		this.getTeamInfo()
		this.getLevel()
	},
	methods: {
		onLeftTap() {
			uni.navigateBack({ delta: 1 });
		},
		// 获取团队信息
		getTeamInfo() {
			this.$helper.loading('加载中')
			read('team', this.myInfo.doctor.doctorTeamId, res => {
				uni.hideLoading()
				if (res.data.info) {
					this.teamInfo = res.data.info;
					this.diseases = this.teamInfo.disease ? this.teamInfo.disease.split(',') : []
					this.operations = this.teamInfo.operation ? this.teamInfo.operation.split(',') : []
				}
			});
		},
		// 获取是否是团队创建者
		getLevel() {
			getLevel(this.myInfo.doctor.doctorTeamId, res => {
				this.isLevel = res.data.info;
			});
		}
	}
};
</script>

<style lang="scss" scoped>
.lg-container {
	.container_info {
		width: 100vw;
		height: 380rpx;
		background: linear-gradient(270deg, rgba(92, 204, 205, 1), rgba(3, 169, 172, 1));
		position: relative;
		&_box {
			width: 100%;
			height: 100%;
			display: flex;
			padding: 74rpx 40rpx 30rpx;
			box-sizing: border-box;
			// justify-content: center;
			align-items: center;
			flex-direction: column;
			.avatar {
				width: 140rpx;
				height: 140rpx;
				border-radius: 50%;
				overflow: hidden;
				margin-bottom: 4px;
			}
			.info_box {
				color: #ffffff;
				margin-top: 20rpx;
				.level {
					background-color: #ffbb3f;
					font-size: 20rpx;
					height: 32rpx;
					line-height: 32rpx;
					color: #fff;
					border-radius: 15rpx;
					padding: 0 14rpx 4rpx;
					margin-left: 20rpx;
				}
			}
		}
		.operation_left {
			position: absolute;
			left: 40rpx;
			top: 74rpx;
			.operation_img {
				width: 36rpx;
				height: 36rpx;
			}
		}
		.operation_right {
			position: absolute;
			right: 40rpx;
			top: 74rpx;
			.operation_img {
				width: 36rpx;
				height: 36rpx;
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
}
</style>
