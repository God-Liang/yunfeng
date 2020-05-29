<template>
	<view class="lg-container">
		<uni-nav-bar left-icon="back" title="选择联系人" @clickLeft="onLeftTap"></uni-nav-bar>
		<uni-search-bar placeholder="搜索医生姓名" @input="handleFilter"></uni-search-bar>
		<view class="lg_list">
			<mescroll-uni ref="mescrollRef" @init="mescrollInit" :fixed="false" @down="downCallback" @up="upCallback" @emptyclick="emptyCallback" :down="downOption" :up="upOption">
				<view class="lg_item" v-for="(item, index) in dataList" :key="item.id" @tap="onSelectDoctor(item)">
					<view class="lg_item_img"><img class="lg_item_img_img" src="@/static/team/avatar_doctor.png" alt="" /></view>
					<view class="lg_item_box">
						<view class="lg_item_box_name"><text class="lg_item_box_name_text">{{ item.nick || '暂无名称' }}</text></view>
						<view class="lg_item_box_info">
							<text>{{ item.professionCallShow || '暂无职称' }}</text>
							<text class="ml20">{{item.department || '暂无所在科室'}}</text>
						</view>
					</view>
				</view>
			</mescroll-uni>
		</view>
	</view>
</template>

<script>
import { getDoctorList, sendMessage } from '@/api/team';
import { mapGetters } from 'vuex';
import MescrollMixin from '@/components/mescroll-uni/mescroll-mixins.js';
export default {
	mixins: [MescrollMixin],
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
					icon: '/static/system/c_0.png',
					tip: '暂无数据',
					describe: '',
					btnText: ''
				}
			},
			// 列表数据
			dataList: [],
			total: 0,
			keyWord: '',
		};
	},
	computed: {
		...mapGetters(['myInfo'])
	},
	methods: {
		onLeftTap() {
			uni.navigateBack({ delta: 1 });
		},
		upCallback(page) {
			let pageNum = page.num;
			let pageSize = page.size;
			const data = {
				current: pageNum,
				pageSize: pageSize,
				name: this.keyWord,
				doctorHospital: this.myInfo.doctor.doctorHospital,
				department: this.myInfo.doctor.department
			};
			getDoctorList(data, res => {
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
		onSelectDoctor(item) {
			uni.showModal({
				title: '提示',
				content: '是否发送邀请给：'+item.nick+'？',
				confirmColor: '#03A9AC',
				success: (res) => {
					if (res.confirm) {
						sendMessage(item.userId, this.myInfo.doctor.doctorTeamId, res => {
							this.$helper.toast('success', '邀请发送成功')
							this.mescroll.resetUpScroll();
						})
					} else if (res.cancel) {
						console.log('用户点击取消');
					}
				}
			});
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
