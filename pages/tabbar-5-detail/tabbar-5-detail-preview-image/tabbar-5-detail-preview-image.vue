<template>
	<view class="container">
		<view class="image-wrap">
			<ksp-cropper mode="free" :width="200" :height="200" :maxWidth="1024" 
			:maxHeight="1024" :url="url" @cancel="onCropperCancel" @ok="onCropperOk">
				
			</ksp-cropper>
		</view>
	</view>
</template>

<script>
	
	// 网络请求
	import request from '../../../utils/net/request.js'
	
	export default {
		data() {
			return {
				url: ''
			}
		},
		
		onLoad(params) {
			console.log("tabbar-5-detail-preview-image.vue onLoad params: " + JSON.stringify(params));
			
			let tempPath = params["path"];
			console.log("tabbar-5-detail-preview-image.vue onLoad tempPath:" + tempPath);
			
			let That = this;
			That.url = tempPath;
		},
		
		methods: {
			
			//
			// onGotoBack : 返回上一页
			//
			onGotoBack() {
				console.log("onGotoBack");
				
				let That = this;
				
				uni.navigateBack();
			},
			
			//
			// onCropperOk : 确定
			//
			onCropperOk(e) {
				console.log("tabbar-5-detail-preview-image.vue onCropperOk, params: " + JSON.stringify(e));
				// {"path":"http://tmp/4XKLOKRBtKnadddf0b883d4e7575989a6d9d8c13cf50.png"}
				
				let That = this;
				
				// 修改头像
				let token = "";
				let accountId = "";
				// 获取缓存用户信息
				let cacheUserInfo = That.$storage.getUserInfo();
				console.log("tabbar-5-detail-preview-image.vue onCropperOk cacheUserInfo:" + JSON.stringify(cacheUserInfo));
				if (cacheUserInfo != null) {
					token = cacheUserInfo["token"];
					accountId = cacheUserInfo["account_id"];
				}
				if (token == "") {
					request.uniShowToast("令牌无效，请重新登录", null, 3000);
					return;
				}
				
				That.onUploadHeadImageFile(token, accountId, e.path)
			},
			
			//
			// onCropperCancel : 取消
			//
			onCropperCancel() {
				console.log("tabbar-5-detail-preview-image.vue onCropperCancel");
				
				let That = this;
				
				That.onGotoBack();
			},
			
			//
			// onUploadFile : 文件上传
			//
			onUploadHeadImageFile(token, accountId, localFileName) {
				console.log("tabbar-5-detail-preview-image.vue onUploadHeadImageFile params, token:" + token + ", accountId:" + accountId + ", localFileName:" + localFileName);
				
				let That = this;
				
				let fileType = "image";
				
				let fileExt = "png";
				let fileArrs = localFileName.split(".");
				if (fileArrs.length == 2) {
					fileExt = fileArrs[1];
				}
				
				let prefix = "image_head_";
				let fileName = prefix + accountId + "_" + new Date().getTime().toString() + "." + fileExt;
				//let filePath = "/image/head/"
				let cloudFileName = fileName;
				console.log("tabbar-5-detail-preview-image.vue onUploadHeadImageFile cloudFileName:" + cloudFileName);
				
				// 上传图片文件
				request.cloudUploadFile(cloudFileName, localFileName, fileType, null, function(code, res){
					console.log("tabbar-5-detail-preview-image.vue onUploadHeadImageFile cloudUploadFile code:" + code + ", res:" + JSON.stringify(res));
					
					if (code != 0) {
						request.uniShowToast("文件上传失败", null, 3000);
						return;
					}
					
					let imgUrl = res["fileID"];
					
					let userAttrParam = {};
					userAttrParam["avatar_url"] = imgUrl;
					console.log("tabbar-5-detail-preview-image.vue onUploadHeadImageFile userAttrParam: " + JSON.stringify(userAttrParam));
					
					// 更新头像
					request.getUserAttrUpdate(token, userAttrParam, function(code2, res2){
						console.log("tabbar-5-detail-preview-image.vue onUploadHeadImageFile getUserAttrUpdate code:" + code2 + ", res:" + JSON.stringify(res2));
						
						/*if (code2 != 0) {
							request.uniShowToast("头像更新失败", null, 3000);
							return;
						}
						
						let errCode = res2["errCode"];
						let errMsg = res2["errMsg"];
						if (errCode != 200) {
							request.uniShowToast(errMsg, null, 3000);
							return;
						}*/
						
						// 更新本地缓存
						let newUserInfo = That.$storage.getUserInfo();
						newUserInfo["avatar_url"] = imgUrl;
						console.log("tabbar-5-detail-edit-info-item.vue onUploadHeadImageFile getUserAttrUpdate success, newUserInfp:" + JSON.stringify(newUserInfo));
						
						// 更新缓存
						That.$storage.setUserInfo(newUserInfo);
						
						let logInfo = {};
						logInfo["fileType"] = fileType;
						logInfo["imgUrl"] = imgUrl;
						logInfo["fileName"] = fileName;
						logInfo["ext"] = fileExt;
						logInfo["purpose"] = "avatar_url";
						logInfo["remark"] = 0;
						
						console.log("tabbar-5-detail-preview-image.vue onUploadHeadImageFile logInfo: " + JSON.stringify(logInfo));
						
						// 添加数据库日志记录
						request.uploadImageLogAdd(token, logInfo, function(code3, res3){
							console.log("tabbar-5-detail-preview-image.vue onUploadHeadImageFile uploadImageLogAdd code:" + code3 + ", res:" + JSON.stringify(res3));
							
							That.onGotoBack();
						});
						
						
					});
					
					
				});
				
				
			}
			
		}
	}
</script>

<style>
	
.container {
	width: 100%;
	height: 100%;
}	

</style>
