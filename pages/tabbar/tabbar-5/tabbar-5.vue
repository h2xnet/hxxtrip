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
				
				<!-- 扩展功能区 -->
				<view>
					<block v-if="loginState > 0">
						<view class="line-box">
							<view class="line-box-item" @click="onLogout();">
								<uni-icons type="close" size="16"></uni-icons>
								<text class="text-icon-space-min font-size-max">退出登录</text>
							</view>
						</view>
					</block>
					
				</view>
				
				<!-- 底部功能区 -->
				<view class="fixed-bottom">
					<view class="line-box">
						<view class="line-box-item" @click="goToPage('/pages/tabbar-5-detail/tabbar-5-detail-settings/tabbar-5-detail-settings', {'name': 'settings'});"
							style="margin-left: 35upx;">
							<view class="font-size-max"><uni-icons type="gear" size="24"></uni-icons></view>
							<view class="font-size-max">设置</view>
						</view>
						<view class="line-box-item" @click="goToPage('/pages/tabbar-5-detail/tabbar-5-detail-help/tabbar-5-detail-help', {'name': 'help'});" 
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
				<view class="line-box-item" @click="onPreviewHead">
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
				
				<!-- 登录、注册 -->
				<block v-if="loginState <= 0">
					<view class="line-box-item margin-left-max">
						<button type="primary" size="mini" @click="goToPage('/pages/tabbar-5-detail/tabbar-5-detail-login/tabbar-5-detail-login', {'name': 'login'});">
							<uni-icons type="person" size="16" color="white"></uni-icons>
							<text class="margin-left-min">登录 / 注册</text>
						</button>
					</view>
				</block>
				
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
						<button class="line-button"  @click="goToPage('/pages/tabbar-5-detail/tabbar-5-detail-edit-info/tabbar-5-detail-edit-info', {'name': 'editInfo'})">编辑资料</button>
					</view>
				</view>
				
			</view>
			
			<!-- 店铺信息 -->
			<block v-if="userInfo.shopId != ''">
				<view class="line-box" style="padding: 0; text-align: center; ">
					<button class="line-button" @click="goToPage('/pages/tabbar-5-detail/tabbar-5-detail-manager-store/tabbar-5-detail-manager-store', {'name': 'managerStore'});" 
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
					userId: '',
					userAccount: '',
					userDisplayName: '未知',
					userPhone: '',
					ipHome: '',
					introduce: '公众号：星游会',
					tags: [], // 标签
					focus: 0, // 关注数
					fans: 0, // 粉丝数
					likes: 0, // 点赞数
					collects: 0, // 收藏数
					shopId: 'ab122', // 店铺ID，为空代表没有
				}
			}
		},
		onLoad() {
			
			let That = this;
			
			// 初始化数据
			That.onInitData();

		},
		
		onShow() {
			let That = this;
			
			// 获取缓存用户信息
			let cacheUserInfo = That.$storage.getUserInfo();
			console.log("tabbar-5.vue onShow cacheUserInfo:" + JSON.stringify(cacheUserInfo));
			if (cacheUserInfo != null) {
				That.setUserInfo(cacheUserInfo);
			}
			else {
				That.setUserInfo(null);
			}
			
			// 获取登录状态
			console.log("tabbar-5.vue login_state: " + That.$global_login_state);
			if (That.$global_login_state <= 0) {
				// 未登录状态，则跳转到登录页
				That.goToPage('/pages/tabbar-5-detail/tabbar-5-detail-login/tabbar-5-detail-login', {});
			}
			
		},
		
		methods: {
			onInitData() {
				console.log("tabbar-5.vue onInitData");

				let That = this;
				
				
			},
			
			goToPage(url, param) {
				console.log("tabbar-5.vue goToPage params, url:" + url + ", param: " + JSON.stringify(param));
				
				let That = this;
				
				// {"name": "editInfo"}
				if (!url) {
					return;
				}
				
				// 需求登录
				if (param["name"] == "editInfo" && That.$global_login_state <= 0) {
					// 跳转登录
					That.goToPage('/pages/tabbar-5-detail/tabbar-5-detail-login/tabbar-5-detail-login', {});
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
			// setUserInfo : 设置用户信息
			//
			setUserInfo(info) {
				console.log("tabbar-5.vue setUserInfo params, info: " + JSON.stringify(info));
				
				let That = this;
				
				if (info == null) {
					That.userInfo.userId = "";
					That.userInfo.userAccount = "";
					That.userInfo.userDisplayName = "未知";
					That.userInfo.userPhone = "";
					That.userInfo.introduce = "";
					That.userInfo.headUrl = "";
					
					That.userInfo.ipHome = "";
					That.userInfo.tags = [];
					
					That.userInfo.focus = 0;
					That.userInfo.fans = 0;
					That.userInfo.likes = 0;
					That.userInfo.collects = 0;
					That.userInfo.shopId = 0;
					
					// 修改登录状态
					That.loginState = 0;
					That.$global_login_state = 0;
				}
				else {
					That.userInfo.userId = info["account_id"];
					That.userInfo.userAccount = info["account"];
					That.userInfo.userDisplayName = info["nick_name"];
					That.userInfo.userPhone = info["phone"];
					That.userInfo.introduce = info["introduce"];
					That.userInfo.headUrl = info["avatar_url"];
					
					That.userInfo.focus = info["focus"];
					That.userInfo.fans = info["fans"];
					That.userInfo.likes = info["likes"];
					That.userInfo.collects = info["collects"];
					That.userInfo.shopId = info["shopId"];
					
					That.userInfo.tags = [];
					// 星座
					if (info["astrol"] != "") {
						That.userInfo.tags.push(info["astrol"]);
					}
					// 城市
					if (info["city"] != "") {
						let cityArr = info["city"].split(" ");
						if (cityArr.length == 3) {
							That.userInfo.ipHome = cityArr[0];
							
							let addr = `${cityArr[1]} ${cityArr[2]}`;
							That.userInfo.tags.push(addr);
						}
					}
					// 身份
					if (info["position"].length > 0) {
						let positions = info["position"];
						for(let idx = 0; idx < positions.length; idx++) {
							That.userInfo.tags.push(positions[idx]);
						}
					}
					console.log("tabbar-5.vue setUserInfo tags:" + JSON.stringify(That.tags));
					
					That.userInfo.focus = info["focus"];
					That.userInfo.fans = info["fans"];
					That.userInfo.likes = info["likes"];
					That.userInfo.collects = info["collects"];
					That.userInfo.shopId = info["shopId"];
					
					// 修改登录状态
					That.loginState = 1;
					That.$global_login_state = 1;
				}
				
				if (That.userInfo.headUrl == "") {
					That.userInfo.headUrl = "/static/gray_head.jpeg"
				}
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
			
			//
			// onLogout : 退出登录
			//
			onLogout() {
				console.log("tabbar-5.vue onLogout");
				let That = this;
				
				// 清理缓存
				That.$storage.remove("userInfo");
				
				// 重置用户信息
				That.setUserInfo(null);
				
			},
			
			onScan() {
				// 扫一扫
				console.log("tabbar-5.vue onScan");
				let That = this;
			},
			
			//
			// onPreviewHead : 预览头像
			//
			onPreviewHead() {
				console.log("tabbar-5.vue onPreviewHead.");
				
				let That = this;
				
				let imgs = [];
				imgs.push(That.userInfo.headUrl);
				
				request.uniPreviewImage(imgs, 0);
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
	
	/*.fixed-bottom {
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
	}*/
	
	.margin-left-min {
		margin-left: 15upx;
	}
	
	.margin-left-mid {
		margin-left: 20upx;
	}
	
	.margin-left-max {
		margin-left: 30upx;
	}
	
</style>
