/*
 * AstrolHandler: 星座处理类
 */

//
// getAstrolTopicCategory : 获取星座话题类别
//
const getAstrolTopicCategory = (That, request) => {
	console.log("astrol_handler.js getAstrolTopicCategory");
	
	request.getCategoryHumainAstro({"status": 1}, function(code, res){
		console.log("astrol_handler.js getCategoryHumainAstro code:" + code + ", res:" + JSON.stringify(res));
		if (code == 0 && res["errCode"] == 200) {
			let dataObj = res["data"];
			
			let count = dataObj["count"];
			if (count > 0) {
				let listData = dataObj["data"];
				
				That.humanTopicItems = listData;
			}
		}
	});
	
}

export default {
	getAstrolTopicCategory
	
}