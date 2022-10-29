<template>
	<view>
		
		<view class="dblist-box">
			<block v-for="(item, index) in modelDatas" :index="index" :key="index">
					
				<SwiperImageCard class="dblist-box-item" :itemData="item" :index="index"></SwiperImageCard>
					
			</block>
		</view>
		
	</view>
</template>

<script>
	export default {
		name:"DoubleImageList",
		
		props:["modelDatas"],
		
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss">
	
.dblist-box {
	display: flex;
	flex-wrap: wrap;
	width: 100%;
}	

.dblist-box-item {
	width: 50%;
}

</style>