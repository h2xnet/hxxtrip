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

export default {
	categoryRootRequest
}