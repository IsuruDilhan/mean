var app = angular.module('app', []);


app.filter('range', function() {
	return function(input, total) {
		total = parseInt(total);
		for (var i=1; i<total; i++)
			input.push(i);
		return input;
	};
});

app.controller('mainController', function ($scope, $http) {

	$scope.users = [];

	$http.get('api/users').success(function(response) {
		$scope.users = response;
	});

	$scope.submitForm = function (isValid) {
		if (isValid) {
			var newUser = {
				name: $scope.name,
				age: parseInt($scope.age),
				address: $scope.address,
				email: $scope.email
			};

			$http.post('api/users', newUser).then(function(data, status, headers, config) {
				$scope.users.push(newUser);
				$scope.form = {};
			});
		}
	}

	$scope.remove = function (item) {
		$http.delete('api/users/' + item._id).success(function(data, status, headers, config) {
			$scope.users.splice($scope.users.indexOf(item), 1);
		});
	}

	$scope.load = function (item) {
		$http.get('api/users/' + item._id).success(function(data, status, headers, config) {
			$scope.loadedUser = data;
		});
	}
});