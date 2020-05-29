<template>
	<view class="chatbox">
		<view class="main">
			<chat-suit-audio ref="audio" :username="username" :chatType="chatType" @newAudioMsg="saveSendMsg"></chat-suit-audio>
			<chat-msglist ref="msglist" :username="username" @hideDrawer="hideDrawer"></chat-msglist>
		</view>
		<chat-inputbar
			ref="inputbar"
			:username="username"
			:chatType="chatType"
			@newTextMsg="saveSendMsg"
			@newImageMsg="saveSendMsg"
			@newLocationMsg="saveSendMsg"
			@newVideoMsg="saveSendMsg"
			@tapSendAudio="toggleRecordModal"
			@hideMore="hideMore"
			@showMore="showMore"
		></chat-inputbar>
	</view>
</template>

<script>
import chatMsglist from '@/comps/chat/msglist/msglist.vue';
import chatInputbar from '@/comps/chat/inputbar/inputbar.vue';
import chatSuitAudio from '@/comps/chat/inputbar/suit/audio/audio.vue';

let msgStorage = require('./msgstorage');
let msgType = require('./msgtype');
export default {
	components: {
		chatMsglist,
		chatInputbar,
		chatSuitAudio
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
		return {};
	},
	created() {
		uni.$on('saveSendMsg', data => {
			this.saveSendMsg(data);
		});
	},
	beforeDestroy() {
		uni.$off('saveSendMsg');
	},

	onReady() {},
	methods: {
		// 打开更多操作/表情包处理消息列表
		showMore() {
			console.log('滚动更多')
			this.$refs.msglist.getScrollHeight(390);
		},
		// 关闭更多操作/表情包时处理消息列表
		hideMore() {
			this.$refs.msglist.getScrollHeight(110);
		},
		// 打开录音
		toggleRecordModal() {
			this.$refs.audio.toggleRecordModal();
		},
		// 发送消息缓存
		saveSendMsg(data) {
			msgStorage.saveMsg(data.msg, data.type);
		},
		// 下拉获取历史消息
		getMore() {
			this.$refs.msglist.getHistoryMsg();
		},
		// 点击消息列表关闭更多操作/表情包
		hideDrawer() {
			if (this.$refs.inputbar.popupLayerClass !== '') {
				this.$refs.inputbar.hideDrawer();
			}
		}
	}
};
</script>

<style lang="scss" scoped>
	.chatbox {
		height: 100%;
		background-color: #f4f4f4;
		.main {
			width: 100%;
			height: 100%;
		}
	}
</style>
