<template>
	<view class="lg-container">
		<uni-nav-bar left-icon="back" title="选择方案" @clickLeft="onLeftTap"></uni-nav-bar>
		<view class="search-container">
			<view class="input-container">
				<input class="keyword-input" type="text" placeholder="搜索方案名称" @input="handleFilter" placeholder-class="placeholder-class" />
				<image class="search-btn" src="https://gitee.com/picture_storage_area/follow_up_doctor/raw/master/images/message/search.png" mode=""></image>
			</view>
			<view class="sxBox" @tap="onScreen">
				筛选
				<image class="sxImg" src="https://gitee.com/picture_storage_area/follow_up_doctor/raw/master/followUp/sxW.png"></image>
			</view>
		</view>
		<lgProgress :active="1"></lgProgress>
		<view class="lg_list">
			<mescroll-uni ref="mescrollRef" @init="mescrollInit" :fixed="false" @down="downCallback" @up="upCallback" :down="downOption" :up="upOption">
				<uni-swipe-action v-for="item in dataList" :key="item.id">
					<uni-swipe-action-item :options="options" @click="bindClick($event, item)">
						<view class="lg_item" :class="solutionId === item.id ? 'lg_item_acitve' : ''" @tap="selectSolution(item)">
							<view class="lg_item_box m0">
								<view class="lg_item_box_name">
									<text class="lg_item_box_name_text">{{ item.name || '暂无方案名称' }}</text>
								</view>
								<view class="lg_item_box_info">
									<text class="lg_item_box_info_professionCall">{{ item.operationShow || '暂无关联手术' }}</text>
									<text class="lg_item_box_info_department ml20">{{ item.departmentShow || '暂无关联科室' }}</text>
								</view>
							</view>
						</view>
					</uni-swipe-action-item>
				</uni-swipe-action>
			</mescroll-uni>
		</view>
		<view class="operationBox" @tap="onNext">
			下一步
		</view>
		<uni-popup ref="screenPopup" type="top" class="topScreen" @change="onChange">
			<scroll-view scroll-y class="warpper">
				<view class="sxBox" @tap="onScreen">
					筛选
					<image class="sxImg" src="https://gitee.com/picture_storage_area/follow_up_doctor/raw/master/followUp/sxB.png"></image>
				</view>
				<view class="range">
					<view class="title">范围</view>
					<view class="options">
						<text v-for="item in rangeOptions" class="radio" :key="item.value" @tap="filters.scope = item.value" :class="{ currentClass: item.value === filters.scope }">
							{{ item.label }}
						</text>
					</view>
				</view>
				<view class="classification">
					<view class="title">分类</view>
					<view class="options">
						<text v-for="item in classOptions" class="radio" :key="item.id" @tap="filters.department = item.id" :class="{ currentClass: item.id === filters.department }">
							{{ item.name }}
						</text>
					</view>
				</view>
			</scroll-view>
			<view class="footer">
				<view class="ordinary" @tap="clearFn">清除</view>
				<view class="primary" @tap="sureSubmit">确定</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
