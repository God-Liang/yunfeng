<template>
	<view class="lg-container">
		<uni-nav-bar left-icon="back" title="选择医生" @clickLeft="onLeftTap"></uni-nav-bar>
		<uni-search-bar placeholder="搜索医生姓名" @input="handleFilter"></uni-search-bar>
		<view class="lg_list">
			<mescroll-uni ref="mescrollRef" @init="mescrollInit" :fixed="false" @down="downCallback" @up="upCallback" @emptyclick="emptyCallback" :down="downOption" :up="upOption">
				<view class="lg_item" v-for="(item, index) in dataList" :key="item.id" @tap="onSelectDoctor(item)">
					<view class="lg_item_img"><img class="lg_item_img_img" src="@/static/team/avatar_doctor.png" alt="" /></view>
					<view class="lg_item_box">
						<view class="lg_item_box_name">
							<text class="lg_item_box_name_text">{{ item.name || '暂无名称' }}</text>
							<text class="lg_item_box_name_createName" v-if="item.type === 3">创建人</text>
						</view>
						<view class="lg_item_box_info">
							<text>{{ item.jobType || '暂无职称' }}</text>
						</view>
					</view>
					<view class="lg_item_more" v-if="item.handoverNum > 0"><text>已交接：{{item.handoverNum}}人</text></view>
				</view>
			</mescroll-uni>
		</view>
	</view>
</template>

<script>
import { getList } from '@/api/common';
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
					tip: '请创建团队哦！',
					describe: '对不起，暂无可加入的团队',
					btnText: '创建团队'
				}
			},
			// 列表数据
			dataList: [],
			total: 0,
			keyWord: '',
			selectArr: [],
			handoverArr: []
		};
	},
	computed: {
		...mapGetters(['myInfo'])
	},
	mounted() {
		if (uni.getStorageSync('selectArr')) {
			this.selectArr = uni.getStorageSync('selectArr')
		}
		if (uni.getStorageSync('handoverArr')) {
			this.handoverArr = uni.getStorageSync('handoverArr')
		}
	},
	methods: {
		onLeftTap() {
			uni.navigateBack({ delta: 1 });
		},
		emptyCallback() {
			this.$helper.to('/pages/team/createTeam');
		},
		upCallback(page) {
			const data = {
				current: 1,
				pageSize: 999,
				name: this.keyWord,
				teamId: this.myInfo.doctor.doctorTeamId,
				verifyStatus: 1
			};
			getList(this.apiName, data, res => {
				let curPageData = res.data.list;
				let curPageLen = curPageData.length;
				let totalSize = res.data.total;
				this.total = res.data.total;
				if (page.num == 1) this.dataList = [];
				this.dataList = this.dataList.concat(curPageData);
				this.mescroll.endBySize(curPageLen, totalSize);
				if (this.handoverArr.length > 0) {
					this.getHandoverNum()
				}
			});
		},
		handleFilter(e) {
			this.keyWord = e.value;
			this.mescroll.resetUpScroll();
		},
		getHandoverNum() {
			this.dataList.map(e => {
				let handoverArr = this.handoverArr.filter(v => v.toDoctorId === e.userId)
				console.log(handoverArr)
				e.handoverNum = handoverArr.length
			})
		},
		onSelectDoctor(data) {
			var _this = this
			uni.showModal({
				title: '提示',
				content: '一旦交接，无法修改，请慎重操作。是否确定交接?',
				confirmColor: '#03A9AC',
				success: function(res) {
					if (res.confirm) {
						_this.selectArr.map(e => {
							e.toDoctorId = data.userId
							e.toDoctorName = data.name
						})
						_this.handoverArr = _this.handoverArr.concat(_this.selectArr)
						uni.setStorageSync('handoverArr', _this.handoverArr)
						uni.removeStorageSync('selectArr')
						const pages = getCurrentPages(); //当前页面栈
						if (pages.length > 1) {
							const beforePage = pages[pages.length - 2];
							beforePage.$vm.mescroll.resetUpScroll();
						}
						uni.navigateBack({ delta: 1 });
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
