const { Controller } = require("uni-cloud-router");

const {
	ERROR_CODE,
	ERROR_MSG,
	getAck,
	objIsEmpty,
	uuid
} = require("../../common/ackHelper.js");

const {
	createToken,
	virifyTokenValid
} = require("../../common/ctool.js");


/*
 * ClassName: ArticleController
 * Desc: 创建中心文章控制器类
 * Author: zfs
 * Date: 2023-02-03 07:29
 */
module.exports = class ArticleController extends Controller {
	
};