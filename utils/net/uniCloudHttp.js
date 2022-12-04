
/*
 * ClassName: uniCloudHttp
 * Desc: uniCloud网络请求封装类
 * Author: zfs
 * Date: 2022-12-03 16:16
 */

import {error_code_ok, error_code_fail} from './errorCode.js'

//
// errorHandler : 错误处理
//
function errorHandler(code, res) {
	console.log("uniCloudHttp.js errorHandler params, code:" + code + ", res:" + JSON.stringify(res));
}

function okHandler(code, res) {
	console.log("uniCloudHttp.js okHandler params, code:" + code + ", res:" + JSON.stringify(res));
}

//
// cloudCallFunc : 请求调用云函数
//
const cloudCallFunc = (url, params, callHandler) => {
	uniCloud.callFunction({
		name: url,
		data: params
	}).then((res) => {
		//okHandler(error_code_ok, res.result);
		
		if (callHandler) {
			callHandler(error_code_ok, res.result);
		}
	}).catch(err => {
		//errorHandler(error_code_fail, err);
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
const cloudUploadFile = (cloudFilePath, localFilePath, fileType, uploadProgressEvent, callHandler) => {
	uniCloud.uploadFile({
		filePath: localFilePath,
		cloudPath: cloudFilePath,
		fileType: fileType,
		onUploadProgress: function(progressEvent) {
			 var percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
			 if (uploadProgressEvent) {
				 uploadProgressEvent(percentCompleted);
			 }
			
		}
	}).then((res) => {
		okHandler(error_code_ok, res);
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
	cloudCallFunc,
	cloudUploadFile
};