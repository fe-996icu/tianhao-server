const Joi = require('@/extends/joi.js');

const schema = Joi.object({
	username: Joi.string().alphanum().min(3).max(30).required().label('用户名'),
	password: Joi.string().pattern(/^[a-zA-Z0-9]{3,30}$/).label('密码'),
});

module.exports = schema;