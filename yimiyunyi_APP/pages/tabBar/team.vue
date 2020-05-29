<template>
	<view class="lg-container">
		<view v-if="!isJoinTeam">
			<uni-nav-bar title="团队"></uni-nav-bar>
			<view class="empty-container">
				<image class="empty-icon" src="@/static/team/empty.png" />
				<view class="empty-tip">你还没有团队，立即创建团队</view>
				<view class="empty-tip">或通过扫一扫加入其他团队</view>
				<view class="empty-btn mt80" @tap="onJump('/pages/team/createTeam')">创建团队</view>
				<view class="empty-btn" @tap="onScanCode()">扫一扫</view>
			</view>
		</view>
		<view v-else>
			<view class="container_info">
				<view class="container_info_box">
					<image class="avatar" v-if="teamInfo.avatar" :src="teamInfo.avatar" mode="aspectFill"></image>
					<image class="avatar" v-else src="@/static/team/avatar.png" mode=""></image>
					<text class="info_box fs30">{{ teamInfo.name || '暂无团队名称' }}</text>
					<text class="info_box fs24">{{ teamInfo.hospital || '暂无所在医院' }}&nbsp;&nbsp;&nbsp;&nbsp;{{ teamInfo.department || '暂无科室' }}</text>
					<text class="info_box fs22">擅长手术：{{ teamInfo.operation || '无' }}</text>
				</view>
				<view class="operation_right" @tap="onInvite"><image class="operation_img" src="@/static/team/add.png" mode=""></image></view>
			</view>
			<uni-list>
				<uni-list-item
					thumb="/static/team/member.png"
					:thumbStyle="{ width: '37rpx', height: '29rpx', display: 'block' }"
					title="团队成员"
					@click="onJump('/pages/team/teamMember')"
					:showArrow="false"
				>
					<template v-slot:right="">
						<view class="groupChat fs24" @tap.stop="into_groupChatRoom">成员群</view>
					</template>
				</uni-list-item>
				<uni-list-item
					thumb="/static/team/home.png"
					:thumbStyle="{ width: '35rpx', height: '35rpx', display: 'block' }"
					title="团队主页"
					@click="onJump('/pages/team/teamHomePage')"
					:showArrow="false"
				>
					<template v-slot:right="">
						<view class="perfect fs22">完善度{{ quantityNum }}%</view>
					</template>
				</uni-list-item>
			</uni-list>
			<uni-list>
				<uni-list-item
					v-if="isLevel"
					thumb="/static/team/new.png"
					:show-badge="true"
					:badge-text="teamInfo.applyCount > 0 ? String(teamInfo.applyCount) : ''"
					badge-type="error"
					:thumbStyle="{ width: '33rpx', height: '33rpx', display: 'block' }"
					title="新成员申请"
					@click="onJump('/pages/team/newMember?applyCount=' + teamInfo.applyCount)"
				></uni-list-item>
				<uni-list-item
					v-if="isLevel"
					thumb="/static/team/exit.png"
					:show-badge="true"
					:badge-text="teamInfo.quitCount > 0 ? String(teamInfo.quitCount) : ''"
					badge-type="error"
					:thumbStyle="{ width: '34rpx', height: '34rpx', display: 'block' }"
					title="成员退出申请"
					@click="onJump('/pages/team/memberExit?quitCount=' + teamInfo.quitCount)"
				></uni-list-item>
				<uni-list-item
					thumb="/static/team/manage.png"
					:thumbStyle="{ width: '35rpx', height: '34rpx', display: 'block' }"
					title="患者管理"
					@click="onJump('/pages/team/teamPatients')"
				></uni-list-item>
				<uni-list-item
					thumb="/static/team/followup.png"
					:thumbStyle="{ width: '32rpx', height: '34rpx', display: 'block' }"
					title="随访情况"
					@click="onJump('/pages/team/followupDetails')"
				></uni-list-item>
				<uni-list-item
					thumb="/static/team/invite_qrcode.png"
					:thumbStyle="{ width: '36rpx', height: '35rpx', display: 'block' }"
					title="团队二维码"
					@click="onJump('/pages/team/teamQrcode')"
				></uni-list-item>
			</uni-list>
		</view>
	</view>
</template>

<script>
import common from '@/mixins/common';
import { mapGetters } from 'vuex';
import { read } from '@/api/common';
import { getLevel } from '@/api/team';
let disp = require("@/utils/broadcast")

