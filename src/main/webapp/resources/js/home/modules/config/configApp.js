var configApp = angular.module('configApp', []);

function ResourceListCtrl ($scope, $http) {
	$scope.attributes = [];
  
};


configApp.controller('ResourceListCtrl', ['$scope', '$http', ResourceListCtrl]);