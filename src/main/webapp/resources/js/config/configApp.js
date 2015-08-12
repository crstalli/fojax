var configApp = angular.module('configApp', [ 'AngularTypeahead', 'ui.router',
        'ui.bootstrap', 'ui.grid' ]);

configApp
        .config(
                function($stateProvider, $urlRouterProvider,
                        $urlMatcherFactoryProvider) {
                    routeValToString = function(val) {
                        return val != null ? val.toString() : val;
                    };
                    routeValFromString = function(val) {
                        return val != null ? val.toString() : val;
                    };
                    routeValregexpMatches = function(val) { /*
                                                             * jshint
                                                             * validthis:true
                                                             */
                        return this.pattern.test(val);
                    };
                    $urlMatcherFactoryProvider.type("Route", {
                        encode : routeValToString,
                        decode : routeValFromString,
                        is : routeValregexpMatches,
                        pattern : /.*/
                    });

                    $stateProvider.state('home', {
                        url : '/',
                        templateUrl : fojax.partialsPath + 'home.html',
                        controller : 'EndpointListCtrl'
                    })

                    .state('config', {
                        url : '/{path:Route}',
                        templateUrl : fojax.partialsPath + 'config.html',
                        controller : 'ResourceListCtrl'
                    });
                    $urlRouterProvider.otherwise('/');
                })
        .directive(
                'routerCrumbs',
                function() {
                    return {
                        restrict : 'AE',
                        scope : {
                            path : '=',
                            clicked : '&'
                        },
                        link : function(scope, elm, attrs) {

                            var loc = scope.path || "/";

                            var locs = fojax.utils.common.getRouteArray(loc);

                            locs = locs.map(function(elem, i) {
                                return {
                                    element : elem,
                                    index : i
                                };
                            });

                            scope.locations = locs;
                            scope.goToLocaiton = function(location) {
                                var loc = scope.locations.slice(0,
                                        scope.locations.indexOf(location) + 1);
                                var s = "";
                                for (var i = 0; i < loc.length; i++) {
                                    if (loc[i].element !== "") {
                                        s += (loc[i].element + "/");
                                    }
                                }
                                scope.clicked({
                                    path : s
                                });
                            };
                        },
                        template : '<ol  class="breadcrumb">'
                                + '<li ng-repeat="location in locations" ng-class="{active: $last}">'
                                + '<a ng-if="!$last" ng-click="goToLocaiton(location)"><span ng-bind="location.element=== \'\' ? \'/\' :location.element"></span></a>'
                                + '<span ng-if="$last" ng-bind="location.element=== \'\' ? \'/\' :location.element"></span>'
                                + '</li>' + '</ol>'
                    };
                });

configApp
        .directive(
                'attributeType',
                function() {
                    return {
                        require : 'ngModel',
                        link : function(scope, elm, attrs, ctrl) {
                            ctrl.$validators.attributeType = function(
                                    modelValue, viewValue) {
                                if (ctrl.$isEmpty(modelValue)) {
                                    return false;
                                }
                                var possibleValues = fojax.constants.config.allKnownAttributeTypes;
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

var ResourceListCtrl = function($scope, $http, $stateParams, $state) {
    // List of the attributes
    $scope.attributes = [];

    $scope.path = $stateParams.path || '/';

    // Attribute types
    $scope.attributeTypes = fojax.constants.config.allKnownAttributeTypes;

    // Prefix for the id attribute of type inputs
    $scope.idTypePrefix = "type-input-";

    $scope.numberOfListLevels = [];
    
    $scope.currentEntityType = "Object";

    $scope.entitySavedAsObject = false;

    $scope.entityTypeSelectionActive = true;
    
    $scope.everythingSaved = false;
    
    $scope.showSaveChanges = false;
    
    $scope.activeRow = -1;

    $scope.typeSelected = function() {
        $scope.entitySavedAsObject = $scope.currentEntityType === 'Object';
        if($scope.entitySavedAsObject){
        	$scope.addAttribute();
        }
        if($scope.currentEntityType === 'List'){
        	$scope.numberOfListLevels.push(1);
        } else {
        	$scope.entityTypeSelectionActive = false;
        }
        $scope.showSaveChanges = false;
    };
    
    $scope.typeRemoved = function(){
    	 $scope.currentEntityType = '';
    	 $scope.entitySavedAsObject = false;
    	 $scope.entityTypeSelectionActive = true;
    	 $scope.showSaveChanges = false;
    	 $scope.attributes = [];
    }
    
    $scope.removeListLevel = function(){
    	$scope.numberOfListLevels.pop();
    };

    $scope.onCrumbClick = function(path) {
    	$scope.showSaveChanges = false;
        $state.go('config', {
            path : path
        }, {
            inherit : false
        });
    };

    $scope.setId = function(index) {
        for (var i = 0; i < $scope.attributes.length; i++) {
            if (i !== index) {
                $scope.attributes[i].isId = false;
            }
        }
        $scope.everythingSaved = false;
    };

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
        $scope.everythingSaved = false;
        $scope.showSaveChanges = false;
    };

    $scope.canAttributeBeId = function(attribute) {
        return fojax.constants.config.primitiveAttributeTypes
                .indexOf(attribute.type) >= 0;
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
                type : '',
                isUnique : false,
                isId : false

            });
        }
        $scope.everythingSaved = false;
        $scope.activeRow = $scope.attributes.length-1;
    };
    
    $scope.setActive = function(index){
    	$scope.activeRow = index;
    };
    
    $scope.saveAttribute = function(index){
    	if(index){
    		$scope.activeRow = $scope.attributes.length-1;
    	} else {
    		$scope.addAttribute();
    	}
    };
    
    $scope.traverse = function() {
    	if(!$scope.configForm.$dirty && $scope.everythingSaved) {
    		
    	} else {
    		$scope.showSaveChanges = true;
    	}
    }

    $scope.submit = function() {
        if ($scope.configForm.$valid) {
            console.log('submitting');
            $scope.configForm.$dirty = false
            $scope.everythingSaved = true;
            $scope.showSaveChanges = false;
        }
    };

    $scope.typeAheadOptions = {
        hint : true,
        highlight : true,
        minLength : 1
    };

    var init = function() {
        var loc = fojax.utils.common.getRouteArray($scope.path);
        $scope.location = loc[loc.length - 1];
    };
    init();
};

var EndpointListCtrl = function($scope, $http, $stateParams, $state) {
    // List of the attributes
    $scope.endpoints = [];

    $scope.path = $stateParams.path;

    var init = function() {

    };

    $scope.sortChanged = function(grid, sortColumns) {
        $http.get(fojax.rootUri + 'fojax/endpoints').success(function(data) {
            $scope.gridOptions.data = data;
        });
    };

    $scope.gridOptions = {
        useExternalSorting : true,
        columnDefs : [ {
            name : 'type'
        }, {
            name : 'uri'
        }, {
            name : 'identifier'
        } ],
        onRegisterApi : function(gridApi) {
            $scope.gridApi = gridApi;
            $scope.gridApi.core.on.sortChanged($scope, $scope.sortChanged);
            $scope.sortChanged($scope.gridApi.grid,
                    [ $scope.gridOptions.columnDefs[1] ]);
        }
    };

    init();
};

configApp.controller('ResourceListCtrl', [ '$scope', '$http', '$stateParams',
        '$state', ResourceListCtrl ]);

configApp.controller('EndpointListCtrl', [ '$scope', '$http', '$stateParams',
        '$state', EndpointListCtrl ]);