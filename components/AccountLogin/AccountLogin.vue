<template>
	<view class="container">
		<uni-card :title="titleText">
			<form @submit="formSubmit" @reset="formReset">
				<view>
					<view class="uni-forms-item margin-top-min">
						<input id="userAccount" focus="true" type="text" :placeholder="accountLabelText"/>
					</view>
					
					<view class="space-gray-line margin-top-min"></view>
					
					<view class="uni-forms-item margin-top-min">
						<input id="userPswd" type="text" password="true" :placeholder="pswdLabelText"/>
					</view>
					
				</view>
				
			</form>
			
		</uni-card>
	</view>
</template>

<script>
	export default {
		name:"AccountLogin",
		data() {
			return {
				titleText: '账号登录',
				accountLabelText: '请输入账号',
				pswdLabelText: '请输入密码'
			};
		},
		methods: {
			formSubmit: function(e) {
				console.log('form发生了submit事件，携带数据为：' + JSON.stringify(e.detail.value))
				var formdata = e.detail.value
				uni.showModal({
					content: '表单数据内容：' + JSON.stringify(formdata),
					showCancel: false
				});
			},
			formReset: function(e) {
				console.log('清空数据')
			}
		}


	}
</script>

<style>
	
	.margin-top-min {
		margin-top: 15upx;
	}
	
	// 灰色分隔线
	.space-gray-line {
		width: 90%;
		height: 1upx;
		background-color: #d9d9d9;
	}

</style>