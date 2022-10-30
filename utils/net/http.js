import cloudbase from '@cloudbase/js-sdk'

import {error_code_ok,error_code_fail} from './errorCode.js'

//
// errorHandler : 错误处理
//
function errorHandler(code, res) {
	console.log("errorHandler params, code:" + code + ", res:" + JSON.stringify(res));
}

//
// cloudAuth : 云匿名登录
//
const cloudAuth = (callHandler) => {
	cloudbase.auth().anonymousAuthProvider().signIn().then(res => {
		if (callHandler) {
			callHandler(error_code_ok, res);
		}
	}).catch(err => {
		errorHandler(error_code_fail, err);
		if (callHandler) {
			callHandler(error_code_fail, err);
		}
	});
}

//
// cloudCallFunc : 请求调用云函数
//
const cloudCallFunc = (url, params, callHandler) => {
	cloudbase.callFunction({
		name: url,
		data: params
	}).then((res) => {
		if (callHandler) {
			callHandler(error_code_ok, res);
		}
	}).catch(err => {
		errorHandler(error_code_fail, err);
		if (callHandler) {
			callHandler(error_code_fail, err);
		}
	});
}

//
// cloudUploadFile : 云上传文件
// @cloudFilePath: 云端文件路径，即文件名
// @localFilePath: 上传的本地文件路径
// @uploadProgressEvent: 上传进度，可以为空
// @callHandler: 上传结果
//
const cloudUploadFile = (cloudFilePath, localFilePath, uploadProgressEvent, callHandler) => {
	cloudbase.cloudUploadFile({
		cloudPath: cloudFilePath,
		filePath: localFilePath,
		onUploadProgress: function(progressEvent) {
			 var percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
			 if (uploadProgressEvent) {
				 uploadProgressEvent(percentCompleted);
			 }
			
		}
	}).then((res) => {
		if (callHandler) {
			callHandler(error_code_ok, res);
		}
	}).catch(err => {
		errorHandler(error_code_fail, err);
		if (callHandler) {
			callHandler(error_code_fail, err);
		}
	});
}

export default {
	cloudAuth,
	cloudCallFunc,
	cloudUploadFile
}