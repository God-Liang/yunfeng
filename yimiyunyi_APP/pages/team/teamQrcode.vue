<template>
	<view class="lg-container">
		<uni-nav-bar left-icon="back" title="团队二维码" @clickLeft="onLeftTap"></uni-nav-bar>
		<view class="qrcode-container">
			<view class="qrcode-box">
				<view class="qrcode-header">
					<view class="avatar">
						<image v-if="teamInfo.avatar" class="img-yes" :src="teamInfo.avatar" mode="aspectFill"></image>
						<image
							v-if="!teamInfo.avatar && teamInfo.sex"
							class="img-yes"
							src="https://gitee.com/picture_storage_area/follow_up_doctor/raw/master/images/patient/doctor_woman.jpg"
							mode=""
						></image>
						<image
							v-if="!teamInfo.avatar && !teamInfo.sex"
							class="img-yes"
							src="https://gitee.com/picture_storage_area/follow_up_doctor/raw/master/images/patient/doctor_man.jpg"
							mode=""
						></image>
					</view>
					<view class="userinfo">
						<view class="username">
							<text>{{ teamInfo.name || '暂无团队名称' }}</text>
						</view>
						<view class="doctorid">
							<text class="team-hospital">{{ teamInfo.hospital || '暂无医院' }}</text>
							<text class="team-department">{{ teamInfo.department || '暂无科室' }}</text>
						</view>
					</view>
				</view>
				<view class="qrcode-content">
					<view class="qrcode-round"><view class="qrcode-round-item" v-for="(item, index) in list" :key="index"></view></view>
					<image :src="qrcode" mode=""></image>
				</view>
			</view>
			<view class="qrcode-hint">扫一扫，邀请新患者加入</view>
		</view>
		<!-- <canvas style="width: 340px; height: 450px;position:absolute;top:-9999px;left:-9999px" canvas-id="firstCanvas"></canvas> -->
		<button class="lg-save-btn" @tap="onSave1">保存到手机</button>
		<canvas canvas-id="myCanvas" style="width:240px;height:240px;position:absolute;top:-9999px;left:-9999px" />
	</view>
</template>

