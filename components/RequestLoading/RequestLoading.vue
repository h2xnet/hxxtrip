<!-- 加载动画组件 -->

<template>
	<view class="request-loading-view" v-show="loading > 0 ? true : false">
	    <view class="loading-view"><view class="loading"></view></view>
	</view>
</template>

<script>
	export default {
		name:"RequestLoading",
		props: {
			loading: {
				type: Number,
				default: 0
			}
		},
		data() {
			return {
				
			};
		}
	}
</script>

<style>
	
.request-loading-view {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 198903060;
  background-color: rgba(0, 0, 0, 0.001);
  display: flex;
  justify-content: center;
  align-items: center;
}

.loading-view {
  width: 160upx;
  height: 160upx;
  background-color: rgba(0, 0, 0, 0.6);
  border-radius: 20upx;
  display: flex;
  justify-content: center;
  align-items: center;
}

/* 动画样式 */
.loading {
  border: 10upx solid rgba(0, 0, 0, 0.01);
  border-radius: 50%;
  border-top: 10upx solid #fff;
  border-right: 10upx solid #fff;
  border-bottom: 10upx solid #fff;
  width: 60upx;
  height: 60upx;
  -webkit-animation: spin 1.4s linear infinite;
  animation: spin 1.4s linear infinite;
}

@-webkit-keyframes spin {
  0% {
    -webkit-transform: rotate(0deg);
  }

  100% {
    -webkit-transform: rotate(360deg);
  }
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}

</style>