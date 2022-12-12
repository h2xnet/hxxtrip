<template>
	<view class="content">
		<view class="workArea">
			<view class="titleArea">
				title
			</view>
			<view class="editorArea">
				editor input
			</view>
			
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: 'Hello',
				editorAreaHeight: 400
			}
		},
		onLoad() {
			console.log("tabbar-3-release.vue onLoad");
			
			let That = this;
					
			uni.getSystemInfo({
				success(res) {
					let winh = res.windowHeight; 
					console.log("tabbar-3-release.vue winh: " + winh)
					let pageEle = uni.createSelectorQuery().select(".editorArea"); //想要获取高度的元素名（class/id）
					pageEle.boundingClientRect(data=>{
						That.editorAreaHeight = winh - data.top  //计算高度：元素高度=窗口高度-元素距离顶部的距离（data.top）
					}).exec()
				}
			})
			
		},
		methods: {

		}
	}
</script>

<style>
	.content {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		/* #ifdef H5 */
		height: calc(100vh - var(--window-bottom) - var(--window-top));
		/* #endif */
		/* #ifndef H5 */
		height: 100vh;
		/* #endif */
		background-color: transparent;
	}
	
	.workArea {
		width: 100%;
		height: 100%;
		background-color: white;
		border-radius: 4upx;
	}
	
	.titleArea {
		width: 100%;
		height: 80upx;
		border-color: gray;
		border-radius: 4upx;
	}
	
	.editorArea {
		width: 100%;
		background-color: darkred;
	}
	
</style>
