var configApp = angular.module('configApp', [ 'AngularTypeahead', 'ui.router',
        'ui.bootstrap', ]);

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
                    }
                    $urlMatcherFactoryProvider.type("Route", {
                        encode : routeValToString,
                        decode : routeValFromString,
                        is : routeValregexpMatches,
                        pattern : /.*/
                    });

                    $stateProvider.state('/', {
                        url : '/',
                        templateUrl : fojax.partialsPath + 'home.html',
                        ncyBreadcrumb : {
                            label : '/'
                        }
                    })

                    .state('config', {
                        url : '/{path:Route}',
                        templateUrl : fojax.partialsPath + 'config.html',
                        controller : 'ResourceListCtrl',
                        ncyBreadcrumb : {
                            parent : function($scope) {
                                if ($scope.path) {
                                    return 'config';
                                } else {
                                    return 'config';
                                }
                            }

                        }
                    });
                    $urlRouterProvider.otherwise('/config');
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

                            var loc = scope.path;

                            if (loc.length > 1) {
                                if (loc.lastIndexOf('/') == loc.length - 1) {
                                    loc = loc.substring(0, loc.length - 1);
                                }
                            }

                            var locs = loc.split('/');
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
                                var s = ""
                                for (var i = 0; i < loc.length; i++) {
                                    if (!(i === loc.length - 1)) {
                                        s += (loc[i].element + "/");
                                    } else if (loc[i].element !== "") {
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

var ResourceListCtrl = function($scope, $http, $stateParams, $state) {
    // List of the attributes
    $scope.attributes = [];

    $scope.path = $stateParams.path;

    // Attribute types
    $scope.attributeTypes = fojax.constants.config.attributeTypes;

    // Prefix for the id attribute of type inputs
    $scope.idTypePrefix = "type-input-";

    $scope.onCrumbClick = function(path) {

        $state.go('config', {
            path : path
        }, {
            inherit : false
        });
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
        if ($scope.configForm.$valid) {
            console.log('submitting');
        }
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

configApp.controller('ResourceListCtrl', [ '$scope', '$http', '$stateParams',
        '$state', ResourceListCtrl ]);