<template>
	<view class="lg-container">
		<uni-nav-bar left-icon="back" right-text="更多信息" :title="patientInfo.name" @clickLeft="onLeftTap" @clickRight="onRightTap"></uni-nav-bar>
		<view class="nav-container">
			<view class="nav-item" :class="{ active: tabType == 1 }" @tap="changeTab(1)">计划随访</view>
			<view class="nav-item" :class="{ active: tabType == 0 }" @tap="changeTab(0)">临时随访</view>
		</view>
		<planFollowup v-if="tabType==1" :patientId="patientId"></planFollowup>
		<temporaryFollowup v-if="tabType==0" :patientId="patientId"></temporaryFollowup>
	</view>
</template>

<script>
	import planFollowup from '@/pages/components/planFollowup.vue';
	import temporaryFollowup from '@/pages/components/temporaryFollowup.vue';
	import { read } from '@/api/common';
	export default {
		onLoad(options) {
			this.patientId = options.patientId || 670
		},
		components: {
			planFollowup,
			temporaryFollowup
		},
		data() {
			return {
				tabType: 1,
				patientInfo: {
					name: ''
				},
				patientId: null
			}
		},
		onShow() {
			this.getPatientInfo()
		},
		methods: {
			onLeftTap() {
				uni.navigateBack({ delta: 1 });
			},
			getPatientInfo() {
				read('patient', this.patientId, res => {
					this.patientInfo = res.data.info
				})
			},
			// 更多信息
			onRightTap() {
				this.$helper.to('/pages/followUp/perfectPatientInfo?id='+this.patientId)
			},
			changeTab(type) {
				if (this.tabType !== type) {
					this.tabType = type;
				}
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
