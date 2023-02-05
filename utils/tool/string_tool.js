
//
// getSubStrs : 获取子字符串集，返回查找到的字符串数组
// @str: 被查找字符串
// @strMatchStart: 匹配的起始字符串，不能为空
// @strMatchEnd: 匹配的结束字符串，可以为空
// @nStart: 查找的开始位置
// @outDatas: 返回查找到的字符串数组
// @返回值：无
//
const getSubStrs = (str, strMatchStart, strMatchEnd, nStart, outDatas = []) => {
	console.log("string_tool.js getSubStrs params, strMatchStart:" + strMatchStart + ", strMatchEnd:" + strMatchEnd + ", nStart:" + nStart);
	
	if (str == "" || strMatchStart == "") {
		console.log("string_tool.js getSubStrs str or strMatchStart isEmpty");
		return;
	}
	
	if (nStart < 0 || nStart >= str.length) {
		console.log("string_tool.js getSubStrs nStart < 0 or nStart < str length, nStart:" + nStart + ", str length:" + str.length);
		outDatas.push(str);
		return;
	}
	
	let pos1 = str.indexOf(strMatchStart, nStart);
	console.log("string_tool.js getSubStrs pos1:" + pos1);
	if (pos1 < 0) {
		return;
	}
	
	if (strMatchEnd == "") {
		// 只匹配起始字符串，则相当于截取右边子字符串
		outDatas.push(str.substr(pos1 + strMatchStart.length));
		return;
	}
	
	let offset = pos1 + strMatchStart.length;
	let pos2 = str.indexOf(strMatchEnd, offset);
	console.log("string_tool.js getSubStrs pos2:" + pos2);
	if (pos2 < 0) {
		return;
	}
	
	outDatas.push(str.substr(offset, pos2 - pos1 - strMatchStart.length));
	
	// 递归调用
	pos1 = pos2 + strMatchEnd.length;
	pos2 = -1;
	getSubStrs(str, strMatchStart, strMatchEnd, pos1, outDatas);
}

export default {
	getSubStrs
}