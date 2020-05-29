<template>
	<view class="lg-container">
		<uni-nav-bar left-icon="back" title="随访消息" @clickLeft="onLeftTap"></uni-nav-bar>
		<view class="message-container">
			<mescroll-uni ref="mescrollRef" :height="height" @init="mescrollInit" :down="downOption" @down="downCallback" :up="upOption">
				<!-- 无更多消息 -->
				<view v-if="isEnd" class="msg-end">没有更多消息了</view>
				<view class="message_item" v-for="(item, index) in dataList" :key="index">
					<view class="message_item_time fs24 color666">
						{{item.createTime | parseTime('{m}-{d} {h}:{i}')}}
					</view>
					<view class="message_item_box" v-if="item.parameterType === 1">
						<view class="message-left"><image src="@/static/message/followup.png" mode=""></image></view>
						<view class="message-right">
							<view class="triangle"></view>
							<view class="message-content">
								<view class="followupTitle fs30 color333">{{item.title}}</view>
								<view class="followupCon fs26 color888">{{item.content}}</view>
							</view>
						</view>
					</view>
					<view class="message_item_box" v-if="item.parameterType === 2" @tap="onJump('/pages/followUp/planDetail?id='+item.parameter)">
						<view class="message-left">
							<image src="@/static/message/followup.png" mode=""></image>
						</view>
						<view class="message-right">
							<view class="triangle"></view>
							<view class="message-content">
								<view class="followupTitle fs30 color333">{{item.title}}</view>
								<view class="followupCon fs26 color888">{{item.content}}</view>
							</view>
							<view class="message-foot">
								<text class="color333 fs22">查看详情</text>
								<text class="color888 fs26 icon iconfont iconjiantouarrow487"></text>
							</view>
						</view>
					</view>
					<view class="message_item_box" v-if="item.parameterType === 4" @tap="onJump('/pages/components/details?id='+item.parameter+'&isPlan=1')">
						<view class="message-left">
							<image src="@/static/message/followup.png" mode=""></image>
						</view>
						<view class="message-right">
							<view class="triangle"></view>
							<view class="message-content">
								<view class="followupTitle fs30 color333">{{item.title}}</view>
								<view class="followupCon fs26 color888">{{item.content}}</view>
							</view>
							<view class="message-foot">
								<text class="color333 fs22">查看详情</text>
								<text class="color888 fs26 icon iconfont iconjiantouarrow487"></text>
							</view>
						</view>
					</view>
				</view>
			</mescroll-uni>
		</view>
	</view>
</template>

<script>
import MescrollMixin from '@/components/mescroll-uni/mescroll-mixins.js';
import { getList } from '@/api/common';
import { updateMsg } from '@/api/message';
import common from '@/mixins/common';
import { mapGetters } from 'vuex';
export default {
	mixins: [MescrollMixin, common],
	onLoad(options) {
		const winHeight = uni.getSystemInfoSync().windowHeight;
		this.height = winHeight - uni.upx2px(88) + 'px';
		// #ifndef H5
		this.height = winHeight - uni.upx2px(136) + 'px';
		// #endif
		if (options.messageId) {
			this.messageId = options.messageId;
			this.readNum = parseInt(options.readNum)
		}
	},
	computed: {
		...mapGetters(['myInfo'])
	},
	onShow() {
		if (this.readNum > 0) {
			const data = {
				id: this.messageId,
				statusNum: 0
			}
			updateMsg(data, res => {})
		}
	},
	data() {
		return {
			apiName: 'messageItem',
			downOption: {
				autoShowLoading: true // 显示下拉刷新的进度条
			},
			upOption: {
				use: false, // 禁止上拉
				toTop: {
					src: '' // 不显示回到顶部按钮
				}
			},
			pageNum: 1, // 页码
			pageSize: 10, // 页长
			isEnd: false, // 是否无消息
			dataList: [],
			messageId: null,
			height: 0,
			readNum: 0
		};
	},
	methods: {
		onLeftTap() {
			uni.navigateBack({ delta: 1 });
		},
		downCallback() {
			const data = {
				current: this.pageNum,
				pageSize: this.pageSize,
				messageId: this.messageId
			};
			getList(
				this.apiName,
				data,
				res => {
					this.pageNum++;
					this.mescroll.endSuccess();
					if (res.data.list.length < this.pageSize) {
						this.isEnd = true; // 标记已无更多消息
						this.mescroll.lockDownScroll(true); // 锁定下拉
					}
					res.data.list.forEach(val => {
						val.VIEW_ID = 'msg' + val.id; // 不以数字开头
					});
					let topMsg = this.dataList[0];
					this.dataList = res.data.list.concat(this.dataList);
					this.$nextTick(() => {
						if (this.pageNum <= 2) {
							// 第一页直接滚动到底部 ( this.pageNum已在前面加1 )
							this.mescroll.scrollTo(99999, 0);
						} else if (topMsg) {
							// 保持顶部消息的位置
							let view = uni.createSelectorQuery().select('#' + topMsg.VIEW_ID);
							view
								.boundingClientRect(v => {
									console.log('节点离页面顶部的距离=' + v.top);
									this.mescroll.scrollTo(v.top - 100, 0); // 减去上偏移量100
								})
								.exec();
						}
					});
				},
				err => {
					this.pageNum--; // 联网失败,必须回减页码
					this.mescroll.endErr(); // 隐藏下拉刷新的状态
				}
			);
		}
	}
};
</script>

<style lang="scss" scoped>
.lg-container {
	.message-container {
		.msg-end {
			padding: 40rpx 0;
			font-size: 24rpx;
			text-align: center;
			color: gray;
		}
		.message_item {
			.message_item_time {
				margin: 40rpx auto;
				width: 200rpx;
				height: 50rpx;
				line-height: 50rpx;
				text-align: center;
				border-radius:5rpx;
				background-color: #fff;
			}
			.message_item_box {
				display: flex;
				margin-bottom: 50rpx;
				padding: 0 90rpx 0 40rpx;
				.message-left {
					width: 80rpx;
					height: 80rpx;
					margin-right: 40rpx;
					image {
						width: 80rpx;
						height: 80rpx;
					}
				}
				.message-right {
					flex: 1;
					background-color: #fff;
					position: relative;
					border-radius: 5rpx;
					padding: 0 20rpx;
					box-sizing: border-box;
					.triangle {
						width: 0;
						height: 0;
						border-left: 24rpx solid transparent;
						border-top: 14rpx solid transparent;
						border-right: 24rpx solid #FFFFFF;
						border-bottom: 14rpx solid transparent;
						position: absolute;
						left: -40rpx;
						top: 16rpx;
					}
					.message-head {
						height: 70rpx;
						width: 100%;
						display: flex;
						justify-content: space-between;
						align-items: center;
						padding: 0 20rpx;
						box-sizing: border-box;
						border-bottom: 1rpx solid #DCDCDC;
						.message-title {
							color: #333333;
							font-size: 26rpx;
						}
					}
					.message-content {
						padding: 30rpx 20rpx;
						color: #333333;
						font-size: 30rpx;
						.followupTitle {
							margin-bottom: 20rpx;
						}
						.followupCon {
							line-height: 36rpx;
						}
					}
					.message-foot {
						height: 50rpx;
						padding: 0 20rpx;
						display: flex;
						justify-content: space-between;
						align-items: center;
						border-top: 1rpx solid #DCDCDC;
					}
				}
			}
		}
	}
}
</style>
