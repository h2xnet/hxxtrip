<template>
	<view class="container">
		<view class="image-wrap">
			<image mode="aspectFill" :src="imageUrl" style="width: 256upx; height: 256upx; border-radius: 8upx;">
			</image>
		</view>
		<view class="image-camera">
			<uni-icons type="camera" size="48"></uni-icons>
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