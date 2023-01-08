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
						<view class="userinfo-list-title color-white font-size-max">{{userInfo.userDisplayName}}</view>
						<view class="userinfo-list-item color-white font-size-min">{{userInfo.userId}}</view>
						<view class="userinfo-list-item color-white font-size-min">{{userInfo.ipHome}}</view>
					</view>
				</view>
				
			</view>
			
			<!-- 用户简介 -->
			<view class="line-box-item">
				<view class="label-text text-align-left color-white font-size-mid">{{userInfo.introduce}}</view>
			</view>
			
			<!-- 标签 -->
			<view class="line-box">
				<block v-for="val in userInfo.tags">
					<view class="line-box-item" style="background-color: transparent; margin-right: 15upx;">
						<uni-tag size="mini" :circle="true" :text="val"></uni-tag>
					</view>
				</block>
			</view>
			
			<!-- 统计信息 -->
			<view class="line-box" style="height: 90upx;">
				<view class="line-box-item">
					<view class="font-size-mid color-white">{{userInfo.focus}}</view>
					<view class="font-size-min color-white">关注</view>
				</view>
				<view class="line-box-item" style="margin-left: 30upx;">
					<view class="font-size-mid color-white">{{userInfo.fans}}</view>
					<view class="font-size-min color-white">粉丝</view>
				</view>
				<view class="line-box-item" style="margin-left: 30upx;">
					<view class="font-size-mid color-white">{{userInfo.likes}}</view>
					<view class="font-size-min color-white">点赞</view>
				</view>
				<view class="line-box-item" style="margin-left: 30upx;">
					<view class="font-size-mid color-white">{{userInfo.collects}}</view>
					<view class="font-size-min color-white">收藏</view>
				</view>
				<view class="line-box-item" style="float: right; margin-right: 30upx;">
					<view class="button-group">
						<button class="line-button">编辑资料</button>
					</view>
				</view>
				
			</view>
			
			<!-- 店铺信息 -->
			<block v-if="userInfo.shopId != ''">
				<view class="line-box" style="padding: 0; text-align: center; ">
					<button class="line-button" style="width: 90%;">
						<uni-icons type="shop" size="16" color="white"></uni-icons>
						<text style="margin-left: 10upx; ">管理店铺</text>
					</button>
				</view>
			</block>
			
			<!-- 空行 -->
			<view class="line-box" style="height: 10upx; background-color: transparent;">
				
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
					introduce: '80后，程序员，公众号：星游会',
					tags: ['射手座', '广东广州', '程序员'], // 标签
					focus: 38, // 关注数
					fans: 128, // 粉丝数
					likes: 2, // 点赞数
					collects: 8, // 收藏数
					shopId: 'ab122', // 店铺ID，为空代表没有
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
		min-height: 250upx;
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
		font-size: 30upx;
		margin-top: 15upx;
	}
	
	.label-text {
		font-size: 32upx;
		padding-left: 15upx;
		padding-right: 15upx;
	}
	
	.font-size-max {
		font-size: 32upx;
	}
	
	.font-size-mid {
		font-size: 30upx;
	}
	
	.font-size-min {
		font-size: 26upx;
	}
	
	.color-white {
		color: white;
	}
	
	.text-align-left {
		text-align: left;
	}
	
	.line-button {
		border-radius: 10upx;
		background-color: transparent;
		color: white;
		font-size: 30upx;
	}
	
</style>
