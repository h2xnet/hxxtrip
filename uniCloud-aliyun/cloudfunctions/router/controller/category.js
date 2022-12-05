const { Controller } = require("uni-cloud-router");

/*
 * ClassName: Category
 * Desc: category控制器，里面调用了category服务提供服务，获取类别列表
 * Author: zfs
 * Date: 2022-12-06 07:06
 */
module.exports = class CategoryController extends Controller {
	
  index() {
	console.log("controller/category index");
	
	const { ctx, service } = this;
	
	let params = ctx.data;
	console.log("controller/category index params: " + JSON.stringify(params));
	
	return service.category.getCategory(params);
  }
  
};