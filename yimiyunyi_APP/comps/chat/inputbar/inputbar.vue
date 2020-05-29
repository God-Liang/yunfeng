<template>
	<view class="room_bar">
		<chat-suit-image ref="image" :username="username" :chatType="chatType" @inputFocused="inputFocused"></chat-suit-image>
		<view class="lg-operations-container" :class="popupLayerClass">
			<!-- 聊天操作栏 -->
			<view class="lg-msg-operations" :class="isRecord ? 'hidden' : ''">
				<!-- 操作栏切换 -->
				<!-- #ifndef H5 || MP-ALIPAY -->
					<view class="lg-msg-record-switch" @tap="switchRecord">
						<image class="lg-msg-record-switch_img" src="@/static/chat/record.png" mode=""></image>
					</view>
				<!-- #endif -->
				<!-- 输入发送消息 -->
				<chat-suit-main class="lg-msg-input" ref="main" :username="username" :chatType="chatType" @inputBlured="inputBlured" @inputFocused="inputFocused" @messageInput="messageInput"></chat-suit-main>
				<!-- <view class="lg-msg-input">
				</view> -->
				<view class="lg-msg-more">
					<image class="lg-msg-more_emoji" @tap="openEmoji" src="@/static/chat/emoji.png" mode="aspectFill"></image>
					<image class="lg-msg-more_more" @tap="showMore" src="@/static/chat/more.png" :class="message.length > 0 ? 'hidden' : ''" mode="aspectFill"></image>
					<view class="lg-msg-btn" :class="message.length > 0 ? 'show' : 'hide'" @tap="onSend">发送</view>
				</view>
			</view>
		
			<!-- 录音操作栏 -->
			<view class="lg-record-operations" :class="isRecord ? '' : 'hidden'">
				<!-- 操作栏切换 -->
				<view class="lg-msg-record-switch" @tap="switchRecord"><uni-icons size="30" type="settings" /></view>
				<!-- 录音按钮 -->
				<view
					class="lg-record-btn"
					:class="recording ? 'recording' : ''"
					@touchstart="recordBegin"
					@touchmove.stop.prevent="recordIng"
					@touchend="recordEnd"
					@touchcancel="recordCancel"
				>
					{{ recordBtnTitle }}
				</view>
				<!-- 更多 -->
				<view class="lg-record-more">
					<image class="lg-msg-more_emoji" src="@/static/chat/emoji.png" mode="aspectFill" @tap="openEmoji"></image>
					<image class="lg-msg-more_more" src="@/static/chat/more.png" mode="aspectFill" @tap="showMore"></image>
				</view>
			</view>
		</view>
		
		<!-- 录音弹框 -->
		<view class="lg-record-poppup" :class="recording ? '' : 'hidden'">
			<view class="lg-record-ing" :class="willStop ? 'hidden' : ''"><uni-icons class="icon" size="70" type="mic" /></view>
			<view class="lg-record-cancel" :class="willStop ? '' : 'hidden'"><uni-icons class="icon" color="rgb(3, 169, 172)" size="70" type="micoff" /></view>
			<view class="lg-record-normal" :class="willStop ? 'change' : ''">
				<view class="lg-recordLength">{{ recordLength | recordTime }}</view>
				<view class="lg-recordPoppupTitle">{{ recordPoppupTitle }}</view>
			</view>
		</view>
		
		<!-- 更多操作 -->
		<view class="lg-popup-more" :class="popupLayerClass">
			<chat-suit-emoji v-if="popupCon === 'emoji'" ref="emoji" @newEmojiStr="emojiAction"></chat-suit-emoji>
			<!-- 相册-拍照 -->
			<view class="more-layer" v-if="popupCon === 'more'">
				<view class="list">
					<view class="box">
						<view class="imgBox" @tap="sendImage"><image class="image" src="@/static/chat/image.png" mode=""></image></view>
						<text class="title">图片</text>
					</view>
					<view class="box">
						<view class="imgBox" @tap="openCamera"><image class="album" src="@/static/chat/album.png" mode=""></image></view>
						<text class="title">拍摄</text>
					</view>
					<view class="box">
					<!-- 	<view class="imgBox"><image class="file" src="@/static/chat/file.png" mode=""></image></view>
						<text class="title">文件</text> -->
					</view>
					<view class="box">
						<!-- <view class="imgBox"><image class="videoStart" src="@/static/chat/videoStart.png" mode=""></image></view>
						<text class="title">视频通话</text> -->
					</view>
				</view>
			</view>
		</view>
	</view> 
</template>

