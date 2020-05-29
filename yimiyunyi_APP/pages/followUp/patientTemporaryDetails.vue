<template>
	<view class="lg-container">
		<uni-nav-bar left-icon="back" right-text="更多信息" :title="patientName" @clickLeft="onLeftTap" @clickRight="onRightTap"></uni-nav-bar>
		<temporaryFollowup :patientId="patientId"></temporaryFollowup>
	</view>
</template>

<script>
	import temporaryFollowup from '@/pages/components/temporaryFollowup.vue';
	export default {
		onLoad(options) {
			this.patientId = options.patientId
			this.patientName = options.patientName
		},
		components: {
			temporaryFollowup
		},
		data() {
			return {
				patientId: null,
				patientName: ''
			}
		},
		methods: {
			onLeftTap() {
				uni.navigateBack({ delta: 1 });
			},
			// 更多信息
			onRightTap() {
				this.$helper.to('/pages/followUp/perfectPatientInfo?id='+this.patientId)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.lg-container {
		.nav-container {
			width: 100%;
			box-sizing: border-box;
			height: 60rpx;
			display: flex;
			justify-content: flex-start;
			align-items: center;
			background-color: #fff;
			margin-bottom: 4rpx;
			.nav-item {
				color: #333333;
				font-size: 24rpx;
				width: 50%;
				text-align: center;
				height: 100%;
				line-height: 60rpx;
				border-bottom: 2rpx solid #fff;
				&.active {
					border-color: #03a9ac;
					color: #03a9ac;
				}
			}
		}
	}
</style>
