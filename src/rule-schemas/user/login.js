/*登录模块校验
 * @Author: zzh0211@live.com
 * @Date: 2020-01-19 14:26:05
 * @Last Modified by: zzh0211@live.com
 * @Last Modified time: 2020-01-19 14:47:38
 */
const Joi = require('@/extends/joi.js');

const schema = Joi.object({
	username: Joi.string().alphanum().min(2).max(30).required().label('用户名'),
	password: Joi.string()./* pattern(/^[a-zA-Z0-9]{6,30}$/). */required().label('密码'),
	captcha: Joi.string().required()/* .min(4).max(4) */.label('验证码'),
	captcha_type: Joi.string().required().valid('login').label('验证码类型'),
});

module.exports = schema;