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
				<radio-group @change="onRadioChange">
					<label class="line-box-start font-size-mid margin-top-max" v-for="(item, index) in sexs" :key="item.value">
						<view>
							<radio :value="item.value" :checked="index == selIndex"></radio>
						</view>
						<view>
							<text class="font-size-max margin-left-min">{{item.text}}</text>
						</view>
					</label>
				</radio-group>
			</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		name:"SexRadioBar",
		props: {
			titleText: {
				type: String,
				default: ""
			}
		},
		
		data() {
			return {
				selIndex: 0,
				selValue: 1,
				sexs: [
					{"value": 1, "text": "男"},
					{"value": 2, "text": "女"},
					{"value": 3, "text": "保密"}
				]
			};
		},
		
		methods: {
			onCancelClick() {
				console.log("SexRadioBar.vue onCancelClick.");
				let That = this;
				That.$emit("sexRadioBarClick", "cancel", That.selValue);
			},
			
			onSaveClick() {
				console.log("SexRadioBar.vue onSaveClick.");
				let That = this;
				That.$emit("sexRadioBarClick", "save", That.selValue);
			},
			
			onRadioChange(e) {
				let That = this;
				
				let val = e.detail.value;
				for(let idx = 0; idx < That.sexs.length; idx++) {
					let itemData = That.sexs[idx];
					if (val == itemData["value"]) {
						That.selIndex = idx;
						That.selValue = val;
						console.log("SexRadioBar.vue onRadioChange index:" + idx + ", value:" + val);
						break;
					}
				}
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

.line-box-start {
	margin: 0;
	padding: 0;
	display: flex;
	flex-direction: row;
	justify-content: flex-start;
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