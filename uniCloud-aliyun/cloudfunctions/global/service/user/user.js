const { Service } = require("uni-cloud-router");

/*
 * ClassName: UserService
 * Desc: 用户服务
 * Author: zfs
 * Date: 2023-01-14 06:36
 */

module.exports = class UserService extends Service {
	
	//
	// getPhoneNumber : 获取手机号
	//
	async getPhoneNumber(params, access_token, openid) {
		const { ctx, db } = this;
		
		let appid = '';
		if (params.hasOwnProperty("appid")) {
			appid = params["appid"];
		}
		let apiKey = '';
		if (params.hasOwnProperty('apiKey')) {
			apiKey = params["apiKey"];
		}
		let apiSecret = '';
		if (params.hasOwnProperty('apiSecret')) {
			apiSecret = params["apiSecret"];
		}
		
		//const db = uniCloud.database();
		const res = await uniCloud.getPhoneNumber({
				appid: appid, // 替换成自己开通一键登录的应用的DCloud appid
				provider: 'univerify',
				apiKey: apiKey, // 在开发者中心开通服务并获取apiKey
				apiSecret: apiSecret, // 在开发者中心开通服务并获取apiSecret
				access_token: access_token,
				openid: openid
		});
		
		console.log("global/service/user/user.js getPhoneNumber uniCloud.getPhoneNumber res:" + JSON.stringify(res));
			
		// 执行入库等操作，正常情况下不要把完整手机号返回给前端	
		/*await db.collection('regUser').add({
			openid: openid, //前端提交过来的数据
			PhoneNumber: res.phoneNumber,
			createTime: Date.now()
		})*/
	
		return res
		
	}

};