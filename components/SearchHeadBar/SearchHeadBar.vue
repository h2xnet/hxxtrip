
<!-- 自定义头部搜索组件 -->
<template>
	<view class="content">
		<view class="container-box"></view>
		
		<view class="container-box">
			<text class="align-center">{{itemData.title}}</text>
		</view>
		
		<view class="container-box">
			<view class="container-box-item">
				<image src="../../static/logo.png" 
					style="width: 32px; height: 32px; position: absolute; padding-left: 20px; padding-top: 12px; ">
				</image>
				
				<uni-search-bar :focus="false" radius="5" placeholder="搜索" clearButton="always" cancelButton="none" 
					@confirm="search" @cancel="cancel" 
					style="padding-left: 55px; width: 280px;"
				/>
				
			</view>
		</view>
		
	</view>
</template>

<script>
	import uniSearchBar from '@dcloudio/uni-ui/lib/uni-search-bar/uni-search-bar.vue'
	
	export default {
		
		components: {
			uniSearchBar
		},
		
		name:"SearchHeadBar",
		
		props: ["itemData"],
		
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss">
	
.content {
	height: 110px;
	background-color: white;
	display: flex;
	flex-direction: column;
}

.container-box {
	background-color: transparent;
	width: 100%;
	height: 30px;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
}

.container-box-item {
	display: flex;
	justify-content: space-between;
	font-size: 14px;
}

.align-center {
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	width: 100%;
}

</style>