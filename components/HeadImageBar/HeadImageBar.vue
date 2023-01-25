<template>
	<view class="container">
		<view class="image-wrap">
			<image mode="aspectFill" :src="imageUrl" style="width: 256upx; height: 256upx; border-radius: 8upx;">
			</image>
		</view>
		<view class="image-camera" @click="onChoseImage">
			<uni-icons type="camera" size="48" color="green"></uni-icons>
		</view>
	</view>
</template>

<script>
	export default {
		name:"HeadImageBar",
		props: {
			imageUrl: {
				type: String,
				default: "/static/gray_head.jpeg"
			}
		},
		data() {
			return {
				
			};
		},
		
		methods: {
			
			//
			// onChoseImage : 选择图片
			// 
			onChoseImage() {
				console.log("HeadImageBar.vue onChoseImage.");
				
				let That = this;
				
				uni.chooseImage({
					count: 1,
					success(res) {
						console.log("HeadImageBar.vue onChoseImage uni.chooseImage res: " + JSON.stringify(res));
						
						That.$emit("headImageBarClick", res.tempFilePaths);
					},
					fail(err) {
						console.log("HeadImageBar.vue onChoseImage uni.chooseImage err: " + JSON.stringify(err));
					}
				})
			}
			
		}
	}
</script>

<style>
	
.container {
	display: flex;
	flex-direction: row;
	justify-content: center;
}

.image-wrap {
	width: 256upx;
	height: 256upx;
	border-radius: 8upx;
}

.image-camera {
	background-color: transparent;
	margin-left: -30upx;
	margin-top: 180upx;
	width: 100upx;
	height: 90upx;
}

</style>