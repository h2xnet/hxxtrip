/*
 * ClassName: AstrolController
 * Desc: 星座控制器
 * Author: zfs
 * Date: 2022-12-11 15:54
 */

const { Controller } = require("uni-cloud-router");

module.exports = class AstrolController extends Controller {
	
  //
  // index: 获取星座类别
  //
  astrolCategory() {
	console.log("controller/humain/astrol astrolCategory");
	
	const { ctx, service } = this;
	
	let params = ctx.data;
	console.log("controller/humain/astrol getAstrolCategory params: " + JSON.stringify(params));
	
	return service.humain.astrol.getAstrolCategory(params);
  }
  
  
};