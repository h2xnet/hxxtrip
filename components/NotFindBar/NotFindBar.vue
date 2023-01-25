<template>
	<view class="container">
		<view class="head-wrap">
			<view class="line-box font-size-max">
				<view @tap="onCancelClick">返回</view>
				<view v-if="titleText != ''">{{titleText}}</view>
				<!--<view class="color-red" @tap="onSaveClick">保存</view>-->
			</view>
		</view>
		
		<view class="body-wrap">
			<view class="image-wrap margin-top-max">
				<image mode="aspectFit" src="../../static/not_find.png"></image>
			</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		name:"NotFindBar",
		
		props: {
			titleText: {
				type: String,
				default: ""
			}
		},
		
		data() {
			return {
				
			};
		},
		
		methods: {
			
			onCancelClick() {
				console.log("NotFindBar.vue onCancelClick.");
				let That = this;
				That.$emit("notFindBarClick", "cancel");
			}
			
		}
	}
</script>

<style>
	
.container {
	width: 100%;
}	

.head-wrap {
	margin-left: 30upx;
	margin-right: 30upx;
}

.body-wrap {
	margin-left: 30upx;
	margin-right: 30upx;
}

.image-wrap {
	display: flex;
	flex-direction: column;
	justify-content: center;
}

.line-box {
	margin: 0;
	padding: 0;
	height: 60upx;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
}

.color-red {
	color: red;
}

.color-gray {
	color: gray;
}

.label-text {
	font-size: 32upx;
	padding-left: 15upx;
	padding-right: 15upx;
}

.font-size-max {
	font-size: 32upx;
}

.font-size-mid {
	font-size: 30upx;
}

.font-size-min {
	font-size: 26upx;
}

.margin-top-min {
	margin-top: 10upx;
}

.margin-top-mid {
	margin-top: 15upx;
}

.margin-top-max {
	margin-top: 20upx;
}	

</style>