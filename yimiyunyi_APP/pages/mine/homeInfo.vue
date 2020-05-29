<template>
	<view class="lg-container">
		<uni-nav-bar left-icon="back" title="修改" @clickLeft="onLeftTap"></uni-nav-bar>
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
				<text class="message">{{ myInfo.nick || '无' }}</text>
				<text class="lg-icon-null"></text>
			</view>
			<view class="user-item lg-navigator-hover" @tap="openSex">
				<text class="title">性别</text>
				<text class="message">{{ myInfo.sexShow || '无' }}</text>
				<text class="lg-icon icon iconfont iconjiantouarrow487"></text>
			</view>
			<view @tap="openDate" class="user-item lg-navigator-hover">
				<text class="title">出生日期</text>
				<text class="message">{{ myInfo.birthday || '无' }}</text>
				<text class="lg-icon icon iconfont iconjiantouarrow487"></text>
			</view>
			<view class="user-item lg-navigator-hover">
				<text class="title">手机号</text>
				<text class="message">{{ myInfo.phone || '无' }}</text>
				<text class="lg-icon-null"></text>
			</view>
			<view class="user-item lg-navigator-hover" @tap="openDoctorHospital">
				<text class="title">所在医院名称</text>
				<text class="message">{{ myInfo.doctor.doctorHospital || '无' }}</text>
				<!-- <text class="lg-icon icon iconfont iconjiantouarrow487"></text> -->
				<text class="lg-icon-null"></text>
			</view>
			<view class="user-item lg-navigator-hover" @tap="openDepartment">
				<text class="title">所在科室</text>
				<text class="message">{{ myInfo.doctor.department || '无' }}</text>
				<!-- <text class="lg-icon icon iconfont iconjiantouarrow487"></text> -->
				<text class="lg-icon-null"></text>
			</view>
			<view class="user-item lg-navigator-hover" @tap="openProfessionCallShow">
				<text class="title">职称</text>
				<text class="message">{{ myInfo.doctor.professionCallShow || '无' }}</text>
				<!-- <text class="lg-icon icon iconfont iconjiantouarrow487"></text> -->
				<text class="lg-icon-null"></text>
			</view>
			<navigator :url="'/pages/mine/amendIntro?introduction='+(myInfo.doctor.introduction?myInfo.doctor.introduction:'')" class="user-item">
				<text class="title">我的简介</text>
				<text class="message"></text>
				<text class="lg-icon icon iconfont iconjiantouarrow487"></text>
			</navigator>
			<view class="user-item lg-navigator-hover" @tap="openOperation">
				<text class="title">擅长手术</text>
				<text class="message"></text>
				<text class="lg-icon icon iconfont iconjiantouarrow487"></text>
			</view>
			<view class="user-item lg-navigator-hover" @tap="openDisease">
				<text class="title">擅长疾病</text>
				<text class="message"></text>
				<text class="lg-icon icon iconfont iconjiantouarrow487"></text>
			</view>
			<navigator url="/pages/mine/certificate" class="user-item">
				<text class="title">荣誉证书</text>
				<text class="message"></text>
				<text class="lg-icon icon iconfont iconjiantouarrow487"></text>
			</navigator>
		</view>
		<!-- 出生日期 -->
		<uni-popup-date
			:time="myInfo.birthday"
			:end="endTime"
			ref="popupDate"
			:maskClick="false"
			type="bottom"
			@comfirm="bindDateChange"
		></uni-popup-date>
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
			:filters="true"
			:remote="true"
			:prop="propHospital"
			ref="popupDoctorHospital"
			@input="handlerFilter"
			@comfirm="onHospitalComfirm"
			@cancel="onHospitalCancel"
		></uni-popup-select>
		<!-- 科室 -->
		<uni-popup-cascader
			:list="departmentData"
			:label="myInfo.doctor.department"
			@comfirm="onDepartmentComfirm"
			:prop="propDepartment"
			ref="popupDepartment"
		></uni-popup-cascader>
		<!-- 手术 -->
		<uni-popup-select
			:list="operationData"
			:label="myInfo.doctor.operation"
			filters
			remote
			multiple
			:max="5"
			:prop="propHospital"
			ref="popupOperation"
			@input="filterOperation"
			@comfirm="onOperationComfirm"
			@cancel="onOperationCancel"
		></uni-popup-select>
		<!-- 疾病 -->
		<uni-popup-select
			:list="diseaseData"
			:label="myInfo.doctor.disease"
			filters
			remote
			multiple
			:max="5"
			:prop="propDisease"
			ref="popupDisease"
			@input="filterDisease"
			@comfirm="onDiseaseComfirm"
			@cancel="onDiseaseCancel"
		></uni-popup-select>
	</view>
