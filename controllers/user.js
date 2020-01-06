const { login } = require('../services/user.js');

login('admin', 'admin2').then(res=>{
	console.log(res, 89999);
})
