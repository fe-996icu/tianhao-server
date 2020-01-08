/*用户表
 * @Author: zzh0211@live.com
 * @Date: 2020-01-06 10:29:28
 * @Last Modified by: zzh0211@live.com
 * @Last Modified time: 2020-01-08 14:53:32
 */
const mongoose = require('mongoose');
const { MODEL_DELETE_FLAG_FIELD_NAME, MODEL_DELETE_FLAG_FIELD } = require('../config/model.js');

// 库中的集合名称
const COLLECTION_NAME = 'user';

// 定义模式
const userSchema = new mongoose.Schema({
	// _id: {
	// 	type: mongoose.SchemaTypes.ObjectId,
	// },
	// 真实姓名
	realname: {
		type: String,
		required: true,
	},
	// 登录账号
	username: {
		type: String,
		required: true,
	},
	// 登录密码
	password: {
		type: String,
		required: true,
	},
	// 注册日期
	reg_date: {
		type: Date,
		default: Date.now(),
		required: true,
	},
	// 最后登录日期
	last_login_date: {
		type: Date,
	},
	// 是否逻辑删除
	[MODEL_DELETE_FLAG_FIELD_NAME]: MODEL_DELETE_FLAG_FIELD,
}, {
	collection: COLLECTION_NAME,
});

// 定时数据模型
const User = new mongoose.model(COLLECTION_NAME, userSchema);

module.exports = User;