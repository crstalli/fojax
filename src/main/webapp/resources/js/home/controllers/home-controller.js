homeApp.controller('ViewApiController', [ '$scope', function($scope, home) {
    $scope.master = {};

    $scope.update = function(endpoint) {
        $scope.master = angular.copy(endpoint);
    };

    $scope.reset = function() {
        $scope.user = angular.copy($scope.master);
    };

    $scope.reset();
} ]);