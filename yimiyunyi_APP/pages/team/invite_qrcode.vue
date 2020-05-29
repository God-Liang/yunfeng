<template>
	<view class="lg-container">
		<uni-nav-bar left-icon="back" title="二维码邀请" @clickLeft="onLeftTap"></uni-nav-bar>
		<view class="qrcode-container">
			<view class="qrcode-header">
				<view class="avatar">
					<image v-if="teamInfo.avatar" class="img-yes img-border" :src="teamInfo.avatar" mode="aspectFill"></image>
					<image v-else class="img-yes img-border" src="@/static/team/avatar.png" mode=""></image>
				</view>
				<view class="teamInfo">
					<view class="name">
						<text>{{ teamInfo.name || '暂无团队名称' }}</text>
					</view>
					<view class="team-hospital">{{ teamInfo.hospital || '暂无所在医院' }}</view>
				</view>
			</view>
			<view class="qrcode-content"><image :src="qrcode" mode=""></image></view>
			<view class="qrcode-hint">扫一扫，邀请新成员加入</view>
		</view>
		<view class="operation_box">
			<view class="operation_item" @tap="onShare">
				<image class="img" src="@/static/team/wx.png" mode=""></image>
				<text class="txt">分享至微信</text>
			</view>
			<view class="operation_item" @tap="onSave1">
				<image class="img" src="@/static/team/qrcode.png" mode=""></image>
				<text class="txt">保存二维码</text>
			</view>
		</view>
		<!-- <canvas style="width: 340px; height: 450px;position:absolute;top:-9999px;left:-9999px" canvas-id="firstCanvas"></canvas> -->
		<canvas canvas-id="myCanvas" style="width:240px;height:240px;position:absolute;top:-9999px;left:-9999px" />
	</view>
</template>

<script>
import common from '@/mixins/common';
import { mapGetters } from 'vuex';
import { read } from '@/api/common';
import { getTeamCode } from '@/api/team';
export default {
	mixins: [common],
	computed: {
		...mapGetters(['myInfo'])
	},
	data() {
		return {
			teamInfo: {
				avatar: ''
			},
			teamId: '',
			apiName: 'team',
			qrcode: '',
			url: ''
		};
	},
	onShow() {
		this.getTeamInfo();
		this.getTeamCode();
	},
	methods: {
		circleImg(ctx, img, x, y, r) {
			return new Promise((resolve, reject) => {
				uni.getImageInfo({
					src: img,
					success(res) {
						console.log(res)
						ctx.save();
						var d = 2 * r;
						var cx = x + r;
						var cy = y + r;
						ctx.arc(cx, cy, r, 0, 2 * Math.PI);
						ctx.clip();
						ctx.drawImage(res.path, x, y, d, d);
						ctx.restore();
						ctx.draw(true);
						resolve();
					}
				});
			});
		},
		normalImg(ctx, img, x, y, w, h) {
			return new Promise((resolve, reject) => {
				uni.getImageInfo({
					src: img,
					success(res) {
						console.log(res)
						ctx.drawImage(res.path, x, y, w, h);
						ctx.restore();
						ctx.draw(true);
						resolve();
					}
				});
			});
		},
		mapFillRoundRect(ctx, xImg, yImg) {
			for (var i = 0; i < 26; i++) {
				this.fillRoundRect(ctx, xImg + i*10, yImg + 75, 6, 6, 3, '#fff')
			}
		},
		fillRoundRect(cxt, x, y, width, height, radius, fillColor) {
			//圆的直径必然要小于矩形的宽高
			if (2 * radius > width || 2 * radius > height) {
				return false;
			}
			cxt.save();
			cxt.translate(x, y);
			//绘制圆角矩形的各个边
			this.drawRoundRectPath(cxt, width, height, radius);
			cxt.fillStyle = fillColor || '#000'; //若是给定了值就用给定的值否则给予默认值
			cxt.fill();
			cxt.restore();
		},
		drawRoundRectPath(cxt, width, height, radius) {
			cxt.beginPath(0);
			//从右下角顺时针绘制，弧度从0到1/2PI
			cxt.arc(width - radius, height - radius, radius, 0, Math.PI / 2);
		
			//矩形下边线
			cxt.lineTo(radius, height);
		
			//左下角圆弧，弧度从1/2PI到PI
			cxt.arc(radius, height - radius, radius, Math.PI / 2, Math.PI);
		
			//矩形左边线
			cxt.lineTo(0, radius);
		
			//左上角圆弧，弧度从PI到3/2PI
			cxt.arc(radius, radius, radius, Math.PI, (Math.PI * 3) / 2);
		
			//上边线
			cxt.lineTo(width - radius, 0);
		
			//右上角圆弧
			cxt.arc(width - radius, radius, radius, (Math.PI * 3) / 2, Math.PI * 2);
		
			//右边线
			cxt.lineTo(width, height - radius);
			cxt.closePath();
		},
		onLeftTap() {
			uni.navigateBack({ delta: 1 });
		},
		// 获取团队信息
		getTeamInfo() {
			read(this.apiName, this.myInfo.doctor.doctorTeamId, res => {
				if (res.data.info) {
					this.teamInfo = res.data.info;
				}
			});
		},
		getTeamCode() {
			const str = this.myInfo.doctor.doctorTeamId + ',' + this.myInfo.id + ',' + encodeURIComponent(this.myInfo.nick);
			this.qrcode = 'http://api-test.hnasa.cn/qrcode/TeamCode/' + str
		},
		onShare() {
			// uni.share({
			// 	provider: 'weixin',
			// 	scene: 'WXSceneSession',
			// 	type: 2,
			// 	imageUrl: this.url,
			// 	success: function(res) {
			// 		console.log('success:' + JSON.stringify(res));
			// 	},
			// 	fail: function(err) {
			// 		console.log('fail:' + JSON.stringify(err));
			// 	}
			// });
			this.$helper.toast('none', '暂不支持')
		},
		// 保存二维码+边框
		onSave() {
			// this.$helper.loading('保存中')
			let w1 = 340,
				h1 = 450,
				x = 0,
				y = 0,
				r = 10,
				wImg = 55,
				hImg = 55,
				xImg = 30,
				yImg = 30,
				rImg = wImg/2,
				name = this.teamInfo.name,
				hospital = this.teamInfo.hospital,
				department = this.teamInfo.department,
				avatar = this.teamInfo.avatar || 'https://gitee.com/picture_storage_area/follow_up_doctor/raw/master/images/patient/doctor_man.jpg',
				qrCode = this.qrcode
			var ctx = uni.createCanvasContext('firstCanvas');
			// 白色背景
			this.fillRoundRect(ctx, x, y, w1, h1, 10, '#fff')
			// 头像
			this.circleImg(ctx, avatar, xImg, yImg, rImg)
			// 文字
			ctx.setFillStyle('#333')
			ctx.setFontSize(17)
			ctx.fillText(name, x + wImg + 40, y + 52)
			ctx.setFontSize(12)
			ctx.fillText(hospital, x + wImg + 40, y + 76)
			this.mapFillRoundRect(ctx, xImg, yImg)
			this.normalImg(ctx, qrCode, xImg, 100, 280, 280);
			ctx.setFillStyle('#888888')
			ctx.setFontSize(12)
			ctx.fillText('扫一扫，邀请新成员加入', w1/2 - 65, h1 - 40)
			ctx.draw(false, () => {
				// canvasToTempFilePath：将画布导出为图片并返回路径
				setTimeout(() => {
					uni.canvasToTempFilePath({
						fileType: 'jpg', //降低质量 提升保存速度
						quality: Number(0.5), //降低质量 提升保存速度
						canvasId: 'firstCanvas',
						success: res => {
							//saveImageToPhotosAlbum保存图片到本地相册
							uni.saveImageToPhotosAlbum({
								filePath: res.tempFilePath,
								success: () => {
									this.$helper.toast('success', '保存成功');
								}
							});
						}
					})
				}, 1500)
			});
		},
		onSave1() {
			const context = uni.createCanvasContext('myCanvas'); //创建画布 id为html片段定义
			uni.showLoading({
				title: '保存中'
			});
			context.drawImage(this.qrcode, 0, 0, 240, 240); //drawImage(图片路径，起点x，起点y，绘制宽，绘制高)
			//draw（false:不需要重新绘制） 需要在回调后保存图片 否则为空白
			context.draw(false, () => {
				//canvasToTempFilePath：将画布导出为图片并返回路径
				uni.canvasToTempFilePath({
					fileType: 'jpg', //降低质量 提升保存速度
					quality: Number(0.5), //降低质量 提升保存速度
					canvasId: 'myCanvas',
					success: res => {
						this.url = res.tempFilePath
						//saveImageToPhotosAlbum保存图片到本地相册
						uni.saveImageToPhotosAlbum({
							filePath: res.tempFilePath,
							success: () => {
								uni.showToast({
									title: '保存成功',
									icon: 'none'
								});
							}
						});
					}
				});
			});
		}
	}
};
</script>

