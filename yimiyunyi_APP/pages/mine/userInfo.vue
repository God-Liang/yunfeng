<template>
	<view class="lg-container">
		<uni-nav-bar left-icon="back" title="个人信息" @clickLeft="onLeftTap"></uni-nav-bar>
		<view class="avatar-container lg-navigator-hover" @tap="onAvator">
			<text class="title">头像</text>
			<view class="avatar">
				<image v-if="myInfo.avatar" class="img-yes" :src="myInfo.avatar" @tap.stop="lookAvator" mode="aspectFill"></image>
				<image
					v-if="!myInfo.avatar && myInfo.sex"
					class="img-yes"
					src="https://gitee.com/picture_storage_area/follow_up_doctor/raw/master/images/patient/doctor_woman.jpg"
					mode=""
				></image>
				<image
					v-if="!myInfo.avatar && !myInfo.sex"
					class="img-yes"
					src="https://gitee.com/picture_storage_area/follow_up_doctor/raw/master/images/patient/doctor_man.jpg"
					mode=""
				></image>
			</view>
			<text class="lg-icon icon iconfont iconjiantouarrow487"></text>
		</view>
		<view class="user-list">
			<view class="user-item lg-navigator-hover">
				<text class="title">姓名</text>
				<text class="message">{{ myInfo.nick || '暂无名称' }}</text>
				<text class="lg-icon-null"></text>
			</view>
			<view class="user-item lg-navigator-hover" @tap="openSex">
				<text class="title">性别</text>
				<text class="message">{{ myInfo.sexShow || '无' }}</text>
				<text class="lg-icon icon iconfont iconjiantouarrow487"></text>
			</view>
			<view class="user-item lg-navigator-hover">
				<text class="title">手机号</text>
				<text class="message">{{ myInfo.phone }}</text>
				<text class="lg-icon-null"></text>
			</view>
			<view class="user-item lg-navigator-hover">
				<text class="title">依米ID</text>
				<text class="message">{{ myInfo.doctor.yimiNumber }}</text>
				<text class="lg-icon-null"></text>
			</view>
			<view class="user-item lg-navigator-hover" @tap="openDoctorHospital">
				<text class="title">所在医院名称</text>
				<text class="message">{{ myInfo.doctor.doctorHospital || '无' }}</text>
				<text class="lg-icon-null"></text>
				<!-- <text class="lg-icon icon iconfont iconjiantouarrow487"></text> -->
			</view>
			<view class="user-item lg-navigator-hover" @tap="openProfessionCallShow">
				<text class="title">职称</text>
				<text class="message">{{ myInfo.doctor.professionCallShow || '无' }}</text>
				<text class="lg-icon-null"></text>
				<!-- <text class="lg-icon icon iconfont iconjiantouarrow487"></text> -->
			</view>
			<view class="user-item lg-navigator-hover" @tap="openDepartment">
				<text class="title">所在科室</text>
				<text class="message">{{ myInfo.doctor.department || '无' }}</text>
				<text class="lg-icon-null"></text>
				<!-- <text class="lg-icon icon iconfont iconjiantouarrow487"></text> -->
			</view>
		</view>
		<!-- 职称 -->
		<uni-popup-select
			:list="professionCallData"
			:value="myInfo.doctor.professionCallType"
			:prop="prop"
			ref="popupProfessionCallShow"
			@comfirm="onProfessionCallComfirm"
		></uni-popup-select>
		<!-- 性别 -->
		<uni-popup-select :list="sexData" :value="myInfo.sex" :prop="prop" ref="popupSexShow" @comfirm="onSexComfirm"></uni-popup-select>
		<!-- 医院 -->
		<uni-popup-select
			:list="hospitalData"
			:label="myInfo.doctor.doctorHospital"
			filters
			remote
			:prop="propHospital"
			ref="popupDoctorHospital"
			@input="handlerFilter"
			@comfirm="onHospitalComfirm"
		></uni-popup-select>
		<!-- 科室 -->
		<uni-popup-cascader
			:list="departmentData"
			:label="myInfo.doctor.department"
			@comfirm="onDepartmentComfirm"
			:prop="propDepartment"
			ref="popupDepartment"
		></uni-popup-cascader>
	</view>
</template>

