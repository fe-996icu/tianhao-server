const router = require('koa-router')();

const user = require('./user.js');

router.use('/user', user.routes());

module.exports = router;