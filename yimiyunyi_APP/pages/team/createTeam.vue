<template>
	<view class="lg-container">
		<uni-nav-bar left-icon="back" title="创建团队" @clickLeft="onLeftTap"></uni-nav-bar>
		<view class="top">
			<view class="upload-mine upload-ml" @tap="uploadImg">
				<image v-if="teamInfo.avatar" :src="teamInfo.avatar" mode="aspectFill"></image>
				<image v-else src="https://gitee.com/picture_storage_area/follow_up_doctor/raw/master/images/patient/doctor_man.jpg" mode="aspectFill"></image>
			</view>
			<text class="audit-status" @tap="uploadImg">选择上传</text>
		</view>
		<view class="user-list">
			<view class="user-item">
				<text class="title">团队名称</text>
				<input class="uni-input message" style="text-align: right;" type="text" name="name" placeholder="请输入团队名称" @input="nameInput" :value="teamInfo.name" />
			</view>
			<view class="user-item lg-navigator-hover" @tap="openCareer">
				<text class="title">团队性质</text>
				<text class="message">{{ teamInfo.typeShow || '请选择' }}</text>
				<text class="lg-icon icon iconfont iconjiantouarrow487"></text>
			</view>
			<view class="user-item lg-navigator-hover" @tap="openDoctorHospital">
				<text class="title">所在医院</text>
				<text class="message">{{ teamInfo.hospital || '请选择' }}</text>
				<text class="lg-icon icon iconfont iconjiantouarrow487"></text>
			</view>
			<view class="user-item lg-navigator-hover" @tap="openDepartment">
				<text class="title">所在科室</text>
				<text class="message">{{ teamInfo.department || '请选择' }}</text>
				<text class="lg-icon icon iconfont iconjiantouarrow487"></text>
			</view>
			<view class="user-item user-item-textarea">
				<text class="title">团队说明</text>
				<textarea
					class="textarea-class"
					:maxlength="250"
					placeholder="请输入团队说明"
					placeholder-class="placeholderStyle"
					:value="teamInfo.description"
					@input="descriptionInput"
				></textarea>
			</view>
		</view>
		<view class="btn"><button class="creatTeam" @tap="creatTeam">创建团队</button></view>
		<!-- 性质 -->
		<uni-popup-select :list="typeData" :label="teamInfo.typeShow" :prop="prop" ref="popupCareerShow" @comfirm="onCareerComfirm"></uni-popup-select>
		<!-- 医院 -->
		<uni-popup-select
			:list="hospitalData"
			:label="teamInfo.hospital"
			:filters="true"
			:remote="true"
			:prop="propHospital"
			ref="popupDoctorHospital"
			@input="handlerFilter"
			@comfirm="onHospitalComfirm"
			@cancel="onHospitalCancel"
		></uni-popup-select>
		<!-- 科室 -->
		<uni-popup-cascader :list="departmentData" :label="teamInfo.department" @comfirm="onDepartmentComfirm" :prop="propDepartment" ref="popupDepartment"></uni-popup-cascader>
	</view>
</template>

