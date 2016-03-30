var app = angular.module('motership', [
    'ui.router',
    'angular-loading-bar',
    'mgcrea.ngStrap',
    'ngAnimate'
]);

app.config(['$stateProvider', '$urlRouterProvider',
    function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/home');

        $stateProvider
            .state('home', {
                url: '/home',
                views: {
                    '': {
                        templateUrl: 'templates/home.html'
                    },
                    'containers-active@home': {
                        controller: 'ContainersActive',
                        templateUrl: 'templates/containers-active.html'
                    },
                    'containers-all@home': {
                        controller: "ContainersAll",
                        templateUrl: 'templates/containers-all.html'
                    }
                }
            })
    }]);

app.controller('ContainersActive', ['$scope', '$http', '$log', 'api', function ($scope, $http, $log, api) {
    $log.log('ContainersActive instantiated');
    $scope.loadActiveContainers = function () {
        api.getActiveContainers().then(function (response) {
            $scope.containers = response.containers;
        }, function (error) {
            $log.error(error);
        });
    };
    $scope.stopContainer = api.stopContainer;
    $scope.loadActiveContainers();
}]);


app.controller('ContainersAll', ['$scope', '$http', '$modal', '$log', 'api', function ($scope, $http, $modal, $log, api) {
    $log.log('ContainersAll instantiated');
    $scope.loadAllContainers = function () {
        api.getAllContainers().then(function (response) {
            $scope.containers = response.containers;
        }, function (error) {
            $log.error(error);
        });
    };
    $scope.stopContainer = api.stopContainer;
    $scope.loadAllContainers();

    var myOtherModal = $modal({scope: $scope, template: 'templates/modal.html', show: false});
    $scope.showModal = function (container) {
        $scope.container = container;
        myOtherModal.$promise.then(myOtherModal.show);
    }
}]);

app.service('api', ['$http', function ($http) {
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
        return $http.get(url + "/containers/start/" + id);
    }

    function stopContainer(id) {
        return $http.get(url + "/containers/stop/" + id);
    }

    function deleteContainer(id) {
        return $http.get(url + "/containers/delete/" + id);
    }

    return {
        getActiveContainers: getActiveContainers,
        getAllContainers: getAllContainers,
        getContainer: getContainer,
        deleteContainer: deleteContainer,
        startContainer: startContainer,
        stopContainer: stopContainer
    }
}]);
