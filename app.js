// const db = require('./utils/db-helper.js');

const db2 = require('./utils/db.js');

db2.getInstance().connect().then(v=>{
	console.log(v);
})

// console.log(db,888);