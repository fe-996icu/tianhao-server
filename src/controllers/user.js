/*用户模块相关的controller
 * @Author: zzh0211@live.com
 * @Date: 2020-01-08 20:41:33
 * @Last Modified by: zzh0211@live.com
 * @Last Modified time: 2020-01-08 20:42:32
 */

const Router = require('koa-router');
const schema = require('../rule-schemas/user/login.js');
const router = new Router();
/**逻辑状态码策略 */
const CODE_STRATEGY = require('../config/logic-code-strategy.js');
// 通用校验函数选项
const { common_validate_options } = require('../config/joi.js');

const userService = require('../services/user.js');

// 获取验证码
router.get('/ge_get_captcha', async (ctx, next)=>{
	await next();

	ctx.body = JSON.stringify({
		a:1,
		b:2,
	});

	ctx.type = 'application/json';
});

router.post('/login', async (ctx, next)=>{
	const {
		request: {
			body,
			body: {
				username,
				password,
				captcha,
			},
		}
	} = ctx;

	// 校验请求提交的数据
	const { error } = schema.validate(body, common_validate_options);
	if(error){
		const { message, details, } = error;
		console.error(`校验不通过： ${ details[0].type }【${ message }】`);
		return ctx.fail([message]);
	}

	const ret = await userService.login(username, password);

	if(ret){
		ctx.success({
			ret
		});
	}else{
		// 账号密码查不到
		ctx.fail(CODE_STRATEGY.LOGIN_DATA_INVALID);
	}

	await next();
});

module.exports = router;