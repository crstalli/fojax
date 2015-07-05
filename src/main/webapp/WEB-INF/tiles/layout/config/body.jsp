
<%@ include file="/WEB-INF/tiles/taglibs.jsp"%>

<body>

    <div ng-controller="ResourceListCtrl">
        <div class="container">
            <div class="row">
                <div class="col-xs-12">
                    <form class="form-inline novalidate" name="configForm" novalidate>
                        <div class="col-xs-5">
                            <label>Attribute</label>
                        </div>
                        <div class="col-xs-5">
                            <label>Type</label>
                        </div> 
                        <div class="row margin-10-top" ng-repeat="attribute in attributes">
                            <ng-form class="col-xs-5" name="nameForm" novalidate>
                                <div  class="form-group" ng-class="{'has-error': nameForm.name.$invalid && !nameForm.name.$pristine}">
                                    <input class="form-control" name="name" type="text" ng-pattern="/^[a-zA-Z_][a-zA-Z0-9_]*$/" required ng-model="attribute.name" ng-attr-id="{{'name-input' + $index}}" />
                                    <p ng-show="nameForm.name.$invalid && !nameForm.name.$pristine" class="help-block">Please enter a valid attribute name: ^[a-zA-Z_][a-zA-Z0-9_]*$</p>
                                </div>
                            </ng-form>
                            <ng-form class="col-xs-5" name="typeForm" novalidate>
                                <div class="form-group" ng-class="{'has-error': typeForm.type.$invalid && !typeForm.type.$pristine}">
                                   <input class="form-control typeahead" name="type" type="text" angular-typeahead options="typeaheadOptions" datasets="attributeDataSet" required ng-model="attribute.type" attribute-type="attributeTypes" ng-attr-id="{{idTypePrefix + $index}}"/>
                                   <p ng-show="typeForm.type.$invalid && !typeForm.type.$pristine" class="help-block">Please enter a valid attribute type</p>
                                </div>
                            </ng-form>
                            <div class="col-xs-2 clearfix">
                                <!-- todo: edit mode <a class="pull-left" ng-click="editAttribute()">edit</a> -->
                                 <button ng-show="$last" class="btn btn-default glyphicon glyphicon-plus pull-left" ng-click="addAttribute()"></button>
                                 <a ng-show="$index > 0 || !$last" class="pull-left remove-attribute-link" ng-class="{'margin-10-left': $last}" ng-click="removeAttribute($index)">remove</a>
                            </div>
                        </div>
                        <div class="row margin-10-top">
                            <div class="col-xs-offset-6 col-xs-2">
                                <button class="btn btn-primary" type="submit" ng-click="submit()">Submit</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>

    <tiles:insertAttribute name="footer-content" />
</body>
