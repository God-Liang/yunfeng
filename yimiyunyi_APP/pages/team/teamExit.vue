<template>
	<view class="lg-container">
		<uni-nav-bar left-icon="back" title="退出团队" @clickLeft="onLeftTap"></uni-nav-bar>
		<view class="patient_list">
			<mescroll-uni ref="mescrollRef" @init="mescrollInit" :fixed="false" @down="downCallback" @up="upCallback" :down="downOption" :up="upOption">
				<view class="patient_item" v-for="(item, index) in dataList" :key="item.id">
					<checkbox-group v-if="!item.isHandover" @change="selectChange($event, item.id)" class="patient_item_checkbox">
						<checkbox :value="String(item.id)" :checked="handleChecked(item.id)" color="#03A9AC" style="transform:scale(0.7)" />
					</checkbox-group>
					<view v-else class="checkNull"></view>
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
							<view v-if="item.isHandover" class="patient_item_box_info_handover"><image class="img" src="@/static/team/handover.png" alt=""></image></view>
							<view v-if="item.newSolutionId && !item.isHandover" class="patient_item_box_info_time">
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
								<progress
									:percent="progressNum(item.visitCourseNow, item.visitCourseCount)"
									border-radius="10"
									active
									backgroundColor="#DCDCDC"
									activeColor="#81D4D5"
									stroke-width="12"
								/>
								<text class="solution_process_num">{{ item.visitCourseNow }}/{{ item.visitCourseCount }}</text>
							</view>
						</view>
						<view v-else class="patient_item_box_operation">暂无随访计划</view>
					</view>
				</view>
			</mescroll-uni>
		</view>
		<view class="operationBox" v-if="dataList.length > 0">
			<view class="operationBox_left">
				<checkbox-group @change="selectAllChange" class="patient_item_checkbox">
					<checkbox value="0" :disabled="isDisabled()" :class="isDisabled() ? 'checkDisabled' : ''" :checked="isCheckedAll()" color="#03A9AC" style="transform:scale(0.7)" />
					全选
				</checkbox-group>
			</view>
			<view class="operationBox_right">
				<view class="selectBox">
					已选中：
					<text class="selectBox_num">{{ selectArr.length }}人</text>
				</view>
				<view class="handoverBtn" v-if="handoverArr.length === dataList.length" @tap="onSubmit">完成</view>
				<view class="handoverBtn" v-else @tap="onHandover">交接</view>
			</view>
		</view>
	</view>
</template>

