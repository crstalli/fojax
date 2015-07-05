<%@ include file="/WEB-INF/tiles/taglibs.jsp"  %>
<html>

	<head>

	<tiles:insertAttribute name="meta"/>
    <tiles:insertAttribute name="header-content"/>

	<tiles:insertAttribute name="header"/>


  </head>

  <body>
	<tiles:insertAttribute name="menu"/>
	<tiles:insertAttribute name="body"/>
   


 	<tiles:insertAttribute name="footer-script"/>
  </body>
</html>
