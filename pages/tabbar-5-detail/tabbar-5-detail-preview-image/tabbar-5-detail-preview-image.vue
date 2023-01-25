<template>
	<view class="container">
		<view class="image-wrap">
			<ksp-cropper mode="free" :width="200" :height="140" :maxWidth="1024" 
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
			
			onCropperOk(e) {
				console.log("tabbar-5-detail-preview-image.vue onCropperOk, params: " + JSON.stringify(e));
				
				let That = this;
				
				// 修改头像
				let token = "";
				// 获取缓存用户信息
				let cacheUserInfo = That.$storage.getUserInfo();
				console.log("tabbar-5-detail-preview-image.vue onCropperOk cacheUserInfo:" + JSON.stringify(cacheUserInfo));
				if (cacheUserInfo != null) {
					token = cacheUserInfo["token"];
				}
				if (token != "") {
					
				}
				
				That.onGotoBack();
			},
			
			onCropperCancel() {
				console.log("tabbar-5-detail-preview-image.vue onCropperCancel");
				
				let That = this;
				
				That.onGotoBack();
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
