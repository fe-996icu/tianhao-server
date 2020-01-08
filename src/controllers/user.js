
const Router = require('koa-router');
const schema = require('../rule-schemas/user/login.js');
const router = new Router();
/**逻辑状态码策略 */
const CODE_STRATEGY = require('../config/logic-code-strategy.js');
// 通用校验函数选项
const { common_validate_options } = require('../config/joi.js');

// router.get('/', async (ctx, next)=>{
// 	await next();

// 	ctx.body = JSON.stringify({
// 		a:1,
// 		b:2,
// 	});

// 	ctx.type = 'application/json';
// });

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

	await next();

	const ret = schema.validate(body, common_validate_options);

	if(ret.error){
		console.error(`校验不通过： ${ ret.error.details[0].type }`);
		return ctx.fail([ret.error.message]);
	}

	debugger

	// 验证提交数据
	// if(_.isEmpty(username)){
	// 	// return ctx.status = 405;
	// }

	// if(){}

	if(ctx.request.body.username !== 'admin'){
		ctx.fail(CODE_STRATEGY.LOGIN_DATA_MISS);
		return;
	}



	ctx.success({
		a:1,
		b:2,
	});
});

module.exports = router;