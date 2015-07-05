<%@ include file="/WEB-INF/tiles/taglibs.jsp"%>

<tiles:importAttribute name="myDefinitionName" toName="page"/>
<nav class="navbar navbar-inverse navbar-fixed-top" role="navigation">
    <div class="container">
        <div class="navbar-header">
            <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
                <span class="sr-only">Toggle navigation</span> <span class="icon-bar"></span> <span class="icon-bar"></span>
                <span class="icon-bar"></span>
            </button>
            <a class="navbar-brand" href="<c:url value='/' />">Fojax
                <c:if test="${page == 'index'}">
                            <span class="sr-only">(current)</span>
                </c:if>
            </a>
        </div>
        <!-- Collect the nav links, forms, and other content for toggling -->
        <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
            <ul class="nav navbar-nav">
                <li class="<c:if test="${page == 'config'}">active</c:if>">
                    <a href="<c:url value='/config' />">
                        Config 
                        <c:if test="${ page== 'config'}">
                            <span class="sr-only">(current)</span>
                        </c:if>
                    </a>
                </li>
                <li class="<c:if test="${page == 'help'}">active</c:if>">
                    <a href="<c:url value='/help' />">
                        Help
                        <c:if test="${page == 'help'}">
                            <span class="sr-only">(current)</span>
                        </c:if>
                    </a>
                </li>
            </ul>
        </div>
</nav>
