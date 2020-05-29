<template>
	<view class="lg-container">
		<uni-nav-bar :left-icon="leftIcon" :title="title" :left-text="leftText" :right-text="topBtnText" @clickLeft="onLeftTap" @clickRight="sendBtn"></uni-nav-bar>
		<uni-search-bar placeholder="搜索量表名称" @input="handleFilter"></uni-search-bar>
		<view class="lg_list">
			<mescroll-uni @down="downCallback" :up="upOption" @up="upCallback" :fixed="false" @init="mescrollInit">
				<checkbox-group class="ulBox checkBoxList" @change="selectOption">
					<label v-for="item in list" :key="item.id" class="liBox flexBox flexRow" :style="{ background: id == 1 ? '#f4f4f4' : 'none' }" @tap="singlSend(item)">
						<checkbox v-if="isCheckbox" :class="item.isSendWeChat === 1 ? 'disabled' : ''" :disabled="item.isSendWeChat === 1" :value="item.phone" style="transform:scale(0.7)" />
						<view class="text flex1">
							<view class="userInfo">
								<text class="name">{{ item.patientName }}</text>
								<text class="sex">{{ item.sex }}</text>
								<text class="age">{{ item.age }}岁</text>
								<text class="subject">{{ item.formTypeShow }}</text>
								<text class="date">{{ item.createTime | parseTime('{y}-{m}-{d}') }}</text>
							</view>
							<view class="plan">
								{{ item.name }}
								<text class="status status1" v-if="topBtn == 2 && item.isSendWeChat === 0">未提醒</text>
								<text class="status status2" v-if="topBtn == 2 && item.isSendWeChat === 1">已提醒</text>
							</view>
						</view>
					</label>
				</checkbox-group>
			</mescroll-uni>
		</view>
		<uni-popup ref="remindRef" type="bottom" class="bottomScreen" @change="onChange">
			<view class="lg-footer">
				<button class="primary" @tap="onNote">短信提醒</button>
				<button class="primary" @tap="onPhone">电话提醒</button>
			</view>
		</uni-popup>
	</view>
</template>

