// const db = require('./utils/db-helper.js');

// db.connect().then((db2)=>{
// 	console.log(db2, 888);
// });

// db.find('user', {}).then((list)=>{
// 	console.log(list, 444);
// });

// db.findOne('user').then(v=>console.log('findOne', v));

// db.exist('user', {
// 	username: 'admin',
// 	password: 'admin2',
// }).then(exist=>{
// 	console.log('是否存在：', exist);
// });

// db.findById('user', '5e0f1e14426c2cbd3132fb11').then(v=>{
// 	console.log(v);
// });

// db.insert('user', {
// 	username: 'admin2',
// 	password: 'admin2',
// 	realname: 'abc',
// }).then(v=>{
// 	console.log(v);
// });

// db.insertMany('user', [
// 	{
// 		username: 1,
// 		password: 2,
// 		realname: 3,
// 	},{
// 		username: 1,
// 		password: 2,
// 		realname: 3,
// 	},
// ]).then(v=>console.log(v, 33));

// const db2 = require('./utils/db.js');

// db2.getInstance().insert('uuser', {
// 	name: 123,
// 	age: 234,
// });

// console.log(db,888);

require('./controllers/user.js');