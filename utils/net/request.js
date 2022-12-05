/*
 * ClassName: request
 * Desc: 请求封装类
 * Author: zfs
 * Date: 2022-12-03 20:25
 */

import uniCloudHttp from './uniCloudHttp.js'

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

export default {
	categoryRootRequest,
	categoryTwoRequest,
	routerRequest,
	getCategory
}