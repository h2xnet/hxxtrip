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
 * ClassName: UserController
 * Desc: 用户控制器类
 * Author: zfs
 * Date: 2023-01-14 06:32
 */
module.exports = class UserController extends Controller {
	
	//
	// getPhoneNumber : 获取用户手机号
	//
	async getPhoneNumber() {
		const { ctx, service } = this;
		
		let params = ctx.data;
		console.log("global/controller/user/user.js getPhoneNumber params: " + JSON.stringify(params));
		
		let event = ctx.event;
		console.log('global/controller/user/user.js getPhoneNumber event:', JSON.stringify(event));
		
		let access_token = params["access_token"];
		//let access_token = event.access_token;
		let openid = event.openid;
		
		return await service.user.user.getPhoneNumber(params, access_token, openid);
	}
	
	//
	// accountLoginRegist : 账号登录/注册，如果存在则登录，不存在则注册
	//
	async accountLoginRegist() {
		const { ctx, service } = this;
		
		let params = ctx.data;
		console.log("global/controller/user/user.js accountLoginRegist params: " + JSON.stringify(params));
		
		//let event = ctx.event;
		//console.log('global/controller/user/user.js accountLoginRegist event:', JSON.stringify(event));
		
		return await service.user.user.accountLoginRegist(params);
	}
	
	//
	// userAttrUpdate : 修改用户信息
	//
	async userAttrUpdate() {
		const { ctx, service } = this;
		
		let params = ctx.data;
		console.log("global/controller/user/user.js userAttrUpdate params: " + JSON.stringify(params));
		
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
			console.log("global/controller/user/user.js userAttrUpdate token invalid");
			return getAck(ERROR_CODE.ERROR_CODE_TOKEN_INVALID, ERROR_MSG.ERROR_MSG_TOKEN_INVALID);
		}
		
		let accountId = await virifyTokenValid(token);
		if (accountId == "") {
			console.log("global/controller/user/user.js userAttrUpdate virifyTokenValid fail");
			return getAck(ERROR_CODE.ERROR_CODE_TOKEN_INVALID, ERROR_MSG.ERROR_MSG_TOKEN_INVALID);
		}
		
		return await service.user.user.userAttrUpdate(accountId, postParam);
	}
	
};