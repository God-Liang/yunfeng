<template>
	<view class="lg-webSocket-list" id="scrollview">
		<scroll-view
			:style="{ maxHeight: scrollHeight + 'px' }"
			class="lg-scroll wrap"
			scroll-y="true"
			@tap="hideDrawer"
			@scrolltoupper="refresh"
			@scroll="scroll"
			upper-threshold="-50"
			:scroll-top="scrollTop"
		>
			<view class="lg-msg-list" id="msglistview">
				<view class="lg-msg-item" :class="item.style ? 'lg-msg-my' : ''" v-for="(item, index) in chatMsg" :key="index" :id="item.mid">
					<navigator class="lg-msg-avatar">
						<!-- <image class="avatar-img" src="@/static/chat/man.png" mode="aspectFill"></image> -->
						<image class="avatar-img" v-if="item.ext.avatar" :src="item.ext.avatar" mode="aspectFill"></image>
						<image class="avatar-img" v-if="!item.ext.avatar && !item.ext.sex" src="@/static/chat/man.png" mode="aspectFill"></image>
						<image class="avatar-img" v-if="!item.ext.avatar && item.ext.sex" src="@/static/chat/woman.png" mode="aspectFill"></image>
					</navigator>
					<view class="lg-msg-box">
						<view class="lg-msg-nick">
							<!-- <text class="nick-text">{{ item.yourname }}</text> -->
							<text class="nick-text">{{ item.ext.nick }}</text>
							<text class="time-text">{{ item.time }}</text>
						</view>
						<view class="lg-msg-content">
							<image @tap="againSend(item)" class="err" :class="item.style == 'self' && item.isFail ? 'show' : 'hide'" src="/static/images/msgerr.png" />
							<image v-if="item.style" class="lg-mySJ" src="@/static/chat/mySJ.png" mode="aspectFill"></image>
							<image v-else class="lg-otherSJ" src="@/static/chat/otherSJ.png" mode="aspectFill"></image>
							<view class="lg-msg-info" v-if="item.msg.type == 'txt' || item.msg.type == 'emoji'">
								<block v-for="(d_item, d_index) in item.msg.data" :key="d_index">
									<text v-if="d_item.type == 'txt'" class="msg-text">{{ d_item.data }}</text>
									<image v-if="d_item.type == 'emoji'" class="msg-emoji" :src="'/static/images/faces/' + d_item.data" />
								</block>
							</view>
							<audio-msg class="lg-msg-info" v-if="item.msg.type == 'audio'" :msg="item"></audio-msg>
							<view class="lg-msg-info" v-if="item.msg.type == 'img' || item.msg.type == 'video'">
								<image
									v-if="item.msg.type == 'img'"
									class="avatar"
									:src="item.msg.data"
									style="width:90px; height:120px; margin:2px auto;"
									mode="aspectFit"
									@tap="previewImage"
									:data-url="item.msg.data"
								/>
								<video v-if="item.msg.type == 'video'" :src="item.msg.data" controls autoplay />
							</view>
						</view>
					</view>
				</view>
			</view>
		</scroll-view>
		<!-- 历史消息占位 -->
		<view class="historyMsg lg-msg-list" id="historyMsg">
			<view class="lg-msg-item" :class="item.style ? 'lg-msg-my' : ''" v-for="(item, index) in historyChatMsg" :key="index" :id="item.mid">
				<navigator class="lg-msg-avatar"><image class="avatar-img" src="@/static/chat/man.png" mode="aspectFill"></image></navigator>
				<view class="lg-msg-box">
					<view class="lg-msg-nick">
						<text class="nick-text">{{ item.yourname }}</text>
						<text class="time-text">{{ item.time }}</text>
					</view>
					<view class="lg-msg-content">
						<image @tap="againSend(item, index)" class="err" :class="item.style == 'self' && item.isFail ? 'show' : 'hide'" src="/static/images/msgerr.png" />
						<image v-if="item.style" class="lg-mySJ" src="@/static/chat/mySJ.png" mode="aspectFill"></image>
						<image v-else class="lg-otherSJ" src="@/static/chat/otherSJ.png" mode="aspectFill"></image>
						<view class="lg-msg-info" v-if="item.msg.type == 'txt' || item.msg.type == 'emoji'">
							<block v-for="(d_item, d_index) in item.msg.data" :key="d_index">
								<text v-if="d_item.type == 'txt'" class="msg-text">{{ d_item.data }}</text>
								<image v-if="d_item.type == 'emoji'" class="msg-emoji" :src="'/static/images/faces/' + d_item.data" />
							</block>
						</view>
						<audio-msg class="lg-msg-info" v-if="item.msg.type == 'audio'" :msg="item"></audio-msg>
						<view class="lg-msg-info" v-if="item.msg.type == 'img' || item.msg.type == 'video'">
							<image
								v-if="item.msg.type == 'img'"
								class="avatar"
								:src="item.msg.data"
								style="width:90px; height:120px; margin:2px auto;"
								mode="aspectFit"
								@tap="previewImage"
								:data-url="item.msg.data"
							/>
							<video v-if="item.msg.type == 'video'" :src="item.msg.data" controls autoplay />
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>

	<!-- <view style="height: 1px;"></view> -->
