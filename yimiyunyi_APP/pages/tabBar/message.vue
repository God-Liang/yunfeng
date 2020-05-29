<template>
	<view class="lg-container">
		<uni-nav-bar title="消息" @clickRight="onScanCode">
			<template v-slot:right="">
				<image class="right_img" src="@/static/message/scan.png" mode=""></image>
			</template>
		</uni-nav-bar>
		<!-- 		<view v-if="!isJoinTeam">
			<view class="empty-container">
				<image class="empty-icon" src="@/static/team/empty.png" />
				<view class="empty-tip">你还没有团队，立即创建团队</view>
				<view class="empty-tip">或通过扫一扫加入其他团队</view>
				<view class="empty-btn mt80" @tap="onJump('/pages/team/createTeam')">创建团队</view>
				<view class="empty-btn" @tap="onScanCode()">扫一扫</view>
			</view>
		</view> -->
		<!-- <uni-search-bar @input="handleFilter"></uni-search-bar> -->
		<view class="message-container" v-if="this.myInfo.doctor.verifyStatus === 1">
			<mescroll-uni ref="mescrollRef" @init="mescrollInit" :fixed="false" @down="downCallback" @up="upCallback" :down="downOption" :up="upOption">
				<uni-swipe-action v-for="(item, index) in dataList" :key="index">
					<uni-swipe-action-item :options="options" @click="bindClick($event, item)">
						<view class="message-item" @tap="onMessage(item)">
							<view class="message-item_img">
								<image class="img" v-if="item.type === 0" src="@/static/message/system.png" mode="aspectFill"></image>
								<image class="img" v-if="item.type === 1" src="@/static/message/followup.png" mode="aspectFill"></image>
								<image class="img" v-if="item.type === 2" src="@/static/message/newPatient.png" mode="aspectFill"></image>
								<image class="img" v-if="item.type === 3" src="@/static/message/team.png" mode="aspectFill"></image>
							</view>
							<view class="message-item_box">
								<view class="message-item_box_title fs30 color333">{{ item.title }}</view>
								<view class="message-item_box_con fs24 color888 ellipsis">{{ item.content }}</view>
							</view>
							<view class="message-item_right">
								<view class="message-item_right_num" v-if="item.isReadSum && item.isReadSum > 0">{{ item.isReadSum }}</view>
								<view class="message-item_right_null" v-else></view>
								<view class="message-item_right_time fs24 color888">{{ item.time | messageTime }}</view>
							</view>
						</view>
					</uni-swipe-action-item>
				</uni-swipe-action>
				<block v-if="isJoinTeam">
					<uni-swipe-action v-for="(item, index) in messageListIM" :key="item.mid">
						<uni-swipe-action-item :options="options" @click="bindClick($event, item)">
							<view class="message-item" @tap="into_groupChatRoom(item)">
								<view class="message-item_img">
									<image class="img" v-if="teamAvatar" :src="teamAvatar" mode="aspectFill"></image>
									<image class="img" v-else src="@/static/team/avatar.png" mode="aspectFill"></image>
								</view>
								<view class="message-item_box">
									<view class="message-item_box_title fs30 color333">{{ item.groupName }}</view>
									<view class="message-item_box_con fs24 color888 ellipsis" v-if="item.msg.data[0].data">{{item.msg.data[0].data}}</view>
									<view class="message-item_box_con fs24 color888 ellipsis" v-if="item.msg.type == 'img'">[图片]</view>
									<view class="message-item_box_con fs24 color888 ellipsis" v-if="item.msg.type == 'audio'">[语音]</view>
								</view>
								<view class="message-item_right">
									<view class="message-item_right_num" v-if="item.unReadCount > 0 || item.unReadCount == '99+'">{{ item.unReadCount }}</view>
									<view class="message-item_right_null" v-else></view>
									<view class="message-item_right_time fs24 color888">{{ item.time | messageTime }}</view>
								</view>
							</view>
						</uni-swipe-action-item>
					</uni-swipe-action>
				</block>
			</mescroll-uni>
		</view>
	</view>
</template>

