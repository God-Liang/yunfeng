<template>
	<input
		auto-height="true"
		class="f news"
		type="text"
		v-model="inputMessage"
		:cursor-spacing="65"
		confirm-type="send"
		:adjust-position="true"
		@confirm="sendMessage"
		@input="bindMessage"
		@tap="focus"
		@focus="focus"
		@blur="blur"
	/>
	<!-- <textarea auto-height="true" @input="bindMessage" @confirm="sendMessage" v-model="inputMessage" @focus="focus" /> -->
</template>

<script>
let msgType = require('../../../msgtype');
let disp = require('../../../../../utils/broadcast');
import { mapGetters } from 'vuex';

export default {
	components: {},
	computed: {
		...mapGetters(['myInfo'])
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
			inputMessage: '', // render input 的值
			userMessage: '' // input 的实时值
		};
	},
	created() {},

	onReady() {},
	methods: {
		focus() {
			this.$emit('inputFocused');
		},
		blur() {
			this.$emit('inputBlured');
		},
		isGroupChat() {
			return this.chatType == msgType.chatType.CHAT_ROOM;
		},
		getSendToParam() {
			return this.isGroupChat() ? this.username.groupId : this.username.your;
		},
		// bindinput 不能打冒号！
		bindMessage(e) {
			this.userMessage = e.detail.value;
			this.$emit('messageInput', this.userMessage);
		},
		emojiAction(emoji) {
			var str;
			var msglen = this.userMessage.length - 1;
			if (emoji && emoji != '[del]') {
				str = this.userMessage + emoji;
			} else if (emoji == '[del]') {
				let start = this.userMessage.lastIndexOf('[');
				let end = this.userMessage.lastIndexOf(']');
				let len = end - start;
				if (end != -1 && end == msglen && len >= 3 && len <= 4) {
					str = this.userMessage.slice(0, start);
				} else {
					str = this.userMessage.slice(0, msglen);
				}
			}
			(this.userMessage = str), (this.inputMessage = str);
			this.$emit('messageInput', this.userMessage);
		},
		sendMessage() {
			this.focus()
			let me = this;
			String.prototype.trim = function() {
				return this.replace(/(^\s*)|(\s*$)/g, '');
			};
			if (!this.userMessage.trim()) {
				return;
			}
			let id = this.$im.conn.getUniqueId();
			let msg = new this.$im.message(msgType.TEXT, id);
			msg.set({
				msg: this.userMessage,
				from: this.username.myName,
				to: this.getSendToParam(),
				roomType: false,
				chatType: this.chatType,
				ext: {
					nick: this.myInfo.nick,
					sex: this.myInfo.sex,
					avatar: this.myInfo.avatar
				},
				success(id, serverMsgId) {
					//console.log('成功了')
					disp.fire('em.chat.sendSuccess', id, me.userMessage);
				},
				fail(id, serverMsgId) {
					console.log('失败了');
				}
			});
			if (this.chatType == msgType.chatType.CHAT_ROOM) {
				msg.setGroup('groupchat');
			}
			try {
				this.$im.conn.send(msg.body);
			} catch (e) {
				console.log(e);
			}
			uni.$emit('saveSendMsg', {
				msg: msg,
				type: msgType.TEXT
			});
			this.userMessage = '';
			this.inputMessage = '';
			this.$emit('messageInput', this.userMessage);
		}
	}
};
</script>