</template>

<script>
import { mapGetters } from 'vuex';
import ChatAgainSend from '@/comps/chat/inputbar/chat_againSend.js';
import audioMsg from '@/comps/chat/msglist/type/audio/audio.vue';
let msgStorage = require('../msgstorage');
let msgType = require('../msgtype');
let disp = require('../../../utils/broadcast');
let page = 0;
let Index = 0;
let curMsgMid = '';
let isFail = false;
let isHis = true;
export default {
	mixins: [ChatAgainSend],
	computed: {
		...mapGetters(['myInfo'])
	},
	components: {
		audioMsg
	},
	props: {
		username: {
			type: Object,
			value: {}
		}
	},
	data() {
		return {
			chatMsg: [],
			historyChatMsg: [],
			visibility: false,
			emojiObj: this.$im.Emoji.map,
			scrollTop: 0,
			scrollHeight: 0
		};
	},
	onLoad() {

	},
	beforeMount() {
		this.visibility = true;
		// page = 0;
		// Index = 0;
	},
	beforeDestroy() {
		this.visibility = false;
	},
	created() {
		//app端虽然会触发created，但是读取local storage为空
		// #ifdef H5
		isHis = false;
		this.create_or_onready();
		// #endif
	},
	mounted() {
		// #ifndef H5
		isHis = false;
		this.create_or_onready();
		// #endif
	},
	methods: {
		// 获取屏幕高度
		getScrollHeight(height) {
			const winHeight = uni.getSystemInfoSync().windowHeight;
			const winWidth = uni.getSystemInfoSync().windowWidth;
			// this.scrollHeight = winHeight - (winWidth / 750) * (height+88);
			this.scrollHeight = winHeight - (winWidth / 750) * (height + 140);
			this.$nextTick(() => {
				this.scrollToBottom();
			});
		},
		// 滚动至聊天底部
		scrollToBottom() {
			let me = this;
			let lgQuery = uni.createSelectorQuery().in(this);
			lgQuery.select('#scrollview').boundingClientRect();
			lgQuery.select('#msglistview').boundingClientRect();
			lgQuery.exec(res => {
				if (res && res[0]) {
					if (res[1].height > res[0].height) {
						me.scrollTop = 99999
					}
				} else {
					me.scrollTop = 0;
				}
			});
		},
		create_or_onready() {
			let me = this;
			let username = this.username;
			let myUsername = uni.getStorageSync('myUsername');
			let sessionKey = username.groupId ? username.groupId + myUsername : username.your + myUsername;
			let chatMsg = uni.getStorageSync(sessionKey) || [];
			this.renderMsg(null, null, chatMsg, sessionKey);
			uni.setStorageSync(sessionKey, null);
			disp.on('em.xmpp.error.sendMsgErr', function(err) {
				curMsgMid = err.data.mid;
				isFail = true;
				return;
			});
			msgStorage.on('newChatMsg', function(renderableMsg, type, curChatMsg, sesskey) {
				me.curChatMsg = curChatMsg;
				if (!me.visibility) return;
				// 判断是否属于当前会话
				if (username.groupId) {
					// 群消息的 to 是 id，from 是 name
					if (renderableMsg.info.from == username.groupId || renderableMsg.info.to == username.groupId) {
						if (sesskey == sessionKey) {
							me.renderMsg(renderableMsg, type, curChatMsg, sessionKey, 'newMsg');
						}
					}
				} else if (renderableMsg.info.from == username.your || renderableMsg.info.to == username.your) {
					if (sesskey == sessionKey) {
						me.renderMsg(renderableMsg, type, curChatMsg, sessionKey, 'newMsg');
					}
				}
			});
		},

		previewImage(event) {
			var url = event.target.dataset.url;
			uni.previewImage({
				urls: [url] // 需要预览的图片 http 链接列表
			});
		},
		refresh(e) {
			console.log(e);
		},
		scroll(e) {
			if (e.target.scrollTop === 0 || e.target.scrollTop < 5) {
				this.getHistoryMsg();
			}
		},
		getHistoryMsg() {
			if (isHis) {
				return false;
			}
			isHis = true;
			let me = this;
			let username = this.username;
			let myUsername = uni.getStorageSync('myUsername');
			let sessionKey = username.groupId ? username.groupId + myUsername : username.your + myUsername;
			let historyChatMsgs = uni.getStorageSync('rendered_' + sessionKey) || [];
			if (Index < historyChatMsgs.length) {
				this.$helper.loading('加载更多消息', true);
				let timesMsgList = historyChatMsgs.slice(-Index - 10, -Index);
				this.historyChatMsg = timesMsgList;
				this.$nextTick(() => {
					// 获取历史消息的高度
					let Query = uni.createSelectorQuery().in(this);
					Query.select('#historyMsg').boundingClientRect();
					Query.exec(res => {
						this.chatMsg = this.historyChatMsg.concat(me.chatMsg);
						Index += timesMsgList.length;
						if (timesMsgList.length == 10) {
							page++;
						}
						this.scrollTop = res[0].height;
						setTimeout(() => {
							uni.hideLoading();
						}, 500);
						isHis = false;
					});
				});
			}
		},
		renderMsg(renderableMsg, type, curChatMsg, sessionKey, isnew) {
			let me = this;
			if (curChatMsg.length > 1) {
				this.chatMsg.map(function(elem, index) {
					curChatMsg.map(function(item, i) {
						if (elem.mid == item.mid) {
							curChatMsg.splice(i, 1);
						}
					});
				});
			}
			// 处理是否存在发送失败信息
			let fail_msgId = uni.getStorageSync('fail_msgId');
			if (fail_msgId) {
				curChatMsg.map(function(item, i) {
					if (item.mid.indexOf(fail_msgId) >= 0) {
						item.isFail = true;
						uni.removeStorageSync('fail_msgId');
					}
				});
			}
			var historyChatMsgs = uni.getStorageSync('rendered_' + sessionKey) || [];
			historyChatMsgs = historyChatMsgs.concat(curChatMsg);

			// console.log('当前历史',renderableMsg)
			// console.log('历史消息', historyChatMsgs);
			if (!historyChatMsgs.length) return;
			if (isnew == 'newMsg') {
				// 删除发送失败的新消息
				me.chatMsg.map(function(elem, index) {
					curChatMsg.map(function(item, i) {
						if (elem.mid == item.mid && elem.isFail) {
							me.chatMsg.splice(index, 1);
						}
					});
				});
				historyChatMsgs.map(function(elem, index) {
					curChatMsg.map(function(item, i) {
						if (elem.mid == item.mid && elem.isFail) {
							historyChatMsgs.splice(index, 1);
						}
					});
				});
				this.chatMsg = this.chatMsg.concat(curChatMsg);
				this.$nextTick(() => {
					this.getScrollHeight(110);
				});
			} else {
				this.chatMsg = historyChatMsgs.slice(-10);
				this.$nextTick(() => {
					this.getScrollHeight(110);
				});
			}
			uni.setStorageSync('rendered_' + sessionKey, historyChatMsgs);
			let chatMsg = uni.getStorageSync(sessionKey) || [];
			chatMsg.map(function(item, index) {
				curChatMsg.map(function(item2, index2) {
					if (item2.mid == item.mid) {
						chatMsg.splice(index, 1);
					}
				});
			});
			uni.setStorageSync(sessionKey, chatMsg);
			Index = historyChatMsgs.slice(-10).length;
			if (isFail) {
				this.renderFail(sessionKey);
			}
		},
		renderFail(sessionKey) {
			let me = this;
			let msgList = me.chatMsg;
			msgList.map(item => {
				if (item.mid.substring(item.mid.length - 10) == curMsgMid.substring(curMsgMid.length - 10)) {
					item.msg.data[0].isFail = true;
					item.isFail = true;
					me.chatMsg = msgList;
				}
			});
			if (me.curChatMsg[0].mid == curMsgMid) {
				me.curChatMsg[0].msg.data[0].isShow = false;
				me.curChatMsg[0].isShow = false;
			}
			uni.setStorageSync('rendered_' + sessionKey, msgList);
			isFail = false;
		},
		hideDrawer() {
			this.$emit('hideDrawer');
		},
		againSend(msgData) {
			let type, id;
			for (let key in msgType) {
				if (msgData.mid.indexOf(msgType[key]) >= 0) {
					type = msgType[key];
					id = msgData.mid.replace(type, '');
				}
			}
			if (type === msgType.TEXT || type === msgType.EMOJI) {
				this.againSend_msg(msgData, type, id);
			} else if (type === msgType.AUDIO) {
				this.againSend_audio(msgData, type, id);
			} else if (type === msgType.IMAGE) {
				this.againSend_img(msgData, type, id);
			}
		}
	}
};
</script>
<style lang="scss" scoped>
.historyMsg {
	position: fixed;
	left: -100%;
	top: 0;
}
// .lg-scroll {
// 	position: absolute;
// 	top: 0;
// 	bottom: 110rpx;
// }
.lg-msg-list {
	padding: 20rpx;
	box-sizing: border-box;
	.lg-msg-item {
		width: 100%;
		margin-bottom: 40rpx;
		display: flex;
		&:last-child {
			margin-bottom: 0;
		}
		// 消息样式-我的
		&.lg-msg-my {
			display: flex;
			justify-content: flex-end;
			.lg-msg-avatar {
				order: 1;
				margin-left: 20rpx;
			}
			.lg-msg-box {
				.lg-msg-nick {
					justify-content: flex-end;
					margin-right: 20rpx;
					margin-left: 0;
					.nick-text {
						order: 1;
						margin-left: 20rpx;
						margin-right: 0;
					}
				}
				.lg-msg-content {
					order: 0;
					display: inline-flex;
					justify-content: flex-end;
					align-items: center;
					.lg-msg-info {
						color: #ffffff;
						background-color: #81d4d5;
						margin-right: 20rpx;
					}
				}
			}
		}
		// 头像
		.lg-msg-avatar {
			width: 80rpx;
			height: 80rpx;
			order: 0;
			margin-right: 20rpx;
			.avatar-img {
				width: 100%;
				height: 100%;
				border-radius: 50%;
			}
		}
		.lg-msg-box {
			display: flex;
			flex-direction: column;
			.lg-msg-nick {
				color: #888888;
				font-size: 20rpx;
				line-height: 40rpx;
				margin-left: 20rpx;
				margin-right: 0;
				display: flex;
				justify-content: flex-start;
				align-items: center;
				.nick-text {
					margin-right: 20rpx;
				}
				.time-text {
				}
			}
			// 消息内容
			.lg-msg-content {
				order: 1;
				display: inline-flex;
				justify-content: flex-start;
				align-items: center;
				position: relative;
				.lg-otherSJ {
					width: 20rpx;
					height: 21rpx;
					position: absolute;
					left: 0;
					top: 10rpx;
				}
				.lg-mySJ {
					width: 22rpx;
					height: 23rpx;
					position: absolute;
					right: 0;
					top: 10rpx;
				}
				.lg-msg-info {
					font-size: 24rpx;
					line-height: 40rpx;
					display: inline-block;
					padding: 10rpx 24rpx;
					max-width: 400rpx;
					border-radius: 5rpx;
					color: #141414;
					background-color: #ffffff;
					margin-left: 20rpx;
					.msg-emoji {
						display: inline-block;
						vertical-align: bottom;
						width: 48rpx;
						height: 48rpx;
					}
					.msg-text {
						word-wrap: break-word;
						line-height: 46rpx;
						font-size: 30rpx;
					}
				}
				.lg-msg-img {
					width: 350rpx;
					height: 350rpx;
					border-radius: 10rpx;
					overflow: hidden;
					.msg-img {
						width: 100%;
						height: 100%;
					}
				}
				.lg-msg-form {
					background-color: #fff;
					border-radius: 10rpx;
					max-width: 400rpx;
					.lg-msg-form-nav {
						padding: 10rpx 20rpx;
						border-radius: 10rpx;
						.lg-msg-form-title {
							color: #333;
							font-size: 24rpx;
							line-height: 36rpx;
						}
						.lg-msg-form-intro {
							color: #999;
							font-size: 20rpx;
							line-height: 30rpx;
						}
					}
				}
			}
		}
	}
}
</style>
<style>
/*.chat-bg{
		position:fixed;
		width: 100%;
		height: 100%;
		z-index: 0;
		top: 50px;
	}*/
