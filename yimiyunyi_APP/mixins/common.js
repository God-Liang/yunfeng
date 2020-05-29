import { read } from '@/api/common';
export default {
	methods: {
		onJump(url) {
			this.$helper.to(url)
		},
		onJumpPermission(url) {
			if (!this.myInfo.doctor.doctorTeamId) {
				uni.showModal({
					title: '温馨提示',
					content: '你还没有团队，不能使用此功能，是否立即创建团队？',
					confirmText: '创建',
					cancelText: '取消',
					confirmColor: '#03A9AC',
					success: (res) => {
						if (res.confirm) {
							this.$helper.to('/pages/team/createTeam')
						} else if (res.cancel) {
							
						}
					}
				});
				return
			}
			this.$helper.to(url)
		},
		// 扫一扫
		onScanCode() {
			let _this = this;
			uni.scanCode({
				success: function(res) {
					_this.$helper.to('/pages/team/inviteJoin?code=' + res.result);
				}
			});
		},
		// 获取当前群组信息
		getTeamGroupInfo(name, suc) {
			this.$im.conn.listGroups({
				limit: 200,
				success: (resp) => {
					if (resp.statusCode === 200) {
						resp.data.data.map(e => {
							if (e.groupname === name) {
								suc(e)
							}
						})
					}
				},
				error: function() {}
			});
		},
		// 申请加入群组
		joinGroup(data, suc) {
			let me = this
			var options = {
				groupId: data.groupId, // 群组ID
				success: (resp) => {
					if (resp.statusCode === 200) {
						suc()
					}
				},
				error: function(e) {
					if (e.type == 17) {
						console.log('您已经在这个群组里了');
					}
				}
			};
			this.$im.conn.joinGroup(options);
		},
		// 同意成员
		agreeJoinGroup(data, suc) {
			let me = this
			var options = {
				applicant: data.uid,
				groupId: data.groupId, // 群组ID
				success: (resp) => {
					if (resp.statusCode === 200) {
						suc()
					}
				},
				error: function(e) {
					console.log(e)
				}
			};
			this.$im.conn.agreeJoinGroup(options);
		},
		// 拒绝成员
		rejectJoinGroup(data, suc) {
			var options = {
				applicant: data.uid,
				groupId: data.groupId,
				success: (resp) => {
					if (resp.statusCode === 200) {
						suc()
					}
				},
				error: function(e) {
					console.log(e)
				}
			};
			this.$im.conn.rejectJoinGroup(options);
		},
		// 退出群组
		quitGroup(data, suc) {
			var options = {
				to: data.uid,
				roomId: data.groupId,
				success: (resp) => {
					suc()
					disp.fire("em.xmpp.invite.deleteGroup");//退群
				},
				error: function(e) {
					console.log(e)
				}
			};
			this.$im.conn.leaveGroupBySelf(options);
		},
		// 修改群组
		updateGroup(data, suc) {
			let option = {
				groupId: data.groupId,
				data: {
					groupname: data.name, // 群组名称
				},
				success: function(resp) {
					if (resp.statusCode === 200) {
						suc()
					}
				}
			};
			this.$im.conn.setGroupInfo(option);
		}
	}
}
