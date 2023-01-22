import App from './App.vue'

// #ifndef VUE3
import Vue from 'vue'
Vue.config.productionTip = false
App.mpType = 'app'

//
// 全局变量
//
Vue.prototype.$global_login_state = 0 // 登录状态

//
// 缓存
//
import storage from '@/utils/cache/storage.js';
Vue.prototype.$storage = storage;  

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
