const { Controller } = require("uni-cloud-router");

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
 * ClassName: ToolsController
 * Desc: 工具控制器类
 * Author: zfs
 * Date: 2023-01-07 09:28
 */
module.exports = class ToolsController extends Controller {
	
  //
  // getUuid: 获取uuid
  //
  getUuid() {
	console.log("controller/category index");
	
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
  
  
};