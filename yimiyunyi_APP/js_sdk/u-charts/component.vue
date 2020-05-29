<template>
	<canvas v-if="canvasId" :id="canvasId" :canvasId="canvasId" :style="{'width':cWidth*pixelRatio+'px','height':cHeight*pixelRatio+'px', 'transform': 'scale('+(1/pixelRatio)+')','margin-left':-cWidth*(pixelRatio-1)/2+'px','margin-top':-cHeight*(pixelRatio-1)/2+'px'}"
	 @touchstart="touchStart" @touchmove="touchMove" @touchend="touchEnd" @error="error">
	</canvas>
</template>

<script>
	import uCharts from './u-charts.js';
	var canvases = {};
	
	export default {
		props: {
			chartType: {
				required: true,
				type: String,
				default: 'column'
			},
			opts: {
				required: true,
				type: Object,
				default () {
					return null;
				},
			},
			canvasId: {
				type: String,
				default: 'u-canvas',
			},
			cWidth: {
				default: 375,
			},
			cHeight: {
				default: 250,
			},
			pixelRatio: {
				type: Number,
				default: 1,
			},
			max: {
				type: Number,
				default: 1000,
			},
			watchNo: {
				type: Number,
				default: 0,
			}
		},
		mounted() {
			this.init();
		},
		watch: {
			watchNo(newValue, oldValue) {
				this.init();
			}
		},
		methods: {
			init() {
				switch (this.chartType) {
					case 'column':
						this.initColumnChart();
						break;
					case 'line':
						this.initLineChart();
						break;
					default:
						break;
				}
			},
			initColumnChart() {
				canvases[this.canvasId] = new uCharts({
					$this: this,
					canvasId: this.canvasId,
					type: 'mix',
					fontSize: 11,
					legend: { 
						show: true,
						position: 'top'
					},
					dataLabel: false,
					dataPointShape: true,
					background: '#FFFFFF',
					pixelRatio: this.pixelRatio,
					categories: this.opts.categories,
					series: this.opts.series,
					animation: false,
					enableScroll: true,
					xAxis: {
						gridColor: '#F4F4F4',
						disableGrid:true,
						dashLength: 20,
						itemCount: 8,
						scrollShow: true
					},
					yAxis: {
						gridColor: '#F4F4F4',
						disableGrid: false,
						dashLength: 10,
						splitNumber: 5,
						axisLineColor: '#FFFFFF',
						min: 10,
						max: this.max,
						format: (val) => {
							return val.toFixed(0) >= 1000 ? val.toFixed(0) / 1000 + 'K' : val.toFixed(0)
						}
					},
					width: this.cWidth * this.pixelRatio,
					height: this.cHeight * this.pixelRatio,
					extra: {
						line: {
							type: 'straight'
						}
					}
				});
			},
			initLineChart() {
				canvases[this.canvasId] = new uCharts({
					$this: this,
					canvasId: this.canvasId,
					type: 'line',
					fontSize: 11,
					legend: {
						show: true,
						position: 'top'
					},
					dataLabel: true,
					dataPointShape: true,
					background: '#FFFFFF',
					pixelRatio: this.pixelRatio,
					categories: this.opts.categories,
					series: this.opts.series,
					animation: false,
					enableScroll: true,
					xAxis: {
						type: 'grid',
						gridColor: '#CCCCCC',
						gridType: 'dash',
						dashLength: 8,
						itemCount: 4,
						scrollShow: true
					},
					yAxis: {
						gridType: 'dash',
						gridColor: '#CCCCCC',
						dashLength: 8,
						splitNumber: 5,
						min: 10,
						max: this.max,
						format: (val) => {
							return val.toFixed(0) >= 1000 ? val.toFixed(0) / 1000 + 'K' : val.toFixed(0)
						}
					},
					width: this.cWidth * this.pixelRatio,
					height: this.cHeight * this.pixelRatio,
					extra: {
						line: {
							type: 'straight'
						}
					}
				});
			},
			// 这里仅作为示例传入两个参数，cid为canvas-id,newdata为更新的数据，需要更多参数请自行修改
			changeData(cid,newdata) {
				canvases[cid].updateData({
					series: newdata.series,
					categories: newdata.categories
				});
			},
			touchStart(e) {
				canvases[this.canvasId].showToolTip(e, {
					format: function(item, category) {
						return category + ' ' + item.name + ':' + item.data
					}
				});
				canvases[this.canvasId].scrollStart(e);
			},
			touchMove(e) {
				canvases[this.canvasId].scroll(e);
			},
			touchEnd(e) {
				canvases[this.canvasId].scrollEnd(e);
			},
			error(e) {
				console.log(e)
			}
		},
	};
</script>

<style scoped>
	.charts {
		width: 100%;
		height: 100%;
		flex: 1;
		background-color: #FFFFFF;
	}
</style>
