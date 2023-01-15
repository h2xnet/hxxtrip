<script>
	
	import uniIdPageInit from '@/uni_modules/uni-id-pages/init.js';
	
export default {
	
	
	onLaunch: function() {
		console.log('App Launch');
		
		uniIdPageInit();

		// 状态栏高度
		uni.getSystemInfo({
			success: (res) => {
				console.log("App.vue statusBarHeight: " + res.statusBarHeight)
			}
		})
		/*setTimeout(() => {
			// 初始化标记
			uni.setTabBarBadge({
				index: 1,
				text: '31'
			});
			uni.showTabBarRedDot({
				index: 3
			});
		}, 1000);*/
	},
	onShow: function() {
		console.log('App Show');
	},
	onHide: function() {
		console.log('App Hide');
	}
};
</script>

<style lang="scss">
		
/*每个页面公共css */ 
/* 不显示滚动条 */
::-webkit-scrollbar {
	display: none;
	width: 0 !important;
	height: 0 !important;
	-webkit-appearance: none;
	background: transparent;
}


</style>