<script>
let RecordStatus = require('./suit/audio/record_status').RecordStatus;
let msgType = require('../msgtype');
import chatSuitMain from '@/comps/chat/inputbar/suit/main/main.vue';
import chatSuitEmoji from '@/comps/chat/inputbar/suit/emoji/emoji.vue';
import chatSuitImage from '@/comps/chat/inputbar/suit/image/image.vue';
import uniIcons from '@/components/uni-icons/uni-icons.vue';
import ChatRecord from '@/comps/chat/inputbar/chat_record.js';
import { mapGetters } from 'vuex';
export default {
	mixins: [ChatRecord],
	computed: {
		...mapGetters(['myInfo'])
	},
	components: {
		chatSuitMain,
		chatSuitImage,
		chatSuitEmoji,
		uniIcons
	},
	props: {
		username: {
			type: Object,
			value: {}
		},
		chatType: {
			type: String,
			value: msgType.chatType.SINGLE_CHAT
		}
	},
	data() {
		return {
			recordStatus: RecordStatus.HIDE,
			RecordStatus,
			popupLayerClass: '',
			popupCon: '',
			message: ''
		};
	},
	created() {},

	onReady() {},
	methods: {
		// 同步输入框消息
		messageInput(e) {
			this.message = e;
		},
		inputBlured() {
			// this.$emit('hideMore')
		},
		inputFocused() {
			if (this.popupLayerClass === 'showLayer' && this.popupCon !== '') {
				this.hideDrawer()
			}
		},
		// 录音与输入框切换
		switchRecord() {
			this.isRecord = !this.isRecord;
			if (this.isRecord) {
				this.popupLayerClass = '';
				this.$emit('hideMore')
			}
		},
		// 打开更多操作
		showMore() {
			this.popupLayerClass = 'showLayer';
			this.popupCon = 'more'
			this.$refs.emoji.cancelEmoji();
			this.isRecord = false;
			this.$nextTick(() => {
				this.$emit('showMore')
			})
		},
		// 隐藏更多操作
		hideDrawer() {
			this.popupLayerClass = '';
			this.$nextTick(() => {
				this.$emit('hideMore')
			})
		},
		toggleRecordModal() {
			this.$emit('tapSendAudio');
		},
		// 打开拍照发送图片
		openCamera() {
			this.$refs.image.openCamera();
		},
		// 打开相册发送图片
		sendImage() {
			this.$refs.image.sendImage();
		},
		// 打开表情包
		openEmoji() {
			this.popupLayerClass = 'showLayer'
			this.isRecord = false;
			this.popupCon = 'emoji';
			this.$nextTick(() => {
				this.$refs.emoji.openEmoji();
				this.$emit('showMore')
			})
		},
		// 关闭表情包
		cancelEmoji() {
			this.popupLayerClass = ''
			this.$refs.emoji.cancelEmoji();
			this.$nextTick(() => {
				this.$emit('hideMore')
			})
		},
		emojiAction(evt) {
			this.$refs.main.emojiAction(evt.msg);
		},
		onSend() {
			this.$refs.main.sendMessage()
		}
	}
};
</script>
<style lang="scss" scoped>
	.lg-operations-container {
		&.showLayer{transform: translate3d(0,-42vw,0);}
		width: 100%;
		min-height: 110rpx;
		background-color: #f2f2f2;
		display: flex;
		position: fixed;
		z-index: 20;
		bottom: 0;
		transition: all .15s linear;
		border-bottom: solid 2rupx #ddd;
		
		// 发送消息操作相关
		.lg-msg-operations {
			width: 100%;
			height: 110rpx;
			padding: 0 22rpx;
			box-sizing: border-box;
			display: flex;
			justify-content: space-between;
			align-items: center;
			background-color: #EEEEEE;
			border-top: 2rpx solid #DCDCDC;
			border-bottom: 2rpx solid #DCDCDC;
			// 录音、输入框切换
			.lg-msg-record-switch {
				width: 56rpx;
				height: 70rpx;
				.lg-msg-record-switch_img {
					width: 56rpx;
					height: 56rpx;
					margin-top: 7rpx;
				}
			}
			// 更多
			.lg-msg-more {
				height: 70rpx;
				display: flex;
				&.w132 {
					width: 132rpx;
				}
				.lg-msg-more_emoji {
					width: 56rpx;
					height: 56rpx;
					margin-top: 7rpx;
					margin-right: 20rpx;
				}
				.lg-msg-more_more {
					width: 56rpx;
					height: 56rpx;
					margin-top: 7rpx;
				}
				// 消息发送
				.lg-msg-btn {
					&.show{
						opacity: 1;
						width: 100rpx;
					}
					&.hide{
						opacity: 0;
						width: 0;
					}
					width: 100rpx;
					transition: all .15s linear;
					height: 70rpx;
					display: inline-block;
					font-size: 30rpx;
					line-height: 70rpx;
					text-align: center;
					color: #fff;
					border-radius: 5rpx;
					background-color: #03A9AC;
				}
			}
			
			// 输入消息内容
			.lg-msg-input {
				height: 70rpx;
				line-height: 70rpx;
				background-color: #fff;
				border-radius: 10rpx;
				box-sizing: border-box;
				flex: 1;
				margin: 0 24rpx;
				padding: 0 20rpx;
				.lg-msg-msg {
					height: 70rpx;
					line-height: 70rpx;
					padding: 0 20rpx;
					font-size: 28rpx;
					box-sizing: border-box;
				}
			}
		}
		
		// 录音操作相关
		.lg-record-operations {
			width: 100%;
			height: 110rpx;
			padding: 0 22rpx;
			box-sizing: border-box;
			display: flex;
			justify-content: space-between;
			align-items: center;
			background-color: #EEEEEE;
			border-top: 2rpx solid #DCDCDC;
			border-bottom: 2rpx solid #DCDCDC;
			
			// 录音、输入框切换
			.lg-msg-record-switch {
				width: 60rpx;
				height: 60rpx;
				line-height: 60rpx;
				text-align: center;
			}
			// 录音按钮
			.lg-record-btn {
				height: 70rpx;
				line-height: 66rpx;
				border-radius: 70rpx;
				border: 2rpx solid #cdcdcd;
				text-align: center;
				font-size: 26rpx;
				background-color: #fff;
				color: #555;
				margin: 0 20rpx;
				flex: 1;
				box-sizing: border-box;
				&.recording{
					background-color: #e5e5e5;
				}
			}
			
			// 更多
			.lg-record-more {
				height: 70rpx;
				line-height: 70rpx;
				.lg-msg-more_emoji {
					width: 56rpx;
					height: 56rpx;
					margin-top: 7rpx;
					margin-right: 20rpx;
				}
				.lg-msg-more_more {
					width: 56rpx;
					height: 56rpx;
					margin-top: 7rpx;
				}
			}
		}
	}
	// 更多操作
	.lg-popup-more {
		&.showLayer{transform: translate3d(0,-42vw,0);}
		transition: all .15s linear;
		width: 100%;
		height: 42vw;
		background-color: #f3f3f3;
		border-top: solid 1upx #ddd;
		position: fixed;
		z-index: 20;
		top: 100%;
		.more-layer{
			width: 100%;
			height: 42vw;
			.list{
				width: 100%;
				height: 100%;
				padding: 0 30rpx;
				box-sizing: border-box;
				display: flex;
				justify-content: space-around;
				align-items: center;
				.box{
					display: flex;
					justify-content: center;
					flex-direction: column;
					align-items: center;
					width: 110rpx;
					.imgBox {
						width: 110rpx;
						height: 110rpx;
						border-radius: 10rpx;
						display: flex;
						justify-content: center;
						align-items: center;
						background-color: #fff;
						.image {
							width: 60rpx;
							height: 53rpx;
						}
						.album {
							width: 60rpx;
							height: 52rpx;
						}
						.file {
							width: 60rpx;
							height: 53rpx;
						}
						.videoStart {
							width: 60rpx;
							height: 60rpx;
						}
					}
					.title {
						font-size: 30rpx;
						color: #333333;
						margin-top: 20rpx;
					}
				}
			}
		}
	}
	.lg-record-poppup {
		width: 40vw;
		height: 40vw;
		position: fixed;
		left: 30%;
		bottom: 300rpx;
		background-color: rgba(0,0,0,.6);
		border-radius: 20rpx;
		.lg-record-ing {
			width: 100%;
			height: 24vw;
			display: flex;
			justify-content: center;
			align-items: center;
			@keyframes volatility {
				0% {background-position: 0% 130%;}
				20% {background-position: 0% 150%;}
				30% {background-position: 0% 155%;}
				40% {background-position: 0% 150%;}
				50% {background-position: 0% 145%;}
				70% {background-position: 0% 150%;}
				80% {background-position: 0% 155%;}
				90% {background-position: 0% 140%;}
				100% {background-position: 0% 135%;}
			}
			.icon{
				background-image:linear-gradient(to bottom,rgb(3, 169, 172),#fff 50%); 
				background-size:100% 200%;
				animation: volatility 1.5s ease-in-out -1.5s infinite alternate;
				-webkit-background-clip:text; 
				-webkit-text-fill-color:transparent;
				color: rgb(3, 169, 172);
			}
		}
		.lg-record-cancel {
			width: 100%;
			height: 24vw;
			display: flex;
			justify-content: center;
			align-items: center;
		}
		.lg-record-normal {
			width: 100%;
			height: 14vw;
			text-align: center;
			font-size: 28rpx;
			color: #fff;
			&.change{
				color: rgb(3, 169, 172);
			}
			.lg-recordLength {
				font-size: 36rpx;
				line-height: 5vw;
				margin-bottom: 20rpx;
			}
			.lg-recordPoppupTitle {
				line-height: 5vw;
			}
		}
	}
</style>
<style>
.room_bar {
	width: 100%;
	height: auto;
	border-top: 1px solid #cfcfcf;
	position: fixed;
	bottom: 0;
	right: 0;
	z-index: 1;
	background-color: #ffffff;
	transform: translateZ(1000px);
}

.other_func {
	width: 100%;
	height: 60rpx;
	display: flex;
}
.other_func_X {
	height: 128rpx;
}

.other_func image {
	width: 42rpx;
	height: 40rpx;
}

.open_emoji,
.send_image,
.open_camera,
.v-record {
	width: 48rpx;
	height: 48rpx;
	display: flex;
	align-items: center;
	justify-content: center;
	margin-left: 48rpx;
}

.v-record .icon-record {
	width: 18rpx;
	height: 40rpx;
}
.v-record {
	margin-left: 48rpx;
}
.open_camera,
.send_image {
	margin-left: 64rpx;
}
.hidden{
	display: none !important;
}
</style>