<script>
import MescrollMixin from '@/components/mescroll-uni/mescroll-mixins.js';
import { mapGetters } from 'vuex';
import { getList } from '@/api/followUp';
import { quitTeam } from '@/api/team';
export default {
	mixins: [MescrollMixin],
	computed: {
		...mapGetters(['myInfo'])
	},
	data() {
		return {
			selectArr: [],
			handoverArr: [],
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
			keyWord: ''
		};
	},
	mounted() {
		if (uni.getStorageSync('selectArr')) {
			this.selectArr = uni.getStorageSync('selectArr');
		}
		if (uni.getStorageSync('handoverArr')) {
			this.handoverArr = uni.getStorageSync('handoverArr');
		}
	},
	// #ifndef H5
	onBackPress(options) {
		if (options.from === 'navigateBack') {
			return false;
		}
		this.onLeftTap()
		return false;
	},
	// #endif
	methods: {
		onLeftTap() {
			uni.removeStorageSync('handoverArr')
			uni.removeStorageSync('selectArr')
			uni.navigateBack({ delta: 1 });
		},
		// 单选
		selectChange(e, id) {
			let val = e.detail.value;
			if (val.length === 0) {
				this.selectArr.map((e, i) => {
					if (e.id === id) {
						this.selectArr.splice(i, 1);
					}
				});
			} else {
				this.dataList.map((e, i) => {
					if (e.id === id) {
						this.selectArr.push({
							id: e.id,
							toDoctorId: e.doctorUserId,
							toDoctorName: e.doctorName,
							teamId: e.teamId
						});
					}
				});
			}
		},
		// 全选
		selectAllChange(e) {
			let val = e.detail.value;
			if (val.length === 0) {
				this.selectArr = [];
			} else {
				const selectArr = [];
				this.dataList.map((e, i) => {
					if (!e.isHandover) {
						selectArr.push({
							id: e.id,
							toDoctorId: e.doctorUserId,
							toDoctorName: e.doctorName,
							teamId: e.teamId
						});
					}
				});
				this.selectArr = selectArr;
			}
		},
		upCallback(page) {
			const data = {
				current: 1,
				pageSize: 999,
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
				if (uni.getStorageSync('selectArr')) {
					this.selectArr = uni.getStorageSync('selectArr');
				} else {
					this.selectArr = [];
				}
				if (uni.getStorageSync('handoverArr')) {
					this.handoverArr = uni.getStorageSync('handoverArr');
				}
				if (this.handoverArr.length > 0) {
					this.handleIsHandover();
				}
			});
		},
		handleFilter(e) {
			this.keyWord = e.detail.value;
			this.mescroll.resetUpScroll();
		},
		handleIsHandover() {
			this.dataList.map(v => {
				let handoverArr = this.handoverArr.filter(e => e.id === v.id);
				if (handoverArr.length > 0) {
					v.isHandover = true;
				} else {
					v.isHandover = false;
				}
			});
		},
		// 判断是否选中
		handleChecked(id) {
			let isChecked = false;
			this.selectArr.map(e => {
				if (e.id === id) {
					isChecked = true;
				}
			});
			return isChecked;
		},
		// 是否全选
		isCheckedAll() {
			let dataList = [];
			this.dataList.map(e => {
				if (!e.isHandover) {
					dataList.push(e);
				}
			});
			return dataList.length === 0 ? false : dataList.length === this.selectArr.length;
		},
		// 是否禁用全选
		isDisabled() {
			let dataList = [];
			this.dataList.map(e => {
				if (!e.isHandover) {
					dataList.push(e);
				}
			});
			return dataList.length === 0;
		},
		// 选择交接的患者
		onHandover() {
			if (this.selectArr.length === 0) {
				this.$helper.toast('none', '请选择交接的患者');
				return false;
			}
			uni.setStorageSync('selectArr', this.selectArr);
			this.$helper.to('/pages/team/selectDoctor');
		},
		// 提交
		onSubmit() {
			this.$helper.loading();
			quitTeam({ teamPatientList: this.handoverArr }, res => {
				this.$helper.toast('success', '交接成功');
				uni.removeStorageSync('handoverArr');
				setTimeout(() => {
					this.$helper.to('/pages/components/submitStatus?type=0');
				}, 1000);
			});
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
<style lang="scss">
.checkDisabled {
	position: relative;
	&::after {
		content: '';
		position: absolute;
		left: 2rpx;
		top: 2rpx;
		display: block;
		width: 44rpx;
		height: 44rpx;
		background-color: rgba(0, 0, 0, 0.4);
	}
}
</style>
<style lang="scss" scoped>
.lg-container {
	.patient_list {
		width: 100vw;
		height: calc(100vh - 168rpx);
		// #ifndef H5
		height: calc(100vh - 216rpx);
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
			.checkNull {
				width: 60rpx;
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
					&_time {
						display: flex;
						flex-direction: column;
						justify-content: center;
						.box_time {
							margin: 4rpx 0;
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
	.operationBox {
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100vw;
		height: 80rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		background-color: #fff;
		padding: 0 40rpx;
		box-sizing: border-box;
		&_left {
			flex: 1;
		}
		&_right {
			display: flex;
			align-items: center;
			.selectBox {
				color: #333333;
				font-size: 24rpx;
				margin-right: 20rpx;
				&_num {
					color: #03a9ac;
				}
			}
			.handoverBtn {
				background-color: #03a9ac;
				color: #ffffff;
				font-size: 26rpx;
				text-align: center;
				width: 150rpx;
				height: 50rpx;
				line-height: 50rpx;
				border-radius: 10rpx;
			}
		}
	}
}
</style>
