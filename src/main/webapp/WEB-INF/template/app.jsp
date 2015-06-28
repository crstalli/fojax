<%@ include file="/WEB-INF/tiles/taglibs.jsp"  %>
<html ng-app=<tiles:getAsString name="app"></tiles:getAsString>>

	<head>

	<tiles:insertAttribute name="meta"/>
    <tiles:insertAttribute name="header-content"/>

	<tiles:insertAttribute name="header"/>


  </head>

  <body data-controller="index">
	<tiles:insertAttribute name="menu"/>
	<tiles:insertAttribute name="body"/>
   

 	<tiles:insertAttribute name="footer-script"/>

 	<tiles:insertAttribute name="scripts"/>

  </body>
</html>
