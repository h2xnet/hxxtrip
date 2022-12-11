<!-- 文本按钮组件 -->
<template>
	<view class="container">
		<view class="item-lable" @tap="textButtonTap()"> {{labelText}} </view>
	</view>
</template>

<script>
	export default {
		name:"TextButton",
		props: {
			labelText: {
				type: String,
				default: "确定"
			}
		},
		data() {
			return {
				
			};
		},
		methods: {
			
			textButtonTap() {
				console.log("TextButton.vue textButtonTap");
				
				this.$emit("textButtonTap");
			}
		},
		mounted() {
			
		}
	}
</script>

<style>
	
.container {
	background-color: bisque;
	border-radius: 10px;
}

.item-lable {
	margin-left: 5px;
	margin-right: 5px;
}

</style>