<template>
	<view class="lg-container">
		<uni-nav-bar left-icon="back" title="认证信息" @clickLeft="onLeftTap"></uni-nav-bar>
		<view class="top">
			<image src="@/static/mine/attestation/c_2.png" mode=""></image>
			<text class="audit-status"> 未认证</text>
			<text class="audit-await">请确认您的注册信息真实有效，并上传清晰的证件照片。</text>
			<text class="audit-await">人工审核需要1~2个工作日。</text>
		</view>
		<view class="user-list">
			<view class="user-item">
				<text class="title">真实姓名</text>
				<input class="uni-input message" style="text-align: right;" type="text" name="name" placeholder="请输入姓名" @input="nickInput" :value="attestationInfo.nick" />
			</view>
			<!-- <view class="user-item lg-navigator-hover" @tap="openCareer">
				<text class="title">职业</text>
				<text class="message">{{ attestationInfo.career || '无' }}</text>
				<text class="lg-icon icon iconfont iconjiantouarrow487"></text>
			</view> -->
			<view class="user-item lg-navigator-hover" @tap="openDoctorHospital">
				<text class="title">医院</text>
				<text class="message">{{ attestationInfo.doctorHospital || '请选择' }}</text>
				<text class="lg-icon icon iconfont iconjiantouarrow487"></text>
			</view>
			<view class="user-item lg-navigator-hover" @tap="openDepartment">
				<text class="title">科室</text>
				<text class="message">{{ attestationInfo.department || '请选择' }}</text>
				<text class="lg-icon icon iconfont iconjiantouarrow487"></text>
			</view>
			<view class="user-item lg-navigator-hover" @tap="openProfessionCallShow">
				<text class="title">职称</text>
				<text class="message">{{ attestationInfo.professionCallShow || '请选择' }}</text>
				<text class="lg-icon icon iconfont iconjiantouarrow487"></text>
			</view>
		</view>
		<view class="btn">
			<button class="nextStep" @tap="nextStep">下一步</button>
		</view>
		<view class="tips">认证信息通过后，不允许修改。</view>
		
		<!-- 职业 -->
		<uni-popup-select 
			:list="careerData" 
			:value="attestationInfo.career" 
			:prop="prop" 
			ref="popupCareerShow"
			@comfirm="onCareerComfirm"
		></uni-popup-select>
		<!-- 医院 -->
		<uni-popup-select
			:list="hospitalData"
			:label="attestationInfo.doctorHospital"
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
			:label="attestationInfo.department"
			@comfirm="onDepartmentComfirm"
			:prop="propDepartment"
			ref="popupDepartment"
		></uni-popup-cascader>
		<!-- 职称 -->
		<uni-popup-select
			:list="professionCallData"
			:value="attestationInfo.professionCallType"
			:prop="prop"
			ref="popupProfessionCallShow"
			@comfirm="onProfessionCallComfirm"
		></uni-popup-select>
	</view>
</template>

<script>
import { mapGetters } from 'vuex';
import { getAllDicByType, getHospitalList, getDepartmentList, getOperationList, getDiseaseList } from '@/api/system';

export default {
	data() {
		return {
			attestationInfo:{
				nick: '',
				career:'',
				doctorHospital:'',
				doctorHospitalLevel: '',
				department:'',
				professionCallShow:'',
				professionCallType: null,
				type: null
			},
			careerData:[],
			hospitalData:[],
			departmentData:[],
			professionCallData:[],
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
	mounted() {
		if (uni.getStorageSync('attestationInfo')) {
			this.attestationInfo = uni.getStorageSync('attestationInfo')
		}
		this.getAllDicByType();
		this.getDepartmentList();
	},
	methods: {
		onLeftTap() {
			uni.navigateBack({ delta: 1 });
		},
		getAllDicByType() {
			getAllDicByType('sex', res => {
				this.sexData = res.data.list;
			});
			getAllDicByType('jobTitle', res => {
				this.professionCallData = res.data.list;
			});
		},
		// 真实姓名
		nickInput(e) {
			this.attestationInfo.nick = e.detail.value
		},
		// 职业
		openCareer() {
			this.$refs.popupCareerShow.open();
		},
		onCareerComfirm() {
			this.attestationInfo.career = e.key
		},
		// 医院
		openDoctorHospital() {
			this.getList();
			this.$refs.popupDoctorHospital.open();
		},
		onHospitalCancel() {
			this.filters.keyWord = '';
			this.getList();
		},
		onHospitalComfirm(e) {
			this.attestationInfo.doctorHospital = e.key[0],
			this.attestationInfo.doctorHospitalLevel = e.data[0].type
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
			this.$refs.popupDepartment.open();
		},
		onDepartmentComfirm(e) {
			this.attestationInfo.department = e.key
		},
		getDepartmentList() {
			getDepartmentList(res => {
				this.departmentData = res.data.info;
			});
		},
		// 职称
		openProfessionCallShow() {
			this.$refs.popupProfessionCallShow.open();
		},
		onProfessionCallComfirm(e) {
			this.attestationInfo.professionCallShow = e.key
			this.attestationInfo.professionCallType = e.value
		},
		nextStep(){
			const formData = Object.assign({}, this.attestationInfo)
			let formRules = [
				{ name: 'nick', type: 'required', errmsg: '请输入真实姓名' },
				{ name: 'doctorHospital', type: 'required', errmsg: '请选择医院' },
				{ name: 'department', type: 'required', errmsg: '请选择科室' },
				{ name: 'professionCallShow', type: 'required', errmsg: '请选择职称' }
			];
			let valRes = this.$validate.validate(formData, formRules);
			if (!valRes.isOk) {
				this.$helper.toast('none', valRes.errmsg)
				return false;
			}
			uni.setStorageSync('attestationInfo', formData)
			this.$helper.to('/pages/mine/attestation/attestationThree')
		}
	}
};
</script>

<style lang="scss">
.lg-container {
	.top{
		background: #fff;
		padding:30rpx 40rpx;
		margin-bottom: 20rpx;
		height: 430rpx;
		box-sizing: border-box;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		image{
			width: 200rpx;
			height: 230rpx;
		}	
		.audit-status {
			color: #888888;
			font-size: 30rpx;
			margin: 30rpx 0 20rpx;
		}
		.audit-await {
			color: #888888;
			font-size: 24rpx;
			line-height: 30rpx;
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
	.btn{
		width: 100%;
		padding: 0 40rpx;
		box-sizing: border-box;
		margin-top: 50rpx;
		.nextStep{
			width: 100%;
			background: #03A9AC;
			color: #fff;
			font-size: 26rpx;
			line-height: 80rpx;
		}
		
	}
	.tips{
		line-height: 60rpx;
		color: #BCBCBC;
		font-size: 24rpx;
		text-align: center;
	}
}
</style>
