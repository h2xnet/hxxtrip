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
		console.log("global/controller/category getPhoneNumber params: " + JSON.stringify(params));
		
		let event = ctx.event;
		console.log('global/controller/category getPhoneNumber event:', JSON.stringify(event));
		
		let access_token = params["access_token"];
		//let access_token = event.access_token;
		let openid = event.openid;
		
		return service.user.user.getPhoneNumber(params, access_token, openid);
	}
	
};