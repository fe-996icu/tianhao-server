/*用户模块相关的controller
 * @Author: zzh0211@live.com
 * @Date: 2020-01-08 20:41:33
 * @Last Modified by: zzh0211@live.com
 * @Last Modified time: 2020-01-09 10:46:48
 */

const Router = require('koa-router');
const svgCaptcha = require('svg-captcha');
const schema = require('../rule-schemas/user/login.js');
const router = new Router();
/**逻辑状态码策略 */
const CODE_STRATEGY = require('../config/logic-code-strategy.js');
// 通用校验函数选项
const { common_validate_options } = require('../config/joi.js');

const userService = require('../services/user.js');

// 获取验证码
router.get('/ge_get_captcha', async (ctx, next)=>{
	const c = svgCaptcha.createMathExpr({
		size: 4,
		ignoreChars: '0o1i',
		noise: 3,
		// background: '#cc9966',
		background: '#fff',
		width: 120,
		height: 32,
	});

	console.log(`验证码：${ c.text }`);


	// ctx.response.body = c.data;
	// ctx.response.type = 'svg';
	ctx.$success({
		data: c.data
	});

	ctx.session[`captcha_${ ctx.request.query.captcha_type }`] = c.text;

	await next();
});

router.post('/login', async (ctx, next)=>{
	const {
		request: {
			body,
			body: {
				username,
				password,
				captcha,
				captcha_type,
			},
		}
	} = ctx;

	// 校验请求提交的数据
	const { error } = schema.validate(body, common_validate_options);
	if(error){
		const { message, details, } = error;
		console.error(`校验不通过： ${ details[0].type }【${ message }】`);
		return ctx.$fail(message);
	}

	// 校验验证码
	const sessionCaptcha = ctx.session[`captcha_${ captcha_type }`];
	if(sessionCaptcha != captcha){
		console.error(`验证码不通过，server：${ sessionCaptcha }，client：${ captcha }`);
		return ctx.$fail(CODE_STRATEGY.CAPTCHA_MISMATCHING);
	}

	const ret = await userService.login(username, password);

	if(ret){
		ctx.$success({
			ret
		});
	}else{
		// 账号密码查不到
		ctx.$fail(CODE_STRATEGY.LOGIN_DATA_INVALID);
	}

	await next();
});

module.exports = router;