<template>
	<view class="lg-container">
		<uni-nav-bar left-icon="back" title="新的病人" @clickLeft="onLeftTap"></uni-nav-bar>
		<view class="patient_list">
			<mescroll-uni ref="mescrollRef" @init="mescrollInit" :fixed="false" @down="downCallback" @up="upCallback" :down="downOption" :up="upOption">
				<view class="patient_item" v-for="(item, index) in dataList" :key="item.id">
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
							<view class="patient_item_box_info_more">
								<view class="newBtn" @tap="onTemporary(item)">临时随访</view>
								<view class="newBtn ml20" @tap="onPlan(item)">新建计划</view>
							</view>
						</view>
						<view class="patient_item_box_operation">{{item.operationName || '暂无手术'}}</view>
					</view>
				</view>
			</mescroll-uni>
		</view>
	</view>
</template>

<script>
import MescrollMixin from '@/components/mescroll-uni/mescroll-mixins.js';
import { mapGetters } from 'vuex';
import { getList } from '@/api/followUp';
import { emptyTipNumber } from '@/api/team';
export default {
	mixins: [MescrollMixin],
	onLoad(options) {
		if (options.newNum && options.newNum > 0) {
			this.emptyTipNumber()
		}
	},
	computed: {
		...mapGetters(['myInfo', 'planObj'])
	},
	data() {
		return {
			apiName: 'teamPatient/newPatientPage',
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
					tip: '暂无新病人'
				}
			},
			// 列表数据
			dataList: [],
			total: 0
		};
	},
	methods: {
		onLeftTap() {
			uni.navigateBack({ delta: 1 });
		},
		emptyTipNumber() {
			emptyTipNumber(this.myInfo.doctor.doctorTeamId, res => {})
		},
		upCallback(page) {
			let pageNum = page.num;
			let pageSize = page.size;
			const data = {
				current: pageNum,
				pageSize: pageSize,
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
		onTemporary(item) {
			const temporaryObj = {
				patientId: item.patientId,
				patientName: item.patientName,
				phone: item.phone
			}
			uni.setStorageSync('temporaryObj', temporaryObj)
			this.$helper.to('/pages/followUp/temporaryForm')
		},
		onPlan(item) {
			this.planObj.ids = [item.patientId];
			this.planObj.objIds = [
				{
					name: item.patientName,
					avatar: item.avatar
				}
			];
			this.$store.dispatch('togglePlanObj', this.planObj);
			this.$helper.to('/pages/followUp/newPlanSolution');
		}
	}
};
</script>
<style lang="scss" scoped>
.lg-container {
	.patient_list {
		width: 100vw;
		height: calc(100vh - 88rpx);
		// #ifndef H5
		height: calc(100vh - 136rpx);
		// #endif
		.patient_item {
			background-color: #fff;
			margin-bottom: 2rpx;
			display: flex;
			align-items: center;
			padding: 32rpx 40rpx 22rpx;
			box-sizing: border-box;
			&.patient_item_acitve {
				background-color: #e5e5e5;
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
							margin: 4rpx 0;
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
					&_more {
						display: flex;
						align-items: center;
						.newBtn {
							width: 120rpx;
							height: 50rpx;
							line-height: 50rpx;
							text-align: center;
							background: rgba(3, 169, 172, 1);
							border-radius: 6rpx;
							color: #ffffff;
							font-size: 24rpx;
						}
					}
				}
				&_operation {
					color: #888888;
					font-size: 24rpx;
					padding-left: 110rpx;
					margin-top: 6rpx;
				}
			}
		}
	}
}
</style>
