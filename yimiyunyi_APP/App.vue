<script>
require('sdk/libs/strophe');
let msgStorage = require('comps/chat/msgstorage');
let msgType = require('comps/chat/msgtype');
let disp = require('utils/broadcast');
let logout = false;
let is_reconnect = false;
export default {
	globalData: {
		unReadMessageNum: 0,
		userInfo: null,
		saveFriendList: [],
		saveGroupInvitedList: [],
		groupList: [],
		isIPX: false //是否为iphone X
	},
	onLaunch: function() {
		var me = this;
		var logs = uni.getStorageSync('logs') || [];
		logs.unshift(Date.now());
		uni.setStorageSync('logs', logs);

		disp.on('em.main.ready', function() {
			me.calcUnReadSpot();
		});
		//离开chatroom
		disp.on('em.chatroom.leave', function() {
			console.log('em.chatroom.leave');
			me.calcUnReadSpot();
		});
		disp.on('em.chat.session.remove', function() {
			me.calcUnReadSpot();
		});
		disp.on('em.chat.audio.fileLoaded', function() {
			me.calcUnReadSpot();
		});

		disp.on('em.main.deleteFriend', function() {
			me.calcUnReadSpot();
		});
		disp.on('em.chat.audio.fileLoaded', function() {
			me.calcUnReadSpot();
		});

		this.$im.conn.listen({
			onOpened: message => {
				this.$im.conn.setPresence();
				console.log('登录成功');
				message.accessToken && uni.setStorageSync('myToken', message.accessToken);
				if (is_reconnect) {
					uni.hideToast();
					this.$helper.toast('none', '登陆成功');
					is_reconnect = false;
				}
				if (this.getCurrentRoute() == 'pages/login/index' || this.getCurrentRoute() == 'pages/register/index') {
					this.onLoginSuccess();
				}
				if (this.getCurrentRoute() == 'pages/components/notNetwork') {
					uni.navigateBack({ delta: 1 });
				}
			},
			onReconnect: () => {
				this.$helper.loading('重连中', true);
			},
			onSocketConnected: () => {
				if (uni.getStorageSync('errNum')) {
					this.$helper.toast('none', '网络连接成功', 2000);
					uni.removeStorageSync('errNum')
				} else {
					this.$helper.toast('none', '登录成功', 2000);
				}
			},
			onClosed: () => {
				this.$helper.toast('none', '网络已断开', 2000);
				this.$conn.closed = true;
				this.$im.conn.close();
			},
			onInviteMessage: message => {
				getApp().globalData.saveGroupInvitedList.push(message);
				disp.fire('em.xmpp.invite.joingroup', message);
			},
			onPresence: message => {
				console.log('onPresence', message);
				switch (message.type) {
					case 'unsubscribe':
						// pages[0].moveFriend(message);
						break;
					// 好友邀请列表
					case 'subscribe':
						if (message.status === '[resp:true]') {
							return;
						} else {
							// pages[0].handleFriendMsg(message);
							for (let i = 0; i < getApp().globalData.saveFriendList.length; i++) {
								if (getApp().globalData.saveFriendList[i].from === message.from) {
									getApp().globalData.saveFriendList[i] = message;
									disp.fire('em.xmpp.subscribe');
									return;
								}
							}
							getApp().globalData.saveFriendList.push(message);
							console.log(JSON.stringify(getApp().globalData.saveFriendList));
							disp.fire('em.xmpp.subscribe');
						}
						break;
					case 'subscribed':
						uni.showToast({
							title: '添加成功',
							duration: 1000
						});
						disp.fire('em.xmpp.subscribed');
						break;
					case 'unsubscribed':
						uni.showToast({
							title: '已拒绝',
							duration: 1000
						});
						break;
					case 'memberJoinPublicGroupSuccess':
						// this.$helper.toast('none', '已进群', 1000);
						break;
					// 好友列表
					// case "subscribed":
					// 	let newFriendList = [];
					// 	for(let i = 0; i < me.$options.globalData.saveFriendList.length; i++){
					// 		if(me.$options.globalData.saveFriendList[i].from != message.from){
					// 			newFriendList.push(me.$options.globalData.saveFriendList[i]);
					// 		}
					// 	}
					// 	me.$options.globalData.saveFriendList = newFriendList;
					// 	break;
					// 删除好友
					case 'unavailable':
						disp.fire('em.xmpp.contacts.remove');
						disp.fire('em.xmpp.group.leaveGroup', message);
						break;

					case 'deleteGroupChat':
						disp.fire('em.xmpp.invite.deleteGroup', message);
						break;

					case 'leaveGroup':
						disp.fire('em.xmpp.group.leaveGroup', message);
						break;

					case 'removedFromGroup':
						disp.fire('em.xmpp.group.leaveGroup', message);
						break;
					// case "joinChatRoomSuccess":
					// 	uni.showToast({
					// 		title: "JoinChatRoomSuccess",
					// 	});
					// 	break;
					// case "memberJoinChatRoomSuccess":
					// 	uni.showToast({
					// 		title: "memberJoinChatRoomSuccess",
					// 	});
					// 	break;
					// case "memberLeaveChatRoomSuccess":
					// 	uni.showToast({
					// 		title: "leaveChatRoomSuccess",
					// 	});
					// 	break;

					default:
						break;
				}
			},

			onRoster: message => {
				// let pages = getCurrentPages();
				// if(pages[0]){
				// 	pages[0].onShow();
				// }
			},

			onVideoMessage: message => {
				console.log('onVideoMessage: ', message);
				if (message) {
					msgStorage.saveReceiveMsg(message, msgType.VIDEO);
				}
				this.calcUnReadSpot(message);
				this.ack(message);
			},

			onAudioMessage: message => {
				console.log('onAudioMessage', message);
				if (message) {
					if (this.onMessageError(message)) {
						msgStorage.saveReceiveMsg(message, msgType.AUDIO);
					}
					this.calcUnReadSpot(message);
					this.ack(message);
				}
			},

			onCmdMessage: message => {
				console.log('onCmdMessage', message);
				if (message) {
					if (this.onMessageError(message)) {
						msgStorage.saveReceiveMsg(message, msgType.CMD);
					}
					this.calcUnReadSpot(message);
					this.ack(message);
				}
			},

			// onLocationMessage: (message)=>{
			// 	console.log("Location message: ", message);
			// 	if(message){
			// 		msgStorage.saveReceiveMsg(message, msgType.LOCATION);
			// 	}
			// },

			onTextMessage: message => {
				console.log('onTextMessage', message);
				if (message) {
					if (this.onMessageError(message)) {
						msgStorage.saveReceiveMsg(message, msgType.TEXT);
					}
					this.calcUnReadSpot(message);
					this.ack(message);
				}
			},

			onEmojiMessage: message => {
				console.log('onEmojiMessage', message);
				if (message) {
					if (this.onMessageError(message)) {
						msgStorage.saveReceiveMsg(message, msgType.EMOJI);
					}
					this.calcUnReadSpot(message);
					this.ack(message);
				}
			},

			onPictureMessage: message => {
				console.log('onPictureMessage', message);
				if (message) {
					if (this.onMessageError(message)) {
						msgStorage.saveReceiveMsg(message, msgType.IMAGE);
					}
					this.calcUnReadSpot(message);
					this.ack(message);
				}
			},

			onFileMessage: message => {
				console.log('onFileMessage', message);
				if (message) {
					if (this.onMessageError(message)) {
						msgStorage.saveReceiveMsg(message, msgType.FILE);
					}
					this.calcUnReadSpot(message);
					this.ack(message);
				}
			},

			// 各种异常
			onError: error => {
				console.log(error);
				// 16: server-side close the websocket connection
				if (error.type == this.$im.statusCode.WEBIM_CONNCTION_DISCONNECTED && !logout) {
					if (this.$im.conn.autoReconnectNumTotal < this.$im.conn.autoReconnectNumMax) {
						return;
					}
					this.$helper.toast('none', '连接超时,请检查网络')
					return;
				}
				// 8: offline by multi login
				if (error.type == this.$im.statusCode.WEBIM_CONNCTION_SERVER_ERROR) {
					this.$helper.toast('none', '您的帐号已在其他地方登陆,请重新登陆')
					setTimeout(() => {
						uni.removeStorageSync('lg-token');
						uni.removeStorageSync('myToken');
						uni.removeStorageSync('myUsername');
						this.$helper.toNew('/pages/login/index')
					}, 2000);
				}
				if (error.type == this.$im.statusCode.WEBIM_CONNCTION_OPEN_ERROR) {
					disp.fire('em.xmpp.error.passwordErr');
					// uni.showModal({
					// 	title: "用户名或密码错误",
					// 	confirmText: "OK",
					// 	showCancel: false
					// });
				}
				if (error.type == this.$im.statusCode.WEBIM_CONNCTION_AUTH_ERROR) {
					disp.fire('em.xmpp.error.tokenErr');
				}
				if (error.type == 'socket_error') {
					///sendMsgError
					console.log('socket_errorsocket_error', error);
					this.$helper.toast('none', '网络已断开')
					disp.fire('em.xmpp.error.sendMsgErr', error);
				}
			}
		});
		// #ifdef H5
		if (!this.$im.conn.isOpened() && uni.getStorageSync('myToken') && uni.getStorageSync('myUsername')) {
			is_reconnect = true;
			this.$helper.loading('自动登陆中');
			//尝试使用token重新登陆
			this.$conn.open({
				apiUrl: this.$im.config.apiURL,
				user: uni.getStorageSync('myUsername'),
				accessToken: uni.getStorageSync('myToken'),
				appKey: this.$im.config.appkey
			});
		}
		// #endif
	},
	onShow() {
		console.log('App Show');
		// #ifndef H5 || MP-ALIPAY
		if (!this.$im.conn.isOpened() && uni.getStorageSync('myToken') && uni.getStorageSync('myUsername')) {
			is_reconnect = true;
			this.$helper.loading('自动登陆中');
			//尝试使用token重新登陆
			this.$conn.open({
				apiUrl: this.$im.config.apiURL,
				user: uni.getStorageSync('myUsername'),
				accessToken: uni.getStorageSync('myToken'),
				appKey: this.$im.config.appkey
			});
		}
		// #endif
	},
	onHide: function() {
		console.log('App Hide');
	},
	methods: {
		onLoginSuccess() {
			uni.hideToast();
			this.$helper.toTab('/pages/tabBar/message')
		},
		ack(receiveMsg) {
			// 处理未读消息回执
			var bodyId = receiveMsg.id; // 需要发送已读回执的消息id
			var ackMsg = new this.$im.message('read', this.$im.conn.getUniqueId());
			ackMsg.set({
				id: bodyId,
				to: receiveMsg.from
			});
			this.$im.conn.send(ackMsg.body);
		},

		onMessageError(err) {
			if (err.type === 'error') {
				this.$helper.toast('none', err.errorText)
				return false;
			}
			return true;
		},

		getCurrentRoute() {
			let pages = getCurrentPages();
			let currentPage = pages[pages.length - 1];
			return currentPage.route;
		},

		calcUnReadSpot(message) {
			let myName = uni.getStorageSync('myUsername');
			let members = uni.getStorageSync('member') || []; //好友
			var listGroups = uni.getStorageSync('listGroup') || []; //群组
			let allMembers = members.concat(listGroups);
			let count = allMembers.reduce(function(result, curMember, idx) {
				let chatMsgs;
				if (curMember.roomId) {
					chatMsgs = uni.getStorageSync(curMember.roomId + myName) || [];
				} else {
					chatMsgs = uni.getStorageSync(curMember.name.toLowerCase() + myName) || [];
				}
				return result + chatMsgs.length;
			}, 0);
			getApp().globalData.unReadMessageNum = count;
			disp.fire('em.xmpp.unreadspot', message);
		}
	}
};
</script>

