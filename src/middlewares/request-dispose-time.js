/**请求处理时间
 * @Author: zzh0211@live.com
 * @Date: 2020-01-07 19:54:35
 * @Last Modified by: zhangjianzhong
 * @Last Modified time: 2021-12-20 14:15:54
 */
const utils = require('../utils/index.js');

function requestDisposeTime(){
	return async function requestDisposeTime(ctx, next){
		const startTime = Date.now();

		await next();

		const endTime = Date.now();

		const time = utils.getNowStr();
		const { url } = ctx;
		const handleTime = endTime - startTime;
		if(ctx.status === 404){
			console.error(`[${time}] url not found: ${ url } 处理时间：${ handleTime }ms`);
		}else{
			console.info(`[${time}] url: ${ url } 处理时间：${ handleTime }ms`);
		}
	}
}

module.exports = requestDisposeTime;