import { getList, createOrUpdate } from '@/api/common';
import { getBinaryList } from '@/api/system';
import { mapGetters } from 'vuex';
import common from '@/mixins/common';
import MescrollMixin from '@/components/mescroll-uni/mescroll-mixins.js';
import lgProgress from '@/pages/components/lgProgress.vue';
export default {
	mixins: [MescrollMixin, common],
	computed: {
		...mapGetters(['myInfo', 'planObj'])
	},
	components: {
		lgProgress
	},
	data() {
		return {
			options: [
				{
					text: '查看详情',
					style: {
						backgroundColor: '#03A9AC',
						fontSize: '26rpx',
						padding: '0 54rpx'
					}
				}
			],
			apiName: 'AppFollowupSolution',
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
					tip: '暂无方案'
				}
			},
			// 列表数据
			dataList: [],
			total: 0,
			keyWord: '',
			filters: {
				department: null,
				scope: null
			},
			// 范围选项
			rangeOptions: [
				{
					value: 1,
					label: '平台'
				},
				{
					value: 2,
					label: '团队'
				}
			],
			// 科室选项
			classOptions: [],
			isScreen: false,
			solutionId: null,
			solutionName: ''
		};
	},
	onShow() {
		this.solutionId = this.planObj.solutionId;
		this.solutionName = this.planObj.solutionName;
		this.getBinaryList()
	},
	methods: {
		onLeftTap() {
			uni.navigateBack({ delta: 1 });
		},
		// 获取所有科室
		getBinaryList() {
			getBinaryList(res => {
				this.classOptions = res.data.info
			})
		},
		bindClick(btnData, data) {
			this.$helper.to('/pages/followUp/solutionDetail?id='+data.id)
		},
		upCallback(page) {
			let pageNum = page.num;
			let pageSize = page.size;
			const data = {
				current: pageNum,
				pageSize: pageSize,
				keyWord: this.keyWord,
				...this.filters
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
		// 选择方案
		selectSolution(item) {
			if (this.solutionId === item.id) {
				this.solutionId = null
				this.planObj.solutionName = ''
			} else {
				this.solutionId = item.id
				this.solutionName = item.name
			}
		},
		// 下一步
		onNext() {
			if (!this.solutionId) {
				this.$helper.toast('none', '请选择方案')
				return
			}
			this.planObj.solutionId = this.solutionId
			this.planObj.solutionName = this.solutionName
			this.$store.dispatch('togglePlanObj', this.planObj);
			this.$helper.to('/pages/followUp/newPlanCard')
		},
		// 筛选
		onScreen() {
			if (this.isScreen) {
				this.$refs.screenPopup.close();
			} else {
				this.$refs.screenPopup.open();
			}
		},
		onChange(e) {
			this.isScreen = e.show;
		},
		clearFn() {
			this.filters = {
				department: null,
				scope: null
			}
		},
		sureSubmit() {
			this.dataList = []
			this.$refs.screenPopup.close();
			this.mescroll.resetUpScroll();
		}
	}
};
</script>

<style lang="scss" scoped>
.lg-container {
	.search-container {
		padding: 0 40rpx;
		box-sizing: border-box;
		align-items: center;
		box-sizing: border-box;
		.input-container {
			flex: 1;
		}
		.sxBox {
			width: 80rpx;
			height: 60rpx;
			line-height: 60rpx;
			margin-left: 20rpx;
			color: #ffffff;
			font-size: 26rpx;
			.sxImg {
				width: 26rpx;
				height: 22rpx;
				vertical-align: middle;
				margin-bottom: 4rpx;
			}
		}
	}
	.lg_list {
		height: calc(100vh - 432rpx);
		// #ifndef H5
		height: calc(100vh - 480rpx);
		// #endif
		margin-top: 20rpx;
		.lg_item_acitve {
			background-color: #E5E5E5;
		}
	}
	.topScreen {
		top: 88rpx;
		// #ifndef H5
		top: 136rpx;
		// #endif
		.warpper {
			padding: 30rpx 50rpx;
			background: #fff;
			height: 600rpx;
			box-sizing: border-box;
			.sxBox {
				text-align: right;
				.sxImg {
					width: 26rpx;
					height: 22rpx;
					vertical-align: middle;
					margin-bottom: 4rpx;
				}
			}
			.range,
			.classification {
				.title {
					font-size: 24rpx;
				}
				.options {
					margin: 20rpx 0 30rpx;
					.radio {
						display: inline-block;
						background: #f2fafa;
						line-height: 50rpx;
						text-align: center;
						color: #888;
						margin: 0 24rpx 20rpx 0;
						padding: 0 40rpx;
					}
					.currentClass {
						background: #03a9ac;
						color: #fff;
					}
				}
			}
		}
		.footer {
			display: flex;
			.ordinary,
			.primary {
				width: 50%;
				text-align: center;
				border-radius: 0 !important;
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
		background-color: #03A9AC;
		color: #FFFFFF;
		font-size: 30rpx;
		text-align: center;
	}
}
</style>
