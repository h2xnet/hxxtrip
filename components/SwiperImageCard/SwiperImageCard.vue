<!-- 轮播组件 -->

<template>
	
	<view class="card-wrap">
		<view class="card-frame">
			<!-- image area -->
			<view class="card-frame-row">
				<block v-if="itemData.type == 'image'">
					
					<swiper
						style="width: 100%;"
					>
						<swiper-item v-for="imgItem, index in itemData.coverImgs" :key="index">
							<view>
								{{imgItem.img}}
								<image 
									mode="aspectFill"
									src="imgItem.img" 
									style="width: 100%;">
								</image>
							</view>
						</swiper-item>
						
					</swiper>
				</block>
				<block v-else>
					
				</block>
				
			</view>
			
			<!-- title area -->
			<view class="card-frame-row">{{itemData.title}}</view>
			
			<!-- extra area -->
			<view class="card-frame-row">
				<view>{{itemData.originalPrice}}</view>
				<view>{{itemData.favourPrice}}</view>
				<view>{{itemData.tip}}</view>
			</view>
			
		</view>
		
	</view>
	
</template>

<script>
	
	export default {
		name:"SwiperImageCard",
		
		props: ["itemData"],
		
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss">
	
.card-wrap {
	margin: 0;
	width: 100%;
	height: 100%;
	background-color: transparent;
	border-radius: 0;
}	

.card-frame {
	margin: 10rpx 10rpx 10rpx 10rpx;
	background-color: white;
	border-radius: 10rpx;
	display: flex;
	flex-direction: column;
	justify-items: start;
}

.card-frame-row {
	display: flex;
	flex-direction: row;
	justify-content: space-between;
}

</style>