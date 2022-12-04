'use strict';

/*
 * categoryRoot : 获取顶层类别列表
 * Author: zfs
 * Date: 2022-12-03 15:39
 */

const db = uniCloud.database();
const dbCmd = db.command;

exports.main = async (event, context) => {
	//event为客户端上传的参数
	console.log('event : ', event)
	
	let collection = await db.collection("hxxtrip_category_root");
	let res = await collection.where({status: dbCmd.gte(event.status)}).orderBy("sort", "asc").get();
	
	console.log("categoryRoot res:" + JSON.stringify(res));
	
	return {
		errCode: 200,
		errMsg: "请求成功",
		data: res
	};
};