.scroll_view,
.scroll_view_change {
	/*width: 100%;
		position: absolute;
		left: 0;
		top: 0;
		right: 0;
		bottom: 150rpx;*/
	/* margin-bottom: 110rpx; */
	overflow: scroll;
	height: calc(100% - 110rpx);
	background-color: #f4f4f4;
}

.scroll_view_X,
.scroll_view_change_X {
	margin-bottom: 244rpx;
}

.scroll_view_change {
	/*bottom: 440rpx;*/
	height: calc(100% - 380rpx);
	/* margin-bottom: 380rpx; */
}

.message {
	width: 92%;
	height: auto;
	padding: 0 30rpx;
	position: relative;
}

.time {
	margin: 14rpx 0;
	text-align: center;
}

.time .time-text {
	display: inline-block;
	padding: 6rpx 20rpx 0 20rpx;
	font-size: 24rpx;
	color: #fff;
	line-height: 28rpx;
	border-radius: 4rpx;
	background-color: #dcdcdc;
}

.user .user-text {
	margin: auto 100rpx 8rpx;
	font-size: 20rpx;
	color: #dcdcdc;
	display: block;
}

.avatar {
	width: 72rpx;
	height: 72rpx;
	margin: 0 20rpx 0 0;
	border-radius: 6rpx;
	float: left;
}

