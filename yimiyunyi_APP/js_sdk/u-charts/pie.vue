<template>
	<canvas :style="{ width: width + 'rpx', height: height + 'rpx' }" :canvas-id="canvasId" :id="canvasId" @touchstart="touchPie"></canvas>
</template>

<script>
import uCharts from './u-charts.js';
var _self;
var canvaPie = null;
export default {
	props: {
		width: {
			default: 750
		},
		height: {
			default: 200
		},
		canvasId: {
			type: String,
			default: 'u-canvas'
		},
		chartData: {
			type: Object,
			default() {
				return {
					series: [
						{
							name: '一班',
							data: 50
						}
					]
				};
			}
		},
		watchNo: {
			type: Number,
			default: 0
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
		this.showArcbar();
	},
	data() {
		return {
			cWidth: '',
			cHeight: '',
			pixelRatio: 1
		};
	},
	methods: {
		showArcbar() {
			_self = this;
			canvaPie = new uCharts({
				$this: _self,
				canvasId: _self.canvasId,
				type: 'pie',
				fontSize: 11,
				legend: {
					show: true,
					position: 'right',
					padding: 0,
					lineHeight: 20,
					margin: 0
				},
				background: '#FFFFFF',
				pixelRatio: _self.pixelRatio,
				series: _self.chartData.series,
				animation: false,
				width: _self.cWidth * _self.pixelRatio,
				height: _self.cHeight * _self.pixelRatio,
				dataLabel: true,
				extra: {
					pie: {
						labelWidth: 1
					}
				}
			});
		},
		touchPie(e) {
			canvaPie.showToolTip(e, {
				format: function(item) {
					return item.name + ':' + item.data;
				}
			});
		}
	}
};
</script>
