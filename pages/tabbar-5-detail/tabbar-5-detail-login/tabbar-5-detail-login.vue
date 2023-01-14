<template>
	<view class="container">
		
		<view class="center-wrap">
			<view class="center-container-wrap" style="width: 95%;">
				<view v-if="loginMethod == 0">
					<view class="line-box">
						<view class="text-align-center">{{userInfo.phone}}</view>
					</view>
					<view class="line-box" style="padding: 0;">
						<button type="primary" open-type="getPhoneNumber" @click="onGetPhoneNumber">手机号一键登录</button>
					</view>
				</view>	
				<view v-else-if="loginMethod == 1">
					<view class="line-box text-align-center" style="padding: 0;">
						<image :src="userInfo.avatarUrl" style="width: 256upx; height: 256upx;"></image>
					</view>
					<view class="line-box text-align-center" style="padding: 0;">
						<view>{{userInfo.nickName}}</view>
					</view>
					<view class="line-box" style="padding: 0;">
						<button type="primary">微信登录</button>
					</view>
				</view>
				<view v-else-if="loginMethod == 2">
					<view class="line-box">
						QQ登录
					</view>
				</view>
				<view v-else-if="loginMethod == 3">
					<view class="line-box" style="padding: 0;">
						<AccountLogin>
							
						</AccountLogin>
					</view>
				</view>
				
			</view>
		</view>
		
		<view class="fixed-bottom" style="padding-bottom: 50upx;">
			<view class="line-box">
				<view class="line-box-item" style="margin-left: 30upx;" @click="onSetLoginMethod(0);">
					<view class="font-size-max"><uni-icons type="phone" size="32" color="gray"></uni-icons></view>
					<view class="font-size-max" style="padding-left: 8upx;">手机</view>
				</view>
				<view class="line-box-item" style="margin-left: 50upx;" @click="onSetLoginMethod(1);">
					<view class="font-size-max"><uni-icons type="weixin" size="32" color="green"></uni-icons></view>
					<view class="font-size-max" style="padding-left: 8upx;">微信</view>
				</view>
				<!--<view class="line-box-item" style="margin-left: 50upx;" @click="onSetLoginMethod(2);">
					<view class="font-size-max"><uni-icons type="qq" size="32" color="skyblue"></uni-icons></view>
					<view class="font-size-max" style="padding-left: 10upx;">QQ</view>
				</view>-->
				<view class="line-box-item" style="margin-left: 50upx;" @click="onSetLoginMethod(3);">
					<view class="font-size-max"><uni-icons type="person" size="32" color="gray"></uni-icons></view>
					<view class="font-size-max" style="padding-left: 8upx;">账号</view>
				</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	
	// 网络请求
	import request from '../../../utils/net/request.js'
	
	// 事件处理类
	import userHandler from '../../../utils/handler/user/user_handler.js'
	
	export default {
		data() {
			return {
				loginMethod: 0,
				access_code: '',
				userInfo: {
					phone: ''
				}
			}
		},
		
		onLoad() {
			console.log("tabbar-5-detail-login.vue onLoad...");
			
			let That = this;
			
			That.onLogin();
			
			/*// 获取手机号
			let params = {
				appid: '__UNI__6CCEBA0',
				apiKey: 'ef4853653f57ffda0cc6c2fd2edf4587',
				apiSecret: '1705f1e99b9dd392d4921145e661feba'
			};
			
			request.getPhoneNumber(params, function(code, res){
				console.log("tabbar-5-detail-login.vue onLoad getPhoneNumber code:" + code + ", res:" + JSON.stringify(res));
			});*/
			
		},
		
		methods: {
			
			onSetLoginMethod(method) {
				console.log("tabbar-5-detail-login.vue onSetLoginMethod params, method:" + method);
				let That = this
				
				That.loginMethod = method;
				
				switch(method) {
					case 0: {
						// 手机号一键登录
					}break;
					case 1: {
						// 微信登录
						That.onGetWeixinUserInfo();
					}break;
				}
				
			},
			
			//
			// onLogin : 登录
			//
			onLogin() {
				console.log("tabbar-5-detail-login.vue onLogin...");
				
				let That = this;
				
				// uniapp应用
				//let appid = "__UNI__6CCEBA0";
				//let apiKey = "ef4853653f57ffda0cc6c2fd2edf4587";
				//let apiSecret = "1705f1e99b9dd392d4921145e661feba";
				
				// 星游会小程序
				let appid = "wx56e4f0b2026fbdf0";
				let apiSecret = "gh_6f2621d527fb";
				
				
				// get code
				/*request.uniLogin("weixin", function(code, res){
					console.log("tabbar-5-detail-login.vue onLogin uniLogin weixin code:" + code + ", res:" + JSON.stringify(res));
					if (code == 0) {
						let access_code = res["code"];
						That.access_code = access_code;
						
						// get openId and session_key
						request.getWeixinOepnInfo(appid, apiSecret, access_code, function(code2, res2){
							console.log("tabbar-5-detail-login.vue onLogin getWeixinOepnInfo code2:" + code2 + ", res2:" + JSON.stringify(res2));
						
						
						});
						
					}
				})*/
				
			},
			
			//
			// onGetPhoneNumber : 获取手机号
			//
			onGetPhoneNumber(e) {
				console.log("tabbar-5-detail-login.vue onGetPhoneNumber params, " + JSON.stringify(e));
				
			},
			
			//
			// onGetWeixinUserInfo : 获取微信用途用户信息
			//
			onGetWeixinUserInfo() {
				console.log("tabbar-5-detail-login.vue onGetWeixinUserInfo...");
				let That = this;
				
				if (That.userInfo.nickName != undefined) {
					console.log("tabbar-5-detail-login.vue onGetWeixinUserInfo userInfo: " + JSON.stringify(That.userInfo));
					return;
				}
				
				request.uniLogin("weixin", function(code, res){
					console.log("tabbar-5-detail-login.vue onGetWeixinUserInfo uniGetUserInfo weixin code:" + code + ", res:" + JSON.stringify(res));
					if (code != 0) {
						return;
					}
					
					let access_code = res["code"];
					That.access_code = access_code;
					
					// getUserInfo
					request.uniGetUserInfo("weixin", function(code2, res2){
						console.log("tabbar-5-detail-login.vue onGetWeixinUserInfo uniGetUserInfo weixin code2:" + code2 + ", res2:" + JSON.stringify(res2));
						if (code2 == 0) {
							let errMsg = res2["errMsg"];
							if (errMsg == "getUserInfo:ok") {
								let userInfo = res2["userInfo"];
								console.log("tabbar-5-detail-login.vue onGetWeixinUserInfo uniGetUserInfo userInfo:" + JSON.stringify(userInfo));
								That.userInfo = userInfo;
								
							}
						}
						
					});
					
				});
				
			}
			
			
			
		}
	}
</script>

<style>
	
	.container {
		width: 100%;
		height: calc(100vh - 50upx);
		background-color: white;
	}
	
	

</style>
