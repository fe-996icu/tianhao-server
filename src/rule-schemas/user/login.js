const Joi = require('@/extends/joi.js');

const schema = Joi.object({
	username: Joi.string().alphanum().min(2).max(30).required().label('用户名'),
	password: Joi.string()./* pattern(/^[a-zA-Z0-9]{6,30}$/). */required().label('密码'),
	captcha: Joi.string().required()/* .min(4).max(4) */.label('验证码'),
	captcha_type: Joi.string().required().label('验证码类型'),
});

module.exports = schema;