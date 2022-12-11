'use strict';

/*
 * Router: 统一路由云函数
 * Author: zfs
 * Date: 2022-12-03 15:57
 */

const Router = require("uni-cloud-router").Router; // 引入 Router
const router = new Router(require("./routerConfig.js")); // 根据配置创建路由对象

exports.main = async (event, context) => {
	//event为客户端上传的参数
	console.log('event : ', event)
	
	//返回数据给客户端
	//return event
	
	// 由路由接管
	return router.serve(event, context);
};
