<template>
	<view class="content">
		<view class="work-area">
			<view>
				<view class="line-box">
					<view class="line-box-item green-color">下一步</view>
					<view class="line-box-item gray-color">下一步</view>
				</view>
			</view>
			
			<uni-card :is-shadow="false" is-full>
				<uni-easyinput v-model="articleTitle" :inputBorder="false" :placeholderStyle="placeholderStyle" 
				placeholder="请输入标题" ></uni-easyinput>
			</uni-card>
			
			<uni-card>
				<uni-section  :is-shadow="false" is-full>
				<mp-html :content="editorHtml"></mp-html container-style="padding:20px" lazy-load scroll-table selectable use-anchor :tag-style="tagStyle">
				</uni-section >
			</uni-card>
				
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: 'Hello',
				placeholderStyle: "font-size:14px;",
				articleTitle: '',
				editorAreaHeight: 400,
				editorHtml: '<vid>Hell word</div>',
			}
		},
		onLoad() {
			console.log("tabbar-3-release.vue onLoad");
			
			let That = this;
					
			/*uni.getSystemInfo({
				success(res) {
					let winh = res.windowHeight; 
					console.log("tabbar-3-release.vue winh: " + winh)
					let pageEle = uni.createSelectorQuery().select(".editorArea"); //想要获取高度的元素名（class/id）
					pageEle.boundingClientRect(data=>{
						That.editorAreaHeight = winh - data.top  //计算高度：元素高度=窗口高度-元素距离顶部的距离（data.top）
					}).exec()
				}
			})*/
			
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
	
	.line-box {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: right;
		width: 100%;
		height: 60upx;
		font-size: 28upx;
	}
	
	.line-box-item {
		float: right;
		height: 40upx;
		padding-top: 10upx;
		background-color: red;
	}
	
	.work-area {
		display: flex;
		flex-direction: column;
		width: 100%;
		height: 100%;
		background-color: white;
		border-radius: 4upx;
	}
	
</style>
