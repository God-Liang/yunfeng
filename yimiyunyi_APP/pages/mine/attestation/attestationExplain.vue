<template>
	<view class="lg-container">
		<uni-nav-bar left-icon="back" title="认证说明" @clickLeft="onLeftTap"></uni-nav-bar>
		<view class="explain-container">
			<view class="explain-item">
				<view class="explain-head">
					<image class="uploadInfo" src="https://gitee.com/picture_storage_area/follow_up_doctor/raw/master/images/mine/uploadInfo.png" mode=""></image>
					<text>上传资料</text>
				</view>
				<view class="explain-foot">
					请按照选择的证件类型上传对应的照片，保存图片清晰、完整、无遮挡。
				</view>
			</view>
			<view class="explain-item">
				<view class="explain-head">
					<image class="infoSecrecy" src="https://gitee.com/picture_storage_area/follow_up_doctor/raw/master/images/mine/infoSecrecy.png" mode=""></image>
					<text>资料保密</text>
				</view>
				<view class="explain-foot">
					<text>上传的证件照片仅用于医生资格认证，绝不会另作他用。</text>
					您填写的所有信息都会加密保存，绝不会泄露资料在医生圈。
				</view>
			</view>
			<view class="explain-item">
				<view class="explain-head">
					<image class="check" src="https://gitee.com/picture_storage_area/follow_up_doctor/raw/master/images/mine/check.png" mode=""></image>
					<text>如何审核</text>
				</view>
				<view class="explain-foot">
					我们的审核时间是工作日早上9点到晚上6点，其他时间提交认证请耐心等待哦，一定会在下一个工作日内处理。
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			
		};
	},
	methods: {
		onLeftTap() {
			uni.navigateBack({ delta: 1 });
		},
	}
};
</script>

<style lang="scss">
.lg-container {
	.explain-container {
		.explain-item {
			padding: 40rpx 40rpx 45rpx;
			box-sizing: border-box;
			width: 100%;
			background-color: #fff;
			margin-bottom: 2rpx;
			.explain-head {
				display: flex;
				align-items: center;
				margin-bottom: 20rpx;
				.uploadInfo {
					width: 41rpx;
					height: 31rpx;
				}
				.infoSecrecy {
					width: 33rpx;
					height: 37rpx;
				}
				.check {
					width: 36rpx;
					height: 36rpx;
				}
				text {
					color: #333333;
					font-size: 30rpx;
					margin-left: 20rpx;
				}
			}
			.explain-foot {
				color: #333333;
				font-size: 24rpx;
			}
		}
	}
}
</style>
