const { Controller } = require("uni-cloud-router");


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
		
<<<<<<< HEAD
		//let event = ctx.event;
		//console.log('global/controller/user/user.js accountLoginRegist event:', JSON.stringify(event));
		
=======
>>>>>>> 8910d34fa94d19f893e4be280d9acd1e5c384024
		return await service.user.user.accountLoginRegist(params);
	}
	
};