<style lang="scss">
/*每个页面公共css */
@import '@/iconfont/iconfont.css';
@import '@/static/common/common.css';
/* 搜索 */
.search-container {
	width: 100vw;
	height: 104rpx;
	display: flex;
	background: linear-gradient(270deg, rgba(92, 204, 205, 1), rgba(3, 169, 172, 1));
	.input-container {
		background-color: #fff;
		border-radius: 10rpx;
		height: 60rpx;
		position: relative;

		.keyword-input {
			height: 60rpx;
			line-height: 60rpx;
			padding-left: 25rpx;
			width: 100%;
			box-sizing: border-box;
			color: #333333;
			font-size: 26rpx;
		}

		.placeholder-class {
			color: #d3d3d3;
			font-size: 26rpx;
		}

		.search-btn {
			width: 32rpx;
			height: 32rpx;
			position: absolute;
			right: 22rpx;
			top: 14rpx;
		}
	}
}
/* 公共列表样式 */
.lg_list {
	height: calc(100vh - 88rpx);
	// #ifndef H5
	height: calc(100vh - 136rpx);
	// #endif
	.lg_item {
		width: 100vw;
		padding: 30rpx 40rpx;
		display: flex;
		align-items: center;
		box-sizing: border-box;
		margin-bottom: 2rpx;
		background-color: #fff;
		&_img {
			&_img {
				width: 80rpx;
				height: 80rpx;
				border-radius: 50%;
				overflow: hidden;
				&.w110 {
					width: 110rpx;
					height: 110rpx;
				}
			}
		}
		&_box {
			flex: 1;
			margin-left: 40rpx;
			display: flex;
			flex-direction: column;
			justify-content: center;
			&.m0 {
				margin: 0;
			}
			&_name {
				font-size: 30rpx;
				color: #333333;
				margin: 6rpx 0;
				display: flex;
				align-items: center;
				&.mtb8{
					margin: 8rpx 0;
				}
				&_createName {
					width: 80rpx;
					height: 30rpx;
					line-height: 28rpx;
					font-size: 20rpx;
					color: #ffbb3f;
					border: 2rpx solid #ffbb3f;
					text-align: center;
					border-radius: 15rpx;
					margin-left: 20rpx;
				}
			}
			&_info {
				font-size: 24rpx;
				color: #888888;
				margin: 6rpx 0;
				&.mtb8{
					margin: 8rpx 0;
				}
				.ml20 {
					margin-left: 20rpx;
				}
			}
		}
		&_more {
			color: #888888;
			font-size: 24rpx;
		}
	}
}
/* 悬浮样式 */
.lg-hover {
	&:hover {
		background-color: #E5E5E5;
	}
	&:active {
		background-color: #E5E5E5;
	}
}

/* 图标样式 */
.lg-icon {
	color: #b9b9b9;
	font-size: 28rpx;
}
// 无团队样式
.empty-container {
		box-sizing: border-box;
		width: 100%;
		padding: 150rpx 40rpx;
		text-align: center;
		.empty-icon {
			width: 213rpx;
			height: 222rpx;
			margin-bottom: 20rpx;
		}
		.empty-tip {
			margin-top: 10rpx;
			font-size: 24rpx;
			color: gray;
		}
		.empty-btn {
			display: inline-block;
			margin-top: 40rpx;
			font-size: 28rpx;
			border-radius: 10rpx;
			width: 100%;
			background: #03a9ac;
			color: #fff;
			font-size: 26rpx;
			line-height: 80rpx;
		}
		.mt80 {
			margin-top: 80rpx;
		}
	}
</style>
