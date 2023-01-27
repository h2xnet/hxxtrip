const { Controller } = require("uni-cloud-router");

const {
	ERROR_CODE,
	ERROR_MSG,
	getAck,
	objIsEmpty,
	uuid
} = require("../../common/ackHelper.js");

const {
	createToken,
	virifyTokenValid
} = require("../../common/ctool.js");


/*
 * ClassName: FileLogController
 * Desc: 文件日志控制器类
 * Author: zfs
 * Date: 2023-01-26 12:28
 */
module.exports = class FileLogController extends Controller {
	
	//
	// uploadImageLog : 上传图片日志，主要用于上传用户头像
	//
	async uploadImageLog() {
		const { ctx, service } = this;
		
		let params = ctx.data;
		console.log("global/controller/log/file_log.js uploadImageLog params: " + JSON.stringify(params));
		
		let token = "";
		let postParam = {};
		if (params.hasOwnProperty("token")) {
			token = params["token"];
		}
		
		if (params.hasOwnProperty("param")) {
			postParam = params["param"];
		}
		
		if (token == "") {
			// token无效
			console.log("global/controller/log/file_log.js uploadImageLog token invalid");
			return getAck(ERROR_CODE.ERROR_CODE_TOKEN_INVALID, ERROR_MSG.ERROR_MSG_TOKEN_INVALID);
		}
		
		let accountId = await virifyTokenValid(token);
		if (accountId == "") {
			console.log("global/controller/log/file_log.js uploadImageLog virifyTokenValid fail");
			return getAck(ERROR_CODE.ERROR_CODE_TOKEN_INVALID, ERROR_MSG.ERROR_MSG_TOKEN_INVALID);
		}
		
		return await service.log.file_log.uploadImageLog(accountId, postParam)
	}
	
	//
	// uploadImagePrivate : 上传私有图片，主要用于个人图片库图片上传
	//
	async uploadImagePrivate() {
		const { ctx, service } = this;
		
		let params = ctx.data;
		console.log("global/controller/log/file_log.js uploadImagePrivate params: " + JSON.stringify(params));
		
		let token = "";
		let postParam = {};
		if (params.hasOwnProperty("token")) {
			token = params["token"];
		}
		
		if (params.hasOwnProperty("param")) {
			postParam = params["param"];
		}
		
		if (token == "") {
			// token无效
			console.log("global/controller/log/file_log.js uploadImagePrivate token invalid");
			return getAck(ERROR_CODE.ERROR_CODE_TOKEN_INVALID, ERROR_MSG.ERROR_MSG_TOKEN_INVALID);
		}
		
		let accountId = await virifyTokenValid(token);
		if (accountId == "") {
			console.log("global/controller/log/file_log.js uploadImagePrivate virifyTokenValid fail");
			return getAck(ERROR_CODE.ERROR_CODE_TOKEN_INVALID, ERROR_MSG.ERROR_MSG_TOKEN_INVALID);
		}
		
		return await service.log.file_log.uploadImagePrivate(accountId, postParam)
	}
	
}