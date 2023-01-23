import App from './App.vue'

// #ifndef VUE3
import Vue from 'vue'
Vue.config.productionTip = false
App.mpType = 'app'

//
// 缓存
//
import storage from '@/utils/cache/storage.js';
Vue.prototype.$storage = storage;  

//
// 全局变量
//
Vue.prototype.$global_login_state = 0 // 登录状态

// 初始化用户信息
let cacheUserInfo = storage.getUserInfo();
console.log("main.js cacheUserInfo:" + JSON.stringify(cacheUserInfo));
if (cacheUserInfo != null) {
	Vue.prototype.$global_login_state = 1;
	console.log("main.js set Vue.prototype.$global_login_state=1");
}
else {
	Vue.prototype.$global_login_state = 0;
	console.log("main.js set Vue.prototype.$global_login_state=0");
}

const app = new Vue({
	...App
})
app.$mount()
// #endif

// #ifdef VUE3
import {
	createSSRApp
} from 'vue'
export function createApp() {
	const app = createSSRApp(App)
	return {
		app
	}
}
// #endif
