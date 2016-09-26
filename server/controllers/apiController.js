var User = require('../models/User');
var CRUDRepository = require('../repository/CRUDRepository');

module.exports.save = function(req, res){
	var user = new User(req.body);
	user.save(function(err, result){
		if(err){
			res.json(err);
		} else {
			res.json(result);
		}
	});
}

module.exports.update = function(req, res){
	var id = req.body._id;
	User.findByIdAndUpdate(id, {$set: req.body}, function(err, result){
		if(err){
			res.json(err);
		} else {
			res.json(result);
		}
	});
}

module.exports.delete = function(req, res){
	var id = req.body._id;
	User.findByIdAndRemove(id, {}, function(err, result){
		if(err){
			res.json(err);
		} else {
			res.json(result);
		}
	});
}

module.exports.findAll = function(req, res){
	/*User.find({}, function(err, result){
		if(err){
			res.json(err);
		} else {
			res.json(result);
		}
	});*/
	var repo = new CRUDRepository('User');
	var query = repo.findAll();
	query.exec(function (err, result) {
		var response = handleResponse(err, result);
		res.json(response);
	});
}

function handleResponse(err, result){
	var response = {status: false};
	if(err){		
		response.message = err.message || "Error!!";
	} else {
		response.status = true;
		response.data = result;
	}
	return response;
}