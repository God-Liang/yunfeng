<template>
	<view class="lg-container">
		<uni-nav-bar left-icon="back" title="我的患者" @clickLeft="onLeftTap"></uni-nav-bar>
		<uni-search-bar placeholder="搜索患者姓名" @input="handleFilter"></uni-search-bar>
		<uni-list class="mb20">
			<uni-list-item
				thumb="/static/followUp/newPatient.png"
				:thumbStyle="{ width: '33rpx', height: '28rpx', display: 'block' }"
				title="新的病人"
				:show-badge="true"
				:badge-text="patientObj.newNum > 0 ? String(patientObj.newNum) : ''"
				badge-type="error"
				@click="onJump('/pages/followUp/patientNew?newNum='+patientObj.newNum)"
			></uni-list-item>
			<uni-list-item
				thumb="/static/followUp/temporaryPatient.png"
				:thumbStyle="{ width: '31rpx', height: '31rpx', display: 'block' }"
				title="临时随访病人"
				@click="onJump('/pages/followUp/patientTemporary')"
			></uni-list-item>
		</uni-list>
		<view class="patient_list">
			<mescroll-uni ref="mescrollRef" @init="mescrollInit" :fixed="false" @down="downCallback" @up="upCallback" :down="downOption" :up="upOption">
				<view class="patient_item" v-for="(item, index) in dataList" :key="index" @tap="onJump('/pages/followUp/patientDetails?patientId='+item.patientId+'&patientName='+item.patientName)">
					<view class="patient_item_box">
						<view class="patient_item_box_info">
							<view class="patient_item_box_info_avatar">{{ item.patientName | interception }}</view>
							<view class="patient_item_box_info_content">
								<view class="patient_item_content_box fs24">
									<text class="patient_item_content_box_name fs30">{{ item.patientName }}</text>
									<text class="patient_item_content_box_age">{{ item.age || 0 }}岁</text>
									<image v-if="item.sex === 1" class="patient_item_content_box_sex" src="@/static/team/woman.png" mode=""></image>
									<image v-else class="patient_item_content_box_sex" src="@/static/team/man.png" mode=""></image>
								</view>
								<view class="patient_item_content_box fs24">住院号：{{ item.admissionNumber }}</view>
							</view>
							<view v-if="item.newSolutionId" class="patient_item_box_info_time">
								<view class="box_time">
									<text class="box_time_title">始</text>
									<text class="box_time_time">{{ item.startTime | parseTime('{y}/{m}/{d}') }}</text>
								</view>
								<view class="box_time">
									<text class="box_time_title">终</text>
									<text class="box_time_time">{{ item.endTime | parseTime('{y}/{m}/{d}') }}</text>
								</view>
							</view>
						</view>
						<view v-if="item.newSolutionId" class="patient_item_box_solution">
							<view class="solution_name">{{ item.newSolutionName }}</view>
							<view class="solution_process">
								<progress :percent="progressNum(item.visitCourseNow, item.visitCourseCount)" border-radius="10" active backgroundColor="#DCDCDC" activeColor="#81D4D5" stroke-width="12" />
								<text class="solution_process_num">{{ item.visitCourseNow }}/{{ item.visitCourseCount }}</text>
							</view>
						</view>
						<view v-else class="patient_item_box_operation">暂无随访计划</view>
					</view>
				</view>
			</mescroll-uni>
		</view>
	</view>
</template>

<script>
import { getList } from '@/api/common';
import { readTipNumber } from '@/api/team';
import { mapGetters } from 'vuex';
import common from '@/mixins/common';
import MescrollMixin from '@/components/mescroll-uni/mescroll-mixins.js';
export default {
	mixins: [MescrollMixin, common],
	computed: {
		...mapGetters(['myInfo'])
	},
	data() {
		return {
			apiName: 'teamPatient',
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
			keyWord: '',
			patientObj: {
				newNum: 0
			}
		};
	},
	onShow() {
		this.readTipNumber()
	},
	methods: {
		onLeftTap() {
			uni.navigateBack({ delta: 1 });
		},
		readTipNumber() {
			readTipNumber(this.myInfo.doctor.doctorTeamId, res => {
				this.patientObj.newNum = res.data.info || 0
			})
		},
		upCallback(page) {
			let pageNum = page.num;
			let pageSize = page.size;
			const data = {
				current: pageNum,
				pageSize: pageSize,
				name: this.keyWord,
				doctorUserId: this.myInfo.id,
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
		handleFilter(e) {
			this.keyWord = e.value;
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
	.patient_list {
		width: 100vw;
		margin-top: 2rpx;
		// #ifdef H5
		height: calc(100vh - 392rpx);
		// #endif
		// #ifndef H5
		height: calc(100vh - 440rpx);
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
						background-color: #03a9ac;
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
								color: #ffffff;
								background-color: #ffbb3f;
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
