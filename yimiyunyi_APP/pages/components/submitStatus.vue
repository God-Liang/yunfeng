<template>
	<view class="lg-container">
		<uni-nav-bar left-icon="back" :title="content.title" @clickLeft="onLeftTap"></uni-nav-bar>
		<view class="audit-container">
			<image src="@/static/mine/succeed.png" mode=""></image>
			<text class="audit-status">{{ content.result }}</text>
			<text class="audit-await">{{ content.note }}</text>
		</view>
	</view>
</template>

<script>
export default {
	onLoad(options) {
		if (options.type) {
			this.type = parseInt(options.type);
			this.content = this.statusAll[this.type];
		}
	},
	data() {
		return {
			statusAll: [
				{
					title: '成员退出申请',
					result: '申请成功！',
					note: '成员申请退出申请成功'
				},
				{
					title: '新建随访计划',
					result: '成功！',
					note: '您新建的随访计划成功'
				},
				{
					title: '加入团队',
					result: '申请成功！',
					note: '等待团队管理者审核'
				}
			],
			content: {
				title: '',
				result: '',
				note: ''
			},
			type: null
		};
	},
	// #ifndef H5
	onBackPress(options) {
		if (options.from === 'navigateBack') {
			return false;
		}
		this.onLeftTap()
		return false;
	},
	// #endif
	methods: {
		onLeftTap() {
			switch (this.type) {
				case 0:
					this.$helper.toTab('/pages/tabBar/mine');
					break;
				case 1:
					this.$helper.toTab('/pages/tabBar/followUp');
					break;
				case 2:
					this.$helper.toTab('/pages/tabBar/team');
					break;
				default:
					uni.navigateBack({ delta: 1 });
					break;
			}
		}
	}
};
</script>

<style lang="scss" scoped>
.lg-container {
	.audit-container {
		margin-top: 20rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		// background-color: #fff;
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
