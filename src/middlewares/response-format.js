/*所有响应主体数据使用的包装对象
 * @Author: zzh0211@live.com
 * @Date: 2020-01-07 20:06:29
 * @Last Modified by: zzh0211@live.com
 * @Last Modified time: 2020-01-08 21:01:33
 */
const _ = require('lodash');

function responseFormat({ successCode=200, successMsg='ok', type='json', }={}){
	return async function(ctx, next){
		ctx.success = function(data){
			ctx.type = type;
			ctx.body = {
				code: successCode,
				data: data,
				msg: successMsg,
			};
		};

		ctx.fail = function(strategy){
			const [msg='未知错误', code=400] = _.isString(strategy) ? { msg: strategy }: strategy;

			ctx.type = type;
			ctx.body = {
				code,
				msg,
				data: null,
			};
		};

		await next();
	}
};

module.exports = responseFormat;