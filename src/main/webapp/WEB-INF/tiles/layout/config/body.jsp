
<%@ include file="/WEB-INF/tiles/taglibs.jsp"%>

<body>

    <div ng-controller="ResourceListCtrl">
        <div class="container">
            <div class="row">
                <div class="col-xs-12">
                    <form class="form-inline">
                        <div class="row margin-10-top" ng-if="attributes.length>0" ng-repeat="attribute in attributes">
                            <div class="col-xs-5">
                                <div class="form-group">
                                    <label>Attribute</label> 
                                    <input class="form-control" type="text" ng-model="attribute.name" ng-disabled="true"/>
                                </div>
                            </div>
                            <div class="col-xs-5">
                                <div class="form-group">
                                    <label>Type</label> 
                                    <input class="form-control" type="text" ng-model="attribute.type" ng-disabled="true" />
                                </div>
                            </div>
                            <div class="col-xs-2 clearfix">
                                <!-- todo: edit mode <a class="pull-left" ng-click="editAttribute()">edit</a> -->
                                 <a class="pull-left" ng-click="removeAttribute($index)">remove</a>
                            </div>
                        </div>
                        <div class="row margin-10-top">
                            <div class="col-xs-5">
                                <div class="form-group">
                                    <label>Attribute</label> 
                                    <input class="form-control" ng-model="name" />
                                </div>
                            </div>
                            <div class="col-xs-5">
                                <div class="form-group">
                                    <label>Type</label>
                                    <input class="form-control" ng-model="type" />
                                </div>
                            </div>
                            <div class="col-xs-2 clearfix">
                                <button class="btn btn-default glyphicon glyphicon-plus pull-left" ng-click="addAttribute()"></button>
                            </div>
                        </div>
                        <div class="row margin-10-top">
                            <div class="col-xs-offset-10 col-xs-2">
                                <button type="submit" class="btn btn-primary pull-left" ng-click="submit()">Submit</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>

    <tiles:insertAttribute name="footer-content" />
</body>
