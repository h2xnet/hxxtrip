<!-- 自定义话题列表组件栏 -->

<template>
	<view>
		<view class="grid-box">
			<block v-for="(item, index) in modelDatas" :index="index" :key="index">
				
				<view class="grid-box-space"></view>
				
				<view class="grid-box-item" :index="index" @tap="onTopicListItemTap(index)">
					
					<TextButton :labelText="item.title"></TextButton>
					
				</view>
				
			</block>
		</view>
		
	</view>
</template>

<script>
	export default {
		name:"TopicListBar",
		props: ["modelDatas"],
		
		data() {
			return {
				
			};
		},
		
		methods: {
			
			onTopicListItemTap(index) {
				console.log("TopicListBar.vue onTopicListItemTap params, index:" + index);
				
				this.$emit("topicListItemTap", index);
				
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
	height: 30px;
	display: flex;
	flex-direction: column;
}

.grid-box-space {
	width: 10px;
	background-color: transparent;
}
	

</style>