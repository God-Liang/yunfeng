<template>
	<view class="lg-container">
		<uni-nav-bar left-icon="back" title="团队" @clickLeft="onLeftTap"></uni-nav-bar>
		<view class="avatar-container lg-navigator-hover" @tap="onAvator">
			<text class="title">头像</text>
			<view class="avatar">
				<image v-if="teamInfo.avatar" class="img-yes" :src="teamInfo.avatar" @tap.stop="lookAvator" mode="aspectFill"></image>
				<image v-else class="img-yes" src="@/static/team/avatar.png" mode=""></image>
			</view>
			<text class="lg-icon icon iconfont iconjiantouarrow487"></text>
		</view>
		<uni-list>
			<uni-list-item title="团队名称" @click="onJump('/pages/team/teamAmend?name=' + (teamInfo.name ? teamInfo.name : ''))">
				<template v-slot:right="">
					<view class="color888 fs26">{{ teamInfo.name || '请输入团队名称' }}</view>
				</template>
			</uni-list-item>
			<uni-list-item title="所在医院" @click="openHospital">
				<template v-slot:right="">
					<view class="color888 fs26">{{ teamInfo.hospital || '请选择' }}</view>
				</template>
			</uni-list-item>
			<uni-list-item title="所在科室" @click="openDepartment">
				<template v-slot:right="">
					<view class="color888 fs26">{{ teamInfo.department || '请选择' }}</view>
				</template>
			</uni-list-item>
		</uni-list>
		<uni-list>
			<uni-list-item title="擅长手术" @click="openOperation">
				<template v-slot:right="">
					<view class="color888 fs26">{{ teamInfo.operation || '请选择' }}</view>
				</template>
			</uni-list-item>
			<uni-list-item title="擅长疾病" @click="openDisease">
				<template v-slot:right="">
					<view class="color888 fs26">{{ teamInfo.disease || '请选择' }}</view>
				</template>
			</uni-list-item>
		</uni-list>
		<uni-list :isHover="true">
			<uni-list-item title="团队说明" disabled @click="onJump('/pages/team/teamAmendIntro?description=' + (teamInfo.description ? teamInfo.description : ''))"></uni-list-item>
			<view class="noteBox">{{ teamInfo.description || '请完善团队说明，能让患者更了解你' }}</view>
		</uni-list>
		<uni-list :isHover="true">
			<uni-list-item title="团队寄语" disabled @click="onJump('/pages/team/teamAmendIntro?teamNote=' + (teamInfo.teamNote ? teamInfo.teamNote : ''))"></uni-list-item>
			<view class="noteBox">{{ teamInfo.teamNote || '请填写团队寄语，让患者更信任你' }}</view>
		</uni-list>
		<!-- 医院 -->
		<uni-popup-select
			:list="hospitalData"
			:label="teamInfo.hospital"
			:filters="true"
			:remote="true"
			:prop="propHospital"
			ref="popupHospital"
			@input="handlerFilter"
			@comfirm="onHospitalComfirm"
			@cancel="onHospitalCancel"
		></uni-popup-select>
		<!-- 科室 -->
		<uni-popup-cascader :list="departmentData" :label="teamInfo.department" @comfirm="onDepartmentComfirm" :prop="propDepartment" ref="popupDepartment"></uni-popup-cascader>
		<!-- 手术 -->
		<uni-popup-select
			:list="operationData"
			:label="teamInfo.operation"
			filters
			remote
			:prop="propHospital"
			ref="popupOperation"
			@input="filterOperation"
			@comfirm="onOperationComfirm"
			@cancel="onOperationCancel"
		></uni-popup-select>
		<!-- 疾病 -->
		<uni-popup-select
			:list="diseaseData"
			:label="teamInfo.disease"
			filters
			remote
			:prop="propDisease"
			ref="popupDisease"
			@input="filterDisease"
			@comfirm="onDiseaseComfirm"
			@cancel="onDiseaseCancel"
		></uni-popup-select>
	</view>
</template>

<script>
import { read, createOrUpdate } from '@/api/common';
import { mapGetters } from 'vuex';
import { getHospitalList, getDepartmentList, getOperationList, getDiseaseList } from '@/api/system';
import uploadJs from '@/mixins/uploadFile';
import common from '@/mixins/common';
export default {
	mixins: [uploadJs, common],
	data() {
		return {
			apiName: 'team',
			teamInfo: {
				id: null,
				avatar: '', // 头像
				description: '', // 团队说明
				department: '', // 科室
				disease: '', // 疾病
				operation: '', // 手术
				name: '', // 名称
				hospital: '', // 医院
				hospitalLevel: '' // 医院等级
			},
			professionCallData: [],
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
		this.getInfo();
		this.getDepartmentList();
	},
	methods: {
		onLeftTap() {
			uni.navigateBack({ delta: 1 });
		},
		onAvator() {
			this.uploadFile(
				['album', 'camera'],
				1,
				imgUrl => {
					this.uploadAvator(imgUrl);
				},
				error => {
					this.$helper.toast('none', error);
				}
			);
		},
		uploadAvator(result) {
			const data = {
				avatar: result,
				id: this.teamInfo.id
			};
			createOrUpdate(this.apiName, data, res => {
				setTimeout(function() {
					uni.hideLoading();
				}, 500);
				this.getInfo();
			});
		},
		lookAvator() {
			const _this = this;
			uni.previewImage({
				urls: [_this.teamInfo.avatar],
				longPressActions: {
					success: function(data) {},
					fail: function(err) {}
				}
			});
		},
		getInfo() {
			const teamId = this.teamId ? this.teamId : this.myInfo.doctor.doctorTeamId;
			read(this.apiName, teamId, res => {
				if (res.data.info) {
					this.teamInfo = res.data.info;
				}
			});
		},
		// 医院
		openHospital() {
			this.getList();
			this.$refs.popupHospital.open();
		},
		onHospitalCancel() {
			this.filters.keyWord = '';
		},
		onHospitalComfirm(e) {
			this.$helper.loading('正在保存');
			this.filters.keyWord = '';
			const data = {
				hospital: e.key[0],
				hospitalLevel: e.data[0].type,
				id: this.teamInfo.id
			};
			createOrUpdate(this.apiName, data, res => {
				setTimeout(function() {
					uni.hideLoading();
				}, 500);
				this.getInfo();
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
			this.$refs.popupDepartment.open();
		},
		onDepartmentComfirm(e) {
			this.$helper.loading('正在保存');
			const data = {
				department: e.key,
				id: this.teamInfo.id
			};
			createOrUpdate(this.apiName, data, res => {
				setTimeout(function() {
					uni.hideLoading();
				}, 500);
				this.getInfo();
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
			this.$helper.loading('正在保存');
			this.filters.keyWord = '';
			const data = {
				operation: e.key.length > 0 ? e.key.join(',') : '',
				id: this.teamInfo.id
			};
			createOrUpdate(this.apiName, data, res => {
				setTimeout(function() {
					uni.hideLoading();
				}, 500);
				this.getInfo();
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
			this.$helper.loading('正在保存');
			this.filters.keyWord = '';
			const data = {
				disease: e.key.length > 0 ? e.key.join(',') : '',
				id: this.teamInfo.id
			};
			createOrUpdate(this.apiName, data, res => {
				setTimeout(function() {
					uni.hideLoading();
				}, 500);
				this.getInfo();
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
	box-sizing: border-box;
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
	.noteBox {
		padding: 0 30rpx;
		color: #888888;
		font-size: 26rpx;
		margin-top: -14rpx;
		height: 100rpx;
	}
}
</style>
