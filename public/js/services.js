angular.module('StarterApp.services', [])

.factory('apiService', ['$http', '$q', function($http, $q){
	var apiService = {};

	var serviceMap = {
		saveUser: '/api/saveUser',
		updateUser: '/api/updateUser',
		deleteUser: '/api/deleteUser',
		findAllUsers: '/api/findAllUsers'
	}

	apiService.invokeService = function(serviceUrl, data, method){
		method = method ? method.toUpperCase() : 'GET';
		var defer = $q.defer();
		var url = serviceMap[serviceUrl];

		switch(method){
			case 'POST'	:
				$http.post(url, data).success(function(res){
					defer.resolve(res);
				}).error(function(res, status){
					defer.resolve(res, false);
				});
				break;
			case 'GET'	:
				$http.get(url).success(function(res){
					defer.resolve(res);
				}).error(function(res, status){
					defer.resolve(res, false);
				});
				break;
		}

		return defer.promise;
	};

	return apiService;
}])

.factory('userService', ['apiService', function(apiService){
	var userService = {};

	userService.saveOrUpdateUser = function(userData){
		var serviceUrl = userData._id ? 'updateUser' : 'saveUser';
		return apiService.invokeService(serviceUrl, userData, 'POST');
	};

	userService.deleteUser = function(userData){
		var serviceUrl = 'deleteUser';
		return apiService.invokeService(serviceUrl, userData, 'POST');
	};

	userService.findAllUsers = function(){
		var serviceUrl = 'findAllUsers';
		return apiService.invokeService(serviceUrl);
	};

	return userService;
}]);