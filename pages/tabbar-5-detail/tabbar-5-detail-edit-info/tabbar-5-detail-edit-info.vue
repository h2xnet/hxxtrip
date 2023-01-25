<template>
	<view class="container">
		<view class="head-wrap">
			
		</view>
		<view class="list-wrap">
			<uni-list border="true">
				<uni-list-item showArrow title="显示名称" :rightText="userInfo.nick_name" clickable="true" @click="onEditUserInfo('nick_name');"></uni-list-item>
				<uni-list-item showArrow title="账号" :rightText="userInfo.account_id" clickable="true" @click="onEditUserInfo('account_id');"></uni-list-item>
				<uni-list-item showArrow title="简介" :rightText="userInfo.introduce" clickable="true" @click="onEditUserInfo('introduce');"></uni-list-item>
				<uni-list-item showArrow title="性别" :rightText="sexs[userInfo.sex]" clickable="true" @click="onEditUserInfo('sex');"></uni-list-item>
				<uni-list-item showArrow title="生日" :rightText="userInfo.birthday" clickable="true" @click="onEditUserInfo('birthday');"></uni-list-item>
				<uni-list-item showArrow title="身份" :rightText="userInfo.position_list" clickable="true" @click="onEditUserInfo('position');"></uni-list-item>
				<uni-list-item showArrow title="地区" :rightText="userInfo.area" clickable="true" @click="onEditUserInfo('area');"></uni-list-item>
				<uni-list-item title="星座" :rightText="userInfo.astrol"></uni-list-item>
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
				sexs: ["未知","男","女","保密"],
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
				cacheUserInfo["area"] = cacheUserInfo["country"] + "-" + cacheUserInfo["province"] + "-" + cacheUserInfo["city"];
				cacheUserInfo["position_list"] = cacheUserInfo["position"].join(",");
				That.userInfo = cacheUserInfo;
			}
		},
		
		methods: {
			//
			// onEditUserInfo : 编辑用户信息
			//
			onEditUserInfo(userInfoKey) {
				console.log("tabbar-5-detail-edit-info.vue onEditUserInfo params, userInfoKey: " + userInfoKey);
				
				let url = "/pages/tabbar-5-detail/tabbar-5-detail-edit-info-item/tabbar-5-detail-edit-info-item";
				url += "?userInfoKey=" + userInfoKey;
				console.log("tabbar-5-detail-edit-info.vue onEditUserInfo url:" + url);
				
				request.uniGotoPage(url, {}, function(err, res){
					console.log("tabbar-5-detail-edit-info.vue onEditUserInfo uniGotoPage err:" + JSON.stringify(err) + ", res:" + JSON.stringify(res));
					
				});
			}
		}
	}
</script>

<style>
	
.head-wrap {
	height: 300upx;
	width: 100%;
}	

</style>
