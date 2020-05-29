<template>
	<view class="lg-container">
		<view class="logo-container"><image src="/static/system/logo.png" mode=""></image></view>
		<form class="login" @submit="loginSubmit">
			<view class="login-form-item">
				<image class="icon-form username" src="/static/system/username.png"></image>
				<input
					class="login-input"
					:value="logindata.username"
					name="username"
					type="number"
					placeholder="请输入登录手机号码"
					maxlength="11"
					placeholder-class="placeholderStyle"
					@input="onUsername"
				/>
			</view>
			<view class="login-form-item mbNone">
				<image class="icon-form" src="/static/system/password.png"></image>
				<input class="login-input" :value="logindata.password" name="password" password placeholder="请输入登录密码" placeholder-class="placeholderStyle" @input="onPassword" />
			</view>
			<view class="go-login">
				<navigator class="lg-navigator" hover-class="none" url="/pages/forgotPassword/index">忘记密码？</navigator>
				<navigator class="lg-navigator" hover-class="none" url="/pages/register/index">现在注册</navigator>
			</view>
			<view class="login-form-item borderNone"><button class="submit" form-type="submit">登录</button></view>
		</form>
	</view>
</template>

<script>
import { login } from '@/api/system';
let disp = require('@/utils/broadcast');
export default {
	data() {
		return {
			logindata: {
				username: '',
				password: ''
			}
		};
	},
	onLoad() {
		disp.on('em.xmpp.error.passwordErr', () => {
			this.$helper.toast('none', '用户名或密码错误')
		});
	},
	onShow() {
		if (uni.getStorageSync('lg-username')) {
			this.logindata.username = parseInt(uni.getStorageSync('lg-username'))
		}
	},
	methods: {
		onUsername(event) {
			this.logindata.username = event.target.value;
		},
		onPassword(event) {
			this.logindata.password = event.target.value;
		},
		async loginSubmit(e) {
			this.logindata = e.detail.value;
			let loginRules = [
				{ name: 'username', required: true, type: 'phone', errmsg: '请输入正确的手机号' },
				{ name: 'password', type: 'required', errmsg: '请输入密码' },
				{ name: 'password', type: 'pwd', errmsg: '密码须是6～16位字符' }
			];
			let valLoginRes = this.$validate.validate(this.logindata, loginRules);
			if (!valLoginRes.isOk) {
				this.$helper.toast('none', valLoginRes.errmsg)
				return false;
			}
			this.$helper.loading('登录中')
			const res = await this.$store.dispatch('login', this.logindata)
			if (res) {
				await this.$store.dispatch('getUserInfo')
				const myInfoRes = await this.$store.dispatch('getMyInfo')
				if (myInfoRes) {
					this.loginIM(myInfoRes.data.info)
				}
			}
		},
		// 环信登录
		loginIM(myInfo) {
			uni.setStorageSync("myUsername",myInfo.id);
			this.$conn.open({
				apiUrl: this.$im.config.apiURL,
				user: myInfo.id,
				pwd: 'yimiyunyi',
				grant_type: 'password',
				appKey: this.$im.config.appkey
			});
		},
	}
};
</script>

<style lang="scss">
.lg-container {
	background-color: #fff;
	.logo-container {
		height: 407rpx;
		width: 100%;
		image {
			width: 100%;
			height: 100%;
		}
	}
	.login {
		display: block;
		width: 566rpx;
		background: rgba(255, 255, 255, 1);
		border-radius: 15rpx;
		margin: 100rpx auto 200rpx;
		.go-login {
			width: 100%;
			margin: 16rpx 0 60rpx;
			display: flex;
			justify-content: space-between;
			.lg-navigator {
				color: #bcbcbc;
				font-size: 22rpx;
				font-weight: 700;
			}
		}
		.login-form-item {
			width: 100%;
			padding: 20rpx 16rpx;
			box-sizing: border-box;
			display: flex;
			justify-content: flex-start;
			align-items: center;
			border-bottom: 2rpx solid #ededed;
			margin-bottom: 30rpx;
			&.borderNone {
				border-bottom: 0;
			}
			&.mbNone {
				margin-bottom: 0;
			}
			.icon-form {
				width: 37rpx;
				height: 43rpx;
				margin-right: 27rpx;
				&.username {
					width: 39rpx;
					height: 44rpx;
				}
			}
			.login-input {
				font-size: 34rpx;
				color: #444444;
				text-align: left;
				flex: 1;
			}
			.placeholderStyle {
				color: #999999;
				font-size: 34rpx;
			}
			.submit {
				width: 466rpx;
				height: 100rpx;
				line-height: 100rpx;
				background: linear-gradient(270deg, rgba(92, 204, 205, 1), rgba(3, 169, 172, 1));
				box-shadow: 0px 15px 18px 0px rgba(171, 171, 171, 0.1);
				border-radius: 15rpx;
				color: #ffffff;
				font-size: 34rpx;
				&::after {
					border: 0;
				}
			}
		}
	}
	.regulations {
		margin-top: 47rpx;
		text-align: center;
		text {
			color: #bcbcbc;
			font-size: 28rpx;
		}
		navigator {
			display: inline-block;
			color: #bcbcbc;
			font-size: 28rpx;
			text-decoration: underline;
		}
	}
}
</style>
