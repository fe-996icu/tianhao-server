const mongoose = require('mongoose');
const config = require('../config/db.js');

const userSchema = require('../models/user.js');

const User = mongoose.model('user', userSchema);


// 连接字符串
const CONNECT_URL = `mongodb://${ config.user }:${ config.pwd }@${ config.host }:${ config.port }/${ config.dbName }`;
console.log(`mongoose connect string: ${ CONNECT_URL }`);



// 获取连接
const db = mongoose.connection;

const connect = new Promise((resolve)=>{
	// 连接数据库
	mongoose.connect(CONNECT_URL);

	// 监听错误
	db.on('error', function(err){
		throw err;
	});

	// 监听打开
	db.once('open', function(err){
		if(err){
			throw err;
		}

		console.log('mongodb connect success！');

		// db.close();

		resolve();
	});

});

connect.then(()=>{
	User.find({}, function(err, list){
		if(err){
			console.error(err);
		}

		console.log(list, 999);
	});
});

module.exports = db;