<script>
import uploadJs from '@/mixins/uploadFile';
import { mapGetters } from 'vuex';
import { createOrUpdate } from '@/api/common';
import { teamVerify } from '@/api/team';
import { getAllDicByType, getHospitalList, getDepartmentList, getOperationList, getDiseaseList } from '@/api/system';
export default {
	mixins: [uploadJs],
	data() {
		return {
			apiName: 'team',
			teamInfo: {
				name: '',
				avatar: '',
				hospital: '',
				hospitalLevel: '',
				department: '',
				description: '',
				type: 1,
				typeShow: '院内'
			},
			typeData: [
				{
					key: '1',
					valueCn: '院内'
				}
			],
			hospitalData: [],
			departmentData: [],
			professionCallData: [],
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
			},
			certificateList: ''
		};
	},
	computed: {
		...mapGetters(['myInfo'])
	},
	onShow() {
		if (this.myInfo.doctor.department) {
			this.teamInfo.name = this.myInfo.nick + this.myInfo.doctor.department + '医疗团队';
		} else {
			this.teamInfo.name = this.myInfo.nick + '医疗团队';
		}
		this.getAllDicByType();
		this.getDepartmentList();
	},
	methods: {
		onLeftTap() {
			uni.navigateBack({ delta: 1 });
		},
		nameInput(e) {
			this.teamInfo.name = e.detail.value;
		},
		descriptionInput(e) {
			this.teamInfo.description = e.detail.value;
		},
		getAllDicByType() {
			getAllDicByType('jobTitle', res => {
				this.professionCallData = res.data.list;
			});
		},
		uploadImg() {
			this.uploadFile(
				['album', 'camera'],
				1,
				imgUrl => {
					this.teamInfo.avatar = imgUrl;
				},
				error => {
					this.$helper.toast('none', error);
				}
			);
		},
		// 性质
		openCareer() {
			this.$refs.popupCareerShow.open();
		},
		onCareerComfirm(e) {
			this.teamInfo.type = e.value;
			this.teamInfo.typeShow = e.key;
		},
		// 医院
		openDoctorHospital() {
			this.getList();
			this.$refs.popupDoctorHospital.open();
		},
		onHospitalCancel() {
			this.filters.keyWord = '';
		},
		onHospitalComfirm(e) {
			(this.teamInfo.hospital = e.key[0]), (this.teamInfo.hospitalLevel = e.data[0].type);
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
			this.teamInfo.department = e.key;
		},
		getDepartmentList() {
			getDepartmentList(res => {
				this.departmentData = res.data.info;
			});
		},
		creatTeam() {
			let me = this;
			const data = Object.assign({}, this.teamInfo);
			let formRules = [
				{ name: 'avatar', type: 'required', errmsg: '请上传团队头像' },
				{ name: 'name', type: 'required', errmsg: '请输入团队名称' },
				{ name: 'typeShow', type: 'required', errmsg: '请选择团队性质' },
				{ name: 'hospital', type: 'required', errmsg: '请选择所在医院' },
				{ name: 'department', type: 'required', errmsg: '请选择所在科室' }
			];
			let valRes = this.$validate.validate(data, formRules);
			if (!valRes.isOk) {
				this.$helper.toast('none', valRes.errmsg);
				return false;
			}
			this.$helper.loading('加载中', true);
			new Promise((resolve, reject) => {
				teamVerify(encodeURI(this.teamInfo.name), res => {
					if (res.data.info) {
						this.$helper.toast('none', '团队名称已被使用');
					} else {
						resolve();
					}
				});
			}).then(() => {
				createOrUpdate(this.apiName, data, res => {
					me.$store.dispatch('getMyInfo').then(() => {});
					this.add_groups()
				});
			});
		},
		add_groups() {
			let me = this
			let options = {
				data: {
					groupname: this.teamInfo.name,
					desc: this.teamInfo.description,
					public: true, // 公开群：true, 私有群：false
					members_only: true, // 加入群组是否需要群主或者群管理员审批
					allowinvites: false, //是否允许群成员邀请别人加入此群。 true：允许群成员邀请人加入此群，false：只有群主才可以往群里加人。
					owner: this.$store.getters.userInfo.uid + ''
				},
				success: function(respData){
					uni.showToast({
						title: "创建成功",
						duration: 2000,
						success: function(res){
							setTimeout(() => {
								me.$helper.toTab('/pages/tabBar/team');
							}, 2000);
						},
					});
				},
				error: function(err){
					me.$helper.toast('none', err.data.error_description, 2000, false, 'bottom');
				}
			};
			this.$im.conn.createGroupNew(options);
		}
	}
};
</script>

<style lang="scss">
.lg-container {
	width: 100vw;
	height: 100vh;
	background-color: #f4f4f4;
	.top {
		background: #fff;
		padding: 0 40rpx;
		margin-bottom: 2rpx;
		height: 215rpx;
		box-sizing: border-box;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		image {
			width: 90rpx;
			height: 90rpx;
			border: 1px solid #f4f4f4;
			border-radius: 50%;
		}
		.audit-status {
			color: #03a9ac;
			font-size: 26rpx;
			margin-top: 20rpx;
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
			&.user-item-textarea {
				height: 210rpx;
				padding: 36rpx 40rpx;
				align-items: flex-start;
				flex-direction: column;
				.textarea-class {
					width: 100%;
					height: 100rpx;
					margin-top: 10rpx;
					font-size: 26rpx;
					line-height: 36rpx;
					color: #888888;
				}
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
	.btn {
		width: 100%;
		padding: 0 40rpx;
		box-sizing: border-box;
		margin-top: 50rpx;
		.creatTeam {
			width: 100%;
			background: #03a9ac;
			color: #fff;
			font-size: 26rpx;
			line-height: 80rpx;
		}
	}
}
</style>
