/*服务器入口
 * @Author: zzh0211@live.com
 * @Date: 2020-01-07 20:03:32
 * @Last Modified by: zhangjianzhong
 * @Last Modified time: 2021-12-20 14:21:51
 */

// 记录服务启动时长
const serverStartTime = Date.now();

// 模块别名注册
require('module-alias/register');
const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const session = require('koa-session');
// 响应内容包装格式化-自定义中间件
const responseFormat = require('./middlewares/response-format.js');
// 请求处理时间计算-自定义中间件
const requestDisposeTime = require('./middlewares/request-dispose-time.js');
// 路由控制器
const router = require('./controllers');
// 服务配置
const config = require('./config/global-constants.js');
const sessionConfig = require('./config/session.js');
const utils = require('./utils/index.js');

// 实例化koa
const app = new Koa();

app.keys = ['some secret hurr'];

// koa-session中间件
app.use(session(sessionConfig, app));

// 记录请求处理时间
app.use(requestDisposeTime());
// 处理post请求主体参数解析
app.use(bodyParser());
// 响应内容包装格式化
app.use(responseFormat());
// 处理路由
app.use(router.routes());
app.use(router.allowedMethods());

// 启动服务
app.listen(config.SERVER_PORT, function(err){
	if(err){
		console.error('------服务启动出错------');
		return console.error(err);
	}

	// 服务启动结束时间
	const serverEndTime = Date.now();
	const localIp = utils.getLocalIPAddress();

	console.log('------------------------------------------------------');
	console.log(`服务启动成功，耗时：${ serverEndTime - serverStartTime }ms`);
	console.log(`本机访问地址： http://localhost:${ config.SERVER_PORT }/`);
	console.log(`局域网访问地址： http://${ localIp }:${ config.SERVER_PORT }/`);
	console.log('------------------------------------------------------');
});