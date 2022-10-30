<template>
	<view class="content">
		页面 - 5 - isLoginSuccess: {{isLoginSuccess}}
	</view>
</template>

<script>
	import http from '../../../utils/net/http.js'
	
	export default {
		data() {
			return {
				isLoginSuccess: false,
				title: 'Hello'
			}
		},
		onLoad() {
			// 登录
			http.cloudAuth((code, res) => {
				console.log("tabbar-5.vue cloudAuth code:" + code + ", res:" + JSON.stringify(res));
			});

		},
		methods: {

		}
	}
</script>

<style>
	.content {
		text-align: center;
		height: 400upx;
		margin-top: 200upx;
	}
</style>
