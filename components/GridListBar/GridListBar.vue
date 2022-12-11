<!-- 自定义宫格组件栏 -->

<template>
	<view>
		<view class="grid-box">
			<block v-for="(item, index) in modelDatas" :index="index" :key="index">
				<view class="grid-box-item" :key="index" @tap="gridListItemTap(index)">
					<view class="grid-box-img-item">
						<image mode="aspectFill" :src="item.icon"
							style="width: 32px; height: 32px; padding-top: 9px;"
						>
						</image>
					</view>
					<view class="grid-box-text-item">{{item.title}}</view>
				</view>
			</block>
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
		},
		methods: {
			
			gridListItemTap: function(index) {
				console.log("GridListBar.vue gridListItemTap params, itemName:" + index);
				this.$emit('gridListItemTap', index);
			}
			
		},
		mounted() {
			
		}
	}
</script>

<style lang="scss">

.grid-box {
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	background-color: white;
	width: 100%;
}	

.grid-box-item {
	margin: 0;
	border-radius: 0;
	width: 25%;
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