<script>
import MescrollMixin from '@/components/mescroll-uni/mescroll-mixins.js';
import { getList, read } from '@/api/common';
import common from '@/mixins/common';
import { mapGetters } from 'vuex';
let disp = require('@/utils/broadcast');
export default {
	mixins: [MescrollMixin, common],
	onLoad() {
		let me = this;
		//监听加好友申请
		disp.on('em.xmpp.subscribe', function() {
			console.log('监听加好友申请');
		});
		//监听解散群
		disp.on('em.xmpp.invite.deleteGroup', function() {
			me.listGroups();
			me.getRoster();
			me.messageListIM = me.getChatList();
		});
		//监听未读消息数
		disp.on('em.xmpp.unreadspot', function(message) {
			me.messageListIM = me.getChatList();
			me.unReadSpotNum = getApp().globalData.unReadMessageNum > 99 ? '99+' : getApp().globalData.unReadMessageNum;
		});
		disp.on('em.xmpp.contacts.remove', function() {
			me.getRoster();
		});
	},
	computed: {
		...mapGetters(['myInfo'])
	},
	data() {
		return {
			options: [],
			options1: [
				{
					text: '删除',
					style: {
						backgroundColor: '#F25645',
						fontSize: '26rpx',
						padding: '0 54rpx'
					}
				}
			],
			apiName: 'AllMessage',
			mescroll: null, //mescroll实例对象 (此行可删,mixins已默认)
			// 下拉刷新的常用配置
			downOption: {
				use: true, // 是否启用下拉刷新; 默认true
				auto: true, // 是否在初始化完毕之后自动执行下拉刷新的回调; 默认true
				native: false // 启用系统自带的下拉组件,默认false;仅mescroll-body生效,mescroll-uni无效(native: true, 则需在pages.json中配置"enablePullDownRefresh":true)
			},
			// 上拉加载的常用配置
			upOption: {
				use: true, // 是否启用上拉加载; 默认true
				auto: true, // 是否在初始化完毕之后自动执行上拉加载的回调; 默认true
				page: {
					num: 0, // 当前页码,默认0,回调之前会加1,即callback(page)会从1开始
					size: 10 // 每页数据的数量,默认10
				},
				textNoMore: '没有更多了',
				noMoreSize: 5, // 配置列表的总数量要大于等于5条才显示'-- END --'的提示
				empty: {
					icon: '/static/system/c_0.png',
					tip: '暂无消息'
				}
			},
			// 列表数据
			dataList: [],
			total: 0,
			isJoinTeam: false,
			messageListIM: [], // 即时通讯消息
			member: [],
			unReadSpotNum: 0,
			teamAvatar: ''
		};
	},
	onShow() {
		this.isAttestation();
		this.getNewMessage()
	},
	methods: {
		// 是否有新的消息
		getNewMessage() {
			const data = {
				current: 1,
				pageSize: 10,
				teamId: this.myInfo.doctor.doctorTeamId
			};
			getList(this.apiName, data, res => {
				if (this.dataList.length === res.data.list.length) {
					if (JSON.stringify(this.dataList) !== JSON.stringify(res.data.list)) {
						this.dataList = res.data.list
					}
				} else {
					this.dataList = res.data.list
				}
			})
		},
		isAttestation() {
			const verifyStatus = this.myInfo.doctor.verifyStatus;
			switch (verifyStatus) {
				case 0: // 审核未通过
					this.$helper.toNew('/pages/mine/attestation/attestationStatus');
					break;
				case 1: // 已通过
					if (this.myInfo.doctor.doctorTeamId) {
						read('team', this.myInfo.doctor.doctorTeamId, res => {
							if (res.data.info) {
								this.teamAvatar = res.data.info.avatar;
							}
						});
					}
					return;
					break;
				case 2: // 待审核
					this.$helper.toNew('/pages/mine/attestation/attestationSubmit');
					break;
				case 3: // 注销
					uni.removeStorageSync('lg-token');
					this.$helper.toNew('/pages/login/index');
					break;
				case 4: // 未审核
					this.$helper.toNew('/pages/mine/attestation/attestationOne');
					break;
				default:
					uni.removeStorageSync('lg-token');
					this.$helper.toNew('/pages/login/index');
					break;
			}
		},
		// 过滤
		handleFilter(e) {
			this.keyWord = e.value;
			this.dataList = [];
			this.mescroll.resetUpScroll();
		},
		upCallback(page) {
			let pageNum = page.num;
			let pageSize = page.size;
			const data = {
				current: pageNum,
				pageSize: pageSize,
				teamId: this.myInfo.doctor.doctorTeamId
			};
			getList(this.apiName, data, res => {
				let curPageData = res.data.list;
				let curPageLen = curPageData.length;
				let totalSize = res.data.total;
				this.total = res.data.total;
				if (page.num == 1) this.dataList = [];
				setTimeout(() => {
					this.dataList = this.dataList.concat(curPageData);
					this.getRoster();
				}, 2000)
			});
		},
		onMessage(item) {
			switch (item.type) {
				case 0:
					this.$helper.to('/pages/message/systemMessage?messageId=' + item.id + '&readNum='+item.isReadSum);
					break;
				case 1:
					this.$helper.to('/pages/message/followupMessage?messageId=' + item.id + '&readNum='+item.isReadSum);
					break;
				case 2:
					this.$helper.to('/pages/message/newPatientMesssage?messageId=' + item.id + '&readNum='+item.isReadSum);
					break;
				case 3:
					this.$helper.to('/pages/message/teamMessage?messageId=' + item.id + '&readNum='+item.isReadSum);
					break;
				default:
					break;
			}
		},
		// 删除
		bindClick(btnData, data) {
			uni.showModal({
				title: '提示',
				confirmColor: '#03A9AC',
				content: '是否删除？',
				success: res => {
					if (res.confirm) {
						if (item.mid) {
							const sessionKey = data.username + data.yourname
							uni.removeStorageSync('rendered_' + sessionKey)
						}
					} else if (res.cancel) {
						
					}
				}
			});
		},
		/* 即时通讯消息 */
		// 群聊
		into_groupChatRoom(item) {
			this.getTeamGroupInfo(item.groupName, res => {
				const username = {
					myName: this.myInfo.id,
					your: item.groupName, 
					groupId: res.groupid
				}
				this.$helper.to('/pages/groupChatRoom/index?username=' + JSON.stringify(username));
			})
		},
		// 获取群组列表
		listGroups() {
			this.$im.conn.listRooms({
				success: rooms => {
					uni.setStorageSync('listGroup', rooms);
				},
				error: function() {}
			});
		},
		// 获取好友列表
		getRoster() {
			this.$im.conn.getRoster({
				success: roster => {
					const member = [];
					for (let i = 0; i < roster.length; i++) {
						if (roster[i].subscription == 'both') {
							member.push(roster[i]);
						}
					}
					uni.setStorageSync('member', member);
					this.member = member;
					this.listGroups();
					this.messageListIM = this.getChatList();
					if (this.messageListIM.length > 0) {
						this.mescroll.endBySize(1, 1);
					} else {
						this.mescroll.endBySize(this.dataList.length, this.total);
					}
					this.unReadSpotNum = getApp().globalData.unReadMessageNum > 99 ? '99+' : getApp().globalData.unReadMessageNum;
					if (this.messageListIM.length > 0) {
						this.isJoinTeam = true
					} else {
						this.isJoinTeam = false
					}
				},
				error:(err) => {
					console.log(err);
					this.mescroll.endBySize(this.dataList.length, this.total);
				}
			});
		},
		getChatList() {
			let array = [];
			let member = uni.getStorageSync('member');
			let myName = uni.getStorageSync('myUsername');
			let listGroups = uni.getStorageSync('listGroup') || [];
			for (let i = 0; i < member.length; i++) {
				let newChatMsgs = uni.getStorageSync(member[i].name + myName) || [];
				let historyChatMsgs = uni.getStorageSync('rendered_' + member[i].name + myName) || [];
				let curChatMsgs = historyChatMsgs.concat(newChatMsgs);

				if (curChatMsgs.length) {
					let lastChatMsg = curChatMsgs[curChatMsgs.length - 1];
					lastChatMsg.unReadCount = newChatMsgs.length;
					if (lastChatMsg.unReadCount > 99) {
						lastChatMsg.unReadCount = '99+';
					}
					array.push(lastChatMsg);
				}
			}
			for (let i = 0; i < listGroups.length; i++) {
				let newChatMsgs = uni.getStorageSync(listGroups[i].roomId + myName) || [];
				let historyChatMsgs = uni.getStorageSync('rendered_' + listGroups[i].roomId + myName) || [];
				let curChatMsgs = historyChatMsgs.concat(newChatMsgs);
				if (curChatMsgs.length) {
					let lastChatMsg = curChatMsgs[curChatMsgs.length - 1];
					lastChatMsg.unReadCount = newChatMsgs.length;
					if (lastChatMsg.unReadCount > 99) {
						lastChatMsg.unReadCount = '99+';
					}
					lastChatMsg.groupName = listGroups[i].name;
					array.push(lastChatMsg);
				}
			}
			array.sort((a, b) => {
				return b.dateTimeNum - a.dateTimeNum;
			});
			return array;
		}
	}
};
</script>

