<template>
	<view class="lg-container">
		<uni-nav-bar left-icon="back" :title="patientInfo.name" @clickLeft="onLeftTap"></uni-nav-bar>
		<view class="user-list">
			<view class="user-item">
				<text class="title">姓名</text>
				<text class="message">{{ patientInfo.name || '无' }}</text>
			</view>
			<view class="user-item">
				<text class="title">手机号</text>
				<text class="message">{{ patientInfo.phone || '无' }}</text>
			</view>
			<view class="user-item">
				<text class="title">性别</text>
				<text class="message">{{ patientInfo.sexShow || '无' }}</text>
			</view>
			<view class="user-item">
				<text class="title">出生日期</text>
				<text class="message">{{ patientInfo.birthday || '无' }}</text>
			</view>
		</view>
		<view class="user-list">
			<view class="user-item">
				<text class="title">身高(cm)</text>
				<text class="message">{{ patientInfo.height || '无' }}</text>
			</view>
			<view class="user-item">
				<text class="title">体重(kg)</text>
				<text class="message">{{ patientInfo.weight || '无' }}</text>
			</view>
			<view class="user-item">
				<text class="title">BIM</text>
				<text class="message">{{ patientInfo.bim || '无' }}</text>
			</view>
			<view class="user-item">
				<text class="title">腰围(cm)</text>
				<text class="message">{{ patientInfo.waistline || '无' }}</text>
			</view>
		</view>
		<view class="user-list">
			<view class="user-item">
				<text class="title">吸烟史</text>
				<text class="message">{{ patientInfo.smoker || '无' }}</text>
			</view>
			<view class="user-item">
				<text class="title">饮酒史</text>
				<text class="message">{{ patientInfo.drinker || '无' }}</text>
			</view>
		</view>
		<view class="user-list">
			<view class="user-item">
				<text class="title">肝功能</text>
				<text class="message">{{ patientInfo.liver || '无' }}</text>
			</view>
			<view class="user-item">
				<text class="title">肾功能</text>
				<text class="message">{{ patientInfo.kidney || '无' }}</text>
			</view>
			<view class="user-item">
				<text class="title">婚姻状况</text>
				<text class="message">{{ patientInfo.marryStatus || '无' }}</text>
			</view>
			<view class="user-item">
				<text class="title">生育状况</text>
				<text class="message">{{ patientInfo.fertilityState || '无' }}</text>
			</view>
		</view>
		<view class="user-list">
			<view class="section-info">
				<view class="section-title">慢性病</view>
				<view class="section-list">
					<view class="section-item" :class="patientInfo.chronicDisease.includes(item) ? 'active' : ''" v-for="(item, index) in chronicDiseaseColumns" :key="index">
						{{ item }}
					</view>
				</view>
				<view class="section-other">{{ chronicDiseaseMore || '暂无补充内容' }}</view>
			</view>
		</view>
		<view class="user-list">
			<view class="section-info">
				<view class="section-title">家族病史</view>
				<view class="section-list">
					<view class="section-item" :class="patientInfo.familyDisease.includes(item) ? 'active' : ''" v-for="(item, index) in familyDiseaseColumns" :key="index">{{ item }}</view>
				</view>
				<view class="section-other">{{ familyDiseaseMore || '暂无补充内容' }}</view>
			</view>
		</view>
		<view class="user-list">
			<view class="section-info">
				<view class="section-title">药物过敏</view>
				<view class="section-list">
					<view class="section-item" :class="patientInfo.drugAllergy.includes(item) ? 'active' : ''" v-for="(item, index) in drugAllergyColumns" :key="index">{{ item }}</view>
				</view>
				<view class="section-other">{{ drugAllergyMore || '暂无补充内容' }}</view>
			</view>
		</view>
		<view class="user-list">
			<view class="section-info">
				<view class="section-title">食物/接触物过敏</view>
				<view class="section-list">
					<view class="section-item" :class="patientInfo.foodAllergy.includes(item) ? 'active' : ''" v-for="(item, index) in foodAllergyColumns" :key="index">{{ item }}</view>
				</view>
				<view class="section-other">{{ foodAllergyMore || '暂无补充内容' }}</view>
			</view>
		</view>
		<view class="user-list">
			<view class="section-info">
				<view class="section-title">个人习惯</view>
				<view class="section-list">
					<view class="section-item" :class="patientInfo.habit.includes(item) ? 'active' : ''" v-for="(item, index) in habitColumns" :key="index">{{ item }}</view>
				</view>
				<view class="section-other">{{ habitMore || '暂无补充内容' }}</view>
			</view>
		</view>
	</view>
</template>

