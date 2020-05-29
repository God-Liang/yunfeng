<template>
	<view class="uni-combox">
		<view v-if="label" class="uni-combox__label" :style="labelStyle">
			<text>{{label}}</text>
		</view>
		<view class="uni-combox__input-box">
			<input class="uni-combox__input" type="text" disabled :placeholder="placeholder" v-model="inputVal" @click="toggleSelector" @input="onInput" @focus="onFocus" @blur="onBlur" />
			<uni-icons class="uni-combox__input-arrow" type="arrowdown" size="14" @click="toggleSelector"></uni-icons>
			<view class="uni-combox__selector" v-if="showSelector">
				<scroll-view scroll-y="true" class="uni-combox__selector-scroll">
					<view class="uni-combox__selector-empty" v-if="filterCandidatesLength === 0">
						<text>{{emptyTips}}</text>
					</view>
					<view class="uni-combox__selector-item" v-for="(item,index) in filterCandidates" :key="index" @click="onSelectorClick(item)">
						<text>{{item[props.label]}}</text>
					</view>
				</scroll-view>
			</view>
		</view>
	</view>
</template>

<script>
	import uniIcons from '../uni-icons/uni-icons.vue'
	export default {
		name: 'uniCombox',
		components: {
			uniIcons
		},
		props: {
			label: {
				type: String,
				default: ''
			},
			labelWidth: {
				type: String,
				default: 'auto'
			},
			placeholder: {
				type: String,
				default: ''
			},
			candidates: {
				type: Array,
				default () {
					return []
				}
			},
			emptyTips: {
				type: String,
				default: '无匹配项'
			},
			value: {
				type: [String, Number],
				default: ''
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
				showSelector: false,
				inputVal: ''
			}
		},
		computed: {
			labelStyle() {
				if (this.labelWidth === 'auto') {
					return {}
				}
				return {
					width: this.labelWidth
				}
			},
			filterCandidates() {
				console.log(this.candidates)
				return this.candidates
				// return this.candidates.filter((item) => {
				// 	return item[this.props.label].indexOf(this.inputVal) > -1
				// })
			},
			filterCandidatesLength() {
				return this.filterCandidates.length
			}
		},
		watch: {
			value: {
				handler(newVal) {
					this.filterCandidates.map(e => {
						if (e[this.props.value] === newVal) {
							this.inputVal = e[this.props.label]
						}
					})
				},
				immediate: true
			}
		},
		methods: {
			toggleSelector() {
				this.showSelector = !this.showSelector
			},
			onFocus() {
				this.showSelector = true
			},
			onBlur() {
				setTimeout(() => {
					this.showSelector = false
				}, 50)
			},
			onSelectorClick(data) {
				this.inputVal = data[this.props.label]
				this.showSelector = false
				this.$emit('input', data[this.props.value])
			},
			onInput() {
				setTimeout(() => {
					this.$emit('input', this.inputVal)
				})
			}
		}
	}
</script>

<style scoped>
	.uni-combox {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		height: 50rpx;
		flex-direction: row;
		align-items: center;
		/* border-bottom: solid 1px #DDDDDD;
 */
	}

	.uni-combox__label {
		font-size: 16px;
		line-height: 22px;
		padding-right: 10px;
		color: #999999;
	}

	.uni-combox__input-box {
		position: relative;
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex: 1;
		flex-direction: row;
		align-items: center;
		border: 2rpx solid #DCDCDC;
	}

	.uni-combox__input {
		flex: 1;
		font-size: 24rpx;
		height: 22px;
		line-height: 22px;
	}

	.uni-combox__input-arrow {
		padding: 0 10rpx 0 0;
	}

	.uni-combox__selector {
		box-sizing: border-box;
		position: absolute;
		top: 42px;
		left: 0;
		width: 100%;
		background-color: #FFFFFF;
		border-radius: 6px;
		box-shadow: #DDDDDD 4px 4px 8px, #DDDDDD -4px -4px 8px;
		z-index: 2;
	}

	.uni-combox__selector-scroll {
		max-height: 200px;
		box-sizing: border-box;
	}

	.uni-combox__selector::before {
		content: '';
		position: absolute;
		width: 0;
		height: 0;
		border-bottom: solid 6px #FFFFFF;
		border-right: solid 6px transparent;
		border-left: solid 6px transparent;
		left: 50%;
		top: -6px;
		margin-left: -6px;
	}

	.uni-combox__selector-empty,
	.uni-combox__selector-item {
		/* #ifdef APP-NVUE */
		display: flex;
		/* #endif */
		line-height: 36px;
		font-size: 24rpx;
		text-align: center;
		border-bottom: solid 1px #DDDDDD;
		margin: 0px 10px;
	}

	.uni-combox__selector-empty:last-child,
	.uni-combox__selector-item:last-child {
		border-bottom: none;
	}
</style>