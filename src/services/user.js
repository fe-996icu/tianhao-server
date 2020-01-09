/*用户模块service
 * @Author: zzh0211@live.com
 * @Date: 2020-01-06 15:55:48
 * @Last Modified by: zzh0211@live.com
 * @Last Modified time: 2020-01-08 19:14:14
 */
const db = require('../utils/db-helper.js');


/**用户登录 */
async function login(username, password){
	const data = await db.exist('user', {
		username,
		password,
	});
// debugger
	return data;
}



module.exports = {
	login,
};