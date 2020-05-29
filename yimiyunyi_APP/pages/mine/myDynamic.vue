<template>
	<view class="lg-container">
		<uni-nav-bar left-icon="back" title="我的动态" @clickLeft="onLeftTap"></uni-nav-bar>
		<notOpen></notOpen>
	</view>
</template>

<script>
	import notOpen from '@/pages/components/notOpen.vue'
	export default {
		components: {
			notOpen
		},
		data() {
			return {
				
			};
		},
		methods: {
			onLeftTap() {
				uni.navigateBack({ delta: 1 });
			}
		}
	}
</script>

<style lang="scss">

</style>
