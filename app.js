const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const responseFormat = require('./middlewares/responseFormat.js');
const router = require('./controllers');
const { SERVER_PORT } = require('./config/global.js');

// 记录服务启动时间
const serverStartTime = Date.now();

const app = new Koa();

app.use(async (ctx, next)=>{
	console.log(`请求已接受：${ ctx.url }`);
	await next();
});

// 处理post请求主体参数解析
app.use(bodyParser());

app.use(responseFormat());

// 处理路由
app.use(router.routes());
app.use(router.allowedMethods());

app.use(async (ctx, next)=>{
	console.log(`请求处理完成：${ ctx.url }`);
});

app.listen(SERVER_PORT, function(err){
	if(err){
		return console.error(err);
	}

	// 服务启动结束时间
	const serverEndTime = Date.now();

	console.log(`服务启动成功，耗时：${ serverEndTime - serverStartTime }ms`);
	console.log(`访问地址： http://localhost:${ SERVER_PORT }/`);
});