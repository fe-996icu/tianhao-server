/*用户模块service
 * @Author: zzh0211@live.com
 * @Date: 2020-01-06 15:55:48
 * @Last Modified by: zzh0211@live.com
 * @Last Modified time: 2020-01-06 15:58:18
 */
const db = require('../utils/db-helper.js');


/**用户登录 */
function login(username, password){
	return db.exist('user', {
		username,
		password,
	});
}



module.exports = {
	login,
};