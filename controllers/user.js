const Router = require('koa-router');
const router = new Router();
const CODE_STRATEGY = require('../config/logic-code-strategy.js');

router.get('/', async (ctx, next)=>{
	await next();

	ctx.body = JSON.stringify({
		a:1,
		b:2,
	});

	ctx.type = 'application/json';
});

router.post('/login', async (ctx, next)=>{
	await next();

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