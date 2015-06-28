var configApp = angular.module('config', []);

endpointListCtrl = function($scope, $http) {
    $scope.master = {};

    $scope.update = function(endpoint) {
        $scope.master = angular.copy(endpoint);
    };

    $scope.reset = function() {
        $scope.user = angular.copy($scope.master);
    };

    $scope.reset();
};

configApp.controller('EndpointListCtrl', [ '$scope', '$http', endpointListCtrl ] );