<script>
import { getPatientInfo } from '@/api/team';
export default {
	onLoad(options) {
		if (options.id) {
			this.patientInfo.id = options.id;
		}
	},
	onShow() {
		this.readInfo();
	},
	data() {
		return {
			apiName: 'patient',
			patientInfo: {
				openId: '',
				id: null,
				name: '', // 姓名
				phone: '', // 手机号
				sex: null, // 性别ID
				sexShow: '', // 性别
				birthday: '', // 出生日期
				height: '', // 身高
				weight: '', // 体重
				bim: '', // BIM
				waistline: '', // 腰围
				smoker: '', // 吸烟史
				drinker: '', // 饮酒史
				liver: '', // 肝功能
				kidney: '', // 肾功能
				marryStatus: '', // 婚姻状况
				fertilityState: '', // 生育状况
				chronicDisease: [], // 慢性病
				familyDisease: [], // 家族病史
				drugAllergy: [], // 药物过敏
				foodAllergy: [], // 食物/接触物过敏
				habit: [] // 个人习惯
			},
			chronicDiseaseMore: '', // 慢性病更多
			familyDiseaseMore: '', // 家族病史更多
			drugAllergyMore: '', // 药物过敏更多
			foodAllergyMore: '', // 食物/接触物过敏更多
			habitMore: '', // 个人习惯更多
			chronicDiseaseColumns: ['暂无', '高血压', '糖尿病', '心脏病', '过敏性疾病', '哮喘', '白癜风', '癫痫', '其他'], // 慢性病选项
			familyDiseaseColumns: ['暂无', '高血压', '糖尿病', '心脏病', '脑梗', '癌症', '哮喘', '白癜风', '癫痫', '近视', '其他'], // 家族病史选项
			drugAllergyColumns: ['暂无', '青霉素', '头孢类', '破伤风抗霉素', '普鲁卡因', '地卡因', '磺胺类', '维生素B1', '泛影葡胺', '阿西匹林', '其他'], // 药物过敏选项
			foodAllergyColumns: ['暂无', '芒果', '牛奶', '坚果类', '海鲜', '黄瓜', '花粉', '油漆', '动物皮毛', '化妆品胺', '其他'], // 食物/接触物过敏选项
			habitColumns: ['低头族', '久坐', '久站', '强忍大小便', '喝酒', '熬夜', '跷二郎腿', '吸烟', '饭后卧床', '不常锻炼', '如厕玩手机', '不喜喝水', '其他'] // 个人习惯选项
		};
	},
	methods: {
		onLeftTap() {
			uni.navigateBack({ delta: 1 });
		},
		// 获取患者信息
		readInfo() {
			uni.showLoading({
				title: '加载中',
				mask: true
			});
			getPatientInfo(this.patientInfo.id, res => {
				uni.hideLoading()
				if (res.data.info) {
					this.patientInfo = res.data.info;
					// 慢性病
					if (!this.patientInfo.chronicDisease) {
						this.patientInfo.chronicDisease = [];
						this.chronicDiseaseMore = '';
					} else {
						const chronicDiseaseArr = this.patientInfo.chronicDisease.split('&');
						this.patientInfo.chronicDisease = chronicDiseaseArr[0] ? chronicDiseaseArr[0].split(',') : [];
						if (chronicDiseaseArr.length === 2) {
							this.chronicDiseaseMore = chronicDiseaseArr[1];
						}
					}
					// 家族病史
					if (!this.patientInfo.familyDisease) {
						this.patientInfo.familyDisease = [];
						this.familyDiseaseMore = '';
					} else {
						const familyDiseaseArr = this.patientInfo.familyDisease.split('&');
						this.patientInfo.familyDisease = familyDiseaseArr[0] ? familyDiseaseArr[0].split(',') : [];
						if (familyDiseaseArr.length === 2) {
							this.familyDiseaseMore = familyDiseaseArr[1];
						}
					}
					// 药物过敏
					if (!this.patientInfo.drugAllergy) {
						this.patientInfo.drugAllergy = [];
						this.drugAllergyMore = '';
					} else {
						const drugAllergyArr = this.patientInfo.drugAllergy.split('&');
						this.patientInfo.drugAllergy = drugAllergyArr[0] ? drugAllergyArr[0].split(',') : [];
						if (drugAllergyArr.length === 2) {
							this.drugAllergyMore = drugAllergyArr[1];
						}
					}
					// 食物/接触物过敏
					if (!this.patientInfo.foodAllergy) {
						this.patientInfo.foodAllergy = [];
						this.foodAllergyMore = '';
					} else {
						const foodAllergyArr = this.patientInfo.foodAllergy.split('&');
						this.patientInfo.foodAllergy = foodAllergyArr[0] ? foodAllergyArr[0].split(',') : [];
						if (foodAllergyArr.length === 2) {
							this.foodAllergyMore = foodAllergyArr[1];
						}
					}
					// 个人习惯
					if (!this.patientInfo.habit) {
						this.patientInfo.habit = [];
						this.habitMore = '';
					} else {
						const habitArr = this.patientInfo.habit.split('&');
						this.patientInfo.habit = habitArr[0] ? habitArr[0].split(',') : [];
						if (habitArr.length === 2) {
							this.habitMore = habitArr[1];
						}
					}
				}
			});
		}
	}
};
</script>

<style lang="scss" scoped>
.lg-container {
	width: 100vw;
	background-color: #f4f4f4;
	padding-bottom: 40rpx;
	.user-list {
		margin-bottom: 20rpx;
		&:last-child {
			margin-bottom: 0;
		}
		.user-item {
			width: 100%;
			height: 80rpx;
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
			.lg-icon-null {
				display: inline-block;
				width: 28rpx;
				height: 28rpx;
				margin-left: 4rpx;
			}
		}
		.section-info {
			background-color: #fff;
			.section-title {
				font-size: 26rpx;
				padding: 20rpx 40rpx;
			}
			.section-list {
				padding: 0 40rpx;
				display: flex;
				flex-wrap: wrap;
				.section-item {
					margin: 0 20rpx 20rpx 0;
					color: #ffffff;
					font-size: 20rpx;
					line-height: 20rpx;
					background: rgba(220, 220, 220, 1);
					border-radius: 16rpx;
					display: inline-block;
					padding: 8rpx 22rpx;
					&.active {
						background-color: #03a9ac;
					}
				}
			}
			.section-other {
				height: 70rpx;
				line-height: 70rpx;
				padding: 0 40rpx;
				border-top: 2rpx solid #f4f4f4;
				font-size: 26rpx;
				color: #888888;
			}
		}
	}
}
</style>
