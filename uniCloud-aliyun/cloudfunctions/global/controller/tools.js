const { Controller } = require("uni-cloud-router");

const appId = "wx56e4f0b2026fbdf0";
const secret = "gh_6f2621d527fb";

//
// uuid : 生成UUID
// @len: 长度，默认为16位
// @radix: 基数，默认为16进制
//
const uuid = (len, radix) => {
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
const getOpenId = async (code) => {
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
	let openid = res.data.openid
	return openid
}

/*
 * ClassName: ToolsController
 * Desc: 工具控制器类
 * Author: zfs
 * Date: 2023-01-07 09:28
 */
module.exports = class ToolsController extends Controller {
	
  //
  // getUuid: 获取uuid
  //
  async getUuid() {
	console.log("global/controller/tools index");
	
	const { ctx, service } = this;
	
	let params = ctx.data;
	console.log("global/controller/tools index params: " + JSON.stringify(params));
	
	let len = 16;
	let radix = 16;
	
	if (params.hasOwnProperty('len')) {
		len = params['len'];
	}
	if (params.hasOwnProperty('radix')) {
		radix = params['radix'];
	}
	
	return uuid(len, radix);
  }
  
  //
  // getOpenId : 获取openid
  //
  async getOpenId() {
	  const { ctx, service } = this;
	  
	  let params = ctx.data;
	  console.log("global/controller/tools getOpenId params: " + JSON.stringify(params));
	  
	  if (!params.hasOwnProperty("code")) {
		  return "";
	  }
	  
	  let code = params["code"];
	  
	  return getOpenId(code);
  }
  
  
};