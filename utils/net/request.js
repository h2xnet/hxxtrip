/*
 * ClassName: request
 * Desc: 请求封装类
 * Author: zfs
 * Date: 2022-12-03 20:25
 */

import uniCloudHttp from './uniCloudHttp.js'

import {error_code_ok,error_code_fail} from './errorCode.js'

//
// getUuid : 获取UUID
//
const getUuid = (param, callfunc) => {
	return uniCloudHttp.cloudCallFunc("global", {"action": "tools/getUuid", "data": param}, callfunc);
}

const getOpenId = (param, callfunc) => {
	return uniCloudHttp.cloudCallFunc("global", {"action": "tools/getOpenId", "data": param}, callfunc);
}

//
// getPhoneNumber : 获取手机号
//
const getPhoneNumber = (param, callfunc) => {
	return uniCloudHttp.cloudCallFunc("global", {"action": "user/user/getPhoneNumber", "data": param}, callfunc);
}

//
// 账号登录/注册
//
const getAccountLoginRegist = (param, callfunc) => {
	return uniCloudHttp.cloudCallFunc("global", {"action": "user/user/accountLoginRegist", "data": param}, callfunc);
}

//
// getUserAttrUpdate : 更新用户属性
//
const getUserAttrUpdate = (token, param, callfunc) => {
	let postParam = {};
	postParam["token"] = token;
	postParam["param"] = param;
	return uniCloudHttp.cloudCallFunc("global", {"action": "user/user/userAttrUpdate", "data": postParam}, callfunc);
}

//
// uniGotoPage : 页面跳转
//
const uniGotoPage = (url, param, callfunc) => {
	uni.navigateTo({
		url: url,
		success(res) {
			console.log("request.js uniGotoPage success, res:" + JSON.stringify(res));
			if (callfunc) {
				callfunc(0, res, param);
			}
		},
		fail(err) {
			console.log("request.js uniGotoPage fail, err:" + JSON.stringify(err));
			if (callfunc) {
				callfunc(err, null, param);
			}
		}
	});
}

//
// uniLogin : uni客户端登录，换取code
//
const uniLogin = (provider, callfunc) => {
	uni.login({
		provider: provider,
		success(res) {
			console.log("request.js uniLogin success, provider:" + provider + ", res:" + JSON.stringify(res));
			if (callfunc) {
				callfunc(error_code_ok, res);
			}
		},
		fail(err) {
			console.log("request.js uniLogin fail, provider:" + provider + ", err:" + JSON.stringify(err));
			if (callfunc) {
				callfunc(error_code_fail, err);
			}
		}
	})
}

//
// uniGetUserInfo : 获取用户信息
//
const uniGetUserInfo = (provider, callfunc) => {
	uni.getUserInfo({
		provider: provider,
		success(res) {
			console.log("request.js uniGetUserInfo success, res:" + JSON.stringify(res));
			if (callfunc) {
				callfunc(error_code_ok, res);
			}
		},
		fail(err) {
			console.log("request.js uniGetUserInfo fail, err:" + JSON.stringify(err));
			if (callfunc) {
				callfunc(error_code_fail, err);
			}
		}
	})
}

//
// uniGetUserProfile : 微信授权获取用户信息
//
const uniGetUserProfile = (callfunc) => {
	uni.getUserProfile({
		desc: "用户登录/注册",
		success(res) {
			console.log("request.js uniGetUserProfile success, res:" + JSON.stringify(res));
			if (callfunc) {
				callfunc(error_code_ok, res);
			}
		},
		fail(err) {
			console.log("request.js uniGetUserProfile fail, err:" + JSON.stringify(err));
			if (callfunc) {
				callfunc(error_code_fail, err);
			}
		}
	});
}

const uniShowModel = (title, content, cancenText = "取消", confirmText = "确定", 
showCancel = true, callfunc) => {
	uni.showModal({
		title: title,
		content: content,
		cancelText: cancenText,
		confirmText: confirmText,
		confirmColor: "#f55850",
		cancelColor: "#39B54A",
		showCancel: showCancel,
		success(res){
			console.log("request.js uniShowModel res: " + JSON.stringify(res));
			if (callfunc) {
				callfunc(res.confirm);
			}
			/*if (res.confirm) {
			}
			else {
			}*/
		}
	})
}

const uniShowToast = (title, icon, duration = 3000) => {
	if (icon == null || icon == "") {
		uni.showToast({
			title: title,
			duration: duration
		});
	}
	else {
		uni.showToast({
			title: title,
			icon: icon,
			duration: duration
		});
	}
}

//
// getWeixinOepnInfo : 获取微信开放信息，主要是openId和session_key
//
const getWeixinOepnInfo = (appId, secret, accessCode, callfunc) => {
	uni.request({
		url: "https://api.weixin.qq.com/sns/jscode2session",
		method: "GET",
		data: {
			appid: appId,
			secret: secret,
			js_code: accessCode,
			grant_type: "authorization_code"
		},
		success(res) {
			console.log("request.js getWeixinOepnInfo success, res:" + JSON.stringify(res));
			if (callfunc) {
				callfunc(error_code_ok, res);
			}
		},
		fail(err) {
			console.log("request.js getWeixinOepnInfo fail, err:" + JSON.stringify(err));
			if (callfunc) {
				callfunc(error_code_fail, err);
			}
		}
	});
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
	getOpenId,
	getPhoneNumber,
	uniGotoPage,
	uniLogin,
	uniGetUserInfo,
	uniGetUserProfile,
	uniShowModel,
	uniShowToast,
	getWeixinOepnInfo,
	getAccountLoginRegist,
	getUserAttrUpdate,
	categoryRootRequest,
	categoryTwoRequest,
	routerRequest,
	getCategory,
	getCategoryHumainAstro
}