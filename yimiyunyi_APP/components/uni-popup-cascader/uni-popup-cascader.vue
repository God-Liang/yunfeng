<template>
	<view v-if="showPopup" class="uni-popup">
		<view :class="[ani, animation ? 'ani' : '', !custom ? 'uni-custom' : '']" class="uni-popup__mask" @tap="close(true)" />
		<view :class="[type, ani, animation ? 'ani' : '', !custom ? 'uni-custom' : '']" class="uni-popup__wrapper" @tap="close(true)">
			<view class="uni-popup__wrapper-box" @click.stop="clear">
				<!-- 按钮组 -->
				<view class="lg-buttons">
					<view class="cancel" @tap="cancel"><text class="iconfont iconcha"></text></view>
					<view class="comfirm" @tap="comfirm"><text class="iconfont icondui"></text></view>
				</view>
				<!-- 没有数据的展示 -->
				<view v-if="list1.length == 0" class="no-data"><view class="nodata-title">暂无数据</view></view>
				<!-- 有数据时的多选组 -->
				<picker-view v-else class="lg-radio-box-group" :indicator-style="indicatorStyle" :value="selectVal" @change="selectChange">
					<picker-view-column>
						<view class="item" v-for="(item, index) in list1" :key="index">{{ item[prop.key] }}</view>
					</picker-view-column>
					<picker-view-column>
						<view class="item" v-for="(item, index) in list2" :key="index">{{ item[prop.key] }}</view>
					</picker-view-column>
				</picker-view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	name: 'UniPopup',
	props: {
		// 开启动画
		animation: {
			type: Boolean,
			default: true
		},
		// 弹出层类型，可选值，top: 顶部弹出层；bottom：底部弹出层；center：全屏弹出层
		type: {
			type: String,
			default: 'bottom'
		},
		// 是否开启自定义
		custom: {
			type: Boolean,
			default: false
		},
		// maskClick
		maskClick: {
			type: Boolean,
			default: false
		},
		show: {
			type: Boolean,
			default: false
		},
		// 渲染的数据
		list: {
			type: Array,
			default: function() {
				return [];
			}
		},
		// 默认值
		value: [String, Number],
		label: [String, Number],
		prop: {
			type: Object,
			default: function() {
				return {
					key: 'label',
					value: 'value',
					children: 'children'
				};
			}
		}
	},
	data() {
		return {
			ani: '',
			showPopup: false,
			selectVal: [],
			selectLabel: [],
			list2: [],
			indicatorStyle: `height: ${Math.round(uni.getSystemInfoSync().screenWidth / (750 / 100))}px;`
		};
	},
	watch: {
		show(newValue) {
			if (newValue) {
				this.open();
			} else {
				this.close();
			}
		}
	},
	mounted() {},
	computed: {
		list1() {
			let list1 = this.list;
			return list1;
		},
		selectValue() {
			let selectValue1 = this.value || null
			return selectValue1
		},
		defaultLabel() {
			let defaultLabel1 = this.label || null
			return defaultLabel1
		}
	},
	methods: {
		clear() {},
		open() {
			this.$emit('change', {
				show: true
			});
			this.showPopup = true;
			this.$nextTick(() => {
				setTimeout(() => {
					this.ani = 'uni-' + this.type;
					this.handlerList();
				}, 30);
			});
		},
		close(type) {
			if (!this.maskClick && type) return;
			this.$emit('change', {
				show: false
			});
			this.ani = '';
			this.$nextTick(() => {
				setTimeout(() => {
					this.showPopup = false;
				}, 300);
			});
		},
		handlerList() {
			if (this.list1.length > 0) {
				if (this.selectValue || this.selectValue === 0) {
					this.list1.map((e1, i1) => {
						if (e1[this.prop.children] && e1[this.prop.children].length > 0) {
							e1[this.prop.children].map((e2, i2) => {
								if (e2[this.prop.value] === this.selectValue) {
									this.list2 = e1[this.prop.children]
									this.selectVal = [i1, i2]
								}
							});
						} else {
							if (e1[this.prop.value] === this.selectValue) {
								this.list2 = []
								this.selectVal = [i1, 0]
							}
						}
					});
				} else {
					this.list2 = this.list1[0][this.prop.children]
					this.selectVal = [0, 0]
				}
				if (this.defaultLabel || this.defaultLabel === 0) {
					this.list1.map((e1, i1) => {
						if (e1[this.prop.children] && e1[this.prop.children].length > 0) {
							e1[this.prop.children].map((e2, i2) => {
								if (e2[this.prop.key] === this.defaultLabel) {
									this.list2 = e1[this.prop.children]
									this.selectVal = [i1, i2]
								}
							});
						} else {
							if (e1[this.prop.key] === this.defaultLabel) {
								this.list2 = []
								this.selectVal = [i1, 0]
							}
						}
					});
				} else {
					this.list2 = this.list1[0][this.prop.children]
					this.selectVal = [0, 0]
				}
			}
		},
		selectChange(e) {
			const val = e.detail.value
			if (val[0] === this.selectVal[0]) {
				this.selectVal = val
			} else {
				if (this.list1[val[0]][this.prop.children]) {
					this.selectVal = [val[0], 0]
					this.list2 = this.list1[val[0]][this.prop.children]
				} else {
					this.selectVal = [val[0], 0]
					this.list2 = []
				}
			}
		},
		// 取消
		cancel() {
			this.close();
			const cancelData = {
				key: this.cancelLabel(),
				value: this.cancelValue()
			}
			this.$emit('cancel', cancelData);
		},
		cancelLabel() {
			let label = ''
			if (this.defaultLabel || this.defaultLabel === 0) {
				label = this.defaultLabel
			} else {
				this.list1.map((e1, i1) => {
					// 存在二级列表
					if (e1[this.prop.children] && e1[this.prop.children].length > 0) {
						e1[this.prop.children].map((e2, i2) => {
							if (e2[this.prop.value] === this.selectValue) {
								label = e2[this.prop.key]
							}
						});
					} else {
						if (e1[this.prop.value] === this.selectValue) {
							label = e1[this.prop.key]
						}
					}
				});
			}
			return label
		},
		cancelValue() {
			let value = ''
			if (this.selectValue || this.selectValue === 0) {
				value = this.selectValue
			} else {
				this.list1.map((e1, i1) => {
					if (e1[this.prop.children] && e1[this.prop.children].length > 0) {
						e1[this.prop.children].map((e2, i2) => {
							if (e2[this.prop.key] === this.defaultLabel) {
								value = e2[this.prop.value]
							}
						});
					} else {
						if (e1[this.prop.key] === this.defaultLabel) {
							value = e1[this.prop.value]
						}
					}
				});
			}
			return value
		},
		// 确定
		comfirm() {
			this.close();
			let comfirmData = this.handlerIndex()
			this.$emit('comfirm', comfirmData);
		},
		// 单选通过索引index获取值
		handlerIndex() {
			const data = {
				key: '',
				value: null
			}
			this.list1.map((e1, i1) => {
				if (this.selectVal[0] === i1) {
					if (e1[this.prop.children] && e1[this.prop.children].length > 0) {
						e1[this.prop.children].map((e2, i2) => {
							if (this.selectVal[1] === i2) {
								data.key = e2[this.prop.key]
								data.value = e2[this.prop.value]
							}
						})
					} else {
						data.key = e1[this.prop.key]
						data.value = e1[this.prop.value]
					}
				}
			})
			return data
		},
	}
};
</script>
<style lang="scss">
.uni-popup {
	position: fixed;
	//  #ifdef  H5  */
	// top: 0px;
	// // top: 50px;
	// /*  #endif  */
	// /*  #ifndef  H5  */
	// top: 0px;
	// /*  #endif
	top: 0px;
	bottom: 0;
	left: 0;
	right: 0;
	z-index: 998;
	overflow: hidden;

	&__mask {
		position: absolute;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		z-index: 998;
		background: rgba(0, 0, 0, 0.4);
		opacity: 0;

		&.ani {
			transition: all 0.3s;
		}

		&.uni-top,
		&.uni-bottom,
		&.uni-center {
			opacity: 1;
		}
	}

	&__wrapper {
		position: absolute;
		z-index: 999;
		box-sizing: border-box;

		&.ani {
			transition: all 0.3s;
		}

		&.top {
			top: 0;
			left: 0;
			width: 100%;
			transform: translateY(-100%);
		}

		&.bottom {
			bottom: 0;
			left: 0;
			width: 100%;
			transform: translateY(100%);
		}

		&.center {
			width: 100%;
			height: 100%;
			display: flex;
			justify-content: center;
			align-items: center;
			transform: scale(1.2);
			opacity: 0;
		}

		&-box {
			position: relative;
			box-sizing: border-box;
		}

		&.uni-custom {
			& .uni-popup__wrapper-box {
				background: #fff;
			}

			&.center {
				& .uni-popup__wrapper-box {
					position: relative;
					max-width: 80%;
					max-height: 80%;
					overflow-y: scroll;
				}
			}

			&.top,
			&.bottom {
				& .uni-popup__wrapper-box {
					width: 100%;
					max-height: 600px;
					overflow-y: scroll;
				}
			}
		}

		&.uni-top,
		&.uni-bottom {
			transform: translateY(0);
		}

		&.uni-center {
			transform: scale(1);
			opacity: 1;
		}
	}
}
.lg-check-box-group {
	padding: 30rpx 40rpx;
	width: 100%;
	box-sizing: border-box;
	display: flex;
	flex-wrap: wrap;
	height: 400rpx;
	overflow: auto;
}
.lg-radio-box-group {
	height: 400rpx;
	.item {
		text-align: center;
		height: 100rpx;
		line-height: 100rpx;
		color: #333333;
		font-size: 32rpx;
	}
}
</style>

