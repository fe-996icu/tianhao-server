/*数据库助手
	https://blog.csdn.net/weixin_43659627/article/details/89054115
 * @Author: zzh0211@live.com
 * @Date: 2020-01-03 20:49:40
 * @Last Modified by: zzh0211@live.com
 * @Last Modified time: 2020-01-03 20:50:00
 */
const mongoose = require('mongoose');
const path = require('path');
const schemas = require('../schemas/index.js');
// const collections = schema.collections;

let dbName = null;
let url = 'mongodb://localhost:27017';

// mongoose.set('useCreateIndex', true);

class Mongo{
	static getInstance(db){
		dbName = db || 'tianhao';

		if(!this.instance){
			this.instance = new Mongo();
		}

		return this.instance;
	}

	constructor(){
		if(!this.client){
			return this.client = '';
		}

		this.connect();
	}

	connect(){
		return new Promise((resolve, reject)=>{
			let _that = this;

			if(_that.client === ''){
				_that.client = mongoose.connect(url + dbName, {
					useNewUrlParser: true,
				});

				mongoose.connection.on('connected', ()=>{
					console.log(`Mongoose connected on ${ url + dbName }`);
					resolve(_that.client);
				});

				mongoose.connection.on('disconnected', (err)=>{
					reject(err);
				});
			}else{
				resolve(_that.client);
			}
		});
	}

	insert(table, obj, canRepeat){
		return new Promise((resolve, reject)=>{
			try{
				const flag = canRepeat === undefined ? true : canRepeat;
				this.connect().then(()=>{
					flag ? new schema[table](obj).save(err=>{
						if(err){
							reject(err);
						}else{
							resolve({
								status: 1,
							});
						}
					}) :
					this.findInTable(table, obj).then(res=>{
						if(res.length > 0){
							resolve({
								status: 0,
							});
						}

						new schema[table](obj).save(err=>{
							if(err){
								reject(err);
							}else{
								resolve({
									status: 1,
								});
							}
						})
					});;
				});
			}catch(ex){
				reject(ex);
			}
		});
	}

	findInTable(table, obj={}){
		return new Promise((resolve, reject)=>{
			try {
				this.connect().then(()=>{
					schema[table].find(obj, (err, doc)=>{
						if(err){
							reject(err);
						}else{
							resolve({
								length: doc.length,
								data: doc,
							});
						}
					});
				});
			}catch(ex){
				throw new Error(ex);
			}
		});
	}

	delete(table, obj){
		return new Promise((resolve, reject)=>{
			try{
				this.connect().then(()=>{
					schema[table].deleteMany(obj, err=>{
						if(err){
							reject(err);
						}else{
							resolve({
								status: 1,
							});
						}
					});
				});
			}catch(ex){
				throw new Error(ex);
			}
		});
	}

	updateData(table, old, now){
		return new Promise((resolve, reject)=>{
			try{
				this.connect().then(()=>{
					schema[table].updateMany(old, {
						$set: now,
					}, (err)=>{
						if(err){
							reject(err);
						}else{
							resolve({
								status: 1,
							});
						}
					});
				});
			}catch(ex){
				throw ex;
			}
		});
	}
}

module.exports = Mongo;