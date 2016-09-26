module.exports = function(modelName){
	this.model = require('../models/' + modelName);
	this.findAll = function(){
		var query = this.model.find();
		return query;
	};
}

