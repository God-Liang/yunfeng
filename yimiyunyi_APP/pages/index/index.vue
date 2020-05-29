<template>
	<view class="lg-container">
		<uni-nav-bar left-icon="back" title="首页" @clickLeft="onLeftTap"></uni-nav-bar>
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
			}
		}
	}
</script>

<style lang="scss" scoped>
	.lg-container {
		
	}
</style>
