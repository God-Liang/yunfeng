<template>
	<view class="lg-container">
		<uni-nav-bar left-icon="back" right-text="保存" title="设置我的简介" @clickLeft="onLeftTap" @clickRight="onRightTap"></uni-nav-bar>
		<view class="amend-container">
			<textarea
				class="textarea-class"
				:maxlength="250"
				placeholder="请输入我的简介"
				placeholder-class="placeholderStyle"
				focus
				:selection-start="-1000"
				:selection-end="-1000"
				:value="introduction"
				@input="onKeyInput"
			></textarea>
			<view class="word_count">
				<text>{{ introduction.length || 0 }}</text>
				<text>/</text>
				<text>250</text>
			</view>
		</view>
	</view>
</template>

<script>
import { mapGetters } from 'vuex';
import { getInfo, updateInfo } from '@/api/mine';
export default {
	data() {
		return {
			introduction: ''
		};
	},
	computed: {
		...mapGetters(['myInfo'])
	},
	onLoad: function(option) {
		if (option.introduction) {
			this.introduction = option.introduction
		}
	},
	methods: {
		onKeyInput(event) {
			this.introduction = event.target.value;
		},
		onLeftTap() {
			uni.navigateBack({ delta: 1 });
		},
		onRightTap() {
			if (this.introduction.replace(/\s+/g, '') === '') {
				uni.showModal({
					title: '提示',
					showCancel: false,
					confirmColor: '#03A9AC',
					content: '没有输入我的简介，请重新填写',
					success: function(res) {
						if (res.confirm) {
						}
					}
				});
				return false;
			}
			this.$helper.loading('正在保存')
			let data = {
				id: this.myInfo.id,
				doctor: {
					introduction: this.introduction
				}
			};
			updateInfo(data, res => {
				setTimeout(() => {
					uni.navigateBack({ delta: 1 });
				}, 1000);
			});
		},
		getInfo() {
			getInfo(this.myInfo.id, res => {
				if (res.data.info) {
					this.introduction = res.data.info.doctor.introduction
				}
			});
		},
		onClear() {
			this.introduction = '';
		}
	}
};
</script>

<style lang="scss">
.lg-container {
	width: 100vw;
	min-height: 100vh;
	background-color: #f4f4f4;
	.amend-container {
		width: 100%;
		height: 300rpx;
		background: rgba(255, 255, 255, 1);
		box-sizing: border-box;
		padding: 20rpx 40rpx 60rpx;
		position: relative;
		.textarea-class {
			width: 100%;
			height: 100%;
			color: #333333;
		}
		.placeholderStyle {
			color: #999999;
			font-size: 26rpx;
		}
		.clear-container {
			position: absolute;
			right: 40rpx;
			top: 50%;
			width: 38rpx;
			height: 38rpx;
			transform: translateY(-50%);
			image {
				width: 38rpx;
				height: 38rpx;
			}
		}
		.word_count {
			text-align: right;
			text {
				color: #FF0000;
				font-size: 30rpx;
			}
		}
	}
}
</style>
