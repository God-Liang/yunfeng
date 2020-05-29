<template>
	<view :class="[styleType === 'text'?'segmented-control--text' : 'segmented-control--button' ]" :style="{ borderColor: styleType === 'text' ? '' : activeColor, backgroundColor: styleType === 'text' ? backgroundColor : '', height: height }" class="segmented-control">
		<view v-for="(item, index) in values" :class="[ styleType === 'text'?'segmented-control__item--text': 'segmented-control__item--button' , item[props.value] === currentIndex&&styleType === 'button'?'segmented-control__item--button--active': '' , index === 0&&styleType === 'button'?'segmented-control__item--button--first': '',index === values.length - 1&&styleType === 'button'?'segmented-control__item--button--last': '' ]" :key="index" :style="{
        backgroundColor: item[props.value] === currentIndex && styleType === 'button' ? activeColor : '',borderColor: item[props.value] === currentIndex&&styleType === 'text'||styleType === 'button'?activeColor:'transparent'
      }" class="segmented-control__item" @click="_onClick(item[props.value])">
			<text :style="{color:
          item[props.value] === currentIndex
            ? styleType === 'text'
              ? '#333'
              : '#fff'
            : styleType === 'text'
              ? '#BCBCBC'
              : activeColor}" class="segmented-control__text">{{ item[props.label] }}</text>
		</view>
	</view>
</template>

<script>
	/**
	 * SegmentedControl 分段器
	 * @description 用作不同视图的显示
	 * @tutorial https://ext.dcloud.net.cn/plugin?id=54
	 * @property {Number} current 当前选中的tab索引值，从0计数
	 * @property {String} styleType = [button|text] 分段器样式类型
	 * 	@value button 按钮类型
	 * 	@value text 文字类型
	 * @property {String} activeColor 选中的标签背景色与边框颜色
	 * @property {Array} values 选项数组
	 * @event {Function} clickItem 组件触发点击事件时触发，e={currentIndex}
	 */

	export default {
		name: 'UniSegmentedControl',
		props: {
			current: {
				type: Number,
				default: 0
			},
			values: {
				type: Array,
				default () {
					return []
				}
			},
			activeColor: {
				type: String,
				default: '#007aff'
			},
			backgroundColor: {
				type: String,
				default: '#ffffff'
			},
			height: {
				type: String,
				default: '70rpx'
			},
			styleType: {
				type: String,
				default: 'button'
			},
			props: {
				type: Object,
				default () {
					return {
						value: 'value',
						label: 'label' 
					}
				}
			}
		},
		data() {
			return {
				currentIndex: 0
			}
		},
		watch: {
			current(val) {
				if (val !== this.currentIndex) {
					this.currentIndex = val
				}
			}
		},
		created() {
			this.currentIndex = this.current
		},
		methods: {
			_onClick(index) {
				if (this.currentIndex !== index) {
					this.currentIndex = index
					this.$emit('clickItem', {
						currentIndex: index
					})
				}
			}
		}
	}
</script>

<style scoped>
	.segmented-control {
		height: 70rpx;
		white-space:nowrap;
		width: 100vw;
		padding: 0 20rpx;
		box-sizing: border-box;
		overflow: auto;
	}
	.segmented-control::-webkit-scrollbar{
		height: 0px;
	}

	.segmented-control__item {
		/* #ifndef APP-NVUE */
		display: inline-flex;
		box-sizing: border-box;
		/* #endif */
		position: relative;
		justify-content: center;
		align-items: center;
		height: 100%;
	}

	.segmented-control__item--button {
		border-style: solid;
		border-top-width: 1px;
		border-bottom-width: 1px;
		border-right-width: 1px;
		border-left-width: 0;
		padding: 0 18rpx;
	}

	.segmented-control__item--button--first {
		border-left-width: 1px;
		border-top-left-radius: 5px;
		border-bottom-left-radius: 5px;
	}

	.segmented-control__item--button--last {
		border-top-right-radius: 5px;
		border-bottom-right-radius: 5px;
	}

	.segmented-control__item--text {
		border-bottom-style: solid;
		border-bottom-width: 4rpx;
		margin: 0 20rpx;
	}

	.segmented-control__text {
		font-size: 26rpx;
		line-height: 20px;
		text-align: center;
		display: inline-block;
	}
</style>