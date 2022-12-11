/*
 * ClassName: AstrolService
 * Desc: 星座服务
 * Author: zfs
 * Date: 2022-12-11 15:59
 */

const { Service } = require("uni-cloud-router");


module.exports = class CategoryService extends Service {
	
	//
	// getAstrolCategory : 获取星座类别
	//
	async getAstrolCategory(params) {
		const { ctx, db } = this;
		const dbCmd = db.command;
		
		let status = 1;
		if (params.hasOwnProperty("status")) {
			status = params["status"];
		}
		// 查找跟类别数据
		let collection = await db.collection("hxxtrip_category_human_astrol");
		let res = await collection.where({status: dbCmd.gte(status)}).orderBy("sort", "asc").get();
		console.log("service/humain/astrol getAstrolCategory hxxtrip_category_human_astrol res: " + JSON.stringify(res));
		
		res["count"] = res["affectedDocs"];
		
		return {
		  errCode: 200,
		  errMsg: "成功",
		  data: res
		};
		
	}
	
};