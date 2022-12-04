'use strict';

/*
 * categoryTwo : 获取二级子类别列表
 * Author: zfs
 * Date: 2022-12-04 17:52
 */

const db = uniCloud.database();
const dbCmd = db.command;

exports.main = async (event, context) => {
	//event为客户端上传的参数
	console.log('categoryTwo index.js event : ', event)
	
	//返回数据给客户端
	let collection = await db.collection("hxxtrip_category_two");
	let res = await collection.where({categoryRootId: event.categoryRootId, status: dbCmd.gte(event.status)}).orderBy("sort", "asc").get();
	
	console.log("categoryRoot res:" + JSON.stringify(res));
	
	return {
		errCode: 200,
		errMsg: "请求成功",
		data: res
	};
	
};
