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
				<view class="line-box line-height-min font-size-mid margin-top-max">
					<view>
						<text>生日信息</text> 
					</view>
					<view>
						<picker mode="date" :start="startDate" :end="endDate" @change="onDateChange">
							<view v-if="birthday2 == '' ">{{birthday}}</view>
							<view v-else>{{birthday2}}</view>
						</picker>
					</view>
				</view>
				<view class="line-box line-height-min font-size-mid margin-top-min">
					<view><text>星座</text></view>
					
					<view v-if="astrol2 == ''"><text>{{astrol}}</text></view>
					<view v-else><text>{{astrol2}}</text></view>
				</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		name:"BirthdayBar",
		props: {
			titleText: {
				type: String,
				default: ""
			},
			startDate: {
				type: String,
				default: ""
			},
			endDate: {
				type: String,
				default: ""
			},
			birthday: {
				type: String,
				default: ""
			},
			astrol: {
				type: String,
				default: ""
			}
			
		},
		data() {
			return {
				birthday2: '',
				astrol2: ''
			};
		},
		
		methods: {
			
			onCancelClick() {
				console.log("BirthdayBar.vue onCancelClick.");
				let That = this;
				That.$emit("birthdayBarClick", "cancel", That.birthday2, That.astrol2);
			},
			
			onSaveClick() {
				console.log("BirthdayBar.vue onSaveClick.");
				let That = this;
				That.$emit("birthdayBarClick", "save", That.birthday2, That.astrol2);
			},
			
			onDateChange(e) {
				console.log("BirthdayBar.vue onDateChange value: " + e.detail.value );
				
				let That = this;
				
				let value = e.detail.value;
				That.birthday2 = value;
				// 更新星座信息
				That.astrol2 = That.onGetAstrol(That.birthday2);
			},
			
			onGetAstrol(date) {
				let astrols = ["白羊座","金牛座","双子座","巨蟹座","狮子座","处女座","天秤座","天蝎座","射手座","摩羯座","水瓶座","双鱼座"];
				let arr = date.split("-");
				if (arr.length == 3) {
					let year = parseInt(arr[0]);
					let month = parseInt(arr[1]);
					let day = parseInt(arr[2]);
					
					//白羊座：3.21-4.19
					//金牛座：4.20-5.20
					//双子座：5.21-6.21
					//巨蟹座：6.22-7.22
					//狮子座：7.23-8.22
					//处女座：8.23-9.22
					//天秤座：9.23-10.23
					//天蝎座：10.24-11.22
					//射手座：11.23-12.21
					//摩羯座：12.22-1.19
					//水瓶座：1.20-2.18
					//双鱼座：2.19-3.20
					if ((month == 3 && day >= 21) || (month == 4 && day <= 19)) {
						// 白羊座
						return astrols[0];
					}
					else if ((month == 4 && day >= 20) || (month == 5 && day <= 20)) {
						// 金牛座
						return astrols[1];
					}
					else if ((month == 5 && day >= 21) || (month == 6 && day <= 21)) {
						// 双子座
						return astrols[2];
					}
					else if ((month == 6 && day >= 22) || (month == 7 && day <= 22)) {
						// 巨蟹座
						return astrols[3];
					}
					else if ((month == 7 && day >= 23) || (month == 8 && day <= 22)) {
						// 狮子座
						return astrols[4];
					}
					else if ((month == 8 && day >= 23) || (month == 9 && day <= 22)) {
						// 处女座
						return astrols[5];
					}
					else if ((month == 9 && day >= 23) || (month == 10 && day <= 23)) {
						// 天秤座
						return astrols[6];
					}
					else if ((month == 10 && day >= 24) || (month == 11 && day <= 22)) {
						// 天蝎座
						return astrols[7];
					}
					else if ((month == 11 && day >= 23) || (month == 12 && day <= 21)) {
						// 射手座
						return astrols[8];
					}
					else if ((month == 12 && day >= 22) || (month == 1 && day <= 19)) {
						// 摩羯座
						return astrols[9];
					}
					else if ((month == 1 && day >= 20) || (month == 2 && day <= 18)) {
						// 水瓶座
						return astrols[10];
					}
					else if ((month == 2 && day >= 19) || (month == 3 && day <= 20)) {
						// 双鱼座
						return astrols[11];
					}
				}
				return '';
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