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
			<BirthdayBar :startDate="startDate" :endDate="endDate" :birthday="userInfoKeyValue"
			  :astrol="userInfo.astrol" @birthdayBarClick="onBirthdayClick">
				
			</BirthdayBar>
			
		</view>
		
		<!--<view v-else-if="userInfoKey == 'position'">
			<view class="head-bar align-center">
				<view><text class="font-size-max font-weight-bold">编辑身份</text></view>
			</view>
		</view>-->
		
		<view v-else-if="userInfoKey == 'area'">
			<view class="head-bar align-center">
				<view><text class="font-size-max font-weight-bold">编辑区域</text></view>
			</view>
			<view>
				<wangding-pickerAddress class="city" @wangdingPickerAddressChange="onAreaChange" 
					@wangdingPickerAddressClick="onAreaClick">
					{{city}}
				</wangding-pickerAddress>
			</view>
		</view>
		
		<!--<view v-else-if="userInfoKey == 'astrol'">
			<view class="head-bar align-center">
				<view><text class="font-size-max font-weight-bold">编辑星座</text></view>
			</view>
		</view>-->
		
		<view v-else>
			<view class="head-bar align-center">
				<view><text class="font-size-max font-weight-bold">星游会</text></view>
			</view>
			<NotFindBar @notFindBarClick="onNotFindClick">
				
			</NotFindBar>
			
		</view>
		
	</view>
</template>

<script>
import request from '../../../utils/net/request';
	export default {
		data() {
			return {
				userInfoKey: '',
				userInfoKeyValue: '',
				userInfo: {},
				startDate: '',
				endDate: '',
				city: '请选择城市'
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
				
				if (userInfoKey == "birthday" && cacheUserInfo[userInfoKey] == "") {
					// 如果生日为空，则赋当前日期
					let date = new Date();
					let year = date.getFullYear();
					let month = date.getMonth() + 1;
					let day = date.getDate();
					let cdate = `${year}-${month}-${day}`;
					That.userInfoKeyValue = cdate;
				}
				
				console.log("tabbar-5-detail-edit-info-item.vue onLoad userInfoKeyValue:" + That.userInfoKeyValue);
			}
			
			// 初始化日期
			That.startDate = That.getDate("start");
			That.endDate = That.getDate("end");
			console.log("tabbar-5-detail-edit-info-item.vue onLoad startDate: " + That.startDate);
			console.log("tabbar-5-detail-edit-info-item.vue onLoad endDate: " + That.endDate);
			
		},
		
		methods: {
			//
			// onPageBack : 页面返回
			//
			onPageBack() {
				uni.navigateBack();
			},
			
			//
			// getDate : 获取日期
			//
			getDate(type) {
				const date = new Date();
				let year = date.getFullYear();
				let month = date.getMonth() + 1;
				let day = date.getDate();
	
				if (type === 'start') {
					year = year - 60;
				} else if (type === 'end') {
					year = year + 2;
				}
				month = month > 9 ? month : '0' + month;
				day = day > 9 ? day : '0' + day;
				return `${year}-${month}-${day}`;
			},
			
			//
			// onCommitUserInfoChange : 提交用户信息改变
			//
			onCommitUserInfoChange(key, values = {}) {
				console.log("tabbar-5-detail-edit-info-item.vue onCommitUserInfoChange params, key:" + key + ", values:" + JSON.stringify(values));
				
				let That = this;
				
				if (!That.userInfo.hasOwnProperty("token")) {
					console.log("tabbar-5-detail-edit-info-item.vue onCommitUserInfoChange not token");
					request.uniShowToast("令牌无效，请重新登录", null, 3000);
					return;
				}
				
				let token = That.userInfo["token"];
				
				let params = values;
				request.getUserAttrUpdate(token, params, function(code, res){
					console.log("tabbar-5-detail-edit-info-item.vue onCommitUserInfoChange getUserAttrUpdate code:" + code + ", res:" + JSON.stringify(res));
					
					if (code != 0) {
						request.uniShowToast("修改失败", null, 3000);
						return;
					}
					
					let resCode = res["code"];
					
					// 更新本地缓存
					let newUserInfo = Object.assign(That.userInfo, params);
					console.log("tabbar-5-detail-edit-info-item.vue onCommitUserInfoChange getUserAttrUpdate success, newUserInfp:" + JSON.stringify(newUserInfo));
					
					// 更新缓存
					That.$storage.setUserInfo(newUserInfo);
					
					That.onPageBack();
					
				});
			},
			
			// 显示名称事件
			onNickNameClick(e, newValue) {
				console.log("tabbar-5-detail-edit-info-item.vue onNickNameClick params: " + JSON.stringify(e) + ", newValue:" + newValue);
				let That = this;
				
				if (e == "cancel") {
					
				}
				else if (e == "save") {
					That.onCommitUserInfoChange("nick_name", {"nick_name": newValue});
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
					That.onCommitUserInfoChange("account_id", {"account_id": newValue});
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
					That.onCommitUserInfoChange("introduce", {"introduce": newValue});
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
					That.onCommitUserInfoChange("sex", {"sex": newValue});
				}
				
				That.onPageBack();
			},
			
			// onBirthdayClick : 生日事件
			onBirthdayClick(e, newBirthday, newAstrol) {
				console.log("tabbar-5-detail-edit-info-item.vue onBirthdayClick params: " + JSON.stringify(e) + ", newBirthday:" + newBirthday + ", newAstrol:" + newAstrol);
				let That = this;
				
				if (e == "cancel") {
					
				}
				else if (e == "save") {
					That.onCommitUserInfoChange("birthday", {"birthday": newBirthday, "astrol": newAstrol});
				}
				
				That.onPageBack();
			},
			
			// onAreaChange : 区域改变
			onAreaChange(e) {
				console.log("tabbar-5-detail-edit-info-item.vue onAreaChange params: " + JSON.stringify(e));
				
				let That = this;
				That.city = e.data.join(" ");
			},
			
			// onAreaClick : 区域事件
			onAreaClick(e, newValue) {
				console.log("tabbar-5-detail-edit-info-item.vue onAreaClick params: " + JSON.stringify(e) + ", newValue:" + newValue);
				
				let That = this;
				That.city = newValue;
				
				if (e == "cancel") {
					
				}
				else if (e == "save") {
					That.onCommitUserInfoChange("city", {"city": newValue});
				}
				
				That.onPageBack();
			},
			
			// onNotFindClick : 未找到
			onNotFindClick(e) {
				console.log("tabbar-5-detail-edit-info-item.vue onNotFindClick params: " + JSON.stringify(e));
				let That = this;
				
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
