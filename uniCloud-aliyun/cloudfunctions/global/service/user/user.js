const { Service } = require("uni-cloud-router");

const {
	ERROR_CODE,
	ERROR_MSG,
	getAck,
	objIsEmpty,
	uuid
} = require("../../common/ackHelper.js");


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
	
	//
	// accountLoginRegist : 账号登录/注册
	//
	async accountLoginRegist(params) {
		console.log("global/service/user/user.js accountLoginRegist params: " + JSON.stringify(params));
		
		const { ctx, db } = this;
		
		let userAccount = "";
		if (params.hasOwnProperty("userAccount")) {
			userAccount = params["userAccount"];
		}
		let userPswd = "";
		if (params.hasOwnProperty("userPswd")) {
			userPswd = params["userPswd"];
		}
		
<<<<<<< HEAD
		if (userAccount == "") {
			return getAck(ERROR_CODE.ERROR_CODE_ACCOUNT_EMPTY, ERROR_MSG.ERROR_MSG_ACCOUNT_EMPTY, null);
		}
		
		if (userPswd == "") {
			return getAck(ERROR_CODE.ERROR_CODE_PSWD_EMPTY, ERROR_MSG.ERROR_MSG_PSWD_EMPTY, null);
		}
		
		let times = new Date().getTime();
		console.log("===== times: " + JSON.stringify(times) + " =====")
		
		//let time = new Date().toLocaleString('zh-cn').toString();
		let loginType = "login";
		let userInfo = {};
		let updateUserInfo = {};
		
		// 验证用户
		let hxxtripUser = await db.collection("hxxtrip_user");
		let result = await hxxtripUser.where({account: userAccount}).get();
		console.log("global/service/user/user.js accountLoginRegist get account:" + userAccount + ", result:" + JSON.stringify(result));
		// {"affectedDocs":0,"data":[]}
		let affectedDocs = result["affectedDocs"];
		if (affectedDocs > 0) {
			loginType = "login";
			
			// 验证密码
			let userData = result["data"];
			userInfo = userData[0];
			
			if (userPswd != userInfo["pswd"]) {
				// 密码错误
				return getAck(ERROR_CODE.ERROR_CODE_PSWD_ERROR, ERROR_MSG.ERROR_MSG_PSWD_ERROR, {});
			}
			
			// 修改登录信息
			updateUserInfo["login_type"] = loginType;
			updateUserInfo["last_modify_time"] = times;
			updateUserInfo["last_login_time"] = times;
			
		}
		else {
			loginType = "regist"
			
			let regist_env = {};
			regist_env["platform"] = "mp-weixin";
			regist_env["app_name"] = "hxxtrip";
			regist_env["app_version"] = "1.0.0";
			regist_env["channel"] = "1001";
			regist_env["client_ip"] = "";
			
			userInfo["account_id"] = uuid(10, 16); // 自定义ID，必须唯一
			userInfo["phone"] = "";
			userInfo["wechat"] = "";
			userInfo["account"] = userAccount;
			userInfo["pswd"] = userPswd;
			userInfo["nick_name"] = userAccount;
			userInfo["avatar_url"] = ""; // 头像
			userInfo["sex"] = 0; //0未知,1是男，2是女
			userInfo["email"] = "";
			
			userInfo["regist_time"] = times;
			userInfo["last_modify_time"] = times;
			userInfo["last_login_time"] = times;
			userInfo["last_login_ip"] = "";
			userInfo["login_type"] = loginType;
			userInfo["regist_env"] = regist_env;
			
			// 地址
			userInfo["city"] = "";
			userInfo["province"] = "";
			userInfo["country"] = "";
			
			// 简介
			userInfo["introduce"] = ""; 
			
			// 统计
			userInfo["focus"] = 0; // 关注数
			userInfo["fans"] = 0; // 粉丝数
			userInfo["likes"] = 0; // 点赞数
			userInfo["collects"] = 0; // 收藏数
			
			userInfo["shopId"] = ""; // 店铺ID
			
			userInfo["token"] = "";
			userInfo["fresh_token"] = "";
			
			let addResult = await hxxtripUser.add(userInfo);
			console.log("global/service/user/user.js accountLoginRegist add result:" + JSON.stringify(addResult) + ", userInfo:" + JSON.stringify(userInfo));
			
			// add success : {"id":"63cceebee1a35c99699406dc"}
			if (addResult.hasOwnProperty("id")) {
				userInfo["id"] = addResult["id"];
			}
			else {
				// fail
				return getAck(ERROR_CODE.ERROR_CODE_ADD_USER_FAIL, ERROR_MSG.ERROR_MSG_ADD_USER_FAIL);
			}
		}
		
		// 更新登录信息，包括token
		
		// 登录成功
		//userInfo["pswd"] = "";
		
		// delete object property
		const { pswd, regist_env, ...retUserInfo } = userInfo;
		console.log("global/service/user/user.js accountLoginRegist retUserInfo:" + JSON.stringify(retUserInfo));
		
		return getAck(ERROR_CODE.ERROR_CODE_OK, ERROR_MSG.ERROR_MSG_OK, retUserInfo);
		
=======
		return {
			errCode: 0,
			errMsg: 'ok',
			data: null
		}
		
>>>>>>> 8910d34fa94d19f893e4be280d9acd1e5c384024
	}

};