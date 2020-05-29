<template>
	<view class="lg-container">
		<view class="logo-container"><image src="/static/system/logo.png" mode=""></image></view>
		<form class="register" @submit="registerSubmit">
			<view class="register-form-item">
				<image class="icon-form" src="/static/system/username.png"></image>
				<input
					class="register-input"
					:value="registerdata.phone"
					name="phone"
					type="number"
					placeholder="请输入手机号码"
					maxlength="11"
					placeholder-class="placeholderStyle"
					@input="onInput"
				/>
			</view>
			<view class="register-form-item">
				<image class="icon-form username" src="/static/system/password.png"></image>
				<input
					class="register-input"
					@input="onPassword"
					:value="registerdata.password"
					name="password"
					password
					placeholder="请输入登录密码"
					placeholder-class="placeholderStyle"
				/>
			</view>
			<view class="register-form-item">
				<image class="icon-form" src="/static/system/password.png"></image>
				<input
					class="register-input"
					@input="onConfirmpass"
					:value="registerdata.confirmpass"
					name="confirmpass"
					password
					placeholder="请确认登录密码"
					placeholder-class="placeholderStyle"
				/>
			</view>
			<view class="register-form-item mbNone">
				<image class="icon-form" src="/static/system/code.png"></image>
				<input class="register-input" @input="onCode" :value="registerdata.code" name="code" placeholder="请输入手机验证码" placeholder-class="placeholderStyle" />
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
			<view class="go-login"><navigator class="lg-navigator" hover-class="none" url="/pages/login/index">已有账号，去登录</navigator></view>
			<view class="register-form-item borderNone mbNone"><button class="submit" form-type="submit">注册</button></view>
		</form>
		<view class="regulations">
			<checkbox-group @change="agreeChange">
				<label>
					<checkbox value="agree" color="#03A9AC" style="transform:scale(0.7)" />
					<text>我已阅读并同意</text>
					<text class="navigator" @tap="onNavAgree">“用户协议”</text>
				</label>
			</checkbox-group>
			<!-- <text>和</text> -->
			<!-- <navigator hover-class="none" url="">“隐私政策”</navigator> -->
		</view>
	</view>
</template>

<script>
import { send, check, register } from '@/api/system';
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
			time: 60,
			agreeAgreement: false
		};
	},
	mounted() {
		if (uni.getStorageSync('registerDate')) {
			this.registerdata = uni.getStorageSync('registerDate');
		}
	},
	methods: {
		onInput(event) {
			this.registerdata.phone = event.target.value;
			if (this.registerdata.phone.length === 11) {
				if (!this.$validate.isPhone(this.registerdata.phone)) {
					this.$helper.toast('none', '请输入正确的手机号');
					this.isPhone = false;
				} else {
					this.isPhone = true;
				}
			}
		},
		onPassword(e) {
			this.registerdata.password = event.target.value;
		},
		onConfirmpass(e) {
			this.registerdata.confirmpass = event.target.value;
		},
		onCode(e) {
			this.registerdata.code = event.target.value;
		},
		agreeChange(e) {
			if (e.detail.value.length > 0) {
				this.agreeAgreement = true;
			} else {
				this.agreeAgreement = false;
			}
		},
		onNavAgree() {
			uni.getStorageSync('registerDate', this.registerdata);
			this.$helper.to('/pages/register/agreement');
		},
		registerSubmit(e) {
			this.registerdata = e.detail.value;
			let registerRules = [
				{ name: 'phone', required: true, type: 'phone', errmsg: '请输入正确的手机号' },
				{ name: 'password', type: 'required', errmsg: '请输入密码' },
				{ name: 'password', type: 'pwd', errmsg: '密码须是6～16位字符' },
				{ name: 'confirmpass', type: 'eq', eqName: 'password', required: true, errmsg: '两次输入密码不一致' },
				{ name: 'code', type: 'required', errmsg: '请输入验证码' },
				{ name: 'code', type: 'lengthRange', min: 6, max: 6, errmsg: '请正确输入验证码' }
			];
			let valRes = this.$validate.validate(this.registerdata, registerRules);
			if (!valRes.isOk) {
				this.$helper.toast('none', valRes.errmsg);
				return false;
			}
			if (!this.agreeAgreement) {
				this.$helper.toast('none', '请阅读并同意‘用户协议’');
				return false;
			}
			this.$helper.loading('注册中');
			const data = Object.assign({}, this.registerdata);
			new Promise((resolve, reject) => {
				const data = Object.assign({}, this.registerdata);
				check(data, res => {
					resolve();
				});
			}).then(() => {
				register(this.registerdata, res => {
					const logindata = {
						username: this.registerdata.phone,
						password: this.registerdata.password
					};
					uni.getStorageSync('lg-username', this.registerdata.phone);
					this.$store.dispatch('login', logindata).then(res => {
						if (res) {
							this.$store.dispatch('getUserInfo').then(() => {});
							this.$store.dispatch('getMyInfo').then(myInfoRes => {
								if (myInfoRes) {
									this.registerIM(myInfoRes.data.info)
								}
							});
						}
					});
				});
			});
		},
		// 环信注册
		registerIM(myInfo) {
			let me = this;
			var options = {
				apiUrl: this.$im.config.apiURL,
				username: myInfo.id + '',
				password: 'yimiyunyi',
				nickname: '',
				appKey: this.$im.config.appkey,
				success: function(res) {
					if (res.statusCode == '200') {
						me.loginIM(myInfo);
					}
				},
				error: function(res) {
					console.log('res', res);
					if (res.statusCode !== '200') {
						if (res.statusCode == '400' && res.data.error == 'illegal_argument') {
							this.$helper.toast('none', '用户名非法');
							return;
						}
						this.$helper.toast('none', '用户名已被占用');
					}
				}
			};
			this.$im.utils.registerUser(options);
		},
		// 环信登录
		loginIM(myInfo) {
			this.$helper.loading('自动登录中')
			uni.setStorageSync("myUsername",myInfo.id);
			this.$conn.open({
				apiUrl: this.$im.config.apiURL,
				user: myInfo.id,
				pwd: 'yimiyunyi',
				grant_type: 'password',
				appKey: this.$im.config.appkey
			});
		},
		onSend() {
			this.onsetTimeout();
			send(this.registerdata.phone, res => {
				this.$helper.toast('none', '发送成功');
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
	background-color: #ffffff;
	.logo-container {
		height: 407rpx;
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
				color: #bcbcbc;
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
				color: #bcbcbc;
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
		text-align: center;
		text {
			color: #bcbcbc;
			font-size: 28rpx;
		}
		.navigator {
			display: inline-block;
			color: #bcbcbc;
			font-size: 28rpx;
			text-decoration: underline;
		}
	}
}
</style>
