<template>
	<view class="container">
		<view class="head-wrap">
			
		</view>
		<view class="list-wrap">
			<uni-list border="true">
				<uni-list-item showArrow title="显示名称" :rightText="userInfo.nick_name"></uni-list-item>
				<uni-list-item showArrow title="账号编号" :rightText="userInfo.account_id"></uni-list-item>
				<uni-list-item showArrow title="简介" :rightText="userInfo.introduce"></uni-list-item>
				<uni-list-item showArrow title="性别" ></uni-list-item>
				<uni-list-item showArrow title="生日" rightText="44-44"></uni-list-item>
				<uni-list-item showArrow title="身份" rightText="44-44"></uni-list-item>
				<uni-list-item showArrow title="地区" ></uni-list-item>
				<uni-list-item showArrow title="星座" rightText="44-44"></uni-list-item>
			</uni-list>
		</view>
	</view>
</template>

<script>
	
	// 网络请求
	import request from '../../../utils/net/request.js'
	
	export default {
		data() {
			return {
				sexs: ["未知","男","女"],
				userInfo: {}
			}
		},
		
		onLoad() {
			console.log("tabbar-5-detail-edit-info.vue onLoad.");
			
			let That = this;
			
			// 获取缓存用户信息
			let cacheUserInfo = That.$storage.getUserInfo();
			console.log("tabbar-5-detail-edit-info.vue onLoad cacheUserInfo:" + JSON.stringify(cacheUserInfo));
			if (cacheUserInfo != null) {
				That.userInfo = cacheUserInfo;
			}
		},
		
		methods: {
			
		}
	}
</script>

<style>
	
.head-wrap {
	height: 300upx;
	width: 100%;
}	

</style>
