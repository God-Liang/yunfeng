<template>
	<view class="lg-container">
		<uni-nav-bar left-icon="back" title="找回密码" @clickLeft="onLeftTap"></uni-nav-bar>
		<form class="register" @submit="registerSubmit">
			<view class="register-form-item">
				<image class="icon-form" src="/static/system/username.png"></image>
				<input
					class="register-input"
					:value="registerdata.phone"
					name="phone"
					type="number"
					placeholder="请输入登录手机号码"
					maxlength="11"
					placeholder-class="placeholderStyle"
					@input="onInput"
				/>
			</view>
			<view class="register-form-item">
				<image class="icon-form" src="/static/system/code.png"></image>
				<input class="register-input" :value="registerdata.code" name="code" placeholder="请输入手机验证码" placeholder-class="placeholderStyle" />
				<button
					hover-class="none"
					class="sendCode"
					:disabled="registerdata.phone.length === 11 && isPhone ? false : true"
					:class="registerdata.phone.length === 11 && isPhone ? '' : 'info'"
					@tap="onSend"
				>
					{{ sendTitle }}
				</button>
			</view>
			<view class="register-form-item">
				<image class="icon-form username" src="/static/system/password.png"></image>
				<input class="register-input" :value="registerdata.password" name="password" password placeholder="请重设密码" placeholder-class="placeholderStyle" />
			</view>
			<view class="register-form-item borderNone"><button class="submit" form-type="submit">确认</button></view>
		</form>
	</view>
</template>

<script>
import { send, check, forgetPass } from '@/api/system';
export default {
	data() {
		return {
			sendTitle: '发送验证码',
			registerdata: {
				phone: '',
				password: '',
				confirmpass: '',
				code: ''
			},
			isPhone: false,
			time: 60
		};
	},
	methods: {
		onLeftTap() {
			uni.navigateBack({ delta: 1 });
		},
		onInput(event) {
			this.registerdata.phone = event.target.value;
			if (this.registerdata.phone.length === 11) {
				if (!this.$validate.isPhone(this.registerdata.phone)) {
					this.$helper.toast('none', '请输入正确的手机号')
					this.isPhone = false;
				} else {
					this.isPhone = true;
				}
			}
		},
		registerSubmit(e) {
			this.registerdata = e.detail.value;
			let registerRules = [
			  {name: 'phone', required: true, type: 'phone', errmsg: '请输入正确的手机号'},
			  {name: 'password', type: 'required', errmsg: '请输入密码'},
			  {name: 'password', type: 'pwd', errmsg: '密码须是6～16位字符'},
			  {name: 'code', type: 'required', errmsg: '请输入验证码'},
			  {name: 'code', type: 'lengthRange', min: 6, max: 6, errmsg: '请正确输入验证码'}
			]
			let valRes = this.$validate.validate(this.registerdata, registerRules)
			if (!valRes.isOk) {
				this.$helper.toast('none', valRes.errmsg)
			  return false
			}
			this.$helper.loading('加载中')
			new Promise((resolve, reject) => {
				const data = Object.assign({}, this.registerdata)
				check(data, res => {
					resolve()
				})
			}).then(() => {
				const data = {
					phone: this.registerdata.phone,
					pass: this.registerdata.password
				}
				forgetPass(data, res => {
					this.$helper.toast('none', '修改成功')
					this.registerdata = {
						phone: '',
						password: '',
						code: ''
					};
					setTimeout(() => {
						this.$helper.toNew('/pages/login/index')
					}, 1000);
				});
			})
		},
		onSend() {
			this.onsetTimeout();
			send(this.registerdata.phone, res => {
				uni.showToast({
					title: '发送成功',
					duration: 2000,
					icon: 'none'
				});
			});
		},
		onsetTimeout() {
			if (this.time == 0) {
				this.isPhone = true;
				this.sendTitle = '发送验证码';
				this.time = 60;
			} else {
				this.isPhone = false;
				this.sendTitle = '重新发送(' + this.time + ')';
				this.time--;
				setTimeout(() => {
					this.onsetTimeout();
				}, 1000);
			}
		}
	}
};
</script>

<style lang="scss">
.lg-container {
	background-color: #fff;
	.logo-container {
		height: 440rpx;
		width: 100%;
		image {
			width: 100%;
			height: 100%;
		}
	}
	.register {
		display: block;
		width: 566rpx;
		background: rgba(255, 255, 255, 1);
		border-radius: 15rpx;
		margin: 30rpx auto 80rpx;
		.go-login {
			width: 100%;
			margin: 16rpx 0 60rpx;
			display: flex;
			justify-content: flex-end;
			.lg-navigator {
				color: #BCBCBC;
				font-size: 22rpx;
				font-weight: 700;
			}
		}
		.register-form-item {
			width: 100%;
			padding: 20rpx 16rpx;
			box-sizing: border-box;
			display: flex;
			justify-content: flex-start;
			align-items: center;
			border-bottom: 2rpx solid #EDEDED;
			margin-bottom: 30rpx;
			&.borderNone {
				border-bottom: 0;
				margin-top: 90rpx;
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
			.register-input {
				font-size: 34rpx;
				color: #444444;
				text-align: left;
				flex: 1;
			}
			.sendCode {
				width: 160rpx;
				height: 60rpx;
				line-height: 60rpx;
				text-align: center;
				background: rgba(3, 169, 172, 1);
				border-radius: 5px;
				font-size: 24rpx;
				font-weight: 400;
				color: rgba(255, 255, 255, 1);
				padding: 0;
				&.info {
					background-color: #bbb;
				}
				&:after {
					display: none;
				}
			}
			.placeholderStyle {
				color: #BCBCBC;
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
}
</style>
