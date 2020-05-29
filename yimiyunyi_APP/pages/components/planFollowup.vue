<template>
	<view class="planFollowup">
		<mescroll-uni ref="mescrollRef" @init="mescrollInit" :fixed="false" @down="downCallback" @up="upCallback" :down="downOption" :up="upOption">
			<uni-swipe-action v-for="item in dataList" :key="item.id">
				<uni-swipe-action-item :options="item.status === 3 ? options2 : options1" @click="bindClick($event, item)">
					<view class="plan-item" @tap="onLook(item)">
						<view class="plan-item_box">
							<text class="plan-item_box_name fs30 color333">{{ item.name }}</text>
							<text class="plan-item_box_time fs24 color888">{{ item.startTime }}</text>
						</view>
						<view class="plan-item_box">
							<text class="plan-item_box_title fs24 color888">随访进程</text>
							<view class="solution_process">
								<progress :percent="progressNum(item.visitCourseNow, item.visitCourseCount)" border-radius="10" active backgroundColor="#DCDCDC" activeColor="#81D4D5" stroke-width="12" />
								<text class="solution_process_num">{{ item.visitCourseNow }}/{{ item.visitCourseCount }}</text>
							</view>
							<text class="plan-item_box_status" :class="colorList[item.status]">{{ statusList[item.status] }}</text>
						</view>
					</view>
				</uni-swipe-action-item>
			</uni-swipe-action>
		</mescroll-uni>
	</view>
</template>

<script>
	import { deletePlan, getList } from '@/api/followUp';
	import { mapGetters } from 'vuex';
	import MescrollMixin from '@/components/mescroll-uni/mescroll-mixins.js';
	export default {
		mixins: [MescrollMixin],
		computed: {
			...mapGetters(['myInfo'])
		},
		props: {
			patientId: [String, Number],
			teamId: [String, Number],
		},
		data() {
			return {
				apiName: 'AppPlan/getTeamPlanPage',
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
						tip: '暂无随访计划'
					}
				},
				// 列表数据
				dataList: [],
				total: 0,
				statusList: ['未开始', '进行中', '已完成', '终止'],
				colorList: ['info', 'underway', 'accomplish', 'info'],
				options1: [
					{
						text: '终止',
						style: {
							backgroundColor: '#F25645',
							fontSize: '26rpx',
							padding: '0 54rpx'
						}
					}
				],
				options2: []
			}
		},
		methods: {
			bindClick(btnData, data) {
				uni.showModal({
					title: '提示',
					confirmColor: '#03A9AC',
					content: '是否终止'+data.name+'？',
					success: (res) => {
						if (res.confirm) {
							deletePlan(data.id, res => {
								this.$helper.toast('success', '终止成功')
								this.mescroll.resetUpScroll();
							})
						} else if (res.cancel) {
							
						}
					}
				});
			},
			onLook(item) {
				this.$helper.to('/pages/followUp/planDetail?id='+item.id)
			},
			upCallback(page) {
				let pageNum = page.num;
				let pageSize = page.size;
				const data = {
					current: pageNum,
					pageSize: pageSize,
					patientId: this.patientId,
					teamId: this.myInfo.doctor.doctorTeamId
				};
				getList(this.apiName, data, res => {
					let curPageData = res.data.list;
					let curPageLen = curPageData.length;
					let totalSize = res.data.total;
					this.total = res.data.total;
					if (page.num == 1) this.dataList = [];
					this.dataList = this.dataList.concat(curPageData);
					this.mescroll.endBySize(curPageLen, totalSize);
				});
			},
			progressNum(accomplishment, quantum) {
				if (!accomplishment || !quantum) {
					return 0
				}
				return Math.floor(accomplishment/quantum*100)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.planFollowup {
		height: calc(100vh - 152rpx);
		// #ifndef H5
		height: calc(100vh - 200rpx);
		// #endif
		.plan-item {
			height: 150rpx;
			width: 100vw;
			box-sizing: border-box;
			background-color: #fff;
			margin-bottom: 2rpx;
			padding: 30rpx 40rpx 34rpx;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			&_box {
				display: flex;
				justify-content: space-between;
				align-items: center;
				&_name {
					
				}
				&_time {
					
				}
				&_title {
					
				}
				&_status {
					font-size: 24rpx;
					&.info {
						color: #888888;
					}
					&.underway {
						color: #03A9AC;
					}
					&.accomplish {
						color: #FDBB59;
					}
				}
				.solution_process {
					flex: 1;
					margin-left: 10rpx;
					position: relative;
					margin: 0 30rpx 0 20rpx;
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
</style>
