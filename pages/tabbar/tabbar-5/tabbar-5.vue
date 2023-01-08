<template>
	<view class="content">
		<!-- 自定义头 -->
		<view class="custom-head">
			<view style="width: 100%; height: 58upx; background-color: transparent;"></view>
			<view class="line-box">
				<view class="line-box-item">
					<uni-icons type="settings" size="32"></uni-icons>
				</view>
			</view>
			
			<!-- 用户基础信息 -->
			<view class="line-box" style="height: 140upx; background-color: transparent;">
				<!-- 头像 -->
				<view class="line-box-item">
					<image :src="userInfo.headUrl" 
					mode="aspectFill" style="width: 128upx; height: 128upx; border-radius: 8upx;"></image>
				</view>
				
				<!-- 用户信息 -->
				<view class="line-box-item">
					<view class="userinfo-list">
						<view class="userinfo-list-title">{{userInfo.userDisplayName}}</view>
						<view class="userinfo-list-item">{{userInfo.userId}}</view>
						<view class="userinfo-list-item">{{userInfo.ipHome}}</view>
					</view>
				</view>
				
			</view>
			
			<!-- 用户简介 -->
			<view class="line-box-item">
				<view class="label-text">{{userInfo.introduce}}</view>
			</view>
			
		</view>
		
		<view v-show="loginState == 0">
			页面 - not login
		</view>
		
		<view v-show="loginState == 1">
			页面 - logined
		</view>
		
	</view>
</template>

<script>
	
	// 网络请求
	import request from '../../../utils/net/request.js'
	
	export default {
		data() {
			return {
				loginState: this.$global_login_state,
				title: 'Hello',
				userInfo: {
					headUrl: 'https://img-blog.csdnimg.cn/img_convert/462ba175388a6005201d8a73f186c527.png',
					userId: 'abc123456',
					userAccount: 'xgzfs',
					userDisplayName: '星光zfs',
					userPhone: '13560440305',
					ipHome: '广东',
					introduce: '80后，程序员，公众号：星游会'
				}
			}
		},
		onLoad() {
			
			let That = this;
			
			// 初始化数据
			That.onInitData();
			// 登录
			//http.cloudAuth((code, res) => {
			//	console.log("tabbar-5.vue cloudAuth code:" + code + ", res:" + JSON.stringify(res));
			//});

		},
		methods: {
			onInitData() {
				console.log("tabbar-5.vue onInitData");

				let That = this;
				
				// 获取登录状态
				console.log("tabbar-5.vue login_state: " + That.$global_login_state);
				
				// 获取UUID
				request.getUuid({"len": 32, "radix": 16}, function(code, res){
					console.log("tabbar-5.vue onInitData getUuid params, code:" + code + ", res:" + JSON.stringify(res));
				});
				
			}
		}
	}
</script>

<style lang="scss">
	.content {
		text-align: center;
		height: 400upx;
		margin-top: 0;
	}
	
	.custom-head {
		background-color: lightslategray;
		height: 400upx;
	}
	
	.line-box {
		padding-top: 10upx;
		padding-bottom: 10upx;
		padding-left: 15upx;
		padding-right: 15upx;
		height: 60upx;
		width: 100%;
		display: inline-block;
	}
	
	.line-box-item {
		margin: 0;
		float: left;
	}
	
	.userinfo-list {
		display: flex;
		flex-direction: column;
		text-align: left;
		margin-left: 30upx;
	}
	
	.userinfo-list-title {
		font-size: 32upx;
		font-weight: bold;
	}
	
	.userinfo-list-item {
		font-size: 24upx;
		margin-top: 15upx;
	}
	
	.label-text {
		font-size: 28upx;
		padding-left: 15upx;
		padding-right: 15upx;
	}
	
</style>
