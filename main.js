import App from './App.vue'

// #ifndef VUE3
import Vue from 'vue'
Vue.config.productionTip = false
App.mpType = 'app'

// 引入云开发库
import cloudbase from '@cloudbase/js-sdk'
import adapter from 'utils/adapter/adapter.js'

cloudbase.useAdapters(adapter);
cloudbase.init({
	env: 'h2xtrip-8053fe',//云开发环境ID
	appSign: 'hxxtrip-uniapp',//凭证描述
	appSecret: {
		appAccessKeyId: 1,//凭证版本
		appAccessKey: '252df4073552835088391f3cff78135e'//凭证
	}
});

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
