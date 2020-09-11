/*所有响应主体数据使用的包装对象
 * @Author: zzh0211@live.com
 * @Date: 2020-01-07 20:06:29
 * @Last Modified by: zzh0211@live.com
 * @Last Modified time: 2020-01-08 21:01:33
 */
const _ = require('lodash');

function responseFormat({ successCode=200, successMsg='ok', type='json', }={}){
	return async function(ctx, next){
		// 请求处理成功，返回成功数据
		ctx.$success = function(data){
			ctx.type = type;
			ctx.body = {
				code: successCode,
				data: data,
				msg: successMsg,
			};
		};

		/**
		 * 请求处理失败，返回失败信息
		 * @param {string|array} strategy 如果是string，此参数就是message，如果是数组，[code,msg]
		 * @param {*} data
		 */
		ctx.$fail = function(strategy, data=null){
			const [code=400, msg='未知错误'] = _.isString(strategy) ? [undefined, strategy] : strategy;

			ctx.type = type;
			ctx.body = {
				code,
				msg,
				data,
			};
		};

		await next();
	}
};

module.exports = responseFormat;