/**请求处理时间
 * @Author: zzh0211@live.com
 * @Date: 2020-01-07 19:54:35
 * @Last Modified by: zzh0211@live.com
 * @Last Modified time: 2020-01-09 10:11:12
 */

 function requestDisposeTime(){
	return async function requestDisposeTime(ctx, next){
		const startTime = Date.now();

		await next();

		const endTime = Date.now();

		console.info(`请求： ${ ctx.url } 处理时间：${ endTime - startTime }ms`);
	}
 }

module.exports = requestDisposeTime;