  <%@ include file="/WEB-INF/tiles/taglibs.jsp"  %>


		<script type="text/javascript">
	   fojax = {};
		fojax.viewModels = {};
		fojax.rootUri='<spring:url value="/" htmlEscape="true"/>';
		fojax.viewModels.BaseViewModel = function(){
			self=this;

			self.rootUri = '<spring:url value="/" htmlEscape="true"/>';
			self.username = '${username}';
		
		};
	</script>
  

    <!-- Bootstrap core JavaScript
    ================================================== -->
    <!-- Placed at the end of the document so the pages load faster -->
	<jwr:script src="/bundles/pre-common.js"></jwr:script>

	<tiles:insertAttribute name="scripts" ignore="true"/>
	
