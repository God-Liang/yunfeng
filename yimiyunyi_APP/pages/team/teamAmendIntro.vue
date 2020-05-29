<template>
	<view class="lg-container">
		<uni-nav-bar left-icon="back" right-text="保存" :title="'设置' + editorObj[data.key]" @clickLeft="onLeftTap" @clickRight="onRightTap"></uni-nav-bar>
		<view class="amend-container">
			<textarea
				class="textarea-class"
				:maxlength="250"
				:placeholder="'请输入' + editorObj[data.key]"
				placeholder-class="placeholderStyle"
				focus
				:selection-start="-1000"
				:selection-end="-1000"
				:value="data.value"
				@input="onKeyInput"
			></textarea>
			<view class="word_count">
				<text>{{ data.value.length || 0 }}</text>
				<text>/</text>
				<text>250</text>
			</view>
		</view>
	</view>
</template>

<script>
import { mapGetters } from 'vuex';
import { createOrUpdate } from '@/api/common';
export default {
	data() {
		return {
			apiName: 'team',
			data: {
				key: '',
				value: ''
			},
			editorObj: {
				description: '团队说明',
				teamNote: '团队寄语'
			},
			teamId: ''
		};
	},
	onLoad: function(options) {
		for (const key in options) {
			this.data.key = key;
			this.data.value = options[key];
		}
	},
	computed: {
		...mapGetters(['myInfo'])
	},
	methods: {
		onKeyInput(event) {
			this.data.value = event.target.value;
		},
		onLeftTap() {
			uni.navigateBack({ delta: 1 });
		},
		onRightTap() {
			if (this.data.value.replace(/\s+/g, '') === '') {
				uni.showModal({
					title: '提示',
					showCancel: false,
					confirmColor: '#03A9AC',
					content: '没有输入' + this.editorObj[this.data.key] + '，请重新填写',
					success: function(res) {
						if (res.confirm) {
						}
					}
				});
				return false;
			}
			this.$helper.loading('正在保存')
			let data = {
				id: this.myInfo.doctor.doctorTeamId
			};
			data[this.data.key] = this.data.value;
			createOrUpdate(this.apiName, data, res => {
				const pages = getCurrentPages(); //当前页面栈
				if (pages.length > 1) {
					const beforePage = pages[pages.length - 2]; //获取上一个页面实例对象
					beforePage.$vm.getInfo(); //触发父页面中的方法change()
				}
				setTimeout(() => {
					uni.navigateBack({ delta: 1 });
				}, 1000);
			});
		},
		onClear() {
			this.data.value = '';
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
				color: #ff0000;
				font-size: 30rpx;
			}
		}
	}
}
</style>
