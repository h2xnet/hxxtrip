const { Service } = require("uni-cloud-router");

const {
	ERROR_CODE,
	ERROR_MSG,
	getAck,
	objIsEmpty,
	uuid
} = require("../../common/ackHelper.js");

const {
	FILE_STATE_CODE,
	FILE_STATE_MSG,
	createToken,
	verifyToken
} = require("../../common/ctool.js");


/*
 * ClassName: FileLogService
 * Desc: 文件日志服务
 * Author: zfs
 * Date: 2023-01-26 12:32
 */

module.exports = class FileLogService extends Service {
	
	//
	// uploadImageLog : 上传头像图片日志
	//
	async uploadImageLog(accountId, params) {
		console.log("global/service/log/file_log.js uploadImageLog params, accountId:" + accountId + ", params:" + JSON.stringify(params));
		const { ctx, db } = this;
		
		let times = new Date().getTime();
		
		let hxxtripUploadImageLog = await db.collection("hxxtrip_upload_image_log");
		
		let logInfo = {};
		
		logInfo["account_id"] = accountId;
		
		logInfo["create_time"] = times;
		logInfo["last_modify_time"] = times;
		
		logInfo["remove_time"] = 0;
		
		// 状态说明：0禁止使用，1正常，2逻辑删除，3物理删除
		logInfo["state"] = FILE_STATE_CODE.FILE_STATE_CODE_NORMAL;
		
		logInfo["purpose"] = params["purpose"]; // 图片用途，head:头像，
		
		if (!params.hasOwnProperty("fileType")) {
			logInfo["file_type"] = "image";
		}
		else {
			logInfo["file_type"] = params["fileType"]; // 文件类型, image、video、audio
		}
		logInfo["file_name"] = params["fileName"];
		logInfo["ext"] = params["ext"]; // 文件扩展名，相当于是图片文件类型
		logInfo["img_url"] = params["imgUrl"];
		logInfo["remark"] = params["remark"];
		
		console.log("global/service/log/file_log.js uploadImageLog logInfo: " + JSON.stringify(logInfo));
		
		let addResult = await hxxtripUploadImageLog.add(logInfo);
		// add success : {"id":"63cceebee1a35c99699406dc"}
		console.log("global/service/log/file_log.js uploadImageLog add result: " + JSON.stringify(addResult));
		
		if (addResult.hasOwnProperty("id")) {
			logInfo["_id"] = addResult["id"];
		}
		else {
			// fail
			return getAck(ERROR_CODE.ERROR_CODE_UPLOAD_IMAGE_FAIL, ERROR_MSG.ERROR_MSG_UPLOAD_IMAGE_FAIL, null);
		}
		
		return getAck(ERROR_CODE.ERROR_CODE_OK, ERROR_MSG.ERROR_MSG_OK, logInfo);	
	}
	
	
	
};