<script>
import { mapGetters } from 'vuex';
import { getInfo, updateInfo } from '@/api/mine';
import { getAllDicByType, getHospitalList, getDepartmentList } from '@/api/system';
import uploadJs from '@/mixins/uploadFile';
export default {
	mixins: [uploadJs],
	data() {
		return {
			professionCallData: [],
			sexData: [],
			hospitalData: [],
			departmentData: [],
			prop: {
				key: 'valueCn',
				value: 'key'
			},
			propHospital: {
				key: 'name',
				value: 'id'
			},
			propDepartment: {
				key: 'name',
				value: 'id',
				children: 'hospitalDepartmentList'
			},
			filters: {
				keyWord: ''
			}
		};
	},
	computed: {
		...mapGetters(['myInfo'])
	},
	onShow() {
		this.getAllDicByType();
		this.getDepartmentList();
	},
	onBackPress(options) {
		console.log(options)
		if (options.from === 'navigateBack') {
			return false;
		}
		this.onLeftTap()
		return false;
	},
	methods: {
		onLeftTap() {
			this.$helper.toTab('/pages/tabBar/mine')
		},
		onAvator() {
			this.uploadFile(['album', 'camera'], 1, imgUrl => {
				this.uploadAvator(imgUrl);
			}, error => {
				this.$helper.toast('none', error)
			})
		},
		uploadAvator(result) {
			this.$helper.loading('正在保存')
			const data = {
				avatar: result
			};
			updateInfo(data, res => {
				setTimeout(function () {
				  uni.hideLoading();
				}, 500);
				this.$store.dispatch('getMyInfo').then(res => {});
			});
		},
		lookAvator() {
			const _this = this;
			uni.previewImage({
				urls: [_this.myInfo.avatar],
				longPressActions: {
					success: function(data) {},
					fail: function(err) {
						console.log(err.errMsg);
					}
				}
			});
		},
		getAllDicByType() {
			getAllDicByType('sex', res => {
				this.sexData = res.data.list;
			});
			getAllDicByType('jobTitle', res => {
				this.professionCallData = res.data.list;
			});
		},
		// 性别
		openSex() {
			this.$refs.popupSexShow.open();
		},
		onSexComfirm(e) {
			this.$helper.loading('正在保存')
			const data = {
				sexShow: e.key,
				sex: e.value,
				id: this.myInfo.id
			};
			updateInfo(data, res => {
				setTimeout(function () {
				  uni.hideLoading();
				}, 500);
				this.$store.dispatch('getMyInfo').then(res => {});
			});
		},
		// 职称
		openProfessionCallShow() {
			return
			this.$refs.popupProfessionCallShow.open();
		},
		onProfessionCallComfirm(e) {
			this.$helper.loading('正在保存')
			const data = {
				doctor: {
					professionCallShow: e.key,
					professionCallType: e.value
				},
				id: this.myInfo.id
			};
			updateInfo(data, res => {
				setTimeout(function () {
				  uni.hideLoading();
				}, 500);
				this.$store.dispatch('getMyInfo').then(res => {});
			});
		},
		openDoctorHospital() {
			return
			this.getList();
			this.$refs.popupDoctorHospital.open();
		},
		onHospitalComfirm(e) {
			this.$helper.loading('正在保存')
			const data = {
				doctor: {
					doctorHospital: e.key.length > 0 ? e.key.join(',') : ''
				},
				id: this.myInfo.id
			};
			updateInfo(data, res => {
				setTimeout(function () {
				  uni.hideLoading();
				}, 500);
				this.$store.dispatch('getMyInfo').then(res => {});
			});
		},
		// 过滤医院列表
		handlerFilter(e) {
			this.filters.keyWord = e.value;
			this.getList();
		},
		// 获取医院列表
		getList() {
			const data = Object.assign({}, this.filters);
			getHospitalList(data, res => {
				this.hospitalData = res.data.list;
			});
		},
		// 科室
		openDepartment() {
			return
			this.$refs.popupDepartment.open();
		},
		onDepartmentComfirm(e) {
			this.$helper.loading('正在保存')
			const data = {
				doctor: {
					department: e.key
				},
				id: this.myInfo.id
			};
			updateInfo(data, res => {
				setTimeout(function () {
				  uni.hideLoading();
				}, 500);
				this.$store.dispatch('getMyInfo').then(res => {});
			});
		},
		getDepartmentList() {
			getDepartmentList(res => {
				this.departmentData = res.data.info;
			});
		}
	}
};
</script>

<style lang="scss">
.lg-container {
	width: 100vw;
	height: 100vh;
	background-color: #f4f4f4;
	.lg-navigator-hover {
		&:hover {
			opacity: 0.7;
		}
	}
	.avatar-container {
		width: 100%;
		height: 150rpx;
		padding: 0 40rpx;
		margin-bottom: 20rpx;
		background-color: #fff;
		box-sizing: border-box;
		display: flex;
		justify-content: space-between;
		align-items: center;
		.title {
			color: #333333;
			font-size: 26rpx;
			flex: 1;
		}
		.avatar {
			width: 110rpx;
			height: 110rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			border: 2rpx solid rgba(220, 220, 220, 1);
			border-radius: 50%;
			overflow: hidden;
			.img-null {
				width: 64rpx;
				height: 61rpx;
			}
			.img-yes {
				width: 110rpx;
				height: 110rpx;
			}
		}
		.lg-icon {
			margin-left: 4rpx;
			color: #b9b9b9;
			font-size: 28rpx;
		}
	}
	.user-list {
		.lg-navigator-hover {
			&:hover {
				opacity: 0.7;
			}
		}
		.user-item {
			width: 100%;
			height: 100rpx;
			padding: 0 40rpx;
			margin-bottom: 2rpx;
			background-color: #fff;
			box-sizing: border-box;
			display: flex;
			justify-content: space-between;
			align-items: center;
			div {
				width: 100%;
				height: 100rpx;
				padding: 0 40rpx;
				margin-bottom: 2rpx;
				background-color: #fff;
				box-sizing: border-box;
				display: flex;
				justify-content: space-between;
				align-items: center;
			}
			.title {
				color: #333333;
				font-size: 26rpx;
				line-height: 36rpx;
				flex: 1;
			}
			.message {
				color: #888888;
				font-size: 26rpx;
				line-height: 36rpx;
			}
			.lg-icon {
				margin-left: 4rpx;
				color: #b9b9b9;
				font-size: 28rpx;
			}
			.lg-icon-null {
				display: inline-block;
				width: 28rpx;
				height: 28rpx;
				margin-left: 4rpx;
			}
		}
	}
}
</style>
