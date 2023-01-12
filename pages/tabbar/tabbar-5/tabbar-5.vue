<template>
	<view class="content">
		<!-- 自定义头 -->
		<view class="custom-head">
			<view style="width: 100%; height: 58upx; background-color: transparent;"></view>
			<view class="line-box">
				<view class="line-box-item">
					<uni-icons type="settings" size="32" @click="onShowDrawer('showSettingsDrawer')"></uni-icons>
				</view>
			</view>
			
			<!-- 设置抽屉列表 -->
			<uni-drawer ref="showSettingsDrawer" mode="left" :width="200" @change="onChangeDrawer($event,'showSettingsDrawer')">
				<!-- 自定义头部功能区 -->
				<view>
					<button type="default" style="width: 100%; height: 80upx;"></button>
				</view>
				
				<!-- 功能区 -->
				<view>
					<view class="line-box">
						<view class="line-box-item" @click="goToPage('/pages/tabbar-5-detail/tabbar-5-detail-draft/tabbar-5-detail-draft', {})">
							<uni-icons type="folder-add" size="16"></uni-icons>
							<text class="text-icon-space-min font-size-max">我的草稿</text>
						</view>
					</view>
					<view class="line-box">
						<view class="line-box-item" @click="goToPage('/pages/tabbar-5-detail/tabbar-5-detail-create-center/tabbar-5-detail-create-center', {})">
							<uni-icons type="personadd-filled" size="16"></uni-icons>
							<text class="text-icon-space-min font-size-max">创作中心</text>
						</view>
					</view>
					<view class="line-box">
						<view class="line-box-item" @click="goToPage('/pages/tabbar-5-detail/tabbar-5-detail-browse-records/tabbar-5-detail-browse-records', {})">
							<uni-icons type="calendar" size="16"></uni-icons>
							<text class="text-icon-space-min font-size-max">浏览记录</text>
						</view>
					</view>
					<view class="line-box">
						<view class="line-box-item" @click="goToPage('/pages/tabbar-5-detail/tabbar-5-detail-wallet/tabbar-5-detail-wallet', {})">
							<uni-icons type="wallet" size="16"></uni-icons>
							<text class="text-icon-space-min font-size-max">钱包</text>
						</view>
					</view>
				</view>
				
				<view class="margin-left-min space-gray-line"></view>
				
				<!-- 商务区 -->
				<view>
					<view class="line-box">
						<view class="line-box-item" @click="goToPage('/pages/tabbar-5-detail/tabbar-5-detail-order/tabbar-5-detail-order', {});">
							<uni-icons type="shop" size="16"></uni-icons>
							<text class="text-icon-space-min font-size-max">订单</text>
						</view>
					</view>
					<view class="line-box">
						<view class="line-box-item" @click="goToPage('/pages/tabbar-5-detail/tabbar-5-detail-cart/tabbar-5-detail-cart', {});">
							<uni-icons type="cart" size="16"></uni-icons>
							<text class="text-icon-space-min font-size-max">购物车</text>
						</view>
					</view>
					<!--<view class="line-box">
						<view class="line-box-item">
							<uni-icons type="gift" size="16"></uni-icons>
							<text class="text-icon-space-min font-size-max">卡券</text>
						</view>
					</view>-->
					<view class="line-box">
						<view class="line-box-item" @click="goToPage('/pages/tabbar-5-detail/tabbar-5-detail-member/tabbar-5-detail-member', {});">
							<uni-icons type="staff" size="16"></uni-icons>
							<text class="text-icon-space-min font-size-max">会员</text>
						</view>
					</view>
				</view>
				
				<view class="margin-left-min space-gray-line"></view>
				
				<!-- 底部功能区 -->
				<view class="fixed-bottom">
					<view class="line-box">
						<view class="line-box-item" @click="goToPage('/pages/tabbar-5-detail/tabbar-5-detail-settings/tabbar-5-detail-settings', {});"
							style="margin-left: 35upx;">
							<view class="font-size-max"><uni-icons type="gear" size="24"></uni-icons></view>
							<view class="font-size-max">设置</view>
						</view>
						<view class="line-box-item" @click="goToPage('/pages/tabbar-5-detail/tabbar-5-detail-help/tabbar-5-detail-help', {});" 
							style="margin-left: 50upx;">
							<view class="font-size-max"><uni-icons type="headphones" size="24"></uni-icons></view>
							<view class="font-size-max">帮助</view>
						</view>
						<view class="line-box-item" @click="onScan();" style="margin-left: 50upx;">
							<view class="font-size-max"><uni-icons type="scan" size="24"></uni-icons></view>
							<view class="font-size-max">扫一扫</view>
						</view>
					</view>
					
				</view>
				
			</uni-drawer>
			
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
						<button class="line-button"  @click="goToPage('/pages/tabbar-5-detail/tabbar-5-edit-info/tabbar-5-edit-info', {})">编辑资料</button>
					</view>
				</view>
				
			</view>
			
			<!-- 店铺信息 -->
			<block v-if="userInfo.shopId != ''">
				<view class="line-box" style="padding: 0; text-align: center; ">
					<button class="line-button" @click="goToPage('/pages/tabbar-5-detail/tabbar-5-detail-manager-store/tabbar-5-detail-manager-store', {});" 
						style="width: 90%;">
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
				
			},
			
			goToPage(url, param) {
				console.log("tabbar-5.vue goToPage params, url:" + url + ", param: " + JSON.stringify(param));
				if (!url) {
					return;
				}
				uni.navigateTo({
					url: url,
					fail(err) {
						console.log("gotoPage fail, err:" + JSON.stringify(err));
					}
				});
			},
			
			//
			// onShowDrawer : 系统设置
			//
			onShowDrawer(e) {
				console.log("tabbar-5.vue onShowDrawer params, " + e);
				let That = this;
				
				That.$refs[e].open()
			},
			onCloseDrawer(e) {
				console.log("tabbar-5.vue onCloseDrawer params, " + e);
				let That = this;
				
				That.$refs[e].close()
			},
			onChangeDrawer(e, type) {
				console.log("tabbar-5.vue onChangeDrawer params, e:" + e + ", type:" + type);
				let That = this;
				
				That[type] = e
			},
			
			onScan() {
				// 扫一扫
				console.log("tabbar-5.vue onScan");
				let That = this;
			},
			
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
	
	.margin-left-min {
		margin-left: 15upx;
	}
	
	.fixed-bottom {
		width: 100%;
		bottom: 0upx;
		position: fixed;
		padding-left: 0upx;
		padding-right: 0upx;
		padding-bottom: 30upx;
		background-color: #ffffff;
		transform: translateZ(0);
		bottom: env(safe-area-inset-bottom);
		box-shadow: 0upx -5upx 14upx #e3e6e6;
		bottom: contant(safe-area-inset-bottom);
	}
	
</style>
