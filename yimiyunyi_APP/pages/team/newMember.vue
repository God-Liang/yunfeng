<template>
	<view class="lg-container">
		<uni-nav-bar left-icon="back" title="新的成员" @clickLeft="onLeftTap"></uni-nav-bar>
		<view class="lg_list">
			<mescroll-uni ref="mescrollRef" @init="mescrollInit" :fixed="false" @down="downCallback" @up="upCallback" :down="downOption" :up="upOption">
				<view class="lg_item" v-for="(item, index) in dataList" :key="item.id">
					<view class="lg_item_img"><img class="lg_item_img_img w110" src="@/static/team/avatar_doctor.png" alt="" /></view>
					<view class="lg_item_box">
						<view class="lg_item_box_name"><text class="lg_item_box_name_text">{{item.name}}</text></view>
						<view class="lg_item_box_info">
							<text>{{item.jobType}}</text>
							<text class="ml20">{{item.department}}</text>
						</view>
						<view class="lg_item_box_info">
							<text>来源：<text class="colorMain">{{item.fromDoctorName || '无'}}</text>邀请加入</text>
						</view>
					</view>
					<view class="lg_item_more">
						<view class="lg_item_more_time">{{item.createTime | parseTime('{y}/{m}/{d}')}}</view>
						<view v-if="item.verifyStatus === 1" class="lg_item_more_status">已同意</view>
						<view v-if="item.verifyStatus === 2" class="lg_item_more_status">已拒绝</view>
						<view v-if="item.verifyStatus === 0" class="lg_item_more_box">
							<view class="lg_item_more_box_btn" @tap="onAudit(item, 1)">同意</view>
							<view class="lg_item_more_box_btn info" @tap="onAudit(item, 2)">拒绝</view>
						</view>
					</view>
				</view>
			</mescroll-uni>
		</view>
	</view>
</template>

<script>
	import { getList, createOrUpdate } from '@/api/common';
	import { auditTeamMember, teamRead } from '@/api/team';
	import { mapGetters } from 'vuex';
	import MescrollMixin from '@/components/mescroll-uni/mescroll-mixins.js';
	import common from '@/mixins/common';
	export default {
		mixins: [MescrollMixin, common],
		onLoad(options) {
			this.applyCount = parseInt(options.applyCount)
		},
		computed: {
			...mapGetters(['myInfo', 'teamGroupInfo'])
		},
		data() {
			return {
				apiName: 'teamMember',
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
						icon: '/static/system/emptyApply.png',
						tip: '暂无成员申请加入团队'
					}
				},
				// 列表数据
				dataList: [],
				total: 0,
				keyWord: '',
				applyCount: 0
			}
		},
		onShow() {
			if (this.applyCount > 0) {
				this.teamRead()
			}
		},
		methods: {
			onLeftTap() {
				uni.navigateBack({
					delta: 1
				});
			},
			upCallback(page) {
				let pageNum = page.num;
				let pageSize = page.size;
				const data = {
					current: pageNum,
					pageSize: pageSize,
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
				this.keyWord = e.detail.value;
				this.mescroll.resetUpScroll();
			},
			// 审核新成员
			onAudit(data, verifyStatus) {
				this.$helper.loading('加载中', true)
				const dataObj = {
					id: data.id,
					verifyStatus: verifyStatus
				}
				auditTeamMember(dataObj, res => {
					uni.hideLoading()
					const IMdata = {
						uid: data.userId,
						groupId: this.teamGroupInfo.roomId
					}
					if (verifyStatus === 1) {
						this.agreeJoinGroup(IMdata, () => {
							this.$helper.toast('success', '已同意')
						})
					} else {
						this.rejectJoinGroup(IMdata, () => {
							this.$helper.toast('success', '已拒绝')
						})
					}
					this.mescroll.resetUpScroll();
				})
			},
			// 已读
			teamRead() {
				const data = {
					id: this.myInfo.doctor.doctorTeamId,
					applyCount: 0
				}
				createOrUpdate('team', data, res => {
					console.log(res)
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.lg-container {
		.lg_item_more {
			display: flex;
			align-items: flex-end;
			flex-direction: column;
			&_time {
				line-height: 30rpx;
				color: #BCBCBC;
			}
			&_status {
				margin-top: 34rpx;
			}
			&_box {
				display: flex;
				margin-top: 24rpx;
				&_btn {
					width: 100rpx;
					height: 50rpx;
					line-height: 50rpx;
					text-align: center;
					background-color: #03A9AC;
					color: #FFFFFF;
					border-radius: 5rpx;
					&.info {
						background-color: #BFBFBF;
						margin-left: 20rpx;
					}
				}
			}
		}
	}
</style>
