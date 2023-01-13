<template>
	<view class="container">
		
		<view class="center-wrap">
			<view class="center-container-wrap" style="width: 95%;">
				<view v-if="loginMethod == 0">
					<view class="line-box">
						<view class="text-align-center">13560440305</view>
					</view>
					<view class="line-box" style="padding: 0;">
						<button type="primary">手机号一键登录</button>
					</view>
				</view>	
				<view v-else-if="loginMethod == 1">
					<view class="line-box" style="padding: 0;">
						<button type="primary">微信登录</button>
					</view>
				</view>
				<view v-else-if="loginMethod == 2">
					<view class="line-box">
						QQ登录
					</view>
				</view>
				<view v-else-if="loginMethod == 3">
					<view class="line-box" style="padding: 0;">
						<AccountLogin>
							
						</AccountLogin>
					</view>
				</view>
				
			</view>
		</view>
		
		<view class="fixed-bottom" style="padding-bottom: 50upx;">
			<view class="line-box">
				<view class="line-box-item" style="margin-left: 30upx;" @click="onSetLoginMethod(0);">
					<view class="font-size-max"><uni-icons type="phone" size="32" color="gray"></uni-icons></view>
					<view class="font-size-max" style="padding-left: 8upx;">手机</view>
				</view>
				<view class="line-box-item" style="margin-left: 50upx;" @click="onSetLoginMethod(1);">
					<view class="font-size-max"><uni-icons type="weixin" size="32" color="green"></uni-icons></view>
					<view class="font-size-max" style="padding-left: 8upx;">微信</view>
				</view>
				<!--<view class="line-box-item" style="margin-left: 50upx;" @click="onSetLoginMethod(2);">
					<view class="font-size-max"><uni-icons type="qq" size="32" color="skyblue"></uni-icons></view>
					<view class="font-size-max" style="padding-left: 10upx;">QQ</view>
				</view>-->
				<view class="line-box-item" style="margin-left: 50upx;" @click="onSetLoginMethod(3);">
					<view class="font-size-max"><uni-icons type="person" size="32" color="gray"></uni-icons></view>
					<view class="font-size-max" style="padding-left: 8upx;">账号</view>
				</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				loginMethod: 0
			}
		},
		methods: {
			
			onSetLoginMethod(method) {
				console.log("tabbar-5-detail-login.vue onSetLoginMethod params, method:" + method);
				let That = this
				
				That.loginMethod = method;
			}
		}
	}
</script>

<style>
	
	.container {
		width: 100%;
		height: calc(100vh - 50upx);
		background-color: white;
	}
	
	

</style>
