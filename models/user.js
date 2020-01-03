const mongoose = require('mongoose');

module.exports = new mongoose.Schema({
	realname: String,
	username: String,
	password: String,
}, {
	collection: 'user',
});