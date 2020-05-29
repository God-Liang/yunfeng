<template>
	<view class="lg-container">
		<uni-nav-bar left-icon="back" right-text="保存" :title="'设置' + editorObj[data.key]" @clickLeft="onLeftTap" @clickRight="onRightTap"></uni-nav-bar>
		<view class="amend-container">
			<input class="input-class" type="text" :value="data.value" focus @input="onKeyInput" />
			<view v-if="data.value.length > 0" class="clear-container" @tap="onClear"><image src="@/static/mine/clear.png" mode=""></image></view>
		</view>
	</view>
</template>

<script>
import { mapGetters } from 'vuex';
import { createOrUpdate } from '@/api/common';
import { teamVerify } from '@/api/team';
export default {
	data() {
		return {
			apiName: 'team',
			data: {
				key: '',
				value: ''
			},
			focus: true,
			editorObj: {
				name: '团队名称'
			}
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
			new Promise((resolve, reject) => {
				teamVerify(this.data.value, res => {
					if (res.data.info) {
						this.$helper.toast('none', '团队名称已被使用');
					} else {
						resolve();
					}
				});
			}).then(() => {
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
	height: 100vh;
	background-color: #f4f4f4;
	.amend-container {
		width: 100%;
		height: 100rpx;
		background: rgba(255, 255, 255, 1);
		padding: 0 40rpx;
		box-sizing: border-box;
		position: relative;
		.input-class {
			width: 100%;
			height: 100%;
			color: #333333;
			font-size: 26rpx;
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
	}
}
</style>
