<template>
	<view>
		<view v-for="(item, index) in modelDatas" :key="index">
			<BigImageCard class="card-view" :itemData="item">
				
			</BigImageCard>
			
			<view class="space-view"></view>
				
		</view>
		
		<!--<view class="floot-view">
			
		</view>-->
		
	</view>
</template>

<script>
	
	export default {
		
		name:"BigImageList",
		
		props: ["modelDatas"],
		
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss">
	
	.card-view {
		width: 100%;
		height: 400rpx;
	}
	
	.space-view {
		width: 100%;
		height: 10rpx;
		background-color: transparent;
	}
	
	.floot-view {
		width: 100%;
		height: 30rpx;
		background-color: transparent;
	}

</style>