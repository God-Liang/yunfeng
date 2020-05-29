<template>
	<view class="lgProgress">
		<view class="lgProgress-item" :class="index <= active ? (index === active ? 'curactive active': 'active') : '' " v-for="(item, index) in processList" :key="index">
			<view class="lgProgress-item_process" :class="index === 0 ? 'first' : (index === processList.length - 1 ? 'last' : '')">
				<view class="before"></view>
				<view class="round"></view>
				<view class="after"></view>
			</view>
			<view class="lgProgress-item_title">
				<view class="title">{{item.title}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'lgProgress',
		props: {
			active: {
				type: Number,
				default: 0
			}
		},
		data() {
			return {
				processList: [
					{
						title: '选择患者'
					},
					{
						title: '选择方案'
					},
					{
						title: '随访计划'
					}
				]
			}
		},
		methods: {

		}
	}
</script>

<style lang="scss" scoped>
	.lgProgress {
		height: 140rpx;
		width: 100vw;
		background-color: #fff;
		display: flex;
		justify-content: space-between;
		align-items: center;
		box-sizing: border-box;
		.lgProgress-item {
			flex: 1;
			position: relative;
			display: flex;
			flex-direction: column;
			align-items: center;
			&.active {
				.lgProgress-item_process {
					.round {
						background-color: #03A9AC;
						border: 4rpx solid #D7F3F3;
					}
					.before {
						background-color: #03A9AC;
					}
					.after {
						background-color: #03A9AC;
					}
				}
			}
			&.curactive {
				.lgProgress-item_process {
					.after {
						background-color: #DCDCDC;
					}
				}
			}
			&_process {
				width: 100%;
				display: flex;
				align-items: center;
				&.first {
					.before {
						background-color: #fff !important;
					}
				}
				&.last {
					.after {
						background-color: #fff !important;
					}
				}
				.before {
					flex: 1;
					width: 100%;
					height: 4rpx;
					background-color: #DCDCDC;
				}
				.round {
					width: 28rpx;
					height: 28rpx;
					border: 2rpx solid #DCDCDC;
					border-radius: 50%;
				}
				.after {
					flex: 1;
					width: 100%;
					height: 4rpx;
					background-color: #DCDCDC;
				}
			}
			&_title {
				margin-top: 20rpx;
				color: #333333;
				font-size: 26rpx;
			}
		}
	}
</style>