</template>

<script>
import { mapGetters } from 'vuex';
import { getInfo, updateInfo } from '@/api/mine';
import { getAllDicByType, getHospitalList, getDepartmentList, getOperationList, getDiseaseList } from '@/api/system';
import uploadJs from '@/mixins/uploadFile';
export default {
	mixins: [uploadJs],
	data() {
		return {
			sexShow: false,
			endTime: this.getCurrent(),
			professionCallData: [],
			sexData: [],
			hospitalData: [],
			departmentData: [],
			operationData: [],
			diseaseData: [],
			prop: {
				key: 'valueCn',
				value: 'key'
			},
			propHospital: {
				key: 'name',
				value: 'id'
			},
			propDisease: {
				key: 'name',
				value: 'icd10'
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
	methods: {
		// 获取时间
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
		},
		getAllDicByType() {
			getAllDicByType('sex', res => {
				this.sexData = res.data.list;
			});
			getAllDicByType('jobTitle', res => {
				this.professionCallData = res.data.list;
			});
		},
		onLeftTap() {
			uni.navigateBack({ delta: 1 });
		},
		onAvator() {
			this.uploadFile(['album', 'camera'], 1, imgUrl => {
				this.uploadAvator(imgUrl);
			}, error => {
				this.$helper.toast('none', error)
			})
		},
		uploadAvator(result) {
			const data = {
				avatar: result,
				id: this.myInfo.id
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
					fail: function(err) {}
				}
			});
		},
		// 出生日期
		openDate() {
			this.$refs.popupDate.open();
		},
		bindDateChange(val) {
			this.$helper.loading('正在保存')
			const data = {
				birthday: val,
				id: this.myInfo.id
			};
			updateInfo(data, res => {
				setTimeout(function () {
				  uni.hideLoading();
				}, 500);
				this.$store.dispatch('getMyInfo').then(res => {});
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
		// 医院
		openDoctorHospital() {
			return
			this.getList();
			this.$refs.popupDoctorHospital.open();
		},
		onHospitalCancel() {
			this.filters.keyWord = '';
		},
		onHospitalComfirm(e) {
			this.$helper.loading('正在保存')
			this.filters.keyWord = '';
			const data = {
				doctor: {
					doctorHospital: e.key[0],
					doctorHospitalLevel: e.data[0].type
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
		},
		// 手术
		openOperation() {
			this.getOperationList();
			this.$refs.popupOperation.open();
		},
		onOperationCancel() {
			this.filters.keyWord = '';
		},
		onOperationComfirm(e) {
			this.$helper.loading('正在保存')
			this.filters.keyWord = '';
			const data = {
				doctor: {
					operation: e.key.length > 0 ? e.key.join(',') : ''
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
		// 过滤手术列表
		filterOperation(e) {
			this.filters.keyWord = e.value;
			this.getOperationList();
		},
		// 获取手术列表
		getOperationList() {
			const data = Object.assign({}, this.filters);
			getOperationList(data, res => {
				this.operationData = res.data.list;
			});
		},
		// 疾病
		openDisease() {
			this.getDiseaseList();
			this.$refs.popupDisease.open();
		},
		onDiseaseCancel() {
			this.filters.keyWord = '';
		},
		onDiseaseComfirm(e) {
			this.$helper.loading('正在保存')
			this.filters.keyWord = '';
			const data = {
				doctor: {
					disease: e.key.length > 0 ? e.key.join(',') : '',
					icd10: e.value.length > 0 ? e.value.join(',') : ''
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
		// 过滤疾病列表
		filterDisease(e) {
			this.filters.keyWord = e.value;
			this.getDiseaseList();
		},
		// 获取疾病列表
		getDiseaseList() {
			const data = Object.assign({}, this.filters);
			getDiseaseList(data, res => {
				this.diseaseData = res.data.list;
			});
		}
	}
};
</script>

<style lang="scss">
.lg-container {
	width: 100vw;
	min-height: 100vh;
	padding-bottom: 20rpx;
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
			.img-null {
				width: 64rpx;
				height: 61rpx;
			}
			.img-yes {
				width: 110rpx;
				height: 110rpx;
				border-radius: 50%;
				overflow: hidden;
				border: 2rpx solid rgba(220, 220, 220, 1);
			}
		}
		.lg-icon {
			margin-left: 4rpx;
			color: #b9b9b9;
			font-size: 28rpx;
		}
	}
	.user-list {
		padding-bottom: 15rpx;
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
