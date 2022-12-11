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
		// 查找跟类别数据
		let collection = await db.collection("hxxtrip_category_root");
		let rootRes = await collection.where({status: dbCmd.gte(status)}).orderBy("sort", "asc").get();
		console.log("service/category getCategory hxxtrip_category_root res: " + JSON.stringify(rootRes));
		// 查找第二级类别数据
		let collection2 = await db.collection("hxxtrip_category_two");
		let twoRes = await collection2.where({status: dbCmd.gte(status)}).orderBy("sort", "asc").get();
		console.log("service/category getCategory hxxtrip_category_two res: " + JSON.stringify(twoRes));
		
		// 解析并整合类别列表
		let twoResAffectedDocs = twoRes["affectedDocs"];
		let twoResData = twoRes["data"];
		
		let resDataList = [];
		let affectedDocs = rootRes["affectedDocs"];
		let rootResData = rootRes["data"];
		for(let idx = 0; idx < affectedDocs; idx++) {
			let itemData = rootResData[idx];
			
			let itemName = itemData["name"];
			
			let itemSubData = [];
			for(let idy = 0; idy < twoResData.length; idy++) {
				let itemTwoData = twoResData[idy];
				
				if (itemData["name"] === itemTwoData["categoryRootId"]) {
					itemSubData.push(itemTwoData);
				}
			}
			
			itemData["data"] = itemSubData;
			
			resDataList.push(itemData);
		}
		
		let resDataObj = {};
		resDataObj["affectedDocs"] = resDataList.length;
		resDataObj["count"] = resDataList.length;
		resDataObj["data"] = resDataList;
		console.log("service/category getCategory resDataObj: " + JSON.stringify(resDataObj));
		
		return {
		  errCode: 200,
		  errMsg: "成功",
		  data: resDataObj
		};
	}
  
};