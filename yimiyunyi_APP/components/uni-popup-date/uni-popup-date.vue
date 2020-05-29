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
				<!-- 有数据时的多选组 -->
				<picker-view class="lg-date-box-group" :indicator-style="indicatorStyle" :value="valueTime" @change="bindChange">
					<picker-view-column>
						<view class="item" v-for="(item, index) in years" :key="index">{{ item }}年</view>
					</picker-view-column>
					<picker-view-column>
						<view class="item" v-for="(item, index) in months" :key="index">{{ item }}月</view>
					</picker-view-column>
					<picker-view-column>
						<view class="item" v-for="(item, index) in days" :key="index">{{ item }}日</view>
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
			default: true
		},
		show: {
			type: Boolean,
			default: true
		},
		// 时间格式
		fmtStr: {
			type: String,
			default: 'yyyy-MM-dd'
		},
		// 开始时间
		start: {
			type: String,
			default: ''
		},
		// 结束时间
		end: {
			type: String,
			default: ''
		},
		// 时间值
		time: {
			type: String,
			default: ''
		}
	},
	data() {
		return {
			ani: '',
			showPopup: false,
			valueTime: [0,0,0],
			indicatorStyle: `height: ${Math.round(uni.getSystemInfoSync().screenWidth / (750 / 100))}px;`
		};
	},
	computed: {
		years() {
			let min = new Date().getFullYear() - 100;
			let max = new Date().getFullYear() + 100;
			const years = [];
			if (this.start) {
				min = new Date(this.start).getFullYear();
			}
			if (this.end) {
				max = new Date(this.end).getFullYear();
			}
			for (let i = min; i <= max; i++) {
				years.push(i);
			}
			return years;
		},
		months() {
			const months = [];
			for (let i = 1; i <= 12; i++) {
				months.push(i);
			}
			return months;
		},
		days() {
			const days = [];
			for (let i = 1; i <= 31; i++) {
				days.push(i);
			}
			return days;
		}
	},
	watch: {
		show(newValue) {
			if (newValue) {
				this.open();
			} else {
				this.close();
			}
		},
		time(newValue) {
			this.getTimeVal();
		}
	},
	created() {},
	mounted() {
		this.getTimeVal();
	},
	methods: {
		clear() {},
		open() {
			this.$emit('change', {
				show: true
			});
			this.showPopup = true;
			this.getTimeVal();
			this.$nextTick(() => {
				setTimeout(() => {
					this.ani = 'uni-' + this.type;
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
		bindChange: function(e) {
			const val = e.detail.value;
			this.handlerMonthDay(val);
		},
		cancel() {
			this.close();
			this.$emit('cancel', this.getCurrent(this.fmtStr, this.time));
		},
		comfirm() {
			const year = this.years[this.valueTime[0]]
			const month = this.months[this.valueTime[1]]
			const day = this.days[this.valueTime[2]]
			const comfirmTime = year+ '-' + month + '-' + day
			this.close();
			this.$emit('comfirm', this.getCurrent(this.fmtStr, comfirmTime));
		},
		// 处理月日
		handlerMonthDay(val) {
			// 最小时间,最大时间索引
			let YearIndex, MonthIndex, DayIndex;
			YearIndex = val[0]
			if (YearIndex === 0) { // 最小年份
				const pre = new Date();
				pre.setFullYear(pre.getFullYear()-100);
				const start = this.start ? this.start : pre
				const minMonthIndex = new Date(start).getMonth() + 1 - 1;
				MonthIndex = val[1] < minMonthIndex ? minMonthIndex : val[1];
				if (MonthIndex === minMonthIndex) { // 最小月份
					const minDayIndex = new Date(start).getDate() - 1;
					DayIndex = val[2] < minDayIndex ? minDayIndex : val[2];
				} else {
					DayIndex = val[2]
				}
			} else if (YearIndex === this.years.length - 1) { // 最大年份
				const next = new Date();
				next.setFullYear(next.getFullYear()+100);
				const end = this.end ? this.end : next
				const maxMonthIndex = new Date(end).getMonth() + 1 - 1;
				MonthIndex = val[1] > maxMonthIndex ? maxMonthIndex : val[1];
				if (MonthIndex === maxMonthIndex) { // 最大月份
					const maxDayIndex = new Date(end).getDate() - 1;
					DayIndex = val[2] > maxDayIndex ? maxDayIndex : val[2];
				} else {
					DayIndex = val[2]
				}
			} else {
				MonthIndex = val[1]
				DayIndex = val[2]
			}
			this.valueTime = [0,0,0]
			setTimeout(() => {
				this.valueTime = [YearIndex, MonthIndex, DayIndex]
			}, 0)
		},
		// 获取time的索引
		getTimeVal() {
			const date = this.time ? new Date(this.time) : new Date();
			const year = date.getFullYear();
			const month = date.getMonth() + 1;
			const day = date.getDate();
			this.years.map((v, i) => {
				if (v === year) {
					this.valueTime[0] = i;
				}
			});
			this.months.map((v, i) => {
				if (v === month) {
					this.valueTime[1] = i;
				}
			});
			this.days.map((v, i) => {
				if (v === day) {
					this.valueTime[2] = i;
				}
			});
		},
		// 时间格式化
		getCurrent(fmtStr, date) {
			if (date && typeof date !== 'object') {
				if (date.indexOf('-') > 0) {
					date = date.replace(/-/g, '/')
				}
			}
			const time = date ? new Date(date) : new Date();
			let fmt = fmtStr || 'yyyy-MM-dd';
			const o = {
				'M+': time.getMonth() + 1, // 月份
				'd+': time.getDate(), // 日
				'h+': time.getHours(), // 小时
				'm+': time.getMinutes(), // 分
				's+': time.getSeconds(), // 秒
				'q+': Math.floor((time.getMonth() + 3) / 3), // 季度
				S: time.getMilliseconds() // 毫秒
			};
			if (/(y+)/.test(fmt)) {
				fmt = fmt.replace(RegExp.$1, (time.getFullYear() + '').substr(4 - RegExp.$1.length));
			}
			for (const k in o) {
				if (new RegExp('(' + k + ')').test(fmt)) {
					fmt = fmt.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length));
				}
			}
			return fmt;
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
.lg-date-box-group {
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
</style>
