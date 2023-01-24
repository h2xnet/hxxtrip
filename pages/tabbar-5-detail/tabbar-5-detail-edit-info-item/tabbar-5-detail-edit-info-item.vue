<template>
	<view class="container">
		
		<view v-if="userInfoKey == 'nick_name'">
			<view class="head-bar align-center">
				<view><text class="font-size-max font-weight-bold">编辑显示名称</text></view>
			</view>
			
			<InputTextBar labelText1="七天内可以修改一次名称" labelText2="请设置2-30个字符,不包括@<>/等特殊字符哦"
				inputPlaceholderText="请输入新的显示名称" inputMaxLength="30" :inputTextDef="userInfoKeyValue"
				 @inputTextBarClick="onNickNameClick">
			</InputTextBar>
		</view>
		
		<view v-else-if="userInfoKey == 'account_id'">
			<view class="head-bar align-center">
				<view><text class="font-size-max font-weight-bold">编辑账号</text></view>
			</view>
			<InputTextBar labelText1="账号是唯一凭证,只能修改一次" labelText2="10~16个字符,仅可以使用英文字符,数字和下划线"
				inputPlaceholderText="请输入新的账号" inputMaxLength="16" :inputTextDef="userInfoKeyValue"
				@inputTextBarClick="onAccountIdClick">
			</InputTextBar>
		</view>
		
		<view v-else-if="userInfoKey == 'introduce'">
			<view class="head-bar align-center">
				<view><text class="font-size-max font-weight-bold">编辑简介</text></view>
			</view>
			<InputTextAreaBar labelText1="七天内可修改三次简介" inputPlaceholderText="填写兴趣爱好,生活方式等个人简介"
				inputMaxLength="250" @inputTextAreaBarClick="onIntroduceClick">
				
			</InputTextAreaBar>
		</view>
		
		<view v-else-if="userInfoKey == 'sex'">
			<view class="head-bar align-center">
				<view><text class="font-size-max font-weight-bold">编辑性别</text></view>
			</view>
			<SexRadioBar @sexRadioBarClick="onSexClick">
				
			</SexRadioBar>
		</view>
		
		<view v-else-if="userInfoKey == 'birthday'">
			<view class="head-bar align-center">
				<view><text class="font-size-max font-weight-bold">编辑生日</text></view>
			</view>
			
		</view>
		
		<view v-else-if="userInfoKey == 'position'">
			<view class="head-bar align-center">
				<view><text class="font-size-max font-weight-bold">编辑身份</text></view>
			</view>
		</view>
		
		<view v-else-if="userInfoKey == 'area'">
			<view class="head-bar align-center">
				<view><text class="font-size-max font-weight-bold">编辑区域</text></view>
			</view>
		</view>
		
		<view v-else-if="userInfoKey == 'astrol'">
			<view class="head-bar align-center">
				<view><text class="font-size-max font-weight-bold">编辑星座</text></view>
			</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				userInfoKey: '',
				userInfoKeyValue: '',
				userInfo: {}
			}
		},
		
		onLoad(e) {
			console.log("tabbar-5-detail-edit-info-item.vue onLoad.");
			
			let That = this;
			
			let userInfoKey = e.userInfoKey;
			console.log("tabbar-5-detail-edit-info-item.vue onLoad input params, userInfoKey:" + userInfoKey);
			That.userInfoKey = userInfoKey;
			
			// 获取缓存用户信息
			let cacheUserInfo = That.$storage.getUserInfo();
			console.log("tabbar-5-detail-edit-info-item.vue onLoad cacheUserInfo:" + JSON.stringify(cacheUserInfo));
			if (cacheUserInfo != null) {
				That.userInfo = cacheUserInfo;
				That.userInfoKeyValue = cacheUserInfo[userInfoKey];
				
				console.log("tabbar-5-detail-edit-info-item.vue onLoad userInfoKeyValue:" + That.userInfoKeyValue);
			}
		},
		
		methods: {
			//
			// onPageBack : 页面返回
			//
			onPageBack() {
				uni.navigateBack();
			},
			
			// 显示名称事件
			onNickNameClick(e, newValue) {
				console.log("tabbar-5-detail-edit-info-item.vue onNickNameClick params: " + JSON.stringify(e) + ", newValue:" + newValue);
				let That = this;
				
				if (e == "cancel") {
					
				}
				else if (e == "save") {
					
				}
				
				That.onPageBack();
			},
			
			// 账号事件
			onAccountIdClick(e, newValue) {
				console.log("tabbar-5-detail-edit-info-item.vue onAccountIdClick params: " + JSON.stringify(e) + ", newValue:" + newValue);
				let That = this;
				
				if (e == "cancel") {
					
				}
				else if (e == "save") {
					
				}
				
				That.onPageBack();
			},
			
			// 简介
			onIntroduceClick(e, newValue) {
				console.log("tabbar-5-detail-edit-info-item.vue onIntroduceClick params: " + JSON.stringify(e) + ", newValue:" + newValue);
				let That = this;
				
				if (e == "cancel") {
					
				}
				else if (e == "save") {
					
				}
				
				That.onPageBack();
			},
			
			// onSexClick : 性别
			onSexClick(e, newValue) {
				console.log("tabbar-5-detail-edit-info-item.vue onSexClick params: " + JSON.stringify(e) + ", newValue:" + newValue);
				let That = this;
				
				if (e == "cancel") {
					
				}
				else if (e == "save") {
					
				}
				
				That.onPageBack();
			}
			
		}
	}
</script>

<style>
	
.head-bar {
	width: 100%;
	height: 140upx;
}	

.align-center {
	flex: auto;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
}

.font-weight-bold {
	font-weight: bold;
}



</style>
