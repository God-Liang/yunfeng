<template>
	<canvas :style="{'width': width+'rpx', 'height': height+'rpx'}" :canvas-id="canvasId" :id="canvasId"></canvas>
</template>

<script>
import uCharts from './u-charts.js';
var _self;
var canvases = {};
export default {
	props: {
		width: {
			default: 100
		},
		height: {
			default: 100
		},
		fontSize: {
			default: 28
		},
		arcbarWidth: {
			default: 10
		},
		canvasId: {
			type: String,
			default: 'u-canvas',
		},
		chartData: {
			type: Object,
			default () {
				return {
					series: [
						{
							name: '',
							data: 0.29,
							color: '#FFBB3F'
						}
					]
				}
			}
		},
		watchNo: {
			type: Number,
			default: 0,
		}
	},
	watch: {
		watchNo(newValue, oldValue) {
			this.showArcbar();
		}
	},
	mounted() {
		this.cWidth = uni.upx2px(this.width); //这里要与样式的宽高对应
		this.cHeight = uni.upx2px(this.height); //这里要与样式的宽高对应
		this.cArcbarWidth = uni.upx2px(this.arcbarWidth);
		this.cfontSize = uni.upx2px(this.fontSize);
		this.showArcbar();
	},
	data() {
		return {
			cWidth: 0, //圆弧进度图
			cHeight: 0, //圆弧进度图
			cArcbarWidth: 0, //圆弧进度图，进度条宽度,此设置可使各端宽度一致
			cfontSize: 0,
			pixelRatio: 1
		};
	},
	methods: {
		showArcbar() {
			_self = this;
			canvases[this.canvasId] = new uCharts({
				$this: _self,
				canvasId: _self.canvasId,
				type: 'arcbar',
				fontSize: 11,
				legend: { show: false },
				background: '#FFFFFF',
				pixelRatio: _self.pixelRatio,
				series: _self.chartData.series,
				animation: false,
				width: _self.cWidth * _self.pixelRatio,
				height: _self.cHeight * _self.pixelRatio,
				dataLabel: true,
				title: {
					name: Math.round(_self.chartData.series[0].data * 100) + '%', //这里我自动计算了，您可以直接给任意字符串
					color: _self.chartData.series[0].color,
					fontSize: _self.cfontSize * _self.pixelRatio
				},
				subtitle: {
					name: _self.chartData.series[0].name, //这里您可以直接给任意字符串
					color: '#666666',
					fontSize: _self.cfontSize * _self.pixelRatio
				},
				extra: {
					arcbar: {
						type: 'circle', //整圆类型进度条图
						width: _self.cArcbarWidth * _self.pixelRatio, //圆弧的宽度
						startAngle: 0.5 //整圆类型只需配置起始角度即可
					}
				}
			});
		}
	}
};
</script>
