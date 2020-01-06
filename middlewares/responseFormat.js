
function responseFormat({ successCode=200, successMsg='ok', type='json', }={}){
	return function(ctx, next){
		ctx.success = function(data){
			ctx.type = type;
			ctx.body = {
				code: successCode,
				data: data,
				msg: successMsg,
			};
		};

		ctx.fail = function(msg, code){
			ctx.type = type;
			ctx.body = {
				code,
				msg,
				data: null,
			};
		};

		next();
	}
};

module.exports = responseFormat;