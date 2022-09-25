<!-- 自定义宫格组件栏 -->

<template>
	<view>
		<view class="grid-box">
			<view v-for="(item, index) in modelDatas" :index="index" :key="index">
				<view class="grid-box-item">
					<view class="grid-box-img-item">
						<image mode="aspectFill" :src="item.icon"
							style="width: 32px; height: 32px; padding-top: 9px;"
						>
						</image>
					</view>
					<view class="grid-box-text-item">{{item.title}}</view>
				</view>
			</view>
		</view>

	</view>
</template>

<script>
	
	export default {
		
		name:"GridListBar",
		
		props: ["modelDatas"],
		
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss">

.grid-box {
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	background-color: white;
}	

.grid-box-item {
	margin: 0;
	border-radius: 0;
	width: 80px;
	height: 80px;
	display: flex;
	flex-direction: column;
}

.grid-box-img-item {
	width: 100%;
	height: 50px;
}
.grid-box-text-item {
	width: 100%;
	height: 30px;
	text-align: center;
}
	

</style>