<template>
	<view class="lg-container">
		<!-- <uni-nav-bar left-icon="back" :title="title" @clickLeft="onLeftTap"></uni-nav-bar> -->
		<chat ref="chat" :username="username" chatType="chatRoom"></chat>
	</view>
</template>

<script>
import chat from '@/comps/chat/chat.vue';
let disp = require('../../utils/broadcast');
export default {
	components: {
		chat
	},
	data() {
		return {
			username: {
				your: ''
			},
			title: ''
		};
	},
	onLoad(options) {
		if (options.username) {
			let username = JSON.parse(options.username);
			this.username = username;
			this.title = this.username.your;
		}
		uni.setNavigationBarTitle({
			title: this.title
		});
	},
	onUnload() {
		disp.fire('em.chatroom.leave');
	},
	methods: {
		onLeftTap() {
			uni.navigateBack({ delta: 1 });
		}
	}
};
</script>

<style lang="scss" scoped>
.lg-container {	
	height: calc(100vh - 44px);
	background-color: #f4f4f4;
}
</style>
