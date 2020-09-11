/*工具类
 * @Author: zzh0211@live.com
 * @Date: 2020-01-19 15:43:36
 * @Last Modified by: zzh0211@live.com
 * @Last Modified time: 2020-01-19 15:45:43
 */
const { common_validate_options } = require('../config/joi.js');
const svgCaptcha = require('svg-captcha');

/**
 * 验证joi校验模式
 * @param {Object} param0 参数
 * @return 验证通过返回true，验证不通过，返回false，并向客户端返回错误信息
 */
function validateSchema({ schema, data, context }){
	// 校验请求提交的数据
	const { error } = schema.validate(data, common_validate_options);
	if(error){
		const { message, details, } = error;
		console.error(`校验不通过： ${ details[0].type }【${ message }】`);
		context.$fail(message);
		return false;
	}else{
		return true;
	}
}


/**生成svg验证码 */
function getCaptcha(){
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

	console.log(`验证码：【${ c.text }】`);

	return {
		text: c.text,
		data: c.data,
		...c,
	};
}

module.exports = {
	validateSchema,
	getCaptcha,
};