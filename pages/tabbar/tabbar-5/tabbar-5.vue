<template>
	<view class="content">
		<view v-show="loginState == 0">
			页面 - not login
		</view>
		
		<view v-show="loginState == 1">
			页面 - logined
		</view>
		
	</view>
</template>

<script>
	
	// 网络请求
	import request from '../../../utils/net/request.js'
	
	export default {
		data() {
			return {
				loginState: this.$global_login_state,
				title: 'Hello'
			}
		},
		onLoad() {
			
			let That = this;
			
			// 初始化数据
			That.onInitData();
			// 登录
			//http.cloudAuth((code, res) => {
			//	console.log("tabbar-5.vue cloudAuth code:" + code + ", res:" + JSON.stringify(res));
			//});

		},
		methods: {
			onInitData() {
				console.log("tabbar-5.vue onInitData");

				let That = this;
				
				// 获取登录状态
				console.log("tabbar-5.vue login_state: " + That.$global_login_state);
				
				// 获取UUID
				request.getUuid({"len": 32, "radix": 16}, function(code, res){
					console.log("tabbar-5.vue onInitData getUuid params, code:" + code + ", res:" + JSON.stringify(res));
				});
				
			}
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
