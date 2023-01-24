<template>
	<view class="container">
		<view class="head-wrap">
			<view class="line-box font-size-max">
				<view @tap="onCancelClick">取消</view>
				<view v-if="titleText != ''">{{titleText}}</view>
				<view class="color-red" @tap="onSaveClick">保存</view>
			</view>
		</view>
		
		<view class="body-wrap">
			<view>
				<view class="line-height-min margin-top-max">
					<text class="font-size-mid">{{labelText1}}</text>
				</view>
				<view class="line-height-min margin-top-min line-box" style="height: 240upx;">
					<textarea class="font-size-mid" focus="true" :maxlength="inputMaxLength"
						:placeholder="inputPlaceholderText" :value="inputTextDef" @input="onInputText">
						
					</textarea>
					
				</view>
				<view class="line-height-min margin-top-max">
					<view style="float: right; margin-right: 30upx;">
						<text class="font-size-mid color-gray">{{inputTextValueLength}} / {{inputMaxLength}}</text>
					</view>
				</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		name:"InputTextAreaBar",
		props: {
			titleText: {
				type: String,
				default: ""
			},
			labelText1: {
				type: String,
				default: ""
			},
			inputTextDef: {
				type: String,
				default: ""
			},
			inputMaxLength: {
				type: Number,
				default: 30
			},
			inputPlaceholderText: {
				type: String,
				default: "请输入..."
			}
		},
		data() {
			return {
				inputTextValue: '',
				inputTextValueLength: 0
			};
		},
		
		methods: {
			onCancelClick() {
				console.log("InputTextBar.vue onCancelClick.");
				let That = this;
				That.$emit("inputTextAreaBarClick", "cancel", That.inputTextValue);
			},
			
			onSaveClick() {
				console.log("InputTextBar.vue onSaveClick.");
				let That = this;
				That.$emit("inputTextAreaBarClick", "save", That.inputTextValue);
			},
			
			onInputText(e) {
				//console.log("InputTextBar.vue onInputText param: " + JSON.stringify(e));
				
				let That = this;
				
				let value = e.detail.value;
				That.inputTextValue = value;
				That.inputTextValueLength = value.length;
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

.line-box {
	margin: 0;
	padding: 0;
	height: 60upx;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
}

.line-height-min {
	height: 60upx;
}

.line-height-mid {
	height: 80upx;
}

.line-height-max {
	height: 120upx;
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