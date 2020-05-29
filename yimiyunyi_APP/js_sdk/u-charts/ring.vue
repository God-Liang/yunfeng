<template>
	<canvas :style="{ width: width + 'rpx', height: height + 'rpx' }" :canvas-id="canvasId" :id="canvasId" @touchstart="touchRing"></canvas>
</template>

<script>
import uCharts from './u-charts.js';
var _self;
var canvaRing = null;
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
		allNum: {
			type: Number,
			default: 0
		},
		watchNo: {
			type: Number,
			default: 0
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
	watch: {
		watchNo(newValue, oldValue) {
			this.showArcbar();
		}
	},
	methods: {
		showArcbar() {
			_self = this;
			canvaRing=new uCharts({
				$this:_self,
				canvasId: _self.canvasId,
				type: 'ring',
				fontSize:11,
				padding:[5,5,5,5],
				legend:{
					show:true,
					float:'center',
					itemGap:10,
					padding:5,
					lineHeight:20,
					margin:5,
					// backgroundColor:'rgba(41,198,90,0.2)',
					// borderColor :'rgba(41,198,90,0.5)',
					borderWidth :4
				},
				background:'#FFFFFF',
				pixelRatio:_self.pixelRatio,
				series: _self.chartData.series,
				animation: false,
				width: _self.cWidth*_self.pixelRatio,
				height: _self.cHeight*_self.pixelRatio,
				disablePieStroke: true,
				dataLabel: true,
				subtitle: {
					name: '患者',
					color: '#888888',
					fontSize: 12*_self.pixelRatio,
				},
				title: {
					name: _self.allNum,
					color: '#333',
					fontSize: 16*_self.pixelRatio,
				},
				extra: {
					pie: {
					  offsetAngle: 0,
					  ringWidth: 30*_self.pixelRatio,
					  labelWidth: 16
					}
				},
			});
		},
		touchRing(e){
			canvaRing.touchLegend(e, {
				animation : false
			});
			canvaRing.showToolTip(e, {
				format: function (item) {
					return item.name + ':' + item.data 
				}
			});
		}
	}
};
</script>
