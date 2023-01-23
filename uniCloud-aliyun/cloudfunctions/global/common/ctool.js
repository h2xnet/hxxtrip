const jwt = require("jsonwebtoken");

const appId = "wx56e4f0b2026fbdf0";
const secret = "8191a650d4e5b4be0127d84a02389f40";

//
// uuid : 生成UUID
// @len: 长度，默认为16位
// @radix: 基数，默认为16进制
//
function uuid(len, radix) {
	console.log("global/controller/tools.js uuid params, len:" + len + ", radix:" + radix);
	
	var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
	var uuid = [];
	var i = 0;
	
	radix = radix || chars.length;
	if (len > 0) {
		for(i = 0; i < len; i++) {
			uuid[i] = chars[0 | Math.random() * radix];
		}
	}
	else {
		var r;
		uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
		uuid[14] = '4';
		for(i = 0; i < 36; i++) {
			if (!uuid[i]) {
				r = 0 | Math.random() * 16;
				uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : (r)];
			}
		}
	}
	return uuid.join('');
}


/*
 * Func: getOpenId
 * Desc: 获取openid
 * Author: zfs
 * Date: 2023-01-22 16:57
 */
async function getOpenId(code) {
	let url =
		"https://api.weixin.qq.com/sns/jscode2session?appid=" +
		appId +
		"&secret=" +
		secret +
		"&js_code=" +
		code +
		"&grant_type=authorization_code";
		
	let res = await uniCloud.httpclient.request(
			url ,// 请求路径,
			{
				dataType:"json"
			}
		);
	console.log("global/controller/tools getOpenId res:" + JSON.stringify(res));
	
	if (res["status"] != 200) {
		return "";
	}
	
	return res["data"];
}

/*
 * Func: createToken
 * Desc: 创新新token
 * Author: zfs
 * Date: 2023-01-23 11:54
 * @accountId: 用户账号ID
 * @flag: ["create", "fresh"]
 * @expirese: 过期时间，单位：秒，例如：60 * 60 * 24 * 30 
 */
async function createToken(accountId, flag, expirse) {
	console.log("global/controller/tools.js createToken params, accountId:" + accountId + ", expirse:" + expirse + ", flag:" + flag);
	
	// sign(加密数据，加密辅助，过期时间(单位/s)) 
	let payload = {
		accountId: accountId,
		flag: flag
	}
	
	return jwt.sign(payload, secret, { expiresIn: expirse }); 
}

/*
 * Func: verifyToken
 * Desc: 验证token
 * Author: zfs
 * Date: 2023-01-23 12:13
 */
async function verifyToken(token) {
	console.log("global/controller/tools.js verifyToken params, token:" + token);
	return jwt.verify(token, secret, (err, decode) => { 
		console.log("global/controller/tools.js verifyToken jwt.verify, err:" + JSON.stringify(err) + ", decode:" + JSON.stringify(decode));
		if (err) {
			return "";
		}
		return decode 	
	}); 
}

module.exports = {
	uuid,
	getOpenId,
	createToken,
	verifyToken
}