<style lang="scss" scoped>
.lg-buttons {
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 30rpx 40rpx;
	font-family: 'Microsoft YaHei';
	font-size: 36rpx;
	border-bottom: 1rpx solid #f5f5f5;
	.cancel {
		color: #888888;
		.iconfont {
			font-size: 32rpx;
		}
	}
	.comfirm {
		color: #03a9ac;
		.iconfont {
			font-size: 32rpx;
		}
	}
}
.lg-check-box-group {
	.lg-check-box-item {
		width: 100%;
		font-size: 30rpx;
		height: 60rpx;
		line-height: 60rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		&.lg-check-box-active {
			.lg-check-box-text {
				color: #03a9ac;
			}
			.lg-check-box-select_ed {
				display: block;
			}
		}
		.lg-check-box-text {
			color: #333333;
		}
		.lg-check-box-select_ed {
			color: #03a9ac;
			display: none;
		}
	}
}
.no-data {
	text-align: center;
	min-height: 400rpx;
	display: flex;
	width: 100%;
	.nodata-title {
		width: 100%;
		font-size: 30rpx;
		color: #888888;
		padding-top: 150rpx;
	}
}
// 过滤
.lg-filters {
	width: 670rpx;
	border: 2rpx solid #dcdcdc;
	margin: 30rpx auto;
	border-radius: 10rpx;
	padding: 5rpx 0;
	box-sizing: border-box;
	display: flex;
	flex-wrap: wrap;
	position: relative;
	min-height: 60rpx;
	.lg-select-tags {
		display: inline-block;
		.lg-select-tag {
			display: inline-flex;
			padding: 4rpx 16rpx;
			background: rgba(238, 238, 238, 1);
			border-radius: 5px;
			margin: 5rpx 0 5rpx 10rpx;
			height: 44rpx;
			box-sizing: border-box;
			align-items: center;
			.lg-selct-tag-text {
				color: #888888;
				font-size: 24rpx;
				line-height: 24rpx;
			}
			.lg-selct-tag-close {
				margin-left: 15rpx;
				color: #888888;
				font-size: 16rpx;
				line-height: 30rpx;
				display: inline-block;
				width: 30rpx;
				height: 30rpx;
				text-align: center;
				border-radius: 50%;
				background-color: #dcdcdc;
			}
		}
	}
	.lg-select-input {
		display: inline-block;
		height: 44rpx;
		line-height: 44rpx;
		margin: 5rpx 0 5rpx 10rpx;
		font-size: 28rpx;
		color: #333333;
	}
	.lg-select-search {
		position: absolute;
		right: 0;
		top: 50%;
		color: #888888;
		font-size: 32rpx;
		transform: translateY(-50%);
		padding: 0 24rpx 0 10rpx;
	}
}
</style>
