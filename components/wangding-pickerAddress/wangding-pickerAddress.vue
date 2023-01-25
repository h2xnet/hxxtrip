<template>
	<view class="container">
		<view class="head-wrap">
			<view class="line-box font-size-max">
				<view @tap="onCancelClick">取消</view>
				<view v-if="titleText != ''">{{titleText}}</view>
				<view class="color-red" @tap="onSaveClick">保存</view>
			</view>
		</view>
		
		<view class="body-wrap font-size-mid margin-top-max">
			<picker @change="bindPickerChange" @columnchange="columnchange" :range="array" range-key="name" :value="value" mode="multiSelector">
				<slot></slot>
			</picker>
		</view>
	</view>
</template>

<script>
	import AllAddress from './data.js'
	let selectVal = ['','','']
	
	export default {
		props: {
			titleText: {
				type: String,
				default: ""
			}
		},
		data() {
			return{
				value: [0,0,0],
				array: [],
				index: 0
			}
		},
		created() {
			this.initSelect()
		},
		methods:{
			// 初始化地址选项
			initSelect() {
				this.updateSourceDate() // 更新源数据
				.updateAddressDate() // 更新结果数据
				.$forceUpdate()  // 触发双向绑定
			},
			// 地址控件改变控件
			columnchange(d) {
				this.updateSelectIndex(d.detail.column, d.detail.value) // 更新选择索引
				.updateSourceDate() // 更新源数据
				.updateAddressDate() // 更新结果数据
				.$forceUpdate()  // 触发双向绑定
			},
			
			/**
			 * 更新源数据
			 * */
			updateSourceDate() {
				this.array = []
				this.array[0] = AllAddress.map(obj => {
					return {
						name: obj.provinceName
					}
				})
				this.array[1] = AllAddress[this.value[0]].city.map(obj => {
					return {
						name: obj.cityName
					}
				})
				this.array[2] = AllAddress[this.value[0]].city[this.value[1]].county.map(obj => { 
					return {
						name: obj.countyName
					}
				})
				return this
			},
			
			/**
			 * 更新索引
			 * */
			updateSelectIndex(column, value){
				let arr = JSON.parse(JSON.stringify(this.value)) 
				arr[column] = value
				if(column === 0 ) {
					arr[1] = 0
					arr[2] = 0
				}
				if(column === 1 ) {
					arr[2] = 0
				}
				this.value = arr
				return this
			},
			
			/**
			 * 更新结果数据 
			 * */
			updateAddressDate() {
				selectVal[0] = this.array[0][this.value[0]].name
				selectVal[1] = this.array[1][this.value[1]].name 
				selectVal[2] = this.array[2][this.value[2]].name 
				return this
			},
			
			/**
			 * 点击确定
			 * */
			bindPickerChange(e) {
				this.$emit('wangdingPickerAddressChange', {
					index: this.value,
					data: selectVal
				})
				return this
			},
			
			onCancelClick() {
				console.log("wangding-pickerAddress.vue onCancelClick.");
				let That = this;
				That.$emit("wangdingPickerAddressClick", "cancel", selectVal.join(" "));
			},
			
			onSaveClick() {
				console.log("wangding-pickerAddress.vue onSaveClick.");
				let That = this;
				That.$emit("wangdingPickerAddressClick", "save", selectVal.join(" "));
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
