var configApp = angular.module('configApp', []);

var ResourceListCtrl = function($scope, $http) {
    $scope.attributes = [];

    $scope.type = '';
    $scope.name = '';

    $scope.removeAttribute = function(index) {
        /**
         * Removes the object at the specified index from
         * {@code: $scope.attribtues }
         * 
         * @param {number}
         *            index - The index to remove
         */
        $scope.attributes.splice(index, 1);
    };

    $scope.addAttribute = function() {
        /**
         * Adds an object to the $scope.attributes array with the {name:
         * $scope.name and type: $scope.type}. Resets the $scope's name and
         * types
         */
        $scope.attributes.push({
            name : $scope.name,
            type : $scope.type
        });
        $scope.name = '';
        $scope.type = '';
    };

    $scope.submit = function() {
        console.log('submitting');
    };
};

configApp.controller('ResourceListCtrl',
        [ '$scope', '$http', ResourceListCtrl ]);