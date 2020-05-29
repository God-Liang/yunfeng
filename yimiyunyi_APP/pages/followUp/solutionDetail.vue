<template>
	<view class="lg-container">
		<uni-nav-bar left-icon="back" title="方案详情" @clickLeft="onLeftTap"></uni-nav-bar>
		<view class="plan-container">
			<view class="plan-detail">
				<view class="scheme-detail">
					<view class="scheme-name">{{ planDetail.name }}</view>
					<view class="scheme-type">{{planDetail.scopeShow}}</view>
				</view>
				<view class="plan-no">{{ planDetail.visitNum }}</view>
			</view>
			<view class="scheme-intro">{{planDetail.introduce}}</view>
		</view>
		<view class="main">
			<view class="list" v-for="(item, index) in planDetail.solutionNodeVoLists" :key="item.id">
				<view class="left">
					<view class="totalDay" v-if="index === 0">预计共{{ planDetail.predictDay }}天</view>
					<view class="day" :class="{ first: index === 0 }">第{{ item.intervalDay }}天</view>
				</view>
				<view class="right">
					<view class="title">{{ item.name }}</view>
					<view class="content">
						<view class="completed" v-if="item.completed"></view>
						<view class="c_t lg_scale" v-if="item.formSolutionNodeItemList.length > 0">量表</view>
						<template v-if="item.formSolutionNodeItemList.length > 0">
							<navigator :url="'/pages/components/details?id=' + xj.id + '&isPlan=0'" class="c_l" v-for="(xj, i) in item.formSolutionNodeItemList" :key="xj.id">
								{{ xj.templateName }}
							</navigator>
						</template>
						<view class="c_t lg_education" v-if="item.visitSolutionNodeItemList.length > 0">宣教</view>
						<template v-if="item.visitSolutionNodeItemList.length > 0">
							<navigator :url="'/pages/components/details?id=' + lb.id + '&isPlan=0'" class="c_l" v-for="(lb, j) in item.visitSolutionNodeItemList" :key="lb.id">
								{{ lb.templateName }}
							</navigator>
						</template>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import { read } from '@/api/common';
import { mapGetters } from 'vuex';
export default {
	computed: {
		...mapGetters(['planObj'])
	},
	onLoad(options) {
		this.detailId = options.id || 142;
	},
	data() {
		return {
			planDetail: {
				name: '',
				scopeShow: '',
				visitNum: 0,
				predictDay: 0,
				solutionNodeVoLists: []
			},
			detailId: ''
		};
	},
	onShow() {
		this.getPlanDetail();
	},
	methods: {
		onLeftTap() {
			uni.navigateBack({ delta: 1 });
		},
		getPlanDetail() {
			read('AppFollowupSolution', this.detailId, res => {
				uni.hideLoading();
				this.planDetail = res.data.info;
			});
		}
	}
};
</script>
<style lang="scss" scoped>
.plan-container {
	width: 100vw;
	height: 180rpx;
	background: #fff;
	font-size: 26rpx;
	padding: 20rpx 40rpx;
	line-height: 50rpx;
	box-sizing: border-box;
	.plan-detail {
		width: 100%;
		display: flex;
		justify-content: space-between;
		align-items: center;
		.scheme-detail {
			display: flex;
			align-items: center;
			.scheme-name {
				max-width: 400rpx;
				overflow: hidden;
				white-space: nowrap;
				text-overflow: ellipsis;
				color: #333333;
				font-size: 26rpx;
			}
			.scheme-type {
				margin-left: 20rpx;
				padding: 6rpx 12rpx;
				background-color: #eeeeee;
				color: #a6a6a6;
				font-size: 20rpx;
				line-height: 20rpx;
			}
		}
		.plan-no {
			color: #03A9AC;
			font-size: 24rpx;
			width: 40rpx;
			height: 40rpx;
			line-height: 40rpx;
			text-align: center;
			border: 2rpx solid #03A9AC;
			border-radius: 50%;
		}
	}
	.scheme-intro {
		color: #888888;
		font-size: 22rpx;
		line-height: 36rpx;
		margin-top: 10rpx;
		display: -webkit-box;
		text-overflow: ellipsis;
		overflow: hidden;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
	}
}

.main {
	height: calc(100vh - 268rpx);
	// #ifndef H5
	height: calc(100vh - 316rpx);
	// #endif
	overflow: auto;
	padding: 30rpx 40rpx;
	box-sizing: border-box;
	&.pb120 {
		padding-bottom: 120rpx;
	}
	.list {
		width: 100%;
		display: flex;
		justify-content: space-between;
		box-sizing: border-box;
	}
	.left {
		width: 120rpx;
		.totalDay {
			line-height: 30rpx;
			font-size: 24rpx;
		}
		.day {
			height: 100%;
			border-left: 2rpx solid #dcdcdc;
			position: relative;
			margin-left: 5rpx;
			display: flex;
			align-items: center;
			padding-left: 20rpx;
			&.first {
				height: calc(100% - 30rpx);
			}
			&:after {
				display: block;
				content: '';
				width: 20rpx;
				height: 20rpx;
				border-radius: 50%;
				background: #dcdcdc;
				position: absolute;
				left: -10rpx;
				top: 50%;
				transform: translateY(-10rpx);
			}
		}
	}
	.right {
		width: calc(100% - 130rpx);
		color: #bcbcbc;

		.title {
			font-size: 24rpx;
			line-height: 24rpx;
			padding-bottom: 20rpx;
			color: #888888;
			font-size: 24rpx;
		}
		.content {
			background: #fff;
			border-radius: 10rpx;
			padding: 20rpx 30rpx;
			box-sizing: border-box;
			line-height: 40rpx;
			font-size: 24rpx;
			margin-bottom: 30rpx;
			position: relative;
			.completed {
				width: 115rpx;
				height: 115rpx;
				background: url('https://gitee.com/picture_storage_area/follow_up_doctor/raw/master/images/patient/completed.png') no-repeat center;
				background-size: cover;
				position: absolute;
				right: 24rpx;
				top: 50%;
				transform: translateY(-55rpx);
			}
			.info-null {
				color: #cccccc;
				font-size: 20rpx;
				text-align: center;
			}
			.c_t {
				padding-top: 10rpx;
			}
			.c_l {
				font-size: 26rpx;
				color: #81d4d5;
				text-decoration: underline;
			}
			.lg_scale {
				&:before {
					content: '';
					display: inline-block;
					width: 22rpx;
					height: 22rpx;
					background: url('https://gitee.com/picture_storage_area/follow_up_doctor/raw/master/followUp/scale.png') no-repeat;
					background-size: cover;
					vertical-align: middle;
					margin-bottom: 4rpx;
					margin-right: 10rpx;
				}
			}
			.lg_education {
				&:before {
					content: '';
					display: inline-block;
					width: 26rpx;
					height: 20rpx;
					background: url('https://gitee.com/picture_storage_area/follow_up_doctor/raw/master/followUp/education.png') no-repeat;
					background-size: cover;
					vertical-align: middle;
					margin-bottom: 4rpx;
					margin-right: 10rpx;
				}
			}
		}
	}
}
</style>
