<template>
	<view class="temporaryFollowup">
		<mescroll-uni ref="mescrollRef" @init="mescrollInit" :fixed="false" @down="downCallback" @up="upCallback" :down="downOption" :up="upOption">
			<view class="temporary-item" v-for="item in dataList" :key="item.id" @tap="onJump('/pages/components/details?id='+item.id+'&isPlan=1')">
				<view class="temporary-item_name fs30 color333">{{item.name}}</view>
				<view class="temporary-item_box">
					<text class="temporary-item_box_time fs24 color888">{{item.createTime | parseTime('{y}-{m}-{d}')}}</text>
					<text v-if="item.type === 1&&!item.isWeChatRead" class="temporary-item_box_status status1">未填</text>
					<text v-if="item.type === 1&&item.isWeChatRead" class="temporary-item_box_status status2">已填</text>
					<text v-if="item.type === 2&&!item.isWeChatRead" class="temporary-item_box_status status3">未读</text>
					<text v-if="item.type === 2&&item.isWeChatRead" class="temporary-item_box_status status4">已读</text>
				</view>
				<text class="lg-icon icon iconfont iconjiantouarrow487"></text>
			</view>
		</mescroll-uni>
	</view>
</template>

<script>
import { getList } from '@/api/common';
import common from '@/mixins/common';
import { mapGetters } from 'vuex';
import MescrollMixin from '@/components/mescroll-uni/mescroll-mixins.js';
export default {
	mixins: [MescrollMixin, common],
	computed: {
		...mapGetters(['myInfo'])
	},
	props: {
		patientId: [String, Number],
		teamId: [String, Number]
	},
	data() {
		return {
			apiName: 'patientForm',
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
					tip: '暂无临时随访'
				}
			},
			// 列表数据
			dataList: [],
			total: 0
		};
	},
	methods: {
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
		}
	}
};
</script>

<style lang="scss" scoped>
.temporaryFollowup {
	height: calc(100vh - 152rpx);
	// #ifndef H5
	height: calc(100vh - 200rpx);
	// #endif
	.temporary-item {
		height: 150rpx;
		width: 100vw;
		box-sizing: border-box;
		background-color: #fff;
		margin-bottom: 2rpx;
		padding: 30rpx 40rpx 34rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		&_name {
			flex: 1;
		}
		&_box {
			display: flex;
			flex-direction: column;
			align-items: flex-end;
			margin-right: 4rpx;
			&_status {
				width: 80rpx;
				height: 30rpx;
				line-height: 28rpx;
				text-align: center;
				background: rgba(255, 255, 255, 1);
				border-radius: 16rpx;
				font-size: 20rpx;
				margin-top: 24rpx;
			}
			.status1 {
				border: 2rpx solid #FDBB59;
				color:	#FDBB59;
			}
			.status2 {
				border: 2rpx solid #81D4D5;
				color:	#81D4D5;
			}
			.status3 {
				border: 2rpx solid #E60012;
				color:	#E60012;
			}
			.status4 {
				border: 2rpx solid #03A9AC;
				color:	#03A9AC;
			}
		}
	}
}
</style>