.msg {
	display: inline-block;
	padding: 20rpx;
	max-width: calc(85% - 80rpx);
	min-height: 40rpx;
	font-size: 24rpx;
	/*overflow: hidden;*/
	text-align: left;
	word-break: break-all;
	background-color: #fff;
	border-radius: 26rpx;
	position: relative;
	margin-top: 24rpx;
}

.msg .msg_poprightarrow {
	position: absolute;
	right: -10rpx;
	height: 18rpx;
	width: 18rpx;
	margin-top: -10rpx;
}

.msg .msg_popleftarrow {
	position: absolute;
	left: -14rpx;
	height: 18rpx;
	width: 18rpx;
	margin-top: -10rpx;
}

.msg .msg-text {
	line-height: 40rpx;
	font-size: 32rpx;
	margin: 0;
}

/*.msg:before {
		content: " ";
		position: absolute;
		top: 9px;
		right: 100%;
		border: 6px solid transparent;
		border-right-color: #EDEDED;
	}*/

.self {
	text-align: right;
}

.self .avatar {
	float: right;
	margin: 0 0 0 20rpx;
}

.user {
	position: relative;
	bottom: -30rpx;
}

.self .msg {
	background-color: #0873de;
	color: #fff;
}

.self .msg:before {
	right: inherit;
	left: 100%;
	border-right-color: transparent;
	border-left-color: #b2e281;
}

.template {
	display: inline;
}
.err {
	width: 32rpx;
	height: 32rpx;
	margin-right: 20rpx;
}
.hide {
	display: none;
}
.show {
	display: block;
}
</style>
