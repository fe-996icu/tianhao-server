/*验证码校验
 * @Author: zzh0211@live.com
 * @Date: 2020-01-19 14:26:05
 * @Last Modified by: zzh0211@live.com
 * @Last Modified time: 2020-01-19 14:44:12
 */
const Joi = require('@/extends/joi.js');

const schema = Joi.object({
	captcha_type: Joi.string().required().valid('login').label('验证码类型'),
});

module.exports = schema;