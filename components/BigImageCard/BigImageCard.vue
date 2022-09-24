<template>
	<view class="card-frame">
		<uni-card 
			mode="basic" 
			:isFull="true" 
			:title="itemData.title" 
			:extra="itemData.extTitle" 
			:thumbnail="itemData.headImg"
		>
			<view style="height: 350rpx; width: 100;">
				<image style="height: 100%;" mode="aspectFill" :src="itemData.coverImg"></image>
			</view>
			
			<view class="content-box">
				<view class="content-text-box"><text class="content-text">{{itemData.content}}</text></view>
				<view class="content-ext"><text>查看全文</text></view>
			</view>
			
			<view slot="actions" class="card-actions no-border">
				<view class="card-actions-item" @click="actionsClick('分享')">
					<uni-icons type="redo" size="18" color="#999"></uni-icons>
					<text class="card-actions-item-text">分享</text>
				</view>
				<view class="card-actions-item" @click="actionsClick('点赞')">
					<uni-icons type="heart" size="18" color="#999"></uni-icons>
					<text class="card-actions-item-text">点赞</text>
				</view>
				<view class="card-actions-item" @click="actionsClick('评论')">
					<uni-icons type="chatbubble" size="18" color="#999"></uni-icons>
					<text class="card-actions-item-text">评论</text>
				</view>
			</view>
		
		</uni-card>
		
	</view>
</template>

<script>
	
	import uniCard from '@dcloudio/uni-ui/lib/uni-card/uni-card.vue'
	import uniIcons from '@dcloudio/uni-ui/lib/uni-icons/uni-icons.vue'
		
	export default {
		components: {uniCard, uniIcons},
		
		name:"BigImageCard",
		
		props: ["itemData"],
		
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss">
	
	.card-frame {
		border-radius: 0;
	}
	
	.content-box {
		margin-top: 5px;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		width: 100%;
	}
	
	.content-text-box {
		display: flex;
		justify-content: flex-start;
		width: 180px;
	}
	
	.content-text {
		font-size: 14px;
		//超出隐藏
		overflow-x: hidden;
		//溢出显示
		text-overflow: ellipsis;
		//文本一行不换行直到遇到换行符
		white-space: nowrap;
	}
	
	.content-ext {
		font-size: 14px;
		font-weight: bold;
		width: 60px;
	}
	
	.card-actions {
		height: 30px;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}
	
	.card-actions-item-text {
		font-size: 12px;
		color: #666;
	}

</style>