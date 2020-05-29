<template>
	<view class="lg-container">
		<web-view class="detail" :webview-styles="webviewStyles" :src="src"></web-view>
	</view>
</template>

<script>
import { read } from '@/api/common';
export default {
	onLoad(options) {
		this.isPlan = parseInt(options.isPlan);
		this.id = options.id;
		this.src = 'http://wx-patient-test.hnasa.cn/lookForm?id=' + options.id + '&isPlan=' + options.isPlan;
	},
	data() {
		return {
			src: '',
			isPlan: null,
			id: null,
			webviewStyles: {
				progress: {}
			}
		};
	},
	onShow() {
		if (this.isPlan === 0) {
			this.getSolution();
		} else {
			this.getPlan();
		}
	},
	methods: {
		onLeftTap() {
			uni.navigateBack({ delta: 1 });
		},
		getPlan() {
			read('AppPlanNodeItem', this.id, res => {
				if (res.data.info.type === 1) {
					uni.setNavigationBarTitle({
						title: '量表详情'
					});
				} else {
					uni.setNavigationBarTitle({
						title: '宣教详情'
					});
				}
			});
		},
		getSolution() {
			read('AppFollowupSolutionNodeItem', this.id, res => {
				if (res.data.info.type === 1) {
					uni.setNavigationBarTitle({
						title: '量表详情'
					});
				} else {
					uni.setNavigationBarTitle({
						title: '宣教详情'
					});
				}
			});
		}
	}
};
</script>
