/*数据库工具类
 * @Author: zzh0211@live.com
 * @Date: 2020-01-06 15:55:24
 * @Last Modified by: zhangjianzhong
 * @Last Modified time: 2021-12-10 14:45:58
 */
const mongoose = require('mongoose');
const DB_CONFIG = require('../config/db.js');
const { MODEL_DELETE_FLAG_FIELD_NAME } = require('../config/model.js');
const models = require('../models/index.js');

// 连接字符串
const CONNECT_URL = `mongodb://${ DB_CONFIG.user }:${ DB_CONFIG.pwd }@${ DB_CONFIG.host }:${ DB_CONFIG.port }/${ DB_CONFIG.dbName }?authSource=admin`;
// 数据库连接配置
const connectConfig = {
	useUnifiedTopology: true,
	useNewUrlParser: true,
	keepAlive: 120,
};

/**默认头像数据 */
const defaultPrejection = {
	// 不返回逻辑删除标识字段
	[MODEL_DELETE_FLAG_FIELD_NAME]: 0,
};

console.log(`数据库连接字符串：${ CONNECT_URL }`);

class Mongo{

	// 数据库连接字符串
	connectString = null;

	// 数据库连接对象
	_client;

	constructor(connectString){
		this.connectString = connectString;

		// 建立数据库连接
		this.connect();
	}

	connect(){
		return new Promise((resolve, reject)=>{
			if(this._client){
				return resolve(this._client);
			}

			const beginTime = Date.now();

			// 连接数据库
			mongoose.connect(this.connectString,  connectConfig);

			this._client = mongoose.connection;

			this._client.once('open', function(err){
				if(err){
					return reject(err);
				}

				const connectTime = Date.now() - beginTime;

				console.log(`数据库连接成功，耗时：${ connectTime }ms`);

				return resolve(this._client);
			});

			this._client.on('error', function(err){
				reject(err);
			});
		});
	}

	/**
	 * 查询实体数据
	 * @param {String} collectionName 集合名称（Model名称，小写）
	 * @param {Object} condition 查询条件
	 */
	async find(collectionName, condition={}, prejection=defaultPrejection){
		return await models[collectionName].find(condition, prejection);
	}


	async findOne(collectionName, condition={}, prejection=defaultPrejection){
		return await models[collectionName].findOne(condition, prejection);
	}


	findById(collectionName, id, prejection=defaultPrejection){
		return models[collectionName].findById(id, prejection);
	}


	async exist(collectionName, condition){
		const doc = await this.findOne(collectionName, condition);

		return !!doc;
	}


	async insert(collectionName, docs){
		return await models[collectionName].create(docs);
	}


	async insertOne(collectionName, doc){
		return await this.insert(collectionName, doc);
	}


	async insertMany(collectionName, docs){
		return await models[collectionName].insertMany(docs);
	}

	async update(collectionName, condition, updateData){
		return await models[collectionName].update(condition, {
			$set: updateData,
		});
	}

	async updateOne(collectionName, condition, updateData){
		return await models[collectionName].updateOne(condition, {
			$set: updateData,
		});
	}

	async updateMany(collectionName, condition, updateData){
		return await models[collectionName].updateMany(condition, {
			$set: updateData,
		});
	}

	async deleteOne(collectionName, condition){
		return await models[collectionName].deleteOne(condition);
	}


	async deleteMany(collectionName, condition){
		return await models[collectionName].deleteMany(condition);
	}


}

module.exports = new Mongo(CONNECT_URL);
