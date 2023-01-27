<template>
	<view class="container">
		<view class="image-wrap">
			<ksp-cropper mode="free" :width="imageWidth" :imageHeight="256" :maxWidth="1024" 
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
				url: '',
				imageWidth: 196,
				imageHeight: 196
			}
		},
		
		onLoad(params) {
			console.log("tabbar-3-detial-image-cropper.vue onLoad params: " + JSON.stringify(params));
			
			let tempPath = params["path"];
			let width = params["width"];
			let height = params["height"];
			
			let That = this;
			That.url = tempPath;
			That.imageWidth = width;
			That.imageHeight = height;
		},
		
		methods: {
			
			//
			// onGotoBack : 返回上一页
			//
			onGotoBack(path = null) {
				console.log("tabbar-3-detial-image-cropper.vue onGotoBack");
				
				let That = this;
				
				let data = {};
				data["path"] = (path == null) ? "" : path;
				
				That.$storage.setCropperImageData(data);
				
				uni.navigateBack();
			},
			
			//
			// onCropperOk : 确定
			//
			onCropperOk(e) {
				console.log("tabbar-3-detial-image-cropper.vue onCropperOk, params: " + JSON.stringify(e));
				// {"path":"http://tmp/4XKLOKRBtKnadddf0b883d4e7575989a6d9d8c13cf50.png"}
				
				let That = this;
				
				let imgPath = e["path"];
				That.onGotoBack(imgPath);
			},
			
			//
			// onCropperCancel : 取消
			//
			onCropperCancel() {
				console.log("tabbar-3-detial-image-cropper.vue onCropperCancel");
				
				let That = this;
				
				That.onGotoBack();
			}
			
			
		}
	}
</script>

<style>

</style>
