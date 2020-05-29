<template>
	<view class="lg-container">
		<uni-nav-bar left-icon="back" title="修改密码" @clickLeft="onLeftTap"></uni-nav-bar>
		<view class="new-container">
			<view class="new-item">
				<input type="text" :value="data.oldPass" class="new-input" :password="oldPassword" name="oldPass" placeholder="旧密码" placeholder-class="placeholderStyle" @input="onOldPass">
				<image class="look" v-if="!oldPassword" src="https://gitee.com/picture_storage_area/follow_up_doctor/raw/master/images/look.png" @tap="onWitchOldShow" mode=""></image>
				<image class="look" v-else src="https://gitee.com/picture_storage_area/follow_up_doctor/raw/master/images/look_no.png" @tap="onWitchOldShow" mode=""></image>
			</view>
			<view class="new-item">
				<input class="new-input" :value="data.newPass" :password="newPassword" name="newPass" placeholder="新密码" placeholder-class="placeholderStyle" @input="onNewPass" >
				<image class="look" v-if="!newPassword" src="https://gitee.com/picture_storage_area/follow_up_doctor/raw/master/images/look.png" @tap="onWitchNewShow" mode=""></image>
				<image class="look" v-else src="https://gitee.com/picture_storage_area/follow_up_doctor/raw/master/images/look_no.png" @tap="onWitchNewShow" mode=""></image>
			</view>
		</view>
		<button class="bound" @tap="onBound">确认</button>
	</view>
</template>
<script>
import { changePass } from '@/api/mine';
export default {
	data() {
		return {
			data: {
				oldPass: '',
				newPass: ''
			},
			oldPassword: true,
			newPassword: true
		};
	},
	methods: {
		onLeftTap() {
			uni.navigateBack({ delta: 1 });
		},
		onOldPass(event) {
			this.data.oldPass = event.target.value;
		},
		onNewPass(event) {
			this.data.newPass = event.target.value;
		},
		onWitchOldShow() {
			this.oldPassword = !this.oldPassword
		},
		onWitchNewShow() {
			this.newPassword = !this.newPassword
		},
		onBound() {
			let amendRules = [
			  {name: 'oldPass', type: 'required', errmsg: '请输入旧密码'},
			  {name: 'newPass', type: 'required', errmsg: '请输入新密码'},
			  {name: 'newPass', type: 'pwd', errmsg: '密码须是6～16位字符'},
			]
			let valLoginRes = this.$validate.validate(this.data, amendRules)
			if (!valLoginRes.isOk) {
				this.$helper.toast('none', valLoginRes.errmsg)
			  return false
			}
			this.$helper.loading('密码修改中')
			changePass(this.data, res => {
				this.$helper.toast('success', '修改成功')
				this.data = {
					oldPass: '',
					newPass: ''
				}
				setTimeout(() => {
					this.$store.dispatch('logout').then(res => {
						uni.showModal({
							title: '提示',
							content: '登录失效，请重新登录',
							confirmColor: '#03A9AC',
							showCancel: false,
							success: (res)=> {
								this.$helper.toNew('/pages/login/index')
							}
						})
					})
				}, 1000)
			})
		}
	}
};
</script>
<style lang="scss">
	.lg-container {
		width: 100vw;
		height: 100vh;
		background-color: #f4f4f4;
		.new-container {
			.new-item {
				width: 100%;
				display: flex;
				justify-content: flex-start;
				align-items: center;
				padding: 0 40rpx;
				box-sizing: border-box;
				background-color: #fff;
				height:100rpx;
				background:rgba(255,255,255,1);
				margin-bottom: 2rpx;
				.new-input {
					flex: 1;
					height: 100%;
					line-height: 100rpx;
					color: #333333;
					font-size: 26rpx;
				}
				.placeholderStyle {
					color: #888888;
					font-size: 26rpx;
				}
				.look {
					width: 37rpx;
					height: 27rpx;
					padding: 20rpx;
				}
			}
		}
		.bound {
			width:672rpx;
			height:80rpx;
			line-height:80rpx;
			background:rgba(3,169,172,1);
			border-radius:10rpx;
			color: #fff;
			font-size: 26rpx;
			margin-top: 40rpx;
			&:after {
				display: none;
			}
		}
	}
</style>
