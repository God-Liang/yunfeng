<template>
	<view class="lg-container">
		<view class="container_info">
			<view class="operation_left" @tap="onLeftTap"><uni-icons color="#fff" size="28" type="back" /></view>
			<view class="container_info_box">
				<image class="avatar" v-if="memberInfo.userVo.avatar" :src="memberInfo.userVo.avatar" mode="aspectFill"></image>
				<image class="avatar" v-else src="@/static/team/avatar_doctor.png" mode=""></image>
				<text class="info_box fs30">{{ memberInfo.name || '暂无名称' }}</text>
				<text class="info_box fs24">{{ memberInfo.userVo.doctor.professionCallShow || '暂无职称' }}&nbsp;&nbsp;&nbsp;&nbsp;{{ memberInfo.userVo.doctor.department || '暂无科室' }}</text>
				<text class="info_box fs22">
					{{ memberInfo.userVo.doctor.doctorHospital || '暂无所在医院' }}&nbsp;&nbsp;&nbsp;&nbsp;
					<text class="level">{{ memberInfo.userVo.doctor.doctorHospitalLevel || '暂无等级' }}</text>
				</text>
			</view>
			<!-- <view class="operation_right" @tap="into_ChatRoom"><image class="operation_img" src="@/static/team/add.png" mode=""></image></view> -->
		</view>
		<scroll-view scroll-y class="message-container">
			<view class="message-item">
				<view class="title">
					<image class="introduction-img" src="@/static/team/members/introduction.png" mode=""></image>
					<text>我的简介</text>
				</view>
				<view class="content">
					<text>{{ memberInfo.userVo.doctor.introduction || '暂无简介' }}</text>
				</view>
			</view>
			<view class="message-item">
				<view class="title">
					<image class="operation-img" src="@/static/team/members/operation.png" mode=""></image>
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
					<image class="disease-img" src="@/static/team/members/disease.png" mode=""></image>
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
					<image class="certificate-img" src="@/static/team/members/certificate.png" mode=""></image>
					<text>荣誉证书</text>
				</view>
				<view v-if="honorCertificates.length === 0" class="certificate-list">
					<view class="certificate-null"><text>暂无荣誉证书</text></view>
				</view>
				<view v-else class="certificate-list">
					<view class="certificate-item" @tap="onPreview(index)" v-for="(item, index) in honorCertificates" :key="index"><image :src="item" mode="aspectFill"></image></view>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
import { getTeamMemberInfo } from '@/api/team';
import { mapGetters } from 'vuex';
export default {
	onLoad(options) {
		this.memberInfo.userId = parseInt(options.userId)
	},
	data() {
		return {
			memberInfo: {
				id: null,
				userId: null,
				name: '',
				userVo: {
					avatar: '',
					sex: 0,
					doctor: {
						doctorHospital: '',
						doctorHospitalLevel: '',
						department: '',
						professionCallShow: ''
					}
				}
			},
			honorCertificates: [],
			diseases: [],
			operations: []
		};
	},
	computed: {
		...mapGetters(['myInfo'])
	},
	onShow() {
		this.readInfo()
	},
	methods: {
		onLeftTap() {
			uni.navigateBack({ delta: 1 });
		},
		readInfo() {
			this.$helper.loading('加载中')
			const data = {
				userId: this.memberInfo.userId,
				teamId: this.myInfo.doctor.doctorTeamId
			}
			getTeamMemberInfo(data, res => {
				uni.hideLoading()
				if (res.data.info) {
					this.memberInfo = res.data.info
					this.honorCertificates = this.memberInfo.userVo.doctor.honorCertificates ? this.memberInfo.userVo.doctor.honorCertificates.split(',') : []
					this.diseases = this.memberInfo.userVo.doctor.disease ? this.memberInfo.userVo.doctor.disease.split(',') : []
					this.operations = this.memberInfo.userVo.doctor.operation ? this.memberInfo.userVo.doctor.operation.split(',') : []
				}
			})
		},
		// 单聊
		into_ChatRoom() {
			this.username = {
				myName: String(this.myInfo.id),
				your: String(this.memberInfo.userId), 
			}
			this.$helper.to('/pages/chatroom/index?username=' + JSON.stringify(this.username));
		},
		onPreview(index) {
			uni.previewImage({
				urls: this.honorCertificates,
				current: index,
				longPressActions: {
					success: function(data) {},
					fail: function(err) {}
				}
			});
		}
	}
};
</script>

<style lang="scss" scoped>
.lg-container {
	.container_info {
		width: 100vw;
		height: 400rpx;
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
		height: calc(100vh - 420rpx);
		// #ifndef H5
		height: calc(100vh - 468rpx);
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
				.introduction-img {
					width: 24rpx;
					height: 26rpx;
					margin-right: 12rpx;
				}
				.operation-img {
					width: 28rpx;
					height: 28rpx;
					margin-right: 12rpx;
				}
				.disease-img {
					width: 30rpx;
					height: 27rpx;
					margin-right: 12rpx;
				}
				.certificate-img {
					width: 28rpx;
					height: 28rpx;
					margin-right: 12rpx;
				}
				text {
					color: #333333;
					font-size: 26rpx;
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
