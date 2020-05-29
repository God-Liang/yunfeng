<template>
	<view class="lg-container">
		<uni-nav-bar left-icon="back" title="随访情况" @clickLeft="onLeftTap"></uni-nav-bar>
		<view class="statisticalBox">
			<view class="statisticalBox_title">团队成员随访患者分布：</view>
			<uRing canvasId="uRing1" :watchNo="watchNo" :chartData="chartData2" :allNum="allNum" :width="670" :height="500"></uRing>
		</view>
		<view class="statisticalBox">
			<view class="statisticalBox_title">随访量表情况：</view>
			<uPie canvasId="uPie1" :watchNo="watchNo" :chartData="chartData" :width="670" :height="400"></uPie>
		</view>
		<view class="statisticalBox">
			<view class="statisticalBox_title">
				<text>随访计划的情况：</text>
				<uni-combox class="selectBox" @input="onInput" :candidates="candidates" placeholder="请选择" v-model="type"></uni-combox>
			</view>
			<uCharts canvasId="uColumn" chartType="column" :max="max" :watchNo="watchNo" :cWidth="cWidth" :cHeight="cHeight" :opts="data"></uCharts>
		</view>
	</view>
</template>

<script>
import uPie from '@/js_sdk/u-charts/pie';
import uRing from '@/js_sdk/u-charts/ring';
import uCharts from '@/js_sdk/u-charts/component';
import { mapGetters } from 'vuex';
import { planStatistics, patientStatistics, templateStatistics } from '@/api/team';
export default {
	onLoad() {
		this.cWidth = uni.upx2px(670); //这里要与样式的宽高对应
		this.cHeight = uni.upx2px(400); //这里要与样式的宽高对应
	},
	computed: {
		...mapGetters(['myInfo'])
	},
	components: {
		uPie,
		uRing,
		uCharts
	},
	data() {
		return {
			cWidth: 0,
			cHeight: 0,
			max: 100,
			watchNo: 0,
			candidates: [
				{
					value: 1,
					label: '本周'
				},
				{
					value: 2,
					label: '本月'
				},
				{
					value: 3,
					label: '半年'
				}
			],
			type: 1,
			data: {
				categories: [],
				series: [
					{
						name: '成员计划数',
						data: [],
						color: '#FFBB3F',
						type: 'column'
					},
					{
						name: '团队平均数',
						data: [],
						type: 'line',
						style: 'curve',
						color: '#03A9AC'
					}
				]
			},
			chartData: {
				series: [
					{
						name: '已完成量表',
						data: 0,
						color: '#03A9AC'
					},
					{
						name: '未按时提交量表',
						data: 0,
						color: '#FFBB3F'
					},
					{
						name: '异常量表',
						data: 0,
						color: '#FE7735'
					}
				]
			},
			chartData2: {
				series: []
			},
			chartDataColor: ['#FFBB3F', '#AA89BD', '#00B7EE', '#F19EC2', '#FE7735'],
			allNum: 0
		};
	},
	onShow() {
		this.planStatistics();
		this.patientStatistics();
		this.templateStatistics();
	},
	methods: {
		onLeftTap() {
			uni.navigateBack({ delta: 1 });
		},
		// 随访计划
		planStatistics() {
			this.$helper.loading()
			planStatistics(this.myInfo.doctor.doctorTeamId, this.type, res => {
				uni.hideLoading()
				const data = res.data.info;
				const doctorArr = []
				const doctorNum = []
				const averageNum = []
				data.teamDoctorPlan.map(e => {
					doctorArr.push(e.doctorName)
					doctorNum.push(e.planSum)
					averageNum.push(data.planAvg)
				})
				this.data.categories = doctorArr
				this.data.series[0].data = doctorNum
				this.data.series[1].data = averageNum
				this.max = Math.max.apply(null, this.data.series[0].data) + 10;
				this.watchNo++
			})
		},
		// 团队成员随访患者分布
		patientStatistics() {
			patientStatistics(this.myInfo.doctor.doctorTeamId, res => {
				const data = res.data.info;
				this.allNum = data.patientSum
				const chartData2 = [];
				data.teamDoctor.map((e, i) => {
					chartData2.push({
						name: e.doctorName,
						data: e.doctorPatientSum,
						color: this.chartDataColor[i]
					});
				});
				this.chartData2.series = chartData2;
				if (data.restsPatientSum > 0) {
					this.chartData2.series.push({
						name: '其他',
						data:	data.restsPatientSum,
						color: '#FE7735'
					})
				}
				this.watchNo++
			})
		},
		// 随访量表情况
		templateStatistics() {
			templateStatistics(this.myInfo.doctor.doctorTeamId, res => {
				const data = res.data.info;
				this.chartData.series[0].data = parseInt(data.finishPage);
				this.chartData.series[1].data = parseInt(data.overTimePage);
				this.chartData.series[2].data = parseInt(data.errorPage);
				this.watchNo++
			})
		},
		onInput(val) {
			this.planStatistics()
		}
	}
};
</script>

<style lang="scss" scoped>
.lg-container {
	.statisticalBox {
		width: 710rpx;
		margin: 20rpx auto;
		background-color: #fff;
		padding: 15rpx;
		box-sizing: border-box;
		border-radius: 10rpx;
		.statisticalBox_title {
			display: flex;
			justify-content: space-between;
			align-items: center;
			height: 50rpx;
		}
		.selectBox {
			width: 160rpx;
			text-align: center;
		}
	}
}
</style>
