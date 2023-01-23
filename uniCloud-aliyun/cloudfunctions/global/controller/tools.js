const { Controller } = require("uni-cloud-router");

const {
	uuid,
	getOpenId,
	createToken,
	verifyToken
} = require("../common/ctool.js");

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
	  
	  return await getOpenId(code);
  }
  
  //
  // getNewToken : 获取新token
  //
  async getNewToken(accountId, expirse) {
	  return await createToken(accountId, "create", expirse);
  }
  
  //
  // verifyToken : 验证token
  //
  async verifyToken(token) {
	  return await verifyToken(token);
  }
  
  //
  // getFreshToken : 刷新token
  //
  async getFreshToken(accountId, expires) {
	  return await createToken(accountId, "fresh", expirse);
  }
  
};