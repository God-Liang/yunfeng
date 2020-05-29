<template>
	<view v-if="showPopup" class="uni-popup">
		<view :class="[ani, animation ? 'ani' : '', !custom ? 'uni-custom' : '']" class="uni-popup__mask" @tap="close(true)" />
		<view :class="[type, ani, animation ? 'ani' : '', !custom ? 'uni-custom' : '']" class="uni-popup__wrapper" @tap="close(true)">
			<view class="uni-popup__wrapper-box" @click.stop="clear">
				<!-- 按钮组 -->
				<view class="lg-buttons">
					<view class="cancel" @tap="cancel">
						<text class="iconfont iconcha"></text>
					</view>
					<view class="comfirm" @tap="comfirm">
						<text class="iconfont icondui"></text>
					</view>
				</view>
				<!-- 过滤条件 -->
				<view v-if="filters || remote" class="lg-filters" @tap="handlerFocus">
					<view v-if="multiple" class="lg-select-tags">
						<view class="lg-select-tag" v-for="(label, index) in selectLabel" :key="index">
							<text class="lg-selct-tag-text">{{label}}</text>
							<text class="lg-selct-tag-close iconfont iconcha" @tap="handlerClose(index)"></text>
						</view>
					</view>
					<input class="lg-select-input" :style="inputStyle" @blur="inputBlur" @input="selectInput" :focus="selectFocus" type="text" />
					<text class="lg-select-search iconfont iconsousuo-m"></text>
				</view>
				<!-- 没有数据的展示 -->
				<view v-if="formData1.length == 0" class="no-data"><view class="nodata-title">暂无数据</view></view>
				<block v-else>
					<!-- 有数据时的单选组 -->
					<picker-view v-if="!multiple && !filters" class="lg-radio-box-group" :indicator-style="indicatorStyle" :value="selectVal" @change="selectChange">
						<picker-view-column>
							<view class="item" v-for="(item, index) in formData1" :key="index">{{ item[prop.key] }}</view>
						</picker-view-column>
					</picker-view>
					<!-- 有数据时的多选组 -->
					<scroll-view v-else scroll-y>
						<view class="lg-check-box-group">
							<view
								class="lg-check-box-item"
								:class="remote ? (selectLabel.indexOf(item[prop.key]) >= 0 ? 'lg-check-box-active' : '') : (selectVal.indexOf(item[prop.value]) >= 0 ? 'lg-check-box-active' : '')"
								@tap="change(item)"
								v-for="(item, index) in formData1"
								:key="index"
							>
								<text class="lg-check-box-text">{{ item[prop.key] }}</text>
								<text class="lg-check-box-select_ed iconfont icondui"></text>
							</view>
						</view>
					</scroll-view>
				</block>
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
		// 是否可以过滤
		filters: {
			type: Boolean,
			default: false
		},
		// 是否可以多选
		multiple: {
			type: Boolean,
			default: false
		},
		// 是否是远程搜索
		remote: {
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
		max: {
			type: Number,
			default: null
		},
		// 默认值
		value: [String, Number, Object, Array],
		//默认
		label: [String, Number, Object, Array],
		prop: {
			type: Object,
			default: function() {
				return {
					key: 'valueCn',
					value: 'key'
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
			selectObj: {},
			selectFocus: true,
			inputStyle: '',
			indicatorStyle: `height: ${Math.round(uni.getSystemInfoSync().screenWidth / (750 / 100))}px;`,
		};
	},
	created() {
		
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
	mounted() {
		
	},
	computed: {
		formData1() {
			let formData1 = this.list;
			return formData1;
		},
		selectValue() {
			let selectValue1 = []
			switch (typeof (this.value)){
				case 'string':
					selectValue1 = this.value ? this.value.split(',') : []
					break;
				case 'number':
					selectValue1 = [this.value]
					break;
				case 'object':
					if (this.value === null) {
						selectValue1 = []
					} else {
						selectValue1 = this.value
					}
					break;
				default:
					selectValue1 = []
					break;
			}
			return selectValue1
		},
		defaultLabel() {
			let defaultLabel1 = []
			switch (typeof (this.label)){
				case 'string':
					defaultLabel1 = this.label ? this.label.split(',') : []
					break;
				case 'number':
					defaultLabel1 = [this.label]
					break;
				case 'object':
					if (this.label === null) {
						defaultLabel1 = []
					} else {
						defaultLabel1 = this.label
					}
					break;
				default:
					defaultLabel1 = []
					break;
			}
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
					if (this.filters || this.multiple || this.remote) {
						this.handlerMore()
					} else {
						this.handlerOne()
					}
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
		// 初始化单选(存索引)
		handlerOne() {
			if (this.selectValue.length > 0) {
				this.formData1.map((v, i) => {
					if (this.selectValue.indexOf(v[this.prop.value]) >= 0) {
						this.selectVal = [i]
					}
				})
			} else {
				this.selectVal = [0]
			}
		},
		// 初始化多选(存值)
		handlerMore() {
			// 多选初始化输入框宽度
			if (this.multiple) {
				this.inputStyle = 'width: 0px;'
			}
			// 远程搜索
			if (this.remote) {
				this.selectLabel = [].concat(this.defaultLabel)
				this.selectVal = [].concat(this.selectValue)
			} else {
				const selectLabel = []
				const selectVal = []
				this.formData1.map((e, i) => {
					if (this.selectValue.length > 0) {
						if (this.selectValue.indexOf(e[this.prop.value]) >= 0) {
							selectLabel.push(e[this.prop.key])
							selectVal.push(e[this.prop.value])
						}
					} else {
						if (this.defaultLabel.indexOf(e[this.prop.key]) >= 0) {
							selectLabel.push(e[this.prop.key])
							selectVal.push(e[this.prop.value])
						}
					}
				});
				this.selectLabel = selectLabel
				this.selectVal = selectVal
			}
			setTimeout(() => {
				if (this.filters && this.multiple) {
					this.handlerInputWidth()
				}
			}, 300)
		},
		// 不带过滤条件的单选监听事件
		selectChange(e) {
			this.selectVal = e.detail.value
		},
		// 带过滤条件的监听事件
		change(val) {
			// 是否支持多选
			if (this.multiple) {
				// 是否是远程搜索
				if (this.remote) {
					if (this.selectLabel.indexOf(val[this.prop.key]) >= 0) {
						this.selectLabel.map((v, i) => {
							if (v === val[this.prop.key]) {
								this.selectVal.splice(i, 1);
								this.selectLabel.splice(i, 1);
							}
						});
					} else {
						if (this.max) {
							if (this.selectVal.length === this.max || this.selectLabel.length === this.max) {
								uni.showModal({
									title: '提示',
									content: '最多选择' + this.max + '个',
									showCancel: false,
									confirmColor: '#03A9AC',
									success: function(res) {}
								});
							} else {
								// this.selectVal.push(val[this.prop.value]);
								this.selectLabel.push(val[this.prop.key])
							}
						}
					}
				} else {
					if (this.selectVal.indexOf(val[this.prop.value]) >= 0) {
						this.selectVal.map((v, i) => {
							if (v === val[this.prop.value]) {
								this.selectVal.splice(i, 1);
							}
						});
						this.handlerLabel()
					} else {
						if (this.max && this.selectVal.length === this.max) {
							uni.showModal({
								title: '提示',
								content: '最多选择' + this.max + '个',
								showCancel: false,
								confirmColor: '#03A9AC',
								success: function(res) {}
							});
						} else {
							this.selectVal.push(val[this.prop.value]);
							this.handlerLabel()
						}
					}
				}
			} else {
				this.selectVal = [val[this.prop.value]]
				this.handlerLabel()
			}
		},
		// 多选删除选项
		handlerClose(index) {
			this.selectVal.splice(index, 1);
			this.selectLabel.splice(index, 1);
		},
		// 获取焦点
		handlerFocus() {
			this.selectFocus = true
		},
		// 失去焦点
		inputBlur() {
			this.selectFocus = false
		},
		// 过滤输入框改变值
		selectInput(e) {
			this.$emit('input', {
				value: e.detail.value
			});
		},
		// 通过value获取key
		handlerLabel() {
			// 多选初始化输入框宽度
			if (this.multiple && this.remote) {
				this.inputStyle = 'width: 0px;'
			}
			const selectLabel = []
			this.selectVal.map((v, i) => {
				if (this.formData1.filter(e => e[this.prop.value] === v).length > 0) {
					const selectObj = this.formData1.filter(e => e[this.prop.value] === v)[0]
					selectLabel.push(selectObj[this.prop.key])
				}
			})
			this.selectLabel = selectLabel
			setTimeout(() => {
				if (this.remote && this.multiple) {
					this.handlerInputWidth()
				}
			}, 300)
		},
		// 单选通过索引index获取值
		handlerIndex() {
			const data = {
				key: '',
				value: null,
				data: {}
			}
			this.formData1.map((v, i) => {
				if (this.selectVal.indexOf(i) >= 0) {
					data.key = v[this.prop.key]
					data.value = v[this.prop.value]
					data.data = v
				}
			})
			return data
		},
		// 单选通过索引value获取值
		handlerValue() {
			const data = {
				key: '',
				value: null,
				data: {}
			}
			this.formData1.map((v, i) => {
				if (this.selectValue.indexOf(v[this.prop.value]) >= 0) {
					data.key = v[this.prop.key]
					data.value = v[this.prop.value]
					data.data = v
				}
			})
			return data
		},
		// 单选通过key/value获取Obj
		handlerObj(selectLabel) {
			const selectObj = []
			if (selectLabel.length === 0) {
				this.formData1.map((v, i) => {
					if (this.selectValue.indexOf(v[this.prop.value]) >= 0) {
						selectObj.push(v)
					}
				})
			} else {
				this.formData1.map((v, i) => {
					if (selectLabel.indexOf(v[this.prop.key]) >= 0) {
						selectObj.push(v)
					}
				})
			}
			return selectObj
		},
		// 获取输入框的宽度
		handlerInputWidth() {
			let filterWidth, tagsWidth, inputWidth, searchWidth;
			let filtersInfo = uni.createSelectorQuery().select(".lg-filters");
				filtersInfo.boundingClientRect(function(filtersData) {
					// 过滤盒子宽度
					filterWidth = filtersData.width
					let searchInfo = uni.createSelectorQuery().select(".lg-select-search");
						searchInfo.boundingClientRect(function(searchData) {
						// 搜索图标宽度
						searchWidth = searchData.width
					}).exec()
					let tagsInfo = uni.createSelectorQuery().select(".lg-select-tags");
						tagsInfo.boundingClientRect(function(tagsData) {
						// 选中宽度
						tagsWidth = tagsData.width
						if (tagsWidth >= filterWidth - searchWidth - 60) {
							inputWidth = filterWidth
						} else {
							inputWidth = filterWidth - tagsWidth - searchWidth - 10
						}
					}).exec()
			}).exec()
			if (inputWidth === filterWidth) {
				this.inputStyle = 'width:' + (inputWidth-searchWidth-10) + 'px;'
			} else {
				this.inputStyle = 'width:' + inputWidth + 'px'
			}
		},
		// 取消
		cancel() {
			this.close();
			let cancelData = {}
			if (!this.multiple && !this.filters) {
				cancelData = this.handlerValue()
			} else {
				cancelData = {
					key: this.defaultLabel,
					value: this.selectValue,
					data: this.handlerObj(this.defaultLabel)
				}
			}
			this.$emit('cancel', cancelData);
		},
		// 确定
		comfirm() {
			this.close();
			let comfirmData = {}
			if (!this.multiple && !this.filters) {
				comfirmData = this.handlerIndex()
			} else {
				comfirmData = {
					key: this.selectLabel,
					value: this.selectVal,
					data: this.handlerObj(this.selectLabel)
				}
			}
			this.$emit('comfirm', comfirmData);
		}
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
			color: #03A9AC;
			.iconfont {
				font-size: 32rpx;
			}
		}
	}
	.lg-check-box-group {
		.lg-check-box-item {
			width: 100%;
			font-size: 28rpx;
			height: 80rpx;
			line-height: 36rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			&.lg-check-box-active {
				.lg-check-box-text {
					color: #03A9AC;
				}
				.lg-check-box-select_ed {
					display: block;
				}
			}
			.lg-check-box-text {
				max-width: 540rpx;
				color: #333333;
			}
			.lg-check-box-select_ed {
				color: #03A9AC;
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
		border: 2rpx solid #DCDCDC;
		margin: 30rpx auto;
		border-radius: 10rpx;
		padding: 5rpx 66rpx 5rpx 0;
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
				background:rgba(238,238,238,1);
				border-radius:5px;
				margin: 5rpx 0 5rpx 10rpx;
				min-height: 44rpx;
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
					background-color: #DCDCDC;
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
