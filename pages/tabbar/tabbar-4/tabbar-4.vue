<template>
	<view class="content">
		<view>
			<view class="tabs">
				<scroll-view scroll-x="true" scroll-with-animation class="scroll-tab">
					<block v-for="(item, index) in navItems" :key="index">
						<view class="scroll-tab-item" :class="{'active' : currentIndex==index}"
						@tap="navChooseTab(index)">
							{{item.title}}
							<view class="scroll-tab-line"></view>
						</view>
					</block>
				</scroll-view>
				
			</view>
			
			<scroll-view scroll-y="true" class="tabs-wrap" :style="{height: tabPageHeight + 'px'}">
				
				<!-- tab-page-0 今日消息页面 -->
				<view :class="[currentIndex==0?'item':'']" v-show="currentIndex==0">
					<text>今日消息页面</text>
				</view>
			
				<!-- tab-page-1 历史消息页面 -->
				<view :class="[currentIndex==1?'item':'']" v-show="currentIndex==1">
					<text>历史消息页面</text>
				</view>
				
			</scroll-view>
			
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: 'Hello',
				tabPageHeight: 400,
				currentIndex: 0,
				navItems: [
					{title: "今日"},
					{title: "历史"}
				]
			}
		},
		onLoad() {
			
			let That = this;
					
			uni.getSystemInfo({
				success(res) {
					let winh = res.windowHeight; 
					console.log("tabbar-4.vue winh: " + winh)
					let pageEle = uni.createSelectorQuery().select(".tabs-wrap"); //想要获取高度的元素名（class/id）
					pageEle.boundingClientRect(data=>{
						That.tabPageHeight = winh - data.top  //计算高度：元素高度=窗口高度-元素距离顶部的距离（data.top）
					}).exec()
				}
			})

		},
		methods: {
			
			navChooseTab(index) {
				this.currentIndex = index
			}

		}
	}
</script>

<style>
	.content {
		text-align: center;
		height: 400upx;
		margin-top: 10upx;
		
	}
	
	.tabs {
		/*width: auto;
		height: 80rpx;
		display: flex;
		margin-left: 30rpx;
		margin-top: 10rpx;*/
	}
	
	.tabs .active {
		color: red;
	}
	
	.tabs-wrap {
		background: #ccc;
	}
	
	.scroll-tab {
		white-space: nowrap;
		border-bottom: 1rpx solid #eee;
		text-align: center;
	}
	
	.scroll-tab-item {
		display: inline-block;
		margin: 20rpx 30rpx 0 30rpx;
	}
	
	.active .scroll-tab-line {
		border-bottom: 10rpx solid red;
		color: red;
		border-radius: 20rpx;
		width: auto;
	}
	
</style>
