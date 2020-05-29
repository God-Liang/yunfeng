<template>
	<view class="lg-container">
		<uni-nav-bar left-icon="back" title="患者管理" @clickLeft="onLeftTap"></uni-nav-bar>
		<view class="statisticalBox">
			<view class="statisticalBox_title">患者情况:</view>
			<view class="statisticalBox_list">
				<view class="statisticalBox_item">
					<uCircle canvasId="uCircle1" :watchNo="watchNo" :chartData="chartData1" :width="120" :height="120" :fontSize="26"></uCircle>
					<text class="statisticalBox_item_label">0～18岁</text>
					<text class="statisticalBox_item_value">{{num1}}人</text>
				</view>
				<view class="statisticalBox_item">
					<uCircle canvasId="uCircle2" :watchNo="watchNo" :chartData="chartData2" :width="120" :height="120" :fontSize="26"></uCircle>
					<text class="statisticalBox_item_label">19～35岁</text>
					<text class="statisticalBox_item_value">{{num2}}人</text>
				</view>
				<view class="statisticalBox_item">
					<uCircle canvasId="uCircle3" :watchNo="watchNo" :chartData="chartData3" :width="120" :height="120" :fontSize="26"></uCircle>
					<text class="statisticalBox_item_label">36～60岁</text>
					<text class="statisticalBox_item_value">{{num3}}人</text>
				</view>
				<view class="statisticalBox_item">
					<uCircle canvasId="uCircle4" :watchNo="watchNo" :chartData="chartData4" :width="120" :height="120" :fontSize="26"></uCircle>
					<text class="statisticalBox_item_label">60岁以上</text>
					<text class="statisticalBox_item_value">{{num4}}人</text>
				</view>
			</view>
		</view>
		<uni-segmented-control :current="current" :props="props" :values="memberList" style-type="text" active-color="#03A9AC" @clickItem="onTab"></uni-segmented-control>
		<view class="patient_list">
			<mescroll-uni ref="mescrollRef" @init="mescrollInit" :fixed="false" @down="downCallback" @up="upCallback" :down="downOption" :up="upOption">
				<view class="patient_item" v-for="(item, index) in dataList" :key="item.id">
					<view class="patient_item_box">
						<view class="patient_item_box_info">
							<view class="patient_item_box_info_avatar">
								{{item.patientName|interception}}
							</view>
							<view class="patient_item_box_info_content">
								<view class="patient_item_content_box fs24">
									<text class="patient_item_content_box_name fs30">{{item.patientName}}</text>
									<text class="patient_item_content_box_age">{{item.age || 0}}岁</text>
									<image v-if="item.sex === 1" class="patient_item_content_box_sex" src="@/static/team/woman.png" mode=""></image>
									<image v-else class="patient_item_content_box_sex" src="@/static/team/man.png" mode=""></image>
								</view>
								<view class="patient_item_content_box fs24">
									住院号：{{item.admissionNumber}}
								</view>
							</view>
							<view v-if="item.newSolutionId" class="patient_item_box_info_time">
								<view class="box_time">
									<text class="box_time_title">始</text>
									<text class="box_time_time">{{item.startTime | parseTime('{y}/{m}/{d}')}}</text>
								</view>
								<view class="box_time">
									<text class="box_time_title">终</text>
									<text class="box_time_time">{{item.endTime | parseTime('{y}/{m}/{d}')}}</text>
								</view>
							</view>
						</view>
						<view v-if="item.newSolutionId" class="patient_item_box_solution">
							<view class="solution_name">{{item.newSolutionName}}</view>
							<view class="solution_process">
								<progress :percent="progressNum(item.visitCourseNow, item.visitCourseCount)" border-radius="10" active backgroundColor="#DCDCDC" activeColor="#81D4D5" stroke-width="12" />
								<text class="solution_process_num">{{ item.visitCourseNow }}/{{ item.visitCourseCount }}</text>
							</view>
						</view>
						<view v-else class="patient_item_box_operation">
							暂无随访计划
						</view>
					</view>
				</view>
			</mescroll-uni>
		</view>
	</view>
