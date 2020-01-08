const router = require('koa-router')();
const { API_PREFIX } = require('../config/global-constants.js');

const user = require('./user.js');

router.use(API_PREFIX, user.routes());

module.exports = router;