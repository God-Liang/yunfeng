<template>
	<view class="lg-container">
		<uni-nav-bar left-icon="back" title="更换手机号" @clickLeft="onLeftTap"></uni-nav-bar>
		<view class="old-container">
			<text class="old-phone">您的手机号：{{userInfo.name}}</text>
			<text class="hint">如需更换手机号，请先输入原密码</text>
		</view>
		<view class="new-container">
			<view class="new-item">
				<input type="text" :value="data.pass" class="new-input" password name="pass" placeholder="请输入原密码" placeholder-class="placeholderStyle" @input="onPass">
			</view>
			<view class="new-item">
				<input class="new-input" :value="data.newPhone" name="newPhone" placeholder="请输入新手机号" placeholder-class="placeholderStyle" maxlength="11" type="number" @input="onInput" >
			</view>
			<view class="new-item">
				<input type="text" class="new-input" :value="data.code" name="code" placeholder="请输入验证码" placeholder-class="placeholderStyle" @input="onCode" >
				<button
					hover-class="none"
					class="sendCode"
					:disabled="data.newPhone.length === 11 && isPhone ? false : true"
					:class="data.newPhone.length === 11 && isPhone ? '' : 'info'"
					@tap="onSend"
				>
					{{ sendTitle }}
				</button>
			</view>
		</view>
		<button class="bound" @tap="onBound">验证并更改</button>
	</view>
</template>
<script>
import { send, check } from '@/api/system';
import { changePhone } from '@/api/mine';
import { mapGetters } from 'vuex';
export default {
	data() {
		return {
			sendTitle: '发送验证码',
			data: {
				pass: '',
				newPhone: '',
				code: ''
			},
			isPhone: false,
			time: 60
		};
	},
	computed: {
		...mapGetters(['userInfo'])
	},
	methods: {
		onPass(event) {
			this.data.pass = event.target.value;
		},
		onCode(event) {
			this.data.code = event.target.value;
		},
		onLeftTap() {
			uni.navigateBack({ delta: 1 });
		},
		onInput(event) {
			this.data.newPhone = event.target.value;
			if (this.data.newPhone.length === 11) {
				if (!this.$validate.isPhone(this.data.newPhone)) {
					this.$helper.toast('none' ,'请输入正确的手机号')
					this.isPhone = false;
				} else {
					this.isPhone = true;
				}
			}
		},
		onBound() {
			let phoneRules = [
				  {name: 'pass', type: 'required', errmsg: '请输入原密码'},
					{name: 'newPhone', required: true, type: 'phone', errmsg: '请输入正确的新手机号'},
					{name: 'code', type: 'required', errmsg: '请输入验证码'},
				  {name: 'code', type: 'lengthRange', min: 6, max: 6, errmsg: '请正确输入验证码'}
			];
			let valPhoneRes = this.$validate.validate(this.data, phoneRules);
			if (!valPhoneRes.isOk) {
				this.$helper.toast('none' ,valPhoneRes.errmsg)
				return false;
			}
			this.$helper.loading('验证并更改中')
			changePhone(this.data, res => {
				this.$helper.toast('success' ,'更改成功')
				this.data = {
					pass: '',
					newPhone: '',
					code: ''
				}
				setTimeout(() => {
					this.$store.dispatch('logout').then(res => {
						uni.showModal({
							title: '提示',
							confirmColor: '#03A9AC',
							content: '登录失效，请重新登录',
							showCancel: false,
							success: (res)=> {
								this.$helper.toNew('/pages/login/index')
							}
						})
					})
				}, 1000)
			})
		},
		onSend() {
			const _this = this
			if (this.data.newPhone === this.userInfo.name) {
				uni.showModal({
					title: '提示',
					confirmColor: '#03A9AC',
					content: '该手机号与当前绑定的手机号相同',
					success: function(res) {
						if (res.confirm) {
							
						} else {
							_this.data.newPhone = ''
						}
					}
				});
				return false
			}
			this.onsetTimeout();
			send(this.data.newPhone, res => {
				this.$helper.toast('success' ,'发送成功')
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
		width: 100vw;
		height: 100vh;
		background-color: #f4f4f4;
		.old-container {
			height: 150rpx;
			width: 100%;
			display: flex;
			flex-direction: column;
			justify-content: center;
			background-color: #fff;
			padding-left: 40rpx;
			box-sizing: border-box;
			margin-bottom: 22rpx;
			.old-phone {
				color: #333333;
				font-size: 26rpx;
			}
			.hint {
				color: #888888;
				font-size: 22rpx;
				margin-top: 14rpx;
			}
		}
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
				.sendCode {
					width:150rpx;
					height:50rpx;
					line-height: 50rpx;
					background:rgba(3,169,172,1);
					border-radius:10rpx;
					color: #FFFFFF;
					font-size: 24rpx;
					padding: 0;
					&.info {
						background-color: #bbb;
					}
					&:after {
						display: none;
					}
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