</template>

<script>
import uCircle from '@/js_sdk/u-charts/circle';
import { getList } from '@/api/common';
import { getPatientList } from '@/api/followUp';
import { getStatistics } from '@/api/team';
import { mapGetters } from 'vuex';
import MescrollMixin from '@/components/mescroll-uni/mescroll-mixins.js';
export default {
	mixins: [MescrollMixin],
	components: {
		uCircle
	},
	onLoad() {
		this.getMemberList()
	},
	computed: {
		...mapGetters(['myInfo'])
	},
	data() {
		return {
			props: {
				value: 'userId',
				label: 'name' 
			},
			memberList: [],
			current: 0,
			chartData1: {
				series: [
					{
						name: '',
						data: 0,
						color: '#FFBB3F'
					}
				]
			},
			chartData2: {
				series: [
					{
						name: '',
						data: 0,
						color: '#00B7EE'
					}
				]
			},
			chartData3: {
				series: [
					{
						name: '',
						data: 0,
						color: '#F19EC2'
					}
				]
			},
			chartData4: {
				series: [
					{
						name: '',
						data: 0,
						color: '#AA89BD'
					}
				]
			},
			num1: 0,
			num2: 0,
			num3: 0,
			num4: 0,
			watchNo: 0,
			apiName: 'teamPatient/patientPage',
			mescroll: null, //mescroll实例对象 (此行可删,mixins已默认)
			// 下拉刷新的常用配置
			downOption: {
				use: true, // 是否启用下拉刷新; 默认true
				auto: true, // 是否在初始化完毕之后自动执行下拉刷新的回调; 默认true
				native: false // 启用系统自带的下拉组件,默认false;仅mescroll-body生效,mescroll-uni无效(native: true, 则需在pages.json中配置"enablePullDownRefresh":true)
			},
			// 上拉加载的常用配置
			upOption: {
				use: true, // 是否启用上拉加载; 默认true
				auto: true, // 是否在初始化完毕之后自动执行上拉加载的回调; 默认true
				page: {
					num: 0, // 当前页码,默认0,回调之前会加1,即callback(page)会从1开始
					size: 10 // 每页数据的数量,默认10
				},
				textNoMore: '没有更多了',
				noMoreSize: 5, // 配置列表的总数量要大于等于5条才显示'-- END --'的提示
				empty: {
					icon: '/static/system/c_0.png',
					tip: '暂无患者进行随访'
				}
			},
			// 列表数据
			dataList: [],
			total: 0,
			keyWord: ''
		};
	},
	onShow() {
		this.current = this.myInfo.id
		this.getStatistics()
	},
	methods: {
		onLeftTap() {
			uni.navigateBack({ delta: 1 });
		},
		onTab(data) {
			this.current = data.currentIndex
			this.dataList = []
			this.mescroll.resetUpScroll();
		},
		getStatistics() {
			getStatistics(this.myInfo.doctor.doctorTeamId, res => {
				if (res.data.info) {
					this.num1 = res.data.info.age18
					this.num2 = res.data.info.age35
					this.num3 = res.data.info.age60
					this.num4 = res.data.info.age60Above
					this.chartData1.series[0].data = res.data.info.percentage18 / 100
					this.chartData2.series[0].data = res.data.info.percentage35 / 100
					this.chartData3.series[0].data = res.data.info.percentage60 / 100
					this.chartData4.series[0].data = res.data.info.percentage60Above / 100
					this.watchNo++
				}
			})
		},
		getMemberList() {
			const data = {
				current: 1,
				pageSize: 999,
				teamId: this.myInfo.doctor.doctorTeamId,
				verifyStatus: 1
			}
			getList('teamMember', data, res => {
				this.memberList = res.data.list
			})
		},
		upCallback(page) {
			let pageNum = page.num;
			let pageSize = page.size;
			const data = {
				current: pageNum,
				pageSize: pageSize,
				doctorUserId: this.current,
				teamId: this.myInfo.doctor.doctorTeamId
			};
			getPatientList(this.apiName, data, res => {
				let curPageData = res.data.list;
				let curPageLen = curPageData.length;
				let totalSize = res.data.total;
				this.total = res.data.total;
				if (page.num == 1) this.dataList = [];
				this.dataList = this.dataList.concat(curPageData);
				this.mescroll.endBySize(curPageLen, totalSize);
			});
		},
		handleFilter(e) {
			this.keyWord = e.detail.value;
			this.mescroll.resetUpScroll();
		},
		progressNum(accomplishment, quantum) {
			if (!accomplishment || !quantum) {
				return 0
			}
			return Math.floor(accomplishment/quantum*100)
		}
	}
};
</script>

