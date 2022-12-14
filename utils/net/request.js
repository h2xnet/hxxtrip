/*
 * ClassName: request
 * Desc: 请求封装类
 * Author: zfs
 * Date: 2022-12-03 20:25
 */

import uniCloudHttp from './uniCloudHttp.js'

//
// getUuid : 获取UUID
//
const getUuid = (param, callfunc) => {
	return uniCloudHttp.cloudCallFunc("global", {"action": "tools/getUuid", "data":param}, callfunc);
}

//
// categoryRootRequest : 请求根类别列表
//
const categoryRootRequest = (param, callfunc) => {
	return uniCloudHttp.cloudCallFunc("categoryRoot", param, callfunc);
}

//
// categoryTwoRequest : 请求二级子类别列表
//
const categoryTwoRequest = (param, callfunc) => {
	return uniCloudHttp.cloudCallFunc("categoryTwo", param, callfunc);
}

//
// routerRequest : 路由请求
//
const routerRequest = (param, callfunc) => {
	return uniCloudHttp.cloudCallFunc("router", param, callfunc);
}

//
// getCategory : 请求类别列表
//
const getCategory = (param, callfunc) => {
	return uniCloudHttp.cloudCallFunc("router", {"action": "category/index", "data":param}, callfunc);
}

//
// getCategoryHumainAstro : 请求人文星座类别
//
const getCategoryHumainAstro = (param, callfunc) => {
	return uniCloudHttp.cloudCallFunc("router", {"action": "humain/astrol/astrolCategory", "data": param}, callfunc);
}

export default {
	getUuid,
	categoryRootRequest,
	categoryTwoRequest,
	routerRequest,
	getCategory,
	getCategoryHumainAstro
}