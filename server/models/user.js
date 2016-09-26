var mongoose = require('mongoose');

module.exports = mongoose.model('User', {
	name: {
		type : String,
		required : true
	},
	email: {
		type : String,
		required : true,
		unique : true
	},
	password: {
		type : String,
		required : true,
		minLength : 6
	}
});