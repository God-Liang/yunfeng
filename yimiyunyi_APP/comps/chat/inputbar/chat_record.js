/* 
 * 语音聊天
 * H5 和支付宝小程序不支持录音
 */
let msgType = require('../msgtype');
export default {
	data() {
		return {
			isRecord: false, // 是否使用录音
			recording: false, // 是否正在录音
			willStop: false, // 是否准备停止录音
			recordBtnTitle: '按住 说话', // 按钮内容
			recordPoppupTitle: '手指上滑 取消发送', // 弹框内容
			// #ifndef H5 || MP-ALIPAY
			RECORDER: uni.getRecorderManager(),
			// #endif
			initPoint: {
				identifier: 0,
				Y: 0
			},
			recordTimer: null, // 录音记时器
			recordLength: 0, // 录音时长
			voicePath: ''
		}
	},
	created(e) {
		// #ifndef H5 || MP-ALIPAY
		//录音开始事件
		this.RECORDER.onStart((e) => {
			console.log('start')
			this.recordLimit(e);
		})
		//录音结束事件
		this.RECORDER.onStop((e) => {
			this.recordFinish(e);
		})
		// #endif
	},
	methods: {
		// #ifndef H5 || MP-ALIPAY
		// 录音开始
		recordBegin(e) {
			// 单手触摸
			if (e.touches.length === 1) {
				this.initPoint.Y = e.touches[0].clientY;
				this.initPoint.identifier = e.touches[0].identifier;
				this.RECORDER.start({
					format: 'mp3'
				}); //开始
			} else {
				return false
			}
		},
		// 录音中
		recordIng(e) {
			if (!this.recording) {
				return false
			}
			let touche = e.touches[0];
			if (this.initPoint.Y - touche.clientY >= uni.upx2px(110)) {
				this.willStop = true;
				this.recordPoppupTitle = '松开手指 取消发送'
			} else {
				this.willStop = false;
				this.recordPoppupTitle = '手指上滑 取消发送'
			}
		},
		// 录音终止
		recordEnd(e) {
			if (!this.recording) {
				return false
			}
			this.recording = false;
			this.recordBtnTitle = '按住 说话';
			this.recordPoppupTitle = '手指上滑 取消发送'
			this.RECORDER.stop(); //录音结束
		},
		// 录音取消
		recordCancel(e) {
			this.recording = false;
			this.recordBtnTitle = '按住 说话';
			this.recordPoppupTitle = '手指上滑 取消发送'
			this.willStop = true; //不发送录音
			this.RECORDER.stop(); //录音结束
		},
		// 处理录音时间限制
		recordLimit(e) {
			this.recording = true;
			this.recordBtnTitle = '松开 结束';
			this.recordLength = 1;
			this.recordTimer = setInterval(() => {
				if (this.recordLength > 60) {
					this.recording = false;
					this.recordBtnTitle = '最大录音60秒';
				}
				this.recordLength++;
			}, 1000)
		},
		// 处理录音结束
		recordFinish(e) {
			clearInterval(this.recordTimer);
			if (!this.willStop) {
				this.voicePath = e.tempFilePath
				this.sendRecord(e.tempFilePath,this.recordLength);
			} else {
				console.log('取消发送录音');
			}
			this.willStop = false;
		},
		// 发送录音
		sendRecord(tempFilePath, dur) {
			console.log(this.myInfo)
			var str = this.$im.config.appkey.split('#');
			var me = this;
			var token = this.$im.conn.context.accessToken;
			uni.uploadFile({
				url: 'https://a1.easemob.com/' + str[0] + '/' + str[1] + '/chatfiles',
				filePath: tempFilePath,
				name: 'file',
				header: {
					'Content-Type': 'multipart/form-data',
					Authorization: 'Bearer ' + token
				},
				success(res) {
					// 发送 xmpp 消息
					var id = me.$im.conn.getUniqueId();
					var msg = new me.$im.message(msgType.AUDIO, id);
					var dataObj = JSON.parse(res.data);
					// 接收消息对象
					msg.set({
						apiUrl: me.$im.config.apiURL,
						accessToken: token,
						body: {
							type: msgType.AUDIO,
							url: dataObj.uri + '/' + dataObj.entities[0].uuid,
							filetype: '',
							filename: tempFilePath,
							accessToken: token,
							length: dur
						},
						ext: {
							nick: me.myInfo.nick,
							sex: me.myInfo.sex,
							avatar: me.myInfo.avatar
						},
						from: me.username.myName,
						to: me.username.groupId,
						roomType: false,
						chatType: me.chatType,
						success: function(argument) {
							disp.fire('em.chat.sendSuccess', id);
						}
					});
					if (me.chatType == msgType.chatType.CHAT_ROOM) {
						msg.setGroup('groupchat');
					}
		
					msg.body.length = dur;
		
					//console.log('发送的语音消息', msg.body)
					me.$im.conn.send(msg.body);
					uni.$emit('saveSendMsg', {
						msg: msg,
						type: msgType.AUDIO
					});
				}
			});
		},
		// #endif
	}
}
