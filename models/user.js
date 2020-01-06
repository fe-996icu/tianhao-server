/*用户表
 * @Author: zzh0211@live.com
 * @Date: 2020-01-06 10:29:28
 * @Last Modified by: zzh0211@live.com
 * @Last Modified time: 2020-01-06 15:53:32
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
	realname: {
		type: String,
		required: true,
	},
	username: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
	[MODEL_DELETE_FLAG_FIELD_NAME]: MODEL_DELETE_FLAG_FIELD,
}, {
	collection: COLLECTION_NAME,
});

// 定时数据模型
const User = new mongoose.model(COLLECTION_NAME, userSchema);

module.exports = User;