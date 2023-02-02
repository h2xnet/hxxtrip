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
 * ClassName: FileController
 * Desc: 创建中心文件控制器类
 * Author: zfs
 * Date: 2023-02-03 07:23
 */
module.exports = class FileController extends Controller {
	
	//
	// uploadImagePrivate : 上传私有图片，主要用于个人图片库图片上传
	//
	async uploadImagePrivate() {
		const { ctx, service } = this;
		
		let params = ctx.data;
		console.log("router/controller/create/file/file.js uploadImagePrivate params: " + JSON.stringify(params));
		
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
			console.log("router/controller/create/file/file.js uploadImagePrivate token invalid");
			return getAck(ERROR_CODE.ERROR_CODE_TOKEN_INVALID, ERROR_MSG.ERROR_MSG_TOKEN_INVALID);
		}
		
		let accountId = await virifyTokenValid(token);
		if (accountId == "") {
			console.log("router/controller/create/file/file.js uploadImagePrivate virifyTokenValid fail");
			return getAck(ERROR_CODE.ERROR_CODE_TOKEN_INVALID, ERROR_MSG.ERROR_MSG_TOKEN_INVALID);
		}
		
		return await service.create.file.file.uploadImagePrivate(accountId, postParam)
	}
	
};