<script>
import { mapGetters } from 'vuex';
import { createWxQrcode } from '@/api/mine';
import { read } from '@/api/common';
export default {
	onLoad(options) {
		if (options.teamId) {
			this.teamId = options.teamId;
		}
	},
	data() {
		const arr = [];
		for (let i = 0; i < 30; i++) {
			arr.push(i);
		}
		return {
			qrcode: '',
			apiName: 'team',
			list: arr,
			teamInfo: {
				avatar: ''
			},
			teamId: ''
		};
	},
	computed: {
		...mapGetters(['myInfo'])
	},
	onShow() {
		this.getInfo();
		this.createWxQrcode();
	},
	mounted() {
		
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
				this.fillRoundRect(ctx, xImg + i*10, yImg + 75, 6, 6, 3, '#e1dfe0')
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
		getInfo() {
			const teamId = this.teamId ? this.teamId : this.myInfo.doctor.doctorTeamId;
			read(this.apiName, teamId, res => {
				if (res.data.info) {
					this.teamInfo = res.data.info;
				}
			});
		},
		createWxQrcode() {
			this.$helper.loading()
			const teamId = this.teamId ? this.teamId : this.myInfo.doctor.doctorTeamId;
			const str = this.myInfo.id + ',' + teamId;
			createWxQrcode(str, res => {
				this.qrcode = res.data.imgUrl;
				uni.hideLoading();
			});
		},
		// 保存二维码+边框
		onSave() {
			this.$helper.loading('保存中')
			let w1 = 340,
				h1 = 450,
				w2 = 300,
				h2 = 370,
				x = 20,
				y = 30,
				r = 10,
				wImg = 55,
				hImg = 55,
				xImg = x + 20,
				yImg = y + 20,
				rImg = wImg/2,
				name = this.teamInfo.name,
				hospital = this.teamInfo.hospital,
				department = this.teamInfo.department,
				avatar = this.teamInfo.avatar || 'https://gitee.com/picture_storage_area/follow_up_doctor/raw/master/images/patient/doctor_man.jpg',
				qrCode = this.qrcode
			var ctx = uni.createCanvasContext('firstCanvas');
			// 渐变背景图
			const grd = ctx.createLinearGradient(0, 0, 0, h1);
			grd.addColorStop(0, 'rgba(3, 169, 172, 1)');
			grd.addColorStop(1, 'rgba(92, 204, 205, 1)');
			ctx.setFillStyle(grd);
			ctx.fillRect(0, 0, w1, h1)
			// 白色背景
			this.fillRoundRect(ctx, x, y, w2, h2, 10, '#fff')
			// 头像
			this.circleImg(ctx, avatar, xImg, yImg, rImg)
			// 文字
			ctx.setFillStyle('#333')
			ctx.setFontSize(17)
			ctx.fillText(name, x + wImg + 30, y + 42)
			ctx.setFontSize(12)
			if (hospital.length > 9) {
				ctx.fillText(hospital.substr(0, 8) + '...', x + wImg + 30, y + 66)
				ctx.fillText(department, x + wImg + 160, y + 66)
			} else {
				ctx.fillText(hospital, x + wImg + 30, y + 66)
				ctx.fillText(department, x + wImg + 50 + hospital.length * 12, y + 66)
			}
			this.mapFillRoundRect(ctx, xImg, yImg)
			this.normalImg(ctx, qrCode, xImg + 10, 140, 240, 240);
			ctx.setFillStyle('#fff')
			ctx.setFontSize(12)
			ctx.fillText('扫一扫，邀请新患者加入', w1/2 - 64, h1 - 20)
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
		// 保存二维码
		onSave1() {
			const context = uni.createCanvasContext('myCanvas'); //创建画布 id为html片段定义
			this.$helper.loading('保存中');
			context.drawImage(this.qrcode, 0, 0, 240, 240); //drawImage(图片路径，起点x，起点y，绘制宽，绘制高)
			//draw（false:不需要重新绘制） 需要在回调后保存图片 否则为空白
			context.draw(false, () => {
				//canvasToTempFilePath：将画布导出为图片并返回路径
				uni.canvasToTempFilePath({
					fileType: 'jpg', //降低质量 提升保存速度
					quality: Number(0.5), //降低质量 提升保存速度
					canvasId: 'myCanvas',
					success: res => {
						//saveImageToPhotosAlbum保存图片到本地相册
						uni.saveImageToPhotosAlbum({
							filePath: res.tempFilePath,
							success: () => {
								this.$helper.toast('success', '保存成功');
							}
						});
					}
				});
			});
		}
	}
};
</script>

<style lang="scss">
.lg-container {
	.qrcode-container {
		width: 670rpx;
		background: linear-gradient(0deg, rgba(92, 204, 205, 1), rgba(3, 169, 172, 1));
		margin: 30rpx auto;
		box-sizing: border-box;
		padding: 58rpx 40rpx;
		.qrcode-box {
			background: rgba(255, 255, 255, 1);
			border-radius: 20rpx;
			padding: 35rpx 50rpx 48rpx 33rpx;
			height: 680rpx;
			.qrcode-header {
				display: flex;
				justify-content: flex-start;
				width: 100%;
				.avatar {
					width: 110rpx;
					height: 110rpx;
					display: flex;
					justify-content: center;
					align-items: center;
					box-sizing: border-box;
					.img-null {
						width: 64rpx;
						height: 61rpx;
					}
					.img-yes {
						width: 110rpx;
						height: 110rpx;
						border-radius: 50%;
						overflow: hidden;
					}
					.img-border {
						border: 1px solid rgba(220, 220, 220, 1);
					}
				}
				.userinfo {
					flex: 1;
					display: flex;
					flex-direction: column;
					margin-left: 20rpx;
					.username {
						display: flex;
						justify-content: flex-start;
						align-items: center;
						margin-top: 8rpx;
						text {
							font-size: 34rpx;
							line-height: 36rpx;
							color: #333333;
						}
					}
					.doctorid {
						height: 36rpx;
						line-height: 24rpx;
						margin-top: 14rpx;
						display: flex;
						align-items: center;
						.team-hospital {
							color: #333333;
							font-size: 24rpx;
							margin-right: 10rpx;
							max-width: 240rpx;
							overflow: hidden;
							white-space: nowrap;
							text-overflow: ellipsis;
							display: inline-block;
						}
						.team-department {
							color: #333333;
							font-size: 24rpx;
							width: 120rpx;
							overflow: hidden;
							white-space: nowrap;
							text-overflow: ellipsis;
							display: inline-block;
						}
					}
				}
			}
			.qrcode-content {
				width: 480rpx;
				margin: 0 auto;
				.qrcode-round {
					width: 100%;
					padding: 26rpx 0;
					display: flex;
					justify-content: space-between;
					align-items: center;
					.qrcode-round-item {
						width: 10rpx;
						height: 10rpx;
						background: rgba(225, 223, 224, 1);
						border-radius: 50%;
					}
				}
				image {
					width: 480rpx;
					height: 480rpx;
				}
			}
		}
		.qrcode-hint {
			color: #ffffff;
			font-size: 24rpx;
			line-height: 24rpx;
			text-align: center;
			margin: 30rpx 0 0;
		}
	}
	.lg-save-btn {
		color: #ffffff;
		background-color: #03a9ac;
		width: 670rpx;
		margin: 48rpx auto 0;
		font-size: 26rpx;
		height: 80rpx;
		line-height: 80rpx;
	}
}
</style>
