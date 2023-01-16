const ERROR_CODE = {
	ERROR_CODE_OK: 200,
	ERROR_CODE_ACCOUNT_EMPTY: 45000,
	ERROR_CODE_PSWD_EMPTY:45001
}

const ERROR_MSG = {
	ERROR_MSG_OK: "成功",
	ERROR_MSG_ACCOUNT_EMPTY: "账号为空",
	ERROR_MSG_PSWD_EMPTY: "密码为空"
}

function getAck(code, msg, data) {
	return {
		errCode: code,
		errMsg: msg,
		data: data
	}
}

module.exports = {
	ERROR_CODE,
	ERROR_MSG,
	getAck
}