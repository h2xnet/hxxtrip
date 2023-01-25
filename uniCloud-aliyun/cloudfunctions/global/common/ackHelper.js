const ERROR_CODE = {
	ERROR_CODE_OK: 200,
	ERROR_CODE_ACCOUNT_EMPTY: 45000,
	ERROR_CODE_PSWD_EMPTY:45001,
	ERROR_CODE_PSWD_ERROR: 45002,
	ERROR_CODE_ADD_USER_FAIL: 45003,
	ERROR_CODE_UPDATE_USER_FAIL: 45004,
	ERROR_CODE_TOKEN_INVALID: 45005
}

const ERROR_MSG = {
	ERROR_MSG_OK: "成功",
	ERROR_MSG_ACCOUNT_EMPTY: "账号为空",
	ERROR_MSG_PSWD_EMPTY: "密码为空",
	ERROR_MSG_PSWD_ERROR: "密码错误",
	ERROR_MSG_ADD_USER_FAIL: "添加用户失败，请重新再试",
	ERROR_MSG_UPDATE_USER_FAIL: "修改用户信息失败",
	ERROR_MSG_TOKEN_INVALID: "TOKEN无效"
}

function getAck(code, msg, data) {
	return {
		errCode: code,
		errMsg: msg,
		data: data
	}
}

//
// objIsEmpty : 判断对象是否为空
//
function objIsEmpty(obj) {
	if (obj == undefined || obj == null || obj == "" || 
		JSON.stringify(obj) == "" || JSON.stringify(obj) == "{}") {
		return true;
	}
	return false;
}

//
// uuid : 生成UUID
// @len: 长度，默认为16位
// @radix: 基数，默认为16进制
//
const uuid = (len, radix) => {
	console.log("global/controller/tools.js uuid params, len:" + len + ", radix:" + radix);
	
	var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
	var uuid = [];
	var i = 0;
	
	radix = radix || chars.length;
	if (len > 0) {
		for(i = 0; i < len; i++) {
			uuid[i] = chars[0 | Math.random() * radix];
		}
	}
	else {
		var r;
		uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
		uuid[14] = '4';
		for(i = 0; i < 36; i++) {
			if (!uuid[i]) {
				r = 0 | Math.random() * 16;
				uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : (r)];
			}
		}
	}
	return uuid.join('');
}

module.exports = {
	ERROR_CODE,
	ERROR_MSG,
	getAck,
	objIsEmpty,
	uuid
}