var configApp = angular.module('configApp', []);

function ResourceListCtrl ($scope, $http) {
	$scope.attributes = [];
  
};

function FojaxDropdown ($scope) {
$scope.items = [
              ];

              $scope.status = {
                isopen: false
              };

              $scope.toggled = function(open) {
                $log.log('Dropdown is now: ', open);
              };

              $scope.toggleDropdown = function($event) {
                $event.preventDefault();
                $event.stopPropagation();
                $scope.status.isopen = !$scope.status.isopen;
              };
};


configApp.controller('ResourceListCtrl', ['$scope', '$http', ResourceListCtrl]);