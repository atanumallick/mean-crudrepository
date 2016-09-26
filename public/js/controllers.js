angular.module('StarterApp.controllers', ['StarterApp.services'])

.controller('indexCtrl', ['$scope', 'userService', function($scope, userService){
	$scope.initialize = function(){
		$scope.user = {};
		$scope.users = [];
		$scope.findAllUsers();
	};

	$scope.saveUser = function(){
		userService.saveOrUpdateUser($scope.user).then(function(res){
			$scope.findAllUsers();
			$scope.user = {};
			$('#userModal').modal('hide');
		});
	}

	$scope.editUser = function(usr){
		$scope.user = usr;
		$('#userModal').modal('show');
	}

	$scope.deleteUser = function(usr){
		userService.deleteUser(usr).then(function(res){
			$scope.findAllUsers();
		});
	}

	$scope.findAllUsers = function(){
		userService.findAllUsers().then(function(res){
			$scope.users = res.data;
		});
	}

	$scope.initialize();
}]);