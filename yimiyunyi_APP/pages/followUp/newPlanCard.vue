<template>
	<view class="lg-container">
		<uni-nav-bar left-icon="back" title="新建随访计划" @clickLeft="onLeftTap"></uni-nav-bar>
		<lgProgress :active="2"></lgProgress>
		<view class="card-container" v-if="data.objIds.length > 0">
			<view class="card-item">
				<view class="card-item_patient">
					<view class="card-item_patient_avatar">{{ data.objIds[0].name | interception }}</view>
					<view class="card-item_patient_name">{{ data.objIds[0].name }}</view>
				</view>
				<view class="card-item_plan">
					<view class="card-item_plan_label">随访方案：</view>
					<view class="card-item_plan_value"><input class="input" disabled type="text" :value="data.solutionName" /></view>
				</view>
				<view class="card-item_plan">
					<view class="card-item_plan_label">计划名称：</view>
					<view class="card-item_plan_value"><input class="input" @input="onNameInput" type="text" placeholder="请输入计划名称" :value="data.name" /></view>
				</view>
				<view class="card-item_plan">
					<view class="card-item_plan_label">起始时间：</view>
					<view class="card-item_plan_value" @tap="openDate">
						<input class="input" disabled type="text" placeholder="请选择" :value="data.startTime" />
						<image class="calendar" src="@/static/followUp/calendar.jpg" mode=""></image>
					</view>
				</view>
			</view>
		</view>
		<mescroll-empty v-else :option="optEmpty" @emptyclick="emptyClick"></mescroll-empty>
		<view class="operationBox" v-if="data.objIds.length > 0" @tap="onSumbit">确定</view>
		<!-- 起始时间 -->
		<uni-popup-date :time="data.startTime" :start="minTime" ref="popupDate" :maskClick="false" type="bottom" @comfirm="bindDateChange"></uni-popup-date>
	</view>
</template>

<script>
import { createOrUpdate } from '@/api/common';
import MescrollEmpty from '@/components/mescroll-uni/components/mescroll-empty.vue';
import { mapGetters } from 'vuex';
import lgProgress from '@/pages/components/lgProgress.vue';
export default {
	computed: {
		...mapGetters(['myInfo', 'planObj'])
	},
	components: {
		MescrollEmpty,
		lgProgress
	},
	data() {
		return {
			optEmpty: {
				icon: '/static/system/c_0.png',
				tip: '暂未选择患者',
				btnText: '选择患者'
			},
			data: {
				name: '',
				startTime: '',
				solutionId: '',
				solutionName: '',
				ids: [],
				objIds: []
			},
			minTime: this.getCurrent()
		};
	},
	onShow() {
		this.data = this.planObj;
		this.data.name = this.data.objIds[0].name + this.data.solutionName
		this.data.startTime = this.getCurrent()
	},
	methods: {
		onLeftTap() {
			uni.navigateBack({ delta: 1 });
		},
		onNameInput(e) {
			this.data.name = e.detail.value;
		},
		// 起始时间
		openDate() {
			this.$refs.popupDate.open();
		},
		bindDateChange(val) {
			this.data.startTime = val;
			this.$store.dispatch('togglePlanObj', this.data);
		},
		// 提交
		onSumbit() {
			const data = {
				name: this.data.name,
				solutionId: parseInt(this.data.solutionId),
				solutionName: this.data.solutionName,
				startTime: this.data.startTime,
				ids: this.data.ids,
				teamId: this.myInfo.doctor.doctorTeamId
			};
			let planRules = [
				{ name: 'name', type: 'required', errmsg: '请输入计划名称' },
				{ name: 'ids', required: true, type: 'length', errmsg: '请选择患者' },
				{ name: 'solutionName', type: 'required', errmsg: '请选择随访方案' },
				{ name: 'startTime', type: 'required', errmsg: '请选择起始时间' }
			];
			let valLoginRes = this.$validate.validate(data, planRules);
			if (!valLoginRes.isOk) {
				this.$helper.toast('none', valLoginRes.errmsg)
				return false;
			}
			this.$helper.loading('新建中')
			createOrUpdate('AppPlan', data, res => {
				setTimeout(() => {
					uni.hideLoading();
					this.data = {
						ids: [],
						objIds: [],
						solutionId: '',
						solutionName: '',
						name: '',
						startTime: ''
					};
					this.$store.dispatch('togglePlanObj', this.data);
					this.$helper.to('/pages/components/submitStatus?type=1')
				}, 1000);
			});
		},
		emptyClick() {
			this.$helper.to('/pages/followUp/newPlanPatient');
		},
		getCurrent(fmtStr, date) {
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

<style lang="scss" scoped>
.lg-container {
	.card-container {
		margin-top: 20rpx;
		.card-item {
			background-color: #fff;
			padding: 40rpx;
			&_patient {
				display: flex;
				justify-content: center;
				align-items: center;
				&_avatar {
					width: 80rpx;
					height: 80rpx;
					line-height: 80rpx;
					text-align: center;
					border-radius: 50%;
					color: #fff;
					background-color: #03a9ac;
				}
				&_name {
					color: #333333;
					font-size: 26rpx;
					margin-left: 30rpx;
				}
			}
			&_plan {
				display: flex;
				align-items: center;
				height: 60rpx;
				margin-top: 40rpx;
				&_label {
					color: #333333;
					font-size: 26rpx;
					width: 140rpx;
				}
				&_value {
					flex: 1;
					position: relative;
					.input {
						height: 60rpx;
						line-height: 58rpx;
						border: 2rpx solid #dcdcdc;
						border-radius: 10rpx;
						padding: 0 24rpx;
						color: #888888;
						font-size: 24rpx;
					}
					.calendar {
						width: 35rpx;
						height: 32rpx;
						position: absolute;
						right: 20rpx;
						top: 14rpx;
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
		line-height: 80rpx;
		background-color: #fff;
		box-sizing: border-box;
		background-color: #03a9ac;
		color: #ffffff;
		font-size: 30rpx;
		text-align: center;
	}
}
</style>
