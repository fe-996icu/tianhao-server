/*用户模块相关的controller
 * @Author: zzh0211@live.com
 * @Date: 2020-01-08 20:41:33
 * @Last Modified by: zzh0211@live.com
 * @Last Modified time: 2020-01-19 15:59:10
 */

const Router = require('koa-router');
const svgCaptcha = require('svg-captcha');
const loginSchema = require('../rule-schemas/user/login.js');
const captchaSchema = require('../rule-schemas/system/captcha.js');
const router = new Router();
/**逻辑状态码策略 */
const CODE_STRATEGY = require('../config/logic-code-strategy.js');
const utils = require('../utils/index.js');

const userService = require('../services/user.js');

// 获取验证码
router.get('/ge_get_captcha', async (ctx, next)=>{
	const {
		request: {
			query,
		}
	} = ctx;

	// 校验请求提交的数据
	if(!utils.validateSchema({
		schema: captchaSchema,
		data: query,
		context: ctx,
	})){
		return;
	}

	const {
		captcha_type,
	} = query;

	// 创建svg验证码
	const c = svgCaptcha.createMathExpr({
		size: 4,
		ignoreChars: '0o1i',
		noise: 3,
		// background: '#cc9966',
		background: '#fff',
		width: 120,
		height: 32,
	});

	console.log(`验证码【${ captcha_type }】：${ c.text }`);

	// 返回svg路径
	ctx.$success({
		data: c.data
	});

	// 将结果存在session
	ctx.session[`captcha_${ captcha_type }`] = c.text;

	await next();
});

// 登录
router.post('/login', async (ctx, next)=>{
	const {
		request: {
			body,
		}
	} = ctx;

	// 校验请求提交的数据
	if(!utils.validateSchema({
		schema: loginSchema,
		data: body,
		context: ctx,
	})){
		return;
	}

	const {
		username,
		password,
		captcha,
		captcha_type,
	} = body;

	// 校验验证码
	const sessionCaptcha = ctx.session[`captcha_${ captcha_type }`];
	if(sessionCaptcha != captcha){
		// 清除session中的登录验证码，必须重新调验证码重新获取
		ctx.session[`captcha_${ captcha_type }`] = '';
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