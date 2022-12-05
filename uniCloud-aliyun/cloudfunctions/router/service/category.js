const { Service } = require("uni-cloud-router");

/*
 * ClassName: Category
 * Desc: category服务
 * Author: zfs
 * Date: 2022-12-06 07:07
 */

module.exports = class CategoryService extends Service {
	//
	// getCategory : 获取类别列表
	//
	async getCategory(params) {
		const { ctx, db } = this;
		const dbCmd = db.command;
		
		let status = 1;
		if (params.hasOwnProperty("status")) {
			status = params["status"];
		}
		
		let collection = await db.collection("hxxtrip_category_root");
		let rootRes = await collection.where({status: dbCmd.gte(status)}).orderBy("sort", "asc").get();
		console.log("service/category getCategory hxxtrip_category_root res: " + JSON.stringify(rootRes));
		
		//let collection2 = await db.collection("hxxtrip_category_two");
		//let twoRes = await collection2.where({status: dbCmd.gte(status)}).orderBy("sort", "asc").get();
		//console.log("service/category getCategory hxxtrip_category_two res: " + JSON.stringify(twoRes));
		
		return {
		  errCode: 0,
		  errMsg: "成功",
		  data: rootRes
		};
	}
  
};