<style lang="scss" scoped>
.lg-container {
	.qrcode-container {
		width: 690rpx;
		background-color: #fff;
		border-radius: 10rpx;
		margin: 50px auto 0;
		box-sizing: border-box;
		padding: 50rpx;
		.qrcode-header {
			display: flex;
			justify-content: flex-start;
			margin-bottom: 40rpx;
			.avatar {
				display: flex;
				justify-content: center;
				align-items: center;
				box-sizing: border-box;
				.img-yes {
					width: 100rpx;
					height: 100rpx;
					display: block;
					border-radius: 50%;
				}
				.img-border {
					border: 2rpx solid rgba(220, 220, 220, 1);
				}
			}
			.teamInfo {
				flex: 1;
				display: flex;
				flex-direction: column;
				margin-left: 30rpx;
				margin-top: 16rpx;
				.name {
					display: flex;
					justify-content: flex-start;
					align-items: center;
					text {
						font-size: 34rpx;
						line-height: 36rpx;
						color: #333333;
					}
				}
				.team-hospital {
					height: 36rpx;
					line-height: 36rpx;
					margin-top: 18rpx;
					color: #333333;
					font-size: 24rpx;
				}
			}
		}
		.qrcode-content {
			width: 560rpx;
			height: 560rpx;
			margin: 0 auto;
			image {
				width: 100%;
				height: 100%;
			}
		}
		.qrcode-hint {
			color: #888888;
			font-size: 24rpx;
			text-align: center;
			margin: 10rpx 0;
		}
	}
	.operation_box {
		width: 100vw;
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-top: 40rpx;
		.operation_item {
			flex: 1;
			display: flex;
			justify-content: center;
			flex-direction: column;
			align-items: center;
			.img {
				width: 80rpx;
				height: 80rpx;
			}
			.txt {
				color: #888888;
				font-size: 24rpx;
				margin-top: 10rpx;
			}
		}
	}
}
</style>
