/**请求处理时间
 * @Author: zzh0211@live.com
 * @Date: 2020-01-07 19:54:35
 * @Last Modified by: zhangjianzhong
 * @Last Modified time: 2021-12-20 16:41:12
 */
const utils = require('../utils/index.js');

function requestDisposeTime(){
	return async function requestDisposeTime(ctx, next){
		const startTime = Date.now();

		await next();

		const endTime = Date.now();

		const time = utils.getNowStr();
		const { url, method } = ctx;
		const handleTime = endTime - startTime;
		if(ctx.status === 404){
			console.error(`${time} url not found: ${method} ${url} 处理时间：${handleTime}ms`);
		}else{
			console.info(`${time} ${method} ${url} 处理时间：${handleTime}ms`);
		}
	}
}

module.exports = requestDisposeTime;