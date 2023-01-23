<template>
	<view class="container">
		
		<view class="center-wrap">
			<view class="center-container-wrap" style="width: 95%;">
				<view v-if="loginMethod == 0">
					<view class="line-box">
						<view class="text-align-center">{{userInfo.phone}}</view>
					</view>
					<view class="line-box" style="padding: 0;">
						<button type="primary" @click="onGetPhoneNumberLogin();">手机号一键登录</button>
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
						<button type="primary" @click="onGetWeixinUserInfo();">微信登录</button>
					</view>
				</view>
				<view v-else-if="loginMethod == 2">
					<view class="line-box">
						QQ登录
					</view>
				</view>
				<view v-else-if="loginMethod == 3">
					<!-- 账号登录 -->
					<view class="line-box" style="padding: 0;">
						<AccountLogin ref="accountLoginRef" @accountLoginSubmit="onAccountLogin">
							
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
				open_id: '',
				session_key: '',
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
				let apiSecret = "8191a650d4e5b4be0127d84a02389f40";
				
				
				// get code
				/*request.uniLogin("weixin", function(code, res){
					console.log("tabbar-5-detail-login.vue onLogin uniLogin weixin code:" + code + ", res:" + JSON.stringify(res));
					if (code == 0) {
						let access_code = res["code"];
						That.access_code = access_code;
						
						// get openId and session_key
						let openIdParams = {};
						openIdParams["code"] = access_code;
						request.getOpenId(openIdParams, function(code2, res2){
							console.log("tabbar-5-detail-login.vue onLogin getOpenId code:" + code2 + ", res:" + JSON.stringify(res2));
							if (code2 == 0) {
								// openId : oHc3l5S_aanU8ZagY3o8N2uMzxB4
								let openId = res2["openid"];
								let sessionKey = res2["session_key"];
								That.open_id = openId;
								That.session_key = sessionKey;
								
								request.uniShowModel("test", JSON.stringify(res2), "取消", "确定", true, function(res3){
									console.log("request.uniShowModel res: " + JSON.stringify(res3));
								});
							}
							
						});
						
					}
				})*/
				
			},
			
			//
			// onGetPhoneNumberLogin : 手机号一键登录
			//
			onGetPhoneNumberLogin() {
				uni.navigateTo({
					url: "/uni_modules/uni-id-pages/pages/login/login-withoutpwd?type=univerify"
				});
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
				
				// uni.setStorageSync
				
				// 授权获取用户信息
				request.uniGetUserProfile(function(code, res){
					console.log("tabbar-5-detail-login.vue onGetWeixinUserInfo uniGetUserProfile code:" + code + ", res:" + JSON.stringify(res));
					
					if (code == 0) {
						// 授权成功
						let userInfo = res["userInfo"];
						let signature = res["signature"];
						let iv = res["iv"];
						let cloudID = res["cloudID"];
						
						That.userInfo = userInfo;
					}
				});
				
			},
			
			//
			// onAccountLogin : 账号登录
			//
			onAccountLogin(data) {
				console.log("tabbar-5-detail-login.vue onAccountLogin params: " + JSON.stringify(data));
				
				let That = this;
				
				// 修改组件状态
				That.$refs.accountLoginRef.setLoadingState("true");
				
				That.$refs.accountLoginRef.setErrorMsg("正在登录中...");
				
				request.getAccountLoginRegist(data, function(code, res){
					console.log("tabbar-5-detail-login.vue onAccountLogin getAccountLoginRegist code:" + code + ", res:" + JSON.stringify(res));
					
					That.$refs.accountLoginRef.setLoadingState("false");
					
					if (code != 0) {
						That.$refs.accountLoginRef.setErrorMsg("网络异常");
						return;
					}
					
					let errCode = res["errCode"];
					let errMsg = res["errMsg"];
					if (errCode != 200) {
						That.$refs.accountLoginRef.setErrorMsg(errMsg);
						return;
					}
					let resData = res["data"];
					That.userInfo = resData;
					
					// 登录成功
					That.$global_login_state = 1
					
					// 缓存
					That.$storage.setUserInfo(resData);
					
					// 刷新上一页并返回
					uni.navigateBack({});
					
				});
				
			},
			
			
			
			
			
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
