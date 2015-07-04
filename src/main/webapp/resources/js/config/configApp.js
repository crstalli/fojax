var configApp = angular.module('configApp', [ 'AngularTypeahead' ]);

configApp.directive('attributeType', function() {
    return {
        require : 'ngModel',
        link : function(scope, elm, attrs, ctrl) {
            ctrl.$validators.attributeType = function(modelValue, viewValue) {
                if (ctrl.$isEmpty(modelValue)) {
                    return false;
                }
                var possibleValues = fojax.constants.config.attributeTypes;
                for (var i = 0; i < possibleValues.length; i++) {
                    if (possibleValues[i].toLowerCase() === modelValue
                            .toLowerCase()) {
                        return true;
                    }
                }

                return false;
            };
        }
    };
});

var ResourceListCtrl = function($scope, $http) {
    // List of the attributes
    $scope.attributes = [];

    // Attribute types
    $scope.attributeTypes = fojax.constants.config.attributeTypes;

    // Prefix for the id attribute of type inputs
    $scope.idTypePrefix = "type-input-";

    // instantiate the bloodhound suggestion engine
    var typeaheadValues = new Bloodhound({
        datumTokenizer : function(d) {
            return Bloodhound.tokenizers.whitespace(d);
        },
        queryTokenizer : Bloodhound.tokenizers.whitespace,
        local : $scope.attributeTypes
    });

    // initialize the bloodhound suggestion engine
    typeaheadValues.initialize();

    // Attribute data set
    $scope.attributeDataSet = {
        source : typeaheadValues.ttAdapter()
    };

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
        if ($scope.configForm.$valid) {
            $scope.attributes.push({
                name : '',
                type : ''
            });
        }
    };

    $scope.submit = function() {
        console.log('submitting');
    };

    $scope.typeAheadOptions = {
        hint : true,
        highlight : true,
        minLength : 1
    };

    var init = function() {
        $scope.attributes.push({
            name : '',
            type : ''
        });
    }
    init();
};

configApp.controller('ResourceListCtrl',
        [ '$scope', '$http', ResourceListCtrl ]);