<style lang="scss" scoped>
.lg-container {
	.statisticalBox {
		width: 710rpx;
		margin: 20rpx auto;
		height: 300rpx;
		background-color: #fff;
		padding: 20rpx;
		box-sizing: border-box;
		border-radius: 10rpx;
		.statisticalBox_title {
			color: #333333;
			font-size: 26rpx;
			margin-bottom: 24rpx;
		}
		.statisticalBox_list {
			display: flex;
			justify-content: space-around;
			.statisticalBox_item {
				display: flex;
				align-items: center;
				flex-direction: column;
				&_label {
					color: #888888;
					font-size: 24rpx;
					margin: 10rpx 0;
				}
				&_value {
					color: #333333;
					font-size: 26rpx;
				}
			}
		}
	}
	.patient_list {
		width: 100vw;
		margin-top: 2rpx;
		height: calc(100vh - 500rpx);
		// #ifndef H5
		height: calc(100vh - 548rpx);
		// #endif
		.patient_item {
			background-color: #fff;
			margin-bottom: 2rpx;
			display: flex;
			align-items: center;
			padding: 32rpx 40rpx 22rpx;
			box-sizing: border-box;
			&_checkbox {
				margin-right: 30rpx;
			}
			&_box {
				flex: 1;
				&_info {
					display: flex;
					justify-content: space-between;
					&_avatar {
						width: 80rpx;
						height: 80rpx;
						line-height: 80rpx;
						text-align: center;
						border-radius: 50%;
						color: #fff;
						background-color: #03A9AC;
					}
					&_content {
						flex: 1;
						margin: 0 30rpx;
						display: flex;
						flex-direction: column;
						justify-content: center;
						.patient_item_content_box {
							margin: 6rpx 0;
							color: #888888;
							&_name {
								color: #333333;
							}
							&_age {
								color: #333333;
								margin: 0 20rpx;
							}
							&_sex {
								width: 22rpx;
								height: 22rpx;
							}
						}
					}
					&_time {
						display: flex;
						flex-direction: column;
						justify-content: center;
						.box_time {
							margin: 6rpx 0;
							display: flex;
							align-items: center;
							&_title {
								width: 30rpx;
								height: 30rpx;
								line-height: 30rpx;
								text-align: center;
								font-size: 20rpx;
								color: #FFFFFF;
								background-color: #FFBB3F;
								display: inline-block;
								border-radius: 50%;
							}
							&_time {
								color: #888888;
								font-size: 24rpx;
								margin-left: 10rpx;
							}
						}
					}
					&_handover {
						.img {
							width: 85rpx;
							height: 85rpx;
						}
					}
				}
				&_operation {
					color: #888888;
					font-size: 24rpx;
					padding-left: 110rpx;
					margin-top: 6rpx;
				}
				&_solution {
					display: flex;
					align-items: center;
					margin-top: 20rpx;
					.solution_name {
						width: 200rpx;
						color: #888888;
						font-size: 24rpx;
						line-height: 30rpx;
					}
					.solution_process {
						flex: 1;
						margin-left: 10rpx;
						position: relative;
						&_num {
							position: absolute;
							right: 10rpx;
							top: 3rpx;
							font-size: 20rpx;
							color: #fff;
						}
					}
				}
			}
		}
	}
}
</style>