<script>
import MescrollMixin from '@/components/mescroll-uni/mescroll-mixins.js';
import { getScaleList } from '@/api/followUp';
import { noticeSend } from '@/api/system';
export default {
	mixins: [MescrollMixin],
	data() {
		return {
			title: '',
			// 1 短信群发  2 发送 状态
			topBtn: '',
			// 1 短信群发  2 发送 文字
			topBtnText: '',
			leftIcon: 'back',
			leftText: '',
			// 是否显示复选框
			isCheckbox: false,
			selectList: [],
			bottomStyle: false,
			id: '',
			phone: '',
			apiName: '/AppScaleType/getFinishPage',
			keyWord: '',
			mescroll: null, //mescroll实例对象
			upOption: {
				page: {
					num: 0, // 当前页码,默认0,回调之前会加1,即callback(page)会从1开始
					size: 10, // 每页数据的数量
					time: null // 加载第一页数据服务器返回的时间; 防止用户翻页时,后台新增了数据从而导致下一页数据重复;
				},
				noMoreSize: 5, // 如果列表已无数据,可设置列表的总数量要大于等于5条才显示无更多数据;避免列表数据过少(比如只有一条数据),显示无更多数据会不好看
				empty: {
					use: true, // 是否显示空布局
					icon: '', // 图标路径
					tip: '-- 暂无相关数据 --', // 提示
					btnText: '' // 按钮
				},
				onScroll: true // 是否监听滚动事件, 默认false (配置为true时,可@scroll="scroll"获取到滚动条位置和方向)
			},
			list: [] //列表数据
		};
	},
	onLoad(option) {
		this.topBtn = parseInt(option.topBtn);
		if (option.topBtn == 0) {
			this.title = '待完成量表';
			this.apiName = 'AppScaleType/getNoFinishPage';
		} else if (option.topBtn == 1) {
			this.title = '已收到量表';
			this.apiName = 'AppScaleType/getFinishPage';
		} else if (option.topBtn == 2) {
			this.title = '未按时提交量表';
			this.topBtnText = '短信群发';
			this.apiName = 'AppScaleType/getoverTimePage';
		} else {
			this.topBtn = 0;
			this.title = '待完成量表';
			this.apiName = 'AppScaleType/getNoFinishPage';
		}
	},
	mounted() {},
	methods: {
		onLeftTap() {
			if (this.isCheckbox) {
				this.isCheckbox = false;
				this.topBtnText = '短信群发';
				this.leftText = '';
				this.leftIcon = 'back';
				this.mescroll.resetUpScroll();
			} else {
				uni.navigateBack({ delta: 1 });
			}
		},
		onChange(e) {
			this.bottomStyle = e.show;
		},
		// 点击群发 + 选好对象后 点击发送
		sendBtn() {
			// 群发出多选，顶部‘群发’变‘多发送’
			if (this.topBtn === 2 && !this.isCheckbox) {
				if (this.list.length === 0) {
					this.$helper.toast('none', '暂时没有量表需要短信群发');
					return false;
				}
				this.isCheckbox = true;
				this.$refs.remindRef.close()
				this.topBtnText = '发送';
				this.leftText = '取消';
				this.leftIcon = '';
			} else if (this.topBtn === 2 && this.isCheckbox) {
				if (this.selectList.length === 0) {
					this.$helper.toast('none', '请先选择群发对象');
					return false;
				} else {
					this.$helper.loading('发送中');
					const data = {
						phone: this.selectList ? this.selectList.join(',') : ''
					};
					noticeSend(data, res => {
						this.$helper.toast('success', '发送成功');
						this.isCheckbox = false;
						this.topBtnText = '短信群发';
						this.leftText = '';
						this.leftIcon = 'back';
						this.list = [];
						this.mescroll.resetUpScroll();
						this.$ref.remindRef.close()
					});
				}
			}
		},
		// 点击群发后 选择群发对象
		selectOption(val) {
			this.selectList = val.detail.value;
			// if (val.detail.value.length === 0) return false
			this.topBtnText = `发送(${this.selectList.length})`;
		},
		// 点击单个
		singlSend(data) {
			// 发送者id参数要带
			if (this.topBtn === 2) {
				if (this.isCheckbox) {
					return true;
				} else {
					if (data.isSendWeChat === 0) {
						this.$ref.remindRef.open()
						this.id = data.id;
						this.phone = data.phone;
					} else {
						this.$helper.toast('none', '该量表已提醒');
					}
				}
			} else {
				this.$helper.to('/pages/components/details?id=' + data.id + '&isPlan=1')
			}
		},
		// 短信提醒
		onNote() {
			this.$helper.loading('发送中');
			const data = {
				phone: this.phone
			};
			noticeSend(data, res => {
				this.$helper.toast('success', '发送成功');
				this.mescroll.resetUpScroll();
			});
		},
		// 电话提醒
		onPhone() {
			uni.makePhoneCall({
				phoneNumber: this.phone,
				success: () => {},
				fail: () => {}
			});
		},
		handleFilter(e) {
			this.keyWord = e.value;
			this.mescroll.resetUpScroll();
		},
		upCallback(page) {
			const data = {
				current: 1,
				pageSize: 999,
				name: this.keyWord
			};
			getScaleList(this.apiName, data, res => {
				let curPageData = res.data.list;
				let curPageLen = curPageData.length;
				let totalSize = res.data.total;
				this.total = res.data.total;
				if (page.num == 1) this.list = [];
				this.list = this.list.concat(curPageData);
				this.mescroll.endBySize(curPageLen, totalSize);
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
		.checkBoxList {
			background: #fff;
			.liBox {
				padding: 20rpx 40rpx;
				border-bottom: 1px solid #f4f4f4;
				display: block;
				&.last-child {
					border: none;
				}
				.image {
					width: 80rpx;
					height: 80rpx;
					border-radius: 40rpx;
					border: 1px solid #f4f4f4;
					margin-right: 20rpx;
					margin-left: 10rpx;
				}
				.text {
					// width: calc(100vw - 200rpx);
					.userInfo {
						.name {
							font-size: 30rpx;
						}
						.age {
							font-size: 24rpx;
							color: #888;
							margin: 0 20rpx;
						}
						.sex {
							margin-left: 20rpx;
							color: #888888;
							font-size: 24rpx;
						}
						.subject {
							color: #fff;
							line-height: 30rpx;
							background: #81d4d5;
							font-size: 20rpx;
							border-radius: 20rpx;
							padding: 0 20rpx;
						}
						.date {
							float: right;
							marghin-top: 0;
							color: #888888;
							font-size: 24rpx;
						}
					}
					.plan {
						color: #888;
						font-size: 24rpx;
						margin-top: 10rpx;
						line-height: 32rpx;
						height: 32rpx;
						.status {
							padding: 5rpx 10rpx;
							border: 2rpx solid #888;
							float: right;
							line-height: 22rpx;
						}
						.status2 {
							border-color: #fdbb59;
							color: #fdbb59;
						}
					}
				}
			}
		}
	}
	.bottomScreen {
		top: 0;
		z-index: 9999;
		.lg-footer {
			padding: 30rpx 40rpx;
			width: 100%;
			box-sizing: border-box;
			.primary {
				margin: 20rpx 0;
			}
		}
	}
}
</style>
