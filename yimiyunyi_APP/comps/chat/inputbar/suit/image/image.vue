<template>
	<view></view>
</template>

<script>
	let msgType = require("../../../msgtype");
	let disp = require("../../../../../utils/broadcast");
	import { mapGetters } from 'vuex';
	
	export default {
		components: {
			
		},
		computed: {
			...mapGetters(['myInfo'])
		},
		data() {
			return {
				
			}
		},
		props: {
			username: {
				type: Object,
				value: {},
			},
			chatType: {
				type: String,
				value: msgType.chatType.SINGLE_CHAT,
			},
		},
	
		onUnload() {
			
		},
		methods: {
			openCamera(){
				var me = this;
				uni.chooseImage({
					count: 1,
					sizeType: ["original", "compressed"],
					sourceType: ["camera"],
					success(res){
						me.upLoadImage(res);
					}
				});
			},
			
			sendImage(){
				var me = this;
				uni.chooseImage({
					count: 1,
					sizeType: ["original", "compressed"],
					sourceType: ["album"],
					success(res){
						me.upLoadImage(res);
					},
				});
			},
			
			isGroupChat(){
				return this.chatType == msgType.chatType.CHAT_ROOM;
			},
			
			getSendToParam(){
				return this.isGroupChat() ? this.username.groupId : this.username.your;
			},
			
			upLoadImage(resData){
				var me = this;
				var tempFilePaths = resData.tempFilePaths;
				var token = this.$im.conn.context.accessToken
				uni.getImageInfo({
					src: resData.tempFilePaths[0],
					success(res){
						var allowType = {
							jpg: true,
							gif: true,
							png: true,
							bmp: true,
							jpeg: true
						};
						var str = me.$im.config.appkey.split("#");
						var width = res.width;
						var height = res.height;
						var index = res.path.lastIndexOf(".");
						var filetype = (~index && res.path.slice(index + 1)) || "";
						if(filetype.toLowerCase() in allowType){
							uni.uploadFile({
								url: "https://a1.easemob.com/" + str[0] + "/" + str[1] + "/chatfiles",
								filePath: tempFilePaths[0],
								name: "file",
								header: {
									"Content-Type": "multipart/form-data",
									Authorization: "Bearer " + token
								},
								success(res){
									var data = res.data;
									var dataObj = JSON.parse(data);
									var id = me.$im.conn.getUniqueId();		// 生成本地消息 id
									var msg = new me.$im.message(msgType.IMAGE, id);
									var file = {
										type: msgType.IMAGE,
										size: {
											width: width,
											height: height
										},
										url: dataObj.uri + "/" + dataObj.entities[0].uuid,
										filetype: filetype,
										filename: tempFilePaths[0]
									};
									msg.set({
										apiUrl: me.$im.config.apiURL,
										body: file,
										from: me.username.myName,
										to: me.getSendToParam(),
										ext: {
											nick: me.myInfo.nick,
											sex: me.myInfo.sex,
											avatar: me.myInfo.avatar
										},
										roomType: false,
										chatType: me.chatType,
										success: function (argument) {
											disp.fire('em.chat.sendSuccess', id);
										}
									});
									if(me.chatType == msgType.chatType.CHAT_ROOM){
										msg.setGroup("groupchat");
									}
									me.$im.conn.send(msg.body);
									uni.$emit('saveSendMsg', {
										msg: msg,
										type: msgType.IMAGE,
									})
									me.$emit('inputFocused');
								}
							});
						}
					}
				});
			},
		}
	}
</script>

<style>
</style>