<style lang="scss" scoped>
.lg-container {
	// #ifdef H5
	height: calc(100vh - 50px);
	// #endif
	.right_img {
		width: 36rpx;
		height: 36rpx;
	}
	.message-container {
		// #ifdef H5
		height: calc(100% - 88rpx);
		// #endif
		// #ifndef H5
		height: calc(100% - 136rpx);
		// #endif
		.message-item {
			width: 100vw;
			height: 160rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 0 40rpx;
			box-sizing: border-box;
			background-color: #fff;
			margin-bottom: 2rpx;
			&_img {
				.img {
					width: 100rpx;
					height: 100rpx;
					border-radius: 50%;
					overflow: hidden;
				}
			}
			&_box {
				flex: 1;
				margin: 0 40rpx;
				display: flex;
				flex-direction: column;
				&_title {
				}
				&_con {
					width: 360rpx;
					margin-top: 24rpx;
				}
			}
			&_right {
				display: flex;
				flex-direction: column;
				align-items: flex-end;
				&_num {
					background-color: #e60012;
					width: 30rpx;
					height: 30rpx;
					line-height: 30rpx;
					text-align: center;
					color: #fff;
					font-size: 24rpx;
					border-radius: 50%;
				}
				&_null {
					width: 30rpx;
					height: 30rpx;
				}
				&_time {
					margin-top: 24rpx;
				}
			}
		}
	}
}
</style>
