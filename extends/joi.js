/*joi扩展
 * @Author: zzh0211@live.com
 * @Date: 2020-01-07 20:07:50
 * @Last Modified by: zzh0211@live.com
 * @Last Modified time: 2020-01-07 20:53:07
 */
const Joi = require('@hapi/joi');


const customJoi = Joi.extend((joi) => {
    return {
        type: 'string',
        base: joi.string(),
        messages: {
			'any.required': `{{#label}}是必填项`,
			'any.empty': '{{#label}}不能为空',
            'string.base': '{{#label}}必须是字符串',
		},
	}
});


module.exports = customJoi;