/**
 * 重新发送消息
 */
let msgType = require('../msgtype');
import { mapGetters } from 'vuex';
export default {
	computed: {
		...mapGetters(['myInfo'])
	},
	methods: {
		// 处理表情包
		emojiFilter(data) {
			let emojiMsg = '';
			for (let key in this.emojiObj) {
				if (this.emojiObj[key] === data) {
					emojiMsg = key;
				}
			}
			return emojiMsg;
		},
		// 重新发送文字,表情消息
		againSend_msg(msgData, type, id) {
			let me = this;
			let msg = new this.$im.message(type, id);
			let message = '';
			msgData.msg.data.map(e => {
				if (e.type === 'txt') {
					message += e.data;
				} else if (e.type === 'emoji') {
					message += this.emojiFilter(e.data);
				}
			});
			msg.set({
				msg: message,
				from: msgData.yourname,
				to: msgData.username,
				roomType: false,
				chatType: msgData.chatType,
				ext: {
					nick: this.myInfo.nick,
					sex: this.myInfo.sex,
					avatar: this.myInfo.avatar
				},
				success(id, serverMsgId) {
					console.log('重新发送成功');
					disp.fire('em.chat.sendSuccess', id, message);
				},
				fail(id, serverMsgId) {
					console.log('失败了');
				}
			});
			if (msgData.chatType == msgType.chatType.CHAT_ROOM) {
				msg.setGroup('groupchat');
			}
			this.$im.conn.send(msg.body);
			uni.$emit('saveSendMsg', {
				msg: msg,
				type: msgType.TEXT
			});
		},
		// 重新发送图片消息
		againSend_img(msgData, type, id) {
			let me = this;
			let msg = new this.$im.message(type, id);
			var file = {
				type: msgType.IMAGE,
				size: msgData.msg.size,
				url: msgData.msg.data,
				filetype: msgData.msg.filetype,
				filename: msgData.msg.filename
			};
			msg.set({
				apiUrl: me.$im.config.apiURL,
				body: file,
				from: msgData.yourname,
				to: msgData.username,
				roomType: false,
				chatType: msgData.chatType,
				ext: {
					nick: this.myInfo.nick,
					sex: this.myInfo.sex,
					avatar: this.myInfo.avatar
				},
				success: function (argument) {
					console.log('重新发送成功')
					disp.fire('em.chat.sendSuccess', id);
				}
			});
			if(msgData.chatType == msgType.chatType.CHAT_ROOM){
				msg.setGroup("groupchat");
			}
			me.$im.conn.send(msg.body);
			uni.$emit('saveSendMsg', {
				msg: msg,
				type: msgType.IMAGE,
			})
		},
		// 重新发送语音消息
		againSend_audio(msgData, type, id) {
			let me = this;
			let msg = new this.$im.message(type, id);
			let token = this.$im.conn.context.accessToken;
			msg.set({
				apiUrl: me.$im.config.apiURL,
				accessToken: token,
				body: {
					type: msgType.AUDIO,
					url: msgData.msg.data,
					filetype: '',
					filename: msgData.msg.filename,
					accessToken: token,
					length: msgData.msg.length
				},
				ext: {
					nick: this.myInfo.nick,
					sex: this.myInfo.sex,
					avatar: this.myInfo.avatar
				},
				from: msgData.yourname,
				to: msgData.username,
				roomType: false,
				chatType: msgData.chatType,
				success: function(argument) {
					console.log('重新发送成功')
					disp.fire('em.chat.sendSuccess', id);
				}
			});
			if (msgData.chatType == msgType.chatType.CHAT_ROOM) {
				msg.setGroup('groupchat');
			}
					
			msg.body.length = msgData.msg.length;
				
			me.$im.conn.send(msg.body);
			uni.$emit('saveSendMsg', {
				msg: msg,
				type: msgType.AUDIO
			});
		}
	}
}