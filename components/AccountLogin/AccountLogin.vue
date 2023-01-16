<template>
	<view class="container">
		<uni-card>
			<form @submit="formSubmit">
				<view>
					<view class="hxx-title">
						<uni-icons type="auth" size="24"></uni-icons>
						<text class="padding-left-min">{{titleText}}</text>
					</view>
					
					<view class="space-gray-line margin-top-min"></view>
					
					<view class="uni-forms-item margin-top-min">
						<input id="userAccount" name="userAccount" focus="true" type="text" :placeholder="accountLabelText"/>
					</view>
					
					<view class="space-gray-line margin-top-min"></view>
					
					<view class="uni-forms-item margin-top-min">
						<input id="userPswd" name="userPswd" type="text" password="true" :placeholder="pswdLabelText"/>
					</view>
					
					<block v-if="errorMsg != ''">
						<!-- 错误信息 -->
						<view class="space-gray-line margin-top-min"></view>
						<view class="uni-forms-item margin-top-min">
							<text class="text-color-red">{{errorMsg}}</text>
						</view>
					</block>
					
					<view class="space-gray-line margin-top-min"></view>
					
					<view v-if="loadingState=='false'" class="uni-forms-item margin-top-min">
						<button type="primary" form-type="submit" >
							<text>登录/注册</text>
						</button>
					</view>
					<view v-else class="uni-forms-item margin-top-min">
						<button type="primary" loading="true" disabled="true">
							<text>登录/注册</text>
						</button>
					</view>
					
				</view>
				
			</form>
			
		</uni-card>
	</view>
</template>

<script>
	export default {
		name:"AccountLogin",
		
		props: {
			titleText: {
				type: String,
				default: "账号登录"
			}
		},
		
		data() {
			return {
				accountLabelText: "请输入账号",
				pswdLabelText: "请输入密码",
				loadingState: "false",
				errorMsg: ""
				
			};
		},
		methods: {
			//
			// formSubmit : 表单数据提交
			//
			formSubmit: function(e) {
				console.log('AccountLogin.vuew formSubmit params, e:' + JSON.stringify(e.detail.value))
				let That = this;
				
				var formData = e.detail.value
				
				That.setErrorMsg("");
				if (formData["userAccount"] == "") {
					That.setErrorMsg("账号不能为空")
					return;
				}
				if (formData["userPswd"] == "") {
					That.setErrorMsg("密码不能为空")
					return;
				}
				
				That.$emit("accountLoginSubmit", formData);
				
				/*uni.showModal({
					content: '表单数据内容：' + JSON.stringify(formData),
					showCancel: false
				});*/
			},
			
			//
			// setLoadingState : 设置加载状态
			//
			setLoadingState: function(state) {
				console.log("AccountLogin.vuew setLoadingState params, satte:" + state);
				let That = this;
				
				That.loadingState = state;
			},
			
			//
			// setErrorMsg : 设置错误信息
			//
			setErrorMsg: function(msg) {
				let That = this;
				
				That.errorMsg = msg;
			}
			
		}


	}
</script>

<style>
	
	.margin-top-min {
		margin-top: 15upx;
	}
	
	.padding-left-min {
		padding-left: 15upx;
	}
	
	// 灰色分隔线
	.space-gray-line {
		width: 100%;
		height: 1upx;
		background-color: #d9d9d9;
	}
	
	.hxx-title {
		margin: 0;
		padding: 0;
		font-size: 34upx;
		color: #333;
	}
	
	.text-color-red {
		color: red;
	}
	

</style>