export default {
	mixins: [common],
	onLoad() {
		let me = this;
		disp.on('em.xmpp.invite.joingroup', function() {
			var pageStack = getCurrentPages();
			// 判断是否当前路由是本页
			if (pageStack[pageStack.length - 1].route === me.route) {
				me.listGroups();
			}
		});

		disp.on('em.xmpp.invite.deleteGroup', function() {
			var pageStack = getCurrentPages();
			// 判断是否当前路由是本页
			if (pageStack[pageStack.length - 1].route === me.route) {
				me.listGroups();
			}
		});
	},
	computed: {
		...mapGetters(['myInfo'])
	},
	data() {
		return {
			teamInfo: {
				avatar: ''
			},
			apiName: 'team',
			isLevel: true, // 是否是创建者
			quantityNum: 0, // 完善度
			isJoinTeam: true, // 是否加入团队
			groupList: [], // 群组列表
			username: {} // 聊天室信息
		};
	},
	created() {
		if (!uni.getStorageSync('errNum')) {
			this.$helper.loading()
		}
	},
	onShow() {
		this.listGroups();
		this.$store.dispatch('getMyInfo').then(res => {
			if (this.myInfo.doctor.doctorTeamId) {
				this.isJoinTeam = true;
				this.getTeamInfo();
				this.getLevel();
			} else {
				uni.hideLoading()
				this.isJoinTeam = false;
			}
		})
	},
	onPullDownRefresh() {
		this.$helper.loading()
		this.listGroups();
		this.$store.dispatch('getMyInfo').then(res => {
			if (this.myInfo.doctor.doctorTeamId) {
				this.isJoinTeam = true;
				this.getTeamInfo();
				this.getLevel();
			} else {
				uni.hideLoading()
				this.isJoinTeam = false;
			}
			uni.stopPullDownRefresh()
		})
	},
	methods: {
		// 获取群组列表
		listGroups() {
			var me = this;
			this.$im.conn.listRooms({
				success: function(rooms) {
					uni.setStorageSync('listGroup', rooms);
				},
				error: function() {}
			});
		},
		// 获取团队信息
		getTeamInfo() {
			read(this.apiName, this.myInfo.doctor.doctorTeamId, res => {
				if (res.data.info) {
					uni.hideLoading()
					this.teamInfo = res.data.info;
					let quantity = 0;
					if (this.teamInfo.name) quantity++;
					if (this.teamInfo.department) quantity++;
					if (this.teamInfo.description) quantity++;
					if (this.teamInfo.hospital) quantity++;
					if (this.teamInfo.operation) quantity++;
					if (this.teamInfo.disease) quantity++;
					if (this.teamInfo.avatar) quantity++;
					if (this.teamInfo.teamNote) quantity++;
					this.quantityNum = Math.floor((quantity / 8) * 100);
					this.filterTeam()
				}
			});
		},
		filterTeam() {
			let groupList = uni.getStorageSync('listGroup')
			groupList.map(e => {
				if (e.name === this.teamInfo.name) {
					this.$store.dispatch('toggleTeamGroupInfo', e)
					this.username = {
						myName: this.myInfo.id,
						your: e.name, 
						groupId: e.roomId,
					}
				}
			})
		},
		// 获取是否是团队创建者	
		getLevel() {
			getLevel(this.myInfo.doctor.doctorTeamId, res => {
				this.isLevel = res.data.info;
			});
		},
		// 邀请成员
		onInvite() {
			this.$helper.to('/pages/team/invite');
		},
		// 群聊
		into_groupChatRoom() {
			console.log(this.username)
			this.$helper.to('/pages/groupChatRoom/index?username=' + JSON.stringify(this.username));
		}
	}
};
</script>

<style lang="scss" scoped>
.lg-container {
	// #ifdef H5
	height: calc(100vh - 50px);
	// #endif
	.container_info {
		width: 100vw;
		height: 400rpx;
		background: linear-gradient(270deg, rgba(92, 204, 205, 1), rgba(3, 169, 172, 1));
		position: relative;
		&_box {
			width: 100%;
			height: 100%;
			display: flex;
			padding: 74rpx 40rpx 30rpx;
			box-sizing: border-box;
			// justify-content: center;
			align-items: center;
			flex-direction: column;
			.avatar {
				width: 140rpx;
				height: 140rpx;
				border-radius: 50%;
				overflow: hidden;
				margin-bottom: 4px;
			}
			.info_box {
				color: #ffffff;
				margin-top: 20rpx;
			}
		}
		.operation_right {
			position: absolute;
			right: 40rpx;
			top: 74rpx;
			.operation_img {
				width: 36rpx;
				height: 36rpx;
			}
		}
	}
	.groupChat {
		color: #0bacaf;
	}
	.perfect {
		color: #888888;
	}
}
</style>
