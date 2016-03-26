var app = angular.module('webInterface', [
	'ui.router',
	'angular-loading-bar',
	'mgcrea.ngStrap',
	'ngAnimate'
]);

app.config(['$stateProvider','$urlRouterProvider',
	function ($stateProvider,$urlRouterProvider) {
		$urlRouterProvider.otherwise('/home');
		$stateProvider
			.state('home', {
				url: "/home",
				controller: function($scope) {
					alert('test');
					console.log('test');
				},
				views:
					"": {
						templateUrl: "templates/home.html"
					},
					"all": {
						controller: "ContainerListAll",
						templateUrl: "templates/containers-all.html"
					},
					"active": {
						controller: "ContainerListActive",
						templateUrl: "templates/containers-active.html"
					}
				}
			})
	}]);

app.controller('ContainerListActive', ['$scope', '$http', 'api', function ($scope,$http,api) {
	$scope.loadActiveContainers = function() {
		api.getActiveContainers().success(function(response){
	  	$scope.containers = response.containers;
  	});
 	}
	$scope.stopContainer = api.stopContainer
	$scope.loadActiveContainers();
}]);


app.controller('ContainerListAll', ['$scope', '$http', '$modal', 'api', function ($scope,$http,$modal,api) {
	console.log('ContainerListAll instantiated');
	$scope.loadAllContainers = function() {
		api.getAllContainers().success(function(response){
			$scope.containers = response.containers;
  	});
	}
	$scope.stopContainer = api.stopContainer
	$scope.loadAllContainers();
	var myOtherModal = $modal({scope: $scope, template: 'templates/modal.html', show: false});
	$scope.showModal = function(container) {
		$scope.container = container;
	 	myOtherModal.$promise.then(myOtherModal.show);
	}
}]);
/*
app.controller('stop-container', ['$scope', '$http', function($scope,$http) {
    $scope.stoppingFunction = function(msg) {
    	var containerid = msg;
      $http.get("http://127.0.0.1:3000/containers/stop/"+containerid).success(function(response){
   			alert('Successfully stopped: ' + response.output.output);
   		});
    };
}]);

app.controller('start-container', ['$scope', '$http', function($scope,$http) {
    $scope.startingFunction = function(msg) {
    	var containerid = msg;
        $http.get("http://127.0.0.1:3000/containers/start/"+containerid).success(function(response){
   		alert('Successfully started: ' + response.output);
   });
    };
    //$scope.mySecondFunction = function(msg) {
    //     alert('Editing Container ID: ' + msg );
    //};
}]);

app.controller('edit-container', ['$scope', '$http', function($scope,$http) {
    $scope.startingFunction = function(msg) {
    	var containerid = msg;
        $http.get("http://127.0.0.1:3000/containers/start/"+containerid).success(function(response){
   		alert('Successfully started: ' + response.output);
   });
    };
    //$scope.mySecondFunction = function(msg) {
    //     alert('Editing Container ID: ' + msg );
    //};
}]);

app.controller('delete-container', ['$scope', '$http', function($scope,$http) {
    $scope.deletingFunction = function(msg) {
    	var containerid = msg;
        $http.get("http://127.0.0.1:3000/containers/delete/"+containerid).success(function(response){
   		alert('Successfully deleted: ' + response.output.output);
   });
    };
    //$scope.mySecondFunction = function(msg) {
    //     alert('Editing Container ID: ' + msg );
    //};
}]);
*/
app.service('api', ['$http', function($http) {
	var url = "http://127.0.0.1:3000";

	function getActiveContainers() {
		return $http.get(url + "/containers");
	}

	function getAllContainers() {
		return $http.get(url + "/containers/all");
	}

	function getContainer(id) {
		return $http.get(url + "/containers/" + id);
	}

	function startContainer(id) {
		return $http.get(url + "/containers/start/" +id);
	}

	function stopContainer(id) {
		return $http.get(url + "/containers/stop/" +id);
	}

	function deleteContainer(id) {
		return $http.get(url + "/containers/delete/" +id);
	}

	return {
		getActiveContainers: getActiveContainers,
		getAllContainers: getAllContainers,
		getContainer: getContainer,
		deleteContainer: deleteContainer,
		startContainer: startContainer,
		stopContainer: stopContainer
	}
}])
