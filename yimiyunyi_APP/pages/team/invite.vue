<template>
	<view class="lg-container">
		<uni-nav-bar left-icon="back" title="邀请" @clickLeft="onLeftTap"></uni-nav-bar>
		<uni-list>
			<uni-list-item thumb="/static/team/invite_qrcode.png" :thumbStyle="{width: '36rpx', height: '35rpx', display: 'block'}" title="二维码邀请" note="通过分享二维码邀请团队成员" @click="onJump('/pages/team/invite_qrcode')"></uni-list-item>
			<!-- <uni-list-item thumb="/static/team/invite_wx.png" :thumbStyle="{width: '40rpx', height: '33rpx', display: 'block'}" title="微信邀请" note="通过微信链接邀请团队成员"></uni-list-item> -->
			<uni-list-item thumb="/static/team/invite_hos.png" :thumbStyle="{width: '38rpx', height: '38rpx', display: 'block'}" title="依米云医内邀请" note="邀请院内的用户" @click="onJump('/pages/team/invite_hos')"></uni-list-item>
		</uni-list>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			onLeftTap() {
				uni.navigateBack({ delta: 1 });
			},
			onJump(url) {
				this.$helper.to(url)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.lg-container {
		
	}
</style>
