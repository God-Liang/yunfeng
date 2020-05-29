<template>
	<view class="lg-container">
		<uni-nav-bar left-icon="back" title="成员退出申请" @clickLeft="onLeftTap"></uni-nav-bar>
		<uni-list>
			<uni-list-item thumb="/static/team/applyPeople.png" :thumbStyle="{ width: '35rpx', height: '40rpx', display: 'block' }" :showArrow="false" title="申请人">
				<template v-slot:right="">
					<view class="color888 fs30">{{ userName }}</view>
				</template>
			</uni-list-item>
		</uni-list>
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
							<view class="patient_item_box_info_change">
								<text class="color888 fs24 mr20">{{ item.toDoctorName }}</text>
								<view class="lg_main_btn" @tap="onJump('/pages/team/memberExitThree?id=' + item.patientId)">更换</view>
							</view>
						</view>
					</view>
				</view>
			</mescroll-uni>
		</view>
		<view class="operationBox" @tap="onSumbit">确定</view>
	</view>
</template>

<script>
import MescrollMixin from '@/components/mescroll-uni/mescroll-mixins.js';
import { getList } from '@/api/followUp';
import { quitTeamVerifyStatus } from '@/api/team';
import common from '@/mixins/common';
import { mapGetters } from 'vuex';
export default {
	onLoad(options) {
		if (options.userId) {
			this.userId = parseInt(options.userId);
			this.id = parseInt(options.id);
			this.userName = options.name;
		}
	},
	mixins: [MescrollMixin, common],
	computed: {
		...mapGetters(['myInfo', 'teamGroupInfo'])
	},
	data() {
		return {
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
					tip: '暂无患者'
				}
			},
			// 列表数据
			dataList: [],
			total: 0,
			id: null,
			userId: null,
			userName: ''
		};
	},
	methods: {
		onLeftTap() {
			uni.navigateBack({ delta: 1 });
		},
		upCallback(page) {
			const data = {
				current: 1,
				pageSize: 999,
				doctorUserId: this.userId,
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
		onSumbit() {
			this.$helper.loading('加载中');
			let isExit = false
			this.dataList.map(e => {
				if (!e.toDoctorId || e.toDoctorId === this.userId) {
					isExit = true
				}
			})
			if (isExit) {
				this.$helper.toast('none', '无法交接给退出成员')
				return false
			}
			quitTeamVerifyStatus(this.userId, this.myInfo.doctor.doctorTeamId, res => {
				const IMdata = {
					uid: this.userId,
					groupId: this.teamGroupInfo.roomId
				};
				this.quitGroup(IMdata, () => {
					uni.hideLoading();
					this.$helper.toast('success', '退出成功');
					setTimeout(() => {
						this.$helper.toTab('/pages/tabBar/team');
					}, 1000);
				});
			});
		}
	}
};
</script>

<style lang="scss" scoped>
.lg-container {
	.patient_list {
		width: 100vw;
		height: calc(100vh - 288rpx);
		// #ifndef H5
		height: calc(100vh - 336rpx);
		// #endif
		margin-top: 20rpx;
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
					&_change {
						display: flex;
						align-items: center;
					}
				}
			}
		}
	}
	.operationBox {
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100vw;
		height: 80rpx;
		line-height: 80rpx;
		background-color: #fff;
		box-sizing: border-box;
		background-color: #03a9ac;
		color: #ffffff;
		font-size: 30rpx;
		text-align: center;
	}
}
</style>
