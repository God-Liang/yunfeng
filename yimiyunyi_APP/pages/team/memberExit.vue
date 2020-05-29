<template>
	<view class="lg-container">
		<uni-nav-bar left-icon="back" title="成员退出申请" @clickLeft="onLeftTap"></uni-nav-bar>
		<uni-search-bar placeholder="搜索医生姓名" @input="handleFilter"></uni-search-bar>
		<view class="lg_list">
			<mescroll-uni ref="mescrollRef" @init="mescrollInit" :fixed="false" @down="downCallback" @up="upCallback" :down="downOption" :up="upOption">
				<view class="lg_item" v-for="(item, index) in dataList" :key="item.id" @tap="onAdd(item)">
					<view class="lg_item_img"><img class="lg_item_img_img" src="@/static/team/avatar_doctor.png" alt="" /></view>
					<view class="lg_item_box">
						<view class="lg_item_box_name"><text class="lg_item_box_name_text">{{item.name}}</text></view>
						<view class="lg_item_box_info">
							<text>{{item.jobType}}</text>
							<text class="ml20">{{item.department}}</text>
						</view>
					</view>
					<view class="lg_item_more"><text class="lg_icon icon iconfont iconjiantouarrow487"></text></view>
				</view>
			</mescroll-uni>
		</view>
	</view>
</template>

<script>
import common from '@/mixins/common';
import MescrollMixin from '@/components/mescroll-uni/mescroll-mixins.js';
import { mapGetters } from 'vuex';	
import { getList, createOrUpdate } from '@/api/common';
import { getPatientList } from '@/api/followUp';
import { quitTeamVerifyStatus } from '@/api/team';

export default {
	mixins: [common, MescrollMixin],
	onLoad(options) {
		this.quitCount = parseInt(options.quitCount)
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
					tip: '暂无成员申请退出团队'
				}
			},
			// 列表数据
			dataList: [],
			total: 0,
			keyWord: '',
			quitCount: 0
		};
	},
	computed: {
		...mapGetters(['myInfo', 'teamGroupInfo'])
	},
	onShow() {
		if (this.quitCount > 0) {
			this.teamRead()
		}
	},
	methods: {
		onLeftTap() {
			uni.navigateBack({ delta: 1 });
		},
		teamRead() {
			const data = {
				id: this.myInfo.doctor.doctorTeamId,
				quitCount: 0
			}
			createOrUpdate('team', data, res => {
				console.log(res)
			})
		},
		upCallback(page) {
			let pageNum = page.num;
			let pageSize = page.size;
			const data = {
				current: pageNum,
				pageSize: pageSize,
				name: this.keyWord,
				teamType: 3,
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
		onAdd(item) {
			const data = {
				current: 1,
				pageSize: 999,
				doctorUserId: item.userId,
				teamId: this.myInfo.doctor.doctorTeamId
			};
			getPatientList('teamPatient/patientPage', data, res => {
				let curPageData = res.data.list;
				if (res.data.list.length > 0) {
					this.$helper.to('/pages/team/memberExitTwo?userId='+item.userId+'&id='+item.id+'&name='+item.name)
				} else {
					uni.showModal({
						title: '提示',
						content: '是否同意成员'+item.name+'退出团队?',
						confirmColor: '#03A9AC',
						confirmText: '同意',
						cancelText: '拒绝',
						success: (res) => {
							if (res.confirm) {
								this.$helper.loading('加载中');
								quitTeamVerifyStatus(item.userId, this.myInfo.doctor.doctorTeamId, res => {
									const IMdata = {
										uid: item.userId,
										groupId: this.teamGroupInfo.roomId
									};
									this.quitGroup(IMdata, () => {
										uni.hideLoading();
										this.$helper.toast('success', '退出成功');
										this.mescroll.resetUpScroll();
									});
								});
							} else if (res.cancel) {
								console.log('用户点击取消');
							}
						}
					});
				}
			})
		}
	}
};
</script>

<style lang="scss" scoped>
.lg-container {
	.lg_list {
		height: calc(100vh - 188rpx);
		// #ifndef H5
		height: calc(100vh - 236rpx);
		// #endif
	}
}
</style>
