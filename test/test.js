const Joi = require('@hapi/joi');


const custom = Joi.extend((joi) => {
    return {
        type: 'string',
        base: joi.string(),
        messages: {
            'string.base': '"{{#label}}" 必须是字符串',
		},
	}
});


const schema = custom.object({
    a: custom.string().min(3).pattern(/^[a-zA-Z0-9]{3,30}$/),
    // b: custom.number(),
    // c: custom.million().even().dividable(7),
    // d: custom.million().round().prefs({ convert: false }),
    // e: custom.million().large()
});

const ret = schema.validate({
	a: '!@#$'
});

debugger

// const schema = Joi.object({
// 	username: Joi.string().alphanum().error(new Error('必须是字符串')).min(3).error(new Error('必须大于3位。。。')).max(30).error(new Error('长度必须大于3小于30')).required().error(errors=>{
// 		console.log(errors);
// 		if(){}
// 	}),
// 	password: Joi.string().pattern(/^[a-zA-Z0-9]{3,30}$/),
// });

// try{
// 	const result = schema.validate({
// 		username: '1',
// 		password: '123',
// 	});

// 	console.log(result);
// }catch(ex){
// 	console.log();
// }