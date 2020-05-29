<template>
	<view class="lg-container">
		<uni-nav-bar left-icon="back" title="设置" @clickLeft="onLeftTap"></uni-nav-bar>
		<view class="editor-container">
			<view class="editor-list">
				<navigator url="/pages/mine/amendPhone" class="editor-item">
					<image class="phone" src="https://gitee.com/picture_storage_area/follow_up_doctor/raw/master/images/username.png" mode=""></image>
					<text class="editor-name">更换手机</text>
					<text class="lg-icon icon iconfont iconjiantouarrow487"></text>
				</navigator>
				<navigator url="/pages/mine/amendPass" class="editor-item">
					<image class="password" src="https://gitee.com/picture_storage_area/follow_up_doctor/raw/master/images/password.png" mode=""></image>
					<text class="editor-name">修改密码</text>
					<text class="lg-icon icon iconfont iconjiantouarrow487"></text>
				</navigator>
			</view>
		</view>
		<button class="logout" @tap="onLogout">退出登录</button>
	</view>
</template>

<script>
export default {
	data() {
		return {};
	},
	methods: {
		onLeftTap() {
			uni.navigateBack({ delta: 1 });
		},
		onLogout() {
			this.$store.dispatch('logout').then(res => {
				this.$helper.toast('none', '退出成功')
				this.$im.conn.close();
				setTimeout(() => {
					this.$helper.toNew('/pages/login/index')
				}, 1000);
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
		.editor-container {
			.editor-list {
				.editor-item {
					width: 100%;
					padding: 0 40rpx;
					height: 100rpx;
					margin-bottom: 2rpx;
					background-color: #fff;
					box-sizing: border-box;
					display: flex;
					justify-content: space-between;
					align-items: center;
					.phone {
						width: 24rpx;
						height: 35rpx;
					}
					.password {
						width: 25rpx;
						height: 34rpx;
					}
					.editor-name {
						color: #888888;
						font-size: 28rpx;
						flex: 1;
						margin-left: 24rpx;
					}
					.lg-icon {
						color: #b9b9b9;
						font-size: 28rpx;
					}
				}
			}
		}
		.logout {
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
